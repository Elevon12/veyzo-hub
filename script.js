/* Veyzo Hub — script.js (v2.1) */
"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
$("#year").textContent = new Date().getFullYear();

/* ---------- Translations ---------- */
const translations = {
  en: {
    pageTitle: "Veyzo Hub — Tools for Gamers",
    metaDescription: "Veyzo Hub — clean, fast tools built for gamers. eDPI calculator, storage planner, game picker and FPS estimator. Free, in your browser.",
    skipLink: "Skip to content", navTools: "Tools", navAbout: "About", explore: "Explore tools",
    heroEyebrow: "YOUR GAMING TOOLKIT", heroTitle: "Play smarter.<br><span>Level up.</span>",
    heroCopy: "Small, useful tools for your gaming setup — all in one place. No downloads. No clutter. Just get in and play.",
    aboutLink: "What is Veyzo Hub?", statTools: "TOOLS TO EXPLORE", statDownloads: "DOWNLOADS NEEDED", statBrowser: "BROWSER-BASED",
    chipReady: "READY TO PLAY", chipOnline: "SYSTEM ONLINE",
    toolbox: "THE TOOLBOX", sectionTitle: "Tools built for <span>your game.</span>", searchTools: "Search tools...", popular: "POPULAR",
    aimControl: "AIM & CONTROL", sensitivityTitle: "Sensitivity Lab", sensitivityDesc: "Calculate your eDPI and compare mouse sensitivity settings in seconds.",
    openTool: "Open tool", quickTool: "QUICK TOOL", pcStorage: "PC & STORAGE", storageTitle: "Storage Planner",
    storageDesc: "Add up game sizes and check how much disk space your library needs.", justForFun: "JUST FOR FUN",
    gameNight: "GAME NIGHT", pickerTitle: "Game Picker", pickerDesc: "Can't decide what to play? Add your games and let fate choose.",
    newTool: "NEW TOOL", performance: "PERFORMANCE", fpsTitle: "FPS Estimator", fpsDesc: "Get a rough FPS estimate for your hardware, game and graphics settings.",
    noResults: "No tools match that search. Try another keyword.", builtFor: "BUILT FOR THE PLAYERS",
    aboutTitle: "Less setup.<br><span>More game time.</span>",
    aboutCopy: "Veyzo Hub is a growing collection of lightweight gaming utilities. This first version runs right in your browser, and your inputs stay on your device.",
    version: "VERSION 2.1", madeFor: "MADE FOR GAMERS", footerTag: "Play smarter. Level up.", modalEyebrow: "VEYZO HUB TOOL",
    langButton: "فارسی", langAria: "تغییر زبان به فارسی",
    sensitivityIntro: "Calculate your effective DPI (eDPI), a simple way to compare aim sensitivity.",
    mouseDpi: "Mouse DPI", inGameSens: "In-game sensitivity", edpiLabel: "YOUR EFFECTIVE DPI", invalidNumbers: "Enter positive numbers in both fields.",
    edpiNote: "Note: eDPI is useful for comparing settings within the same game. Different games use different sensitivity scales.",
    storageIntro: "Add up the size of games you plan to install. Use GB for each entry.", gameName: "Game name", gameNamePlaceholder: "e.g. Counter-Strike 2",
    sizeGb: "Size (GB)", sizePlaceholder: "e.g. 35", addGame: "Add game", totalStorage: "TOTAL STORAGE NEEDED", addGameHint: "Add a game to get started.",
    gameAdded: (n, tb) => `${n} game${n === 1 ? "" : "s"} added · ${tb} TB (decimal estimate)`, removeGame: "Remove",
    pickerIntro: "Build your list, then let the picker choose what you play next.", addGamePlaceholder: "Add a game...", tonightsPick: "TONIGHT'S PICK",
    addTwoGames: "Add at least two games for a fair choice.", gamesInList: n => `${n} games in your list. Ready?`,
    addGameFirst: "Add a game first.", addMoreGames: "Add more games to make the choice more interesting.", choiceMade: "The choice has been made. Have fun!",
    duplicateGame: "That game is already in your list.", pickButton: "Pick a game",
    fpsIntro: "Choose your game and PC parts for a rough performance estimate. This is a guide, not a benchmark result.",
    game: "Game", cpu: "CPU / Processor", gpu: "Graphics card (GPU)", ram: "System RAM", resolution: "Resolution", quality: "Graphics quality",
    selectGame: "Select a game", ram8: "8 GB", ram16: "16 GB", ram32: "32 GB", ram64: "64 GB",
    low: "Low", medium: "Medium", high: "High", ultra: "Ultra", estimateButton: "Estimate FPS", estimatedFps: "ESTIMATED FPS",
    fpsRange: "Approximate range",
    performanceHint: "This is a rough model-based estimate, not a measured benchmark. Real FPS varies with game updates, drivers, cooling, background apps and exact hardware models.",
    entryGpu: "Entry-level GPU", midGpu: "Mid-range GPU", highGpu: "High-end GPU", enthusiastGpu: "Enthusiast GPU",
    entryCpu: "Entry-level CPU", midCpu: "Mid-range CPU", highCpu: "High-end CPU",
    cpuLimit: "CPU may limit performance at low resolutions.", gpuLimit: "GPU is likely to be the main performance limit at this setting.",
    estimateBefore: "Choose your hardware and game, then press Estimate FPS.", lowConfidence: "Low confidence", mediumConfidence: "Medium confidence",
    titleSensitivity: "Sensitivity Lab", titleStorage: "Storage Planner", titlePicker: "Game Picker", titleFps: "FPS Estimator",
    pickAtLeast: "Enter a game name and a size greater than 0.", noGameSelected: "Please choose a game.", closeTool: "Close tool"
  },
  fa: {
    pageTitle: "Veyzo Hub — ابزارهای گیمرها",
    metaDescription: "Veyzo Hub — ابزارهای ساده و سریع برای گیمرها: محاسبه eDPI، برنامه‌ریزی فضای ذخیره‌سازی، انتخابگر بازی و تخمین FPS. رایگان و داخل مرورگر.",
    skipLink: "رفتن به محتوا", navTools: "ابزارها", navAbout: "درباره ما", explore: "مشاهده ابزارها",
    heroEyebrow: "جعبه‌ابزار گیمینگ شما", heroTitle: "هوشمندانه بازی کن.<br><span>سطح خودت رو ببر بالاتر.</span>",
    heroCopy: "ابزارهای کوچک و کاربردی برای تجربه‌ی بهتر بازی؛ همه در یک جا. بدون دانلود و شلوغی، فقط وارد شو و بازی کن.",
    aboutLink: "Veyzo Hub چیه؟", statTools: "ابزار برای استفاده", statDownloads: "نیاز به دانلود", statBrowser: "کاملاً تحت وب",
    chipReady: "آماده‌ی بازی", chipOnline: "سیستم آماده است",
    toolbox: "جعبه‌ابزار", sectionTitle: "ابزارهایی برای <span>بازی تو.</span>", searchTools: "جست‌وجوی ابزارها...", popular: "محبوب",
    aimControl: "نشانه‌گیری و کنترل", sensitivityTitle: "آزمایشگاه حساسیت موس", sensitivityDesc: "eDPI رو محاسبه کن و حساسیت موس رو سریع مقایسه کن.",
    openTool: "باز کردن ابزار", quickTool: "ابزار سریع", pcStorage: "کامپیوتر و حافظه", storageTitle: "برنامه‌ریز فضای ذخیره‌سازی",
    storageDesc: "حجم بازی‌ها رو جمع بزن و فضای موردنیاز کتابخانه‌ات رو ببین.", justForFun: "برای سرگرمی",
    gameNight: "شب بازی", pickerTitle: "انتخابگر بازی", pickerDesc: "نمی‌دونی چی بازی کنی؟ بازی‌هات رو اضافه کن تا قرعه انتخاب کنه.",
    newTool: "ابزار جدید", performance: "کارایی سیستم", fpsTitle: "تخمین‌گر FPS", fpsDesc: "تخمین تقریبی FPS بر اساس سخت‌افزار، بازی و تنظیمات گرافیکی.",
    noResults: "ابزاری پیدا نشد. عبارت دیگری رو امتحان کن.", builtFor: "ساخته‌شده برای گیمرها",
    aboutTitle: "آماده‌سازی کمتر.<br><span>زمان بیشتر برای بازی.</span>",
    aboutCopy: "Veyzo Hub مجموعه‌ای در حال گسترش از ابزارهای سبک گیمینگ است. این نسخه در مرورگر اجرا می‌شود و ورودی‌های تو روی دستگاه خودت می‌مانند.",
    version: "نسخه ۲٫۱", madeFor: "ساخته‌شده برای گیمرها", footerTag: "هوشمندانه بازی کن. پیشرفت کن.", modalEyebrow: "ابزار Veyzo Hub",
    langButton: "English", langAria: "Switch to English",
    sensitivityIntro: "eDPI مؤثر رو حساب کن؛ راهی ساده برای مقایسه‌ی حساسیت نشانه‌گیری.",
    mouseDpi: "DPI موس", inGameSens: "حساسیت داخل بازی", edpiLabel: "eDPI مؤثر شما", invalidNumbers: "در هر دو کادر عددی بزرگ‌تر از صفر وارد کن.",
    edpiNote: "نکته: eDPI برای مقایسه‌ی تنظیمات در یک بازی کاربرد دارد. مقیاس حساسیت بین بازی‌های مختلف فرق می‌کند.",
    storageIntro: "حجم بازی‌هایی رو که می‌خوای نصب کنی جمع بزن. حجم هر بازی رو به GB وارد کن.", gameName: "نام بازی", gameNamePlaceholder: "مثلاً Counter-Strike 2",
    sizeGb: "حجم (GB)", sizePlaceholder: "مثلاً ۳۵", addGame: "افزودن بازی", totalStorage: "مجموع فضای موردنیاز", addGameHint: "برای شروع یک بازی اضافه کن.",
    gameAdded: (n, tb) => `${n} بازی اضافه شده · ${tb} ترابایت (تخمین ده‌دهی)`, removeGame: "حذف",
    pickerIntro: "فهرست بازی‌هات رو بساز و بذار انتخابگر بازی بعدی رو مشخص کنه.", addGamePlaceholder: "نام بازی رو وارد کن...", tonightsPick: "انتخاب امشب",
    addTwoGames: "برای انتخاب بهتر حداقل دو بازی اضافه کن.", gamesInList: n => `${n} بازی در فهرستته. آماده‌ای؟`,
    addGameFirst: "اول یک بازی اضافه کن.", addMoreGames: "برای انتخاب جذاب‌تر چند بازی دیگر اضافه کن.", choiceMade: "انتخاب انجام شد؛ خوش بگذره!",
    duplicateGame: "این بازی قبلاً در فهرست هست.", pickButton: "یکی انتخاب کن",
    fpsIntro: "بازی و قطعات کامپیوترت رو انتخاب کن تا تخمین تقریبی کارایی رو ببینی. این نتیجه راهنماست، نه بنچمارک واقعی.",
    game: "بازی", cpu: "پردازنده (CPU)", gpu: "کارت گرافیک (GPU)", ram: "رم سیستم", resolution: "رزولوشن", quality: "کیفیت گرافیکی",
    selectGame: "انتخاب بازی", ram8: "۸ گیگابایت", ram16: "۱۶ گیگابایت", ram32: "۳۲ گیگابایت", ram64: "۶۴ گیگابایت",
    low: "پایین", medium: "متوسط", high: "بالا", ultra: "فوق‌العاده", estimateButton: "تخمین FPS", estimatedFps: "FPS تخمینی",
    fpsRange: "بازه‌ی تقریبی",
    performanceHint: "این عدد بر اساس یک مدل ساده تخمین زده می‌شود و بنچمارک اندازه‌گیری‌شده نیست. نسخه‌ی بازی، درایور، خنک‌کاری، برنامه‌های پس‌زمینه و مدل دقیق سخت‌افزار روی FPS واقعی اثر دارند.",
    entryGpu: "کارت گرافیک اقتصادی", midGpu: "کارت گرافیک میان‌رده", highGpu: "کارت گرافیک قدرتمند", enthusiastGpu: "کارت گرافیک رده‌بالا",
    entryCpu: "پردازنده اقتصادی", midCpu: "پردازنده میان‌رده", highCpu: "پردازنده قدرتمند",
    cpuLimit: "در رزولوشن پایین ممکن است پردازنده محدودکننده‌ی کارایی باشد.", gpuLimit: "در این تنظیمات احتمالاً کارت گرافیک عامل اصلی محدودیت کارایی است.",
    estimateBefore: "سخت‌افزار و بازی رو انتخاب کن و بعد روی تخمین FPS بزن.", lowConfidence: "اطمینان کم", mediumConfidence: "اطمینان متوسط",
    titleSensitivity: "آزمایشگاه حساسیت موس", titleStorage: "برنامه‌ریز فضای ذخیره‌سازی", titlePicker: "انتخابگر بازی", titleFps: "تخمین‌گر FPS",
    pickAtLeast: "نام بازی و حجمی بیشتر از صفر وارد کن.", noGameSelected: "لطفاً یک بازی انتخاب کن.", closeTool: "بستن ابزار"
  }
};

