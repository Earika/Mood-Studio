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

// ============ INIT ============
function debounce(fn, delay = 150) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const cats = [...new Set(OILS.map(o => o.category))].sort();
  const catSel = document.getElementById("category-filter");
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    catSel.appendChild(opt);
  });

  document.getElementById("search").addEventListener("input", debounce(e => {
    state.filters.search = e.target.value.toLowerCase();
    renderLibrary();
  }, 150));
  document.querySelectorAll('input[data-filter]').forEach(el => {
    el.addEventListener("change", () => {
      const key = el.dataset.filter;
      if (key === "phototoxic") {
        state.filters.phototoxic = el.checked;
      } else {
        if (el.checked) state.filters[key].push(el.value);
        else state.filters[key] = state.filters[key].filter(v => v !== el.value);
      }
      renderLibrary();
    });
  });
  catSel.addEventListener("change", e => {
    state.filters.category = e.target.value;
    renderLibrary();
  });

  document.getElementById("tab-library").addEventListener("click", () => setView("library"));
  document.getElementById("tab-blend").addEventListener("click", () => setView("blend"));
  document.getElementById("tab-recipes").addEventListener("click", () => setView("recipes"));
  document.getElementById("tab-terpenes").addEventListener("click", () => setView("terpenes"));
  document.getElementById("tab-moodlab").addEventListener("click", () => setView("moodlab"));

  document.getElementById("clear-blend").addEventListener("click", () => {
    state.blend = {};
    renderAll();
  });

  document.getElementById("total-volume").addEventListener("change", renderBlendView);
  document.getElementById("use-case").addEventListener("change", renderBlendView);

  document.getElementById("modal").addEventListener("click", e => {
    if (e.target.dataset.close !== undefined || e.target.classList.contains("modal-close")) closeModal();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  ["moodlab-title", "moodlab-tagline", "moodlab-attribution"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("input", () => {
      el.dataset.touched = "true";
      syncMoodCard();
    });
  });

  document.getElementById("moodlab-source").addEventListener("change", e => {
    e.target.dataset.touched = "true";
    applyMoodlabSource(true);
  });

  document.getElementById("moodlab-suggested").addEventListener("change", e => {
    e.target.dataset.selectedIndex = e.target.value;
    applyMoodlabSource(true);
  });

  document.getElementById("moodlab-theme").addEventListener("change", e => {
    e.target.dataset.touched = "true";
    if (document.getElementById("moodlab-source").value === "mood-preset") {
      applyMoodlabSource(true);
      return;
    }
    if (!document.getElementById("moodlab-tagline").dataset.touched) {
      document.getElementById("moodlab-tagline").value = getDefaultMoodline(e.target.value);
    }
    assignMoodlabAffirmation(e.target.value, true);
    syncMoodCard();
  });

  document.getElementById("moodlab-generate").addEventListener("click", syncMoodCard);
  document.getElementById("moodlab-download").addEventListener("click", downloadMoodCard);

  initLayoutState();
  applyLayout();
  renderPresets();
  renderTerpenes();
  renderAll();
});

// ============ VIEW SWITCHING ============
function setView(v) {
  state.view = v;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(`tab-${v}`).classList.add("active");
  document.querySelectorAll(".view").forEach(el => el.classList.add("hidden"));
  document.getElementById(`view-${v}`).classList.remove("hidden");
  if (v === "blend") renderBlendView();
  if (v === "recipes") renderPairingSuggestions();
  if (v === "terpenes") renderTerpenes();
  if (v === "moodlab") renderMoodlab();
}

// ============ LIBRARY RENDER ============
function alphabetizeOils(oils) {
  return [...oils].sort((a, b) => a.name.localeCompare(b.name));
}

function filteredOils() {
  const f = state.filters;
  const filtered = OILS.filter(o => {
    if (f.search && !(`${o.name} ${o.latin} ${o.aroma.join(" ")} ${o.category}`.toLowerCase().includes(f.search))) return false;
    if (f.type.length && !f.type.includes(o.type)) return false;
    if (f.note.length && !f.note.includes(o.note)) return false;
    if (f.phototoxic && o.phototoxic) return false;
    if (f.category && o.category !== f.category) return false;
    return true;
  });
  return alphabetizeOils(filtered);
}

function renderBflyDust() {
  return '';
}

function bflyEmblem(cls = "bfly-emblem") {
  return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><use href="#vb-butterfly"/></svg>`;
}

function goldDustBurst(x, y) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const overlay = document.getElementById("dust-overlay");
  if (overlay.children.length > 72) {
    overlay.innerHTML = "";
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 36; i++) {
    const p = document.createElement("i");
    const ang = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 170;
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.setProperty("--dx", (Math.cos(ang) * dist) + "px");
    p.style.setProperty("--dy", (Math.sin(ang) * dist - 70) + "px");
    p.style.setProperty("--s", (2 + Math.random() * 3.5) + "px");
    p.style.setProperty("--sc", (0.5 + Math.random()).toFixed(2));
    p.style.setProperty("--d", Math.round(650 + Math.random() * 750) + "ms");
    p.style.animationDelay = Math.round(Math.random() * 140) + "ms";
    fragment.appendChild(p);
    setTimeout(() => p.remove(), 1700);
  }
  overlay.appendChild(fragment);
}

function bflySafetyLine(oil) {
  if (oil.phototoxic) return `<div class="bfly-back-line danger"><strong>⚠ Phototoxic</strong> — max ${oil.max_dermal}% before sun exposure.</div>`;
  if (/AVOID/i.test(oil.pregnancy)) return `<div class="bfly-back-line danger"><strong>Pregnancy:</strong> avoid.</div>`;
  return `<div class="bfly-back-line"><strong>Safety:</strong> ${oil.type === "fragrance" ? "Fragrance accord — patch test first." : "No phototoxicity flagged."}</div>`;
}

function bflyKeyNotes(oil) {
  const top = (oil.constituents || []).slice(0, 2).map(c => c.c).join(", ");
  return top
    ? `<div class="bfly-back-line"><strong>Key notes:</strong> ${top}</div>`
    : `<div class="bfly-back-line"><strong>Profile:</strong> synthetic accord</div>`;
}

function bflyCardHTML(oil) {
  const inBlend = state.blend[oil.id] > 0;
  const noteClass = oil.note === "Top" ? "top" : oil.note === "Middle" ? "mid" : "base";
  return `
    <div class="butterfly-card ${inBlend ? "in-blend" : ""}" data-note="${oil.note}" data-id="${oil.id}" role="button" tabindex="0" aria-haspopup="dialog" aria-pressed="false" aria-label="${oil.name}. Tap to flip for safety details.">
      <div class="butterfly-card-inner">
        <div class="butterfly-card-face butterfly-card-front">
          ${renderBflyDust()}
          <div class="bfly-content">
            ${bflyEmblem()}
            <div class="bfly-name">${oil.name}</div>
            <div class="bfly-latin">${oil.latin}</div>
            <div class="bfly-meta">
              <span class="tag note-${noteClass}">${oil.note}</span>
              <span class="tag">${oil.category}</span>
              ${oil.type === "fragrance" ? '<span class="tag type-fragrance">Fragrance</span>' : ''}
              ${oil.phototoxic ? '<span class="tag phototox">Phototoxic</span>' : ''}
            </div>
            <div class="bfly-aroma">${oil.aroma.slice(0, 4).join(" · ")}</div>
          </div>
          <div class="bfly-actions">
            <button class="bfly-pill bfly-add ${inBlend ? 'is-added' : ''}" data-act="add" data-id="${oil.id}" type="button">${inBlend ? "✓ Added" : "+ Add"}</button>
            <button class="bfly-pill bfly-details" data-act="details" data-id="${oil.id}" type="button">Details</button>
          </div>
        </div>
        <div class="butterfly-card-face butterfly-card-back">
          ${renderBflyDust()}
          <div class="bfly-content">
            ${bflyEmblem()}
            <div class="bfly-back-title">${oil.name}</div>
            ${bflySafetyLine(oil)}
            ${bflyKeyNotes(oil)}
            <div class="bfly-back-line"><strong>Pairs with:</strong> ${(oil.pairs_with || []).slice(0,3).join(", ")}</div>
          </div>
          <div class="bfly-actions">
            <button class="bfly-pill bfly-add ${inBlend ? 'is-added' : ''}" data-act="add" data-id="${oil.id}" type="button">${inBlend ? "✓ Added" : "+ Add"}</button>
            <button class="bfly-pill bfly-details" data-act="details" data-id="${oil.id}" type="button">Profile</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderLibrary() {
  const grid = document.getElementById("oil-grid");
  const filtered = filteredOils();
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty">No oils match your filters.</div>';
  } else {
    if (state.layout === "carousel") {
      const lanes = [
        { note: "Top", cls: "top", label: "Top Notes" },
        { note: "Middle", cls: "mid", label: "Middle Notes" },
        { note: "Base", cls: "base", label: "Base Notes" }
      ];
      grid.innerHTML = lanes.map(lane => {
        const oils = filtered.filter(o => o.note === lane.note);
        return `
          <div class="carousel-lane">
            <div class="lane-label ${lane.cls}">${lane.label} · ${oils.length}</div>
            <div class="lane-scroll">${oils.length ? oils.map(bflyCardHTML).join("") : '<div class="lane-empty">No oils match in this range.</div>'}</div>
          </div>`;
      }).join("");
    } else {
      grid.innerHTML = filtered.map(bflyCardHTML).join("");
    }

    grid.querySelectorAll(".butterfly-card").forEach(card => {
      const id = card.dataset.id;
      const toggleFlip = () => {
        const flipped = card.classList.toggle("flipped");
        card.setAttribute("aria-pressed", flipped ? "true" : "false");
      };
      card.addEventListener("click", toggleFlip);
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleFlip(); }
      });
      card.querySelectorAll('[data-act="add"]').forEach(btn => {
        btn.addEventListener("click", e => {
          e.stopPropagation();
          if (state.blend[id]) removeFromBlend(id); else addToBlend(id, 2);
        });
      });
      card.querySelectorAll('[data-act="details"]').forEach(btn => {
        btn.addEventListener("click", e => {
          e.stopPropagation();
          goldDustBurst(e.clientX, e.clientY);
          setTimeout(() => openModal(id), 170);
        });
      });
    });

    setupCarouselObserver();
  }

  document.getElementById("stat-total").textContent = filtered.length;
  document.getElementById("stat-eo").textContent = filtered.filter(o => o.type === "essential").length;
  document.getElementById("stat-photo").textContent = filtered.filter(o => o.phototoxic).length;
  document.getElementById("stat-blend").textContent = Object.keys(state.blend).length;

  renderFilterBanner(filtered.length);
}

