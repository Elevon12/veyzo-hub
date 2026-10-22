/* Veyzo Hub — games.js: library data + original generated cover art.
   Each entry: id, name, genres, release year, install size (GB, approx), popularity score,
   cover hues [a,b], cover motif, and min/rec specs as [cpuTier, gpuTier, ramGB].
   Specs and sizes are approximate — always check the official store page. */
"use strict";

const LIB = [
  { id: "valorant", n: "Valorant", g: ["fps"], y: 2020, s: 30, pop: 98, c: [350, 265], m: "target", min: ["entry", "entry", 4], rec: ["mid", "mid", 8] },
  { id: "cs2", n: "Counter-Strike 2", g: ["fps"], y: 2023, s: 35, pop: 99, c: [38, 215], m: "target", min: ["mid", "entry", 8], rec: ["mid", "mid", 16] },
  { id: "fortnite", n: "Fortnite", g: ["br"], y: 2017, s: 40, pop: 95, c: [280, 200], m: "burst", min: ["entry", "entry", 8], rec: ["mid", "mid", 16] },
  { id: "apex", n: "Apex Legends", g: ["br", "fps"], y: 2019, s: 56, pop: 90, c: [8, 330], m: "diamond", min: ["mid", "entry", 8], rec: ["mid", "mid", 16] },
  { id: "gta5", n: "GTA V", g: ["open"], y: 2013, s: 110, pop: 96, c: [150, 45], m: "mountain", min: ["entry", "entry", 8], rec: ["mid", "mid", 16] },
  { id: "cyberpunk", n: "Cyberpunk 2077", g: ["rpg", "open"], y: 2020, s: 70, pop: 88, c: [55, 320], m: "diamond", min: ["mid", "mid", 12], rec: ["high", "high", 16] },
  { id: "minecraft", n: "Minecraft (Java)", g: ["sandbox"], y: 2011, s: 1, pop: 97, c: [135, 175], m: "blocks", min: ["entry", "entry", 4], rec: ["mid", "entry", 8] },
  { id: "warzone", n: "Call of Duty: Warzone", g: ["br", "fps"], y: 2020, s: 100, pop: 86, c: [140, 20], m: "burst", min: ["mid", "mid", 12], rec: ["high", "high", 16] },
  { id: "rdr2", n: "Red Dead Redemption 2", g: ["open"], y: 2018, s: 120, pop: 89, c: [18, 40], m: "mountain", min: ["mid", "mid", 8], rec: ["high", "high", 12] },
  { id: "overwatch2", n: "Overwatch 2", g: ["fps"], y: 2022, s: 50, pop: 84, c: [28, 225], m: "orbit", min: ["entry", "entry", 6], rec: ["mid", "mid", 16] },
  { id: "eldenring", n: "Elden Ring", g: ["rpg", "open"], y: 2022, s: 60, pop: 93, c: [42, 265], m: "mountain", min: ["mid", "mid", 12], rec: ["mid", "high", 16] },
  { id: "witcher3", n: "The Witcher 3", g: ["rpg", "open"], y: 2015, s: 50, pop: 91, c: [200, 355], m: "wave", min: ["mid", "entry", 6], rec: ["mid", "mid", 8] },
  { id: "lol", n: "League of Legends", g: ["moba"], y: 2009, s: 16, pop: 94, c: [215, 45], m: "orbit", min: ["entry", "entry", 2], rec: ["mid", "entry", 8] },
  { id: "rocketleague", n: "Rocket League", g: ["sport"], y: 2015, s: 20, pop: 85, c: [195, 25], m: "wave", min: ["entry", "entry", 4], rec: ["mid", "mid", 8] },
  { id: "dota2", n: "Dota 2", g: ["moba"], y: 2013, s: 40, pop: 87, c: [4, 245], m: "diamond", min: ["entry", "entry", 4], rec: ["mid", "entry", 8] },
  { id: "bg3", n: "Baldur's Gate 3", g: ["rpg"], y: 2023, s: 150, pop: 92, c: [275, 330], m: "orbit", min: ["mid", "mid", 8], rec: ["high", "high", 16] }
];

