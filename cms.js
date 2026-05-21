// ============================================================
// BLC CMS — Edit content here or via Google Sheet connection
// ============================================================

const BLC_CMS = {
  settings: {
    studio_name: "Black Lillie Collective",
    tagline: "A creative studio for those building something worth seeing.",
    email: "madison@blacklilliecollective.com",
    calendly: "https://calendly.com/madison-blacklilliecollective/30min",
    socials: {
      instagram: { handle: "@blacklillieco", url: "https://instagram.com/blacklillieco" },
      tiktok:    { handle: "@blacklillieco", url: "https://tiktok.com/@blacklillieco" },
      x:         { handle: "@blacklillieco", url: "https://x.com/blacklillieco" },
      facebook:  { handle: "@blacklilliecollective", url: "https://facebook.com/blacklilliecollective" },
      pinterest: { handle: "@blacklilliecollective", url: "https://pinterest.com/blacklilliecollective" },
    }
  },
  forms: {
    inquiry: "https://tally.so/r/jaJ8bR",
    print:   "https://tally.so/r/68W67o",
    ugc:     "https://tally.so/r/68W62o",
  },
  services: [
    { name: "Print & Design",            form: "print",   description: "Full client print suites — invitation suites, menus, packaging, brand collateral, editorial layouts. We design every piece with the same intention you'd give a magazine spread.", cta: "Request a Quote" },
    { name: "UGC Creation",              form: "ugc",     description: "Editorial UGC for beauty, fragrance, fashion, lifestyle, and travel brands. Native-feeling content with a directorial point of view — not influencer-style filler.", cta: "Request a Quote" },
    { name: "Social Media Management",   form: "inquiry", description: "Full-service Instagram and TikTok management — content strategy, calendar, creation, captions, and community. For brands that want their feed to feel curated, not cobbled.", cta: "Begin Inquiry" },
    { name: "Brand & Creative Strategy", form: "inquiry", description: "Positioning, voice, visual direction, and creative strategy for founders building from scratch or rebuilding what's not working. The thinking that comes before the design.", cta: "Begin Inquiry" },
    { name: "Events & Coverage",         form: "inquiry", description: "On-site editorial coverage for launches, dinners, brand activations, and personal events. Photo, short-form video, and same-day social deliverables.", cta: "Begin Inquiry" },
  ],
  portfolio: [
    { name: "Maison Noir",    category: "Brand",    image: "", featured: true  },
    { name: "Velvet Hour",    category: "UGC",      image: "", featured: true  },
    { name: "Soft Bloom",     category: "Print",    image: "", featured: true  },
    { name: "Mara & Co.",     category: "Brand",    image: "", featured: false },
    { name: "Cellaria",       category: "Print",    image: "", featured: false },
    { name: "Vesper",         category: "Strategy", image: "", featured: false },
  ],
  story: {
    headline: "A studio born in defiance.",
    pull_quote: "I started Black Lillie Collective for the people who knew their work deserved more than a template.",
    body: [
      "Black Lillie Collective began with a simple frustration — too many brands settling for design that looked almost good enough. Almost on-brand. Almost editorial. Almost the thing they imagined.",
      "I built BLC to close that gap. To be the studio I wished I'd had access to when I was first building things — one with taste, restraint, and a refusal to phone anything in.",
      "Every project that comes through these doors gets the same thing: an editorial eye trained on European magazines and dark-feminine sensibilities, an obsession with the small details, and the kind of intentionality that makes people stop scrolling.",
      "If you're building something worth seeing, we should probably talk."
    ],
    founder_name: "Madi Gullatte",
    founder_title: "Founder & Creative Director",
    photo: ""
  },
  process: [
    { numeral: "i.",   title: "Inquiry",        body: "Send us a note or book a call. We respond within 48 hours." },
    { numeral: "ii.",  title: "Discovery Call", body: "A 30-minute call to understand your vision, goals, and what you're really after." },
    { numeral: "iii.", title: "Proposal",       body: "A custom scope, timeline, and quote tailored to your project." },
    { numeral: "iv.",  title: "Onboarding",     body: "Contract, deposit, welcome kit, and your project officially begins." },
    { numeral: "v.",   title: "Delivery",       body: "Final files, brand guidelines, and ongoing support as you launch." },
  ]
};