// ============ LAYOUT SWITCHER ============
const LAYOUTS = ["grid", "carousel"];
let bflyCarouselObservers = [];
function setupCarouselObserver() {
  bflyCarouselObservers.forEach(o => o.disconnect());
  bflyCarouselObservers = [];
  document.querySelectorAll("#oil-grid .lane-scroll").forEach(lane => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("bfly-in-view", entry.isIntersecting && entry.intersectionRatio > 0.6);
      });
    }, { root: lane, threshold: [0, 0.6, 1] });
    lane.querySelectorAll(".butterfly-card").forEach(c => obs.observe(c));
    bflyCarouselObservers.push(obs);
  });
}

function initLayoutState() {
  const stored = localStorage.getItem("vb_layout");
  if (stored && LAYOUTS.includes(stored)) { state.layout = stored; return; }
  state.layout = (window.innerWidth <= 640) ? "carousel" : "grid";
}

function applyLayout() {
  const grid = document.getElementById("oil-grid");
  grid.classList.remove("layout-grid", "layout-ribbon", "layout-carousel");
  grid.classList.add(`layout-${state.layout}`);
  document.querySelectorAll(".layout-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.layout === state.layout);
  });
}

function setLayout(l) {
  state.layout = l;
  localStorage.setItem("vb_layout", l);
  applyLayout();
  renderLibrary();
}

document.querySelectorAll(".layout-btn").forEach(b => {
  b.addEventListener("click", () => setLayout(b.dataset.layout));
});

function renderFilterBanner(shown) {
  const banner = document.getElementById("filter-banner");
  const f = state.filters;
  const active = [];
  if (f.search) active.push(`"${f.search}"`);
  if (f.type.length) active.push(f.type.map(t => t === "essential" ? "True EO" : "Fragrance").join(" + "));
  if (f.note.length) active.push(f.note.join(" + ") + " notes");
  if (f.phototoxic) active.push("non-phototoxic only");
  if (f.category) active.push(f.category);
  if (active.length === 0) { banner.classList.add("hidden"); return; }
  banner.classList.remove("hidden");
  banner.innerHTML = `
    <div>Showing <strong>${shown} of ${OILS.length}</strong> oils — filtered by ${active.join(", ")}</div>
    <button id="clear-filters">Clear filters</button>
  `;
  document.getElementById("clear-filters").addEventListener("click", clearFilters);
}

function clearFilters() {
  state.filters = { search: "", type: [], note: [], phototoxic: false, category: "" };
  document.getElementById("search").value = "";
  document.querySelectorAll('input[data-filter]').forEach(el => el.checked = false);
  document.getElementById("category-filter").value = "";
  renderLibrary();
}

// ============ BLEND MANAGEMENT ============
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
          <div class="blend-item-name">${oil.name}</div>
          <div class="blend-item-note">${oil.note}</div>
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