const STORAGE_KEY = "veyzo-lang";
let currentLang = "en";

function t(key, ...args) {
  const value = translations[currentLang][key];
  return typeof value === "function" ? value(...args) : (value ?? translations.en[key] ?? key);
}
const locale = () => (currentLang === "fa" ? "fa-IR" : "en-US");
const fmt = (n, opts = {}) => Number(n).toLocaleString(locale(), opts);

/* Escape text before putting it inside an HTML string */
function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* Accept Persian / Arabic digits and decimal separators in number fields */
function parseNum(raw) {
  const s = String(raw).trim()
    .replace(/[۰-۹]/g, d => d.charCodeAt(0) - 0x06F0)
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x0660)
    .replace(/[٫,،]/g, ".");
  if (s === "" || !/^\d*\.?\d*$/.test(s) || s === ".") return NaN;
  return Number(s);
}

/* Normalise text for searching (Persian letter variants + digits) */
const norm = s => String(s).toLowerCase().replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\u200c/g, " ").trim();

/* ---------- Language ---------- */
const root = document.documentElement;

function applyLanguage(lang, persist = true) {
  currentLang = lang === "fa" ? "fa" : "en";
  root.lang = currentLang;
  root.dir = currentLang === "fa" ? "rtl" : "ltr";
  document.body.removeAttribute("dir"); // direction lives on <html> only
  document.title = t("pageTitle");
  const meta = $("#metaDescription");
  if (meta) meta.setAttribute("content", t("metaDescription"));

  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  $$("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  $$("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });

  const toggle = $("#languageToggle");
  toggle.textContent = t("langButton");
  toggle.setAttribute("aria-label", t("langAria"));
  toggle.lang = currentLang === "fa" ? "en" : "fa";

  if (persist) { try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) { /* storage may be blocked */ } }

  // Re-render the tool only if it is actually open (this was the cause of the "FPS panel pops up" bug)
  if (!backdrop.hidden && openToolName) renderTool(openToolName, { refreshing: true });
}

