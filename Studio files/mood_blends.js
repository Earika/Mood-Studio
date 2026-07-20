/* ============================================================
   MOOD_BLENDS.JS
   NOTE: Aroma_Lab_250_Mood_Blends.xlsx was never uploaded to this
   session, so the "250 mood blend library" referenced in the UI
   copy does not exist as real data anywhere I have access to.
   What follows is a working starter set (30 blends, 3 per mood,
   built from oils that actually exist in OILS) so the Curated
   Moods tab is functional today. Swap MOOD_BLEND_LIBRARY for the
   real 250 once that spreadsheet is available and everything else
   (search, filters, moodlab dropdown) keeps working unchanged.
   ============================================================ */

const MOODS = [
  { id: "calm-peace", label: "Calm & Peace", affirmation: "I am safe. I let this moment be enough." },
  { id: "motivation-drive", label: "Motivation & Drive", affirmation: "I move with purpose. Momentum is mine." },
  { id: "renewal-rejuvenation", label: "Renewal & Rejuvenation", affirmation: "I release what is finished and welcome what is next." },
  { id: "reenergize-reignite", label: "Reenergize & Reignite", affirmation: "My energy returns to me, brighter than before." },
  { id: "relaxation-rest", label: "Relaxation & Rest", affirmation: "I am allowed to slow down. Rest is productive." },
  { id: "self-love-being-loved", label: "Self-Love & Being Loved", affirmation: "I am worthy of the same tenderness I give others." },
  { id: "confidence-power", label: "Confidence & Power", affirmation: "I trust myself. I take up space." },
  { id: "protection-strength", label: "Protection & Strength", affirmation: "I am grounded. Nothing shakes what I have built." },
  { id: "joy-uplift", label: "Joy & Uplift", affirmation: "Lightness finds me easily today." },
  { id: "clarity-focus", label: "Clarity & Focus", affirmation: "I know what matters, and I let the rest fall away." }
];

const PRESETS = [
  { id: "p-calm-1", name: "Butterfly Hush", mood: "calm-peace", desc: "Lavender-forward wind-down for overstimulated evenings.", oils: [{ id: "lavender", drops: 3 }, { id: "bergamot", drops: 2 }, { id: "clary-sage", drops: 1 }] },
  { id: "p-motiv-1", name: "Ignition Point", mood: "motivation-drive", desc: "Bright citrus and rosemary to cut through morning fog.", oils: [{ id: "grapefruit", drops: 3 }, { id: "rosemary", drops: 2 }, { id: "peppermint", drops: 1 }] },
  { id: "p-renew-1", name: "Second Wings", mood: "renewal-rejuvenation", desc: "Green, growing scent for a fresh chapter.", oils: [{ id: "sweet-orange", drops: 2 }, { id: "eucalyptus", drops: 2 }, { id: "lemon", drops: 2 }] },
  { id: "p-focus-1", name: "Quiet Mind", mood: "clarity-focus", desc: "Rosemary and peppermint sharpen without jarring.", oils: [{ id: "rosemary", drops: 3 }, { id: "peppermint", drops: 2 }, { id: "lemon", drops: 1 }] },
  { id: "p-conf-1", name: "Velvet Armor", mood: "confidence-power", desc: "Warm, grounded spice for walking in like you own it.", oils: [{ id: "clove", drops: 1 }, { id: "cinnamon", drops: 1 }, { id: "bergamot", drops: 3 }] },
  { id: "p-joy-1", name: "Sunlit Wings", mood: "joy-uplift", desc: "Citrus-forward mood lift, sharable in any diffuser.", oils: [{ id: "sweet-orange", drops: 3 }, { id: "grapefruit", drops: 2 }, { id: "vanilla", drops: 1 }] },
  { id: "p-rest-1", name: "Deep Rest Cocoon", mood: "relaxation-rest", desc: "Sandalwood and lavender for a full nervous-system exhale.", oils: [{ id: "sandalwood", drops: 2 }, { id: "lavender", drops: 3 }, { id: "vanilla", drops: 1 }] },
  { id: "p-love-1", name: "Held Softly", mood: "self-love-being-loved", desc: "Rose and ylang ylang, worn like a warm hand on the chest.", oils: [{ id: "rose", drops: 2 }, { id: "ylang-ylang", drops: 1 }, { id: "bergamot", drops: 2 }] },
  { id: "p-prot-1", name: "Root & Shield", mood: "protection-strength", desc: "Frankincense and cedarwood for feeling unshakeable.", oils: [{ id: "frankincense", drops: 2 }, { id: "cedarwood", drops: 2 }, { id: "clove", drops: 1 }] },
  { id: "p-fire-1", name: "Reignite", mood: "reenergize-reignite", desc: "Peppermint and citrus to reboot a flat afternoon.", oils: [{ id: "peppermint", drops: 2 }, { id: "grapefruit", drops: 2 }, { id: "eucalyptus", drops: 1 }] }
];

