// ============ LOUNGE EXPERIENCE MAP ============
const LOUNGE_MAP = {
  "Calm": {
    wine: { name: "Vintage Pinot Noir (Willamette Valley)", desc: "Silky and elegant — dried cherry, forest floor, damp violet. Mirrors floral serenity." },
    cocktail: { name: "The Velvet Twilight", desc: "Aromatic gin, lavender syrup, lemon twist, mist of bergamot hydrosol. Over hand-carved ice." },
    mocktail: { name: "Amethyst Ambience", desc: "Butterfly pea flower tea, chamomile extract, honey water, fresh rosemary sprig." },
    food: { name: "Whipped Goat Cheese Crostini", desc: "Artisanal crostini, local chèvre, lavender hot honey, crushed pistachios." }
  },
  "Focus": {
    wine: { name: "Grand Cru Riesling (Alsace)", desc: "Focused linear acidity, flinty minerality, bone-dry lime curd. Sharpens the senses." },
    cocktail: { name: "The Alchemist Old Fashioned", desc: "Small-batch rye, eucalyptus-infused demerara, black walnut bitters, rosemary twist." },
    mocktail: { name: "Emerald Lucid", desc: "Cold-pressed cucumber, ceremonial matcha, sparkling water, struck mint bouquet." },
    food: { name: "Seared Ahi Carpaccio", desc: "Sashimi-grade tuna, cold-pressed olive oil, toasted pine nut dust, caper berries." }
  },
  "Sleep": {
    wine: { name: "Aged Tawny Port (20 Year)", desc: "Deep amber. Molasses, toasted fig, warm rancio. Slows the heart rate naturally." },
    cocktail: { name: "Chamomile Bedtime Toddy", desc: "Aged bourbon, Roman chamomile tincture, dark buckwheat honey, hot lemon." },
    mocktail: { name: "The Midnight Dreamscape", desc: "Warm oat milk, vanilla bean, tart cherry juice, dusting of grated nutmeg." },
    food: { name: "Dark Chocolate Tart", desc: "72% Venezuelan cocoa ganache, almond crust, dried cornflower petals." }
  },
  "Uplift": {
    wine: { name: "Grower Champagne Brut Nature", desc: "High-velocity effervescence, green apple, chalky precision. Elevates everything." },
    cocktail: { name: "Limonene Spark", desc: "Blanco tequila, fresh grapefruit, yuzu liqueur, pink Himalayan salt rim." },
    mocktail: { name: "The Golden Hour", desc: "Muddled orange, fresh ginger, citrus honey syrup, premium dry tonic." },
    food: { name: "Citrus-Cured Salmon", desc: "Blood orange crudo, finger lime caviar, sea asparagus spears." }
  },
  "Breathe": {
    wine: { name: "Sauvignon Blanc (Marlborough)", desc: "Gooseberry, fresh cut grass, piercing pyrazine. Opens the airways." },
    cocktail: { name: "The Botanical Vapor", desc: "Botanical rum, green chartreuse, peppermint extraction, alkaline water." },
    mocktail: { name: "The Cleansing Cauldron", desc: "Hot lemongrass, pressed ginger, raw clover honey, eucalyptus vapor wrap." },
    food: { name: "Spiced Root Skewers", desc: "Charred sweet potato, sumac berry dust, cracked pepper, fresh spearmint." }
  },
  "Anxiety": {
    wine: { name: "Sancerre Blanc (Loire)", desc: "Mineral-driven and precise. Quiet complexity that calms without sedating." },
    cocktail: { name: "The Still Water", desc: "Gin, elderflower, cucumber, soft tonic, a single lavender sprig." },
    mocktail: { name: "Blue Calm", desc: "Butterfly pea flower, lemon verbena, honey, still sparkling water." },
    food: { name: "Avocado & Herb Flatbread", desc: "Warm flatbread, smashed avocado, fresh herbs, flaked sea salt." }
  },
  "Sensual": {
    wine: { name: "Barolo (Piedmont)", desc: "Complex, earthy rose petal and tar. Aphrodisiac in a glass." },
    cocktail: { name: "The Midnight Garden", desc: "Cognac, jasmine syrup, rose water, champagne float." },
    mocktail: { name: "Rose & Cardamom Elixir", desc: "Cold-brew rose, cardamom simple syrup, almond milk, rosewater mist." },
    food: { name: "Dark Chocolate & Berry Board", desc: "Single-origin chocolate, fresh raspberries, edible rose petals, sea salt." }
  },
  "Grounding": {
    wine: { name: "Ribera del Duero (Reserva)", desc: "Deep earthy Tempranillo, cedar, dark fruit. Anchors and steadies." },
    cocktail: { name: "The Hearthstone", desc: "Añejo tequila, mezcal float, vetiver tincture, orange bitters." },
    mocktail: { name: "Sacred Earth", desc: "Beetroot, ginger, activated charcoal, coconut water, lime." },
    food: { name: "Mushroom & Truffle Bruschetta", desc: "Wild mushroom ragù, truffle oil, toasted sourdough, shaved pecorino." }
  }
};