function detectLanguage() {
  try {
    const param = new URLSearchParams(location.search).get("lang");
    if (param === "fa" || param === "en") return param;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fa" || saved === "en") return saved;
  } catch (e) { /* ignore */ }
  return (navigator.language || "").toLowerCase().startsWith("fa") ? "fa" : "en";
}

/* ---------- Search ---------- */
const searchInput = $("#toolSearch");
const cards = $$(".tool-card");
searchInput.addEventListener("input", () => {
  const query = norm(searchInput.value);
  let visible = 0;
  cards.forEach(card => {
    const match = norm(card.dataset.search + " " + card.textContent).includes(query);
    card.hidden = !match;
    if (match) visible++;
  });
  $("#noResults").hidden = visible !== 0;
});

/* ---------- Modal ---------- */
const backdrop = $("#modalBackdrop");
const toolModal = $("#toolModal");
const modalTitle = $("#modalTitle");
const modalIntro = $("#modalIntro");
const modalBody = $("#modalBody");
let openToolName = null;
let lastFocus = null;
let rollTimer = null;
let pressedOnBackdrop = false;

function closeModal() {
  if (backdrop.hidden) return;
  backdrop.hidden = true;
  openToolName = null;            // forget which tool was open
  delete toolModal.dataset.tool;
  clearInterval(rollTimer);
  document.body.style.overflow = "";
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  lastFocus = null;
}
$("#modalClose").addEventListener("click", closeModal);
backdrop.addEventListener("mousedown", e => { pressedOnBackdrop = e.target === backdrop; });
backdrop.addEventListener("click", e => { if (e.target === backdrop && pressedOnBackdrop) closeModal(); });
document.addEventListener("keydown", e => {
  if (backdrop.hidden) return;
  if (e.key === "Escape") { closeModal(); return; }
  if (e.key === "Tab") { // keep keyboard focus inside the dialog
    const focusable = $$('button:not([disabled]), input, select, [href], [tabindex]:not([tabindex="-1"])', toolModal).filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ---------- Tool data ---------- */
const games = [
  { id: "valorant", name: "Valorant", factor: 1.18 }, { id: "cs2", name: "Counter-Strike 2", factor: 1.05 },
  { id: "fortnite", name: "Fortnite", factor: 0.9 }, { id: "apex", name: "Apex Legends", factor: 0.82 },
  { id: "gta5", name: "GTA V", factor: 1.3 }, { id: "cyberpunk", name: "Cyberpunk 2077", factor: 0.48 },
  { id: "minecraft", name: "Minecraft (Java)", factor: 1.4 }, { id: "warzone", name: "Call of Duty: Warzone", factor: 0.62 },
  { id: "rdr2", name: "Red Dead Redemption 2", factor: 0.55 }, { id: "overwatch2", name: "Overwatch 2", factor: 1.2 }
];
const cpuTiers = [{ id: "entry", factor: .62, label: "entryCpu" }, { id: "mid", factor: 1, label: "midCpu" }, { id: "high", factor: 1.28, label: "highCpu" }];
const gpuTiers = [{ id: "entry", factor: .48, label: "entryGpu" }, { id: "mid", factor: 1, label: "midGpu" }, { id: "high", factor: 1.55, label: "highGpu" }, { id: "enthusiast", factor: 2.1, label: "enthusiastGpu" }];
const resolutionFactors = { "720p": 1.35, "1080p": 1, "1440p": .72 };
const qualityFactors = { low: 1.35, medium: 1, high: .78, ultra: .58 };

/* Tool state lives outside the render functions, so switching language never wipes what you typed */
const state = {
  sensitivity: { dpi: "800", sens: "0.5" },
  storage: { games: [], name: "", size: "", message: "" },
  picker: { list: [], input: "", result: null, hintKey: null },
  fps: { game: "", cpu: "mid", gpu: "mid", ram: "16", res: "1080p", quality: "medium", estimated: false }
};

const titleKeys = { sensitivity: "titleSensitivity", storage: "titleStorage", picker: "titlePicker", fps: "titleFps" };
const introKeys = { sensitivity: "sensitivityIntro", storage: "storageIntro", picker: "pickerIntro", fps: "fpsIntro" };

function openModal(name, opener) {
  if (!titleKeys[name]) return;
  lastFocus = opener || document.activeElement;
  openToolName = name;
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  renderTool(name, { refreshing: false });
}

function renderTool(name, { refreshing }) {
  clearInterval(rollTimer);
  toolModal.dataset.tool = name;
  toolModal.dir = currentLang === "fa" ? "rtl" : "ltr";
  modalTitle.textContent = t(titleKeys[name]);
  modalIntro.textContent = t(introKeys[name]);
  modalBody.innerHTML = "";
  ({ sensitivity: renderSensitivity, storage: renderStorage, picker: renderPicker, fps: renderFps })[name]();
  if (!refreshing) $("#modalClose").focus();
}

/* ---- Sensitivity Lab ---- */
function renderSensitivity() {
  const s = state.sensitivity;
  modalBody.innerHTML = `
    <div class="field-grid">
      <label class="field">${t("mouseDpi")}<input id="mouseDpi" type="text" inputmode="decimal" autocomplete="off" value="${esc(s.dpi)}"></label>
      <label class="field">${t("inGameSens")}<input id="gameSens" type="text" inputmode="decimal" autocomplete="off" value="${esc(s.sens)}"></label>
    </div>
    <div class="result-box" aria-live="polite"><div class="result-label">${t("edpiLabel")}</div><div class="result-value" id="edpiValue"></div><div class="result-hint" id="edpiHint"></div></div>
    <p class="result-hint">${t("edpiNote")}</p>`;
  const update = () => {
    s.dpi = $("#mouseDpi").value; s.sens = $("#gameSens").value;
    const dpi = parseNum(s.dpi), sens = parseNum(s.sens);
    const valid = dpi > 0 && sens > 0 && dpi <= 100000 && sens <= 100000 && Number.isFinite(dpi * sens);
    $("#edpiValue").textContent = valid ? fmt(dpi * sens, { maximumFractionDigits: 3 }) : "—";
    $("#edpiHint").textContent = valid ? `${fmt(dpi, { maximumFractionDigits: 3 })} DPI × ${fmt(sens, { maximumFractionDigits: 3 })}` : t("invalidNumbers");
  };
  $("#mouseDpi").addEventListener("input", update);
  $("#gameSens").addEventListener("input", update);
  update();
}

/* ---- Storage Planner ---- */
function renderStorage() {
  const s = state.storage;
  modalBody.innerHTML = `
    <div class="field-grid">
      <label class="field">${t("gameName")}<input id="gameName" type="text" maxlength="60" autocomplete="off" value="${esc(s.name)}" placeholder="${esc(t("gameNamePlaceholder"))}"></label>
      <label class="field">${t("sizeGb")}<input id="gameSize" type="text" inputmode="decimal" autocomplete="off" value="${esc(s.size)}" placeholder="${esc(t("sizePlaceholder"))}"></label>
    </div>
    <p class="form-msg" id="formMsg" role="alert" hidden></p>
    <button id="addGame" class="modal-button" type="button">${t("addGame")}</button>
    <div id="storageList" class="game-list"></div>
    <div class="result-box" aria-live="polite"><div class="result-label">${t("totalStorage")}</div><div class="result-value" id="storageTotal"></div><div class="result-hint" id="storageHint"></div></div>`;

  const showMessage = text => { const m = $("#formMsg"); m.textContent = text; m.hidden = !text; s.message = text; };

  const render = () => {
    const list = $("#storageList");
    list.innerHTML = "";
    s.games.forEach((game, index) => {
      const pill = document.createElement("span"); pill.className = "game-pill";
      const label = document.createElement("span"); label.textContent = `${game.name} · ${fmt(game.size, { maximumFractionDigits: 1 })} GB`;
      const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×";
      remove.setAttribute("aria-label", `${t("removeGame")} ${game.name}`);
      remove.addEventListener("click", () => { s.games.splice(index, 1); render(); });
      pill.append(label, remove); list.append(pill);
    });
    const total = Math.round(s.games.reduce((sum, g) => sum + g.size, 0) * 10) / 10;
    $("#storageTotal").textContent = `${fmt(total, { maximumFractionDigits: 1 })} GB`;
    $("#storageHint").textContent = s.games.length ? t("gameAdded", fmt(s.games.length), fmt(total / 1000, { maximumFractionDigits: 2 })) : t("addGameHint");
  };

  const add = () => {
    const name = $("#gameName").value.trim(), size = parseNum($("#gameSize").value);
    if (!name || !Number.isFinite(size) || size <= 0 || size > 10000) { showMessage(t("pickAtLeast")); (name ? $("#gameSize") : $("#gameName")).focus(); return; }
    s.games.push({ name, size: Math.round(size * 10) / 10 });
    s.name = ""; s.size = ""; $("#gameName").value = ""; $("#gameSize").value = "";
    showMessage(""); render(); $("#gameName").focus();
  };

  $("#gameName").addEventListener("input", e => { s.name = e.target.value; });
  $("#gameSize").addEventListener("input", e => { s.size = e.target.value; });
  $("#gameName").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); $("#gameSize").focus(); } });
  $("#gameSize").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); add(); } });
  $("#addGame").addEventListener("click", add);
  showMessage(s.message);
  render();
}