// ============ BLEND ANALYZER ============
function renderBlendView() {
  const ids = Object.keys(state.blend);
  const oils = ids.map(id => ({ ...OILS.find(o => o.id === id), drops: state.blend[id] }));

  const totalDrops = oils.reduce((s, o) => s + o.drops, 0);
  const noteBar = document.getElementById("note-balance");
  const advice = document.getElementById("note-advice");

  if (totalDrops === 0) {
    noteBar.innerHTML = '<div class="empty">Add oils to see the balance.</div>';
    advice.innerHTML = "";
  } else {
    const totals = { Top: 0, Middle: 0, Base: 0 };
    oils.forEach(o => { totals[o.note] += o.drops; });
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
    if (t === 100) { msg = "All top notes — this blend will fade fast. Add a middle-note anchor (Lavender, Geranium, Chamomile) and a base fixative (Sandalwood, Vetiver, Cedarwood)."; cls = "warn"; }
    else if (b === 100) { msg = "All base notes — heavy and slow. Add top notes (Bergamot, Grapefruit, Lemon) for lift."; cls = "warn"; }
    else if (m === 0) { msg = "Missing the heart. Middle notes (florals, herbs) bridge top and base — try Lavender, Geranium, or Rose."; cls = "warn"; }
    else if (b === 0 && totalDrops > 4) { msg = "No base notes — this blend won't have staying power. Add 1–2 drops of Sandalwood, Vetiver, or Frankincense as a fixative."; cls = "warn"; }
    else if (t === 0 && totalDrops > 4) { msg = "No top notes — the blend opens flat. Add a bright citrus (Bergamot, Lemon, Grapefruit) for the opening impression."; cls = "warn"; }
    else if (t > 60) { msg = "Top-heavy. The opening is bright but may fade quickly. Consider more middle/base for longevity."; cls = "warn"; }
    else if (b > 50) { msg = "Base-heavy. Rich and long-lasting but may feel dense. A citrus lift would balance it."; cls = "warn"; }
    else if (m > 70) { msg = "Middle-dominant — well-rounded and floral-forward. Small additions of top and base would complete the pyramid."; cls = ""; }
    else if (t >= 15 && t <= 45 && m >= 30 && m <= 60 && b >= 10 && b <= 40) { msg = "Well-balanced pyramid. Top lifts, middle carries, base fixes."; cls = ""; }
    else { msg = "Reasonable balance. Classic guideline is roughly 20–40% top, 40–60% middle, 15–30% base."; cls = ""; }
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
        effects[a.effect].contributors.push({ oil: oil.name, terpene: terp.name, pct: c.pct, strength: a.strength, detail: a.detail });
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
      level: "danger", icon: "⚠",
      title: "Phototoxic oils present",
      detail: `${photoOils.map(o => o.name).join(", ")}. Do not apply this blend to skin exposed to UV within 12–18 hours. Diffusion is safe.`
    });
  } else {
    items.push({ level: "ok", icon: "✓", title: "Non-phototoxic", detail: "Safe for daytime skin application at appropriate dilution." });
  }

  const fragOils = oils.filter(o => o.type === "fragrance");
  if (fragOils.length) {
    items.push({
      level: "warn", icon: "ⓘ",
      title: `${fragOils.length} fragrance oil${fragOils.length > 1 ? "s" : ""} in blend`,
      detail: `${fragOils.map(o => o.name).join(", ")} — no therapeutic action, decorative only.`
    });
  }

  const pregAvoid = oils.filter(o => o.pregnancy === "AVOID" || o.pregnancy === "AVOID — abortifacient");
  if (pregAvoid.length) {
    items.push({
      level: "danger", icon: "⚠",
      title: "Not for pregnancy",
      detail: `Avoid entirely during pregnancy: ${pregAvoid.map(o => o.name).join(", ")}.`
    });
  }

  const kidUnsafe = oils.filter(o => /children/i.test((o.cautions || []).join(" ")));
  if (kidUnsafe.length) {
    items.push({
      level: "warn", icon: "ⓘ",
      title: "Children caution",
      detail: `${kidUnsafe.map(o => o.name).join(", ")} — restrictions for young children (see individual cautions).`
    });
  }

  const eos = oils.filter(o => o.type === "essential" && typeof o.max_dermal === "number");
  if (eos.length) {
    const minMax = Math.min(...eos.map(o => o.max_dermal));
    const constrainer = eos.find(o => o.max_dermal === minMax);
    if (minMax < 1) {
      items.push({
        level: "danger", icon: "⚠",
        title: `Dermal ceiling: ${minMax}% (topical)`,
        detail: `${constrainer.name} caps the whole blend at ${minMax}% max on skin. For a 15ml bottle that's ${(minMax/100 * 15 * 20).toFixed(0)} drops total EO maximum.`
      });
    } else if (minMax < 5) {
      items.push({
        level: "warn", icon: "ⓘ",
        title: `Dermal ceiling: ${minMax}%`,
        detail: `${constrainer.name} is the limiting oil for skin use.`
      });
    } else {
      items.push({
        level: "ok", icon: "✓",
        title: `Dermal safe at typical dilution`,
        detail: `Lowest ceiling is ${minMax}% (${constrainer.name}). 2% is safe for body use.`
      });
    }
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

  const totalDrops = withChem.reduce((s, o) => s + o.drops, 0);
  const families = {};
  withChem.forEach(o => {
    o.constituents.forEach(c => {
      const fam = familyOf(c.c);
      families[fam] = (families[fam] || 0) + (c.pct * o.drops / totalDrops);
    });
  });
  const famSorted = Object.entries(families).sort((a, b) => b[1] - a[1]);

  container.innerHTML = perOil + `
    <div class="chem-family">
      ${famSorted.map(([fam, pct]) => `
        <div class="chem-family-item">
          <div class="chem-family-item-name">${fam}</div>
          <div class="chem-family-item-pct">${pct.toFixed(1)}%</div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderRecipe(oils) {
  const container = document.getElementById("recipe-output");
  if (oils.length === 0) { container.innerHTML = '<div class="empty">No oils selected.</div>'; return; }

  const totalVol = parseFloat(document.getElementById("total-volume").value);
  const useCase = document.getElementById("use-case").value;
  const totalDrops = oils.reduce((s, o) => s + o.drops, 0);

  const dilutionMap = {
    "diffusion": null,
    "topical-body": 2,
    "topical-face": 1,
    "topical-sensitive": 0.5,
    "perfume": 20
  };
  const targetDilution = dilutionMap[useCase];

  const eos = oils.filter(o => o.type === "essential" && typeof o.max_dermal === "number");
  const dermalCeiling = eos.length ? Math.min(...eos.map(o => o.max_dermal)) : 100;

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

  let carrierMsg = "";
  if (useCase === "diffusion") {
    carrierMsg = `Diffuser use: place all ${totalDrops} drops in the diffuser water reservoir. No dilution needed.`;
  } else {
    const effectiveDilution = Math.min(targetDilution, dermalCeiling);
    const maxDrops = Math.floor(effectiveDilution * totalVol * 20 / 100);
    const carrierMl = totalVol - (totalDrops * 0.05);
    const overLimit = totalDrops > maxDrops;
    carrierMsg = `
      Target dilution: <strong>${effectiveDilution}%</strong> (${useCase.replace("-", " ")})
      ${dermalCeiling < targetDilution ? `<br><em>Adjusted down from ${targetDilution}% — safety cap of ${dermalCeiling}% from limiting oil.</em>` : ""}
      <br>For a ${totalVol} ml bottle at ${effectiveDilution}%: max <strong>${maxDrops} drops</strong> of essential oil total.
      <br>You have ${totalDrops} drops selected ${overLimit ? `<strong style="color:var(--clay)">— exceeds limit by ${totalDrops - maxDrops} drops. Reduce or increase carrier.</strong>` : `— fits safely.`}
      <br>Fill remaining <strong>${carrierMl.toFixed(1)} ml</strong> with carrier oil (Prunus amygdalus dulcis / sweet almond, jojoba, or fractionated coconut).
    `;
  }

  container.innerHTML = `
    ${lines}
    <div class="recipe-total">
      <span>Total</span>
      <span>${totalDrops} drops · ${oils.length} oil${oils.length > 1 ? "s" : ""}</span>
    </div>
    <div class="recipe-carrier">${carrierMsg}</div>
  `;
}

// ============ MODAL ============
function openModal(oilId) {
  const oil = OILS.find(o => o.id === oilId);
  const inBlend = state.blend[oil.id] > 0;
  const body = document.getElementById("modal-body");

  const constituentsHtml = oil.constituents && oil.constituents.length
    ? `<div class="chem-bars">${oil.constituents.map(c => `
        <div class="chem-bar">
          <div class="chem-bar-name">${c.c} <span style="color:var(--ink-3);">(${familyOf(c.c)})</span></div>
          <div class="chem-bar-track"><div class="chem-bar-fill" style="width:${Math.min(c.pct, 100)}%"></div></div>
          <div class="chem-bar-pct">${c.pct}%</div>
        </div>`).join("")}</div>`
    : `<div class="warn-banner">No chemical profile — this is a synthetic fragrance accord, not a true essential oil.</div>`;

  const phototoxBanner = oil.phototoxic
    ? `<div class="danger-banner"><strong>⚠ Phototoxic.</strong> ${oil.phototox_note}</div>`
    : "";

  const pregnancyClass = /AVOID/i.test(oil.pregnancy) ? "danger-banner"
    : /caution|until labor/i.test(oil.pregnancy) ? "warn-banner" : "";

  body.innerHTML = `
    <button class="modal-close" aria-label="Close dialog" type="button">&times;</button>
    <h2>${oil.name}</h2>
    <div class="oil-latin">${oil.latin}</div>
    <div class="oil-meta">
      <span class="tag note-${oil.note === "Top" ? "top" : oil.note === "Middle" ? "mid" : "base"}">${oil.note} note</span>
      <span class="tag">${oil.category}</span>
      <span class="tag">Intensity ${oil.intensity}/5</span>
      <span class="tag">Blend strength ${oil.blend_strength}/5</span>
      ${oil.type === "fragrance" ? '<span class="tag type-fragrance">Fragrance</span>' : ''}
      ${oil.phototoxic ? '<span class="tag phototox">Phototoxic</span>' : ''}
    </div>

    ${phototoxBanner}
    ${pregnancyClass ? `<div class="${pregnancyClass}"><strong>Pregnancy:</strong> ${oil.pregnancy}</div>` : ""}

    <div class="modal-section">
      <h4>Aroma Profile</h4>
      <div>${oil.aroma.join(" · ")}</div>
    </div>

    <div class="modal-section">
      <h4>Chemical Constituents</h4>
      ${constituentsHtml}
    </div>

    ${oil.max_dermal != null ? `<div class="modal-section">
      <h4>Max Dermal Dilution (Tisserand)</h4>
      <div>${oil.max_dermal}% ${oil.max_dermal === 100 ? "(no ceiling — safe at any typical use dilution)" : `— above this on skin risks sensitization/irritation`}</div>
    </div>` : ""}

    <div class="modal-section">
      <h4>Cautions</h4>
      <ul style="padding-left:18px; font-size:13px; color:var(--ink-2);">
        ${(oil.cautions || []).map(c => `<li>${c}</li>`).join("")}
      </ul>
    </div>

    <div class="modal-section">
      <h4>Blends Well With</h4>
      <div>${oil.pairs_with.join(" · ")}</div>
    </div>

    <div class="modal-section">
      <h4>Traditional Uses</h4>
      <div>${oil.uses.join(" · ")}</div>
    </div>

    <div class="modal-actions">
      ${inBlend
        ? `<button class="btn-primary remove" id="modal-toggle">Remove from Blend</button>`
        : `<button class="btn-primary" id="modal-toggle">Add to Blend (2 drops)</button>`}
      <button class="btn-secondary" data-close>Close</button>
    </div>
  `;

  document.getElementById("modal").classList.remove("hidden");
  const closeBtn = document.querySelector("#modal .modal-close");
  if (closeBtn) closeBtn.focus();
  document.getElementById("modal-toggle").addEventListener("click", () => {
    if (state.blend[oil.id]) removeFromBlend(oil.id);
    else addToBlend(oil.id, 2);
    closeModal();
  });
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// ============ PRESETS & AROMA LAB ============
const PRESETS = [
  {
    name: "Evening Wind-Down",
    desc: "Sleep and anxiety relief blend — 3-note pyramid with clinical support for both.",
    oils: { "lavender": 4, "chamomile": 2, "cedarwood": 2, "bergamot": 1 }
  },
  {
    name: "Focus & Study",
    desc: "Alertness and concentration — rosemary boosts memory recall in trials.",
    oils: { "rosemary": 3, "lemon": 3, "peppermint": 2, "basil": 1 }
  },
  {
    name: "Breathe Deep",
    desc: "Respiratory support blend for congestion and colds. Not for children under 6.",
    oils: { "eucalyptus": 3, "peppermint": 2, "tea-tree": 2, "pine": 2, "lemon": 1 }
  },
  {
    name: "Meditation",
    desc: "Grounding, resinous — traditional temple woods and resins.",
    oils: { "frankincense": 3, "sandalwood": 3, "myrrh": 2, "vetiver": 1 }
  },
  {
    name: "Sensual Amber",
    desc: "Aphrodisiac perfumery blend. Rich base, floral heart, citrus lift.",
    oils: { "ylang-ylang": 2, "jasmine": 1, "sandalwood": 3, "vanilla": 2, "bergamot": 2 }
  },
  {
    name: "Mood Lift",
    desc: "Anti-depressant citrus + floral. Bergamot has strong clinical support for anxiety.",
    oils: { "bergamot": 3, "orange-blossom": 2, "sweet-orange": 3, "ylang-ylang": 1 }
  },
  {
    name: "Muscle Relief",
    desc: "Warming + cooling for post-workout. Body use only at 2% dilution.",
    oils: { "peppermint": 2, "rosemary": 2, "black-pepper": 1, "marjoram": 3, "lavender": 2 }
  },
  {
    name: "Insect Repellent",
    desc: "For mosquitoes, ticks, no-see-ums. Not for infants. (Does not repel roaches, ants, or fleas.)",
    oils: { "lemongrass": 3, "cedarwood": 3, "geranium": 2, "eucalyptus": 2 }
  },
  {
    name: "Florida Mosquito Shield",
    desc: "Targets Aedes aegypti (day-biters) and Culex (night-biters). Citronellol + geraniol + citral are the three strongest terpene repellents. Body use at 2% max.",
    oils: { "lemongrass": 3, "geranium": 3, "lavender": 2, "tea-tree": 2, "cedarwood": 2, "eucalyptus": 1 }
  },
  {
    name: "Winter Hearth",
    desc: "Warming holiday diffusion — DIFFUSION ONLY, do not use on skin (cinnamon).",
    oils: { "cinnamon": 1, "clove": 1, "sweet-orange": 4, "frankincense": 2, "vanilla": 2 }
  }
];

function renderPresets() {
  const grid = document.getElementById("preset-grid");
  grid.innerHTML = PRESETS.map((p, i) => {
    const names = Object.keys(p.oils).map(id => OILS.find(o => o.id === id).name);
    return `
      <div class="preset-card" data-preset="${i}">
        <div class="preset-name">${p.name}</div>
        <div class="preset-desc">${p.desc}</div>
        <div class="preset-oils">${names.join(" · ")}</div>
      </div>
    `;
  }).join("");
  grid.querySelectorAll(".preset-card").forEach(el => {
    el.addEventListener("click", () => {
      const p = PRESETS[el.dataset.preset];
      state.blend = { ...p.oils };
      setView("blend");
      renderAll();
    });
  });
}

const MOOD_BLEND_CATS = [...new Set(MOOD_BLENDS.map(b => b.cat))];
const moodBlendState = { cat: "", search: "", shown: 24 };

function findLibraryOil(name) {
  const n = name.toLowerCase();
  return OILS.find(o => o.name.toLowerCase() === n)
      || OILS.find(o => o.name.toLowerCase().includes(n) || n.includes(o.name.toLowerCase()))
      || OILS.find(o => {
           const stripped = o.name.toLowerCase().replace(/\s*\(.*\)/, "");
           const words = n.split(" ");
           return words.includes(stripped) || stripped.split(" ").some(w => n.includes(w) && w.length > 4);
         });
}

function filteredMoodBlends() {
  return MOOD_BLENDS.filter(b => {
    if (moodBlendState.cat && b.cat !== moodBlendState.cat) return false;
    if (moodBlendState.search) {
      const hay = `${b.name} ${b.cat} ${b.oils.map(o => o.n).join(" ")}`.toLowerCase();
      if (!hay.includes(moodBlendState.search)) return false;
    }
    return true;
  });
}

function renderMoodBlendCats() {
  const wrap = document.getElementById("moodblend-cats");
  wrap.innerHTML = ['<button class="chip moodblend-cat' + (moodBlendState.cat === "" ? " active-cat" : "") + '" data-cat="" type="button">All</button>']
    .concat(MOOD_BLEND_CATS.map(cat =>
      `<button class="chip moodblend-cat${moodBlendState.cat === cat ? " active-cat" : ""}" data-cat="${cat}" type="button">${cat}</button>`
    )).join("");
  wrap.querySelectorAll(".moodblend-cat").forEach(btn => {
    btn.addEventListener("click", () => {
      moodBlendState.cat = btn.dataset.cat;
      moodBlendState.shown = 24;
      renderMoodBlendCats();
      renderMoodBlends();
    });
  });
}

function renderMoodBlends() {
  const grid = document.getElementById("moodblend-grid");
  const list = filteredMoodBlends();
  const visible = list.slice(0, moodBlendState.shown);
  if (!visible.length) {
    grid.innerHTML = '<div class="empty">No blends match.</div>';
  } else {
    grid.innerHTML = visible.map(b => {
      const idx = MOOD_BLENDS.indexOf(b);
      return `
        <div class="preset-card" data-moodblend="${idx}">
          <div class="preset-name">${b.name}</div>
          <div class="preset-desc">${b.cat}</div>
          <div class="preset-oils">${b.oils.map(o => o.n).join(" · ")}</div>
        </div>`;
    }).join("");
    grid.querySelectorAll("[data-moodblend]").forEach(el => {
      el.addEventListener("click", e => {
        goldDustBurst(e.clientX, e.clientY);
        setTimeout(() => openMoodBlendModal(+el.dataset.moodblend), 170);
      });
    });
  }
  const more = document.getElementById("moodblend-more");
  more.style.display = list.length > moodBlendState.shown ? "" : "none";
  more.textContent = `Show more blends (${Math.min(moodBlendState.shown, list.length)} of ${list.length})`;
}

function openMoodBlendModal(idx) {
  const b = MOOD_BLENDS[idx];
  const body = document.getElementById("modal-body");
  const matched = b.oils.map(o => ({ ...o, lib: findLibraryOil(o.n) }));
  const unmatched = matched.filter(m => !m.lib).map(m => m.n);
  body.innerHTML = `
    <button class="modal-close" aria-label="Close dialog" type="button">&times;</button>
    <h2>${b.name}</h2>
    <div class="oil-latin">${b.cat}</div>
    <div class="modal-section"><h4>Oils</h4><div>${b.oils.map(o => `${o.n} (${o.p} parts)`).join(" · ")}</div></div>
    <div class="modal-section"><h4>Diffuser (per 100ml water)</h4><div>${b.diff}</div></div>
    <div class="modal-section"><h4>Roll-on</h4><div>${b.top}</div></div>
    ${b.wear ? `<div class="modal-section"><h4>Wrist Wear</h4><div>${b.wear}</div></div>` : ""}
    ${b.caution ? `<div class="warn-banner"><strong>Caution:</strong> ${b.caution}.</div>` : ""}
    <div class="modal-section"><h4>Affirmation</h4><div style="font-style:italic;">"${b.aff}"</div></div>
    <p class="muted" style="margin-top:14px;">Always patch test before topical use. Keep away from eyes, children, and pets. Consult a physician if pregnant, nursing, or on medication.</p>
    <div class="modal-actions">
      <button class="btn-primary" id="moodblend-load">Load Oils into Blend</button>
      <button class="btn-secondary" data-close>Close</button>
    </div>
  `;
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("moodblend-load").addEventListener("click", () => {
    state.blend = {};
    matched.forEach(m => { if (m.lib) state.blend[m.lib.id] = m.p; });
    closeModal();
    setView("blend");
    renderAll();
    renderInlineShelf();
  });
  if (unmatched.length) {
    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = `Not in the oil library (recipe only): ${unmatched.join(", ")}`;
    body.querySelector(".modal-actions").before(note);
  }
}

document.getElementById("moodblend-search").addEventListener("input", e => {
  moodBlendState.search = e.target.value.toLowerCase();
  moodBlendState.shown = 24;
  renderMoodBlends();
});
document.getElementById("moodblend-more").addEventListener("click", () => {
  moodBlendState.shown += 48;
  renderMoodBlends();
});
renderMoodBlendCats();
renderMoodBlends();

// ============ PAIRING SUGGESTIONS ============
function renderPairingSuggestions() {
  const container = document.getElementById("pairing-suggestions");
  const currentIds = Object.keys(state.blend);
  if (currentIds.length === 0) {
    container.innerHTML = '<div class="empty">Add oils to your blend first, then suggestions will appear here.</div>';
    return;
  }
  const scores = {};
  currentIds.forEach(id => {
    const oil = OILS.find(o => o.id === id);
    oil.pairs_with.forEach(pairName => {
      const matched = OILS.find(o => o.name.toLowerCase().includes(pairName.toLowerCase()) || pairName.toLowerCase().includes(o.name.toLowerCase()));
      if (matched && !state.blend[matched.id]) {
        scores[matched.id] = (scores[matched.id] || 0) + 1;
      }
    });
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 12);
  if (sorted.length === 0) {
    container.innerHTML = '<div class="empty">No further pairings recommended — the blend is fully connected.</div>';
    return;
  }
  container.innerHTML = sorted.map(([id, score]) => {
    const oil = OILS.find(o => o.id === id);
    return `<div class="pairing-item" data-id="${id}"><span>${oil.name}<br><small style="color:var(--ink-3);">${oil.note}</small></span><span class="pairing-score">${score} match${score > 1 ? "es" : ""}</span></div>`;
  }).join("");
  container.querySelectorAll(".pairing-item").forEach(el => {
    el.addEventListener("click", () => openModal(el.dataset.id));
  });
}

// ============ TERPENES VIEW ============
function renderTerpenes() {
  const container = document.getElementById("terpene-list");
  if (!container) return;
  container.innerHTML = TERPENES.map((t, i) => {
    const actionsHtml = t.actions.map(a => `
      <div class="terpene-action">
        <div class="terpene-action-head">
          <span class="terpene-action-name">${a.effect}</span>
          <span class="strength-pill strength-${a.strength}">${a.strength}</span>
        </div>
        <div class="terpene-action-detail">${a.detail}</div>
      </div>
    `).join("");
    return `
      <div class="terpene-card" data-terp="${i}">
        <div class="terpene-head">
          <div>
            <div class="terpene-name">${t.name}</div>
            <div class="terpene-aroma">${t.aroma}</div>
          </div>
          <div class="terpene-family">${t.family}</div>
        </div>
        <div class="terpene-detail hidden">
          ${actionsHtml}
          ${t.warnings ? `<div class="terpene-warning"><strong>Caution:</strong> ${t.warnings}</div>` : ""}
          <div class="terpene-found"><div class="terpene-found-label">Found in</div>${t.found_in.join(" · ")}</div>
        </div>
      </div>
    `;
  }).join("");
  container.querySelectorAll(".terpene-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("expanded");
      card.querySelector(".terpene-detail").classList.toggle("hidden");
    });
  });
}

