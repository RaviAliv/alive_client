export const COURSES = ["foundation", "core", "advanced", "masterclass"] as const;
export type CourseKey = (typeof COURSES)[number];

export const COURSE_COLOR: Record<string, string> = {
  foundation: "#21864E",
  core: "#D4A621",
  advanced: "#1E5AA6",
  masterclass: "#C8102E",
};

export const COURSE_LABEL: Record<string, string> = {
  foundation: "Foundation",
  core: "Core",
  advanced: "Advanced",
  masterclass: "Masterclass",
};

export const COURSE_LECTURES: Record<string, string[]> = {
  foundation: [
    "HPO Axis: From Physiology to Precision",
    "The Endocrine Architecture of Follicular Phase — From Endocrinology to Survival of the Fittest Follicle",
    "Ovulation: From Follicle Destiny to Follicle Rupture — The 350-Day Symphony",
    "Luteal Phase: Physiology, Endocrinology and Clinical Importance",
    "Spermatogenesis: From Germ Cell Development to Semen Analysis, Genetics to Clinical Terminologies",
    "Implantation: From Endometrial Receptivity to Endometrium–Embryo Dialogue",
  ],
  core: [
    "Female Infertility Evaluation: A Roadmap — A Sequential, Evidence-Based and Phenotype-Driven Approach",
    "Precision Ovulation Induction with Letrozole — A Clinical Masterclass in Protocols, Monitoring and Patient Journey",
    "Gonadotropin Ovulation Induction for IUI: History, Molecules, Protocols, Monitoring, Evidence and Clinical Decision-Making",
    "Optimizing IUI Results: From Couple Selection to Stimulation, Timing, Support and Strategy",
    "Unravelling Oligoasthenoteratozoospermia: From Molecular Pathogenesis to Evidence-Based Management — Advanced Medical / Surgical and ART Management",
    "Pelvic Infections and Fertility: From Silent Damage to Diagnosis, Reconstruction and Treatment Strategy",
  ],
  advanced: [
    "Choosing the Right Stimulation Protocol & Troubleshooting in Stimulation",
    "OHSS Prevention and Safety",
    "Oocyte Retrieval Tips and Tricks — Difficult Ovaries / Bleeding Avoidance",
    "Embryology for Clinicians — Grading, Lab Variables, Decision Points",
    "Optimizing IVF Implantation",
    "Difficult Embryo Transfer: Prediction, Preparation and Performance — Navigating the Last Hurdle of IVF",
    "Redefining Oocyte Quality and Micro-Environment in Follicle: Bioenergetic Paradigm Shift — Reprogramming the Aging Ovary",
    "Preparation for Frozen Embryo Transfer",
  ],
  masterclass: [
    "Endometriosis and Infertility — Optimizing IVF Results in Endometriosis",
    "Unexplained Infertility — Redefining Idiopathic Infertility through High-Resolution Diagnostics",
    "Recurrent Implantation Failure",
    "Recurrent Pregnancy Losses — A Masterclass in Etiology, Diagnosis and Precision Management",
    "Diminished Ovarian Reserve — Strategy, Protocols, Expectations",
    "Ovarian Rejuvenation: Beyond Stem Cells & PRP",
    "Myoma and Infertility",
    "Azoospermia — Pathway + Sperm Retrieval Overview",
    "PCOS and Fertility",
    "Refractory Endometrium",
    "Obesity and Infertility",
    "Advances in ART",
  ],
};