/* ---- Game Picker ---- */
function renderPicker() {
  const s = state.picker;
  modalBody.innerHTML = `
    <div class="game-entry">
      <input id="pickGameInput" maxlength="60" autocomplete="off" value="${esc(s.input)}" placeholder="${esc(t("addGamePlaceholder"))}" aria-label="${esc(t("gameName"))}">
      <button id="pickAdd" type="button">${t("addGame")}</button>
    </div>
    <div class="game-list" id="pickGameList"></div>
    <div class="result-box" aria-live="polite"><div class="result-label">${t("tonightsPick")}</div><div class="picker-result" id="pickResult"></div><div class="result-hint" id="pickHint"></div></div>
    <button class="modal-button" id="pickButton" type="button">✦ ${t("pickButton")}</button>`;

  const setHint = () => {
    const key = s.hintKey;
    $("#pickHint").textContent = key === "duplicateGame" ? t("duplicateGame")
      : key === "addGameFirst" ? t("addGameFirst")
      : key === "addMoreGames" ? t("addMoreGames")
      : key === "choiceMade" ? t("choiceMade")
      : s.list.length < 2 ? t("addTwoGames") : t("gamesInList", fmt(s.list.length));
  };
  const render = () => {
    const list = $("#pickGameList");
    list.innerHTML = "";
    s.list.forEach((game, index) => {
      const pill = document.createElement("span"); pill.className = "game-pill";
      const label = document.createElement("span"); label.textContent = game;
      const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×";
      remove.setAttribute("aria-label", `${t("removeGame")} ${game}`);
      remove.addEventListener("click", () => {
        s.list.splice(index, 1);
        if (s.result === game) s.result = null;
        s.hintKey = null; render();
      });
      pill.append(label, remove); list.append(pill);
    });
    $("#pickResult").textContent = s.result ?? "?";
    setHint();
  };
  const add = () => {
    const value = $("#pickGameInput").value.trim();
    if (!value) return;
    if (s.list.some(g => g.toLowerCase() === value.toLowerCase())) { s.hintKey = "duplicateGame"; setHint(); return; }
    s.list.push(value); s.input = ""; s.hintKey = null; $("#pickGameInput").value = ""; render();
  };

  $("#pickGameInput").addEventListener("input", e => { s.input = e.target.value; });
  $("#pickGameInput").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); add(); } });
  $("#pickAdd").addEventListener("click", add);
  $("#pickButton").addEventListener("click", () => {
    if (!s.list.length) { s.hintKey = "addGameFirst"; setHint(); return; }
    const button = $("#pickButton"), out = $("#pickResult");
    const finish = () => {
      s.result = s.list[Math.floor(Math.random() * s.list.length)];
      s.hintKey = s.list.length === 1 ? "addMoreGames" : "choiceMade";
      out.classList.remove("rolling"); out.textContent = s.result; setHint(); button.disabled = false;
    };
    if (s.list.length === 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }
    button.disabled = true; out.classList.add("rolling");
    let ticks = 0;
    clearInterval(rollTimer);
    rollTimer = setInterval(() => {
      out.textContent = s.list[Math.floor(Math.random() * s.list.length)];
      if (++ticks >= 10) { clearInterval(rollTimer); finish(); }
    }, 80);
  });
  render();
}

