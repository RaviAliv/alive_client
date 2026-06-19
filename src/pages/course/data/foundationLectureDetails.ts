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
  thumbnail?: string;
  cfVideoId?: string;
  lectureNotes?: {
    intro: string;
    sections: { heading: string; body: string[] }[];
  };
  whatItIsTitle: string;
  whatItIsBody: string[];
  formatTitle: string;
  formatBody: string[];
  formatAttrs: string[];
  outcomes: string[];
  logisticsTitle: string;
  whatsIncluded: { key: string; value: string }[];
  logisticsTrailing: string;
  whyQuote: string;
  facultyBio: string;
};

export const foundationLectureDetails: LectureDetailData[] = [
  /* ── LECTURE 01 ─────────────────────────────────────────────── */
  {
    num: "01",
    title: "300-day Ovarian Symphony - HPO Axis & Follicular Endocrinology",
    headline: "The cycle is not random.",
    tagline: "Why some cycles work and others don't, told the way the biology actually tells it.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. The brain, the pituitary, and the ovary speaking to each other in measurable hormonal currency. The thresholds that decide whether a follicle survives. The exact mechanics that separate a cycle that ovulates from a cycle that does not. Built for the doctor who wants to read a cycle the way an experienced reproductive specialist reads it.",
    date: "Wednesday, 15 July 2026",
    dateShort: "Wed, 15 Jul 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    ytShortsId: "KY3k1KMVY_Q",
    thumbnail: "https://img.youtube.com/vi/KY3k1KMVY_Q/maxresdefault.jpg",
    cfVideoId: "dummy-cf-stream-id-foundation-01",
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
    outcomes: [
      "Read the ovarian cycle as a system with internal dependencies, not a sequence of isolated values",
      "Map the HPO axis from hypothalamic GnRH pulses through follicular development to ovulation",
      "Understand exactly what drives the LH surge and identify what disrupts it clinically",
      "Distinguish a cycle that has failed at the signal from one that has failed at the response",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access after the live cohort closes" },
      { key: "Materials", value: "Clinical protocol sheet" },
      { key: "Certificate", value: "On completion of all five Foundation lectures" },
      { key: "Participation Certificate", value: "On completion of each lecture" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "For the doctor who has been reading cycles for years and quietly wonders whether they are reading them the way the best specialists do. For the registrar who knows the values but not the system. For the experienced clinician who has stopped asking the basic question, why does the cycle work the way it works, because they assumed that question was answered long ago. This lecture is the answer to that question, taught again, by someone who teaches it the way she practices it.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },

  /* ── LECTURE 02 — from lacture2.html ────────────────────────── */
  {
    num: "02",
    title: "Endocrinology of Follicular Phase",
    headline: "The trigger is the decision the cycle waits for.",
    tagline: "Why the moment you trigger matters more than the protocol that came before it.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. The biology of the LH surge. The exact thresholds that decide whether a follicle is ready. The patient-specific decisions that have replaced the universal 18mm rule. The hormonal signals that tell you to trigger now, wait, or pivot the entire cycle. Built for the doctor who wants to understand the trigger the way a senior reproductive specialist understands it, as the decision that determines the outcome of everything that came before.",
    date: "Wednesday, 22 July 2026",
    dateShort: "Wed, 22 Jul 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    ytShortsId: "h9_-M9sOwCw",
    thumbnail: "https://img.youtube.com/vi/h9_-M9sOwCw/maxresdefault.jpg",
    whatItIsTitle: "The decision that ends the cycle, taught the way it actually gets made.",
    whatItIsBody: [
      "Most fertility doctors were taught the trigger as a checklist. The lead follicle reaches 18mm. You administer hCG. You wait thirty-six hours. The cycle proceeds. The rule was simple, universal, and for years it was good enough.",
      "This lecture explains why it is no longer good enough. The biology of the trigger has not changed, but our understanding of it has. Patient age, the underlying infertility factor, the proportion of follicles in the cohort, the progesterone level on trigger day, and the protocol used to get there all change what the right trigger looks like for the patient in front of you. The 18mm rule was a generalisation. The lecture teaches you the precision underneath it.",
      "The doctor who finishes this lecture reads a triggering decision the way a senior reproductive specialist reads it. They see the cohort, not just the lead follicle. They know what the progesterone level is telling them. They understand when a dual trigger is the answer and when it is not. They know when to wait, when to trigger, and when to pivot the entire cycle.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Understand the physiology that determines when a follicle is ready to rupture",
      "Choose trigger agent and timing based on mechanism, not protocol habit",
      "Recognise the clinical patterns when follicular rupture fails despite a normal trigger",
      "Adapt the ovulation induction approach to what a specific patient's cycle is showing",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access after the live cohort closes" },
      { key: "Materials", value: "Clinical protocol sheet" },
      { key: "Certificate", value: "On completion of all five Foundation lectures" },
      { key: "Participation Certificate", value: "On completion of each lecture" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "For the doctor who has been triggering cycles on the 18mm rule for years, and quietly wondering why some cycles work and others do not when the rule has been followed. For the doctor who has read the newer papers on dual trigger and patient-specific sizing and is not quite sure how to translate them into Monday morning. For the senior clinician who knows that the trigger decision is one of the most consequential moments in the cycle, and is ready to make it with the precision a senior reproductive specialist brings. This lecture is for that doctor, taught by someone who has refined this decision across thirty-five years of clinical practice.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },

  /* ── LECTURE 03 — from lacture3.html ────────────────────────── */
  {
    num: "03",
    title: "Ovulation – Physiology / Precision Triggering / Molecular Dynamics to Clinical Applications",
    headline: "One question decides every luteal protocol you will ever write.",
    tagline: "Advanced luteal phase support, reduced to a single physiological decision and the protocols that follow from it.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. The whole of luteal management in ART collapses into one question asked before any prescription: is a corpus luteum present, or absent? Everything else follows from the answer. You will leave able to place any cycle in front of you — IUI, fresh IVF, natural FET, programmed FET — on the correct side of that line, and to defend the protocol that line demands.",
    date: "Wednesday, 29 July 2026",
    dateShort: "Wed, 29 Jul 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    ytShortsId: "JnP6Ig4dksE",
    thumbnail: "https://img.youtube.com/vi/JnP6Ig4dksE/maxresdefault.jpg",
    whatItIsTitle: "The Corpus Luteum as a Clinical Compass",
    whatItIsBody: [
      "Most luteal phase support is taught as a list of drugs and doses. This lecture teaches it as a decision tree. The whole of luteal management in ART collapses into one question asked before any prescription: is a corpus luteum present, or absent? Everything else follows from the answer. You will leave able to place any cycle in front of you, IUI, fresh IVF, natural FET, programmed FET, on the correct side of that line, and to defend the protocol that line demands.",
      "Why progesterone is secreted in pulses, why those pulses cannot be replicated by a tablet, and what the luteo-placental shift actually hands over. How stimulation, retrieval, and GnRH analogues dismantle a luteal phase that nature built, and why that makes support non-negotiable in some cycles and optional in others.",
      "Corpus luteum present versus absent, and why this single distinction reorganises every protocol you have been taught as a separate rule. When to stop support — which most clinics get wrong — and the evidence for stopping at a positive test in CL-present cycles.",
    ],
    formatTitle: "The decision tree only works on your case.",
    formatBody: [
      "This runs live for one reason. The luteal decision tree becomes useful when you can bring your own difficult case to it and get an answer in the room. Recordings stay on the site for six weeks after each session, but the live Q&A is the part you cannot get later.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Triage any ART cycle by corpus luteum status in under a minute, and know which protocol that triage commits you to",
      "Know exactly when luteal support is mandatory, when it is individualised, and when continuing it past a positive test is doing nothing",
      "Read a low pre-transfer serum progesterone in an HRT cycle and execute a rescue protocol instead of accepting a poor outcome",
      "Recognise progesterone resistance in special populations and know why a one-size protocol fails them",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access on the website" },
      { key: "Materials", value: "Session slides provided" },
      { key: "Certificate", value: "Certificate of Completion" },
      { key: "Participation Certificate", value: "On completion of each lecture" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "A ten-year worldwide survey found that 65% of clinics still continue luteal support to ten to twelve weeks in fresh cycles where the embryo has already rescued the corpus luteum. We are not short of progesterone. We are short of the one question that tells us when it matters.",
    facultyBio:
      "This lecture is taught by Dr. Sunita Tandulwadkar, who has built and run one of India's busiest IVF and endoscopy practices for three decades. She is President of ISAR (2026 to 2028) and immediate past President of FOGSI. The luteal decisions in this session are not drawn from a guideline summary. They are drawn from the cycles she has managed, the rescues she has run, and the cases that taught her where the textbook stops.",
  },

  /* ── LECTURE 04 — from lacture4.html ────────────────────────── */
  {
    num: "04",
    title: "Luteal Phase Endocrinology and Advances in Luteal Phase Support",
    headline: "A good embryo is necessary. It is not enough.",
    tagline: "Improving implantation in IVF by getting the three things that actually move it right, before reaching for the add-ons that mostly do not.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. Implantation is a conversation between embryo and endometrium, and a single failed transfer rarely has a single cause. This lecture treats implantation as a system with three levers that move it — embryo competence, uterine readiness, transfer quality — and a fourth that governs all of them: restraint.",
    date: "Wednesday, 5 August 2026",
    dateShort: "Wed, 5 Aug 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    ytShortsId: "VznbLGmuJgY",
    thumbnail: "https://img.youtube.com/vi/VznbLGmuJgY/maxresdefault.jpg",
    whatItIsTitle: "Improving Implantation in IVF",
    whatItIsBody: [
      "Implantation is a conversation between embryo and endometrium, and a single failed transfer rarely has a single cause. This lecture treats implantation as a system with three levers that move it (embryo competence, uterine readiness, transfer quality) and a fourth that governs all of them, restraint. You will leave able to work a failed cycle in order, deciding whether the next step improves biology, improves execution, or only adds cost.",
      "Why embryo competence is set long before transfer, what selection tools can and cannot tell you, and where newer ranking methods help rather than overstate certainty. Why thickness alone does not prove receptivity, what synchrony and pathology actually decide, and what a thin or difficult lining should trigger.",
      "Why an atraumatic, ultrasound-guided transfer is a high-impact skill, and how a technically avoidable poor transfer can erase every biological gain. How to separate standard care from selective use from investigational, and why repeated failure should trigger structured reassessment, not serial empiric add-ons.",
    ],
    formatTitle: "Recurrent implantation failure is a case, not a slide.",
    formatBody: [
      "This runs live because the hardest part of implantation is sequencing the workup on a real patient who keeps failing. Bring the case you cannot crack and work it in order, in the room. Recordings stay on the site for six weeks after each session, but the live reasoning is the part you cannot get later.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Work a failed transfer in a fixed order — embryo, then uterus, then transfer, then add-ons — instead of escalating at random",
      "Read embryo selection tools for what they prove and counsel patients on selective use without overstating certainty",
      "Reassess a thin or difficult endometrium by cause before reaching for investigational interventions",
      "Sort any proposed add-on into standard, selective, or investigational, and document the rationale and consent that each demands",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access on the website" },
      { key: "Materials", value: "Session slides provided" },
      { key: "Certificate", value: "Certificate of participation" },
      { key: "Participation Certificate", value: "On completion of each lecture" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "When a transfer fails, the temptation is to add something. Another test, another drug, another package. The harder discipline, and the one that helps more patients, is to ask whether we are improving the biology, improving the execution, or only adding cost.",
    facultyBio:
      "This lecture is taught by Dr. Sunita Tandulwadkar, who has built and run one of India's busiest IVF and endoscopy practices for three decades. She is President of ISAR (2026 to 2028) and immediate past President of FOGSI. The restraint in this session is earned, not theoretical. It comes from years of deciding, case by case, when an intervention is worth offering and when it is only adding cost to a patient already carrying enough.",
  },

  /* ── LECTURE 05 — from lacture5.html ────────────────────────── */
  {
    num: "05",
    title: "Implantation – Decoding the Molecular Dialogue of Human Embryo Implantation",
    headline: "The goal is not to collect tests. It is to find the one that changes the plan.",
    tagline: "A structured female fertility work-up: what to do first, what to reserve for selected patients, and when to stop investigating and start treating.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. A modern work-up is layered, not shotgun. From a high-quality baseline scan through 3D imaging, hysteroscopy, and genetics, with the judgment to escalate only when the next test will actually change management. You will leave able to run the work-up from basic to advanced, not from expensive to exhaustive.",
    date: "Wednesday, 12 August 2026",
    dateShort: "Wed, 12 Aug 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    thumbnail: "/images/FoundationL5.webp",
    whatItIsTitle: "The Female Fertility Work-Up",
    whatItIsBody: [
      "A modern work-up is layered, not shotgun. You start broad, identify the phenotype, then go deeper only where the history or imaging points you. This lecture gives you that sequence, from a high-quality baseline scan through 3D imaging, hysteroscopy, and genetics, and the judgment to escalate only when the next test will actually change management. You will leave able to run the work-up from basic to advanced, not from expensive to exhaustive.",
      "How history — the most underused diagnostic test — separates the ovulatory, tubal, endometriosis, low-reserve, uterine, and unexplained pathways on day one. Why a high-quality baseline ultrasound is the pivot of the modern work-up, and how to order hormones to answer a question rather than as a ritual.",
      "When 3D imaging, expert pelvic mapping, hysteroscopy, MRI, and genetics earn their place, and when they are screening rituals that mislead. The most important fertility skill: recognising when another test will not change the plan, and time has become more valuable than more diagnostics.",
    ],
    formatTitle: "The work-up is a series of judgment calls.",
    formatBody: [
      "This runs live because the work-up is not a checklist, it is a sequence of decisions on a specific patient. Bring the case where you are unsure what to order next, or whether to order anything at all, and work the escalation in the room. Recordings stay on the site for six weeks after each session, but the live reasoning is the part you cannot get later.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Triage any new patient into a phenotype from history and a baseline scan, and know which pathway that commits you to",
      "Order hormones and reserve testing to answer a defined question, and avoid the reflex panels that do not change management",
      "Escalate to 3D imaging, hysteroscopy, MRI, or genetics only when the phenotype justifies it, and counsel the patient on why",
      "Recognise the point where investigation should stop and treatment should begin, and move promptly when time is the deciding factor",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access on the website" },
      { key: "Materials", value: "Session slides provided" },
      { key: "Certificate", value: "Certificate of participation" },
      { key: "Participation Certificate", value: "On completion of each lecture" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "Unexplained infertility is a diagnosis of exclusion, not a diagnosis of exhaustion. The best work-up is not the most thorough one. It is the one that shortens the time to the right treatment.",
    facultyBio:
      "This lecture is taught by Dr. Sunita Tandulwadkar, who has built and run one of India's busiest IVF and endoscopy practices for three decades. She is President of ISAR (2026 to 2028) and immediate past President of FOGSI. Her work spans both the imaging and the surgery this work-up leads to, which is why the sequence she teaches is built around the one question that matters: will this test change what you do next?",
  },

  /* ── LECTURE 06 ─────────────────────────────────────────────── */
  {
    num: "06",
    title: "Spermatogenesis - What Everyone Should Know",
    headline: "Male factor is not a referral. It is a diagnosis you make.",
    tagline: "The biology of spermatogenesis, the clinical meaning of the semen analysis, and the decisions that follow when the result is abnormal.",
    heroBody:
      "A live ninety-minute lecture with Dr. Sunita Tandulwadkar. Spermatogenesis takes seventy-four days. Every semen analysis you read is a report on biology that began almost three months earlier. This lecture covers the process from spermatogonial stem cells to ejaculated sperm, what the semen analysis does and does not tell you, and the clinical questions that follow when the report is abnormal.",
    date: "Wednesday, 19 August 2026",
    dateShort: "Wed, 19 Aug 2026",
    time: "8 PM IST",
    duration: "90 minutes",
    platform: "Live on Zoom",
    thumbnail: "/images/FoundationL6.webp",
    whatItIsTitle: "The male factor, taught the way reproductive specialists understand it.",
    whatItIsBody: [
      "Most fertility doctors learned spermatogenesis as a diagram. Spermatogonia divide, spermatocytes undergo meiosis, spermatids mature into spermatozoa. The process was described. What it means for the patient in front of you was left to inference.",
      "This lecture closes that gap. How the seventy-four-day cycle of spermatogenesis translates into what you find on a semen analysis — and more importantly, what it means when the analysis is abnormal. The difference between a temporarily impaired semen parameter and a structural problem that will not change with three more months of antioxidants.",
      "The doctor who finishes this lecture reads a semen analysis as a clinical document, not a report to be triaged. They know which parameters predict IVF outcomes and which are noise. They know when a second sample is worth ordering, when to refer for surgical evaluation, and when the male factor has already set the ceiling for what is possible.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live 90-Minute Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Understand spermatogenesis as a seventy-four-day process and interpret semen parameters in that biological context",
      "Read a semen analysis report as a clinical document — distinguish parameters that predict outcome from those that do not",
      "Identify when abnormal parameters are likely to respond to intervention and when they represent a fixed ceiling on outcome",
      "Know when to order a repeat, when to refer for surgical evaluation, and when to escalate directly to IVF-ICSI without waiting",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access after the live cohort closes" },
      { key: "Materials", value: "Clinical protocol sheet" },
      { key: "Certificate", value: "On completion of all six Foundation lectures" },
      { key: "Participation Certificate", value: "On completion of each lecture" },
    ],
    logisticsTrailing:
      "A Zoom link will be sent to your registered email twenty-four hours before the lecture begins.",
    whyQuote:
      "The male factor accounts for half of all infertility. It is evaluated by half the doctors, understood by a fraction of them, and acted on correctly by fewer still. This lecture exists because the patient whose partner has a semen analysis report sitting in front of you deserves a doctor who knows what to do with it.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },
];
