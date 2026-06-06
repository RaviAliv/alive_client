import type { CourseConfig } from "../../../components/course/types";
import { ENROLL_URL } from "../../../lib/config";

const LECTURE_THUMBS = [
  "/images/Advanced.webp",
  "/images/embryo.webp",
  "/images/dna-pattern.webp",
  "/images/Foundation.webp",
  "/images/mam2.webp",
  "/images/Advanced.webp",
  "/images/embryo.webp",
];

export const advancedConfig: CourseConfig = {
  slug: "advanced",
  letter: "A",
  tierLabel: "Tier III — Advanced",
  title: "Advanced",
  titleSuffix: "Series.",
  accent: "t-blue",
  status: "waitlist",
  statusLabel: "Opens after Core",

  subtitle: "The IVF protocol layer of reproductive medicine",
  description:
    "Seven live lectures with Dr. Sunita Tandulwadkar. Covering the protocol-level decisions inside an IVF cycle, from stimulation and retrieval to embryology, transfer, and implantation. Designed for the doctor who already runs cycles and is ready to refine the decisions inside them.",
  badges: ["7 Lectures", "Live Q&A", "Protocol Sheets", "Certificate"],
  videoId: "QkiegbAnFqc",
  videoBadgeLabel: "Advanced Series · Intro",
  primaryCta: { type: "anchor", target: ENROLL_URL, label: "Notify Me When Advanced Opens" },

  lectureEyebrow: "The Curriculum",
  lectureTitle: "Seven lectures, where the cycle stops being predictable",
  lectureNote: "The decisions a practising IVF specialist actually makes, taught by Dr. Sunita",
  lectureCardLink: "Opens After Core",
  lectureCardTier: "Tier III",
  lectures: [
    { id: "lecture-1", label: "Lecture One",   no: "01", title: "Choosing the Right Stimulation Protocol",            body: "The decision that shapes everything else. How to match the protocol to the patient, not the average, and how to know which patient is going to fight the protocol you chose.",                                                                                              duration: "90 min · Live", thumb: LECTURE_THUMBS[0] },
    { id: "lecture-2", label: "Lecture Two",   no: "02", title: "OHSS Prevention and Safety",                         body: "The complication you can predict, and the protocols that prevent it. How to read a high-responder before the cycle confirms it, and the safety frameworks that keep the patient out of the emergency room.",                                                            duration: "90 min · Live", thumb: LECTURE_THUMBS[1] },
    { id: "lecture-3", label: "Lecture Three", no: "03", title: "Oocyte Retrieval, Tips and Tricks for Difficult Ovaries", body: "The retrieval the textbook does not prepare you for. Inaccessible ovaries, bleeding risk, the small adjustments to needle path and aspiration pressure that make the difference between a complete retrieval and a partial one.",                               duration: "90 min · Live", thumb: LECTURE_THUMBS[2] },
    { id: "lecture-4", label: "Lecture Four",  no: "04", title: "Embryology for Clinicians",                          body: "What happens to the embryo after it leaves your hand. Grading systems, the lab variables that move outcomes, and the decision points where the clinician and the embryologist need to talk to each other.", duration: "90 min · Live", thumb: LECTURE_THUMBS[3] },
    { id: "lecture-5", label: "Lecture Five",  no: "05", title: "Optimising IVF Implantation",                        body: "The variables you actually control on transfer day. Endometrial readiness, embryo selection, the molecular signals between embryo and endometrium, and what to change when implantation keeps failing.",                           duration: "90 min · Live", thumb: LECTURE_THUMBS[4] },
    { id: "lecture-6", label: "Lecture Six",   no: "06", title: "Troubleshooting Embryo Transfer",                    body: "The transfer that does not go to plan. Difficult catheter passage, cervical anatomy, retained mucus, and the techniques that recover a difficult transfer before it becomes a lost cycle.",                                                                             duration: "90 min · Live", thumb: LECTURE_THUMBS[5] },
    { id: "lecture-7", label: "Lecture Seven", no: "07", title: "Ovarian Rejuvenation via Intraovarian PRP",          body: "The emerging frontier in poor-responder care. The evidence base for autologous PRP in the ovary, patient selection, protocol design, and how to set realistic expectations when the conversation comes up in clinic.",                                                  duration: "90 min · Live", thumb: LECTURE_THUMBS[6] },
  ],

  pathway: {
    eyebrow: "The Pathway",
    title: "Advanced is the third step. Two come before it for a reason.",
    body: "By the time a doctor reaches Advanced, they have moved through the biology and the clinical reasoning that sits above it. Advanced is the layer underneath the protocol, where the protocol is no longer something you pick from a list but something you defend in front of a patient who is not the textbook patient. The lectures assume you already run cycles. They teach you to run them better.",
    steps: [
      { label: "Foundation",  desc: "The biology",            status: "Prerequisite",     tier: "foundation"  as const },
      { label: "Core",        desc: "The clinical decisions", status: "Prerequisite",     tier: "core"        as const },
      { label: "Advanced",    desc: "The IVF protocols",      status: "Opens after Core", tier: "advanced"    as const },
      { label: "Masterclass", desc: "The hardest cases",      status: "After Advanced",   tier: "masterclass" as const },
    ],
  },

  progression: {
    eyebrow: "Why This Order",
    heading: "You don't learn to defend a protocol until you've learned to read the cycle underneath it.",
    paragraphs: [
      "Foundation teaches the biology. The reader who finishes it sees the cycle the way a specialist does.",
      "Core teaches what to do with that biology. The reader who finishes it has the judgment to make the clinical call.",
      "Advanced teaches the protocol-level decisions, and how to defend them when a cycle does not behave. The reader who finishes it can hold a cycle together when it starts to come apart.",
      "Masterclass is where the protocol runs out. The reader who finishes it can reason through the cases that have no standard answer."
    ],
    closingQuote: "The Academy teaches in sequence because a specialist is built in sequence. Skipping the order means making protocol decisions on cycles you cannot read.",
  },

  specialist: {
    eyebrow: "Written for the Practising Specialist",
    heading: "You already know how to run a cycle. Advanced is for the cycles that do not behave the way you ran them.",
    paragraphs: [
      "This is not a course for someone learning IVF. It is a course for someone already doing IVF, who has built a practice on protocols that work most of the time, and who has the quiet awareness that the cycles that did not work were the ones they think about. The poor responder. The retrieval that bled. The embryo grade you were not sure how to interpret. The transfer that fought you. The implantation that kept failing without a clear reason.",
      "Advanced exists for those cycles. Not to overturn what you already do, but to refine it, in the company of a specialist who has worked through every one of these scenarios across three decades, and who teaches the way she practices — pragmatically, with the patient in front of her, in a register that respects the doctor on the other end of the call.",
    ],
  },

  notifyCard: {
    eyebrow: "Stay Informed",
    title: "Be the first to know when Advanced opens.",
    body: "Advanced opens after the first Core cohort closes. Leave your details and we will write to you when enrolment opens, with the full schedule and pricing.",
    fineprint: "One email when Advanced opens. No other marketing.",
  },

  whyQuote: "For the IVF specialist who is past the stage of learning the cycle and into the stage of defending the protocol. For the doctor who has run enough cycles to know that the ones that work do not always teach as much as the ones that did not. For the practitioner who is good enough at their job to want to be better, and senior enough to recognise that the next layer of learning has to come from someone who has lived inside these decisions for thirty-five years. Advanced is built for that doctor.",

  ribbon: {
    eyebrow: "Advanced Series",
    headline: "Join the waitlist for the",
    headlineAccent: "Seven-Lecture Advanced Program",
    meta: ["Live on Zoom", "Opens after Core", "Schedule TBA"],
    rightLabel: "Waitlist Open",
    rightSub: "First notified, first enrolled",
    cta: "Notify Me",
  },

  whyTitle: "Written for the Practising Specialist",
  whyBody:
    "This is not a course for someone learning IVF. It is a course for someone already doing IVF, who has built a practice on protocols that work most of the time, and who has the quiet awareness that the cycles that did not work were the ones they think about. The poor responder. The retrieval that bled. The embryo grade you were not sure how to interpret. The transfer that fought you. The implantation that kept failing without a clear reason. Advanced exists for those cycles. Not to overturn what you already do, but to refine it, in the company of a specialist who has worked through every one of these scenarios across three decades, and who teaches the way she practices — pragmatically, with the patient in front of her, in a register that respects the doctor on the other end of the call.",

  curriculumHeadline: "Seven live lectures with Dr. Sunita Tandulwadkar.",
  curriculumSubhead: "What each lecture does for your practice.",
  fullCurriculum: [
    { num: "01", title: "Choosing the Right Stimulation Protocol",            body: "The protocol decision shapes every other decision that follows in the cycle. This lecture covers the framework for matching protocol to patient — agonist versus antagonist, the role of AMH and AFC in protocol selection, gonadotropin dosing for the responder you actually have versus the average responder the textbook describes, and the early-warning signs that tell you the protocol is going to fight you before the cycle confirms it." },
    { num: "02", title: "OHSS Prevention and Safety",                         body: "The complication that should never happen and still does. How to predict the high-responder before stimulation begins. The protocols, triggers, and adjuncts that prevent OHSS rather than treat it after the fact. The patient counselling that earns informed consent for a high-risk cycle. The escalation pathway when prevention is not enough and the patient is in front of you with symptoms." },
    { num: "03", title: "Oocyte Retrieval, Tips and Tricks for Difficult Ovaries", body: "The retrieval the standard training does not prepare you for. Ovaries hidden behind the bowel, ovaries fixed by endometriosis, ovaries that bleed easily. The needle-path adjustments, aspiration pressure refinements, and surgical decisions that recover a difficult retrieval. The cases where you stop and the cases where you continue, taught with the surgical instinct that takes years to build." },
    { num: "04", title: "Embryology for Clinicians",                          body: "What happens to the embryo from the moment it leaves your hand to the moment it returns to it. Embryo grading systems, the lab variables that quietly move outcomes, the difference between a Day 3 and a Day 5 transfer for this patient, and the decision points where the clinician and the embryologist need to be talking. How to read an embryology report the way an embryologist reads it." },
    { num: "05", title: "Optimising IVF Implantation",                        body: "The variables you actually control on transfer day. Endometrial readiness, the receptivity window, embryo selection, transfer technique. The molecular dialogue between embryo and endometrium that decides whether implantation happens. What to change when implantation keeps failing in a patient whose cycle otherwise looked good, and the diagnostic workup that finds the answer." },
    { num: "06", title: "Troubleshooting Embryo Transfer",                    body: "The transfer that does not go to plan. Difficult catheter passage, sharp angulation, cervical stenosis, retained mucus, blood on the catheter tip. The real-time techniques that recover a difficult transfer in the moment. When to abort and reschedule, when to push through, and the small details of technique that compound into the difference between a successful cycle and a wasted embryo." },
    { num: "07", title: "Ovarian Rejuvenation via Intraovarian PRP",          body: "The emerging frontier in poor-responder care. The biological rationale for autologous PRP in the ovary, the current evidence base, the patient selection that separates plausible candidates from inappropriate ones, and the protocol design Dr. Sunita uses in her own institutions. How to have the conversation honestly when a patient asks about regenerative options that are not yet standard of care." },
  ],
  curriculumFootnote: "Seven live lectures, each ninety minutes, with Dr. Sunita Tandulwadkar.",

  asideEyebrow: "Stay Informed",
  asideTitle: "Be the first to know when Advanced opens.",
  asideDescription: "Advanced opens after the first Core cohort closes. Leave your details and we will write to you when enrolment opens, with the full schedule and pricing.",
  asidePrice: "Pricing TBA",
  asidePriceSub: "Advanced Series · Tier III",
  asidePrimaryCta: { type: "anchor", target: ENROLL_URL, label: "Notify Me" },
  asideSecondaryCta: { type: "navigate", target: "/course/foundation", label: "Start with Foundation" },
  perks: [
    "Seven live lectures with Dr. Sunita",
    "Live Q&A in every session",
    "Clinical protocol sheets",
    "Certificate on completion",
    "Replay access after the live cohort closes",
  ],

  registerEyebrow: "Register Interest",
  registerTitle: "Join the Advanced waitlist.",
  registerDescription: "Reach out with any question about Advanced, the pathway, or how the three programmes relate to each other. We respond to every enquiry.",
  registerItems: [
    { icon: "🔓", text: "Opens after Core cohort closes" },
    { icon: "🖥", text: "Live on Zoom — attend from anywhere" },
    { icon: "🎓", text: "Certificate on completion" },
    { icon: "💬", text: "Interactive Q&A every session" },
  ],
  registerStartsLabel: "Foundation begins",
  registerStartsValue: "15 July 2026",
  panelEyebrow: "Advanced Series · Tier III",
  panelTitle: "Talk to the Academy team.",
  panelDescription: "Direct line to the people who will be teaching the cohort. No forms, no funnels.",
  panelCta: { type: "anchor", target: ENROLL_URL, label: "Notify Me When Advanced Opens" },
};