/* ---- FPS Estimator ---- */
function renderFps() {
  const s = state.fps;
  const opt = (value, label, current) => `<option value="${value}"${String(current) === String(value) ? " selected" : ""}>${label}</option>`;
  modalBody.innerHTML = `
    <div class="estimate-grid">
      <label class="field">${t("game")}<select id="fpsGame"><option value="">${t("selectGame")}</option>${games.map(g => opt(g.id, esc(g.name), s.game)).join("")}</select></label>
      <label class="field">${t("cpu")}<select id="fpsCpu">${cpuTiers.map(c => opt(c.id, t(c.label), s.cpu)).join("")}</select></label>
      <label class="field">${t("gpu")}<select id="fpsGpu">${gpuTiers.map(g => opt(g.id, t(g.label), s.gpu)).join("")}</select></label>
      <label class="field">${t("ram")}<select id="fpsRam">${opt("8", t("ram8"), s.ram)}${opt("16", t("ram16"), s.ram)}${opt("32", t("ram32"), s.ram)}${opt("64", t("ram64"), s.ram)}</select></label>
      <label class="field">${t("resolution")}<select id="fpsResolution">${opt("720p", "720p", s.res)}${opt("1080p", "1080p", s.res)}${opt("1440p", "1440p", s.res)}</select></label>
      <label class="field">${t("quality")}<select id="fpsQuality">${opt("low", t("low"), s.quality)}${opt("medium", t("medium"), s.quality)}${opt("high", t("high"), s.quality)}${opt("ultra", t("ultra"), s.quality)}</select></label>
    </div>
    <button class="modal-button" id="estimateButton" type="button">${t("estimateButton")}</button>
    <div id="fpsOutput" class="result-box" aria-live="polite"></div>
    <div class="estimate-disclaimer">${t("performanceHint")}</div>`;

  const empty = hint => `<div class="result-label">${t("estimatedFps")}</div><div class="result-value">— FPS</div><div class="result-hint">${hint}</div>`;

  const compute = () => {
    const out = $("#fpsOutput");
    const game = games.find(g => g.id === s.game);
    if (!game) { out.innerHTML = empty(t(s.estimated ? "noGameSelected" : "estimateBefore")); return; }
    const cpu = cpuTiers.find(c => c.id === s.cpu), gpu = gpuTiers.find(g => g.id === s.gpu);
    const ram = Number(s.ram);
    const ramFactor = ram < 16 ? .78 : ram === 16 ? 1 : ram === 32 ? 1.04 : 1.05;
    // A deliberately simple, transparent heuristic; these are not measured game benchmarks.
    const cpuLimited = cpu.factor * game.factor * 115 * ramFactor;
    const gpuLimited = gpu.factor * game.factor * 145 * resolutionFactors[s.res] * qualityFactors[s.quality] * ramFactor;
    const fps = Math.max(8, Math.round(Math.min(cpuLimited, gpuLimited)));
    const spread = Math.max(5, Math.round(fps * .18));
    const lower = Math.max(5, fps - spread), upper = fps + spread;
    const confidence = ["minecraft", "gta5", "valorant", "cs2"].includes(game.id) ? t("mediumConfidence") : t("lowConfidence");
    const limiter = cpuLimited < gpuLimited ? t("cpuLimit") : t("gpuLimit");
    const percent = Math.min(100, Math.round(fps / 240 * 100));
    out.innerHTML = `<div class="result-label">${t("estimatedFps")} · ${esc(game.name)}</div><div class="result-value">${fmt(fps)} FPS</div><div class="result-hint">${t("fpsRange")}: ${fmt(lower)}–${fmt(upper)} FPS · ${confidence}</div><div class="estimate-meter"><i style="width:${percent}%"></i></div><div class="result-hint" style="margin-top:10px">${limiter}</div>`;
  };

  const bind = (id, key) => $(id).addEventListener("change", e => { s[key] = e.target.value; if (s.estimated) compute(); });
  bind("#fpsGame", "game"); bind("#fpsCpu", "cpu"); bind("#fpsGpu", "gpu");
  bind("#fpsRam", "ram"); bind("#fpsResolution", "res"); bind("#fpsQuality", "quality");
  $("#estimateButton").addEventListener("click", () => { s.estimated = true; compute(); });
  compute();
}

/* ---------- Wire everything up ---------- */
$$(".open-tool").forEach(button => button.addEventListener("click", () => openModal(button.dataset.tool, button)));
$("#languageToggle").addEventListener("click", () => applyLanguage(currentLang === "en" ? "fa" : "en"));
applyLanguage(detectLanguage(), false);
