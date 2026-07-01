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
    title: "HPO Axis: From Physiology to Precision",
    headline: "The Complete Arc of the Ovarian Cycle",
    tagline: "Why some cycles work and others don't, told the way the biology actually tells it.",
    heroBody:
      "This foundation class takes you beyond textbook physiology into the clinical power of the hypothalamic–pituitary–ovarian axis. You will understand how GnRH pulsatility, FSH, LH, estradiol, progesterone, inhibin and AMH work together to regulate follicular growth, ovulation, luteal function and menstrual cyclicity. The session connects core endocrine physiology with real-life clinical conditions such as anovulation, PCOS, functional hypothalamic amenorrhea, hyperprolactinemia, premature ovarian insufficiency, and diminished ovarian reserve.",
    date: "Wednesday, 15th july 2026",
    dateShort: "Wed, 15 Jul 2026",
    time: "8 PM IST",
    duration: "",
    platform: "Live on Zoom",
    thumbnail: "/images/FoundationLa.webp",
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
      "After attending, you will be able to interpret hormonal patterns with greater clarity, identify where the reproductive axis is disturbed, and choose more rational, individualized treatment strategies. This class will help you move from simply ordering investigations to truly understanding the patient’s endocrine story, improving counselling, ovulation induction decisions, ART protocol planning and confidence in daily fertility & gynaecological practice.",
      // "Most fertility doctors learned the HPO axis in medical school. Most have not formally returned to it since. The cycle is still being read as a sequence of values to interpret. FSH at this number. LH at that number. Progesterone above the threshold. The biology underneath is treated as background.",
      // "This lecture brings the biology back to the foreground. How the hypothalamus, the pituitary, and the ovary actually communicate. Why a single missed signal can collapse the rest. What the textbook doesn't make clear about the windows of opportunity that open and close within a single cycle.",
      // "The doctor who finishes this lecture reads a cycle the way a specialist does. They see the system, not just the values. They know what is happening when a number falls outside the expected range, and what it means clinically before the next test result confirms it.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Read the ovarian cycle as a system with internal dependencies, not a sequence of isolated values",
      "Map the HPO axis from hypothalamic GnRH pulses through follicular development to ovulation",
      "Understand exactly what drives the LH surge and identify what disrupts it clinically",
      "Distinguish a cycle that has failed at the signal from one that has failed at the response",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita Tandulwadkar" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access after the live cohort closes" },
      { key: "Certificate", value: "On completion of all six Foundation lectures" },
    ],
    logisticsTrailing:
      "",
    whyQuote:
      "For the doctor who has been reading cycles for years and quietly wonders whether they are reading them the way the best specialists do. For the registrar who knows the values but not the system. For the experienced clinician who has stopped asking the basic question, why does the cycle work the way it works, because they assumed that question was answered long ago. This lecture is the answer to that question, taught again, by someone who teaches it the way she practices it.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },

  /* ── LECTURE 02 — from lacture2.html ────────────────────────── */
  {
    num: "02",
    title: "The Endocrine Architecture of Follicular Phase — From Endocrinology to Survival of the Fittest Follicle",
    headline: "The trigger is the decision the cycle waits for.",
    tagline: "Why the moment you trigger matters more than the protocol that came before it.",
    heroBody:
      "This foundation class explores the endocrine architecture of the follicular phase, where follicular growth becomes a precise hormonal conversation between FSH, LH, theca cells and granulosa cells. It explains the two-cell, two-gonadotropin model in depth — how LH-driven theca cells produce androgen substrate, how FSH-driven granulosa cells convert it into estradiol through aromatase, and how this coordinated partnership creates the endocrine signature of a healthy dominant follicle. The session also connects this physiology to clinical realities such as follicular arrest, altered estrogen production and the endocrine imbalance seen in PCOS.",
    date: "Wednesday, 22 July 2026",
    dateShort: "Wed, 22 Jul 2026",
    time: "8 PM IST",
    duration: "",
    platform: "Live on Zoom",
    ytShortsId: "h9_-M9sOwCw",
    thumbnail: "/images/FoundationLa2.webp",
    whatItIsTitle: "The decision that ends the cycle, taught the way it actually gets made.",
    whatItIsBody: [
      "After attending, you will be able to interpret hormonal patterns with greater clarity, identify where the reproductive axis is disturbed, and choose more rational, individualized treatment strategies. This class will help you move from simply ordering investigations to truly understanding the patient’s endocrine story, improving counselling, ovulation induction decisions, ART protocol planning and confidence in daily fertility practice",
      // "Most fertility doctors were taught the trigger as a checklist. The lead follicle reaches 18mm. You administer hCG. You wait thirty-six hours. The cycle proceeds. The rule was simple, universal, and for years it was good enough.",
      // "This lecture explains why it is no longer good enough. The biology of the trigger has not changed, but our understanding of it has. Patient age, the underlying infertility factor, the proportion of follicles in the cohort, the progesterone level on trigger day, and the protocol used to get there all change what the right trigger looks like for the patient in front of you. The 18mm rule was a generalisation. The lecture teaches you the precision underneath it.",
      // "The doctor who finishes this lecture reads a triggering decision the way a senior reproductive specialist reads it. They see the cohort, not just the lead follicle. They know what the progesterone level is telling them. They understand when a dual trigger is the answer and when it is not. They know when to wait, when to trigger, and when to pivot the entire cycle.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Understand the physiology that determines when a follicle is ready to rupture",
      "Choose trigger agent and timing based on mechanism, not protocol habit",
      "Recognise the clinical patterns when follicular rupture fails despite a normal trigger",
      "Adapt the ovulation induction approach to what a specific patient's cycle is showing",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita Tandulwadkar" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access after the live cohort closes" },
      { key: "Certificate", value: "On completion of all six Foundation lectures" },
    ],
    logisticsTrailing:
      "",
    whyQuote:
      "For the doctor who has been triggering cycles on the 18mm rule for years, and quietly wondering why some cycles work and others do not when the rule has been followed. For the doctor who has read the newer papers on dual trigger and patient-specific sizing and is not quite sure how to translate them into Monday morning. For the senior clinician who knows that the trigger decision is one of the most consequential moments in the cycle, and is ready to make it with the precision a senior reproductive specialist brings. This lecture is for that doctor, taught by someone who has refined this decision across thirty-five years of clinical practice.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },

  /* ── LECTURE 03 ─────────────────────────────────────────────── */
  {
    num: "03",
    title: "Spermatogenesis: From Germ Cell Development to Semen Analysis, Genetics to Clinical Terminologies",
    headline: "From Follicle Destiny to Follicle Rupture",
    tagline: "The 350-Day Symphony Ovulation, Triggering, and Timing",
    heroBody:
      "From molecular dynamics to clinical application. Why ovulation works the way it does, when to trigger, what makes a trigger succeed or fail, and how to adapt when the textbook playbook breaks down in front of a real patient. This masterclass explores ovulation as a complete biological journey, not merely a midcycle event. It traces the 355-day pathway from early folliculogenesis to gonadotropin-dependent recruitment, dominant follicle selection, estradiol rise, LH surge, cumulus–oocyte maturation, inflammatory-like signalling, proteolysis, follicle rupture and corpus luteum formation. The session explains how endocrine timing, follicular competence, vascularity, FSH threshold, LH action and tissue remodeling come together to release the oocyte at the right moment.",
    date: "Wednesday, 29 July 2026",
    dateShort: "Wed, 29 Jul 2026",
    time: "8 PM IST",
    duration: "",
    platform: "Live on Zoom",
    thumbnail: "/images/FoundationLa3.webp",
    whatItIsTitle: "What You Will Be Getting",
    whatItIsBody: [
      "After attending, you will be able to understand ovulation with far greater clinical depth and apply it directly to fertility practice. You will interpret follicular monitoring beyond size alone, recognize why one follicle becomes dominant, understand the timing and meaning of the LH surge, and plan ovulation induction, trigger timing, timed intercourse, IUI and ART decisions more rationally. This class will help you see ovulation as a marker of total follicular competence, improving your confidence in cycle assessment, counselling and treatment planning.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Interpret follicular monitoring beyond size alone and understand why one follicle becomes dominant over others",
      "Understand the timing and biological meaning of the LH surge and what disrupts it in clinical practice",
      "Plan ovulation induction, trigger timing, timed intercourse, IUI and ART decisions more rationally",
      "Recognise when a trigger fails despite appearing normal, and adapt the approach to the patient in front of you",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita Tandulwadkar" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access after the live cohort closes" },
      { key: "Certificate", value: "On completion of all six Foundation lectures" },
    ],
    logisticsTrailing:
      "",
    whyQuote:
      "Ovulation is not a midcycle event. It is a 355-day process with a 36-hour window at the end. The doctor who understands the journey reads the follicle differently, triggers more precisely, and stops blaming the protocol when the biology was always the question.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },

  /* ── LECTURE 04 ─────────────────────────────────────────────── */
  {
    num: "04",
    title: "Ovulation: From Follicle Destiny to Follicle Rupture — The 350-Day Symphony",
    headline: "One question decides every luteal protocol you will ever write.",
    tagline: "Advanced luteal phase support, reduced to a single physiological decision and the protocols that follow from it.",
    heroBody:
      "This masterclass explores the luteal phase as the critical bridge between ovulation, implantation and early pregnancy support. It explains how the ruptured follicle transforms into the corpus luteum, how progesterone drives secretory endometrial transformation, and how the endometrium becomes receptive through glandular secretion, stromal edema, spiral artery coiling and decidual preparation. The session also covers luteolysis, embryonic hCG rescue of the corpus luteum, sustained progesterone production, and the luteoplacental shift from ovarian to placental steroidogenesis.",
    date: "Wednesday, 5 August 2026",
    dateShort: "Wed, 5 Aug 2026",
    time: "8 PM IST",
    duration: "",
    platform: "Live on Zoom",
    ytShortsId: "JnP6Ig4dksE",
    thumbnail: "/images/FoundationLa4.webp",
    whatItIsTitle: "The Corpus Luteum as a Clinical Compass",
    whatItIsBody: [
      "After attending, you will understand the luteal phase as an active endocrine and molecular program, not just the second half of the cycle. You will be able to relate progesterone action to implantation readiness, recognize the clinical importance of luteal support, understand why programmed FET cycles need careful progesterone planning, and counsel patients with greater clarity. This class will strengthen your decision-making in natural cycles, ovulation induction, ART luteal support, early pregnancy maintenance and timing of progesterone withdrawal.",
    ],
    formatTitle: "The decision tree only works on your case.",
    formatBody: [
      "This runs live for one reason. The luteal decision tree becomes useful when you can bring your own difficult case to it and get an answer in the room. Recordings stay on the site for six weeks after each session, but the Interactive Q&A is the part you cannot get later.",
    ],
    formatAttrs: ["Live Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Triage any ART cycle by corpus luteum status in under a minute, and know which protocol that triage commits you to",
      "Know exactly when luteal support is mandatory, when it is individualised, and when continuing it past a positive test is doing nothing",
      "Read a low pre-transfer serum progesterone in an HRT cycle and execute a rescue protocol instead of accepting a poor outcome",
      "Recognise progesterone resistance in special populations and know why a one-size protocol fails them",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita Tandulwadkar" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access on the website" },
      { key: "Certificate", value: "On completion of all six Foundation lectures" },
    ],
    logisticsTrailing:
      "",
    whyQuote:
      "A ten-year worldwide survey found that 65% of clinics still continue luteal support to ten to twelve weeks in fresh cycles where the embryo has already rescued the corpus luteum. We are not short of progesterone. We are short of the one question that tells us when it matters.",
    facultyBio:
      "This lecture is taught by Dr. Sunita Tandulwadkar, who has built and run one of India's busiest IVF and endoscopy practices for three decades. She is President of ISAR (2026 to 2028) and immediate past President of FOGSI. The luteal decisions in this session are not drawn from a guideline summary. They are drawn from the cycles she has managed, the rescues she has run, and the cases that taught her where the textbook stops.",
  },

  /* ── LECTURE 05 ─────────────────────────────────────────────── */
  {
    num: "05",
    title: "Luteal Phase: Physiology, Endocrinology and Clinical Importance",
    headline: "A good embryo is necessary. It is not enough.",
    tagline: "Improving implantation in IVF by getting the three things that actually move it right, before reaching for the add-ons that mostly do not.",
    heroBody:
      "This masterclass explores implantation as a precise embryo–endometrial dialogue, where success depends not only on embryo quality but also on endometrial receptivity, synchrony and metabolic timing. It explains the journey from ovulation to the window of implantation, progesterone-driven secretory transformation, decidualization, vascular and immune remodeling, pinopodes, epithelial changes, uterine quiescence and the implantation-competent blastocyst. The session also introduces modern concepts such as dynamic window of implantation, limitations of traditional biopsy, same-cycle liquid biopsy, uterine fluid extracellular vesicles and predictive modeling for receptivity assessment.",
    date: "Wednesday, 12 August 2026",
    dateShort: "Wed, 12 Aug 2026",
    time: "8 PM IST",
    duration: "",
    platform: "Live on Zoom",
    ytShortsId: "VznbLGmuJgY",
    thumbnail: "/images/FoundationLa6.webp",
    whatItIsTitle: "Improving Implantation in IVF",
    whatItIsBody: [
      "After attending, you will be able to understand implantation as a biologically timed conversation rather than a single attachment event. You will learn how to assess whether the embryo, endometrium and hormonal environment are truly synchronized, why implantation failure may occur despite a good embryo, and how receptivity concepts can guide clinical thinking in ART. This class will improve your confidence in counselling, embryo transfer planning, luteal support decisions, recurrent implantation failure evaluation and individualized fertility treatment.",
    ],
    formatTitle: "Recurrent implantation failure is a case, not a slide.",
    formatBody: [
      "This runs live because the hardest part of implantation is sequencing the workup on a real patient who keeps failing. Bring the case you cannot crack and work it in order, in the room. Recordings stay on the site for six weeks after each session, but the live reasoning is the part you cannot get later.",
    ],
    formatAttrs: ["Live Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Work a failed transfer in a fixed order — embryo, then uterus, then transfer, then add-ons — instead of escalating at random",
      "Read embryo selection tools for what they prove and counsel patients on selective use without overstating certainty",
      "Reassess a thin or difficult endometrium by cause before reaching for investigational interventions",
      "Sort any proposed add-on into standard, selective, or investigational, and document the rationale and consent that each demands",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita Tandulwadkar" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access on the website" },
      { key: "Certificate", value: "On completion of all six Foundation lectures" },
    ],
    logisticsTrailing:
      "",
    whyQuote:
      "When a transfer fails, the temptation is to add something. Another test, another drug, another package. The harder discipline, and the one that helps more patients, is to ask whether we are improving the biology, improving the execution, or only adding cost.",
    facultyBio:
      "This lecture is taught by Dr. Sunita Tandulwadkar, who has built and run one of India's busiest IVF and endoscopy practices for three decades. She is President of ISAR (2026 to 2028) and immediate past President of FOGSI. The restraint in this session is earned, not theoretical. It comes from years of deciding, case by case, when an intervention is worth offering and when it is only adding cost to a patient already carrying enough.",
  },

  /* ── LECTURE 06 ─────────────────────────────────────────────── */
  {
    num: "06",
    title: "Implantation: From Endometrial Receptivity to Endometrium–Embryo Dialogue",
    headline: "Male factor is not a referral. It is a diagnosis you make.",
    tagline: "The biology of spermatogenesis, the clinical meaning of the semen analysis, and the decisions that follow when the result is abnormal.",
    heroBody:
      "This masterclass explores spermatogenesis as a highly ordered, time-bound and clinically meaningful process that extends far beyond a routine semen report. It explains the 74-day testicular developmental clock, spermatogenic waves, mitotic proliferation, meiotic chromosome reduction, spermiogenesis, epididymal maturation and the additional 10–14 days required for sperm to acquire motility and fertilizing capacity. The session connects testicular biology with semen analysis interpretation, sperm morphology, motility, DNA packaging, oxidative stress, varicocele, heat injury, epididymal dysfunction and the practical 90-day window needed to see the impact of any medical or lifestyle intervention.",
    date: "Wednesday, 19 August 2026",
    dateShort: "Wed, 19 Aug 2026",
    time: "8 PM IST",
    duration: "",
    platform: "Live on Zoom",
    thumbnail: "/images/FoundationLa5.webp",
    whatItIsTitle: "The male factor, taught the way reproductive specialists understand it.",
    whatItIsBody: [
      "After attending, you will be able to interpret male-factor infertility with greater depth and confidence. You will understand why semen parameters change slowly, when to repeat semen analysis, how to relate abnormal count, motility, morphology or DNA fragmentation to the underlying phase of spermatogenesis, and how to counsel couples more scientifically. This class will strengthen your decision-making in male infertility evaluation, treatment planning, ART counselling, varicocele-related discussions, antioxidant therapy expectations and selection of IUI, IVF or ICSI strategies.",
      // "Most fertility doctors learned spermatogenesis as a diagram. Spermatogonia divide, spermatocytes undergo meiosis, spermatids mature into spermatozoa. The process was described. What it means for the patient in front of you was left to inference.",
      // "This lecture closes that gap. How the seventy-four-day cycle of spermatogenesis translates into what you find on a semen analysis — and more importantly, what it means when the analysis is abnormal. The difference between a temporarily impaired semen parameter and a structural problem that will not change with three more months of antioxidants.",
      // "The doctor who finishes this lecture reads a semen analysis as a clinical document, not a report to be triaged. They know which parameters predict IVF outcomes and which are noise. They know when a second sample is worth ordering, when to refer for surgical evaluation, and when the male factor has already set the ceiling for what is possible.",
    ],
    formatTitle: "Live with Dr. Sunita. Not a recording you watch alone.",
    formatBody: [
      "A ninety-minute lecture taught in real time, on Zoom, by Dr. Sunita Tandulwadkar. Every doctor in the cohort is present in the same session. Every question asked is answered in the moment, by her, on the call.",
      "The interactive segment at the end of every lecture is the part that separates a live class from a recording. Bring the case you are stuck on. Ask the question the textbook does not answer. Hear how an experienced reproductive medicine specialist reasons through it, in front of you, with the rest of the cohort listening in.",
    ],
    formatAttrs: ["Live Lecture", "Interactive Q&A", "Cohort of Practising Doctors"],
    outcomes: [
      "Understand spermatogenesis as a seventy-four-day process and interpret semen parameters in that biological context",
      "Read a semen analysis report as a clinical document — distinguish parameters that predict outcome from those that do not",
      "Identify when abnormal parameters are likely to respond to intervention and when they represent a fixed ceiling on outcome",
      "Know when to order a repeat, when to refer for surgical evaluation, and when to escalate directly to IVF-ICSI without waiting",
    ],
    logisticsTitle: "Everything you need to know before reserving.",
    whatsIncluded: [
      { key: "Live",      value: "Attendance with Dr. Sunita Tandulwadkar" },
      { key: "Q&A",       value: "Interactive segment at the end of every lecture" },
      { key: "Replay",    value: "Six weeks of access after the live cohort closes" },
      { key: "Certificate", value: "On completion of all six Foundation lectures" },
    ],
    logisticsTrailing:
      "",
    whyQuote:
      "The male factor accounts for half of all infertility. It is evaluated by half the doctors, understood by a fraction of them, and acted on correctly by fewer still. This lecture exists because the patient whose partner has a semen analysis report sitting in front of you deserves a doctor who knows what to do with it.",
    facultyBio:
      "President of ISAR for 2026 to 2028. Past President of FOGSI for 2025. Head of OBGYN and Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune. Founder of Solo Clinic IVF & OBGYN. Three decades inside the same set of clinical questions. Every Foundation lecture is taught by her, live, in her own voice.",
  },
];