// ============ MOODLAB ============
const MOODLAB_AFFIRMATIONS = {
  "calm-peace": [
    "My peace is not up for negotiation.",
    "I breathe in stillness and release everything that is not mine to carry.",
    "The world can be loud and my center can still be quiet.",
    "I return to calm as easily as I return home.",
    "Nothing meant for me requires me to abandon my peace.",
    "I am allowed to rest in the middle of the storm."
  ],
  "motivation-drive": [
    "I move with purpose, even on the days purpose has to be chosen.",
    "My ambition is a birthright, not a burden.",
    "I do not wait for permission to become who I already am.",
    "Every small step is proof that I have not given up.",
    "I was built to finish what I start.",
    "My momentum belongs to me, and no one gets to slow it."
  ],
  "renewal-rejuvenation": [
    "I am allowed to begin again as many times as I need.",
    "What drained me yesterday does not get to define me today.",
    "I am being made new in ways I cannot yet see.",
    "My body and spirit know how to restore themselves, and I let them.",
    "I release the old version of me with gratitude.",
    "Every morning is another chance to come back to myself."
  ],
  "reenergize-reignite": [
    "My fire did not go out. It was only resting.",
    "Energy flows to me the moment I decide to receive it.",
    "I reignite the parts of me the world tried to dim.",
    "I am not tired of my dreams. I am gathering strength.",
    "Passion is my natural state, and I am returning to it now.",
    "I have more inside me than the world has ever taken."
  ],
  "relaxation-rest": [
    "Rest is productive, and I have nothing to prove by exhausting myself.",
    "I give my body permission to soften.",
    "I am safe enough to let my shoulders drop.",
    "Slowing down is not falling behind.",
    "I release the weight I was never meant to carry alone.",
    "My worth was never tied to how much I could endure."
  ],
  "self-love-being-loved": [
    "I am worthy of the love I so freely give to others.",
    "I choose myself without guilt and without apology.",
    "I am my own soft place to land.",
    "The love I have been searching for begins in how I speak to myself.",
    "I am enough exactly as I am today.",
    "I deserve tenderness, and I start by offering it to myself."
  ],
  "confidence-power": [
    "I take up space because I belong in every room I enter.",
    "My voice matters, and I will not shrink it to make others comfortable.",
    "I trust myself to handle whatever comes.",
    "My power is rooted in generations who came before me.",
    "I do not dim my light to be accepted.",
    "Confidence is my inheritance, and I claim it fully."
  ],
  "protection-strength": [
    "I am protected, grounded, and impossible to break.",
    "The world may push, but I am rooted too deep to fall.",
    "I carry the strength of every woman who survived so I could stand here.",
    "What is meant to harm me will not have the final word.",
    "I guard my energy like the treasure it is.",
    "I am still standing, and that alone is resistance."
  ],
  "joy-uplift": [
    "Joy is my right, even now, especially now.",
    "I let myself laugh, dance, and feel good without waiting for permission.",
    "My happiness is an act of defiance, and I choose it daily.",
    "I make room for lightness even in heavy seasons.",
    "There is still beauty available to me, and I reach for it.",
    "I deserve a life that feels good, not just one that looks strong."
  ],
  "clarity-focus": [
    "I know what matters, and I let the rest fall away.",
    "My mind is clear, and my next step is becoming visible.",
    "I trust the wisdom that lives inside me.",
    "I release the noise and listen for my own voice.",
    "I see my path clearly and walk it with confidence.",
    "I am focused, grounded, and sure of where I am headed."
  ]
};

