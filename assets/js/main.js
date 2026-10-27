"use strict";
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-nav");
function closeMenu() {
  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  mobileMenu.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
});
mobileMenu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const practices = {
  pilates: {
    label: "AWARENESS IN EVERY MOVEMENT",
    heading: "호흡부터 자세까지, 차근차근.",
    copy: "호흡과 자세를 살피며 몸을 안정적으로 움직이는 방법을 익힙니다. 매트와 리포머 교육에서 배운 원리를 바탕으로, 각자의 체력에 맞춰 동작을 지도합니다.",
    caption: "BREATH / ALIGNMENT / CONTROL",
    focus: ["코어 안정성", "바른 자세 익히기", "호흡과 동작의 연결"],
  },
  training: {
    label: "STRENGTH FOR YOUR EVERYDAY",
    heading: "내 목표에 맞춰, 꾸준히.",
    copy: "체중 관리와 근력 강화 등 원하는 목표에 맞춰 운동 계획을 세웁니다. 현재의 체력과 운동 경험에 맞게 지도하고, 동작을 익혀 꾸준히 실천할 수 있도록 돕습니다.",
    caption: "STRENGTH / CONSISTENCY / CONFIDENCE",
    focus: ["맞춤 운동 프로그램", "근력과 기초 체력", "꾸준한 운동 습관"],
  },
  lifelong: {
    label: "MOVEMENT AT EVERY STAGE",
    heading: "나이와 체력에 맞게, 무리 없이.",
    copy: "학교 수업부터 성인·시니어 개인 운동까지 다양한 연령대를 지도해 왔습니다. 나이와 체력에 맞춰 스트레칭과 근력 운동을 지도하고, 익숙하지 않은 동작도 이해하기 쉽게 설명합니다.",
    caption: "TEENS / ADULTS / SENIORS",
    focus: ["청소년 운동 교육", "성인 맞춤 운동", "시니어 체력 관리"],
  },
};
const visualMessages = {
  pilates: "호흡을 따라, 중심을 느끼며.",
  training: "동작을 익히고, 조금씩 힘을 쌓으며.",
  lifelong: "몸의 변화에 맞춰, 나만의 속도로.",
};
const tabs = [...document.querySelectorAll("[data-practice]")];
function selectPractice(tab) {
  const key = tab.dataset.practice;
  const item = practices[key];
  tabs.forEach((button) => {
    const selected = button === tab;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  document
    .getElementById("practice-panel")
    .setAttribute("aria-labelledby", tab.id);
  for (const field of ["label", "heading", "copy"])
    document.getElementById("practice-" + field).textContent = item[field];
  document.getElementById("visual-message").textContent = visualMessages[key];
  document.querySelector(".visual-index").textContent =
    "0" + (tabs.indexOf(tab) + 1) + " / THE METHOD";
  document.querySelector(".practice-art").dataset.mode = key;
  document.getElementById("practice-focus").replaceChildren(
    ...item.focus.map((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    }),
  );
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectPractice(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectPractice(tabs[next]);
      tabs[next].focus();
    }
  });
});
const copyButton = document.querySelector(".copy-email");
copyButton.addEventListener("click", async () => {
  const status = document.getElementById("contact-status");
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText("junheelim26@gmail.com");
    status.textContent = "이메일 주소를 복사했습니다.";
    copyButton.textContent = "복사 완료";
  } catch {
    status.textContent =
      "자동 복사를 사용할 수 없습니다. 위 이메일 주소를 선택해서 복사해 주세요.";
  }
});
document.getElementById("year").textContent = new Date().getFullYear();
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.documentElement.classList.add("js-motion");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));
}

