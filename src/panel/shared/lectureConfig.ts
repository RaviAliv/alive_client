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
    "300-day Ovarian Symphony - HPO Axis & Follicular Endocrinology",
    "Endocrinology of Follicular Phase",
    "Ovulation – Physiology / Precision Triggering / Molecular Dynamics to Clinical Applications",
    "Luteal Phase Endocrinology and Advances in Luteal Phase Support",
    "Implantation – Decoding the Molecular Dialogue of Human Embryo Implantation",
    "Spermatogenesis - What Everyone Should Know",
  ],
  core: [
    "Precision Diagnostic Road Map...",
    "Unravelling Oligoastheno...",
    "Ovulation Induction for IUI",
    "Monitoring of IUI & Optimising IUI outcome",
    "Pelvic Infections & Inflammations...",
  ],
  advanced: [
    "Choosing the Right Stimulation...",
    "OHSS Prevention & Safety",
    "Oocyte Retrieval Tips & Tricks...",
    "Embryology for Clinicians...",
    "Optimizing IVF Implantation",
    "Troubleshoot in Embryo Transfer",
    "Redefining Oocyte Quality...",
  ],
  masterclass: [
    "Endometriosis & Infertility...",
    "Unexplained Infertility...",
    "Recurrent Implantation Failure",
    "Recurrent Pregnancy Losses...",
    "Diminished Ovarian Reserve...",
    "Ovarian Rejuvenation...",
    "Myoma & Infertility",
    "Severe Male Factor / Azoospermia...",
    "PCOS & Fertility",
    "Difficult Embryo Transfer",
    "Obesity & Infertility",
  ],
};