const MOODLAB_MOOD_PRESETS = {
  "calm-peace": { title: "Calm Current", tagline: "Stillness. Soft breath. Steady heart.", oils: ["Lavender", "Frankincense", "Bergamot"] },
  "motivation-drive": { title: "Momentum", tagline: "Purpose on. Excuses off.", oils: ["Peppermint", "Rosemary", "Sweet Orange"] },
  "renewal-rejuvenation": { title: "Reset Ritual", tagline: "Reset. Restore. Return to self.", oils: ["Eucalyptus", "Geranium", "Sweet Orange"] },
  "reenergize-reignite": { title: "Spark Back", tagline: "Wake the fire back up.", oils: ["Lemon", "Ginger", "Cinnamon"] },
  "relaxation-rest": { title: "Soft Landing", tagline: "Soft body. Quiet mind.", oils: ["Lavender", "Chamomile", "Ylang Ylang"] },
  "self-love-being-loved": { title: "Heart Open", tagline: "Open heart. Gentle voice.", oils: ["Rose", "Jasmine", "Ylang Ylang"] },
  "confidence-power": { title: "Rooted Power", tagline: "Rooted power. Unshaken presence.", oils: ["Cedarwood", "Patchouli", "Black Pepper"] },
  "protection-strength": { title: "Green Armor", tagline: "Breathe deep. Stay strong.", oils: ["Eucalyptus", "Tea Tree", "Clove"] },
  "joy-uplift": { title: "Golden Hour", tagline: "Sunlight in a bottle.", oils: ["Sweet Orange", "Bergamot", "Ylang Ylang"] },
  "clarity-focus": { title: "Sunday Focus", tagline: "Deep work. Quiet mind.", oils: ["Rosemary", "Peppermint", "Lemon"] }
};