// Only flattened, redacted public copies are ever loaded into the document viewer.
const publicDocuments = {
  degree: {
    title: "졸업증명서",
    alt: "덕성여자대학교 생활체육학과 체육학사 졸업증명서. 주민등록번호 등 식별번호는 가려져 있습니다.",
    url: "assets/images/credentials/degree-public.webp?v=2",
    width: 1184,
  },
  transcript: {
    title: "성적증명서",
    alt: "덕성여자대학교 성적증명서. 총평점 4.47/4.50, 최우등졸업. 주민등록번호 등 식별번호는 가려져 있습니다.",
    url: "assets/images/credentials/transcript-public.webp?v=2",
    width: 1200,
  },
  "jump-rope": {
    title: "음악 줄넘기 지도자 수료증",
    alt: "대한줄넘기협회 초급 음악 줄넘기 지도자 연수과정 수료증. 생년월일과 증서번호는 가려져 있습니다.",
    url: "assets/images/credentials/jump-rope-public.webp?v=2",
    width: 1136,
  },
};
const documentDialog = document.getElementById("document-dialog");
const documentImage = document.getElementById("document-image");
const documentStage = documentDialog.querySelector(".document-stage");
const zoomButton = document.getElementById("document-zoom");
const loadingText = document.getElementById("document-loading");
let documentTrigger = null;
function resetDocumentZoom() {
  documentStage.classList.remove("is-zoomed");
  zoomButton.setAttribute("aria-pressed", "false");
  zoomButton.textContent = "원본 크기로 확대";
  documentStage.scrollTop = 0;
  documentStage.scrollLeft = 0;
}
document.querySelectorAll("[data-document]").forEach((link) =>
  link.addEventListener("click", (event) => {
    const info = publicDocuments[link.dataset.document];
    if (!info || typeof documentDialog.showModal !== "function") return;
    event.preventDefault();
    documentTrigger = link;
    resetDocumentZoom();
    document.getElementById("document-title").textContent = info.title;
    document.getElementById("document-open").href = info.url;
    documentImage.hidden = true;
    documentImage.alt = info.alt;
    loadingText.hidden = false;
    loadingText.textContent = "문서를 불러오는 중입니다.";
    zoomButton.disabled = true;
    documentStage.style.setProperty("--document-width", info.width + "px");
    documentImage.onload = () => {
      documentImage.hidden = false;
      loadingText.hidden = true;
      zoomButton.disabled = false;
    };
    documentImage.onerror = () => {
      loadingText.textContent =
        "이미지를 불러오지 못했습니다. 새 탭에서 보기를 이용해 주세요.";
    };
    documentImage.src = info.url;
    document.body.classList.add("document-open");
    documentDialog.showModal();
  }),
);
zoomButton.addEventListener("click", () => {
  if (documentStage.classList.contains("is-zoomed")) resetDocumentZoom();
  else {
    documentStage.classList.add("is-zoomed");
    zoomButton.setAttribute("aria-pressed", "true");
    zoomButton.textContent = "전체 보기";
    documentStage.scrollTop = 0;
    documentStage.scrollLeft = 0;
  }
});
documentDialog
  .querySelector(".document-close")
  .addEventListener("click", () => documentDialog.close());
documentDialog.addEventListener("click", (event) => {
  if (event.target !== documentDialog) return;
  const box = documentDialog.getBoundingClientRect();
  if (
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom
  )
    documentDialog.close();
});
documentDialog.addEventListener("close", () => {
  document.body.classList.remove("document-open");
  resetDocumentZoom();
  if (documentTrigger) documentTrigger.focus({ preventScroll: true });
});

const motionToggle = document.querySelector(".motion-toggle");
motionToggle.addEventListener("click", () => {
  const paused = motionToggle.getAttribute("aria-pressed") !== "true";
  motionToggle.setAttribute("aria-pressed", String(paused));
  motionToggle.setAttribute(
    "aria-label",
    paused ? "그래픽 움직임 다시 재생" : "그래픽 움직임 일시 정지",
  );
  motionToggle.innerHTML = paused
    ? '움직임 재생 <span aria-hidden="true">▷</span>'
    : '움직임 멈추기 <span aria-hidden="true">Ⅱ</span>';
  document
    .querySelector(".practice-art")
    .classList.toggle("motion-paused", paused);
});
