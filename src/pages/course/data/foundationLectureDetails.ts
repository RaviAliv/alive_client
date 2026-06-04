export type LectureDetailData = {
  num: string;
  title: string;
  headline: string;
  tagline: string;
  heroBody: string;
  date: string;
  dateShort: string;
  time: string;
  duration: string;
  platform: string;
  ytShortsId?: string;
  cfVideoId?: string; // Cloudflare Stream video ID (paid members only)
  lectureNotes?: {
    intro: string;
    sections: { heading: string; body: string[] }[];
  };
  whatItIsTitle: string;
  whatItIsBody: string[];
  formatTitle: string;
  formatBody: string[];
  formatAttrs: string[];
  logisticsTitle: string;
  whatsIncluded: { key: string; value: string }[];
  logisticsTrailing: string;
  whyQuote: string;
  facultyBio: string;
};

export const foundationLectureDetails: LectureDetailData[] = [
  {
    num: "01",
    title: "The Complete Arc of the Ovarian Cycle",
    headline: "The cycle is not random.",
    tagline: "Why some cycles work and others don't, told the way the biology actually tells it.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. The brain, the pituitary, and the ovary speaking to each other in measurable hormonal currency. The thresholds that decide whether a follicle survives. The exact mechanics that separate a cycle that ovulates from a cycle that does not. Built for the doctor who wants to read a cycle the way an experienced reproductive specialist reads it.",
    date: "Wednesday, 15 July 2026",
    dateShort: "Wed, 15 Jul 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    ytShortsId: "8Nh9_MUYC2M",
    cfVideoId: "dummy-cf-stream-id-foundation-01", // replace with real Cloudflare Stream ID
    lectureNotes: {
      intro:
        "This lecture traces the ovarian cycle from its neuroendocrine origins to the moment of ovulation, building a clinical framework that most fertility practitioners were never formally taught.",
      sections: [
        {
          heading: "The Hypothalamic-Pituitary-Ovarian Axis",
          body: [
            "The cycle begins not in the ovary but in the hypothalamus. GnRH is released in pulses — the frequency of those pulses determines whether the pituitary secretes FSH or LH. A slow pulse favours FSH. A fast pulse favours LH. This is not background knowledge. It is the foundation of every pharmacological intervention that follows.",
            "The pituitary reads the frequency, not the amplitude. A clinician who understands this reads gonadotropin levels differently — not as absolute values to compare against a reference range, but as a readout of the pulsatile signal that produced them.",
          ],
        },
        {
          heading: "Follicular Recruitment and Dominant Selection",
          body: [
            "Every cycle begins with a cohort of antral follicles that have escaped atresia. The FSH rise in the early follicular phase is the threshold event — follicles that reach a critical FSH sensitivity threshold survive. Those that do not, involute.",
            "The selection of the dominant follicle is not random. The follicle that develops the highest FSH receptor density earliest gains the ability to sustain its own growth even as FSH falls. Understanding this mechanism is the prerequisite to understanding why controlled ovarian stimulation protocols are designed the way they are.",
            "Granulosa cell aromatase activity — the conversion of androgens to estradiol — is the biochemical marker of follicular health. A follicle producing estradiol is a follicle that has achieved the metabolic competence to proceed.",
          ],
        },
        {
          heading: "The Estradiol Surge and the LH Trigger",
          body: [
            "Estradiol has a dual relationship with the pituitary. At low sustained levels, it suppresses gonadotropin secretion — the negative feedback that holds the FSH rise in check. At high concentrations sustained for thirty-six hours or more, it switches to positive feedback, triggering the mid-cycle LH surge.",
            "The LH surge is not a gradual rise. It is a discrete, timed event. The threshold estradiol level, the duration of exposure, and the GnRH pulse frequency at the time of the surge all converge to produce it. A cycle that fails to surge has usually failed at one of these three variables.",
          ],
        },
        {
          heading: "Ovulation: What Actually Happens",
          body: [
            "Ovulation is not a passive rupture. It is an inflammatory event. The LH surge activates prostaglandin synthesis and proteolytic enzymes in the follicular wall. The cumulus-oocyte complex is extruded through a stigma that forms by directed tissue remodelling — not by simple pressure.",
            "This matters clinically because NSAIDs, which inhibit prostaglandin synthesis, can impair follicular rupture even in a cycle with a normal LH surge and a mature follicle. A luteinized unruptured follicle in a patient on anti-inflammatory medications is a clinical pattern worth recognising.",
          ],
        },
        {
          heading: "Reading a Cycle as a System",
          body: [
            "The practical shift this lecture is designed to produce is this: from reading a cycle as a list of values to reading it as a system with internal dependencies. An FSH level means something different in the context of the estradiol level that accompanied it. An LH value means something different on day two versus day twelve.",
            "When a cycle fails to ovulate, the question is not which value is abnormal. The question is at which point in the cascade the signal failed to propagate. That is the question a reproductive specialist asks, and the framework to answer it is what this lecture builds.",
          ],
        },
      ],
    },
    whatItIsTitle: "A reset on how reproductive medicine begins.",
    whatItIsBody: [
      "Most fertility doctors learned the HPO axis in medical school. Most have not formally returned to it since. The cycle is still being read as a sequence of values to interpret. FSH at this number. LH at that number. Progesterone above the threshold. The biology underneath is treated as background.",
      "This lecture brings the biology back to the foreground. How the hypothalamus, the pituitary, and the ovary actually communicate. Why a single missed signal can collapse the rest. What the textbook doesn't make clear about the windows of opportunity that open and close within a single cycle.",
      "The doctor who finishes this lecture reads a cycle the way a specialist does. They see the system, not just the values. They know what is happening when a number falls outside the expected range, and what it means clinically before the next test result confirms it.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live", value: "Attendance with Dr. Sunita" },
      { key: "Q&A", value: "Interactive segment at the end of every lecture" },
      { key: "Replay", value: "Six weeks of access after the live cohort closes" },
      { key: "Materials", value: "Clinical protocol sheet" },
      { key: "Certificate", value: "On completion of all five Foundation lectures" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "For the doctor who has been reading cycles for years and quietly wonders whether they are reading them the way the best specialists do. For the registrar who knows the values but not the system. For the experienced clinician who has stopped asking the basic question, why does the cycle work the way it works, because they assumed that question was answered long ago. This lecture is the answer to that question, taught again, by someone who teaches it the way she practices it.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },
  {
    num: "02",
    title: "Ovulation, Triggering, and Timing",
    headline: "Ovulation is a decision.",
    tagline: "When to trigger, what makes it succeed or fail, and how to adapt when the textbook playbook breaks.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. The physiology of ovulation in clinical practice. From molecular dynamics to clinical application — why ovulation works the way it does, when to trigger, what makes a trigger succeed or fail, and how to adapt when the textbook playbook breaks down in front of a real patient.",
    date: "Wednesday, 22 July 2026",
    dateShort: "Wed, 22 Jul 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    whatItIsTitle: "A clinical map of ovulation and how to work with it.",
    whatItIsBody: [
      "Ovulation is the pivot point of every cycle. The decision to trigger, the choice of agent, the timing of insemination — all of it rests on understanding why ovulation works the way it does.",
      "This lecture rebuilds that understanding from the physiology outward. How the LH surge is generated and sustained. What the follicle needs before it will rupture. Why triggers succeed in some patients and fail in others. The clinical patterns that emerge when the ovulatory mechanism is disrupted.",
      "The doctor who finishes this lecture does not guess at trigger timing. They understand it.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live", value: "Attendance with Dr. Sunita" },
      { key: "Q&A", value: "Interactive segment at the end of every lecture" },
      { key: "Replay", value: "Six weeks of access after the live cohort closes" },
      { key: "Materials", value: "Clinical protocol sheet" },
      { key: "Certificate", value: "On completion of all five Foundation lectures" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "For the clinician who has triggered hundreds of cycles and still finds some of them surprising. For the doctor who wants to understand not just when to trigger, but why the trigger works — and what it means when it doesn't. This lecture is for the practitioner who wants to stop guessing and start understanding.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },
  {
    num: "03",
    title: "Reading the Luteal Phase as a Clinical Signal",
    headline: "The luteal phase does not lie.",
    tagline: "The corpus luteum as a diagnostic compass, and how to support it intelligently.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. The luteal phase as a diagnostic compass, not a checkbox. Current understanding of luteal phase support. How to recognise what a luteal phase is telling you, and how to support it intelligently in the right patient.",
    date: "Wednesday, 29 July 2026",
    dateShort: "Wed, 29 Jul 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    whatItIsTitle: "The luteal phase as a clinical lens, not a footnote.",
    whatItIsBody: [
      "The luteal phase is treated as an afterthought in most clinical practice. Progesterone support is prescribed routinely. The corpus luteum is not examined as a diagnostic signal.",
      "This lecture changes that. How the corpus luteum forms, what it produces, and what its output reveals about the quality of the ovulation that preceded it. The clinical patterns of luteal phase insufficiency. How to distinguish a luteal phase that needs support from one that reveals a deeper problem.",
      "The doctor who finishes this lecture reads the luteal phase as a window into the entire cycle.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live", value: "Attendance with Dr. Sunita" },
      { key: "Q&A", value: "Interactive segment at the end of every lecture" },
      { key: "Replay", value: "Six weeks of access after the live cohort closes" },
      { key: "Materials", value: "Clinical protocol sheet" },
      { key: "Certificate", value: "On completion of all five Foundation lectures" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "For the doctor who prescribes progesterone support reflexively, without asking what the luteal phase is actually saying. For the clinician who wants to read the second half of the cycle with the same precision they bring to the first. This lecture is for the practitioner ready to treat the luteal phase as data.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },
  {
    num: "04",
    title: "The Molecular Dialogue of Implantation",
    headline: "Implantation is a conversation.",
    tagline: "Implantation as a conversation between embryo and endometrium, not a timing problem.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. Implantation is not a timing problem. It is a conversation between the embryo and the endometrium. Understand how endometrial receptivity and embryonic signalling actually work, and why this changes the way you think about implantation failure.",
    date: "Wednesday, 5 August 2026",
    dateShort: "Wed, 5 Aug 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    whatItIsTitle: "Implantation as a dialogue, not a deadline.",
    whatItIsBody: [
      "Most clinical thinking about implantation is organised around timing. The window of implantation. The day of transfer. The thickness of the endometrium.",
      "This lecture reorganises that thinking around the dialogue. What the endometrium must express for implantation to succeed. What the embryo must signal for the endometrium to respond. Where that dialogue breaks down, and what the clinical patterns of failure tell you about where it broke.",
      "The doctor who finishes this lecture sees implantation failure differently. Not as a timing miss, but as a conversation that stopped before it should have.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live", value: "Attendance with Dr. Sunita" },
      { key: "Q&A", value: "Interactive segment at the end of every lecture" },
      { key: "Replay", value: "Six weeks of access after the live cohort closes" },
      { key: "Materials", value: "Clinical protocol sheet" },
      { key: "Certificate", value: "On completion of all five Foundation lectures" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "For the IVF doctor who has watched good embryos transferred into prepared endometria, and still not understood why implantation failed. For the clinician who wants to think about the endometrium not as a passive recipient but as an active participant. This lecture is for the practitioner ready to take the molecular dialogue seriously.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },
  {
    num: "05",
    title: "The Precision Diagnostic Roadmap",
    headline: "Good diagnostics start before the first test.",
    tagline: "How to evaluate a fertility patient with precision, not breadth.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. What to test, what to skip, and how to interpret every result in the full clinical context. The diagnostic philosophy that separates efficient practice from exhaustive over-investigation.",
    date: "Wednesday, 12 August 2026",
    dateShort: "Wed, 12 Aug 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    whatItIsTitle: "A diagnostic framework built on clinical precision.",
    whatItIsBody: [
      "Most fertility workups are too broad. They are organised around what is available to order, not around what the patient in front of you actually needs. The result is over-investigation, delayed diagnosis, and patient anxiety without clinical clarity.",
      "This lecture is a framework for doing the opposite. How to map the clinical presentation to the right investigative pathway. What the commonly ordered tests actually reveal, and what they do not. The sequence of reasoning that gets you to a diagnosis with fewer tests and more certainty.",
      "The doctor who finishes this lecture evaluates a fertility patient with purpose. They know what they are looking for before they order the first test.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live", value: "Attendance with Dr. Sunita" },
      { key: "Q&A", value: "Interactive segment at the end of every lecture" },
      { key: "Replay", value: "Six weeks of access after the live cohort closes" },
      { key: "Materials", value: "Clinical protocol sheet" },
      { key: "Certificate", value: "On completion of all five Foundation lectures" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "For the doctor who orders a full panel for every patient and waits for the results to tell them what to think. For the clinician who wants to arrive at the investigation with a hypothesis already formed. For the practitioner ready to practise diagnostic medicine, not diagnostic cataloguing.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },
];
