/* ============================================================
   APP.JS — Vibez & Butterflyz Sensory & Mood Studio
   Wires OILS (oils.js), TERPENES (terpenes.js), and MOODS /
   PRESETS / MOOD_BLEND_LIBRARY / LOUNGE_MAP / GUIDE_STEPS
   (mood_blends.js) into the markup in index.html.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- STATE ---------- */
  let blend = [];              // [{ id, drops }]
  let layout = "grid";
  let filters = { type: [], note: [], phototoxic: false, category: "" };
  let searchTerm = "";
  let expandedTerpene = null;
  let moodblendShown = 12;
  let moodblendCat = "";
  let sessionMood = null;
  let guideIndex = 0;
  let guideOpen = false;

  const DROPS_PER_ML = 20;
  const USE_CASE_LIMITS = { diffusion: null, "topical-body": 2, "topical-face": 1, "topical-sensitive": 0.5, perfume: 15 };
  const STRENGTH_WEIGHT = { strong: 3, moderate: 2, weak: 1 };
  const NOTE_CLASS = { Top: "top", Middle: "mid", Base: "base" };

  const THEME_COLORS = {
    "calm-peace": ["#2A3D5A", "#5A4876"],
    "motivation-drive": ["#1E3A2E", "#7A5A28"],
    "renewal-rejuvenation": ["#1E3A2E", "#5A4876"],
    "reenergize-reignite": ["#7A5A28", "#7A2E2E"],
    "relaxation-rest": ["#1A2A40", "#40304E"],
    "self-love-being-loved": ["#5A2840", "#5A3860"],
    "confidence-power": ["#2A1E40", "#1E3A2E"],
    "protection-strength": ["#1E3A2E", "#2A1E40"],
    "joy-uplift": ["#5A4010", "#7A5A28"],
    "clarity-focus": ["#1A2238", "#3A2E5A"]
  };

  const TAB_HELP = {
    "view-library": { icon: "🦋", title: "Oil Library", desc: "Search or filter, then tap a card's Details pill to flip it and see safety notes.", next: "Add oils to start a blend." },
    "view-blend": { icon: "🧪", title: "Blend Analyzer", desc: "Note balance, safety, therapeutic actions, and a full recipe for your active blend.", next: "Add oils from the Library if this looks empty." },
    "view-terpenes": { icon: "🌿", title: "Terpenes", desc: "Tap any terpene to expand its actions, cautions, and source oils.", next: "" },
    "view-recipes": { icon: "🍸", title: "Curated Moods", desc: "Ready-made blends by mood. Tap one to load it into your active blend.", next: "" },
    "view-moodlab": { icon: "🎨", title: "Moodlab", desc: "Turn your blend into a shareable, downloadable mood card.", next: "" }
  };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const byId = (id) => OILS.find((o) => o.id === id);
  const terpeneByName = (name) => TERPENES.find((t) => t.name === name);

  /* ---------- GOLD DUST ---------- */
  function spawnDust(targetEl, count) {
    const overlay = $("#dust-overlay");
    if (!overlay || !targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const n = count || 14;
    for (let i = 0; i < n; i++) {
      const dot = document.createElement("i");
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 80;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 30;
      const size = 3 + Math.random() * 4;
      const dur = 0.6 + Math.random() * 0.6;
      dot.style.setProperty("--s", size.toFixed(1) + "px");
      dot.style.setProperty("--d", dur.toFixed(2) + "s");
      dot.style.setProperty("--dx", dx.toFixed(1) + "px");
      dot.style.setProperty("--dy", dy.toFixed(1) + "px");
      dot.style.setProperty("--sc", (0.4 + Math.random() * 0.8).toFixed(2));
      dot.style.left = originX + "px";
      dot.style.top = originY + "px";
      overlay.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove());
      setTimeout(() => dot.remove(), 2000);
    }
  }

  /* ---------- FILTERING ---------- */
  function filteredOils() {
    let list = OILS.slice();
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          (o.latin || "").toLowerCase().includes(q) ||
          (o.aroma || []).some((a) => a.toLowerCase().includes(q))
      );
    }
    if (filters.type.length) list = list.filter((o) => filters.type.includes(o.type));
    if (filters.note.length) list = list.filter((o) => filters.note.includes(o.note));
    if (filters.phototoxic) list = list.filter((o) => !o.phototoxic);
    if (filters.category) list = list.filter((o) => o.category === filters.category);
    list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }

  function populateCategoryFilter() {
    const sel = $("#category-filter");
    const cats = [...new Set(OILS.map((o) => o.category))].sort();
    cats.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      sel.appendChild(opt);
    });
  }

  function updateFilterBanner() {
    const banner = $("#filter-banner");
    const active = [];
    if (searchTerm) active.push('Search "' + searchTerm + '"');
    if (filters.type.length) active.push(filters.type.join(" + "));
    if (filters.note.length) active.push(filters.note.join(" + "));
    if (filters.phototoxic) active.push("Non-phototoxic only");
    if (filters.category) active.push(filters.category);
    if (!active.length) {
      banner.classList.add("hidden");
      banner.innerHTML = "";
      return;
    }
    banner.classList.remove("hidden");
    banner.innerHTML =
      "<span>Filtering: " + active.join(" · ") + "</span><button type=\"button\" id=\"clear-filters\">Clear</button>";
    $("#clear-filters").addEventListener("click", clearFilters);
  }

  function clearFilters() {
    filters = { type: [], note: [], phototoxic: false, category: "" };
    searchTerm = "";
    $("#search").value = "";
    $$('input[data-filter]').forEach((i) => (i.checked = false));
    $("#category-filter").value = "";
    renderLibrary();
  }

  /* ---------- BUTTERFLY CARDS ---------- */
  function cardHTML(oil) {
    const inBlend = blend.some((b) => b.id === oil.id);
    const noteClass = NOTE_CLASS[oil.note] || "top";
    const tags =
      '<span class="tag note-' + noteClass + '">' + oil.note + "</span>" +
      (oil.type === "fragrance" ? '<span class="tag type-fragrance">Fragrance</span>' : "") +
      (oil.phototoxic ? '<span class="tag phototox">Phototoxic</span>' : "");
    const cautionsLine = oil.cautions && oil.cautions.length
      ? '<div class="bfly-back-line' + (oil.phototoxic ? " danger" : "") + '"><strong>Caution:</strong> ' + oil.cautions[0] + "</div>"
      : "";
    return (
      '<div class="butterfly-card' + (inBlend ? " in-blend" : "") + '" data-id="' + oil.id + '" data-note="' + oil.note + '" tabindex="0">' +
      '<div class="butterfly-card-inner">' +
        '<div class="butterfly-card-face butterfly-card-front">' +
          '<svg class="bfly-emblem" viewBox="0 0 100 100" aria-hidden="true"><use href="#vb-butterfly"/></svg>' +
          '<div class="bfly-content">' +
            '<div class="bfly-name">' + oil.name + "</div>" +
            '<div class="bfly-latin">' + (oil.latin || "") + "</div>" +
            '<div class="bfly-meta">' + tags + "</div>" +
            '<div class="bfly-aroma">' + (oil.aroma || []).join(", ") + "</div>" +
          "</div>" +
          '<div class="bfly-actions">' +
            '<button type="button" class="bfly-pill bfly-add' + (inBlend ? " is-added" : "") + '" data-action="add" data-id="' + oil.id + '">' + (inBlend ? "✓ In Blend" : "+ Add") + "</button>" +
            '<button type="button" class="bfly-pill bfly-details" data-action="flip" data-id="' + oil.id + '">Details</button>' +
          "</div>" +
        "</div>" +
        '<div class="butterfly-card-face butterfly-card-back">' +
          '<svg class="bfly-emblem" viewBox="0 0 100 100" aria-hidden="true"><use href="#vb-butterfly"/></svg>' +
          '<div class="bfly-back-title">' + oil.name + "</div>" +
          '<div class="bfly-back-line"><strong>Pregnancy:</strong> ' + (oil.pregnancy || "Unknown") + "</div>" +
          '<div class="bfly-back-line' + (oil.phototoxic ? " danger" : "") + '"><strong>Photo:</strong> ' + (oil.phototox_note || "N/A") + "</div>" +
          cautionsLine +
          '<div class="bfly-back-line"><strong>Uses:</strong> ' + (oil.uses || []).join(", ") + "</div>" +
          '<div class="bfly-actions">' +
            '<button type="button" class="bfly-pill bfly-add' + (inBlend ? " is-added" : "") + '" data-action="add" data-id="' + oil.id + '">' + (inBlend ? "✓ In Blend" : "+ Add") + "</button>" +
            '<button type="button" class="bfly-pill bfly-details" data-action="flip" data-id="' + oil.id + '">Back</button>' +
          "</div>" +
        "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderLibrary() {
    updateFilterBanner();
    const list = filteredOils();
    const grid = $("#oil-grid");
    grid.className = "oil-grid layout-" + layout;
    grid.innerHTML = "";

    if (!list.length) {
      grid.innerHTML = '<div class="empty">No oils match these filters.</div>';
    } else if (layout === "carousel") {
      ["Top", "Middle", "Base"].forEach((note) => {
        const group = list.filter((o) => o.note === note);
        if (!group.length) return;
        const wrap = document.createElement("div");
        wrap.className = "carousel-lane";
        wrap.innerHTML =
          '<div class="lane-label ' + NOTE_CLASS[note] + '">' + note + " Notes</div>" +
          '<div class="lane-scroll"></div>';
        const scroll = wrap.querySelector(".lane-scroll");
        group.forEach((o) => (scroll.innerHTML += cardHTML(o)));
        grid.appendChild(wrap);
      });
      observeLanes();
    } else {
      list.forEach((o) => (grid.innerHTML += cardHTML(o)));
    }
    updateStats(list);
  }

  function observeLanes() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle("bfly-in-view", e.isIntersecting));
      },
      { threshold: 0.6 }
    );
    $$(".lane-scroll .butterfly-card").forEach((c) => io.observe(c));
  }

  function updateStats(list) {
    $("#stat-total").textContent = list.length;
    $("#stat-eo").textContent = list.filter((o) => o.type === "essential").length;
    $("#stat-photo").textContent = list.filter((o) => o.phototoxic).length;
    $("#stat-blend").textContent = blend.length;
  }

  /* ---------- BLEND MANAGEMENT ----------
     IMPORTANT: these do NOT call renderLibrary(). Rebuilding the whole
     #oil-grid on every add/remove destroys and recreates every card,
     which silently resets any card a person had mid-flip back to its
     front face. syncLibraryBlendState() updates only the in-blend
     class and button label on the existing DOM nodes, so a flipped
     card stays flipped while other oils are added or removed. */
  function addToBlend(id, sourceEl) {
    if (blend.some((b) => b.id === id)) return;
    blend.push({ id, drops: 2 });
    if (sourceEl) spawnDust(sourceEl, 8);
    refreshAfterBlendChange();
  }

  function removeFromBlend(id) {
    blend = blend.filter((b) => b.id !== id);
    refreshAfterBlendChange();
  }

  function changeDrops(id, delta) {
    const item = blend.find((b) => b.id === id);
    if (!item) return;
    item.drops = Math.max(1, Math.min(20, item.drops + delta));
    refreshAfterBlendChange();
  }

  function clearBlend() {
    blend = [];
    refreshAfterBlendChange();
  }

  function syncLibraryBlendState() {
    $$(".butterfly-card[data-id]").forEach((card) => {
      const id = card.dataset.id;
      const inBlend = blend.some((b) => b.id === id);
      card.classList.toggle("in-blend", inBlend);
      $$(".bfly-add", card).forEach((btn) => {
        btn.classList.toggle("is-added", inBlend);
        btn.textContent = inBlend ? "✓ In Blend" : "+ Add";
      });
    });
    $("#stat-blend").textContent = blend.length;
  }

  function refreshAfterBlendChange() {
    renderBlendList();
    syncLibraryBlendState();
    renderInlineShelf();
    if (!$("#view-blend").classList.contains("hidden")) renderBlendAnalyzer();
    if (!$("#view-recipes").classList.contains("hidden")) renderPairingSuggestions();
  }

  function renderBlendList() {
    const wrap = $("#blend-list");
    if (!blend.length) {
      wrap.innerHTML = "";
      return;
    }
    wrap.innerHTML = blend
      .map((b) => {
        const oil = byId(b.id);
        if (!oil) return "";
        return (
          '<div class="blend-item" data-id="' + oil.id + '">' +
          '<div><div class="blend-item-name">' + oil.name + "</div>" +
          '<div class="blend-item-note">' + oil.note + "</div></div>" +
          '<div class="blend-drops">' +
          '<button type="button" data-action="dec" data-id="' + oil.id + '">−</button>' +
          '<span class="blend-drop-count">' + b.drops + "</span>" +
          '<button type="button" data-action="inc" data-id="' + oil.id + '">+</button>' +
          '<button type="button" class="blend-remove" data-action="remove" data-id="' + oil.id + '">×</button>' +
          "</div></div>"
        );
      })
      .join("");
  }

  /* ---------- PAIRING SHELF (Library tab) ---------- */
  function renderInlineShelf() {
    const shelf = $("#inline-shelf");
    if (!blend.length) {
      shelf.style.display = "none";
      return;
    }
    shelf.style.display = "";
    const byNote = { Top: {}, Middle: {}, Base: {} };
    const blendNames = new Set(blend.map((b) => byId(b.id) && byId(b.id).name));
    blend.forEach((b) => {
      const oil = byId(b.id);
      if (!oil) return;
      (oil.pairs_with || []).forEach((pn) => {
        if (blendNames.has(pn)) return;
        const target = OILS.find((o) => o.name === pn);
        if (!target) return;
        const bucket = byNote[target.note] || byNote.Top;
        bucket[target.id] = (bucket[target.id] || 0) + 1;
      });
    });
    ["Top", "Middle", "Base"].forEach((note) => {
      const el = $("#shelf-" + NOTE_CLASS[note]);
      const entries = Object.entries(byNote[note]).sort((a, b) => b[1] - a[1]).slice(0, 4);
      if (!entries.length) {
        el.innerHTML = '<div class="shelf-empty">No suggestions yet.</div>';
        return;
      }
      el.innerHTML = entries
        .map(([id, score]) => {
          const o = byId(id);
          return (
            '<button type="button" class="shelf-btn" data-action="add" data-id="' + id + '">' +
            o.name + '<span class="shelf-score">×' + score + "</span></button>"
          );
        })
        .join("");
    });
    const carrierEl = $("#shelf-carrier");
    const hasBase = blend.some((b) => byId(b.id) && byId(b.id).note === "Base");
    carrierEl.innerHTML = hasBase
      ? '<div class="shelf-carrier-rec">Jojoba or fractionated coconut oil carries this blend well without dulling the base notes.</div>'
      : '<div class="shelf-carrier-rec">Sweet almond or grapeseed oil keeps this blend light and fast-absorbing.</div>';
  }

  /* ---------- TABS ---------- */
  function switchTab(tabId) {
    const map = {
      "tab-library": "view-library",
      "tab-blend": "view-blend",
      "tab-terpenes": "view-terpenes",
      "tab-recipes": "view-recipes",
      "tab-moodlab": "view-moodlab"
    };
    $$(".tab").forEach((t) => t.classList.toggle("active", t.id === tabId));
    Object.values(map).forEach((v) => $("#" + v).classList.add("hidden"));
    $("#" + map[tabId]).classList.remove("hidden");
    const help = TAB_HELP[map[tabId]];
    if (help) {
      $("#tab-help-icon").textContent = help.icon;
      $("#tab-help-title").textContent = help.title;
      $("#tab-help-desc").textContent = help.desc;
      $("#tab-help-next").textContent = help.next;
      $("#tab-help").classList.remove("hidden");
    }
    if (tabId === "tab-blend") renderBlendAnalyzer();
    if (tabId === "tab-terpenes") renderTerpenes();
    if (tabId === "tab-recipes") { renderPresetGrid(); renderMoodblendGrid(); renderPairingSuggestions(); }
    if (tabId === "tab-moodlab") populateMoodlabSuggested();
  }

  /* ---------- BLEND ANALYZER ---------- */
  function renderBlendAnalyzer() {
    renderNoteBalance();
    renderSafetyReport();
    renderLoungeMatrix();
    renderBlendActions();
    renderChemComposition();
    renderRecipe();
  }

  function renderNoteBalance() {
    const wrap = $("#note-balance");
    const advice = $("#note-advice");
    if (!blend.length) {
      wrap.innerHTML = '<div class="empty">Add oils to see note balance.</div>';
      advice.textContent = "";
      return;
    }
    const totals = { Top: 0, Middle: 0, Base: 0 };
    let total = 0;
    blend.forEach((b) => {
      const oil = byId(b.id);
      if (!oil) return;
      totals[oil.note] += b.drops;
      total += b.drops;
    });
    wrap.innerHTML = ["Top", "Middle", "Base"]
      .map((n) => {
        const pct = total ? Math.round((totals[n] / total) * 100) : 0;
        return (
          '<div class="note-bar"><span class="note-bar-label">' + n + '</span>' +
          '<div class="note-bar-track"><div class="note-bar-fill ' + NOTE_CLASS[n] + '" style="width:' + pct + '%"></div></div>' +
          '<span class="note-bar-pct">' + pct + "%</span></div>"
        );
      })
      .join("");
    const topPct = total ? totals.Top / total : 0;
    const basePct = total ? totals.Base / total : 0;
    if (topPct > 0.7) {
      advice.className = "advice warn";
      advice.textContent = "Heavy on top notes — this blend will fade fast. Add a base note to anchor it.";
    } else if (basePct > 0.7) {
      advice.className = "advice warn";
      advice.textContent = "Heavy on base notes — this blend may feel dense. A top note will brighten it.";
    } else {
      advice.className = "advice";
      advice.textContent = "Well-balanced across notes.";
    }
  }

  function renderSafetyReport() {
    const wrap = $("#safety-report");
    if (!blend.length) {
      wrap.innerHTML = '<div class="empty">Add oils to see a safety assessment.</div>';
      return;
    }
    const rows = [];
    blend.forEach((b) => {
      const oil = byId(b.id);
      if (!oil) return;
      if (oil.phototoxic) {
        rows.push({ icon: "⚠", cls: "warn", title: oil.name + " — phototoxic", detail: oil.phototox_note });
      }
      (oil.cautions || []).forEach((c) => rows.push({ icon: "!", cls: "warn", title: oil.name, detail: c }));
      if (oil.pregnancy && oil.pregnancy !== "Generally safe") {
        rows.push({ icon: "✕", cls: "danger", title: oil.name + " — pregnancy caution", detail: oil.pregnancy });
      }
    });
    if (!rows.length) {
      wrap.innerHTML = '<div class="safety-row"><span class="safety-icon ok">✓</span><div><div class="safety-title">No flags on this blend</div><div class="safety-detail">Standard dilution guidance still applies.</div></div></div>';
      return;
    }
    wrap.innerHTML = rows
      .map(
        (r) =>
          '<div class="safety-row"><span class="safety-icon ' + r.cls + '">' + r.icon + '</span>' +
          '<div><div class="safety-title">' + r.title + '</div><div class="safety-detail">' + r.detail + "</div></div></div>"
      )
      .join("");
  }

  function inferSessionMood() {
    if (sessionMood) return sessionMood;
    if (!blend.length) return null;
    // rough inference: majority note determines a mood bucket
    const counts = { Top: 0, Middle: 0, Base: 0 };
    blend.forEach((b) => { const o = byId(b.id); if (o) counts[o.note] += b.drops; });
    if (counts.Top >= counts.Middle && counts.Top >= counts.Base) return "joy-uplift";
    if (counts.Base >= counts.Middle) return "relaxation-rest";
    return "clarity-focus";
  }

  function renderLoungeMatrix() {
    const mood = inferSessionMood() || "calm-peace";
    const m = LOUNGE_MAP[mood] || LOUNGE_MAP["calm-peace"];
    $("#lounge-wine-name").textContent = m.wine.name;
    $("#lounge-wine-desc").textContent = m.wine.desc;
    $("#lounge-cocktail-name").textContent = m.cocktail.name;
    $("#lounge-cocktail-desc").textContent = m.cocktail.desc;
    $("#lounge-mocktail-name").textContent = m.mocktail.name;
    $("#lounge-mocktail-desc").textContent = m.mocktail.desc;
    $("#lounge-food-name").textContent = m.food.name;
    $("#lounge-food-desc").textContent = m.food.desc;
  }

  function renderBlendActions() {
    const wrap = $("#blend-actions");
    if (!blend.length) {
      wrap.innerHTML = '<div class="empty">Add oils to see therapeutic actions.</div>';
      return;
    }
    const scores = {};
    blend.forEach((b) => {
      const oil = byId(b.id);
      if (!oil) return;
      (oil.constituents || []).forEach((c) => {
        const terp = terpeneByName(c.c);
        if (!terp) return;
        (terp.actions || []).forEach((a) => {
          const weight = (c.pct / 100) * b.drops * (STRENGTH_WEIGHT[a.strength] || 1);
          if (!scores[a.effect]) scores[a.effect] = { score: 0, contributors: new Set(), strength: a.strength };
          scores[a.effect].score += weight;
          scores[a.effect].contributors.add(oil.name);
          if (STRENGTH_WEIGHT[a.strength] > STRENGTH_WEIGHT[scores[a.effect].strength]) scores[a.effect].strength = a.strength;
        });
      });
    });
    const entries = Object.entries(scores).sort((a, b) => b[1].score - a[1].score).slice(0, 8);
    if (!entries.length) {
      wrap.innerHTML = '<div class="empty">No matched terpene actions for this blend yet.</div>';
      return;
    }
    const max = entries[0][1].score;
    wrap.innerHTML = entries
      .map(([effect, d]) => {
        const pct = Math.round((d.score / max) * 100);
        return (
          '<div class="action-row"><div><div class="action-name">' + effect + '</div>' +
          '<div class="action-contributors">' + Array.from(d.contributors).join(", ") + '</div></div>' +
          '<div class="action-bar-track"><div class="action-bar-fill" style="width:' + pct + '%"></div></div>' +
          '<span class="strength-pill strength-' + d.strength + '">' + d.strength + "</span></div>"
        );
      })
      .join("");
  }

  function renderChemComposition() {
    const wrap = $("#chem-composition");
    if (!blend.length) {
      wrap.innerHTML = '<div class="empty">Add oils to see chemical composition.</div>';
      return;
    }
    const familyTotals = {};
    let html = "";
    blend.forEach((b) => {
      const oil = byId(b.id);
      if (!oil) return;
      const cons = (oil.constituents || []).slice().sort((a, c) => c.pct - a.pct).slice(0, 6);
      if (!cons.length) {
        html += '<div class="chem-oil"><div class="chem-oil-name">' + oil.name + '</div><div class="muted" style="margin:0;">No published constituent breakdown (fragrance blend).</div></div>';
        return;
      }
      html +=
        '<div class="chem-oil"><div class="chem-oil-name">' + oil.name + '</div><div class="chem-bars">' +
        cons
          .map(
            (c) =>
              '<div class="chem-bar"><span class="chem-bar-name">' + c.c + '</span>' +
              '<div class="chem-bar-track"><div class="chem-bar-fill" style="width:' + Math.min(100, c.pct) + '%"></div></div>' +
              '<span class="chem-bar-pct">' + c.pct + "%</span></div>"
          )
          .join("") +
        "</div></div>";
      (oil.constituents || []).forEach((c) => {
        const terp = terpeneByName(c.c);
        const fam = terp ? terp.family : "Other constituents";
        familyTotals[fam] = (familyTotals[fam] || 0) + (c.pct / 100) * b.drops;
      });
    });
    const famEntries = Object.entries(familyTotals).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const famTotal = famEntries.reduce((s, [, v]) => s + v, 0) || 1;
    html +=
      '<div class="chem-family">' +
      famEntries
        .map(
          ([fam, v]) =>
            '<div class="chem-family-item"><div class="chem-family-item-name">' + fam + '</div>' +
            '<div class="chem-family-item-pct">' + Math.round((v / famTotal) * 100) + "%</div></div>"
        )
        .join("") +
      "</div>";
    wrap.innerHTML = html;
  }

  function renderRecipe() {
    const wrap = $("#recipe-output");
    if (!blend.length) {
      wrap.innerHTML = '<div class="empty">Add oils to build a recipe.</div>';
      return;
    }
    const volumeMl = parseFloat($("#total-volume").value);
    const useCase = $("#use-case").value;
    const limitPct = USE_CASE_LIMITS[useCase];
    const totalEnteredDrops = blend.reduce((s, b) => s + b.drops, 0);

    let scaled = blend.map((b) => ({ ...b }));
    let maxDrops = totalEnteredDrops;
    let note = "";
    if (limitPct !== null) {
      maxDrops = Math.max(1, Math.round((limitPct / 100) * volumeMl * DROPS_PER_ML));
      scaled = blend.map((b) => ({ id: b.id, drops: Math.max(1, Math.round((b.drops / totalEnteredDrops) * maxDrops)) }));
    } else {
      note = "Diffusion has no dilution ceiling — drop counts below are as entered in your blend.";
    }

    let html = "";
    let dangerFlag = false;
    scaled.forEach((s) => {
      const oil = byId(s.id);
      if (!oil) return;
      const pct = Math.round((s.drops / (scaled.reduce((sum, x) => sum + x.drops, 0) || 1)) * 100);
      if (limitPct !== null && oil.max_dermal && limitPct > oil.max_dermal) dangerFlag = true;
      html +=
        '<div class="recipe-line"><span class="recipe-line-name">' + oil.name +
        '<span class="recipe-line-note-tag">' + oil.note + "</span></span>" +
        '<span class="recipe-line-drops">' + s.drops + " drops</span>" +
        '<span class="recipe-line-pct">' + pct + "%</span></div>";
    });
    const finalTotal = scaled.reduce((s, x) => s + x.drops, 0);
    html += '<div class="recipe-total"><span>Total</span><span>' + finalTotal + " drops</span></div>";
    if (limitPct !== null) {
      const carrierMl = Math.max(0, volumeMl - finalTotal * 0.05).toFixed(1);
      html += '<div class="recipe-carrier">Top the rest with ~' + carrierMl + "ml carrier oil to fill your " + volumeMl + "ml bottle at a " + limitPct + "% dilution.</div>";
    } else if (note) {
      html += '<div class="recipe-carrier">' + note + "</div>";
    }
    if (dangerFlag) {
      html += '<div class="danger-banner">One or more oils in this blend exceed the safe dermal limit for this use case. Reduce those drops or switch to diffusion.</div>';
    }
    wrap.innerHTML = html;
  }

  /* ---------- TERPENES ---------- */
  function renderTerpenes() {
    const wrap = $("#terpene-list");
    wrap.innerHTML = TERPENES.map((t) => {
      const expanded = expandedTerpene === t.name;
      const foundIn = (t.found_in || []).join(", ");
      return (
        '<div class="terpene-card' + (expanded ? " expanded" : "") + '" data-name="' + t.name + '">' +
        '<div class="terpene-head"><span class="terpene-name">' + t.name + '</span><span class="terpene-family">' + t.family + "</span></div>" +
        '<div class="terpene-aroma">' + t.aroma + "</div>" +
        (expanded
          ? '<div class="terpene-detail">' +
            (t.actions || [])
              .map(
                (a) =>
                  '<div class="terpene-action"><div class="terpene-action-head"><span class="terpene-action-name">' + a.effect + '</span>' +
                  '<span class="strength-pill strength-' + a.strength + '">' + a.strength + "</span></div>" +
                  '<div class="terpene-action-detail">' + (a.detail || "") + "</div></div>"
              )
              .join("") +
            (t.warnings ? '<div class="terpene-warning">' + t.warnings + "</div>" : "") +
            '<div class="terpene-found"><div class="terpene-found-label">Found in</div>' + foundIn + "</div>" +
            "</div>"
          : "") +
        "</div>"
      );
    }).join("");
  }

  /* ---------- CURATED MOODS ---------- */
  function renderPresetGrid() {
    const wrap = $("#preset-grid");
    wrap.innerHTML = PRESETS.map(
      (p) =>
        '<div class="preset-card" data-id="' + p.id + '" data-source="preset"><div class="preset-name">' + p.name + '</div>' +
        '<div class="preset-desc">' + p.desc + '</div>' +
        '<div class="preset-oils">' + p.oils.map((o) => (byId(o.id) ? byId(o.id).name : o.id)).join(" · ") + "</div></div>"
    ).join("");
  }

  function renderMoodblendGrid() {
    const cats = $("#moodblend-cats");
    if (!cats.dataset.built) {
      cats.innerHTML = MOODS.map((m) => '<button type="button" class="chip" data-mood="' + m.id + '">' + m.label + "</button>").join("");
      cats.dataset.built = "1";
    }
    $$(".chip[data-mood]", cats).forEach((c) => c.classList.toggle("active-cat", c.dataset.mood === moodblendCat));

    const q = ($("#moodblend-search").value || "").toLowerCase();
    let list = MOOD_BLEND_LIBRARY.filter((b) => {
      const matchesQ = !q || b.name.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q);
      const matchesCat = !moodblendCat || b.mood === moodblendCat;
      return matchesQ && matchesCat;
    });
    const wrap = $("#moodblend-grid");
    const shown = list.slice(0, moodblendShown);
    wrap.innerHTML = shown
      .map(
        (b) =>
          '<div class="preset-card" data-id="' + b.id + '" data-source="moodblend"><div class="preset-name">' + b.name + '</div>' +
          '<div class="preset-desc">' + b.desc + '</div>' +
          '<div class="preset-oils">' + b.oils.map((o) => (byId(o.id) ? byId(o.id).name : o.id)).join(" · ") + "</div></div>"
      )
      .join("");
    $("#moodblend-more").style.display = list.length > moodblendShown ? "" : "none";
  }

  function loadBlendById(id, source) {
    const list = source === "preset" ? PRESETS : MOOD_BLEND_LIBRARY;
    const entry = list.find((b) => b.id === id);
    if (!entry) return;
    blend = entry.oils.filter((o) => byId(o.id)).map((o) => ({ id: o.id, drops: o.drops }));
    renderAll();
    switchTab("tab-blend");
  }

  function renderPairingSuggestions() {
    const wrap = $("#pairing-suggestions");
    if (!blend.length) {
      wrap.innerHTML = '<div class="empty">Add oils to your blend to see pairing suggestions.</div>';
      return;
    }
    const counts = {};
    const inBlend = new Set(blend.map((b) => b.id));
    blend.forEach((b) => {
      const oil = byId(b.id);
      if (!oil) return;
      (oil.pairs_with || []).forEach((pn) => {
        const target = OILS.find((o) => o.name === pn);
        if (!target || inBlend.has(target.id)) return;
        counts[target.id] = (counts[target.id] || 0) + 1;
      });
    });
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 12);
    if (!entries.length) {
      wrap.innerHTML = '<div class="empty">No further pairing matches found.</div>';
      return;
    }
    wrap.innerHTML = entries
      .map(([id, score]) => {
        const o = byId(id);
        return (
          '<div class="pairing-item" data-action="add" data-id="' + id + '"><span>' + o.name + '</span>' +
          '<span class="pairing-score">×' + score + "</span></div>"
        );
      })
      .join("");
  }

  /* ---------- MOODLAB ---------- */
  function populateMoodlabSuggested() {
    const sel = $("#moodlab-suggested");
    if (sel.dataset.built) return;
    sel.innerHTML = MOOD_BLEND_LIBRARY.map((b) => '<option value="' + b.id + '">' + b.name + "</option>").join("");
    sel.dataset.built = "1";
  }

  function generateMoodCard() {
    const title = $("#moodlab-title").value || "Untitled Blend";
    const tagline = $("#moodlab-tagline").value || "";
    const attribution = $("#moodlab-attribution").value || "Diffuser set by @vibezandbutterflyz";
    const theme = $("#moodlab-theme").value;
    const source = $("#moodlab-source").value;

    let oilsUsed = [];
    if (source === "my-blend") {
      oilsUsed = blend.map((b) => byId(b.id)).filter(Boolean);
    } else if (source === "suggested") {
      const entry = MOOD_BLEND_LIBRARY.find((b) => b.id === $("#moodlab-suggested").value);
      if (entry) oilsUsed = entry.oils.map((o) => byId(o.id)).filter(Boolean);
    } else {
      const entry = PRESETS.find((p) => p.mood === theme) || PRESETS[0];
      if (entry) oilsUsed = entry.oils.map((o) => byId(o.id)).filter(Boolean);
    }

    const moodObj = MOODS.find((m) => m.id === theme);
    const affirmation = moodObj ? moodObj.affirmation : "Breathe in. Breathe out.";

    const card = $("#mood-card");
    card.className = "mood-card theme-" + theme;
    $("#mood-card-title").textContent = title;
    $("#mood-card-tagline").textContent = tagline;
    $("#mood-card-affirmation").textContent = affirmation;
    $("#mood-card-attribution").textContent = attribution;
    $("#mood-card-oils").innerHTML = oilsUsed.map((o) => '<span class="mood-card-chip">' + o.name + "</span>").join("");
  }

  function downloadMoodCard() {
    const [c1, c2] = THEME_COLORS[$("#moodlab-theme").value] || ["#1A2238", "#3A2E5A"];
    const size = 900;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.textAlign = "center";
    ctx.font = "600 20px Satoshi, sans-serif";
    ctx.fillText("VIBEZ & BUTTERFLYZ BLENDZ", size / 2, 140);

    ctx.font = "700 54px Georgia, serif";
    ctx.fillStyle = "#fff";
    ctx.fillText($("#mood-card-title").textContent, size / 2, 230);

    ctx.font = "400 24px Satoshi, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    wrapText(ctx, $("#mood-card-tagline").textContent, size / 2, 280, 640, 32);

    ctx.font = "italic 26px Satoshi, sans-serif";
    wrapText(ctx, $("#mood-card-affirmation").textContent, size / 2, 400, 600, 36);

    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    ctx.moveTo(size / 2 - 40, 520);
    ctx.lineTo(size / 2 + 40, 520);
    ctx.stroke();

    ctx.font = "500 20px Satoshi, sans-serif";
    const oilNames = $("#mood-card-oils").textContent;
    wrapText(ctx, oilNames, size / 2, 570, 640, 28);

    ctx.font = "400 18px Satoshi, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText($("#mood-card-attribution").textContent, size / 2, 780);

    ctx.font = "600 14px Satoshi, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.fillText("MADE IN VIBEZ & BUTTERFLYZ", size / 2, 830);

    const link = document.createElement("a");
    link.download = ($("#mood-card-title").textContent || "vibez-butterflyz-blend").replace(/\s+/g, "-").toLowerCase() + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = (text || "").split(" ");
    let line = "";
    let curY = y;
    words.forEach((w) => {
      const test = line + w + " ";
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, curY);
        line = w + " ";
        curY += lineHeight;
      } else {
        line = test;
      }
    });
    ctx.fillText(line, x, curY);
  }

  /* ---------- MODAL (used for oil "read more" from search results etc.) ---------- */
  function openModal(id) {
    const oil = byId(id);
    if (!oil) return;
    const body = $("#modal-body");
    const inBlend = blend.some((b) => b.id === id);
    body.innerHTML =
      "<h2>" + oil.name + "</h2><p class=\"muted\" style=\"margin:0;\">" + (oil.latin || "") + "</p>" +
      '<div class="modal-section"><h4>Aroma</h4><p>' + (oil.aroma || []).join(", ") + "</p></div>" +
      '<div class="modal-section"><h4>Constituents</h4><p>' + (oil.constituents || []).map((c) => c.c + " " + c.pct + "%").join(", ") + "</p></div>" +
      '<div class="modal-section"><h4>Cautions</h4><p>' + (oil.cautions || []).join(" ") + "</p></div>" +
      '<div class="modal-section"><h4>Pairs with</h4><p>' + (oil.pairs_with || []).join(", ") + "</p></div>" +
      '<div class="modal-actions"><button class="btn-primary' + (inBlend ? " remove" : "") + '" id="modal-add-btn">' + (inBlend ? "Remove from blend" : "Add to blend") + "</button>" +
      '<button class="btn-secondary" data-close>Close</button></div>';
    $("#modal-add-btn").addEventListener("click", () => {
      if (inBlend) removeFromBlend(id);
      else addToBlend(id);
      closeModal();
    });
    $("#modal").classList.remove("hidden");
  }

  function openBlendModal(entry) {
    const body = $("#modal-body");
    body.innerHTML =
      "<h2>" + entry.name + "</h2><p class=\"muted\" style=\"margin:0;\">" + entry.desc + "</p>" +
      '<div class="modal-section"><h4>Recipe</h4><p>' +
      entry.oils.map((o) => (byId(o.id) ? byId(o.id).name : o.id) + " — " + o.drops + " drops").join("<br>") +
      "</p></div>" +
      '<div class="modal-actions"><button class="btn-primary" id="modal-load-btn">Load into blend</button>' +
      '<button class="btn-secondary" data-close>Close</button></div>';
    $("#modal-load-btn").addEventListener("click", () => {
      blend = entry.oils.filter((o) => byId(o.id)).map((o) => ({ id: o.id, drops: o.drops }));
      renderAll();
      closeModal();
      switchTab("tab-blend");
    });
    $("#modal").classList.remove("hidden");
  }

  function closeModal() {
    $("#modal").classList.add("hidden");
  }

  /* ---------- ONBOARDING ---------- */
  function initOnboarding() {
    const grid = $("#onboarding-mood-grid");
    grid.innerHTML = MOODS.map((m) => '<button type="button" class="onboarding-mood-chip" data-mood="' + m.id + '">' + m.label + "</button>").join("");
    if (!localStorage.getItem("vb_seen_onboarding")) {
      $("#onboarding").classList.remove("hidden");
    }
  }

  function closeOnboarding() {
    $("#onboarding").classList.add("hidden");
    localStorage.setItem("vb_seen_onboarding", "1");
  }

  function setSessionMood(moodId) {
    sessionMood = moodId;
    localStorage.setItem("vb_session_mood", moodId);
    const themeSel = $("#moodlab-theme");
    if (themeSel) themeSel.value = moodId;
    moodblendCat = moodId;
  }

  /* ---------- GUIDE / TOUR ---------- */
  function openGuide(startIndex) {
    guideOpen = true;
    guideIndex = startIndex || 0;
    $("#guide").classList.remove("hidden");
    $("#guide").classList.remove("minimized");
    renderGuideStep();
  }

  function renderGuideStep() {
    const step = GUIDE_STEPS[guideIndex];
    if (!step) return;
    $("#guide-kicker").textContent = step.kicker;
    $("#guide-step-title").textContent = step.title;
    $("#guide-desc").textContent = step.desc;
    $("#guide-does").textContent = step.does || "";
    $("#guide-next").textContent = step.next || "";
    $("#guide-count").textContent = "Step " + (guideIndex + 1) + " of " + GUIDE_STEPS.length;
    $("#guide-rail-progress").style.width = ((guideIndex + 1) / GUIDE_STEPS.length) * 100 + "%";
    $("#guide-prev").disabled = guideIndex === 0;
    $("#guide-nextbtn").textContent = guideIndex === GUIDE_STEPS.length - 1 ? "Done" : "Next";
    if (step.tab) switchTab(step.tab);
  }

  function guideNext() {
    if (guideIndex >= GUIDE_STEPS.length - 1) {
      closeGuide();
      return;
    }
    guideIndex++;
    renderGuideStep();
  }

  function guidePrev() {
    if (guideIndex === 0) return;
    guideIndex--;
    renderGuideStep();
  }

  function closeGuide() {
    guideOpen = false;
    $("#guide").classList.add("hidden");
    $("#guide").classList.remove("minimized");
  }

  function minimizeGuide() {
    $("#guide").classList.add("minimized");
  }

  function expandGuide() {
    $("#guide").classList.remove("minimized");
  }

  function makeGuideDraggable() {
    const panel = $(".guide-panel");
    const handle = $(".guide-head");
    let dragging = false, offX = 0, offY = 0;
    handle.addEventListener("mousedown", (e) => {
      if (e.target.closest("button")) return;
      dragging = true;
      const rect = panel.getBoundingClientRect();
      offX = e.clientX - rect.left;
      offY = e.clientY - rect.top;
      panel.style.position = "fixed";
    });
    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const x = Math.max(8, Math.min(window.innerWidth - panel.offsetWidth - 8, e.clientX - offX));
      const y = Math.max(8, Math.min(window.innerHeight - panel.offsetHeight - 8, e.clientY - offY));
      panel.style.left = x + "px";
      panel.style.top = y + "px";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
    });
    document.addEventListener("mouseup", () => (dragging = false));
  }

  /* ---------- RENDER ALL ---------- */
  function renderAll() {
    renderLibrary();
    renderBlendList();
    renderInlineShelf();
    if (!$("#view-blend").classList.contains("hidden")) renderBlendAnalyzer();
    if (!$("#view-recipes").classList.contains("hidden")) renderPairingSuggestions();
  }

  /* ---------- EVENT WIRING ---------- */
  function wireEvents() {
    $("#search").addEventListener("input", (e) => { searchTerm = e.target.value; renderLibrary(); });
    $$('input[data-filter]').forEach((input) => {
      input.addEventListener("change", () => {
        const key = input.dataset.filter;
        if (key === "phototoxic") {
          filters.phototoxic = input.checked;
        } else {
          const val = input.value;
          const arr = filters[key];
          const i = arr.indexOf(val);
          if (input.checked && i === -1) arr.push(val);
          if (!input.checked && i > -1) arr.splice(i, 1);
        }
        renderLibrary();
      });
    });
    $("#category-filter").addEventListener("change", (e) => { filters.category = e.target.value; renderLibrary(); });
    $("#clear-blend").addEventListener("click", clearBlend);

    $$(".layout-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.layout === layout));
    $$(".layout-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        layout = btn.dataset.layout;
        $$(".layout-btn").forEach((b) => b.classList.toggle("active", b === btn));
        renderLibrary();
      })
    );

    // Delegated clicks: oil grid, blend list, shelf, pairing suggestions, presets
    document.body.addEventListener("click", (e) => {
      const addBtn = e.target.closest('[data-action="add"]');
      const flipBtn = e.target.closest('[data-action="flip"]');
      const incBtn = e.target.closest('[data-action="inc"]');
      const decBtn = e.target.closest('[data-action="dec"]');
      const removeBtn = e.target.closest('[data-action="remove"]');
      const presetCard = e.target.closest(".preset-card");
      const terpeneCard = e.target.closest(".terpene-card");
      const closeEl = e.target.closest("[data-close]");

      if (flipBtn) {
        const card = flipBtn.closest(".butterfly-card");
        card.classList.toggle("flipped");
        spawnDust(flipBtn, 14);
        return;
      }
      if (addBtn) {
        const id = addBtn.dataset.id;
        const inBlend = blend.some((b) => b.id === id);
        if (inBlend) removeFromBlend(id);
        else addToBlend(id, addBtn);
        return;
      }
      if (incBtn) { changeDrops(incBtn.dataset.id, 1); return; }
      if (decBtn) { changeDrops(decBtn.dataset.id, -1); return; }
      if (removeBtn) { removeFromBlend(removeBtn.dataset.id); return; }
      if (presetCard) { openBlendModal((presetCard.dataset.source === "preset" ? PRESETS : MOOD_BLEND_LIBRARY).find((b) => b.id === presetCard.dataset.id)); return; }
      if (terpeneCard) {
        expandedTerpene = expandedTerpene === terpeneCard.dataset.name ? null : terpeneCard.dataset.name;
        renderTerpenes();
        return;
      }
      if (closeEl) { closeModal(); return; }
    });

    $("#total-volume").addEventListener("change", renderRecipe);
    $("#use-case").addEventListener("change", renderRecipe);

    // Tabs
    ["tab-library", "tab-blend", "tab-terpenes", "tab-recipes", "tab-moodlab"].forEach((id) =>
      $("#" + id).addEventListener("click", () => switchTab(id))
    );
    $("#tab-help-dismiss").addEventListener("click", () => $("#tab-help").classList.add("hidden"));

    // Curated Moods search/filter
    $("#moodblend-search").addEventListener("input", () => { moodblendShown = 12; renderMoodblendGrid(); });
    $("#moodblend-more").addEventListener("click", () => { moodblendShown += 12; renderMoodblendGrid(); });
    document.body.addEventListener("click", (e) => {
      const catBtn = e.target.closest(".chip[data-mood]");
      if (catBtn) {
        moodblendCat = moodblendCat === catBtn.dataset.mood ? "" : catBtn.dataset.mood;
        moodblendShown = 12;
        renderMoodblendGrid();
      }
    });

    // Moodlab
    $("#moodlab-source").addEventListener("change", (e) => {
      $("#moodlab-suggested-wrap").classList.toggle("hidden", e.target.value !== "suggested");
    });
    $("#moodlab-generate").addEventListener("click", generateMoodCard);
    $("#moodlab-download").addEventListener("click", downloadMoodCard);

    // Onboarding
    $("#onboarding-skip").addEventListener("click", closeOnboarding);
    $("#onboarding-skip-all").addEventListener("click", closeOnboarding);
    $("#onboarding-quiz-skip").addEventListener("click", closeOnboarding);
    $("#onboarding-begin").addEventListener("click", () => {
      $("#onboarding-step-welcome").classList.add("hidden");
      $("#onboarding-step-quiz").classList.remove("hidden");
    });
    $("#onboarding-mood-grid").addEventListener("click", (e) => {
      const chip = e.target.closest(".onboarding-mood-chip");
      if (!chip) return;
      setSessionMood(chip.dataset.mood);
      closeOnboarding();
      openGuide(0);
    });

    // Guide / Tour
    $("#walk-me-through").addEventListener("click", () => openGuide(0));
    $("#open-guide-inline").addEventListener("click", () => openGuide(0));
    $("#site-tour-btn").addEventListener("click", () => openGuide(0));
    $("#guide-nextbtn").addEventListener("click", guideNext);
    $("#guide-prev").addEventListener("click", guidePrev);
    $("#guide-close").addEventListener("click", closeGuide);
    $("#guide-explore").addEventListener("click", closeGuide);
    $("#guide-min").addEventListener("click", minimizeGuide);
    $("#guide-pill-btn").addEventListener("click", expandGuide);
    makeGuideDraggable();
  }

  /* ---------- INIT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    populateCategoryFilter();
    wireEvents();
    renderAll();
    switchTab("tab-library");
    initOnboarding();
    const savedMood = localStorage.getItem("vb_session_mood");
    if (savedMood) sessionMood = savedMood;
  });
})();
