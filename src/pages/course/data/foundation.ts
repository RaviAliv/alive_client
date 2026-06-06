import type { CourseConfig } from "../../../components/course/types";
import { COURSE, ENROLL_URL } from "../../../lib/config";

const LECTURE_THUMBS = [
  "/images/Foundation.webp",
  "/images/embryo.webp",
  "/images/jugment.webp",
  "/images/mam2.webp",
  "/images/dna-pattern.webp",
];

export const foundationConfig: CourseConfig = {
  slug: "foundation",
  letter: "F",
  tierLabel: "Tier I — Foundation",
  title: "Foundation",
  titleSuffix: "Series",
  accent: "t-green",
  status: "live",
  statusLabel: COURSE.enrollmentLabel,

  subtitle: "The biology layer of reproductive medicine",
  description:
    "Five live lectures with Dr. Sunita Tandulwadkar. Built to give every clinical decision a foundation it can rest on. Designed for the doctor who wants to understand the cycle before reading its results.",
  badges: ["5 Lectures", "Live Q&A", "Certificate"],
  videoId: "QkiegbAnFqc",
  videoBadgeLabel: "Foundation Series · Intro",
  primaryCta: {
    type: "anchor",
    target: ENROLL_URL,
    label: "Register My Seat",
  },

  lectureEyebrow: "The Curriculum",
  lectureTitle: "Five lectures, one continuous arc",
  lectureNote: "All sessions are paid. Enroll to unlock full access.",
  lectureCardLink: "Enroll to unlock",
  lectureCardTier: "Premium",
  lectures: [
    { id: "lecture-1", label: "Lecture One",   no: "01", title: "The Complete Arc of the Ovarian Cycle",         body: "The full story of how an oocyte matures over 300 days, the hormonal signal it answers to, and the clinical decisions resting on the biology in front of you.", duration: "90 min · Live", thumb: LECTURE_THUMBS[0], detailPath: "/course/foundation/lecture/01" },
    { id: "lecture-2", label: "Lecture Two",   no: "02", title: "Ovulation, Triggering, and Timing",              body: "The physiology of ovulation in clinical practice. Why it works, how to adapt when the textbook playbook breaks down in front of a real patient.",          duration: "90 min · Live", thumb: LECTURE_THUMBS[1], detailPath: "/course/foundation/lecture/02" },
    { id: "lecture-3", label: "Lecture Three", no: "03", title: "Reading the Luteal Phase as a Clinical Signal",  body: "The luteal phase as a diagnostic compass, not a checkbox. How to recognise what a luteal phase is telling you, and how to support it intelligently.",   duration: "90 min · Live", thumb: LECTURE_THUMBS[2], detailPath: "/course/foundation/lecture/03" },
    { id: "lecture-4", label: "Lecture Four",  no: "04", title: "The Molecular Dialogue of Implantation",         body: "Implantation as a conversation between embryo and endometrium. Understand how endometrial receptivity and embryonic signalling actually work.",         duration: "90 min · Live", thumb: LECTURE_THUMBS[3], detailPath: "/course/foundation/lecture/04" },
    { id: "lecture-5", label: "Lecture Five",  no: "05", title: "The Precision Diagnostic Roadmap",               body: "How to evaluate a fertility patient with precision, not breadth. What to test, what to skip, and how to interpret every result in clinical context.",  duration: "90 min · Live", thumb: LECTURE_THUMBS[4], detailPath: "/course/foundation/lecture/05" },
  ],

  pathway: {
    eyebrow: "The Pathway",
    title: "Foundation is the first step. The biology that every clinical decision sits above.",
    body: "Foundation is where the specialist's understanding begins. The HPO axis, the ovarian cycle, the molecular dialogue of implantation — the biology that every protocol, every trigger decision, and every transfer call depends on. The doctor who finishes Foundation reads a cycle the way a specialist reads it. Core, Advanced, and Masterclass follow from here.",
    steps: [
      { label: "Foundation",  desc: "The biology",            status: "Enrolling Now",        tier: "foundation"  as const },
      { label: "Core",        desc: "The clinical decisions", status: "Opens after Foundation", tier: "core"        as const },
      { label: "Advanced",    desc: "The IVF protocols",      status: "Opens after Core",      tier: "advanced"    as const },
      { label: "Masterclass", desc: "The hardest cases",      status: "Opens after Advanced",  tier: "masterclass" as const },
    ],
  },

  ribbon: {
    eyebrow: "Foundation Series",
    headline: "Enroll in the",
    headlineAccent: "Complete Five-Lecture Program",
    meta: ["Live on Zoom", COURSE.schedule, `Begins ${COURSE.startDate}`],
    rightLabel: "Enrollment Open",
    rightSub: "Limited seats available",
    cta: "Enroll Now",
  },

  whyTitle: "Why this course exists",
  whyBody:
    "For the doctor who feels they are practising infertility in fragments. Who learned physiology a decade ago and has never formally returned to it. Who treats patients confidently enough, but quietly wonders if they are reading the cycle the way the best specialists do. The Foundation Series exists for that doctor, not to teach new information but to rebuild the framework that everything else sits on.",

  curriculumHeadline: "Five live lectures with Dr. Sunita Tandulwadkar.",
  curriculumSubhead: "What each lecture does for your practice.",
  fullCurriculum: [
    { num: "01", title: "The Complete Arc of the Ovarian Cycle",         body: "The full story of how an oocyte matures over 300 days, from the first hormonal signal through to ovulation. Where every clinical decision actually sits on the biology, and what you gain by seeing the whole arc instead of the single month in front of you." },
    { num: "02", title: "Ovulation, Triggering, and Timing",             body: "From molecular dynamics to clinical application. Why ovulation works the way it does, when to trigger, what makes a trigger succeed or fail, and how to adapt when the textbook playbook breaks down in front of a real patient." },
    { num: "03", title: "Reading the Luteal Phase as a Clinical Signal", body: "The corpus luteum as a diagnostic compass, not a checkbox. Current understanding of luteal phase support. How to recognise what a luteal phase is telling you, and how to support it intelligently in the right patient." },
    { num: "04", title: "The Molecular Dialogue of Implantation",        body: "Implantation is not a timing problem. It is a conversation between the embryo and the endometrium. Understand how endometrial receptivity and embryonic signalling actually work, and why this changes the way you think about implantation failure." },
    { num: "05", title: "The Precision Diagnostic Roadmap",              body: "How to evaluate a fertility patient with precision, not breadth. What to test, what to skip, and how to interpret every result in the full clinical context. The diagnostic philosophy that separates efficient practice from exhaustive over-investigation." },
  ],

  asideEyebrow: "Now enrolling",
  asideTitle: "Secure your seat in the inaugural batch.",
  asideDescription:
    "Join Dr. Sunita live for all five Foundation lectures. Seats are limited so the cohort stays small enough for direct teaching.",
  asidePrice: "Rs 3,996 Only",
  asidePriceSub: "Full Foundation Series · Tier I",
  asidePrimaryCta: { type: "anchor", target: ENROLL_URL, label: "Enroll Now" },
  asideSecondaryCta: { type: "anchor", target: ENROLL_URL, label: "Ask a question first" },
  perks: [
    "Five live lectures with Dr. Sunita",
    "Live Q&A in every session",
    "Clinical protocol sheets",
    "Certificate on completion",
    COURSE.replayAccess,
  ],

  registerEyebrow: "Register Now",
  registerTitle: "Join the Foundation Series.",
  registerDescription: "Reach out with any question about the programme, eligibility, or schedule. We respond to every enquiry.",
  registerItems: [
    { icon: "📅", text: "Wednesdays · 8:00 PM IST" },
    { icon: "🖥", text: "Live on Zoom — attend from anywhere" },
    { icon: "🎓", text: "Certificate on completion" },
    { icon: "💬", text: "Interactive Q&A every session" },
  ],
  registerStartsLabel: "Series begins",
  registerStartsValue: COURSE.startDate,
  panelEyebrow: "Foundation Series · Tier I",
  panelTitle: "Talk to the Academy team.",
  panelDescription: "Direct line to the people who will be teaching the cohort. No forms, no funnels.",
  panelCta: { type: "anchor", target: ENROLL_URL, label: "Reserve My Seat" },
};
