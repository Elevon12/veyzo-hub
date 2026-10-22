const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

$("#year").textContent = new Date().getFullYear();

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

function openModal(name) {
  modalBody.innerHTML = "";
  if (name === "sensitivity") {
    modalTitle.textContent = "Sensitivity Lab";
    modalIntro.textContent = "Calculate your effective DPI (eDPI), a simple way to compare aim sensitivity.";
    modalBody.innerHTML = `
      <div class="field-grid">
        <label class="field">Mouse DPI<input id="mouseDpi" type="number" min="1" max="100000" value="800" inputmode="numeric"></label>
        <label class="field">In-game sensitivity<input id="gameSens" type="number" min="0.001" max="100000" step="0.001" value="0.5" inputmode="decimal"></label>
      </div>
      <div class="result-box" aria-live="polite"><div class="result-label">YOUR EFFECTIVE DPI</div><div class="result-value" id="edpiValue">400</div><div class="result-hint" id="edpiHint">800 DPI × 0.5 sensitivity</div></div>
      <p class="result-hint">Note: eDPI is useful for comparing settings within the same game. Different games use different sensitivity scales.</p>`;
    const update = () => {
      const dpi = Number($("#mouseDpi").value);
      const sens = Number($("#gameSens").value);
      const valid = dpi > 0 && sens > 0 && Number.isFinite(dpi * sens);
      $("#edpiValue").textContent = valid ? (dpi * sens).toLocaleString("en-US", {maximumFractionDigits: 3}) : "—";
      $("#edpiHint").textContent = valid ? `${dpi.toLocaleString("en-US")} DPI × ${sens} sensitivity` : "Enter positive numbers in both fields.";
    };
    $("#mouseDpi").addEventListener("input", update);
    $("#gameSens").addEventListener("input", update);
  } else if (name === "storage") {
    modalTitle.textContent = "Storage Planner";
    modalIntro.textContent = "Add up the size of games you plan to install. Use GB for each entry.";
    modalBody.innerHTML = `
      <div class="field-grid">
        <label class="field">Game name<input id="gameName" type="text" maxlength="60" placeholder="e.g. Counter-Strike 2"></label>
        <label class="field">Size (GB)<input id="gameSize" type="number" min="0.1" max="10000" step="0.1" placeholder="e.g. 35"></label>
      </div>
      <div class="game-entry"><button id="addGame" type="button" style="width:100%;padding:12px;border-radius:10px;border:0;background:#a78bfa;color:#170d25;font-weight:850;cursor:pointer">+ Add game</button></div>
      <div id="storageList" class="game-list"></div>
      <div class="result-box" aria-live="polite"><div class="result-label">TOTAL STORAGE NEEDED</div><div class="result-value" id="storageTotal">0 GB</div><div class="result-hint" id="storageHint">Add a game to get started.</div></div>`;
    const games = [];
    const render = () => {
      $("#storageList").innerHTML = "";
      games.forEach((game, index) => {
        const pill = document.createElement("span");
        pill.className = "game-pill";
        const label = document.createElement("span");
        label.textContent = `${game.name} · ${game.size} GB`;
        const remove = document.createElement("button");
        remove.type = "button"; remove.textContent = "×"; remove.setAttribute("aria-label", `Remove ${game.name}`);
        remove.addEventListener("click", () => { games.splice(index, 1); render(); });
        pill.append(label, remove); $("#storageList").append(pill);
      });
      const total = games.reduce((sum, game) => sum + game.size, 0);
      $("#storageTotal").textContent = `${total.toLocaleString("en-US", {maximumFractionDigits: 1})} GB`;
      $("#storageHint").textContent = games.length ? `${games.length} game${games.length === 1 ? "" : "s"} added · ${(total / 1024).toLocaleString("en-US", {maximumFractionDigits: 2})} TB (decimal estimate)` : "Add a game to get started.";
    };
    $("#addGame").addEventListener("click", () => {
      const name = $("#gameName").value.trim();
      const size = Number($("#gameSize").value);
      if (!name || !Number.isFinite(size) || size <= 0) { $("#gameName").focus(); return; }
      games.push({name, size: Math.round(size * 10) / 10});
      $("#gameName").value = ""; $("#gameSize").value = ""; render(); $("#gameName").focus();
    });
    $("#gameSize").addEventListener("keydown", event => { if (event.key === "Enter") $("#addGame").click(); });
  } else if (name === "picker") {
    modalTitle.textContent = "Game Picker";
    modalIntro.textContent = "Build your list, then let the picker choose what you play next.";
    modalBody.innerHTML = `
      <div class="game-entry"><input class="game-list-input" id="pickGameInput" maxlength="60" placeholder="Add a game..." aria-label="Game name"><button id="pickAdd" type="button">Add</button></div>
      <div class="game-list" id="pickGameList"></div>
      <div class="result-box" aria-live="polite"><div class="result-label">TONIGHT'S PICK</div><div class="picker-result" id="pickResult">Your next game?</div><div class="result-hint" id="pickHint">Add at least two games for a fair choice.</div></div>
      <button class="modal-button" id="pickButton" type="button">Pick a game ✦</button>`;
    const games = [];
    const render = () => {
      $("#pickGameList").innerHTML = "";
      games.forEach((game, index) => {
        const pill = document.createElement("span"); pill.className = "game-pill";
        const label = document.createElement("span"); label.textContent = game;
        const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×"; remove.setAttribute("aria-label", `Remove ${game}`);
        remove.addEventListener("click", () => { games.splice(index, 1); render(); });
        pill.append(label, remove); $("#pickGameList").append(pill);
      });
      $("#pickHint").textContent = games.length < 2 ? "Add at least two games for a fair choice." : `${games.length} games in your list. Ready?`;
    };
    const add = () => { const value = $("#pickGameInput").value.trim(); if (value && !games.includes(value)) { games.push(value); $("#pickGameInput").value = ""; render(); } };
    $("#pickAdd").addEventListener("click", add);
    $("#pickGameInput").addEventListener("keydown", event => { if (event.key === "Enter") add(); });
    $("#pickButton").addEventListener("click", () => {
      if (!games.length) { $("#pickResult").textContent = "Add a game first"; return; }
      const chosen = games[Math.floor(Math.random() * games.length)];
      $("#pickResult").textContent = chosen;
      $("#pickHint").textContent = games.length === 1 ? "Add more games to make the choice more interesting." : "The choice has been made. Have fun!";
    });
  }
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

$$(".open-tool").forEach(button => button.addEventListener("click", () => openModal(button.dataset.tool)));
