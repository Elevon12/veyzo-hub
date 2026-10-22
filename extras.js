/* Veyzo Hub — extras.js (v2.2): Dashboard, Game Library, saved settings, reveal animations */
"use strict";

Object.assign(translations.en, {
  navDashboard: "Dashboard", navLibrary: "Library", navHome: "Home",
  dashEyebrow: "YOUR HUB", dashTitle: "Your gaming <span>dashboard.</span>",
  sysTitle: "This device", sysNote: "Read in your browser only — nothing is uploaded. Browsers hide some details, so treat this as a guide.",
  rDisplay: "Display", rCpu: "CPU threads", rMemory: "Memory", rGpu: "Graphics", rSystem: "System", rNetwork: "Network", unknown: "Not available",
  pcTitle: "My PC", pcHint: "Used to check game requirements. Saved on this device.", useDetected: "Use detected values", pcSaved: "PC profile saved",
  quickTitle: "Quick access", openLibrary: "Browse the library", popularTitle: "Popular picks",
  resetData: "Reset saved data", resetConfirm: "Delete all saved settings on this device?",
  libEyebrow: "GAME LIBRARY", libTitle: "Find your <span>next game.</span>", libSearch: "Search games...",
  genAll: "All", genFps: "FPS", genBr: "Battle Royale", genOpen: "Open World", genRpg: "RPG", genSandbox: "Sandbox", genMoba: "MOBA", genSport: "Sports", genSurvival: "Survival", genRacing: "Racing", genIndie: "Indie", genFav: "Favorites",
  sortLabel: "Sort by", sortPop: "Most popular", sortName: "Name", sortSize: "Install size",
  noGames: "No games match. Try another search or genre.", gamesCount: n => `${n} games`,
  minimum: "Minimum", recommended: "Recommended", installSize: "Install size", released: "Released",
  specNote: "Approximate figures — check the official store page before buying. Cover art is original, not official.",
  runsWell: "Your PC meets the recommended specs.", runsMin: "Your PC meets the minimum specs.", belowMin: "Your PC is below the minimum specs.",
  setPc: "Set your PC in the dashboard to see if it can run this game.",
  estimateFpsBtn: "Estimate FPS", addStorage: "Add to Storage Planner", addPicker: "Add to Game Picker",
  addedStorage: "Added to Storage Planner", addedPicker: "Added to Game Picker", alreadyThere: "Already in the list",
  favAdd: "Add to favorites", favRemove: "Remove from favorites", closeGame: "Close"
});
Object.assign(translations.fa, {
  navDashboard: "داشبورد", navLibrary: "کتابخانه", navHome: "خانه",
  dashEyebrow: "مرکز شما", dashTitle: "داشبورد <span>گیمینگ تو.</span>",
  sysTitle: "این دستگاه", sysNote: "فقط داخل مرورگر خوانده می‌شود و چیزی آپلود نمی‌شود. مرورگرها بعضی جزئیات را پنهان می‌کنند، پس این‌ها فقط راهنما هستند.",
  rDisplay: "نمایشگر", rCpu: "رشته‌های پردازنده", rMemory: "حافظه", rGpu: "گرافیک", rSystem: "سیستم", rNetwork: "شبکه", unknown: "در دسترس نیست",
  pcTitle: "کامپیوتر من", pcHint: "برای بررسی حداقل سیستم موردنیاز بازی‌ها استفاده می‌شود و روی همین دستگاه ذخیره می‌ماند.", useDetected: "استفاده از مقادیر تشخیص‌داده‌شده", pcSaved: "مشخصات کامپیوتر ذخیره شد",
  quickTitle: "دسترسی سریع", openLibrary: "مشاهده‌ی کتابخانه", popularTitle: "بازی‌های محبوب",
  resetData: "پاک کردن داده‌های ذخیره‌شده", resetConfirm: "همه‌ی تنظیمات ذخیره‌شده روی این دستگاه پاک شود؟",
  libEyebrow: "کتابخانه‌ی بازی", libTitle: "<span>بازی بعدی‌ات</span> رو پیدا کن.", libSearch: "جست‌وجوی بازی...",
  genAll: "همه", genFps: "تیراندازی", genBr: "بتل رویال", genOpen: "دنیای باز", genRpg: "نقش‌آفرینی", genSandbox: "ساندباکس", genMoba: "موبا", genSport: "ورزشی", genSurvival: "بقا", genRacing: "مسابقه‌ای", genIndie: "مستقل", genFav: "علاقه‌مندی‌ها",
  sortLabel: "مرتب‌سازی", sortPop: "محبوب‌ترین", sortName: "نام", sortSize: "حجم نصب",
  noGames: "بازی‌ای پیدا نشد. جست‌وجو یا سبک دیگری رو امتحان کن.", gamesCount: n => `${n} بازی`,
  minimum: "حداقل", recommended: "پیشنهادی", installSize: "حجم نصب", released: "سال انتشار",
  specNote: "اعداد تقریبی هستند؛ قبل از خرید صفحه‌ی رسمی بازی رو ببین. کاورها طرح اورجینال هستند، نه کاور رسمی.",
  runsWell: "کامپیوتر تو مشخصات پیشنهادی رو دارد.", runsMin: "کامپیوتر تو حداقل مشخصات رو دارد.", belowMin: "کامپیوتر تو پایین‌تر از حداقل مشخصات است.",
  setPc: "مشخصات کامپیوترت رو در داشبورد تنظیم کن تا ببینی این بازی اجرا می‌شود یا نه.",
  estimateFpsBtn: "تخمین FPS", addStorage: "افزودن به برنامه‌ریز فضا", addPicker: "افزودن به انتخابگر بازی",
  addedStorage: "به برنامه‌ریز فضا اضافه شد", addedPicker: "به انتخابگر بازی اضافه شد", alreadyThere: "قبلاً در فهرست هست",
  favAdd: "افزودن به علاقه‌مندی‌ها", favRemove: "حذف از علاقه‌مندی‌ها", closeGame: "بستن"
});

