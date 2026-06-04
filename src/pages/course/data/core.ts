import type { CourseConfig } from "../../../components/course/types";

const LECTURE_THUMBS = [
  "/images/Foundation.webp",
  "/images/embryo.webp",
  "/images/jugment.webp",
  "/images/mam2.webp",
  "/images/dna-pattern.webp",
];

export const coreConfig: CourseConfig = {
  slug: "core",
  letter: "C",
  tierLabel: "Tier II — Core",
  title: "Core",
  titleSuffix: "Series",
  accent: "t-gold",
  status: "waitlist",
  statusLabel: "Opens after Foundation",

  subtitle: "The clinical decisions, taught at the level a fertility doctor actually makes them",
  description:
    "Five live lectures with Dr. Sunita Tandulwadkar. Designed for the doctor who has the biology straight, and is now ready to think clinically — about the cases a textbook does not make decisions for you on.",
  badges: ["5 Lectures", "Live Q&A", "Certificate"],
  videoId: "QkiegbAnFqc",
  videoBadgeLabel: "Core Series · Intro",
  primaryCta: { type: "anchor", target: "#register", label: "Notify Me When Core Opens" },

  lectureEyebrow: "The Curriculum",
  lectureTitle: "Five lectures, where biology meets the patient",
  lectureNote: "Opens after the first Foundation cohort closes.",
  lectureCardLink: "Opens after Foundation",
  lectureCardTier: "Tier II",
  lectures: [
    { id: "lecture-1", label: "Lecture One",   no: "01", title: "Severe Male Factor and the Limits of Routine Workup", body: "When oligoasthenoteratozoospermia is the diagnosis on paper, the clinical question is what to do next. How to read a poor semen analysis with precision, what is salvageable, and when to stop trying to optimize what cannot be optimized.", duration: "90 min · Live", thumb: LECTURE_THUMBS[0] },
    { id: "lecture-2", label: "Lecture Two",   no: "02", title: "Oocyte Quality and the Follicular Microenvironment",   body: "Why some oocytes look right and behave wrong. The bioenergetic picture of the ovary, the early signs of reproductive aging, and what can and cannot be done to reprogram outcomes.",                                                       duration: "90 min · Live", thumb: LECTURE_THUMBS[1] },
    { id: "lecture-3", label: "Lecture Three", no: "03", title: "Ovulation Induction for IUI, Read Like a Clinician",   body: "The protocols are well known. The judgment is not. How to choose induction agents and dosing for the specific patient, not the average one.",                                                                                                duration: "90 min · Live", thumb: LECTURE_THUMBS[2] },
    { id: "lecture-4", label: "Lecture Four",  no: "04", title: "IUI Monitoring and Outcome Optimization",              body: "The cycle does not end when the trigger is given. How to monitor an IUI cycle in real time, what the follicle and endometrium are telling you on each scan.",                                                                                duration: "90 min · Live", thumb: LECTURE_THUMBS[3] },
    { id: "lecture-5", label: "Lecture Five",  no: "05", title: "Pelvic Infections and the Chronic Inflammation Cascade", body: "The diagnosis that gets missed because no one is looking for it. How chronic pelvic inflammation quietly shapes implantation, ovulation, and tubal function.",                                                                              duration: "90 min · Live", thumb: LECTURE_THUMBS[4] },
  ],

  pathway: {
    eyebrow: "The Pathway",
    title: "Core is the second step. Foundation precedes it. Advanced and Masterclass follow.",
    body: "By the time a doctor reaches Core, they have completed Foundation and understand the biology underneath the cycle. Core is the clinical layer — the decisions that sit above the physiology. The cases that could go multiple ways. The judgment that separates a good outcome from a missed one. Core assumes the foundation is in place and builds the clinical reasoning above it.",
    steps: [
      { label: "Foundation",  desc: "The biology",            status: "Prerequisite",          tier: "foundation"  as const },
      { label: "Core",        desc: "The clinical decisions", status: "Opens after Foundation", tier: "core"        as const },
      { label: "Advanced",    desc: "The IVF protocols",      status: "Opens after Core",       tier: "advanced"    as const },
      { label: "Masterclass", desc: "The hardest cases",      status: "Opens after Advanced",   tier: "masterclass" as const },
    ],
  },

  ribbon: {
    eyebrow: "Core Series",
    headline: "Join the waitlist for the",
    headlineAccent: "Five-Lecture Core Program",
    meta: ["Live on Zoom", "Opens after Foundation", "Schedule TBA"],
    rightLabel: "Waitlist Open",
    rightSub: "First notified, first enrolled",
    cta: "Notify Me",
  },

  whyTitle: "Why this course exists",
  whyBody:
    "For the doctor who has been in practice long enough to know what works most of the time, and quiet enough to admit that the cases that do not respond are the ones they think about on the way home. Core is for those cases — the patient whose semen analysis is bad in a way that no protocol fixes, the cycle that keeps producing the wrong oocyte, the IUI patient who has done everything right and still has not conceived, the chronic pelvic inflammation no one tested for. Core teaches the layer where clinical judgment is built, one difficult case at a time.",

  curriculumHeadline: "Five live lectures with Dr. Sunita Tandulwadkar.",
  curriculumSubhead: "What each lecture does for your practice.",
  fullCurriculum: [
    { num: "01", title: "Severe Male Factor and the Limits of Routine Workup", body: "The semen analysis report tells you what is wrong. It does not tell you what to do next. This lecture covers the framework for assessing severe male factor infertility — what oligoasthenoteratozoospermia actually predicts, when to escalate to advanced tests, when to refer for surgical retrieval, and how to set realistic expectations." },
    { num: "02", title: "Oocyte Quality and the Follicular Microenvironment",  body: "Oocyte quality is the variable that decides most IVF outcomes, and the one clinicians have the least control over. The bioenergetic picture of the ovary, the cellular signals that distinguish a competent oocyte from a compromised one, and frameworks for ovarian aging that go beyond AMH." },
    { num: "03", title: "Ovulation Induction for IUI, Read Like a Clinician",  body: "Letrozole, clomiphene, gonadotropins. The agents are well known and the protocols are written down. The clinical question is which agent, which dose, for which patient, and what to watch for once the cycle is in motion." },
    { num: "04", title: "IUI Monitoring and Outcome Optimization",             body: "The lecture on what happens between Day 2 and the pregnancy test. How to monitor follicular development in real time, endometrial thickness and pattern, timing of the trigger, and the post-trigger window where small decisions compound." },
    { num: "05", title: "Pelvic Infections and the Chronic Inflammation Cascade", body: "The most underdiagnosed problem in routine infertility workup. How chronic pelvic infections, including subclinical endometritis and silent tubal disease, shape implantation, ovulation, and reproductive outcomes." },
  ],

  asideEyebrow: "Opening soon",
  asideTitle: "Be the first to know when Core opens.",
  asideDescription: "Core opens after the first Foundation cohort closes. Leave your details and we will write to you when enrolment opens, with full schedule and pricing.",
  asidePrice: "Pricing TBA",
  asidePriceSub: "Core Series · Tier II",
  asidePrimaryCta: { type: "anchor", target: "#register", label: "Notify Me" },
  asideSecondaryCta: { type: "navigate", target: "/course/foundation", label: "See Foundation first" },
  perks: [
    "Five live lectures with Dr. Sunita",
    "Live Q&A in every session",
    "Clinical protocol sheets",
    "Certificate on completion",
    "Replay access after the live cohort closes",
  ],

  registerEyebrow: "Register Interest",
  registerTitle: "Join the Core waitlist.",
  registerDescription: "Reach out with any question about Core, the pathway, or how it follows on from Foundation. We respond to every enquiry.",
  registerItems: [
    { icon: "🔓", text: "Opens after first Foundation cohort closes" },
    { icon: "🖥", text: "Live on Zoom — attend from anywhere" },
    { icon: "🎓", text: "Certificate on completion" },
    { icon: "💬", text: "Interactive Q&A every session" },
  ],
  registerStartsLabel: "Foundation begins",
  registerStartsValue: "15 July 2026",
  panelEyebrow: "Core Series · Tier II",
  panelTitle: "Talk to the Academy team.",
  panelDescription: "Direct line to the people who will be teaching the cohort. No forms, no funnels.",
  panelCta: { type: "navigate", target: "/contact", label: "Notify Me When Core Opens" },
};
