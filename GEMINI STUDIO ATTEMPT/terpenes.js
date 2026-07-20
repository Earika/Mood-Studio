const TERPENES = [
  {
    name: "Limonene", family: "Monoterpene", aroma: "Citrus, fresh, sweet",
    actions: [
      { effect: "Mood elevation", strength: "strong", detail: "Inhaled limonene increases dopamine and serotonin in animal models (Komiya et al. 2006); human trials show reduced depression scores." },
      { effect: "Immune support", strength: "moderate", detail: "In vitro antimicrobial against S. aureus, E. coli; enhances lymphocyte proliferation." },
      { effect: "Antioxidant", strength: "moderate", detail: "Free-radical scavenging in cell studies." },
      { effect: "Digestive aid", strength: "moderate", detail: "d-Limonene used clinically for GERD (Sun 2007)." }
    ],
    warnings: "Oxidized limonene is a strong dermal sensitizer — store citrus oils cold.",
    found_in: ["Sweet Orange (90%)", "Grapefruit (92%)", "Lemon (65%)", "Bergamot (38%)"]
  },
  {
    name: "Linalool", family: "Alcohol (monoterpene)", aroma: "Floral, sweet, soft",
    actions: [
      { effect: "Anxiolytic (anti-anxiety)", strength: "strong", detail: "Modulates GABA-A receptors similar to benzodiazepines; multiple RCTs show reduced pre-operative anxiety with inhaled linalool-rich oils (Bagetta 2010)." },
      { effect: "Sedative", strength: "strong", detail: "Delays sleep onset in insomnia trials." },
      { effect: "Analgesic", strength: "moderate", detail: "Blocks NMDA receptors; reduces inflammatory pain in models." },
      { effect: "Anticonvulsant", strength: "moderate", detail: "Suppresses seizure activity in animal models." },
      { effect: "Local anesthetic", strength: "moderate", detail: "Similar to lidocaine at high doses." }
    ],
    warnings: "Generally very safe; the primary anxiolytic terpene in aromatherapy.",
    found_in: ["Lavender (32%)", "Basil (50%)", "Thyme linalool ct (70%)", "Orange Blossom (45%)", "Ylang Ylang (14%)"]
  },
  {
    name: "Linalyl acetate", family: "Ester", aroma: "Sweet, floral, bergamot-like",
    actions: [
      { effect: "Sedative", strength: "strong", detail: "The primary sedative component in lavender and clary sage; works synergistically with linalool." },
      { effect: "Anti-inflammatory", strength: "moderate", detail: "Suppresses NF-κB pathway; reduces edema in models." },
      { effect: "Antispasmodic", strength: "moderate", detail: "Relaxes smooth muscle — basis for lavender's use in menstrual cramps." }
    ],
    warnings: "Very safe.",
    found_in: ["Lavender (38%)", "Clary Sage (62%)", "Bergamot (28%)"]
  },
  {
    name: "α-Pinene", family: "Monoterpene", aroma: "Pine, fresh, resinous",
    actions: [
      { effect: "Bronchodilator", strength: "strong", detail: "Opens airways; used traditionally in pine steam for respiratory congestion." },
      { effect: "Memory & focus", strength: "moderate", detail: "Acetylcholinesterase inhibitor — same mechanism as Alzheimer's drugs like donepezil, though far weaker. Explains rosemary's memory-boost trials (Moss 2003)." },
      { effect: "Anti-inflammatory", strength: "moderate", detail: "PGE2 suppression in tissue models." },
      { effect: "Antimicrobial", strength: "moderate", detail: "Effective against MRSA in vitro." }
    ],
    warnings: "OXIDIZED α-pinene is a strong sensitizer — the reason old pine/fir oils cause dermatitis.",
    found_in: ["Frankincense (40%)", "Pine (35%)", "Cypress (50%)", "Rosemary (12%)", "Eucalyptus (10%)"]
  },
  {
    name: "β-Pinene", family: "Monoterpene", aroma: "Pine, dry, woody",
    actions: [
      { effect: "Bronchodilator", strength: "moderate", detail: "Similar to α-pinene but weaker." },
      { effect: "Antimicrobial", strength: "moderate", detail: "Effective against multiple pathogens." },
      { effect: "Anti-inflammatory", strength: "moderate", detail: "" }
    ],
    warnings: "Oxidation-sensitive like α-pinene.",
    found_in: ["Fir (30%)", "Pine (25%)", "Nutmeg (15%)", "Lemon (12%)"]
  },
  {
    name: "1,8-Cineole (Eucalyptol)", family: "Oxide", aroma: "Camphoraceous, fresh, medicinal",
    actions: [
      { effect: "Expectorant / mucolytic", strength: "strong", detail: "Clinical evidence in COPD and bronchitis (Fischer 2013 meta-analysis). Standard component of respiratory blends." },
      { effect: "Anti-inflammatory (respiratory)", strength: "strong", detail: "Reduces cytokines in bronchial cells." },
      { effect: "Antimicrobial", strength: "moderate", detail: "" },
      { effect: "Analgesic", strength: "moderate", detail: "Reduces pain via cold-receptor pathway." }
    ],
    warnings: "AVOID near face of children under 10 (CNS depression, laryngospasm risk).",
    found_in: ["Eucalyptus (70%)", "Rosemary (45%)", "Basil (8%)", "Tea Tree (3%)"]
  },
  {
    name: "Menthol", family: "Alcohol (monoterpene)", aroma: "Sharp, cold, minty",
    actions: [
      { effect: "Analgesic (topical)", strength: "strong", detail: "Activates TRPM8 cold receptor — cooling sensation blocks pain signals. Basis for muscle rubs like Icy Hot." },
      { effect: "Decongestant sensation", strength: "strong", detail: "Feels like breathing opens even when mucus doesn't clear — psychological + local cold receptor effect." },
      { effect: "Antipruritic (anti-itch)", strength: "moderate", detail: "" },
      { effect: "Digestive", strength: "moderate", detail: "Enteric-coated peppermint (menthol) treats IBS clinically." }
    ],
    warnings: "AVOID in children under 6 — risk of laryngospasm/apnea from vapor.",
    found_in: ["Peppermint (42%)"]
  },
  {
    name: "β-Caryophyllene", family: "Sesquiterpene", aroma: "Woody, spicy, warm",
    actions: [
      { effect: "Anti-inflammatory", strength: "strong", detail: "ONLY known dietary CB2 cannabinoid receptor agonist. Reduces inflammation without psychoactivity. Multiple pain/anxiety models (Gertsch 2008)." },
      { effect: "Analgesic", strength: "strong", detail: "CB2-mediated pain reduction." },
      { effect: "Neuroprotective", strength: "moderate", detail: "Reduces neuroinflammation in Alzheimer's models." },
      { effect: "Anxiolytic", strength: "moderate", detail: "" }
    ],
    warnings: "Very safe. FDA GRAS for food use.",
    found_in: ["Black Pepper (22%)", "Lemon Balm (12%)", "Clove (10%)", "Ylang Ylang (present)", "Lavender (4%)"]
  },
  {
    name: "Citronellol", family: "Alcohol (monoterpene)", aroma: "Rose, floral, fresh",
    actions: [
      { effect: "Insect repellent", strength: "strong", detail: "One of the most-studied natural mosquito repellents. 30% citronellol is comparable to 10% DEET in short-duration tests (Yang 2004)." },
      { effect: "Antimicrobial", strength: "moderate", detail: "" },
      { effect: "Anti-inflammatory", strength: "moderate", detail: "" }
    ],
    warnings: "IFRA restricted (0.6%) due to skin sensitization potential.",
    found_in: ["Rose (32%)", "Geranium (30%)"]
  },
  {
    name: "Geraniol", family: "Alcohol (monoterpene)", aroma: "Rose, sweet, floral",
    actions: [
      { effect: "Insect repellent", strength: "strong", detail: "Longer-lasting than citronellol in mosquito tests. EPA-registered as biopesticide." },
      { effect: "Antimicrobial", strength: "moderate", detail: "Effective against gram-positive bacteria." },
      { effect: "Antioxidant", strength: "moderate", detail: "" },
      { effect: "Anti-tumor (research)", strength: "weak", detail: "Emerging cancer cell-line research; not clinical." }
    ],
    warnings: "Moderate skin sensitizer.",
    found_in: ["Rose (18%)", "Geranium (15%)", "Lemongrass (5%)", "Lemon Balm (5%)"]
  },
  {
    name: "Citral (Geranial + Neral)", family: "Aldehyde", aroma: "Sharp lemony, sherbet-like",
    actions: [
      { effect: "Antimicrobial", strength: "strong", detail: "Broad-spectrum against bacteria and fungi including Candida." },
      { effect: "Insect repellent", strength: "strong", detail: "Core citronella-family repellent action." },
      { effect: "Anti-inflammatory", strength: "moderate", detail: "" },
      { effect: "Sedative (mild)", strength: "moderate", detail: "" }
    ],
    warnings: "Strong dermal sensitizer — heavy dilution required. IFRA cap 0.6% dermal.",
    found_in: ["Lemongrass (75%)", "Lemon Balm (50%)", "Verbena (35%)", "Lemon (2%)"]
  },
  {
    name: "Terpinen-4-ol", family: "Alcohol (monoterpene)", aroma: "Woody, earthy, herbal",
    actions: [
      { effect: "Antimicrobial", strength: "strong", detail: "The primary active in tea tree — effective against MRSA, Candida, acne bacteria (Carson 2006 review)." },
      { effect: "Anti-inflammatory", strength: "moderate", detail: "" },
      { effect: "Immunomodulator", strength: "moderate", detail: "Enhances monocyte function." }
    ],
    warnings: "Well-tolerated; the safe fraction of tea tree oil.",
    found_in: ["Tea Tree (40%)", "Marjoram (26%)"]
  },
  {
    name: "Menthone", family: "Ketone", aroma: "Minty, less cool than menthol",
    actions: [
      { effect: "Analgesic", strength: "moderate", detail: "" },
      { effect: "Antispasmodic", strength: "moderate", detail: "" },
      { effect: "Circulatory stimulant", strength: "moderate", detail: "" }
    ],
    warnings: "Standard aromatherapy dose is safe; high doses have some neurotoxicity concern.",
    found_in: ["Peppermint (23%)"]
  },
  {
    name: "Eugenol", family: "Phenol", aroma: "Clove, spicy, medicinal",
    actions: [
      { effect: "Analgesic (topical)", strength: "strong", detail: "Standard dental analgesic — clove oil for toothache is documented back to 13th c. Blocks voltage-gated sodium channels like lidocaine." },
      { effect: "Antimicrobial", strength: "strong", detail: "Broad-spectrum including anaerobes." },
      { effect: "Anti-inflammatory", strength: "moderate", detail: "" },
      { effect: "Antioxidant", strength: "moderate", detail: "" }
    ],
    warnings: "SEVERE dermal sensitizer above 0.5%. Anticoagulant — avoid with blood thinners.",
    found_in: ["Clove (80%)", "Cinnamon (8%)", "Basil (5%)"]
  },
  {
    name: "(E)-Cinnamaldehyde", family: "Aldehyde", aroma: "Sweet, warm, spicy",
    actions: [
      { effect: "Antimicrobial", strength: "strong", detail: "Among the strongest natural antimicrobials — used in food preservation." },
      { effect: "Blood sugar regulation", strength: "moderate", detail: "Cinnamon extracts (containing cinnamaldehyde) show modest HbA1c reduction in type 2 diabetes." },
      { effect: "Anti-inflammatory", strength: "moderate", detail: "" }
    ],
    warnings: "EXTREME dermal irritant. Max 0.07% skin dilution. Never neat.",
    found_in: ["Cinnamon (70%)"]
  },
  {
    name: "Camphor", family: "Ketone", aroma: "Camphoraceous, medicinal, penetrating",
    actions: [
      { effect: "Circulatory stimulant (topical)", strength: "strong", detail: "Warms tissue via TRPV1 activation." },
      { effect: "Analgesic", strength: "moderate", detail: "Basis for products like Tiger Balm, Vicks." },
      { effect: "Decongestant", strength: "moderate", detail: "" }
    ],
    warnings: "NEUROTOXIC at high doses. Avoid in epilepsy, pregnancy, children under 6.",
    found_in: ["Rosemary (11%)", "Mugwort (15%)"]
  },
  {
    name: "α-Santalol / β-Santalol", family: "Sesquiterpene alcohol", aroma: "Creamy, sweet, woody",
    actions: [
      { effect: "Anxiolytic / sedative", strength: "strong", detail: "The primary calming molecules in sandalwood; EEG studies show alpha wave increase on inhalation." },
      { effect: "Anti-tumor (research)", strength: "moderate", detail: "α-santalol shows chemopreventive activity in skin cancer models." },
      { effect: "Anti-inflammatory", strength: "moderate", detail: "" }
    ],
    warnings: "Very safe.",
    found_in: ["Sandalwood (α: 50%, β: 22%)"]
  },
  {
    name: "Vanillin", family: "Aldehyde (phenolic)", aroma: "Sweet, vanilla, creamy",
    actions: [
      { effect: "Anxiolytic (mild)", strength: "moderate", detail: "Inhaled vanilla reduces startle response in humans." },
      { effect: "Antioxidant", strength: "moderate", detail: "" },
      { effect: "Comforting / associative", strength: "strong", detail: "Vanilla scent triggers early-life feeding memories; used in NICU to reduce infant apnea." }
    ],
    warnings: "Very safe.",
    found_in: ["Vanilla (85%)"]
  },
  {
    name: "Incensole acetate", family: "Diterpene", aroma: "Balsamic, warm, meditative",
    actions: [
      { effect: "Anxiolytic / antidepressant", strength: "moderate", detail: "Activates TRPV3 in the brain — explains why frankincense has been used in temple worship for millennia (Moussaieff 2008)." }
    ],
    warnings: "",
    found_in: ["Frankincense (3%)"]
  }
];

if (typeof module !== 'undefined') module.exports = TERPENES;