import type { CourseConfig } from "../../../components/course/types";
import { COURSE } from "../../../lib/config";

const ENROLL_PATH = "/course/foundation/enroll";

const LECTURE_THUMBS = [
  "/images/FoundationL1.webp",
  "/images/FoundationL2.webp",
  "/images/FoundationL3.webp",
  "/images/FoundationL4.webp",
  "/images/FoundationL5.webp",
  "/images/FoundationL6.webp",
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
    "Six live lectures with Dr. Sunita Tandulwadkar. Built to give every clinical decision a foundation it can rest on. Designed for the doctor who wants to understand the cycle before reading its results.",
  badges: ["6 Lectures", "Live Q&A", "Certificate"],
  videoId: "QkiegbAnFqc",
  videoPoster: "/images/FoundationVid.webp",
  videoBadgeLabel: "Foundation Series · Intro",
  primaryCta: {
    type: "navigate",
    target: ENROLL_PATH,
    label: "Register My Seat",
  },

  lectureEyebrow: "The Curriculum",
  lectureTitle: "Six lectures, one continuous arc",
  lectureNote: "All sessions are paid. Enroll to unlock full access.",
  lectureCardLink: "Enroll to unlock",
  lectureCardTier: "Premium",
  lectures: [
    { id: "lecture-1", label: "Lecture One",   no: "01", title: "300-day Ovarian Symphony - HPO Axis & Follicular Endocrinology",                             body: "The full story of how an oocyte matures over 300 days, the hormonal signal it answers to, and the clinical decisions resting on the biology in front of you.", duration: "90 min · Live", thumb: LECTURE_THUMBS[0], detailPath: "/course/foundation/lecture/01" },
    { id: "lecture-2", label: "Lecture Two",   no: "02", title: "Endocrinology of Follicular Phase",                                                              body: "The hormonal cascade of the follicular phase — FSH thresholds, granulosa cell signalling, and the selection of the dominant follicle read as a clinical system.",   duration: "90 min · Live", thumb: LECTURE_THUMBS[1], detailPath: "/course/foundation/lecture/02" },
    { id: "lecture-3", label: "Lecture Three", no: "03", title: "Ovulation – Physiology / Precision Triggering / Molecular Dynamics to Clinical Applications",    body: "From molecular dynamics to clinical application. Why ovulation works the way it does, when to trigger, and how to adapt when the textbook playbook breaks down.",   duration: "90 min · Live", thumb: LECTURE_THUMBS[2], detailPath: "/course/foundation/lecture/03" },
    { id: "lecture-4", label: "Lecture Four",  no: "04", title: "Luteal Phase Endocrinology and Advances in Luteal Phase Support",                                body: "The corpus luteum as a diagnostic compass. Current evidence on luteal support — when it is mandatory, when it is individualised, and when continuing it is doing nothing.", duration: "90 min · Live", thumb: LECTURE_THUMBS[3], detailPath: "/course/foundation/lecture/04" },
    { id: "lecture-5", label: "Lecture Five",  no: "05", title: "Implantation – Decoding the Molecular Dialogue of Human Embryo Implantation",                    body: "Implantation as a conversation between embryo and endometrium. How endometrial receptivity and embryonic signalling work, and what changes when they do not.",     duration: "90 min · Live", thumb: LECTURE_THUMBS[4], detailPath: "/course/foundation/lecture/05" },
    { id: "lecture-6", label: "Lecture Six",   no: "06", title: "Spermatogenesis - What Everyone Should Know",                                                    body: "Spermatogenesis takes seventy-four days. What the semen analysis reports, which parameters predict outcome, when to refer, and when the male factor has already set the ceiling.", duration: "90 min · Live", thumb: LECTURE_THUMBS[5], detailPath: "/course/foundation/lecture/06" },
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
    headlineAccent: "Complete Six-Lecture Program",
    meta: ["Live on Zoom", COURSE.schedule, `Begins ${COURSE.startDate}`],
    rightLabel: "Enrollment Open",
    rightSub: "Limited seats available",
    cta: "Enroll Now",
  },

  whyTitle: "Why this course exists",
  whyBody:
    "For the doctor who feels they are practising infertility in fragments. Who learned physiology a decade ago and has never formally returned to it. Who treats patients confidently enough, but quietly wonders if they are reading the cycle the way the best specialists do. The Foundation Series exists for that doctor, not to teach new information but to rebuild the framework that everything else sits on.",

  curriculumHeadline: "Six live lectures with Dr. Sunita Tandulwadkar.",
  curriculumSubhead: "What each lecture does for your practice.",
  fullCurriculum: [
    { num: "01", title: "300-day Ovarian Symphony - HPO Axis & Follicular Endocrinology",                           body: "The full story of how an oocyte matures over 300 days, from the first hypothalamic signal through follicular recruitment to ovulation. The biology that every clinical decision sits above, rebuilt from first principles." },
    { num: "02", title: "Endocrinology of Follicular Phase",                                                        body: "The hormonal cascade of the follicular phase in clinical detail — FSH thresholds, granulosa cell aromatase activity, dominant follicle selection, and the estradiol dynamics that set up the LH surge." },
    { num: "03", title: "Ovulation – Physiology / Precision Triggering / Molecular Dynamics to Clinical Applications", body: "From molecular dynamics to clinical application. Why ovulation works the way it does, when to trigger, what makes a trigger succeed or fail, and how to adapt the decision for the specific patient and cycle in front of you." },
    { num: "04", title: "Luteal Phase Endocrinology and Advances in Luteal Phase Support",                          body: "The corpus luteum as a diagnostic compass, not a checkbox. Current evidence on luteal phase support in ART — when it is mandatory, when it is individualised, when continuing past a positive test is doing nothing." },
    { num: "05", title: "Implantation – Decoding the Molecular Dialogue of Human Embryo Implantation",             body: "Implantation is not a timing problem. It is a conversation between the embryo and the endometrium. How endometrial receptivity and embryonic signalling work, and why understanding this changes the way you approach implantation failure." },
    { num: "06", title: "Spermatogenesis - What Everyone Should Know",                                              body: "Male factor accounts for half of all infertility. This lecture covers spermatogenesis from stem cell to ejaculated sperm, how to interpret the semen analysis as a clinical document, and the decisions that follow when the result is abnormal." },
  ],

  asideEyebrow: "Now enrolling",
  asideTitle: "Secure your seat in the inaugural batch.",
  asideDescription:
    "Join Dr. Sunita live for all five Foundation lectures. Seats are limited so the cohort stays small enough for direct teaching.",
  asidePrice: "Rs 3,996 Only",
  asidePriceSub: "Full Foundation Series · Tier I",
  asidePrimaryCta: { type: "navigate", target: ENROLL_PATH, label: "Enroll Now" },
  asideSecondaryCta: { type: "navigate", target: ENROLL_PATH, label: "Ask a question first" },
  perks: [
    "Six live lectures with Dr. Sunita",
    "Live Q&A in every session",
    "Clinical protocol sheets",
    "Certificate on completion",
    COURSE.replayAccess,
  ],

  registerEyebrow: "Register Now",
  registerTitle: "Join the Foundation Series",
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
  panelCta: { type: "navigate", target: ENROLL_PATH, label: "Reserve My Seat" },
};
