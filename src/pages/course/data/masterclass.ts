import type { CourseConfig } from "../../../components/course/types";
import { ENROLL_URL } from "../../../lib/config";

const LECTURE_THUMBS = [
  "/images/Masterclass.webp",
  "/images/embryo.webp",
  "/images/dna-pattern.webp",
  "/images/mam2.webp",
  "/images/jugment.webp",
  "/images/Foundation.webp",
  "/images/Advanced.webp",
  "/images/Core.webp",
  "/images/dna-pattern.webp",
  "/images/Masterclass.webp",
];

export const masterclassConfig: CourseConfig = {
  slug: "masterclass",
  letter: "M",
  tierLabel: "Tier IV — Masterclass",
  title: "Masterclass",
  titleSuffix: "Series",
  accent: "t-red",
  status: "waitlist",
  statusLabel: "Opens after Advanced",

  subtitle: "The complex-case layer of reproductive medicine",
  description:
    "Ten live lectures with Dr. Sunita Tandulwadkar. Covering the hardest cases in reproductive medicine, from recurrent implantation failure and pregnancy loss to diminished ovarian reserve and severe male factor. Designed for the doctor working where protocols run out and judgment takes over",
  badges: ["10 Lectures", "Live Q&A", "Case-Driven", "Certificate"],
  videoId: "JSS-eFMv_cs",
  videoPoster: "/images/MasterclassVid.webp",
  videoBadgeLabel: "Masterclass Series · Intro",
  primaryCta: { type: "anchor", target: ENROLL_URL, label: "Notify Me When Masterclass Opens" },

  lectureEyebrow: "The Curriculum",
  lectureTitle: "Ten lectures, where the textbook stops being useful.",
  lectureNote: "The case files a senior reproductive medicine specialist actually sees, taught by the specialist who has worked through them.",
  lectureCardLink: "Opens After Advanced",
  lectureCardTier: "Tier IV",
  lectures: [
    { id: "lecture-1",  label: "Lecture One",   no: "01", title: "PCOS and Fertility",                              body: "The most common endocrine disorder in reproductive medicine, and the one most misread in everyday practice. How to phenotype the patient correctly, when standard ovulation induction is the answer and when it is not, and the metabolic considerations that decide long-term outcomes.",                                                                                                     duration: "90 min · Live", thumb: LECTURE_THUMBS[0] },
    { id: "lecture-2",  label: "Lecture Two",   no: "02", title: "Endometriosis and Infertility (Surgery vs IVF)", body: "The decision tree the patient is waiting for. When to operate, when to skip surgery and go straight to IVF, and how to read the disease stage against the patient's age and fertility window. The case where a surgical decision changes everything that follows.",                                                                                                                         duration: "90 min · Live", thumb: LECTURE_THUMBS[1] },
    { id: "lecture-3",  label: "Lecture Three", no: "03", title: "Myoma and Infertility",                          body: "The fibroid that is contributing to infertility, and the one that is incidental. How to read location, size, and submucosal involvement against fertility outcomes, and the surgical and non-surgical decisions for patients trying to conceive.",                                                                                                                                        duration: "90 min · Live", thumb: LECTURE_THUMBS[2] },
    { id: "lecture-4",  label: "Lecture Four",  no: "04", title: "Severe Male Factor and Azoospermia",             body: "The clinical pathway when the semen analysis is not just abnormal but catastrophic. Obstructive versus non-obstructive azoospermia, surgical retrieval options, ICSI considerations, and the counselling conversation that prepares the couple for the realistic path forward.",                                                                                                 duration: "90 min · Live", thumb: LECTURE_THUMBS[3] },
    { id: "lecture-5",  label: "Lecture Five",  no: "05", title: "Diminished Ovarian Reserve",                     body: "The diagnosis that takes the hardest emotional toll. How to use AMH and AFC honestly in patient counselling, the protocols that maximise the cycle without overpromising, and when to introduce the donor egg conversation without losing the patient's trust.",                                                                                                                   duration: "90 min · Live", thumb: LECTURE_THUMBS[4] },
    { id: "lecture-6",  label: "Lecture Six",   no: "06", title: "Unexplained Infertility",                        body: "The diagnosis that is not a diagnosis. The structured workup that catches what standard testing misses, the implicit causes that hide in plain sight, and the treatment ladder for couples whose tests are normal but pregnancy is not happening.",                                                                                                                               duration: "90 min · Live", thumb: LECTURE_THUMBS[5] },
    { id: "lecture-7",  label: "Lecture Seven", no: "07", title: "Recurrent Implantation Failure",                 body: "The case file that has moved through three specialists. How to investigate RIF systematically, the endometrial, embryonic, and immunological causes that need to be ruled in or out, and the protocol adjustments that change a failure pattern into a successful cycle.",                                                                                                     duration: "90 min · Live", thumb: LECTURE_THUMBS[6] },
    { id: "lecture-8",  label: "Lecture Eight", no: "08", title: "Recurrent Pregnancy Loss",                       body: "The patient who has miscarried more than once and needs answers. The workup that finds the cause in roughly half of cases, the management for the half where no cause is found, and the support framework that holds the patient through the next cycle.",                                                                                                                    duration: "90 min · Live", thumb: LECTURE_THUMBS[7] },
    { id: "lecture-9",  label: "Lecture Nine",  no: "09", title: "Biological Therapies for Ovarian Rejuvenation",  body: "The emerging field of regenerative reproductive medicine. Intraovarian PRP, stem cell approaches, and other biological therapies that are entering the clinical conversation. Patient selection, evidence base, expectations management, and how to position these options ethically alongside standard care.",                                                           duration: "90 min · Live", thumb: LECTURE_THUMBS[8] },
    { id: "lecture-10", label: "Lecture Ten",   no: "10", title: "IUI Masterclass",                                body: "The precision skill that separates a routine IUI practice from a high-conversion one. Every variable that the clinician controls, from stimulation choice through sperm preparation through insemination timing through luteal support. The IUI cycle, run the way Dr. Sunita runs it.",                                                                                        duration: "90 min · Live", thumb: LECTURE_THUMBS[9] },
  ],

  pathway: {
    eyebrow: "The Pathway",
    title: "Masterclass is the fourth and final step. Three come before it for a reason.",
    body: "By the time a doctor reaches Masterclass, they have moved through the biology, the clinical reasoning, and the protocol-level decisions that define a competent IVF specialist. Masterclass is for the layer above that, the cases that do not fit the protocol, the patients who have already been through other specialists, the files that need the kind of clinical judgment a textbook cannot teach. The lectures are case-driven. They assume you can already do the work. They teach you to handle the work that has stopped working for everyone else.",
    steps: [
      { label: "Foundation",  desc: "The biology",            status: "Prerequisite",         tier: "foundation"  as const },
      { label: "Core",        desc: "The clinical decisions", status: "Prerequisite",          tier: "core"        as const },
      { label: "Advanced",    desc: "The IVF protocols",      status: "Prerequisite",          tier: "advanced"    as const },
      { label: "Masterclass", desc: "The hardest cases",      status: "Opens after Advanced",  tier: "masterclass" as const },
    ],
  },

  progression: {
    eyebrow: "Why This Order",
    heading: "Foundation taught the cycle. Core taught the call. Advanced taught the protocol. Masterclass teaches the case.",
    paragraphs: [
      "Foundation rebuilt the biology. The HPO axis, the ovarian cycle, the molecular dialogue of implantation. The reader who finished Foundation knows the cycle the way a specialist sees it.",
      "Core taught the clinical judgment that sits above the biology. The borderline semen analysis. The uneven oocyte. The IUI cycle that could go three different ways. The reader who finished Core can make the clinical call.",
      "Advanced taught the protocol decisions that sit above the judgment. Stimulation. OHSS prevention. Difficult retrievals. Transfer technique. Implantation troubleshooting. The reader who finished Advanced runs cycles better than they did.",
      "Masterclass is for the cases that sit above all of that. The patient who has run through every protocol you know and still has not conceived. The case file with the three previous specialists and the three previous treatment plans. The miscarriage pattern with no obvious cause. The implantation failure with normal embryos. The DOR patient who is not ready for donor eggs. Masterclass is for those cases, taught by the specialist they would eventually be referred to.",
    ],
    closingQuote: "The Academy teaches in sequence because a senior specialist is built in sequence. The cases Masterclass covers are the cases that exposed a gap in every step that came before.",
  },

  specialist: {
    eyebrow: "Written for the Senior Practitioner",
    heading: "The cases that come to you when nothing has worked.",
    paragraphs: [
      "Every reproductive medicine practice eventually accumulates a category of patient that does not look like the others. The couple with three failed cycles and no clear cause. The patient with five miscarriages who has been told there is nothing more to investigate. The PCOS patient on her sixth induction cycle who has not ovulated meaningfully. The DOR patient who has been told to consider donor eggs and is not ready to. The IVF patient with normal embryos who has not had a single implantation. The endometriosis patient with stage IV disease and one ovary remaining.",
      "These are the case files Masterclass is built for. Not because they are rare, but because they are the cases where the standard playbook stops being useful and the specialist has to think structurally. What is actually happening in this patient. What has been missed. What does the workup tell you that the previous workups did not. What protocol modification could turn the next cycle into the one that works.",
      "Masterclass is not a course about technique. It is a course about case-level thinking, the kind that takes thirty-five years to build, taught by the specialist who built it. The doctor who finishes Masterclass does not just know more. They handle the case files everyone else has given up on.",
    ],
  },

  notifyCard: {
    eyebrow: "Stay Informed",
    title: "Be the first to know when Masterclass opens.",
    body: "Masterclass opens after the first Advanced cohort closes. Leave your details and we will write to you when enrolment opens, with the full schedule and pricing.",
    fineprint: "One email when Masterclass opens. No other marketing.",
  },

  whyQuote: "For the doctor who has been practising long enough to know that the cases that taught them the most were the ones that did not behave. For the senior specialist whose case files now include the patients other specialists referred onwards. For the clinician who has stopped looking for the formula because they have learned that the cases that matter most do not have one. Masterclass is for that doctor, taught by someone who has spent three decades in front of those exact case files, and who teaches the way she practises, case by case, patient by patient, with the file open between you.",

  ribbon: {
    eyebrow: "Masterclass Series",
    headline: "Join the waitlist for the",
    headlineAccent: "Ten-Lecture Masterclass Program",
    meta: ["Live on Zoom", "Opens after Advanced", "Schedule TBA"],
    rightLabel: "Waitlist Open",
    rightSub: "First notified, first enrolled",
    cta: "Notify Me",
  },

  whyTitle: "Written for the Senior Practitioner",
  whyBody:
    "Every reproductive medicine practice eventually accumulates a category of patient that does not look like the others. The couple with three failed cycles and no clear cause. The patient with five miscarriages who has been told there is nothing more to investigate. The PCOS patient on her sixth induction cycle who has not ovulated meaningfully. The DOR patient who has been told to consider donor eggs and is not ready to. The IVF patient with normal embryos who has not had a single implantation. Masterclass is for those case files — not because they are rare, but because they are the cases where the standard playbook stops being useful and the specialist has to think structurally.",

  curriculumHeadline: "Ten live lectures with Dr. Sunita Tandulwadkar.",
  curriculumSubhead: "What each lecture does for your practice.",
  fullCurriculum: [
    { num: "01", title: "PCOS and Fertility",                              body: "PCOS is the most common cause of anovulatory infertility, and one of the most variably presented. This lecture covers the phenotyping framework that distinguishes the different PCOS profiles, the role of insulin resistance and metabolic syndrome in fertility outcomes, the ovulation induction strategies for each phenotype, when to escalate from induction to IVF, and the long-term reproductive and metabolic considerations the patient deserves to hear about before treatment begins." },
    { num: "02", title: "Endometriosis and Infertility (Surgery vs IVF)", body: "The single most common decision a reproductive surgeon-clinician faces in this disease. Staging the disease accurately, balancing surgical benefit against ovarian reserve loss, the patient where laparoscopy changes the entire trajectory, the patient where it is unnecessary, and the protocol adjustments needed when stage IV endometriosis is the context for an IVF cycle. The reasoning behind the choice, taught by a clinician who does both." },
    { num: "03", title: "Myoma and Infertility",                          body: "Not every fibroid is causing the infertility, and not every fibroid is incidental. This lecture covers the location-based framework for assessing the impact of myomas on fertility — submucosal, intramural, subserosal — the size thresholds where intervention is warranted, the surgical and non-surgical options for managing fibroids in the patient who is trying to conceive, and the timing considerations for myomectomy in relation to IVF and pregnancy." },
    { num: "04", title: "Severe Male Factor and Azoospermia",             body: "When the semen analysis is not just abnormal, the entire treatment pathway changes. This lecture covers the diagnostic distinction between obstructive and non-obstructive azoospermia, the surgical retrieval techniques (PESA, TESA, micro-TESE) and how to choose between them, the role of genetic testing in severe male factor, the ICSI considerations specific to retrieved sperm, and the counselling framework that prepares the couple emotionally and clinically for what is ahead." },
    { num: "05", title: "Diminished Ovarian Reserve",                     body: "The diagnosis that lands hardest on the patient and tests the clinician the most. This lecture covers the honest interpretation of AMH and AFC, the patient phenotypes within DOR (the younger DOR patient, the older DOR patient, the post-surgical DOR patient), the stimulation protocols that maximise yield in this group, the role of ovarian rejuvenation as an adjunct, and the conversation about donor eggs — when to introduce it, how to frame it, and how not to lose the patient's confidence in the process." },
    { num: "06", title: "Unexplained Infertility",                        body: "The diagnosis that is also a description of the limits of standard workup. This lecture covers the structured second-pass workup that catches what initial testing misses (subtle ovulatory dysfunction, mild endometriosis, sperm DNA fragmentation, immunological factors), the treatment ladder for unexplained infertility (timed intercourse → IUI → IVF), the role of empirical IVF, and the case selection that decides which couple benefits from which step." },
    { num: "07", title: "Recurrent Implantation Failure",                 body: "RIF is the case file that has been through three specialists and is now in your clinic. This lecture covers the systematic workup — endometrial receptivity testing, embryonic genetic testing, immunological evaluation, chronic endometritis, hysteroscopic findings — the protocol modifications that address each cause, the controversies in the RIF workup (which tests are evidence-based and which are not), and the patient communication framework for couples who have already endured multiple failures." },
    { num: "08", title: "Recurrent Pregnancy Loss",                       body: "The patient who has miscarried more than once is one of the hardest patient profiles in reproductive medicine, both clinically and emotionally. This lecture covers the comprehensive RPL workup, the causes that are found in roughly half of cases (chromosomal, anatomical, endocrine, immunological, thrombophilic) and the management of the half where no cause is identified, the role of PGT-A in RPL, and the supportive care framework that holds the patient through the next pregnancy attempt." },
    { num: "09", title: "Biological Therapies for Ovarian Rejuvenation",  body: "The emerging frontier of regenerative reproductive medicine. This lecture covers the biological rationale and current evidence for intraovarian PRP, the experimental work in stem cell-based ovarian rejuvenation, the patient selection criteria that distinguish legitimate candidates from inappropriate ones, the protocol design Dr. Sunita uses in her own institutions, and the ethical framing for discussing emerging therapies with patients who are running out of standard options." },
    { num: "10", title: "IUI Masterclass",                                body: "For the senior clinician who wants to refine the IUI cycle to its highest expression. This lecture covers the precision approach to IUI — stimulation choice for the specific patient, monitoring frequency and timing, trigger selection, sperm preparation considerations, insemination technique, luteal phase support, and the analytic framework for understanding which patients in your practice are getting the most benefit. The IUI cycle, taught the way it is run in a high-conversion clinic." },
  ],

  asideEyebrow: "Opening soon",
  asideTitle: "Be the first to know when Masterclass opens.",
  asideDescription: "Masterclass opens after the Advanced cohort closes. Leave your details and we will write to you when enrolment opens, with full schedule and pricing.",
  asidePrice: "Pricing TBA",
  asidePriceSub: "Masterclass Series · Tier IV",
  asidePrimaryCta: { type: "anchor", target: ENROLL_URL, label: "Notify Me" },
  asideSecondaryCta: { type: "navigate", target: "/course/foundation", label: "Start with Foundation" },
  perks: [
    "Ten live lectures with Dr. Sunita",
    "Live Q&A in every session",
    "Clinical protocol sheets",
    "Certificate on completion",
    "Replay access after the live cohort closes",
  ],

  registerEyebrow: "Register Interest",
  registerTitle: "Join the Masterclass waitlist.",
  registerDescription: "Reach out with any question about Masterclass, the pathway, or how the four programmes relate to each other. We respond to every enquiry.",
  registerItems: [
    { icon: "🔓", text: "Opens after Advanced cohort closes" },
    { icon: "🖥", text: "Live on Zoom — attend from anywhere" },
    { icon: "🎓", text: "Certificate on completion" },
    { icon: "💬", text: "Interactive Q&A every session" },
  ],
  registerStartsLabel: "Foundation begins",
  registerStartsValue: "15 July 2026",
  panelEyebrow: "Masterclass Series · Tier IV",
  panelTitle: "Talk to the Academy team.",
  panelDescription: "Reach out with any question about Masterclass, the pathway, or how the four programmes relate to each other. We respond to every enquiry.",
  panelCta: { type: "anchor", target: ENROLL_URL, label: "Notify Me When Masterclass Opens" },
};