function getMoodlabThemeFromBlend(oils) {
  const names = oils.map(o => (typeof o === "string" ? o : o.name).toLowerCase());
  if (names.some(n => ["lavender", "frankincense", "bergamot"].includes(n))) return "calm-peace";
  if (names.some(n => ["peppermint", "rosemary", "basil"].includes(n))) return "clarity-focus";
  if (names.some(n => ["sweet orange", "grapefruit", "lemon", "wild orange"].includes(n))) return "joy-uplift";
  if (names.some(n => ["eucalyptus", "geranium"].includes(n))) return "renewal-rejuvenation";
  if (names.some(n => ["ginger", "cinnamon"].includes(n))) return "reenergize-reignite";
  if (names.some(n => ["chamomile", "chamomile roman", "ylang ylang"].includes(n))) return "relaxation-rest";
  if (names.some(n => ["rose", "jasmine"].includes(n))) return "self-love-being-loved";
  if (names.some(n => ["cedarwood", "cedarwood atlas", "patchouli", "black pepper"].includes(n))) return "confidence-power";
  if (names.some(n => ["vetiver", "tea tree", "clove"].includes(n))) return "protection-strength";
  return "clarity-focus";
}

function getDefaultMoodline(theme) {
  return (MOODLAB_MOOD_PRESETS[theme] || {}).tagline || "Set the mood.";
}

function getRandomMoodlabAffirmation(theme) {
  const affirmations = MOODLAB_AFFIRMATIONS[theme] || [];
  if (!affirmations.length) return "";
  const idx = Math.floor(Math.random() * affirmations.length);
  return affirmations[idx];
}

function assignMoodlabAffirmation(theme, force = false) {
  const card = document.getElementById("mood-card");
  const currentTheme = card.dataset.moodTheme || "";
  const currentAffirmation = card.dataset.affirmation || "";
  if (!force && currentTheme === theme && currentAffirmation) return currentAffirmation;
  const affirmation = getRandomMoodlabAffirmation(theme);
  card.dataset.moodTheme = theme;
  card.dataset.affirmation = affirmation;
  return affirmation;
}

function getAssignedMoodlabAffirmation() {
  const card = document.getElementById("mood-card");
  return card.dataset.affirmation || "";
}

function getCurrentBlendOils() {
  return Object.keys(state.blend).map(id => OILS.find(o => o.id === id)).filter(Boolean);
}

function getCurrentBlendNames() {
  return getCurrentBlendOils().map(o => o.name);
}

function titleFromOilNames(names) {
  if (!names.length) return "Mood Blend";
  if (names.length === 1) return `${names[0]} Blend`;
  if (names.length === 2) return `${names[0]} + ${names[1]}`;
  return `${names[0]} + Blend`;
}

function getMoodPresetData(theme) {
  const preset = MOODLAB_MOOD_PRESETS[theme] || MOODLAB_MOOD_PRESETS["clarity-focus"];
  return { title: preset.title, tagline: preset.tagline, oils: [...preset.oils], mood: theme, placeholderChip: "" };
}

function getMyBlendData() {
  const names = getCurrentBlendNames();
  const mood = names.length ? getMoodlabThemeFromBlend(names) : document.getElementById("moodlab-theme").value || "clarity-focus";
  return { title: names.length ? titleFromOilNames(names) : "My Blend", tagline: getDefaultMoodline(mood), oils: names, mood, placeholderChip: names.length ? "" : "Build a blend in Aroma Lab" };
}

function computeSuggestedBlendOptions() {
  const currentIds = Object.keys(state.blend);
  if (!currentIds.length) return [];

  const scores = {};
  currentIds.forEach(id => {
    const oil = OILS.find(o => o.id === id);
    if (!oil) return;
    oil.pairs_with.forEach(pairName => {
      const matched = OILS.find(o => o.name.toLowerCase().includes(pairName.toLowerCase()) || pairName.toLowerCase().includes(o.name.toLowerCase()));
      if (matched && !state.blend[matched.id]) scores[matched.id] = (scores[matched.id] || 0) + 1;
    });
  });

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([id]) => OILS.find(o => o.id === id)).filter(Boolean).slice(0, 4);
  const baseNames = getCurrentBlendNames().slice(0, 3);
  const options = [];

  if (ranked[0]) {
    const oils = [...baseNames, ranked[0].name];
    const mood = getMoodlabThemeFromBlend(oils);
    options.push({ label: `${baseNames[0] || "Blend"} + ${ranked[0].name}`, title: `${ranked[0].name} Lift`, tagline: getDefaultMoodline(mood), oils, mood });
  }

  if (ranked[0] && ranked[1]) {
    const oils = [...baseNames.slice(0, 2), ranked[0].name, ranked[1].name];
    const mood = getMoodlabThemeFromBlend(oils);
    options.push({ label: `${ranked[0].name} + ${ranked[1].name} support`, title: `${ranked[0].name} Harmony`, tagline: getDefaultMoodline(mood), oils, mood });
  }

  if (ranked[0] && ranked[1] && ranked[2]) {
    const oils = [ranked[0].name, ranked[1].name, ranked[2].name];
    const mood = getMoodlabThemeFromBlend(oils);
    options.push({ label: `${ranked[0].name}, ${ranked[1].name} & ${ranked[2].name}`, title: "Harmonizing Trio", tagline: getDefaultMoodline(mood), oils, mood });
  }

  return options;
}

function populateSuggestedBlendOptions() {
  const wrap = document.getElementById("moodlab-suggested-wrap");
  const select = document.getElementById("moodlab-suggested");
  const options = computeSuggestedBlendOptions();
  if (!options.length) { wrap.classList.add("hidden"); select.innerHTML = ""; return options; }
  wrap.classList.remove("hidden");
  select.innerHTML = options.map((opt, idx) => `<option value="${idx}">${opt.label}</option>`).join("");
  if (select.dataset.selectedIndex && Number(select.dataset.selectedIndex) < options.length) {
    select.value = select.dataset.selectedIndex;
  } else {
    select.value = "0"; select.dataset.selectedIndex = "0";
  }
  return options;
}

function getSuggestedBlendData() {
  const options = computeSuggestedBlendOptions();
  if (!options.length) {
    const mood = document.getElementById("moodlab-theme").value || "clarity-focus";
    return { title: "Suggested Blend", tagline: getDefaultMoodline(mood), oils: [], mood, placeholderChip: "Build a blend to unlock suggestions" };
  }
  const select = document.getElementById("moodlab-suggested");
  const idx = Math.min(Number(select.value) || 0, options.length - 1);
  select.dataset.selectedIndex = String(idx);
  return { ...options[idx], placeholderChip: "" };
}

function resolveMoodlabBlendData() {
  const source = document.getElementById("moodlab-source").value;
  const theme = document.getElementById("moodlab-theme").value || "clarity-focus";
  if (source === "mood-preset") return getMoodPresetData(theme);
  if (source === "suggested") return getSuggestedBlendData();
  return getMyBlendData();
}

function applyMoodlabSource(force = false) {
  const sourceSelect = document.getElementById("moodlab-source");
  const themeSelect = document.getElementById("moodlab-theme");
  const titleInput = document.getElementById("moodlab-title");
  const taglineInput = document.getElementById("moodlab-tagline");
  const attributionInput = document.getElementById("moodlab-attribution");
  const suggestedWrap = document.getElementById("moodlab-suggested-wrap");

  if (sourceSelect.value === "suggested") populateSuggestedBlendOptions();
  else suggestedWrap.classList.add("hidden");

  const data = resolveMoodlabBlendData();
  if (force || !titleInput.dataset.touched) titleInput.value = data.title || "Mood Blend";
  if (force || !themeSelect.dataset.touched) themeSelect.value = data.mood || themeSelect.value || "clarity-focus";
  if (force || !taglineInput.dataset.touched) taglineInput.value = data.tagline || getDefaultMoodline(themeSelect.value);
  if (!attributionInput.value) attributionInput.value = "Diffuser set by @vibezandbutterflyz";

  assignMoodlabAffirmation(themeSelect.value, true);
  syncMoodCard();
}

function renderMoodlab() {
  const currentNames = getCurrentBlendNames();
  const sourceSelect = document.getElementById("moodlab-source");
  const themeSelect = document.getElementById("moodlab-theme");
  const inferredMood = currentNames.length ? getMoodlabThemeFromBlend(currentNames) : (themeSelect.value || "clarity-focus");

  if (!sourceSelect.dataset.touched) sourceSelect.value = currentNames.length ? "my-blend" : "mood-preset";
  if (!themeSelect.dataset.touched && sourceSelect.value === "my-blend") themeSelect.value = inferredMood;
  if (!themeSelect.dataset.touched && sourceSelect.value === "mood-preset") themeSelect.value = themeSelect.value || "clarity-focus";

  applyMoodlabSource(false);
}

