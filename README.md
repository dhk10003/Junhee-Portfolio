# Junhee Lim · Personal Training & Pilates

임준희 강사의 개인 포트폴리오입니다. HTML 5개와 컴포넌트별 SCSS로 구성되어 있습니다. 독립 실행과 기존 Templater 실행을 모두 지원합니다.

## GitHub에서 내려받은 뒤 실행

Node.js 22 이상이 필요합니다. 이 저장소 폴더의 터미널에서 실행합니다.

```sh
npm ci
npm run watch
```

터미널의 Local 주소로 접속합니다. HTML·SCSS·JS·이미지를 저장하면 자동 빌드·새로고침합니다. 빌드만 하려면 `npm run build`를 실행합니다. `dist/`가 배포할 완성본입니다.

`scripts/build.cjs`는 이 사이트만을 위한 독립 빌드입니다. 회사용 Templater, 회사 캠페인, 백업·증명서 원본은 저장소에 포함하지 않습니다.

## 기존 Templater에서 실행

‘준희 웹사이트’ 폴더의 터미널에서 실행합니다. 아래 명령은 부모 Templater 폴더 기준입니다. 이 사이트 폴더에서 실행할 때는 위의 독립 실행 명령을 사용합니다.

```sh
npm run watch -- --campaign Junhee-Portfolio
```

`npm run watch`만 실행하면 목록에서 `Junhee-Portfolio`를 선택할 수 있습니다. 출력된 Local 주소로 접속하면 첫 화면이 열립니다. HTML·SCSS·JS·이미지를 저장하면 자동으로 빌드하고 브라우저를 새로고침합니다. 종료는 해당 터미널에서 Ctrl+C입니다.

빌드만 실행하려면:

```sh
npm run build -- --campaign Junhee-Portfolio
```

## 수정 위치

- `pages/JUNHEE/index.html`: 페이지 틀, 헤더·푸터, 증명서 뷰어.
- `pages/includes/about.html`: 첫 화면, 주요 자격 요약, 강사 소개.
- `pages/includes/practice.html`: 수업 탭, SVG 그래픽, 기본 설명.
- `pages/includes/credentials.html`: 학력·자격·경력.
- `pages/includes/contact.html`: 마무리 문구와 문의.
- `assets/styles.scss`: SCSS 빌드 진입점.
- `assets/scss/base/`: 공통 색상·폰트·모션.
- `assets/scss/components/`: 컴포넌트별 스타일과 반응형 규칙.
- `assets/js/main.js`: 수업 탭 문구, 메뉴, 이메일 복사, 증명서 뷰어, 그래픽 재생.
- `assets/images/`: AI 콘셉트 이미지와 개인정보를 가린 증명서 사본.

수업 탭 문구는 JS의 `practices`·`visualMessages`에 있습니다. 기본 필라테스 문구는 `practice.html`과 동일하게 유지합니다. 이메일을 바꿀 때는 `contact.html`과 JS의 복사 주소를 함께 수정합니다.

HTML은 Templater의 `@@include('../includes/about.html')` 문법을 사용합니다. `dist/`는 자동 생성되므로 수정하지 않습니다. 정적 배포 시 `dist/` 안의 파일만 사용합니다. `dist/includes/`는 Templater가 함께 생성한 조각 파일입니다.

## 캠페인 설정

`config.js`의 `directoryIndex: false`는 원래 홈페이지를 유지합니다. `staticAssets`는 이미지 사본을 `dist/assets/images/`에 복사합니다. 런타임에 사용하는 클래스는 PurgeCSS safelist로 보호합니다. 다른 캠페인은 기존 방식대로 동작합니다.

## 자료 관리

현재 첫 화면과 소개 사진은 AI 콘셉트입니다. 실제 프로필·수업 사진으로 교체할 수 있습니다. 학력·자격·이름 표기와 개인정보 처리 기준은 AGENTS.md를 참고합니다. 증명서 원본을 assets에 추가하지 않습니다. 기존 프로젝트의 전체 사본은 로컬 부모 폴더의 `_archive/`에 보관하며 Git에 포함하지 않습니다.