function inferLoungeMood(oils) {
  if (!oils.length) return "Calm";
  const names = oils.map(o => o.name.toLowerCase());
  if (names.some(n => ["rosemary","peppermint","basil","lemon"].includes(n))) return "Focus";
  if (names.some(n => ["sweet orange","grapefruit","bergamot"].includes(n))) return "Uplift";
  if (names.some(n => ["eucalyptus","tea tree","pine"].includes(n))) return "Breathe";
  if (names.some(n => ["chamomile","lavender"].includes(n) && names.some(n2 => ["vanilla","sandalwood"].includes(n2)))) return "Sleep";
  if (names.some(n => ["jasmine","ylang ylang","rose","vanilla"].includes(n))) return "Sensual";
  if (names.some(n => ["vetiver","cedarwood","frankincense","sandalwood"].includes(n))) return "Grounding";
  if (names.some(n => ["lavender","chamomile","orange blossom"].includes(n))) return "Calm";
  return "Calm";
}

function renderLoungeMatrix(oils) {
  const mood = inferLoungeMood(oils);
  const data = LOUNGE_MAP[mood] || LOUNGE_MAP["Calm"];
  document.getElementById("lounge-wine-name").textContent = data.wine.name;
  document.getElementById("lounge-wine-desc").textContent = data.wine.desc;
  document.getElementById("lounge-cocktail-name").textContent = data.cocktail.name;
  document.getElementById("lounge-cocktail-desc").textContent = data.cocktail.desc;
  document.getElementById("lounge-mocktail-name").textContent = data.mocktail.name;
  document.getElementById("lounge-mocktail-desc").textContent = data.mocktail.desc;
  document.getElementById("lounge-food-name").textContent = data.food.name;
  document.getElementById("lounge-food-desc").textContent = data.food.desc;
}

// ============ INLINE PAIRING SHELF ============
const CARRIER_MAP = {
  "lavender": "Jojoba Wax — neutral, shelf-stable, perfumery standard",
  "rose": "Argan Oil — luxury anti-aging, enhances florals",
  "bergamot": "Jojoba — stabilizes citrus, extends diffusion",
  "frankincense": "Argan Oil Premium — meditative surface integration",
  "sandalwood": "Jojoba Velvet — fixative anchoring",
  "chamomile": "Jojoba Fluid — hypersensitive skin soothing",
  "ylang-ylang": "Sweet Almond — moisture retention",
  "jasmine": "Jojoba Wax — fragrance fixative base",
  "cedarwood": "Avocado (heavy) — earthy, grounding",
  "peppermint": "Fractionated Coconut — ultra-light, rapid absorption",
  "eucalyptus": "Fractionated Coconut — respiratory diffusion",
  "rosemary": "Fractionated Coconut — clean evaporation",
  "lemon": "Fractionated Coconut — rapid skin absorption",
  "sweet-orange": "Jojoba Liquid — scent neutralization",
  "clary-sage": "Avocado Oil — deep, velvety texture",
  "vetiver": "Sweet Almond — dilutes viscosity, grounding"
};