/* ---------- Saved settings ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("veyzo-" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("veyzo-" + k, JSON.stringify(v)); } catch (e) { /* blocked */ } }
};
const lib = Object.assign({ q: "", genre: "all", sort: "pop", favs: [] }, store.get("lib", {}));
const pc = Object.assign({ set: false, cpu: "mid", gpu: "mid", ram: 16 }, store.get("pc", {}));
const saveLib = () => store.set("lib", lib);

/* Tool state (storage list, picker list, FPS choices) survives reloads */
const savedTools = store.get("tools", {});
["sensitivity", "storage", "picker", "fps"].forEach(k => { if (savedTools[k]) Object.assign(state[k], savedTools[k]); });
state.picker.result = null; state.storage.message = ""; state.picker.hintKey = null;
let saveTimer, gridShown = false, dashShown = false;
const saveTools = () => { clearTimeout(saveTimer); saveTimer = setTimeout(() => store.set("tools", { sensitivity: state.sensitivity, storage: { games: state.storage.games }, picker: { list: state.picker.list }, fps: state.fps }), 300); };
["click", "input", "change"].forEach(ev => document.addEventListener(ev, saveTools));

/* ---------- Helpers ---------- */
const ICONS = {
  heart: '<path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 5 6 5c2 0 3.4 1 4.4 2.4h.2C11.6 6 13 5 15 5c3.3 0 5.1 3.4 3.6 6.8C19.5 16.4 12 21 12 21z"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  home: '<path d="M3 11 12 3l9 8M5 10v10h5v-6h4v6h5V10"/>',
  dash: '<rect x="3" y="3" width="8" height="10" rx="1.5"/><rect x="13" y="3" width="8" height="6" rx="1.5"/><rect x="13" y="11" width="8" height="10" rx="1.5"/><rect x="3" y="15" width="8" height="6" rx="1.5"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
  drive: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M7 12h6M7 15h3"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="12" cy="12" r="1"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'
};
const ico = (n, fill) => `<svg class="ico" viewBox="0 0 24 24" width="1.15em" height="1.15em" fill="${fill ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;
$$("[data-ico]").forEach(el => { el.innerHTML = ico(el.dataset.ico); });
function toast(msg) {
  const el = $("#toast"); el.textContent = msg; el.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 2200);
}
const io = ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches)
  ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const el = e.target; el.classList.add("in"); io.unobserve(el); setTimeout(() => { el.style.transitionDelay = ""; el.classList.add("done"); }, 1000); } }), { threshold: .1 }) : null;
function reveal(scope = document) {
  $$(".reveal:not(.in)", scope).forEach((el, i) => { if (!io) { el.classList.add("in"); return; } el.style.transitionDelay = (i % 6) * 55 + "ms"; io.observe(el); });
}
const tierLabel = { cpu: { entry: "entryCpu", mid: "midCpu", high: "highCpu" }, gpu: { entry: "entryGpu", mid: "midGpu", high: "highGpu", enthusiast: "enthusiastGpu" } };
const tierRank = { entry: 0, mid: 1, high: 2, enthusiast: 3 };
const genreKey = { fps: "genFps", br: "genBr", open: "genOpen", rpg: "genRpg", sandbox: "genSandbox", moba: "genMoba", sport: "genSport", survival: "genSurvival", racing: "genRacing", indie: "genIndie" };
const byId = id => LIB.find(g => g.id === id);

/* ---------- System detection ---------- */
const sys = { gpu: null, hz: null };
function detectGpu() {
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
    let r = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null;
    if (!r) return null;
    r = r.replace(/^ANGLE \(/, "").replace(/\)$/, "");
    const parts = r.split(",");
    return (parts[1] || parts[0]).replace(/Direct3D.*|OpenGL.*/i, "").trim() || null;
  } catch (e) { return null; }
}
function guessGpuTier(r) {
  const s = (r || "").toLowerCase();
  if (/rtx (40|50)[89]0|rtx 30[89]0|rtx 4070 ti|rtx 5070|rx (79|69)\d0/.test(s)) return "enthusiast";
  if (/rtx 4070|rtx 3070|rtx 3060 ti|rtx 40[56]0 ti|rtx 20[78]0|rx (78|68|67)\d0/.test(s)) return "high";
  if (/rtx 4060|rtx 3060|rtx 3050|rtx 20[56]0|gtx 16[56]0|gtx 10[678]0|rx (7[67]|66|65)\d0|apple m/.test(s)) return "mid";
  return "entry";
}
const guessCpuTier = n => (n >= 12 ? "high" : n >= 6 ? "mid" : "entry");
function measureHz() {
  return new Promise(res => {
    const run = () => {
      const gaps = []; let last = 0;
      const f = ts => { if (last) gaps.push(ts - last); last = ts; if (gaps.length < 40) requestAnimationFrame(f); else { gaps.sort((a, b) => a - b); res(1000 / gaps[Math.floor(gaps.length / 2)]); } };
      requestAnimationFrame(f);
    };
    if (document.hidden) document.addEventListener("visibilitychange", function once() { if (!document.hidden) { document.removeEventListener("visibilitychange", once); run(); } }); else run();
  });
}
function browserName() {
  const u = navigator.userAgent;
  return /Edg\//.test(u) ? "Edge" : /OPR\//.test(u) ? "Opera" : /Firefox\//.test(u) ? "Firefox" : /Chrome\//.test(u) ? "Chrome" : /Safari\//.test(u) ? "Safari" : "Browser";
}
function osName() {
  const p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  const u = navigator.userAgent;
  return /Win/i.test(p + u) ? "Windows" : /Android/i.test(u) ? "Android" : /iPhone|iPad/i.test(u) ? "iOS" : /Mac/i.test(p + u) ? "macOS" : /Linux/i.test(p + u) ? "Linux" : p || t("unknown");
}

/* ---------- Dashboard ---------- */
function sysRows() {
  const dpr = window.devicePixelRatio || 1, c = navigator.connection;
  const res = `${fmt(Math.round(screen.width * dpr), { useGrouping: false })}×${fmt(Math.round(screen.height * dpr), { useGrouping: false })}`;
  return [
    ["rDisplay", `${res}${sys.hz ? " · " + fmt(sys.hz) + " Hz" : ""}`, "sysDisplay"],
    ["rCpu", navigator.hardwareConcurrency ? fmt(navigator.hardwareConcurrency) : t("unknown")],
    ["rMemory", navigator.deviceMemory ? "≥ " + fmt(navigator.deviceMemory) + " GB" : t("unknown")],
    ["rGpu", sys.gpu || t("unknown")],
    ["rSystem", `${osName()} · ${browserName()}`],
    ["rNetwork", c && c.effectiveType ? `${c.effectiveType.toUpperCase()}${c.downlink ? " · ~" + fmt(c.downlink) + " Mbps" : ""}` : t("unknown")]
  ];
}
function renderDashboard() {
  const opts = (list, cur, lblMap) => list.map(v => `<option value="${v}"${String(cur) === String(v) ? " selected" : ""}>${lblMap ? t(lblMap[v]) : fmt(v) + " GB"}</option>`).join("");
  const R = dashShown ? " in done" : "";
  dashShown = true;
  const popular = [...LIB].sort((a, b) => b.pop - a.pop).slice(0, 6);
  $("#dashRoot").innerHTML = `
    <div class="section-heading"><div><div class="eyebrow">${t("dashEyebrow")}</div><h2>${t("dashTitle")}</h2></div></div>
    <div class="dash-grid">
      <article class="dash-card reveal${R}"><h3>${t("sysTitle")}</h3>
        <dl class="sys-list">${sysRows().map(([k, v, id]) => `<div><dt>${t(k)}</dt><dd${id ? ` id="${id}"` : ""}>${esc(v)}</dd></div>`).join("")}</dl>
        <p class="dash-note">${t("sysNote")}</p></article>
      <article class="dash-card reveal${R}"><h3>${t("pcTitle")}</h3><p class="dash-note" style="margin-top:0">${t("pcHint")}</p>
        <div class="pc-form">
          <label class="field">${t("cpu")}<select id="pcCpu">${opts(["entry", "mid", "high"], pc.cpu, tierLabel.cpu)}</select></label>
          <label class="field">${t("gpu")}<select id="pcGpu">${opts(["entry", "mid", "high", "enthusiast"], pc.gpu, tierLabel.gpu)}</select></label>
          <label class="field">${t("ram")}<select id="pcRam">${opts([4, 8, 12, 16, 32, 64], pc.ram)}</select></label>
        </div>
        <button class="chip-btn" id="pcDetect" type="button">${ico("refresh")} ${t("useDetected")}</button></article>
      <article class="dash-card reveal${R}"><h3>${t("quickTitle")}</h3>
        <div class="quick-grid">
          <button type="button" class="quick" data-tool="sensitivity"><span>${ico("target")}</span>${t("sensitivityTitle")}</button>
          <button type="button" class="quick" data-tool="storage"><span>${ico("drive")}</span>${t("storageTitle")}</button>
          <button type="button" class="quick" data-tool="picker"><span>${ico("dice")}</span>${t("pickerTitle")}</button>
          <button type="button" class="quick" data-tool="fps"><span>${ico("bolt")}</span>${t("fpsTitle")}</button>
        </div>
        <a class="chip-btn" href="#library">${ico("grid")} ${t("openLibrary")}</a></article>
    </div>
    <h3 class="sub-title reveal${R}">${t("popularTitle")}</h3>
    <div class="popular-row">${popular.map((g, i) => `<button type="button" class="pop-card reveal${R}" data-game="${g.id}"><span class="pop-rank">${fmt(i + 1)}</span>${coverHTML(g, false)}<strong>${esc(g.n)}</strong></button>`).join("")}</div>
    <button class="reset-link" id="resetData" type="button">${t("resetData")}</button>`;

  const save = () => { pc.set = true; pc.cpu = $("#pcCpu").value; pc.gpu = $("#pcGpu").value; pc.ram = Number($("#pcRam").value); store.set("pc", pc); };
  ["#pcCpu", "#pcGpu", "#pcRam"].forEach(s => $(s).addEventListener("change", () => { save(); toast(t("pcSaved")); }));
  $("#pcDetect").addEventListener("click", () => {
    pc.cpu = guessCpuTier(navigator.hardwareConcurrency || 4); if (sys.gpu) pc.gpu = guessGpuTier(sys.gpu);
    if (navigator.deviceMemory) pc.ram = Math.max(pc.ram, navigator.deviceMemory);
    pc.set = true; store.set("pc", pc); renderDashboard(); reveal($("#dashRoot")); toast(t("pcSaved"));
  });
  $$("#dashRoot .quick").forEach(b => b.addEventListener("click", () => openModal(b.dataset.tool, b)));
  $$("#dashRoot .pop-card").forEach(b => b.addEventListener("click", () => openGame(b.dataset.game, b)));
  $("#resetData").addEventListener("click", () => {
    if (!confirm(t("resetConfirm"))) return;
    try { Object.keys(localStorage).filter(k => k.startsWith("veyzo-")).forEach(k => localStorage.removeItem(k)); } catch (e) { /* ignore */ }
    location.reload();
  });
}

/* ---------- Library ---------- */
function renderLibrary() {
  const genres = ["all", "fps", "br", "open", "rpg", "sandbox", "moba", "sport", "survival", "racing", "indie", "fav"];
  $("#libRoot").innerHTML = `
    <div class="section-heading"><div><div class="eyebrow">${t("libEyebrow")}</div><h2>${t("libTitle")}</h2></div>
      <label class="search-wrap"><span aria-hidden="true">⌕</span><input id="libSearch" type="search" autocomplete="off" placeholder="${esc(t("libSearch"))}" aria-label="${esc(t("libSearch"))}" value="${esc(lib.q)}"></label></div>
    <div class="lib-controls">
      <div class="chips" role="group">${genres.map(g => `<button type="button" class="chip${lib.genre === g ? " on" : ""}" data-genre="${g}" aria-pressed="${lib.genre === g}">${g === "all" ? t("genAll") : g === "fav" ? ico("heart", true) + " " + t("genFav") : t(genreKey[g])}</button>`).join("")}</div>
      <label class="sort-wrap">${t("sortLabel")}<select id="libSort"><option value="pop">${t("sortPop")}</option><option value="name">${t("sortName")}</option><option value="size">${t("sortSize")}</option></select></label>
    </div>
    <p class="lib-count" id="libCount" role="status"></p><div class="game-grid" id="gameGrid"></div><p class="no-results" id="libEmpty" hidden>${t("noGames")}</p>`;
  $("#libSort").value = lib.sort;
  $("#libSearch").addEventListener("input", e => { lib.q = e.target.value; saveLib(); renderGrid(); });
  $("#libSort").addEventListener("change", e => { lib.sort = e.target.value; saveLib(); renderGrid(); });
  $$(".chip[data-genre]").forEach(b => b.addEventListener("click", () => {
    lib.genre = b.dataset.genre; saveLib();
    $$(".chip[data-genre]").forEach(x => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
    renderGrid();
  }));
  renderGrid();
}
function renderGrid() {
  const q = norm(lib.q);
  let list = LIB.filter(g => (lib.genre === "all" || (lib.genre === "fav" ? lib.favs.includes(g.id) : g.g.includes(lib.genre))) && (!q || norm(g.n + " " + g.g.map(x => t(genreKey[x])).join(" ")).includes(q)));
  list.sort((a, b) => lib.sort === "name" ? a.n.localeCompare(b.n) : lib.sort === "size" ? b.s - a.s : b.pop - a.pop);
  $("#libCount").textContent = t("gamesCount", fmt(list.length));
  $("#libEmpty").hidden = list.length > 0;
  $("#gameGrid").innerHTML = list.map(g => {
    const fav = lib.favs.includes(g.id);
    return `<article class="game-card reveal${gridShown ? " in done" : ""}"><button type="button" class="cover-btn" data-game="${g.id}">${coverHTML(g)}<span class="game-meta"><span class="game-tags">${g.g.map(x => `<i>${t(genreKey[x])}</i>`).join("")}</span><span class="game-size">${fmt(g.s)} GB</span></span></button>
      <button type="button" class="fav-btn${fav ? " on" : ""}" data-fav="${g.id}" aria-pressed="${fav}" aria-label="${esc(t(fav ? "favRemove" : "favAdd"))} — ${esc(g.n)}">${ico("heart", fav)}</button></article>`;
  }).join("");
  $$("#gameGrid .cover-btn").forEach(b => b.addEventListener("click", () => openGame(b.dataset.game, b)));
  $$("#gameGrid .fav-btn").forEach(b => b.addEventListener("click", () => toggleFav(b.dataset.fav)));
  gridShown = true; reveal($("#gameGrid"));
}
function toggleFav(id) {
  const i = lib.favs.indexOf(id);
  if (i > -1) lib.favs.splice(i, 1); else lib.favs.push(id);
  saveLib();
  const fav = lib.favs.includes(id), g = byId(id), b = $(`.fav-btn[data-fav="${id}"]`);
  if (lib.genre === "fav" && !fav) renderGrid();
  else if (b) { b.classList.toggle("on", fav); b.setAttribute("aria-pressed", fav); b.setAttribute("aria-label", `${t(fav ? "favRemove" : "favAdd")} — ${g.n}`); b.innerHTML = ico("heart", fav); }
  if (!gameModal.hidden && gameModal.dataset.game === id) renderGameModal(id);
}

/* ---------- Game detail modal ---------- */
const gameModal = $("#gameModal");
let gameOpener = null;
function verdict(g) {
  if (!pc.set) return `<p class="verdict neutral">${t("setPc")}</p>`;
  const meets = spec => tierRank[pc.cpu] >= tierRank[spec[0]] && tierRank[pc.gpu] >= tierRank[spec[1]] && pc.ram >= spec[2];
  return meets(g.rec) ? `<p class="verdict good">✓ ${t("runsWell")}</p>` : meets(g.min) ? `<p class="verdict ok">● ${t("runsMin")}</p>` : `<p class="verdict bad">✕ ${t("belowMin")}</p>`;
}
function renderGameModal(id) {
  const g = byId(id), fav = lib.favs.includes(id);
  const spec = s => `<dl><div><dt>${t("cpu")}</dt><dd>${t(tierLabel.cpu[s[0]])}</dd></div><div><dt>${t("gpu")}</dt><dd>${t(tierLabel.gpu[s[1]])}</dd></div><div><dt>${t("ram")}</dt><dd>${fmt(s[2])} GB</dd></div></dl>`;
  gameModal.dataset.game = id;
  $("#gameBody").innerHTML = `
    <div class="gm-cover">${coverHTML(g)}</div>
    <div class="gm-info">
      <div class="game-tags">${g.g.map(x => `<i>${t(genreKey[x])}</i>`).join("")}</div>
      <h2 id="gameTitle">${esc(g.n)}</h2>
      <p class="gm-meta">${t("released")}: ${fmt(g.y, { useGrouping: false })} · ${t("installSize")}: ~${fmt(g.s)} GB</p>
      ${verdict(g)}
      <div class="spec-grid"><div><h4>${t("minimum")}</h4>${spec(g.min)}</div><div><h4>${t("recommended")}</h4>${spec(g.rec)}</div></div>
      <p class="dash-note">${t("specNote")}</p>
      <div class="gm-actions">
        <button class="modal-button" id="gmFps" type="button">${ico("bolt")} ${t("estimateFpsBtn")}</button>
        <button class="chip-btn" id="gmStorage" type="button">${ico("drive")} ${t("addStorage")}</button>
        <button class="chip-btn" id="gmPicker" type="button">${ico("dice")} ${t("addPicker")}</button>
        <button class="chip-btn${fav ? " on" : ""}" id="gmFav" type="button">${ico("heart", fav)} ${t(fav ? "favRemove" : "favAdd")}</button>
      </div></div>`;
  $("#gmFps").addEventListener("click", () => { state.fps.game = id; state.fps.estimated = true; const o = gameOpener; closeGame(false); openModal("fps", o); });
  $("#gmStorage").addEventListener("click", () => {
    if (state.storage.games.some(x => x.name === g.n)) { toast(t("alreadyThere")); return; }
    state.storage.games.push({ name: g.n, size: g.s }); saveTools(); toast(t("addedStorage"));
  });
  $("#gmPicker").addEventListener("click", () => {
    if (state.picker.list.some(x => x.toLowerCase() === g.n.toLowerCase())) { toast(t("alreadyThere")); return; }
    state.picker.list.push(g.n); saveTools(); toast(t("addedPicker"));
  });
  $("#gmFav").addEventListener("click", () => toggleFav(id));
}
function openGame(id, opener) {
  if (!byId(id)) return;
  gameOpener = opener || document.activeElement;
  gameModal.hidden = false; document.body.style.overflow = "hidden";
  gameModal.querySelector(".tool-modal").dir = currentLang === "fa" ? "rtl" : "ltr";
  renderGameModal(id); $("#gameClose").focus();
}
function closeGame(restore = true) {
  if (gameModal.hidden) return;
  gameModal.hidden = true; delete gameModal.dataset.game; document.body.style.overflow = "";
  if (restore && gameOpener && document.contains(gameOpener)) gameOpener.focus();
  if (restore) gameOpener = null;
}
$("#gameClose").addEventListener("click", () => closeGame());
gameModal.addEventListener("click", e => { if (e.target === gameModal) closeGame(); });
document.addEventListener("keydown", e => {
  if (gameModal.hidden) return;
  if (e.key === "Escape") { closeGame(); return; }
  if (e.key === "Tab") {
    const f = $$("button:not([disabled]), [href]", gameModal).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
});

/* ---------- Boot ---------- */
function renderAll() {
  renderDashboard(); renderLibrary(); reveal();
  if (!gameModal.hidden && gameModal.dataset.game) { gameModal.querySelector(".tool-modal").dir = currentLang === "fa" ? "rtl" : "ltr"; renderGameModal(gameModal.dataset.game); }
}
function onLangChange() { renderAll(); } // called by applyLanguage in script.js

sys.gpu = detectGpu();
applyLanguage(currentLang, false);   // re-translate now that the new strings exist (also calls renderAll)
measureHz().then(hz => {
  sys.hz = [30, 48, 50, 60, 75, 90, 100, 120, 144, 165, 240].reduce((a, b) => Math.abs(b - hz) < Math.abs(a - hz) ? b : a);
  const cell = $("#sysDisplay"); if (cell) cell.textContent = sysRows()[0][1];
});