function syncMoodCard() {
  const data = resolveMoodlabBlendData();
  const title = document.getElementById("moodlab-title").value.trim() || data.title || "Mood Blend";
  const tagline = document.getElementById("moodlab-tagline").value.trim() || data.tagline || "Set the mood.";
  const attribution = document.getElementById("moodlab-attribution").value.trim() || "Diffuser set by @vibezandbutterflyz";
  const theme = document.getElementById("moodlab-theme").value || data.mood || "clarity-focus";
  const card = document.getElementById("mood-card");
  const affirmation = assignMoodlabAffirmation(theme);
  const oils = data.oils || [];
  const placeholder = data.placeholderChip || "Add oils to your blend";

  card.className = `mood-card theme-${theme}`;
  document.getElementById("mood-card-title").textContent = title;
  document.getElementById("mood-card-tagline").textContent = tagline;
  document.getElementById("mood-card-affirmation").textContent = affirmation;
  document.getElementById("mood-card-attribution").textContent = attribution;
  document.getElementById("mood-card-oils").innerHTML = oils.length
    ? oils.map(o => `<span class="mood-card-chip">${o}</span>`).join("")
    : `<span class="mood-card-chip">${placeholder}</span>`;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(/\s+/).filter(Boolean);
  let line = ""; const lines = [];
  words.forEach(word => {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
    else { line = test; }
  });
  if (line) lines.push(line);
  lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * lineHeight));
  return lines.length;
}

function drawChip(ctx, text, x, y) {
  ctx.font = '500 22px Satoshi, Arial, sans-serif';
  const padX = 18; const w = ctx.measureText(text).width + padX * 2;
  const h = 42; const r = 21;
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText(text, x + padX, y + h / 2 + 1);
  return w;
}

