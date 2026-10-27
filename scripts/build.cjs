// Standalone build for this personal site; no company tooling is required.
const fs = require('node:fs/promises');
const path = require('node:path');
const sass = require('sass');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const pages = path.join(root, 'pages');
const dist = path.join(root, 'dist');

async function render(file, parents = []) {
  if (parents.includes(file)) throw new Error('Circular HTML include: ' + file);
  const source = await fs.readFile(file, 'utf8');
  let result = source;
  for (const match of source.matchAll(/@@include\(['"]([^'"]+)['"]\)/g)) {
    const target = path.resolve(path.dirname(file), match[1]);
    if (!target.startsWith(pages + path.sep)) throw new Error('Include is outside pages/');
    result = result.replace(match[0], await render(target, [...parents, file]));
  }
  return result;
}

async function build() {
  let html = await render(path.join(pages, 'JUNHEE/index.html'));
  const css = sass.compile(path.join(root, 'assets/styles.scss'), { style: 'expanded' }).css;
  const js = await fs.readFile(path.join(root, 'assets/js/main.js'), 'utf8');
  // Version asset URLs so returning visitors receive updated styles immediately.
  const version = value => createHash('sha256').update(value).digest('hex').slice(0, 12);
  html = html.replace('href="css/styles.css"', `href="css/styles.css?v=${version(css)}"`)
    .replace('src="js/main.js"', `src="js/main.js?v=${version(js)}"`);
  await fs.mkdir(path.join(dist, 'css'), { recursive: true });
  await fs.mkdir(path.join(dist, 'js'), { recursive: true });
  await fs.mkdir(path.join(dist, 'assets'), { recursive: true });
  await fs.writeFile(path.join(dist, 'index.html'), html);
  await fs.writeFile(path.join(dist, 'css/styles.css'), css);
  await fs.writeFile(path.join(dist, 'js/main.js'), js);
  await fs.rm(path.join(dist, 'assets/images'), { recursive: true, force: true });
  await fs.cp(path.join(root, 'assets/images'), path.join(dist, 'assets/images'), { recursive: true });
  console.log('Built dist/');
}

async function main() {
  await build();
  if (!process.argv.includes('--watch')) return;
  const browser = require('browser-sync').create();
  browser.init({ server: dist, port: 3000, ui: false, notify: false, open: false });
  let timer;
  let queue = Promise.resolve();
  require('chokidar').watch([pages, path.join(root, 'assets')], { ignoreInitial: true }).on('all', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      queue = queue.then(async () => {
        try { await build(); browser.reload(); }
        catch (error) { console.error(error.message); }
      });
    }, 150);
  });
  console.log('Watching pages/ and assets/. Open the Local URL shown above.');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
