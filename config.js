// Personal portfolio: independent of the company campaign templates.
module.exports = {
  context: { brand: 'JUNHEE' },
  brandsByCompany: { JUNHEE: ['JUNHEE'] },
  replacements: [],
  paths: {
    pages: 'pages', dist: 'dist', assets: 'assets', js: 'assets/js',
    cssOutput: 'dist/css', jsOutput: 'dist/js'
  },
  // The homepage owns index.html instead of the generated campaign directory.
  directoryIndex: false,
  staticAssets: [{ from: 'assets/images', to: 'assets/images' }],
  optimizeCSS: true,
  purgeContent: ['dist/**/*.html', 'assets/js/*.js'],
  purgeSafelist: {
    standard: ['js-motion', 'is-visible', 'is-zoomed', 'document-open', 'motion-paused'],
    greedy: [/data-mode/, /aria-selected/]
  }
};
