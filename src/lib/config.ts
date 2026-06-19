/* ─── Enrollment ─────────────────────────────────────────── */
export const ENROLL_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSduQDFdV0zpJH03gFnB6TX0VtXO8etDndnhII_pzLW5o-lHUQ/viewform";

/* ─── Course schedule ─────────────────────────────────────── */
export const COURSE = {
  startDate:       "15 July 2026",
  enrollmentLabel: "Now Enrolling · July 2026",
  schedule:        "Wednesdays · 8 PM IST",
  scheduleFull:    "Live on Zoom · Wednesdays 8 PM IST · Begins 15 July 2026",
  replayAccess:    "Six weeks of replay access after the live cohort closes",
} as const;

/* ─── Foundation pricing ─────────────────────────────────── */
// TEMP: ₹1 test prices — restore each: 999 before going live
export const PRICING = {
  each:        1,
  bundleFull:  1 * 6,                        // 6
  bundlePrice: Math.round(1 * 6 * 0.8),      // 5 — exactly 20% off
  get bundleSave() { return this.bundleFull - this.bundlePrice; }, // 1
  discountPct: 20,
} as const;

/* ─── Media ──────────────────────────────────────────────── */
export const VIDEOS = {
  foundationIntro: "QkiegbAnFqc",
} as const;