/* Placeholder mood blend library. 3 per mood x 10 moods = 30. */
const MOOD_BLEND_LIBRARY = [
  ...PRESETS,
  { id: "mb-calm-2", name: "Moonlit Wingfold", mood: "calm-peace", desc: "Slower, deeper variant for late-night wind-down.", oils: [{ id: "lavender", drops: 3 }, { id: "sandalwood", drops: 2 }] },
  { id: "mb-calm-3", name: "Still Water", mood: "calm-peace", desc: "Soft and mineral, almost aquatic in feel.", oils: [{ id: "bergamot", drops: 2 }, { id: "clary-sage", drops: 2 }, { id: "lavender", drops: 2 }] },
  { id: "mb-motiv-2", name: "Forward Motion", mood: "motivation-drive", desc: "Peppermint-led for task-switching without a crash.", oils: [{ id: "peppermint", drops: 3 }, { id: "lemon", drops: 2 }] },
  { id: "mb-motiv-3", name: "Drive Line", mood: "motivation-drive", desc: "Grapefruit and rosemary, built for a full workday.", oils: [{ id: "grapefruit", drops: 2 }, { id: "rosemary", drops: 3 }] },
  { id: "mb-renew-2", name: "Fresh Molt", mood: "renewal-rejuvenation", desc: "Eucalyptus-forward clearing blend.", oils: [{ id: "eucalyptus", drops: 3 }, { id: "sweet-orange", drops: 2 }] },
  { id: "mb-renew-3", name: "New Leaf", mood: "renewal-rejuvenation", desc: "Lemon and rosemary for a literal clean slate.", oils: [{ id: "lemon", drops: 3 }, { id: "rosemary", drops: 1 }] },
  { id: "mb-focus-2", name: "Signal Clarity", mood: "clarity-focus", desc: "Minimal, sharp, built for deep work blocks.", oils: [{ id: "peppermint", drops: 2 }, { id: "rosemary", drops: 2 }] },
  { id: "mb-focus-3", name: "Clean Line", mood: "clarity-focus", desc: "Lemon-forward with a rosemary backbone.", oils: [{ id: "lemon", drops: 3 }, { id: "rosemary", drops: 2 }] },
  { id: "mb-conf-2", name: "Full Wingspan", mood: "confidence-power", desc: "Cinnamon and bergamot, worn like a statement.", oils: [{ id: "cinnamon", drops: 1 }, { id: "bergamot", drops: 3 }] },
  { id: "mb-conf-3", name: "Bold Flight", mood: "confidence-power", desc: "Clove-forward, unapologetically warm.", oils: [{ id: "clove", drops: 1 }, { id: "sweet-orange", drops: 3 }] },
  { id: "mb-joy-2", name: "Light Wings", mood: "joy-uplift", desc: "Vanilla-sweetened citrus lift.", oils: [{ id: "sweet-orange", drops: 3 }, { id: "vanilla", drops: 2 }] },
  { id: "mb-joy-3", name: "Bright Flutter", mood: "joy-uplift", desc: "Grapefruit and lemon, high energy.", oils: [{ id: "grapefruit", drops: 3 }, { id: "lemon", drops: 2 }] },
  { id: "mb-rest-2", name: "Slow Wings", mood: "relaxation-rest", desc: "Sandalwood-heavy, minimal top notes.", oils: [{ id: "sandalwood", drops: 3 }, { id: "lavender", drops: 1 }] },
  { id: "mb-rest-3", name: "Evening Fold", mood: "relaxation-rest", desc: "Vanilla and lavender, cocoa-warm.", oils: [{ id: "vanilla", drops: 2 }, { id: "lavender", drops: 3 }] },
  { id: "mb-love-2", name: "Gentle Hold", mood: "self-love-being-loved", desc: "Rose-forward, quiet and warm.", oils: [{ id: "rose", drops: 3 }, { id: "vanilla", drops: 1 }] },
  { id: "mb-love-3", name: "Worthy Wings", mood: "self-love-being-loved", desc: "Ylang ylang and bergamot, soft confidence.", oils: [{ id: "ylang-ylang", drops: 2 }, { id: "bergamot", drops: 2 }] },
  { id: "mb-prot-2", name: "Steady Ground", mood: "protection-strength", desc: "Cedarwood and frankincense, low and stable.", oils: [{ id: "cedarwood", drops: 3 }, { id: "frankincense", drops: 2 }] },
  { id: "mb-prot-3", name: "Guarded Wings", mood: "protection-strength", desc: "Clove-spiked frankincense for hard days.", oils: [{ id: "frankincense", drops: 3 }, { id: "clove", drops: 1 }] },
  { id: "mb-fire-2", name: "Second Wind", mood: "reenergize-reignite", desc: "Eucalyptus and peppermint, sinus-clearing energy.", oils: [{ id: "eucalyptus", drops: 2 }, { id: "peppermint", drops: 2 }] },
  { id: "mb-fire-3", name: "Spark Line", mood: "reenergize-reignite", desc: "Grapefruit-led afternoon reset.", oils: [{ id: "grapefruit", drops: 3 }, { id: "peppermint", drops: 1 }] }
];