async function downloadMoodCard() {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  const data = resolveMoodlabBlendData();
  const title = (document.getElementById("moodlab-title").value || data.title || "Mood Blend").trim();
  const tagline = (document.getElementById("moodlab-tagline").value || data.tagline || "Set the mood.").trim();
  const affirmation = getAssignedMoodlabAffirmation();
  const attribution = (document.getElementById("moodlab-attribution").value || "Diffuser set by @vibezandbutterflyz").trim();
  const theme = document.getElementById("moodlab-theme").value || data.mood || "clarity-focus";
  const oils = (data.oils && data.oils.length ? data.oils : [data.placeholderChip || "Build a blend in Aroma Lab"]);
  const fileName = (title || 'mood-card').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'mood-card';
  const canvas = document.createElement('canvas');
  const size = 1400; canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradients = {
    "calm-peace": ['#4C6B4A', '#7A6EA8'], "motivation-drive": ['#2F4A32', '#B8873E'],
    "renewal-rejuvenation": ['#4C6B4A', '#C9A62A'], "reenergize-reignite": ['#B8873E', '#A64B2A'],
    "relaxation-rest": ['#6B4A2F', '#7A6EA8'], "self-love-being-loved": ['#A64B2A', '#7A6EA8'],
    "confidence-power": ['#6B4A2F', '#2F4A32'], "protection-strength": ['#2F4A32', '#6B4A2F'],
    "joy-uplift": ['#C9A62A', '#B8873E'], "clarity-focus": ['#2F4A32', '#7A6EA8']
  };
  const [c1, c2] = gradients[theme] || gradients["clarity-focus"];
  const g = ctx.createLinearGradient(0, 0, size, size);
  g.addColorStop(0, c1); g.addColorStop(1, c2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.arc(1180, 220, 220, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.arc(170, 1230, 180, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.font = '500 30px Satoshi, Arial, sans-serif'; ctx.globalAlpha = 0.9;
  ctx.fillText('VIBEZ & BUTTERFLYZ BLENDZ', size / 2, 170);
  ctx.globalAlpha = 1; ctx.font = '600 88px Georgia, Times New Roman, serif';
  const titleLines = wrapText(ctx, title, size / 2, 340, 980, 98);
  ctx.font = '400 40px Satoshi, Arial, sans-serif'; ctx.globalAlpha = 0.94;
  const taglineY = 340 + titleLines * 98 + 30;
  const taglineLines = wrapText(ctx, tagline, size / 2, taglineY, 920, 52);
  ctx.globalAlpha = 1; ctx.font = '400 42px Georgia, Times New Roman, serif';
  const affirmationY = taglineY + taglineLines * 52 + 42;
  const affirmationLines = wrapText(ctx, affirmation, size / 2, affirmationY, 960, 56);
  const dividerY = affirmationY + affirmationLines * 56 + 42;
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  const dw = 120, dh = 8, dx = size / 2 - dw / 2;
  ctx.beginPath(); ctx.moveTo(dx + 4, dividerY); ctx.arcTo(dx + dw, dividerY, dx + dw, dividerY + dh, 4);
  ctx.arcTo(dx + dw, dividerY + dh, dx, dividerY + dh, 4); ctx.arcTo(dx, dividerY + dh, dx, dividerY, 4);
  ctx.arcTo(dx, dividerY, dx + dw, dividerY, 4); ctx.closePath(); ctx.fill();
  let chipX = 220, chipY = dividerY + 70; const chipGap = 16;
  oils.forEach(name => {
    ctx.font = '500 22px Satoshi, Arial, sans-serif';
    const w = ctx.measureText(name).width + 36;
    if (chipX + w > size - 220) { chipX = 220; chipY += 58; }
    chipX += drawChip(ctx, name, chipX, chipY) + chipGap;
  });
  ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.88; ctx.font = '400 28px Satoshi, Arial, sans-serif';
  wrapText(ctx, attribution, size / 2, 1110, 960, 38);
  ctx.globalAlpha = 0.72; ctx.font = '500 22px Satoshi, Arial, sans-serif';
  ctx.fillText('MADE IN AROMA LAB', size / 2, 1210);
  ctx.globalAlpha = 1;
  const link = document.createElement('a');
  link.download = `${fileName}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function renderAll() {
  renderLibrary();
  renderBlendSidebar();
  renderInlineShelf();
  if (state.view === "blend") renderBlendView();
  if (state.view === "recipes") renderPairingSuggestions();
  if (state.view === "moodlab") renderMoodlab();
}

// ============ GUIDED NAVIGATION & TOUR ============
const TAB_HELP = {
  library: {
    icon: "\u25C9", title: "Oil Library — the scent garden",
    desc: "Browse all 158 oils. Filter by True EO vs. Fragrance, note, or category. Tap any card to flip it or view details.",
    next: "Start here: <strong>add 2–4 oils</strong> to begin your blend."
  },
  blend: {
    icon: "\u2261", title: "Blend Analyzer — where it comes together",
    desc: "See note balance, safety assessments, therapeutic actions, and chemical composition.",
    next: "Adjust drop counts in the sidebar to watch balance update live."
  },
  terpenes: {
    icon: "\u2735", title: "Terpenes — the science beneath the scent",
    desc: "Reference library of chemical constituents inside essential oils.",
    next: "Click any terpene to expand actions and cautions."
  },
  recipes: {
    icon: "\u2726", title: "Curated Moods — the blend library",
    desc: "Load curated recipes or view real-time pairing recommendations.",
    next: "Load a blend to fine-tune in the Analyzer."
  },
  moodlab: {
    icon: "\u2661", title: "Moodlab — capture your mood",
    desc: "Generate and download a shareable mood card with an affirmation.",
    next: "Pick a mood and click <strong>Preview Card</strong>."
  }
};

const helpEl = document.getElementById("tab-help");
let tabHelpDismissed = false;
function renderTabHelp(v) {
  const h = TAB_HELP[v];
  if (!h || tabHelpDismissed) { helpEl.classList.add("hidden"); return; }
  helpEl.classList.remove("hidden");
  document.getElementById("tab-help-icon").innerHTML = '<svg viewBox="0 0 100 100" style="width:28px;height:28px;display:block;"><use href="#vb-butterfly"/></svg>';
  document.getElementById("tab-help-title").textContent = h.title;
  document.getElementById("tab-help-desc").textContent = h.desc;
  document.getElementById("tab-help-next").innerHTML = "Next: " + h.next;
}
document.getElementById("tab-help-dismiss").addEventListener("click", () => {
  tabHelpDismissed = true; helpEl.classList.add("hidden");
});

const __setView = setView;
setView = function(v) {
  __setView(v);
  renderTabHelp(v);
};

const GUIDE_STEPS = [
  { key:"mood", view:"library", title:"Set the Mood", desc:"Welcome to Vibez & Butterflyz.", does:"This Library is your scent garden.", next:"Pick oils to start." },
  { key:"choose", view:"library", title:"Choose Oils", desc:"Tap cards to flip or add oils.", does:"Filters narrow your choices.", next:"Add 2-4 oils." },
  { key:"tune", view:"blend", title:"Tune the Blend", desc:"Adjust drop counts in the sidebar.", does:"Chemical composition recalculates live.", next:"Check note balance." },
  { key:"safety", view:"blend", title:"Read Safety + Balance", desc:"Note balance bars show top/mid/base ratio.", does:"Safety flags phototoxicity.", next:"Explore lounge pairings." },
  { key:"lounge", view:"blend", title:"Explore Lounge Pairings", desc:"Lounge Experience pairs drinks and food.", does:"Pairings adapt to scent.", next:"Save your card." },
  { key:"moodlab", view:"moodlab", title:"Save Moodlab Card", desc:"Turn blend into a shareable image.", does:"Generates downloadable PNG.", next:"Check terpenes." },
  { key:"terpenes", view:"terpenes", title:"Advanced — Terpenes", desc:"Deep dive constituent reference.", does:"Explore biochemistry.", next:"Tour finished!" }
];

const guideState = { active:false, i:0, minimized:false, mode:"onboarding" };
const guideEl = document.getElementById("guide");
const guideTrack = document.getElementById("guide-track");
const guidePillBtn = document.getElementById("guide-pill-btn");
const guidePillLabel = document.getElementById("guide-pill-label");

function activeGuideSteps() { return guideState.mode === "tour" ? TOUR_STEPS : GUIDE_STEPS; }

function renderGuideTrack() {
  const steps = activeGuideSteps();
  guideTrack.innerHTML = steps.map((s,idx) => {
    let cls = "dot";
    if (idx < guideState.i) cls += " done";
    if (idx === guideState.i) cls += " current";
    return `<span class="${cls}"></span>`;
  }).join("");
}

function renderGuideStep() {
  const steps = activeGuideSteps();
  const s = steps[guideState.i];
  if (s.view !== state.view) __setView(s.view);
  document.getElementById("guide-step-title").textContent = s.title;
  document.getElementById("guide-desc").textContent = s.desc;
  document.getElementById("guide-does").innerHTML = s.does || "";
  document.getElementById("guide-does").style.display = s.does ? "" : "none";
  document.getElementById("guide-next").innerHTML = s.next ? ("\u2192 " + s.next) : "";
  document.getElementById("guide-next").style.display = s.next ? "" : "none";
  document.getElementById("guide-count").textContent = `Step ${guideState.i+1} of ${steps.length}`;
  document.getElementById("guide-rail-progress").style.width = ((guideState.i+1)/steps.length*100) + "%";
  document.getElementById("guide-prev").style.visibility = guideState.i === 0 ? "hidden" : "visible";
  document.getElementById("guide-nextbtn").textContent = guideState.i === steps.length-1 ? "Finish" : "Next";
  document.getElementById("guide-kicker").textContent = guideState.mode === "tour" ? "Site Tour" : "Guided Session";
  renderGuideTrack();
  renderTabHelp(state.view);
  guidePillLabel.textContent = `${guideState.mode === "tour" ? "Tour" : "Guide"} · ${guideState.i+1}/${steps.length}`;
}

function openGuide(opts = {}) {
  guideState.active = true; guideState.i = opts.startAt || 0;
  guideState.mode = opts.mode || "onboarding"; guideState.minimized = false;
  tabHelpDismissed = false; guideEl.classList.remove("hidden", "minimized");
  if (typeof resetGuidePosition === "function") resetGuidePosition();
  renderGuideStep();
}

function closeGuide() { guideState.active = false; guideState.minimized = false; guideEl.classList.add("hidden"); guideEl.classList.remove("minimized"); }
function minimizeGuide() { guideState.minimized = true; guideEl.classList.add("minimized"); }
function restoreGuide() { guideState.minimized = false; guideEl.classList.remove("minimized"); }
function guideNext() { if (guideState.i < activeGuideSteps().length-1) { guideState.i++; renderGuideStep(); } else closeGuide(); }
function guidePrev() { if (guideState.i > 0) { guideState.i--; renderGuideStep(); } }

document.getElementById("walk-me-through").addEventListener("click", () => openGuide());
document.getElementById("open-guide-inline").addEventListener("click", () => openGuide());
document.getElementById("guide-close").addEventListener("click", closeGuide);
document.getElementById("guide-min").addEventListener("click", minimizeGuide);
guidePillBtn.addEventListener("click", restoreGuide);

const guidePanelEl = guideEl.querySelector(".guide-panel");
const guideDrag = { active: false, startX: 0, startY: 0, baseX: 0, baseY: 0, x: 0, y: 0 };
function resetGuidePosition() { guideDrag.x = guideDrag.y = 0; guidePanelEl.style.transform = ""; }

guideEl.querySelector(".guide-head").addEventListener("pointerdown", e => {
  if (e.target.closest("button")) return;
  guideDrag.active = true; guideDrag.startX = e.clientX; guideDrag.startY = e.clientY;
  guideDrag.baseX = guideDrag.x; guideDrag.baseY = guideDrag.y;
  guidePanelEl.classList.add("dragging");
  e.currentTarget.setPointerCapture(e.pointerId);
});

guideEl.querySelector(".guide-head").addEventListener("pointermove", e => {
  if (!guideDrag.active) return;
  const maxX = Math.max(0, innerWidth / 2 - 90);
  const panelH = guidePanelEl.offsetHeight;
  guideDrag.x = Math.min(maxX, Math.max(-maxX, guideDrag.baseX + (e.clientX - guideDrag.startX)));
  guideDrag.y = Math.min(24, Math.max(-(innerHeight - panelH - 60), guideDrag.baseY + (e.clientY - guideDrag.startY)));
  guidePanelEl.style.transform = `translate(${guideDrag.x}px, ${guideDrag.y}px)`;
});

["pointerup", "pointercancel"].forEach(ev => {
  guideEl.querySelector(".guide-head").addEventListener(ev, () => {
    guideDrag.active = false; guidePanelEl.classList.remove("dragging");
  });
});

document.getElementById("guide-explore").addEventListener("click", closeGuide);
document.getElementById("guide-nextbtn").addEventListener("click", guideNext);
document.getElementById("guide-prev").addEventListener("click", guidePrev);
document.addEventListener("keydown", e => {
  if (!guideState.active) return;
  if (e.key === "Escape") closeGuide();
  else if (e.key === "ArrowRight") guideNext();
  else if (e.key === "ArrowLeft") guidePrev();
});

renderTabHelp("library");

// ============ ONBOARDING & TOUR ============
const ONBOARDING_MOODS = [
  { key: "calm-peace", label: "Calm & Peace" },
  { key: "motivation-drive", label: "Motivation & Drive" },
  { key: "renewal-rejuvenation", label: "Renewal & Rejuvenation" },
  { key: "reenergize-reignite", label: "Reenergize & Reignite" },
  { key: "relaxation-rest", label: "Relaxation & Rest" },
  { key: "self-love-being-loved", label: "Self-Love & Being Loved" },
  { key: "confidence-power", label: "Confidence & Power" },
  { key: "protection-strength", label: "Protection & Strength" },
  { key: "joy-uplift", label: "Joy & Uplift" },
  { key: "clarity-focus", label: "Clarity & Focus" }
];

const onboardingEl = document.getElementById("onboarding");

function showOnboardingStep(step) {
  document.getElementById("onboarding-step-welcome").classList.toggle("hidden", step !== "welcome");
  document.getElementById("onboarding-step-quiz").classList.toggle("hidden", step !== "quiz");
}

function renderOnboardingMoodGrid() {
  const grid = document.getElementById("onboarding-mood-grid");
  grid.innerHTML = ONBOARDING_MOODS.map(m => {
    const preset = MOODLAB_MOOD_PRESETS[m.key];
    return `
      <button class="onboarding-mood-tile" data-mood="${m.key}" type="button">
        <svg class="onboarding-mood-emblem" viewBox="0 0 100 100" aria-hidden="true"><use href="#vb-butterfly"/></svg>
        <span class="onboarding-mood-label">${m.label}</span>
        <span class="onboarding-mood-tag">${preset ? preset.tagline : ""}</span>
      </button>`;
  }).join("");
  grid.querySelectorAll(".onboarding-mood-tile").forEach(btn => {
    btn.addEventListener("click", () => selectOnboardingMood(btn.dataset.mood));
  });
}

function applySessionMoodEffects(moodKey) {
  state.mood = moodKey;
  localStorage.setItem("vb_session_mood", moodKey);
  const preset = MOODLAB_MOOD_PRESETS[moodKey];
  if (preset) {
    preset.oils.slice(0, 2).forEach(name => {
      const oil = OILS.find(o => o.name === name);
      if (oil) addToBlend(oil.id, 2);
    });
  }
  const themeSel = document.getElementById("moodlab-theme");
  if (themeSel) themeSel.value = moodKey;
}

function startOnboarding() {
  onboardingEl.classList.remove("hidden");
  showOnboardingStep("Sorry, something went wrong. Please try your request again.