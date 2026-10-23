/* Veyzo Hub — extras2.js (v2.5): live background, spotlight cards, game pages, 2 new tools, profile */
"use strict";

Object.assign(translations.en, {
  navProfile: "Profile", netTools: "NETWORK & DOWNLOADS",
  profileEyebrow: "YOU", profileTitle: "Your <span>profile.</span>", profileName: "Display name", profileNamePh: "Your gamer name", profileColor: "Avatar color",
  profileStatFavs: "Favorite games", profileStatLib: "Games in library", profileStatList: "In storage planner", guest: "Guest",
  exportData: "Export backup", importData: "Import backup", exported: "Backup downloaded", imported: "Backup imported", importFail: "That is not a valid Veyzo Hub backup.",
  backupNote: "Everything is stored only on this device. Export a backup to move it to another browser.",
  backLibrary: "Back to library", popularityLbl: "Popularity", copyLink: "Copy link", linkCopied: "Link copied", similarGames: "Similar games",
  convertTitle: "Sensitivity Converter", convertDesc: "Move your aim from one game to another with the same feel.", titleConvert: "Sensitivity Converter",
  convertIntro: "Convert mouse sensitivity between games and see your cm/360 distance.", fromGame: "From game", toGame: "To game", sensLabel: "Sensitivity",
  convResult: "CONVERTED SENSITIVITY", convHint: (cm, inch) => `${cm} cm/360° · ${inch} in/360°`,
  convNote: "Uses each game's approximate yaw value, so treat the result as a very close starting point.", convInvalid: "Enter positive numbers.",
  dlTitle: "Download Time", dlDesc: "Find out how long a game takes to download.", titleDownload: "Download Time",
  dlIntro: "Estimate how long a download will take on your connection.", pickGame: "Pick a game (optional)", speedMbps: "Internet speed (Mbps)",
  dlResult: "ESTIMATED TIME", dlHint: r => `Realistic with overhead: ~${r}`, dlNote: "Uses the advertised speed in megabits per second. Real speeds vary.",
  unitH: "h", unitM: "min", underMin: "under 1 min"
});
Object.assign(translations.fa, {
  navProfile: "پروفایل", netTools: "شبکه و دانلود",
  profileEyebrow: "شما", profileTitle: "<span>پروفایل</span> تو.", profileName: "نام نمایشی", profileNamePh: "اسم گیمرت", profileColor: "رنگ آواتار",
  profileStatFavs: "بازی‌های موردعلاقه", profileStatLib: "بازی در کتابخانه", profileStatList: "در برنامه‌ریز فضا", guest: "مهمان",
  exportData: "دریافت نسخه‌ی پشتیبان", importData: "بازگردانی پشتیبان", exported: "فایل پشتیبان دانلود شد", imported: "پشتیبان بازگردانی شد", importFail: "این فایل پشتیبان معتبر Veyzo Hub نیست.",
  backupNote: "همه‌چیز فقط روی همین دستگاه ذخیره می‌شود. برای انتقال به مرورگر دیگر، پشتیبان بگیر.",
  backLibrary: "بازگشت به کتابخانه", popularityLbl: "محبوبیت", copyLink: "کپی لینک", linkCopied: "لینک کپی شد", similarGames: "بازی‌های مشابه",
  convertTitle: "مبدل حساسیت", convertDesc: "حساسیت نشانه‌گیری رو از یک بازی به بازی دیگه با همون حس منتقل کن.", titleConvert: "مبدل حساسیت",
  convertIntro: "حساسیت موس رو بین بازی‌ها تبدیل کن و مسافت cm/360 خودت رو ببین.", fromGame: "از بازی", toGame: "به بازی", sensLabel: "حساسیت",
  convResult: "حساسیت تبدیل‌شده", convHint: (cm, inch) => `${cm} سانتی‌متر/۳۶۰° · ${inch} اینچ/۳۶۰°`,
  convNote: "از مقدار تقریبی yaw هر بازی استفاده می‌کند؛ نتیجه یک نقطه‌ی شروع بسیار نزدیک است.", convInvalid: "اعداد مثبت وارد کن.",
  dlTitle: "زمان دانلود", dlDesc: "ببین دانلود یک بازی چقدر طول می‌کشد.", titleDownload: "زمان دانلود",
  dlIntro: "زمان تقریبی دانلود با سرعت اینترنت خودت رو حساب کن.", pickGame: "انتخاب بازی (اختیاری)", speedMbps: "سرعت اینترنت (مگابیت بر ثانیه)",
  dlResult: "زمان تخمینی", dlHint: r => `در عمل با احتساب افت سرعت: حدود ${r}`, dlNote: "بر اساس سرعت اعلام‌شده‌ی اینترنت (مگابیت بر ثانیه)؛ سرعت واقعی کمی فرق می‌کند.",
  unitH: "ساعت", unitM: "دقیقه", underMin: "کمتر از ۱ دقیقه"
});

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Live background, progress bar, sticky header, spotlight ---------- */
(function visuals() {
  const bar = $("#progress"), top = $(".topbar");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      top.classList.toggle("scrolled", scrollY > 24);
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // soft spotlight that follows the pointer on cards
  document.addEventListener("pointermove", e => {
    const el = e.target.closest && e.target.closest(".tool-card,.dash-card,.game-card,.pop-card,.gp-tile");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (e.clientX - r.left) + "px"); el.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  // ambient particle network (skipped for reduced motion)
  const cv = $("#bgFx");
  if (reduceMotion || !cv.getContext) { cv.remove(); return; }
  const ctx = cv.getContext("2d");
  let w, h, dots = [], mouse = { x: -999, y: -999 }, running = true;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr; cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    const n = innerWidth < 600 ? 22 : 46;
    dots = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25 * dpr, vy: (Math.random() - .5) * .25 * dpr, r: (Math.random() * 1.4 + .6) * dpr }));
  };
  addEventListener("resize", resize); resize();
  addEventListener("pointermove", e => { const d = Math.min(devicePixelRatio || 1, 1.5); mouse.x = e.clientX * d; mouse.y = e.clientY * d; }, { passive: true });
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) frame(); });
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    const link = 130 * (w / innerWidth);
    for (const p of dots) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 18000) { p.x += dx * .002; p.y += dy * .002; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = "rgba(167,139,250,.55)"; ctx.fill();
    }
    for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
      const a = dots[i], b = dots[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
      if (d < link) { ctx.strokeStyle = `rgba(139,92,246,${(1 - d / link) * .22})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

/* fade-in for the static section headings */
$$(".tools-section .section-heading,.about-section").forEach(el => el.classList.add("reveal"));

/* ---------- 2a. Dedicated game pages: #/game/<id> ---------- */
const gameRoute = () => { const m = location.hash.match(/^#\/game\/([a-z0-9]+)$/i); return m && byId(m[1]) ? m[1] : null; };
window.openGame = id => { if (byId(id)) location.hash = "#/game/" + id; };   // cards in the library & dashboard now open pages
let wasGamePage = false;

function renderGamePage() {
  const id = gameRoute(), page = $("#gamePage");
  if (!id) return;
  const g = byId(id), fav = lib.favs.includes(id);
  const spec = s => `<dl><div><dt>${t("cpu")}</dt><dd>${t(tierLabel.cpu[s[0]])}</dd></div><div><dt>${t("gpu")}</dt><dd>${t(tierLabel.gpu[s[1]])}</dd></div><div><dt>${t("ram")}</dt><dd>${fmt(s[2])} GB</dd></div></dl>`;
  const similar = LIB.filter(x => x.id !== id).map(x => ({ x, n: x.g.filter(k => g.g.includes(k)).length })).filter(o => o.n).sort((a, b) => b.n - a.n || b.x.pop - a.x.pop).slice(0, 6).map(o => o.x);
  page.dir = currentLang === "fa" ? "rtl" : "ltr";
  page.innerHTML = `
    <a class="back-link" href="#library"><span class="arr arr-flip" aria-hidden="true">←</span> ${t("backLibrary")}</a>
    <div class="gp-hero"><div class="gp-bg" aria-hidden="true">${coverHTML(g, false)}</div>
      <div class="gp-cover">${coverHTML(g)}</div>
      <div class="gp-info">
        <div class="game-tags">${g.g.map(x => `<i>${t(genreKey[x])}</i>`).join("")}</div>
        <h1 id="gpTitle" tabindex="-1">${esc(g.n)}</h1>
        <div class="gp-tiles">
          <div class="gp-tile"><span>${t("released")}</span><b>${fmt(g.y, { useGrouping: false })}</b></div>
          <div class="gp-tile"><span>${t("installSize")}</span><b>~${fmt(g.s)} GB</b></div>
          <div class="gp-tile"><span>${t("popularityLbl")}</span><b>${fmt(g.pop)}/${fmt(100)}</b></div>
        </div>
        ${verdict(g)}
        <div class="gm-actions">
          <button class="modal-button" id="gpFps" type="button">${ico("bolt")} ${t("estimateFpsBtn")}</button>
          <button class="chip-btn" id="gpStorage" type="button">${ico("drive")} ${t("addStorage")}</button>
          <button class="chip-btn" id="gpPicker" type="button">${ico("dice")} ${t("addPicker")}</button>
          <button class="chip-btn${fav ? " on" : ""}" id="gpFav" type="button">${ico("heart", fav)} ${t(fav ? "favRemove" : "favAdd")}</button>
          <button class="chip-btn" id="gpLink" type="button">${ico("link")} ${t("copyLink")}</button>
        </div>
      </div></div>
    <div class="gp-specs"><div class="dash-card"><h3>${t("minimum")}</h3>${spec(g.min)}</div><div class="dash-card"><h3>${t("recommended")}</h3>${spec(g.rec)}</div></div>
    <p class="dash-note">${t("specNote")}</p>
    ${similar.length ? `<h3 class="sub-title">${t("similarGames")}</h3><div class="popular-row">${similar.map(x => `<button type="button" class="pop-card" data-game="${x.id}">${coverHTML(x, false)}<strong>${esc(x.n)}</strong></button>`).join("")}</div>` : ""}`;

  $("#gpFps").addEventListener("click", () => { state.fps.game = id; state.fps.estimated = true; openModal("fps", $("#gpFps")); });
  $("#gpStorage").addEventListener("click", () => {
    if (state.storage.games.some(x => x.name === g.n)) { toast(t("alreadyThere")); return; }
    state.storage.games.push({ name: g.n, size: g.s }); saveTools(); toast(t("addedStorage"));
  });
  $("#gpPicker").addEventListener("click", () => {
    if (state.picker.list.some(x => x.toLowerCase() === g.n.toLowerCase())) { toast(t("alreadyThere")); return; }
    state.picker.list.push(g.n); saveTools(); toast(t("addedPicker"));
  });
  $("#gpFav").addEventListener("click", () => { toggleFav(id); renderGamePage(); });
  $("#gpLink").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(location.href); toast(t("linkCopied")); } catch (e) { toast(location.href); }
  });
  $$("#gamePage .pop-card").forEach(b => b.addEventListener("click", () => openGame(b.dataset.game)));
}

function route() {
  const id = gameRoute(), page = $("#gamePage");
  document.body.classList.toggle("game-view", !!id);
  page.hidden = !id;
  if (id) {
    renderGamePage(); document.title = `${byId(id).n} — Veyzo Hub`;
    scrollTo(0, 0); const h = $("#gpTitle"); if (h) h.focus({ preventScroll: true });
  } else {
    document.title = t("pageTitle");
    if (wasGamePage && location.hash.length > 1 && !location.hash.startsWith("#/")) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) requestAnimationFrame(() => el.scrollIntoView());
    }
  }
  wasGamePage = !!id;
}
addEventListener("hashchange", route);

/* ---------- 2b. Two new tools ---------- */
const YAW = { cs2: ["Counter-Strike 2", 0.022], valorant: ["Valorant", 0.07], ow2: ["Overwatch 2", 0.0066], apex: ["Apex Legends", 0.022], warzone: ["Call of Duty: Warzone", 0.0066] };
const conv = Object.assign({ from: "cs2", to: "valorant", sens: "1.2", dpi: "800" }, store.get("conv", {}));
const dl = Object.assign({ size: "50", speed: "100", game: "" }, store.get("dl", {}));

function renderConvert() {
  const opt = (cur) => Object.entries(YAW).map(([k, v]) => `<option value="${k}"${cur === k ? " selected" : ""}>${v[0]}</option>`).join("");
  $("#modalBody").innerHTML = `
    <div class="field-grid">
      <label class="field">${t("fromGame")}<select id="cvFrom">${opt(conv.from)}</select></label>
      <label class="field">${t("toGame")}<select id="cvTo">${opt(conv.to)}</select></label>
      <label class="field">${t("sensLabel")}<input id="cvSens" type="text" inputmode="decimal" autocomplete="off" value="${esc(conv.sens)}"></label>
      <label class="field">${t("mouseDpi")}<input id="cvDpi" type="text" inputmode="decimal" autocomplete="off" value="${esc(conv.dpi)}"></label>
    </div>
    <div class="result-box" aria-live="polite"><div class="result-label">${t("convResult")}</div><div class="result-value" id="cvOut"></div><div class="result-hint" id="cvHint"></div></div>
    <p class="result-hint">${t("convNote")}</p>`;
  const update = () => {
    conv.from = $("#cvFrom").value; conv.to = $("#cvTo").value; conv.sens = $("#cvSens").value; conv.dpi = $("#cvDpi").value; store.set("conv", conv);
    const s = parseNum(conv.sens), d = parseNum(conv.dpi), ok = s > 0 && d > 0 && s < 100000 && d < 100000;
    if (!ok) { $("#cvOut").textContent = "—"; $("#cvHint").textContent = t("convInvalid"); return; }
    const yf = YAW[conv.from][1], yt = YAW[conv.to][1], inch = 360 / (s * yf * d);
    $("#cvOut").textContent = fmt(s * yf / yt, { maximumFractionDigits: 3 });
    $("#cvHint").textContent = t("convHint", fmt(inch * 2.54, { maximumFractionDigits: 1 }), fmt(inch, { maximumFractionDigits: 1 }));
  };
  $$("#cvFrom,#cvTo").forEach(el => el.addEventListener("change", update)); $$("#cvSens,#cvDpi").forEach(el => el.addEventListener("input", update));
  update();
}

function fmtDur(sec) {
  const m = Math.round(sec / 60);
  if (m < 1) return t("underMin");
  const hh = Math.floor(m / 60), mm = m % 60;
  return (hh ? `${fmt(hh)} ${t("unitH")} ` : "") + `${fmt(mm)} ${t("unitM")}`;
}
function renderDownload() {
  const games = [...LIB].sort((a, b) => a.n.localeCompare(b.n));
  $("#modalBody").innerHTML = `
    <div class="field-grid">
      <label class="field" style="grid-column:1/-1">${t("pickGame")}<select id="dlGame"><option value="">—</option>${games.map(g => `<option value="${g.id}"${dl.game === g.id ? " selected" : ""}>${esc(g.n)} (~${g.s} GB)</option>`).join("")}</select></label>
      <label class="field">${t("sizeGb")}<input id="dlSize" type="text" inputmode="decimal" autocomplete="off" value="${esc(dl.size)}"></label>
      <label class="field">${t("speedMbps")}<input id="dlSpeed" type="text" inputmode="decimal" autocomplete="off" value="${esc(dl.speed)}"></label>
    </div>
    <div class="result-box" aria-live="polite"><div class="result-label">${t("dlResult")}</div><div class="result-value" id="dlOut"></div><div class="result-hint" id="dlHint"></div></div>
    <p class="result-hint">${t("dlNote")}</p>`;
  const update = () => {
    dl.size = $("#dlSize").value; dl.speed = $("#dlSpeed").value; dl.game = $("#dlGame").value; store.set("dl", dl);
    const gb = parseNum(dl.size), mbps = parseNum(dl.speed);
    if (!(gb > 0 && mbps > 0)) { $("#dlOut").textContent = "—"; $("#dlHint").textContent = t("convInvalid"); return; }
    const sec = gb * 8000 / mbps;
    $("#dlOut").textContent = fmtDur(sec); $("#dlHint").textContent = t("dlHint", fmtDur(sec / .85));
  };
  $("#dlGame").addEventListener("change", e => { const g = byId(e.target.value); if (g) $("#dlSize").value = g.s; update(); });
  $$("#dlSize,#dlSpeed").forEach(el => el.addEventListener("input", () => { $("#dlGame").value = ""; update(); }));
  update();
}
Object.assign(titleKeys, { convert: "titleConvert", download: "titleDownload" });
Object.assign(introKeys, { convert: "convertIntro", download: "dlIntro" });
Object.assign(extraTools, { convert: renderConvert, download: renderDownload });

/* ---------- 3. Profile + backup ---------- */
const profile = Object.assign({ name: "", hue: 265 }, store.get("profile", {}));
const HUES = [265, 200, 330, 150, 35, 0];
const avatar = () => `<span class="avatar" style="--h:${profile.hue}">${esc((profile.name.trim()[0] || "V").toUpperCase())}</span>`;

function renderProfile() {
  const name = profile.name.trim() || t("guest");
  $("#profileRoot").innerHTML = `
    <div class="section-heading"><div><div class="eyebrow">${t("profileEyebrow")}</div><h2>${t("profileTitle")}</h2></div></div>
    <div class="profile-grid">
      <article class="dash-card"><div class="profile-head"><span id="pfAvatar">${avatar()}</span><div><strong id="pfName">${esc(name)}</strong>
        <div class="dash-note" style="margin:2px 0 0">${t("profileStatFavs")}: ${fmt(lib.favs.length)} · ${t("profileStatList")}: ${fmt(state.storage.games.length)}</div></div></div>
        <label class="field" style="margin-top:16px">${t("profileName")}<input id="pfInput" maxlength="24" autocomplete="off" value="${esc(profile.name)}" placeholder="${esc(t("profileNamePh"))}"></label>
        <div class="field" style="margin-top:14px">${t("profileColor")}<div class="swatches" role="group">${HUES.map(h => `<button type="button" class="swatch${h === profile.hue ? " on" : ""}" data-hue="${h}" style="--h:${h}" aria-label="${h}" aria-pressed="${h === profile.hue}"></button>`).join("")}</div></div></article>
      <article class="dash-card"><div class="quick-grid">
        <div class="gp-tile"><span>${t("profileStatFavs")}</span><b>${fmt(lib.favs.length)}</b></div>
        <div class="gp-tile"><span>${t("profileStatLib")}</span><b>${fmt(LIB.length)}</b></div></div>
        <div class="gm-actions"><button class="chip-btn" id="pfExport" type="button">${ico("link")} ${t("exportData")}</button>
        <button class="chip-btn" id="pfImport" type="button">${ico("refresh")} ${t("importData")}</button></div>
        <input type="file" id="pfFile" accept="application/json,.json" hidden><p class="dash-note">${t("backupNote")}</p></article>
    </div>`;
  const saveProfile = () => store.set("profile", profile);
  $("#pfInput").addEventListener("input", e => { profile.name = e.target.value; saveProfile(); $("#pfName").textContent = profile.name.trim() || t("guest"); $("#pfAvatar").innerHTML = avatar(); });
  $$(".swatch").forEach(b => b.addEventListener("click", () => {
    profile.hue = Number(b.dataset.hue); saveProfile(); $$(".swatch").forEach(x => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); }); $("#pfAvatar").innerHTML = avatar();
  }));
  $("#pfExport").addEventListener("click", () => {
    const data = {};
    try { Object.keys(localStorage).filter(k => k.startsWith("veyzo-")).forEach(k => { data[k] = localStorage.getItem(k); }); } catch (e) { /* ignore */ }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ app: "veyzo-hub", data }, null, 2)], { type: "application/json" }));
    a.download = "veyzo-hub-backup.json"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); toast(t("exported"));
  });
  $("#pfImport").addEventListener("click", () => $("#pfFile").click());
  $("#pfFile").addEventListener("change", e => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        if (obj.app !== "veyzo-hub" || typeof obj.data !== "object") throw 0;
        Object.entries(obj.data).forEach(([k, v]) => { if (k.startsWith("veyzo-") && typeof v === "string") localStorage.setItem(k, v); });
        toast(t("imported")); setTimeout(() => location.reload(), 700);
      } catch (err) { toast(t("importFail")); }
    };
    r.readAsText(file);
  });
}

/* ---------- Hook into language changes and boot ---------- */
const previousOnLang = onLangChange;
window.onLangChange = () => { previousOnLang(); renderProfile(); if (gameRoute()) { renderGamePage(); document.title = `${byId(gameRoute()).n} — Veyzo Hub`; } };
renderProfile(); reveal(); route();
applyLanguage(currentLang, false);