/* Lounge Experience Matrix — mood -> pairing suggestions */
const LOUNGE_MAP = {
  "calm-peace": {
    wine: { name: "Sancerre, chilled", desc: "Bright, mineral, low intervention. Matches the quiet." },
    cocktail: { name: "Lavender Gin Fizz", desc: "Gin, lemon, lavender syrup, soda." },
    mocktail: { name: "Chamomile Cooler", desc: "Chamomile tea, honey, lemon, sparkling water." },
    food: { name: "Marcona Almonds & Manchego", desc: "Simple, salty, nothing that fights the mood." }
  },
  "motivation-drive": {
    wine: { name: "Sauvignon Blanc", desc: "Crisp acidity, grapefruit and cut grass notes." },
    cocktail: { name: "Rosemary Grapefruit Paloma", desc: "Tequila, grapefruit, rosemary, soda." },
    mocktail: { name: "Ginger Citrus Spark", desc: "Fresh ginger, orange, lime, soda." },
    food: { name: "Charred Citrus Shrimp Skewers", desc: "Bright, protein-forward, built for momentum." }
  },
  "renewal-rejuvenation": {
    wine: { name: "Albariño", desc: "Green apple, salinity, coastal freshness." },
    cocktail: { name: "Eucalyptus Mint Gimlet", desc: "Gin, lime, mint, a whisper of eucalyptus." },
    mocktail: { name: "Cucumber Mint Refresher", desc: "Cucumber, mint, lime, soda." },
    food: { name: "Citrus Herb Crudo", desc: "Clean, cold, restorative." }
  },
  "reenergize-reignite": {
    wine: { name: "Vinho Verde", desc: "Light effervescence, low ABV, quick lift." },
    cocktail: { name: "Peppermint Grapefruit Spritz", desc: "Prosecco, grapefruit, mint, soda." },
    mocktail: { name: "Minted Yerba Mate Soda", desc: "Cold yerba mate, mint, lime, soda." },
    food: { name: "Spiced Nuts", desc: "Warm spice, quick energy, shareable." }
  },
  "relaxation-rest": {
    wine: { name: "Late Harvest Riesling", desc: "Soft sweetness, low alcohol, unwind pace." },
    cocktail: { name: "Vanilla Sandalwood Old Fashioned", desc: "Bourbon, vanilla syrup, orange bitters." },
    mocktail: { name: "Warm Oat Milk Vanilla Steamer", desc: "Oat milk, vanilla bean, cinnamon." },
    food: { name: "Warm Brie & Honeycomb", desc: "Slow food for a slow night." }
  },
  "self-love-being-loved": {
    wine: { name: "Rosé", desc: "Soft, pink, romantic without trying hard." },
    cocktail: { name: "Rose Bergamot Spritz", desc: "Aperol, rose water, bergamot, soda." },
    mocktail: { name: "Rose Lemonade", desc: "Rose water, lemon, honey, sparkling water." },
    food: { name: "Strawberries & Whipped Ricotta", desc: "Soft, sweet, a little indulgent." }
  },
  "confidence-power": {
    wine: { name: "Malbec", desc: "Bold, dark fruit, structure." },
    cocktail: { name: "Spiced Bergamot Negroni", desc: "Gin, Campari, sweet vermouth, clove twist." },
    mocktail: { name: "Blackberry Clove Fizz", desc: "Blackberry shrub, clove syrup, soda." },
    food: { name: "Seared Steak Bites", desc: "Rich, confident, no apologies." }
  },
  "protection-strength": {
    wine: { name: "Syrah", desc: "Dark, peppery, grounded." },
    cocktail: { name: "Cedar Smoke Old Fashioned", desc: "Rye, cedar bitters, orange." },
    mocktail: { name: "Smoked Rosemary Cola", desc: "Cola, rosemary syrup, a smoked garnish." },
    food: { name: "Roasted Root Vegetables", desc: "Earthy, dense, grounding." }
  },
  "joy-uplift": {
    wine: { name: "Moscato d'Asti", desc: "Sweet, bubbly, unserious in the best way." },
    cocktail: { name: "Sunset Butterfly Spritz", desc: "Aperol, orange, prosecco, soda." },
    mocktail: { name: "Orange Vanilla Cream Soda", desc: "Orange, vanilla, cream soda." },
    food: { name: "Citrus Olive Oil Cake", desc: "Bright, sweet, a little celebratory." }
  },
  "clarity-focus": {
    wine: { name: "Chablis", desc: "Precise, mineral, no distractions." },
    cocktail: { name: "Rosemary Lemon Sour", desc: "Whiskey, lemon, rosemary syrup." },
    mocktail: { name: "Peppermint Lemon Tonic", desc: "Peppermint, lemon, tonic water." },
    food: { name: "Herb-Crusted Crackers & Hummus", desc: "Light, doesn't compete with a working mind." }
  }
};