/* Factors the FPS Estimator uses for the games above (script.js reads these) */
const LIB_FPS_FACTORS = { eldenring: 0.7, witcher3: 0.85, lol: 1.6, rocketleague: 1.25, dota2: 1.1, bg3: 0.55 };

function motifSVG(m, a, b) {
  const s = `hsl(${a} 90% 78%)`, w = `hsl(${b} 90% 80%)`;
  switch (m) {
    case "target": return `<g fill="none" stroke="${s}" stroke-opacity=".7"><circle cx="150" cy="150" r="95"/><circle cx="150" cy="150" r="62"/><circle cx="150" cy="150" r="28" fill="${w}" fill-opacity=".25"/><path d="M150 25v50M150 225v50M25 150h50M225 150h50" stroke-width="2"/></g>`;
    case "mountain": return `<path d="M-10 250 90 110l55 80 45-60 130 120z" fill="${s}" fill-opacity=".28"/><path d="M60 250 160 140l70 110z" fill="${w}" fill-opacity=".35"/><circle cx="225" cy="70" r="26" fill="${w}" fill-opacity=".55"/>`;
    case "blocks": return [[60, 150], [120, 120], [180, 150], [120, 190], [240, 90], [60, 210]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="50" height="50" rx="6" fill="${i % 2 ? w : s}" fill-opacity="${i % 2 ? .4 : .3}" stroke="${s}" stroke-opacity=".6"/>`).join("");
    case "burst": return `<g stroke="${s}" stroke-opacity=".55" stroke-width="3" stroke-linecap="round">${Array.from({ length: 14 }, (_, i) => { const r = i / 14 * 6.283, x = Math.cos(r), y = Math.sin(r); return `<path d="M${150 + x * 40} ${150 + y * 40}L${150 + x * (i % 2 ? 110 : 140)} ${150 + y * (i % 2 ? 110 : 140)}"/>`; }).join("")}</g><circle cx="150" cy="150" r="30" fill="${w}" fill-opacity=".4"/>`;
    case "wave": return [0, 1, 2, 3].map(i => `<path d="M-10 ${120 + i * 34}Q75 ${70 + i * 34} 150 ${120 + i * 34}T310 ${120 + i * 34}" fill="none" stroke="${i % 2 ? w : s}" stroke-opacity="${.7 - i * .12}" stroke-width="4"/>`).join("");
    case "diamond": return `<g fill="none" stroke="${s}" stroke-opacity=".7"><path d="M150 40 260 150 150 260 40 150z"/><path d="M150 85 215 150 150 215 85 150z" fill="${w}" fill-opacity=".25"/></g>`;
    default: return `<g fill="none" stroke="${s}" stroke-opacity=".65"><ellipse cx="150" cy="150" rx="125" ry="55" transform="rotate(-25 150 150)"/><ellipse cx="150" cy="150" rx="105" ry="45" transform="rotate(35 150 150)"/></g><circle cx="150" cy="150" r="30" fill="${w}" fill-opacity=".45"/>`;
  }
}

/* Original, generated artwork (not official game covers) */
function coverSVG(g, withTitle = true) {
  const [a, b] = g.c;
  const words = g.n.split(" "), lines = [];
  words.forEach(w => { const last = lines[lines.length - 1]; if (last && (last + " " + w).length <= 15) lines[lines.length - 1] = last + " " + w; else lines.push(w); });
  const text = withTitle ? lines.map((l, i) => `<text x="22" y="${340 - (lines.length - 1 - i) * 30}" font-size="26" font-weight="850" fill="#fff" font-family="Inter,system-ui,sans-serif" letter-spacing="-.5">${l.replace(/&/g, "&amp;")}</text>`).join("") : "";
  return `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${g.n.replace(/"/g, "")}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="c-${g.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${a} 70% 34%)"/><stop offset="1" stop-color="hsl(${b} 65% 14%)"/></linearGradient><linearGradient id="f-${g.id}" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#05030a" stop-opacity=".85"/></linearGradient></defs><rect width="300" height="400" fill="url(#c-${g.id})"/><g transform="translate(0 -10)">${motifSVG(g.m, a, b)}</g><rect width="300" height="400" fill="url(#f-${g.id})"/>${text}</svg>`;
}
