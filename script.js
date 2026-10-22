const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
$("#year").textContent = new Date().getFullYear();

const translations = {
  en: {
    pageTitle:"Veyzo Hub — Tools for Gamers", navTools:"Tools", navAbout:"About", explore:"Explore tools",
    heroEyebrow:"YOUR GAMING TOOLKIT", heroTitle:'Play smarter.<br><span>Level up.</span>',
    heroCopy:"Small, useful tools for your gaming setup — all in one place. No downloads. No clutter. Just get in and play.",
    aboutLink:"What is Veyzo Hub?", statTools:"TOOLS TO EXPLORE", statDownloads:"DOWNLOADS NEEDED", statBrowser:"BROWSER-BASED",
    toolbox:"THE TOOLBOX", sectionTitle:'Tools built for <span>your game.</span>', searchTools:"Search tools...", popular:"POPULAR",
    aimControl:"AIM & CONTROL", sensitivityTitle:"Sensitivity Lab", sensitivityDesc:"Calculate your eDPI and compare mouse sensitivity settings in seconds.",
    openTool:"Open tool", quickTool:"QUICK TOOL", pcStorage:"PC & STORAGE", storageTitle:"Storage Planner",
    storageDesc:"Add up game sizes and check how much disk space your library needs.", justForFun:"JUST FOR FUN",
    gameNight:"GAME NIGHT", pickerTitle:"Game Picker", pickerDesc:"Can't decide what to play? Add your games and let fate choose.",
    newTool:"NEW TOOL", performance:"PERFORMANCE", fpsTitle:"FPS Estimator", fpsDesc:"Get a rough FPS estimate for your hardware, game and graphics settings.",
    noResults:"No tools match that search. Try another keyword.", builtFor:"BUILT FOR THE PLAYERS",
    aboutTitle:'Less setup.<br><span>More game time.</span>', aboutCopy:"Veyzo Hub is a growing collection of lightweight gaming utilities. This first version runs right in your browser, and your inputs stay on your device.",
    version:"VERSION 2.0", madeFor:"MADE FOR GAMERS", footerTag:"Play smarter. Level up.", modalEyebrow:"VEYZO HUB TOOL",
    langButton:"فارسی", sensitivityIntro:"Calculate your effective DPI (eDPI), a simple way to compare aim sensitivity.",
    mouseDpi:"Mouse DPI", inGameSens:"In-game sensitivity", edpiLabel:"YOUR EFFECTIVE DPI", invalidNumbers:"Enter positive numbers in both fields.",
    edpiNote:"Note: eDPI is useful for comparing settings within the same game. Different games use different sensitivity scales.",
    storageIntro:"Add up the size of games you plan to install. Use GB for each entry.", gameName:"Game name", gameNamePlaceholder:"e.g. Counter-Strike 2",
    sizeGb:"Size (GB)", sizePlaceholder:"e.g. 35", addGame:"+ Add game", totalStorage:"TOTAL STORAGE NEEDED", addGameHint:"Add a game to get started.",
    gameAdded:(n,total,tb)=>`${n} game${n===1?"":"s"} added · ${tb} TB (decimal estimate)`, removeGame:"Remove",
    pickerIntro:"Build your list, then let the picker choose what you play next.", addGamePlaceholder:"Add a game...", tonightsPick:"TONIGHT'S PICK",
    addTwoGames:"Add at least two games for a fair choice.", gamesInList:n=>`${n} games in your list. Ready?`,
    addGameFirst:"Add a game first", addMoreGames:"Add more games to make the choice more interesting.", choiceMade:"The choice has been made. Have fun!",
    fpsIntro:"Choose your game and PC parts for a rough performance estimate. This is a guide, not a benchmark result.",
    game:"Game", cpu:"CPU / Processor", gpu:"Graphics card (GPU)", ram:"System RAM", resolution:"Resolution", quality:"Graphics quality",
    selectGame:"Select a game", selectCpu:"Select a CPU tier", selectGpu:"Select a GPU tier", ram8:"8 GB", ram16:"16 GB", ram32:"32 GB", ram64:"64 GB",
    low:"Low", medium:"Medium", high:"High", ultra:"Ultra", estimateButton:"Estimate FPS", estimatedFps:"ESTIMATED FPS",
    fpsRange:"Approximate range", performanceHint:"This is a rough model-based estimate, not a measured benchmark. Real FPS varies with game updates, drivers, cooling, background apps and exact hardware models.",
    entryGpu:"Entry-level GPU", midGpu:"Mid-range GPU", highGpu:"High-end GPU", enthusiastGpu:"Enthusiast GPU",
    entryCpu:"Entry-level CPU", midCpu:"Mid-range CPU", highCpu:"High-end CPU",
    cpuLimit:"CPU may limit performance at low resolutions.", gpuLimit:"GPU is likely to be the main performance limit at this setting.",
    estimateBefore:"Choose your hardware and game, then press Estimate FPS.", lowConfidence:"Low confidence", mediumConfidence:"Medium confidence",
    titleSensitivity:"Sensitivity Lab", titleStorage:"Storage Planner", titlePicker:"Game Picker", titleFps:"FPS Estimator",
    pickAtLeast:"Enter a game name and a positive size.", noGameSelected:"Please choose a game.", closeTool:"Close tool"
  },
  fa: {
    pageTitle:"Veyzo Hub — ابزارهای گیمرها", navTools:"ابزارها", navAbout:"درباره ما", explore:"مشاهده ابزارها",
    heroEyebrow:"جعبه‌ابزار گیمینگ شما", heroTitle:'هوشمندانه بازی کن.<br><span>سطح خودت رو ببر بالاتر.</span>',
    heroCopy:"ابزارهای کوچک و کاربردی برای تجربه‌ی بهتر بازی؛ همه در یک جا. بدون دانلود و شلوغی، فقط وارد شو و بازی کن.",
    aboutLink:"Veyzo Hub چیه؟", statTools:"ابزار برای استفاده", statDownloads:"نیاز به دانلود", statBrowser:"کاملاً تحت وب",
    toolbox:"جعبه‌ابزار", sectionTitle:'ابزارهایی برای <span>بازی تو.</span>', searchTools:"جست‌وجوی ابزارها...", popular:"محبوب",
    aimControl:"نشانه‌گیری و کنترل", sensitivityTitle:"آزمایشگاه حساسیت موس", sensitivityDesc:"eDPI رو محاسبه کن و حساسیت موس رو سریع مقایسه کن.",
    openTool:"باز کردن ابزار", quickTool:"ابزار سریع", pcStorage:"کامپیوتر و حافظه", storageTitle:"برنامه‌ریز فضای ذخیره‌سازی",
    storageDesc:"حجم بازی‌ها رو جمع بزن و فضای موردنیاز کتابخانه‌ات رو ببین.", justForFun:"برای سرگرمی",
    gameNight:"شب بازی", pickerTitle:"انتخابگر بازی", pickerDesc:"نمی‌دونی چی بازی کنی؟ بازی‌هات رو اضافه کن تا قرعه انتخاب کنه.",
    newTool:"ابزار جدید", performance:"کارایی سیستم", fpsTitle:"تخمین‌گر FPS", fpsDesc:"تخمین تقریبی FPS بر اساس سخت‌افزار، بازی و تنظیمات گرافیکی.",
    noResults:"ابزاری پیدا نشد. عبارت دیگری رو امتحان کن.", builtFor:"ساخته‌شده برای گیمرها",
    aboutTitle:'آماده‌سازی کمتر.<br><span>زمان بیشتر برای بازی.</span>', aboutCopy:"Veyzo Hub مجموعه‌ای در حال گسترش از ابزارهای سبک گیمینگ است. این نسخه در مرورگر اجرا می‌شود و ورودی‌های تو روی دستگاه خودت می‌مانند.",
    version:"نسخه ۲٫۰", madeFor:"ساخته‌شده برای گیمرها", footerTag:"هوشمندانه بازی کن. پیشرفت کن.", modalEyebrow:"ابزار VEYZO HUB",
    langButton:"English", sensitivityIntro:"eDPI مؤثر رو حساب کن؛ راهی ساده برای مقایسه‌ی حساسیت نشانه‌گیری.",
    mouseDpi:"DPI موس", inGameSens:"حساسیت داخل بازی", edpiLabel:"eDPI مؤثر شما", invalidNumbers:"در هر دو کادر عددی بزرگ‌تر از صفر وارد کن.",
    edpiNote:"نکته: eDPI برای مقایسه‌ی تنظیمات در یک بازی کاربرد دارد. مقیاس حساسیت بین بازی‌های مختلف فرق می‌کند.",
    storageIntro:"حجم بازی‌هایی رو که می‌خوای نصب کنی جمع بزن. حجم هر بازی رو به GB وارد کن.", gameName:"نام بازی", gameNamePlaceholder:"مثلاً Counter-Strike 2",
    sizeGb:"حجم (GB)", sizePlaceholder:"مثلاً ۳۵", addGame:"+ افزودن بازی", totalStorage:"مجموع فضای موردنیاز", addGameHint:"برای شروع یک بازی اضافه کن.",
    gameAdded:(n,total,tb)=>`${n} بازی اضافه شده · ${tb} ترابایت (تخمین ده‌دهی)`, removeGame:"حذف",
    pickerIntro:"فهرست بازی‌هات رو بساز و بذار انتخابگر بازی بعدی رو مشخص کنه.", addGamePlaceholder:"نام بازی رو وارد کن...", tonightsPick:"انتخاب امشب",
    addTwoGames:"برای انتخاب بهتر حداقل دو بازی اضافه کن.", gamesInList:n=>`${n} بازی در فهرستته. آماده‌ای؟`,
    addGameFirst:"اول یک بازی اضافه کن", addMoreGames:"برای انتخاب جذاب‌تر چند بازی دیگر اضافه کن.", choiceMade:"انتخاب انجام شد؛ خوش بگذره!",
    fpsIntro:"بازی و قطعات کامپیوترت رو انتخاب کن تا تخمین تقریبی کارایی رو ببینی. این نتیجه راهنماست، نه بنچمارک واقعی.",
    game:"بازی", cpu:"پردازنده (CPU)", gpu:"کارت گرافیک (GPU)", ram:"رم سیستم", resolution:"رزولوشن", quality:"کیفیت گرافیکی",
    selectGame:"انتخاب بازی", selectCpu:"انتخاب سطح پردازنده", selectGpu:"انتخاب سطح کارت گرافیک", ram8:"۸ گیگابایت", ram16:"۱۶ گیگابایت", ram32:"۳۲ گیگابایت", ram64:"۶۴ گیگابایت",
    low:"پایین", medium:"متوسط", high:"بالا", ultra:"فوق‌العاده", estimateButton:"تخمین FPS", estimatedFps:"FPS تخمینی",
    fpsRange:"بازه‌ی تقریبی", performanceHint:"این عدد بر اساس یک مدل ساده تخمین زده می‌شود و بنچمارک اندازه‌گیری‌شده نیست. نسخه‌ی بازی، درایور، خنک‌کاری، برنامه‌های پس‌زمینه و مدل دقیق سخت‌افزار روی FPS واقعی اثر دارند.",
    entryGpu:"کارت گرافیک اقتصادی", midGpu:"کارت گرافیک میان‌رده", highGpu:"کارت گرافیک قدرتمند", enthusiastGpu:"کارت گرافیک رده‌بالا",
    entryCpu:"پردازنده اقتصادی", midCpu:"پردازنده میان‌رده", highCpu:"پردازنده قدرتمند",
    cpuLimit:"در رزولوشن پایین ممکن است پردازنده محدودکننده‌ی کارایی باشد.", gpuLimit:"در این تنظیمات احتمالاً کارت گرافیک عامل اصلی محدودیت کارایی است.",
    estimateBefore:"سخت‌افزار و بازی رو انتخاب کن و بعد روی تخمین FPS بزن.", lowConfidence:"اطمینان کم", mediumConfidence:"اطمینان متوسط",
    titleSensitivity:"آزمایشگاه حساسیت موس", titleStorage:"برنامه‌ریز فضای ذخیره‌سازی", titlePicker:"انتخابگر بازی", titleFps:"تخمین‌گر FPS",
    pickAtLeast:"نام بازی و حجم بیشتر از صفر وارد کن.", noGameSelected:"لطفاً یک بازی انتخاب کن.", closeTool:"بستن ابزار"
  }
};

