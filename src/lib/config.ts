/* ─── Course schedule ─────────────────────────────────────── */
export const COURSE = {
  startDate:       "15 July 2026",
  enrollmentLabel: "Now Enrolling · July 2026",
  schedule:        "Wednesdays · 8 PM IST",
  scheduleFull:    "Live on Zoom · Wednesdays 8 PM IST · Begins 15 July 2026",
  replayAccess:    "Six weeks of replay access after the live cohort closes",
} as const;

/* ─── Foundation pricing ─────────────────────────────────── */
export const PRICING = {
  each:        999,
  bundleFull:  999 * 5,                      // 4995
  bundlePrice: Math.round(999 * 5 * 0.8),    // 3996 — exactly 20% off
  get bundleSave() { return this.bundleFull - this.bundlePrice; }, // 999
  discountPct: 20,
} as const;

/* ─── Media ──────────────────────────────────────────────── */
export const VIDEOS = {
  foundationIntro: "QkiegbAnFqc",
} as const;