/* Walk Me Through guide steps, also used by the corner Tour button */
const GUIDE_STEPS = [
  {
    tab: null,
    title: "Set the Mood",
    kicker: "Guided Session",
    desc: "Welcome to Vibez & Butterflyz. This walkthrough shows you the studio in five short stops.",
    does: "Nothing to click yet, just read.",
    next: "Next: the Oil Library, where every scent lives."
  },
  {
    tab: "tab-library",
    title: "Oil Library",
    kicker: "Step 1 of 5",
    desc: "Your full crate of oils. Search, filter by note or type, and tap a butterfly card to see the back for safety details.",
    does: "Tap any card's Details pill to flip it.",
    next: "Next: build a blend and see how it holds together."
  },
  {
    tab: "tab-blend",
    title: "Blend Analyzer",
    kicker: "Step 2 of 5",
    desc: "Once you've added oils to your blend, this tab shows note balance, safety flags, therapeutic actions, and a full recipe with dilution math.",
    does: "Add at least one oil from the Library to see this populate.",
    next: "Next: the terpene science behind the effects."
  },
  {
    tab: "tab-terpenes",
    title: "Terpenes",
    kicker: "Step 3 of 5",
    desc: "The chemistry reference. Tap any terpene to expand its therapeutic actions, cautions, and which oils carry it.",
    does: "Tap a terpene card to expand it.",
    next: "Next: ready-made blends for every mood."
  },
  {
    tab: "tab-recipes",
    title: "Curated Moods",
    kicker: "Step 4 of 5",
    desc: "Pre-built blends organized by mood. Tap any card to load it straight into your active blend.",
    does: "Browse or search, then tap a blend to load it.",
    next: "Last stop: turn your blend into a shareable card."
  },
  {
    tab: "tab-moodlab",
    title: "Moodlab",
    kicker: "Step 5 of 5",
    desc: "Name your blend, pick a mood theme, and generate a downloadable card with a matching affirmation.",
    does: "Fill in a title and tap Preview Card.",
    next: "That's the full studio. Explore freely any time."
  }
];

if (typeof module !== "undefined") {
  module.exports = { MOODS, PRESETS, MOOD_BLEND_LIBRARY, LOUNGE_MAP, GUIDE_STEPS };
}