let currentLang = "en";
function t(key, ...args) { const value = translations[currentLang][key]; return typeof value === "function" ? value(...args) : (value ?? key); }
function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.body.dir = lang === "fa" ? "rtl" : "ltr";
  document.title = t("pageTitle");
  $$("[data-i18n]").forEach(el => { const key = el.dataset.i18n; if (translations[lang][key] !== undefined && typeof translations[lang][key] !== "function") el.textContent = t(key); });
  $$("[data-i18n-html]").forEach(el => { const key = el.dataset.i18nHtml; if (translations[lang][key] !== undefined) el.innerHTML = t(key); });
  $$("[data-i18n-placeholder]").forEach(el => { const key = el.dataset.i18nPlaceholder; if (translations[lang][key] !== undefined) el.placeholder = t(key); });
  $("#languageToggle").textContent = t("langButton");
  $("#languageToggle").setAttribute("aria-label", lang === "fa" ? "Switch to English" : "تغییر زبان به فارسی");
  const active = $(".tool-modal");
  if (active) { active.dir = lang === "fa" ? "rtl" : "ltr"; const openName = active.dataset.tool; if (openName) openModal(openName, true); }
}
$("#languageToggle").addEventListener("click", () => applyLanguage(currentLang === "en" ? "fa" : "en"));

