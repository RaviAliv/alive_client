import { useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";
import EnquiryModal from "../components/EnquiryModal";
import { VIDEOS, ENROLL_URL } from "../lib/config";

type Lecture = { num: string; title: string; body: string };

type Course = {
  letter: "S" | "T" | "A" | "R";
  tier: string;
  status: string;
  title: string;
  img: string;
  body: string;
  outcome: string;
  why: string;
  lectures: Lecture[];
  lecturesNote?: string;
  schedule: { date: string; cadence: string; time: string; format: string };
  live: boolean;
  accent: "t-green" | "t-gold" | "t-blue" | "t-red";
};

const courses: Course[] = [
  {
    letter: "S",
    tier: "Tier I · Foundation",
    status: "Now Enrolling",
    title: "The Foundation Series",
    img: "/images/Foundation.webp",
    body:
      "Mastering the absolute basics of reproductive medicine. Five live lectures rebuilding the biological foundations every clinical decision rests on, from the HPO axis through to female fertility diagnostics. Begin here if you want to revisit fundamentals with depth.",
    outcome:
      "To read the reproductive cycle with precision and evaluate fertility patients without guesswork.",
    why:
      "For the doctor who feels like they are practising infertility in fragments. Who learned physiology a decade ago and has never formally returned to it. Who treats patients confidently enough, but quietly wonders if they are reading the cycle the way the best specialists do. Foundation exists for that doctor. Not to teach new information, but to rebuild the framework that everything else sits on.",
    lectures: [
      {
        num: "01",
        title: "The Complete Arc of the Ovarian Cycle",
        body: "How an oocyte matures over 300 days, and why every clinical decision sits on this biology.",
      },
      {
        num: "02",
        title: "Ovulation, Triggering, and Timing",
        body: "When to trigger, what makes it succeed or fail, and how to adapt when the textbook playbook breaks.",
      },
      {
        num: "03",
        title: "Reading the Luteal Phase as a Clinical Signal",
        body: "The corpus luteum as a diagnostic compass, and how to support it intelligently.",
      },
      {
        num: "04",
        title: "The Molecular Dialogue of Implantation",
        body: "Implantation as a conversation between embryo and endometrium, not a timing problem.",
      },
      {
        num: "05",
        title: "The Precision Diagnostic Road Map",
        body: "How to evaluate a fertility patient with precision, not breadth.",
      },
    ],
    schedule: {
      date: "Commences 15 July 2026",
      cadence: "Every Wednesday",
      time: "8:00 PM IST",
      format: "Live on Zoom",
    },
    live: true,
    accent: "t-green",
  },
  {
    letter: "T",
    tier: "Tier II · Core",
    status: "Coming Soon",
    title: "The Core Series",
    img: "/images/Core.webp",
    body:
      "Simple, highly effective infertility treatments. Five live lectures on evaluation, ovulation induction, IUI workflow, and the hidden pelvic and inflammatory drivers that quietly affect outcomes.",
    outcome:
      "To run IUI and first-line treatments as a deliberate, evidence-anchored workflow, not a stitched-together routine.",
    why:
      "For the doctor who has done IUIs and first-line treatments many times, but knows the workflow is stitched together from different teachers, different conferences, and different eras of practice. Who wants one clean, contemporary, evidence-anchored framework for how to evaluate, induce, monitor, trigger, and follow through. Core exists for the doctor who wants their first-line practice to be as deliberate as their advanced work.",
    lectures: [
      {
        num: "01",
        title: "Male Factor Without the Guesswork",
        body: "How to read the semen picture, what to act on, and how male factor reshapes the couple's plan.",
      },
      {
        num: "02",
        title: "Oocyte Quality and the Follicular Environment",
        body: "What actually determines oocyte quality, and why the follicular microenvironment matters.",
      },
      {
        num: "03",
        title: "Ovulation Induction for IUI",
        body: "When to induce, what to use, and how to match the strategy to the patient.",
      },
      {
        num: "04",
        title: "Monitoring and Optimising the IUI",
        body: "What to watch, what to ignore, and how to time insemination with precision.",
      },
      {
        num: "05",
        title: "The Hidden Pelvic and Inflammatory Drivers",
        body: "The silent contributors to infertility that most workups miss.",
      },
    ],
    schedule: {
      date: "Launch date to be announced",
      cadence: "Every Wednesday",
      time: "8:00 PM IST",
      format: "Live on Zoom",
    },
    live: false,
    accent: "t-gold",
  },
  {
    letter: "A",
    tier: "Tier III · Advanced",
    status: "Coming Soon",
    title: "The Advanced Series",
    img: "/images/Advanced.webp",
    body:
      "IVF practising tips and tactical execution tricks. Seven live lectures on stimulation, OHSS prevention, retrieval technique, embryology for clinicians, transfer mechanics, and ovarian rejuvenation.",
    outcome:
      "To make IVF decisions with tactical precision, from stimulation choice through to transfer mechanics.",
    why:
      "For the IVF practitioner who has run hundreds of cycles, but knows that every protocol decision could be sharper. Who wants to refine their stimulation logic, retrieval technique, transfer mechanics, and OHSS prevention with the precision of someone who has done this work for three decades. Advanced exists for the doctor who is past the protocols and ready for the tactical execution that separates outcomes.",
    lectures: [
      {
        num: "01",
        title: "Stimulation Strategy in IVF",
        body: "Building protocols that match the patient, not the textbook.",
      },
      {
        num: "02",
        title: "OHSS Prevention and Management",
        body: "Reading risk early, choosing the right trigger, and managing when prevention fails.",
      },
      {
        num: "03",
        title: "The Retrieval, Done Right",
        body: "Technique, timing, and the small decisions that change yield and safety.",
      },
      {
        num: "04",
        title: "Embryology for the Clinician",
        body: "What happens in the lab and what every IVF doctor should know about it.",
      },
      {
        num: "05",
        title: "The Implantation Window",
        body: "How to think about endometrial receptivity in practical, clinical terms.",
      },
    ],
    lecturesNote:
      "Plus two further lectures on transfer mechanics and ovarian rejuvenation. See the full Advanced page for the complete curriculum.",
    schedule: {
      date: "Launch date to be announced",
      cadence: "Every Wednesday",
      time: "8:00 PM IST",
      format: "Live on Zoom",
    },
    live: false,
    accent: "t-blue",
  },
  {
    letter: "R",
    tier: "Tier IV · Masterclass",
    status: "Coming Soon",
    title: "The Masterclass Series",
    img: "/images/Masterclass.webp",
    body:
      "In-depth, singular subject mastery. Ten 60-minute deep-dives on the highest-complexity cases in reproductive medicine, from implantation failure to recurrent loss to diminished ovarian reserve.",
    outcome:
      "To approach the hardest cases in reproductive medicine with clinical judgment, not just protocols.",
    why:
      "For the experienced doctor who knows that the cases that matter most are the ones that do not follow the textbook. Recurrent implantation failure. Recurrent pregnancy loss. Diminished ovarian reserve. Endometriosis. The cases where protocols run out and judgment takes over. Masterclass exists for the doctor who is ready to think about these cases with the depth they deserve.",
    lectures: [
      {
        num: "01",
        title: "IUI Masterclass",
        body: "Refining IUI practice to its highest expression.",
      },
      {
        num: "02",
        title: "Endometriosis and Fertility",
        body: "Approaching one of the most complex drivers of subfertility.",
      },
      {
        num: "03",
        title: "Unexplained Infertility",
        body: "Working through the cases where the workup is normal but the conception is not.",
      },
      {
        num: "04",
        title: "Recurrent Implantation Failure",
        body: "The investigative and therapeutic logic for one of IVF's hardest scenarios.",
      },
      {
        num: "05",
        title: "Recurrent Pregnancy Loss",
        body: "A structured framework for evaluating and treating recurrent miscarriage.",
      },
    ],
    lecturesNote:
      "Plus five further lectures on diminished ovarian reserve, biological therapies, myoma management, male factor and azoospermia, and PCOS. See the full Masterclass page for the complete curriculum.",
    schedule: {
      date: "Launch date to be announced",
      cadence: "Every Wednesday",
      time: "8:00 PM IST",
      format: "Live on Zoom",
    },
    live: false,
    accent: "t-red",
  },
];

const faqs = [
  {
    q: "Do I need to complete Foundation before joining the next tiers?",
    a: "The tiers are designed as a progression, but entry is flexible. Doctors can begin at the tier that best matches their current stage of practice. If you are unsure where to start, our team will help you choose.",
  },
  {
    q: "Can I enroll in more than one tier at a time?",
    a: "Yes. The complete pathway is designed to be taken in sequence, but doctors can enrol in multiple tiers as they launch. Each tier runs as a scheduled batch, so timing depends on the launch sequence.",
  },
  {
    q: "What if I cannot attend a session live?",
    a: "All sessions are conducted live on Zoom. Optional recording access may be offered for selected courses at a nominal additional fee. Details are shared at enrolment.",
  },
  {
    q: "Is there a certificate?",
    a: "Yes. A certificate pathway is provided on successful completion of each tier. CME accreditation is in process and will be communicated once confirmed.",
  },
  {
    q: "What is the language of instruction?",
    a: "All STAR sessions are delivered in English.",
  },
  {
    q: "When will Core, Advanced, and Masterclass launch?",
    a: "Each tier launches in sequence after the previous one completes. Express interest using the Enquire Now form to be notified when registration opens for upcoming tiers.",
  },
];

const slugByLetter: Record<string, string> = {
  S: "foundation",
  T: "core",
  A: "advanced",
  R: "masterclass",
};

const accentText = {
  "t-green": "text-t-green",
  "t-gold": "text-t-gold",
  "t-blue": "text-t-blue",
  "t-red": "text-t-red",
} as const;

const accentBg = {
  "t-green": "bg-t-green",
  "t-gold": "bg-t-gold",
  "t-blue": "bg-t-blue",
  "t-red": "bg-t-red",
} as const;


const accentBorderL = {
  "t-green": "border-l-t-green",
  "t-gold": "border-l-t-gold",
  "t-blue": "border-l-t-blue",
  "t-red": "border-l-t-red",
} as const;

export default function CoursesPage() {
  // null = closed; string = open, with that tier title prefilled
  const [enquiryLabel, setEnquiryLabel] = useState<string | null>(null);

  return (
    <>
      {/* HERO: text left, video right */}
      <section className="relative -mt-5 bg-[linear-gradient(rgba(10,14,22,0.88),rgba(10,14,22,0.88)),url('/images/header_footer.webp')] bg-cover bg-center overflow-hidden">
        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] pt-[clamp(100px,12vw,60px)] pb-[clamp(60px,8vw,100px)] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold/60" />
              <span className="font-mono text-[15px] font-medium tracking-[0.28em] uppercase text-gold">
                The Pathway
              </span>
            </div>
            <h1 className="font-display font-medium text-[clamp(34px,4.2vw,56px)] leading-[1.05] text-ivory mb-5 tracking-[-0.015em]">
              A stepwise curriculum in infertility and IVF
            </h1>
            <p className="text-[16px] leading-[1.7] text-ivory/60 mb-8 max-w-[52ch]">
              The STAR pathway is a four-tier academic journey, taught live by
              Dr. Sunita Tandulwadkar. Foundation rebuilds the fundamentals
              Core sharpens first-line treatment workflow. Advanced refines IVF
              strategy. Masterclass builds judgment for the hardest cases
            </p>
            <Link
              to="/course/foundation"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 font-body font-bold text-[15px] tracking-[0.02em] border border-gold-deep text-black rounded-md bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] group"
            >
              Explore the Foundation Series
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>

          {/* Right: video */}
          <div className="relative w-full overflow-hidden border border-gold/25 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
            <div className="relative w-full pt-[56.25%] bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEOS.foundationIntro}?rel=0&modestbranding=1`}
                title="Dr. Sunita Tandulwadkar — STAR Academy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="flex items-center justify-between border-t border-gold/20 bg-black/75 backdrop-blur-sm px-5 py-3">
              <p className="font-display italic text-ivory text-[13px] leading-none">Dr. Sunita Tandulwadkar</p>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-gold/50">STAR Academy</span>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE CARDS GRID */}
      <section className="pt-[clamp(60px,7vw,60px)] pb-[clamp(50px,7vw,60px)] bg-[linear-gradient(rgba(248,245,239,0.88),rgba(248,245,239,0.88)),url('/images/marble.webp')] bg-cover bg-center">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center mb-12 max-w-[620px] mx-auto">
            <span className="inline-block font-mono text-[15px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-4">
              Four Tiers
            </span>
            <h2 className="font-display font-medium text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-navy mb-3">
              From Foundation to Masterclass.
            </h2>
            <p className="text-[15px] text-slate leading-[1.65]">
              Every tier stands on its own and builds the next.
            </p>
          </div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {courses.map((c) => (
              <div
                key={c.letter}
                className="group relative flex flex-col bg-[#0d1117] border border-white/8 overflow-hidden transition-all duration-300 hover:border-white/18 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.7)]"
              >
                {/* Image with overlaid info */}
                <div className="relative h-[200px] sm:h-[230px] overflow-hidden shrink-0">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />

                  {/* Top accent bar */}
                  <div className={`absolute top-0 inset-x-0 h-[3px] ${accentBg[c.accent]}`} />

                  {/* Status badge */}
                  {c.live ? (
                    <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] uppercase text-white ${accentBg[c.accent]} before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white before:animate-pulse`}>
                      Now Enrolling
                    </span>
                  ) : (
                    <span className="absolute top-4 left-4 px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] uppercase text-white/60 bg-white/8 border border-white/12 backdrop-blur-sm">
                      Coming Soon
                    </span>
                  )}

                  {/* Tier label */}
                  <span className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.22em] uppercase text-gold-deep">
                    {c.tier.split("·")[0].trim()}
                  </span>

                  {/* Letter + title overlay at bottom of image */}
                  <div className="absolute bottom-0 inset-x-0 px-6 pb-5 flex items-end gap-4">
                    <span className={`font-display font-bold text-[52px] leading-none ${accentText[c.accent]} opacity-90 shrink-0`}>
                      {c.letter}
                    </span>
                    <div>
                      <p className={`font-mono text-[9px] tracking-[0.22em] uppercase mb-0.5 ${accentText[c.accent]}`}>
                        {c.tier.split("·").slice(1).join("·").trim()}
                      </p>
                      <h3 className="font-display font-semibold text-[clamp(20px,2vw,24px)] text-ivory leading-[1.15]">
                        {c.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-grow px-6 pt-5 pb-6">
                  <p className="text-[14px] text-ivory/55 leading-[1.68] mb-5 flex-grow">
                    {c.body}
                  </p>

                  {/* What you will learn */}
                  <div className="mb-5 pt-4 border-t border-white/8">
                    <span className="block font-mono text-[9px] tracking-[0.22em] uppercase text-gold-deep mb-1.5">
                      Outcome
                    </span>
                    <p className="font-display italic text-[14px] leading-[1.45] text-ivory/70">
                      {c.outcome}
                    </p>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-6">
                    {[
                      `${c.lectures.length}${c.lecturesNote ? "+" : ""} Lectures`,
                      c.schedule.date,
                      c.schedule.format,
                    ].map((m) => (
                      <span key={m} className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-ivory/40">
                        <span className={`w-1 h-1 rounded-full shrink-0 ${accentBg[c.accent]}`} />
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link
                      to={`/course/${slugByLetter[c.letter]}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-gold-deep border border-gold-deep/40 hover:border-gold-deep transition-colors duration-200"
                    >
                      Explore →
                    </Link>
                    <a
                      href={ENROLL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 font-body font-semibold text-[13px] tracking-[0.02em] border border-gold-deep text-black bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] transition-all duration-300 hover:brightness-110 group/btn"
                    >
                      Enroll Now
                      <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">&rarr;</span>
                    </a>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL CURRICULUM — one always-visible section per tier */}
      {courses.map((c, idx) => (
        <section
          key={c.letter}
          id={`tier-${c.letter}`}
          className={`scroll-mt-[90px] border-t border-white/6 py-[clamp(56px,7vw,90px)] ${
            idx % 2 === 0
              ? "bg-[linear-gradient(rgba(8,12,20,0.86),rgba(8,12,20,0.86)),url('/images/navbar.webp')] bg-cover bg-center"
              : "bg-[linear-gradient(rgba(6,9,16,0.90),rgba(6,9,16,0.90)),url('/images/navbar.webp')] bg-cover bg-center"
          }`}
        >
          <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
            {/* Section header */}
            <header className="flex items-center gap-5 border-b border-white/8 pb-6 mb-9">
              <div
                className={`flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center font-display font-semibold text-[30px] text-ivory border border-gold ${
                  accentBg[c.accent]
                }`}
              >
                {c.letter}
              </div>
              <div>
                <span
                  className={`block font-mono text-[10.5px] tracking-[0.24em] uppercase mb-1.5 ${
                    accentText[c.accent]
                  }`}
                >
                  {c.tier} · <span className="text-gold/60">{c.status}</span>
                </span>
                <h3 className="font-display font-medium text-[clamp(26px,3vw,40px)] leading-[1.05] text-ivory tracking-[-0.01em]">
                  {c.title}
                </h3>
              </div>
            </header>

            {/* Why this course exists */}
            <div className={`mb-9 px-7 py-6 bg-[rgba(255,255,255,0.04)] border-l-[3px] ${accentBorderL[c.accent]}`}>
              <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-gold/60 mb-2.5">
                Why this course exists
              </span>
              <p className="font-display italic text-[clamp(15px,1.4vw,19px)] leading-[1.5] text-ivory/75 max-w-[75ch]">
                {c.why}
              </p>
            </div>

            {/* Columns: lectures + schedule */}
            <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8 md:gap-12 items-start">
              <div>
                <h4 className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-gold font-medium mb-4 pb-2 border-b border-white/8">
                  Curriculum
                </h4>
                <ol className="list-none m-0 p-0">
                  {c.lectures.map((l) => (
                    <li
                      key={l.num}
                      className="grid grid-cols-[44px_1fr] gap-[18px] py-4 border-b border-white/6 last:border-b-0"
                    >
                      <span className={`font-display font-medium text-[24px] leading-none ${accentText[c.accent]}`}>
                        {l.num}
                      </span>
                      <div>
                        <h5 className="font-display font-medium text-[18px] text-ivory mb-1.5 leading-[1.25]">
                          {l.title}
                        </h5>
                        <p className="text-[14px] leading-[1.55] text-ivory/50">
                          {l.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                {c.lecturesNote && (
                  <p className="mt-[18px] px-[18px] py-3.5 bg-gold/8 border-l-2 border-gold font-display italic text-[14px] leading-[1.55] text-ivory/70">
                    {c.lecturesNote}
                  </p>
                )}
              </div>

              <aside className="bg-[rgba(255,255,255,0.04)] border border-white/8 p-6 md:sticky md:top-[100px]">
                <h4 className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-gold font-medium mb-4 pb-2 border-b border-white/8">
                  Format and Schedule
                </h4>
                <ul className="list-none m-0 p-0 mb-6">
                  {[
                    ["Date", c.schedule.date],
                    ["Cadence", c.schedule.cadence],
                    ["Time", c.schedule.time],
                    ["Format", c.schedule.format],
                  ].map(([label, value]) => (
                    <li
                      key={label}
                      className="grid grid-cols-[80px_1fr] gap-3 py-2.5 border-b border-white/6 last:border-b-0 items-baseline"
                    >
                      <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-gold/55">
                        {label}
                      </span>
                      <strong className="font-display font-medium text-[15px] text-ivory">
                        {value}
                      </strong>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 pt-[22px] border-t border-white/8">
                  {c.live ? (
                    <Link
                      to={`/course/${slugByLetter[c.letter]}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-body font-bold text-[14px] tracking-[0.02em] border border-gold-deep text-black rounded-md bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] group/cta"
                    >
                      Enroll Now
                      <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">&rarr;</span>
                    </Link>
                  ) : (
                    <Link
                      to={`/course/${slugByLetter[c.letter]}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-body font-medium text-[14px] tracking-[0.02em] border border-gold/40 text-gold rounded-[2px] transition-colors duration-300 hover:border-gold hover:bg-gold/5 group/cta"
                    >
                      Explore Course
                      <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">&rarr;</span>
                    </Link>
                  )}
                  <Link
                    to={`/course/${slugByLetter[c.letter]}`}
                    className="text-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-gold/50 py-1.5 transition-colors hover:text-gold"
                  >
                    See full {c.title.replace("The ", "").replace(" Series", "")} page &rarr;
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ))}

      {/* FACULTY MINI-SECTION */}
      <section className="py-[clamp(56px,8vw,90px)] bg-[linear-gradient(rgba(248,245,239,0.88),rgba(248,245,239,0.88)),url('/images/marble.webp')] bg-cover bg-center border-t border-border-warm">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-4">
                The Faculty
              </span>
              <h2 className="font-display font-medium text-[clamp(26px,3vw,40px)] leading-[1.15] text-navy mb-5 tracking-[-0.015em]">
                Taught directly by one of India's most respected pioneers in reproductive medicine.
              </h2>
              <p className="text-[15px] leading-[1.75] text-slate mb-7">
                Dr. Sunita Tandulwadkar has practised, taught, and shaped reproductive medicine in India for more than 35 years. She is President of ISAR for 2026 to 2028, President of FOGSI 2025, and India's first female gynecological endoscopic surgeon. She has authored 39 books, published more than 106 peer-reviewed papers, and been invited as faculty at over 400 national and international platforms.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-px bg-border-warm border border-border-warm mb-7">
                {[
                  { num: "35+", label: "Years Practice" },
                  { num: "39", label: "Books Authored" },
                  { num: "106+", label: "Peer Papers" },
                ].map((s) => (
                  <div key={s.label} className="bg-cream text-center px-3 py-4">
                    <div className="font-display font-medium text-[clamp(20px,2vw,28px)] text-gold-deep leading-none mb-1">{s.num}</div>
                    <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-slate">{s.label}</div>
                  </div>
                ))}
              </div>

              <Link
                to="/faculty"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 font-body font-medium text-[15px] tracking-[0.02em] border border-gold rounded-[2px] text-gold-deep transition-all duration-300 hover:bg-gold hover:text-navy group"
              >
                Read Dr. Sunita's full profile
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>

            {/* Right — image */}
            <div className="relative">
              <img
                src="/images/course_faculty.webp"
                alt="Dr. Sunita Tandulwadkar"
                className="w-full h-auto object-cover shadow-[0_24px_60px_-12px_rgba(30,42,68,0.25)]"
              />
              {/* Gold accent strip */}
              <div className="h-[3px] bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]" />
              <div className="bg-cream border-x border-b border-border-warm px-5 py-3 flex items-center justify-between">
                <p className="font-display italic text-navy text-[14px] leading-none">Dr. Sunita Tandulwadkar</p>
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-gold-deep">Founder, STAR Academy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[linear-gradient(rgba(8,12,20,0.86),rgba(8,12,20,0.86)),url('/images/navbar.webp')] bg-cover bg-center border-t border-white/6 py-[clamp(56px,7vw,90px)]">
        <div className="max-w-[720px] mx-auto px-[clamp(20px,4vw,80px)] text-center mb-12">
          <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold mb-4">
            Course Questions
          </span>
          <h2 className="font-display font-medium text-[clamp(28px,3vw,40px)] leading-[1.12] text-ivory tracking-[-0.005em]">
            What doctors ask before they enrol.
          </h2>
        </div>
        <Accordion items={faqs} dark />
      </section>

      {/* FINAL CTA */}
      <section className="relative py-[clamp(80px,11vw,60px)] bg-black text-ivory text-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(197,164,109,0.18)_0%,rgba(10,14,22,0)_55%),radial-gradient(ellipse_at_70%_60%,rgba(197,164,109,0.10)_0%,rgba(10,14,22,0)_65%)]"
        />
        <div className="relative z-[1] max-w-[820px] mx-auto px-[clamp(20px,4vw,80px)]">
          <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold mb-6">
            Begin the Pathway
          </span>
          <h2 className="font-display font-medium text-[clamp(38px,5vw,60px)] leading-[1.02] text-gold-light mb-7 tracking-[-0.015em]">
            Master the science of genesis
          </h2>
          <div
            role="img"
            aria-label="Glowing embryo"
            className="w-[140px] h-[140px] mx-auto mt-6 mb-8 rounded-full animate-glow-pulse bg-[radial-gradient(circle_at_35%_35%,rgba(255,235,200,0.95)_0%,rgba(197,164,109,0.65)_25%,rgba(10,14,22,0.05)_60%),radial-gradient(circle_at_50%_50%,rgba(197,164,109,0.4),rgba(10,14,22,0))] shadow-[0_0_70px_rgba(197,164,109,0.5),inset_0_0_30px_rgba(255,235,200,0.35)]"
          />
          <p className="text-[15px] leading-[1.65] text-white0 max-w-[100ch] mx-auto mb-9">
            Join Dr. Sunita Tandulwadkar and the next generation of reproductive
            medicine specialists. The Foundation Series commences 15 July 2026.
            Core, Advanced, and Masterclass follow in sequence
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-9">
            <Link
              to="/course/foundation"
              className="inline-flex items-center gap-2.5 px-7 py-4 font-body font-medium text-[15px] tracking-[0.02em] border border-gold-deep text-black rounded-md bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] group"
            >
              Enroll in the Foundation Series
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setEnquiryLabel("")}
              className="inline-flex items-center gap-2.5 px-7 py-4 font-body font-medium text-[15px] tracking-[0.02em] border border-gold rounded-[2px] text-gold transition-all duration-300 hover:bg-gold hover:text-navy group"
            >
              Talk to our team
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gold/85">
            Commencing 15 July 2026 / Every Wednesday / 8:00 PM IST / Live on
            Zoom
          </div>
        </div>
      </section>

      {/* ENQUIRY POPUP */}
      <EnquiryModal
        open={enquiryLabel !== null}
        onClose={() => setEnquiryLabel(null)}
        courseLabel={enquiryLabel || undefined}
      />
    </>
  );
}
