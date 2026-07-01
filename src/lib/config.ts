/* ─── Enrollment ─────────────────────────────────────────── */
export const ENROLL_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSduQDFdV0zpJH03gFnB6TX0VtXO8etDndnhII_pzLW5o-lHUQ/viewform";

/* ─── Course schedule ─────────────────────────────────────── */
export const COURSE = {
  startDate:       "15th july 2026",
  enrollmentLabel: "Now Enrolling · July 2026",
  schedule:        "Wednesdays · 8 PM IST",
  scheduleFull:    "Live on Zoom · Wednesdays 8 PM IST · Begins 15th july 2026",
  replayAccess:    "Six weeks of replay access after the live cohort closes",
} as const;

/* ─── Foundation pricing ─────────────────────────────────── */
export const PRICING = {
  each:        999,
  gstPct:      18,                              // 18% GST added on top
  discountPct: 40,                              // bundle discount (all 6)
  bundleFull:  999 * 6,                         // 5994 — full price without discount
  bundlePrice: Math.round(999 * 6 * 0.6),       // 3597 — after 40% off
  get bundleSave() { return this.bundleFull - this.bundlePrice; }, // 2397
} as const;

/* ─── Media ──────────────────────────────────────────────── */
export const VIDEOS = {
  foundationIntro: "QkiegbAnFqc",
} as const;