const searchInput = $("#toolSearch");
const cards = $$(".tool-card");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const match = (card.dataset.search + " " + card.innerText).toLowerCase().includes(query);
    card.hidden = !match;
    if (match) visible++;
  });
  $("#noResults").hidden = visible !== 0;
});

const backdrop = $("#modalBackdrop");
const modalTitle = $("#modalTitle");
const modalIntro = $("#modalIntro");
const modalBody = $("#modalBody");
const closeModal = () => { backdrop.hidden = true; document.body.style.overflow = ""; };
$("#modalClose").addEventListener("click", closeModal);
backdrop.addEventListener("click", event => { if (event.target === backdrop) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

const games = [
  {id:"valorant",name:"Valorant",factor:1.18},{id:"cs2",name:"Counter-Strike 2",factor:1.05},
  {id:"fortnite",name:"Fortnite",factor:0.9},{id:"apex",name:"Apex Legends",factor:0.82},
  {id:"gta5",name:"GTA V",factor:1.3},{id:"cyberpunk",name:"Cyberpunk 2077",factor:0.48},
  {id:"minecraft",name:"Minecraft (Java)",factor:1.4},{id:"warzone",name:"Call of Duty: Warzone",factor:0.62},
  {id:"rdr2",name:"Red Dead Redemption 2",factor:0.55},{id:"overwatch2",name:"Overwatch 2",factor:1.2}
];
const cpuTiers = [{id:"entry",factor:.62,label:"entryCpu"},{id:"mid",factor:1,label:"midCpu"},{id:"high",factor:1.28,label:"highCpu"}];
const gpuTiers = [{id:"entry",factor:.48,label:"entryGpu"},{id:"mid",factor:1,label:"midGpu"},{id:"high",factor:1.55,label:"highGpu"},{id:"enthusiast",factor:2.1,label:"enthusiastGpu"}];
const resolutionFactors = {"720p":1.35,"1080p":1,"1440p":.72};
const qualityFactors = {low:1.35,medium:1,high:.78,ultra:.58};

function openModal(name, refreshing = false) {
  modalBody.innerHTML = "";
  const titleKeys = {sensitivity:"titleSensitivity",storage:"titleStorage",picker:"titlePicker",fps:"titleFps"};
  modalTitle.textContent = t(titleKeys[name] || "modalEyebrow");
  $(".tool-modal").dataset.tool = name;
  $(".tool-modal").dir = currentLang === "fa" ? "rtl" : "ltr";

  if (name === "sensitivity") {
    modalIntro.textContent = t("sensitivityIntro");
    modalBody.innerHTML = `
      <div class="field-grid">
        <label class="field">${t("mouseDpi")}<input id="mouseDpi" type="number" min="1" max="100000" value="800" inputmode="numeric"></label>
        <label class="field">${t("inGameSens")}<input id="gameSens" type="number" min="0.001" max="100000" step="0.001" value="0.5" inputmode="decimal"></label>
      </div>
      <div class="result-box" aria-live="polite"><div class="result-label">${t("edpiLabel")}</div><div class="result-value" id="edpiValue">400</div><div class="result-hint" id="edpiHint">800 DPI × 0.5</div></div>
      <p class="result-hint">${t("edpiNote")}</p>`;
    const update = () => { const dpi=Number($("#mouseDpi").value), sens=Number($("#gameSens").value), valid=dpi>0&&sens>0&&Number.isFinite(dpi*sens); $("#edpiValue").textContent=valid?(dpi*sens).toLocaleString(currentLang==="fa"?"fa-IR":"en-US",{maximumFractionDigits:3}):"—"; $("#edpiHint").textContent=valid?`${dpi} DPI × ${sens}`:t("invalidNumbers"); };
    $("#mouseDpi").addEventListener("input",update); $("#gameSens").addEventListener("input",update);
  } else if (name === "storage") {
    modalIntro.textContent = t("storageIntro");
    modalBody.innerHTML = `
      <div class="field-grid">
        <label class="field">${t("gameName")}<input id="gameName" type="text" maxlength="60" placeholder="${t("gameNamePlaceholder")}"></label>
        <label class="field">${t("sizeGb")}<input id="gameSize" type="number" min="0.1" max="10000" step="0.1" placeholder="${t("sizePlaceholder")}"></label>
      </div>
      <div class="game-entry"><button id="addGame" type="button" style="width:100%;padding:12px;border-radius:10px;border:0;background:#a78bfa;color:#170d25;font-weight:850;cursor:pointer">${t("addGame")}</button></div>
      <div id="storageList" class="game-list"></div>
      <div class="result-box" aria-live="polite"><div class="result-label">${t("totalStorage")}</div><div class="result-value" id="storageTotal">0 GB</div><div class="result-hint" id="storageHint">${t("addGameHint")}</div></div>`;
    const storedGames=[];
    const render=()=>{ $("#storageList").innerHTML=""; storedGames.forEach((game,index)=>{ const pill=document.createElement("span");pill.className="game-pill";const label=document.createElement("span");label.textContent=`${game.name} · ${game.size} GB`;const remove=document.createElement("button");remove.type="button";remove.textContent="×";remove.setAttribute("aria-label",`${t("removeGame")} ${game.name}`);remove.addEventListener("click",()=>{storedGames.splice(index,1);render()});pill.append(label,remove);$("#storageList").append(pill);});const total=storedGames.reduce((sum,g)=>sum+g.size,0);$("#storageTotal").textContent=`${total.toLocaleString(currentLang==="fa"?"fa-IR":"en-US",{maximumFractionDigits:1})} GB`;$("#storageHint").textContent=storedGames.length?t("gameAdded",storedGames.length,total,(total/1024).toLocaleString(currentLang==="fa"?"fa-IR":"en-US",{maximumFractionDigits:2})):t("addGameHint");};
    $("#addGame").addEventListener("click",()=>{const name=$("#gameName").value.trim(),size=Number($("#gameSize").value);if(!name||!Number.isFinite(size)||size<=0){$("#gameName").focus();return}storedGames.push({name,size:Math.round(size*10)/10});$("#gameName").value="";$("#gameSize").value="";render();$("#gameName").focus()});
    $("#gameSize").addEventListener("keydown",e=>{if(e.key==="Enter")$("#addGame").click()});
  } else if (name === "picker") {
    modalIntro.textContent=t("pickerIntro");
    modalBody.innerHTML=`<div class="game-entry"><input class="game-list-input" id="pickGameInput" maxlength="60" placeholder="${t("addGamePlaceholder")}" aria-label="${t("gameName")}"><button id="pickAdd" type="button">${t("addGame").replace("+ ","")}</button></div><div class="game-list" id="pickGameList"></div><div class="result-box" aria-live="polite"><div class="result-label">${t("tonightsPick")}</div><div class="picker-result" id="pickResult">?</div><div class="result-hint" id="pickHint">${t("addTwoGames")}</div></div><button class="modal-button" id="pickButton" type="button">✦ ${t("pickerTitle")}</button>`;
    const list=[];
    const render=()=>{$("#pickGameList").innerHTML="";list.forEach((game,index)=>{const pill=document.createElement("span");pill.className="game-pill";const label=document.createElement("span");label.textContent=game;const remove=document.createElement("button");remove.type="button";remove.textContent="×";remove.setAttribute("aria-label",`${t("removeGame")} ${game}`);remove.addEventListener("click",()=>{list.splice(index,1);render()});pill.append(label,remove);$("#pickGameList").append(pill)});$("#pickHint").textContent=list.length<2?t("addTwoGames"):t("gamesInList",list.length)};
    const add=()=>{const value=$("#pickGameInput").value.trim();if(value&&!list.includes(value)){list.push(value);$("#pickGameInput").value="";render()}};
    $("#pickAdd").addEventListener("click",add);$("#pickGameInput").addEventListener("keydown",e=>{if(e.key==="Enter")add()});
    $("#pickButton").addEventListener("click",()=>{$("#pickResult").textContent=list.length?list[Math.floor(Math.random()*list.length)]:t("addGameFirst");if(list.length)$("#pickHint").textContent=list.length===1?t("addMoreGames"):t("choiceMade")});
  } else if (name === "fps") {
    modalIntro.textContent=t("fpsIntro");
    const gameOptions=games.map(g=>`<option value="${g.id}">${g.name}</option>`).join("");
    const cpuOptions=cpuTiers.map(c=>`<option value="${c.id}">${t(c.label)}</option>`).join("");
    const gpuOptions=gpuTiers.map(g=>`<option value="${g.id}">${t(g.label)}</option>`).join("");
    modalBody.innerHTML=`
      <div class="estimate-grid">
        <label class="field">${t("game")}<select id="fpsGame"><option value="">${t("selectGame")}</option>${gameOptions}</select></label>
        <label class="field">${t("cpu")}<select id="fpsCpu">${cpuOptions}</select></label>
        <label class="field">${t("gpu")}<select id="fpsGpu">${gpuOptions}</select></label>
        <label class="field">${t("ram")}<select id="fpsRam"><option value="8">${t("ram8")}</option><option value="16" selected>${t("ram16")}</option><option value="32">${t("ram32")}</option><option value="64">${t("ram64")}</option></select></label>
        <label class="field">${t("resolution")}<select id="fpsResolution"><option value="720p">720p</option><option value="1080p" selected>1080p</option><option value="1440p">1440p</option></select></label>
        <label class="field">${t("quality")}<select id="fpsQuality"><option value="low">${t("low")}</option><option value="medium" selected>${t("medium")}</option><option value="high">${t("high")}</option><option value="ultra">${t("ultra")}</option></select></label>
      </div>
      <button class="modal-button" id="estimateButton" type="button">${t("estimateButton")}</button>
      <div id="fpsOutput" class="result-box" aria-live="polite"><div class="result-label">${t("estimatedFps")}</div><div class="result-value">— FPS</div><div class="result-hint">${t("estimateBefore")}</div></div>
      <div class="estimate-disclaimer">${t("performanceHint")}</div>`;
    $("#estimateButton").addEventListener("click",()=>{
      const gameId=$("#fpsGame").value;
      if(!gameId){$("#fpsOutput").innerHTML=`<div class="result-label">${t("estimatedFps")}</div><div class="result-value">— FPS</div><div class="result-hint">${t("noGameSelected")}</div>`;return}
      const game=games.find(g=>g.id===gameId),cpu=cpuTiers.find(c=>c.id===$("#fpsCpu").value),gpu=gpuTiers.find(g=>g.id===$("#fpsGpu").value);
      const ram=Number($("#fpsRam").value),res=$("#fpsResolution").value,quality=$("#fpsQuality").value;
      const ramFactor=ram<16?.78:ram===16?1:ram===32?1.04:1.05;
      const cpuFactor=cpu.factor, gpuFactor=gpu.factor, resFactor=resolutionFactors[res], qualFactor=qualityFactors[quality];
      // A deliberately simple, transparent heuristic; these are not measured game benchmarks.
      const cpuLimited=cpuFactor*game.factor*115*ramFactor;
      const gpuLimited= gpuFactor*game.factor*145*resFactor*qualFactor*ramFactor;
      const fps=Math.max(8,Math.round(Math.min(cpuLimited,gpuLimited)));
      const spread=Math.max(5,Math.round(fps*.18));
      const lower=Math.max(5,fps-spread),upper=fps+spread;
      const confidence=(gameId==="minecraft"||gameId==="gta5"||gameId==="valorant"||gameId==="cs2")?t("mediumConfidence"):t("lowConfidence");
      const limiter=cpuLimited<gpuLimited?t("cpuLimit"):t("gpuLimit");
      const fmt=n=>n.toLocaleString(currentLang==="fa"?"fa-IR":"en-US");
      const percent=Math.min(100,Math.round(fps/240*100));
      $("#fpsOutput").innerHTML=`<div class="result-label">${t("estimatedFps")} · ${game.name}</div><div class="result-value">${fmt(fps)} FPS</div><div class="result-hint">${t("fpsRange")}: ${fmt(lower)}–${fmt(upper)} FPS · ${confidence}</div><div class="estimate-meter"><i style="width:${percent}%"></i></div><div class="result-hint" style="margin-top:10px">${limiter}</div>`;
    });
  }
  backdrop.hidden=false;
  document.body.style.overflow="hidden";
  if(!refreshing)$("#modalClose").focus();
}

$$(".open-tool").forEach(button=>button.addEventListener("click",()=>openModal(button.dataset.tool)));
applyLanguage("en");