function renderInlineShelf() {
  const currentIds = Object.keys(state.blend);
  const topEl = document.getElementById("shelf-top");
  const midEl = document.getElementById("shelf-mid");
  const baseEl = document.getElementById("shelf-base");
  const carrierEl = document.getElementById("shelf-carrier");

  if (!currentIds.length) {
    const empty = '<span class="shelf-empty">Add an oil to see suggestions.</span>';
    topEl.innerHTML = midEl.innerHTML = baseEl.innerHTML = empty;
    carrierEl.innerHTML = '<span class="shelf-empty">Add oils to see carrier recommendation.</span>';
    carrierEl.className = "shelf-empty";
    return;
  }

  const scores = {};
  currentIds.forEach(id => {
    const oil = OILS.find(o => o.id === id);
    if (!oil || !oil.pairs_with) return;
    oil.pairs_with.forEach(pairName => {
      const match = OILS.find(x =>
        x.name.toLowerCase().includes(pairName.toLowerCase()) ||
        pairName.toLowerCase().includes(x.name.toLowerCase())
      );
      if (match && !state.blend[match.id]) {
        scores[match.id] = (scores[match.id] || 0) + 1;
      }
    });
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const byNote = note => sorted
    .filter(([id]) => OILS.find(x => x.id === id)?.note === note)
    .slice(0, 3);

  const renderItems = (items) => {
    if (!items.length) return '<span class="shelf-empty">All paired.</span>';
    return items.map(([id, score]) => {
      const o = OILS.find(x => x.id === id);
      return `<button class="shelf-btn" onclick="addToBlend('${o.id}', 2)"><span>${o.name}</span><span class="shelf-score">+${score}</span></button>`;
    }).join("");
  };

  topEl.innerHTML = renderItems(byNote("Top"));
  midEl.innerHTML = renderItems(byNote("Middle"));
  baseEl.innerHTML = renderItems(byNote("Base"));

  const primeId = currentIds[0];
  const carrierText = CARRIER_MAP[primeId];
  if (carrierText) {
    carrierEl.innerHTML = `<span class="shelf-carrier-rec">${carrierText}</span>`;
    carrierEl.className = "";
  } else {
    carrierEl.innerHTML = '<span class="shelf-carrier-rec">Jojoba — neutral carrier for most blends</span>';
    carrierEl.className = "";
  }
}

// ============ STATE ============
const state = {
  blend: {},
  filters: { search: "", type: [], note: [], phototoxic: false, category: "" },
  view: "library",
  layout: "grid"
};

// ============ CHEMICAL FAMILY MAP ============
const FAMILY_MAP = {
  "Monoterpenes":    ["Limonene","α-Pinene","β-Pinene","Myrcene","γ-Terpinene","α-Terpinene","Sabinene","δ-3-Carene","β-Caryophyllene","α-Thujene"],
  "Sesquiterpenes":  ["Germacrene D","β-Himachalene","α-Himachalene","Khusimol","α-Vetivone","β-Vetivone","Vetiverol","α-Agarofuran","Jinkoh-eremol","Sesquiterpenes","Cedrol"],
  "Alcohols":        ["Linalool","Menthol","Terpinen-4-ol","Citronellol","Geraniol","Nerol","Phenylethanol","Lavandulol","Sclareol","Atlantone"],
  "Esters":          ["Linalyl acetate","Menthyl acetate","Isobutyl angelate","Isoamyl angelate","Methylallyl angelate","Benzyl acetate","Benzyl benzoate","Bornyl acetate","Geranyl acetate","Eugenyl acetate","Esters"],
  "Aldehydes":       ["Citral (Geranial+Neral)","Citral","(E)-Cinnamaldehyde","Vanillin","4-Hydroxybenzaldehyde"],
  "Ketones":         ["Menthone","(R)-(-)-Carvone","Camphor","α-Thujone","β-Thujone","Isomenthone","β-Ionone","Dihydro-β-ionone"],
  "Oxides":          ["1,8-Cineole","1,8-Cineole (Eucalyptol)","1,4-Dimethoxybenzene"],
  "Phenols":         ["Eugenol","Thymol","Methyl chavicol"],
  "Furanoids":       ["Furanoeudesma-1,3-diene","Curzerene","Lindestrene","Furans","Furfuryl thiol"],
  "Lactones/Other":  ["γ-Decalactone","Nootkatone","Phytol","Indole","Incensole acetate","Myristicin","Elemicin","Pulegone","Palmitic acid","Linoleic acid","Pyrazines"]
};

function familyOf(constituent) {
  for (const [family, list] of Object.entries(FAMILY_MAP)) {
    if (list.includes(constituent)) return family;
  }
  return "Other";
}

// ============ BLEND MANAGEMENT & CALCULATIONS ============
function addToBlend(oilId, drops = 2) {
  state.blend[oilId] = (state.blend[oilId] || 0) + drops;
  renderAll();
  renderInlineShelf();
}

function setDrops(oilId, drops) {
  if (drops <= 0) delete state.blend[oilId];
  else state.blend[oilId] = drops;
  renderAll();
}

function removeFromBlend(oilId) {
  delete state.blend[oilId];
  renderAll();
}

function renderBlendSidebar() {
  const list = document.getElementById("blend-list");
  const ids = Object.keys(state.blend);
  if (ids.length === 0) { list.innerHTML = ""; return; }
  list.innerHTML = ids.map(id => {
    const oil = OILS.find(o => o.id === id);
    const drops = state.blend[id];
    return `
      <div class="blend-item">
        <div>
          <div class="blend-item-name">${oil ? oil.name : id}</div>
          <div class="blend-item-note">${oil ? oil.note : ""}</div>
        </div>
        <div class="blend-drops">
          <button data-act="dec" data-id="${id}">−</button>
          <span class="blend-drop-count">${drops}</span>
          <button data-act="inc" data-id="${id}">+</button>
        </div>
        <button class="blend-remove" data-act="rm" data-id="${id}" aria-label="Remove">×</button>
      </div>
    `;
  }).join("");
  list.querySelectorAll("button").forEach(b => {
    b.addEventListener("click", () => {
      const { act, id } = b.dataset;
      if (act === "inc") setDrops(id, state.blend[id] + 1);
      else if (act === "dec") setDrops(id, state.blend[id] - 1);
      else if (act === "rm") removeFromBlend(id);
    });
  });
}

function renderBlendView() {
  const ids = Object.keys(state.blend);
  const oils = ids.map(id => ({ ...OILS.find(o => o.id === id), drops: state.blend[id] })).filter(o => o.name);

  const totalDrops = oils.reduce((s, o) => s + o.drops, 0);
  const noteBar = document.getElementById("note-balance");
  const advice = document.getElementById("note-advice");

  if (totalDrops === 0) {
    noteBar.innerHTML = '<div class="empty">Add oils to see the balance.</div>';
    advice.innerHTML = "";
  } else {
    const totals = { Top: 0, Middle: 0, Base: 0 };
    oils.forEach(o => { totals[o.note] = (totals[o.note] || 0) + o.drops; });
    const pct = k => Math.round((totals[k] / totalDrops) * 100);
    noteBar.innerHTML = `
      <div class="note-bar">
        <span class="note-bar-label">Top</span>
        <div class="note-bar-track"><div class="note-bar-fill top" style="width: ${pct("Top")}%"></div></div>
        <span class="note-bar-pct">${pct("Top")}%</span>
      </div>
      <div class="note-bar">
        <span class="note-bar-label">Middle</span>
        <div class="note-bar-track"><div class="note-bar-fill mid" style="width: ${pct("Middle")}%"></div></div>
        <span class="note-bar-pct">${pct("Middle")}%</span>
      </div>
      <div class="note-bar">
        <span class="note-bar-label">Base</span>
        <div class="note-bar-track"><div class="note-bar-fill base" style="width: ${pct("Base")}%"></div></div>
        <span class="note-bar-pct">${pct("Base")}%</span>
      </div>
    `;

    const t = pct("Top"), m = pct("Middle"), b = pct("Base");
    let msg = ""; let cls = "";
    if (t === 100) { msg = "All top notes — this blend will fade fast. Add a middle-note anchor and base fixative."; cls = "warn"; }
    else if (b === 100) { msg = "All base notes — heavy and slow. Add top notes for lift."; cls = "warn"; }
    else if (m === 0) { msg = "Missing the heart. Middle notes bridge top and base — try Lavender, Geranium, or Rose."; cls = "warn"; }
    else if (b === 0 && totalDrops > 4) { msg = "No base notes — add Sandalwood, Vetiver, or Frankincense as a fixative."; cls = "warn"; }
    else if (t === 0 && totalDrops > 4) { msg = "No top notes — the blend opens flat. Add a bright citrus for the opening impression."; cls = "warn"; }
    else if (t > 60) { msg = "Top-heavy. The opening is bright but may fade quickly. Consider more middle/base for longevity."; cls = "warn"; }
    else if (b > 50) { msg = "Base-heavy. Rich and long-lasting. A citrus lift would balance it."; cls = "warn"; }
    else if (m > 70) { msg = "Middle-dominant — well-rounded and floral-forward."; cls = ""; }
    else if (t >= 15 && t <= 45 && m >= 30 && m <= 60 && b >= 10 && b <= 40) { msg = "Well-balanced pyramid. Top lifts, middle carries, base fixes."; cls = ""; }
    else { msg = "Reasonable balance. Guideline is ~20–40% top, 40–60% middle, 15–30% base."; cls = ""; }
    advice.className = "advice " + cls;
    advice.textContent = msg;
  }

  renderSafetyReport(oils);
  renderChemComposition(oils);
  renderBlendActions(oils);
  renderRecipe(oils);
  renderLoungeMatrix(oils);
}

function renderBlendActions(oils) {
  const container = document.getElementById("blend-actions");
  if (!container) return;
  const withChem = oils.filter(o => o.constituents && o.constituents.length);
  if (withChem.length === 0) {
    container.innerHTML = '<div class="empty">Add true essential oils to see therapeutic actions.</div>';
    return;
  }

  const totalDrops = withChem.reduce((s, o) => s + o.drops, 0);
  const strengthScore = { strong: 3, moderate: 2, weak: 1 };
  const effects = {};

  withChem.forEach(oil => {
    oil.constituents.forEach(c => {
      const terp = TERPENES.find(t => t.name === c.c || c.c.includes(t.name));
      if (!terp) return;
      const weight = (c.pct / 100) * (oil.drops / totalDrops);
      terp.actions.forEach(a => {
        if (!effects[a.effect]) effects[a.effect] = { score: 0, contributors: [], strengths: [] };
        effects[a.effect].score += strengthScore[a.strength] * weight * c.pct;
        effects[a.effect].contributors.push({ oil: oil.name, terpene: terp.name, pct: c.pct, strength: a.strength });
        effects[a.effect].strengths.push(a.strength);
      });
    });
  });

  const sorted = Object.entries(effects).sort((a, b) => b[1].score - a[1].score);
  if (sorted.length === 0) {
    container.innerHTML = '<div class="empty">No mapped terpene actions found in this blend.</div>';
    return;
  }

  const maxScore = sorted[0][1].score;
  container.innerHTML = sorted.map(([effect, data]) => {
    const pct = Math.round((data.score / maxScore) * 100);
    const dominant = data.strengths.includes("strong") ? "strong" : data.strengths.includes("moderate") ? "moderate" : "weak";
    const uniqueContribs = [...new Map(data.contributors.map(c => [c.oil + c.terpene, c])).values()];
    return `
      <div class="action-row">
        <div>
          <div class="action-name"><span class="strength-pill strength-${dominant}">${dominant}</span> ${effect}</div>
          <div class="action-contributors">from ${uniqueContribs.map(c => `${c.oil} <em>(${c.terpene} ${c.pct}%)</em>`).join(", ")}</div>
        </div>
        <div class="action-bar-track"><div class="action-bar-fill" style="width:${pct}%"></div></div>
        <div class="action-score">${Math.round(data.score)}</div>
      </div>
    `;
  }).join("");
}

function renderSafetyReport(oils) {
  const report = document.getElementById("safety-report");
  if (oils.length === 0) { report.innerHTML = '<div class="empty">Add oils for a safety review.</div>'; return; }

  const items = [];
  const photoOils = oils.filter(o => o.phototoxic);
  if (photoOils.length) {
    items.push({
      level: "danger", icon: "⚠", title: "Phototoxic oils present",
      detail: `${photoOils.map(o => o.name).join(", ")}. Avoid skin exposure to UV within 12–18 hours.`
    });
  } else {
    items.push({ level: "ok", icon: "✓", title: "Non-phototoxic", detail: "Safe for daytime skin application at appropriate dilution." });
  }

  const pregAvoid = oils.filter(o => o.pregnancy === "AVOID" || o.pregnancy === "AVOID — abortifacient" || o.pregnancy === "Avoid during pregnancy");
  if (pregAvoid.length) {
    items.push({
      level: "danger", icon: "⚠", title: "Pregnancy caution",
      detail: `Avoid during pregnancy: ${pregAvoid.map(o => o.name).join(", ")}.`
    });
  }

  const eos = oils.filter(o => o.type === "essential" && typeof o.max_dermal === "number");
  if (eos.length) {
    const minMax = Math.min(...eos.map(o => o.max_dermal));
    const constrainer = eos.find(o => o.max_dermal === minMax);
    items.push({
      level: minMax < 1 ? "danger" : minMax < 5 ? "warn" : "ok",
      icon: minMax < 1 ? "⚠" : "✓",
      title: `Dermal ceiling: ${minMax}%`,
      detail: `${constrainer.name} is the limiting oil for topical dilution.`
    });
  }

  report.innerHTML = items.map(i => `
    <div class="safety-row">
      <div class="safety-icon ${i.level}">${i.icon}</div>
      <div>
        <div class="safety-title">${i.title}</div>
        <div class="safety-detail">${i.detail}</div>
      </div>
    </div>
  `).join("");
}

function renderChemComposition(oils) {
  const container = document.getElementById("chem-composition");
  const withChem = oils.filter(o => o.constituents && o.constituents.length);
  if (withChem.length === 0) {
    container.innerHTML = '<div class="empty">Add true essential oils to see chemical breakdown. Fragrance accords have no constituent data.</div>';
    return;
  }

  const perOil = withChem.map(o => {
    const total = o.constituents.reduce((s, c) => s + c.pct, 0);
    return `
      <div class="chem-oil">
        <div class="chem-oil-name">${o.name} <span style="color:var(--ink-3);font-weight:400;">— ${o.drops} drops · ${total.toFixed(0)}% profiled</span></div>
        <div class="chem-bars">
          ${o.constituents.map(c => `
            <div class="chem-bar">
              <div class="chem-bar-name">${c.c}</div>
              <div class="chem-bar-track"><div class="chem-bar-fill" style="width:${Math.min(c.pct, 100)}%"></div></div>
              <div class="chem-bar-pct">${c.pct}%</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = perOil;
}

function renderRecipe(oils) {
  const container = document.getElementById("recipe-output");
  if (oils.length === 0) { container.innerHTML = '<div class="empty">No oils selected.</div>'; return; }

  const totalVol = parseFloat(document.getElementById("total-volume").value);
  const useCase = document.getElementById("use-case").value;
  const totalDrops = oils.reduce((s, o) => s + o.drops, 0);

  const lines = oils.map(o => {
    const pctOfBlend = (o.drops / totalDrops * 100).toFixed(1);
    return `
      <div class="recipe-line">
        <div>
          <span class="recipe-line-name">${o.name}</span>
          <span class="recipe-line-note-tag">${o.note}</span>
        </div>
        <div class="recipe-line-drops">${o.drops} drops</div>
        <div class="recipe-line-pct">${pctOfBlend}%</div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    ${lines}
    <div class="recipe-total">
      <span>Total</span>
      <span>${totalDrops} drops · ${oils.length} oil${oils.length > 1 ? "s" : ""}</span>
    </div>
  `;
}