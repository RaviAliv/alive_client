import { useNavigate, Link } from "react-router-dom";
import { VIDEOS, COURSE } from "../lib/config";

const LECTURE_THUMBS = [
  "/images/Foundation.webp",
  "/images/embryo.webp",
  "/images/jugment.webp",
  "/images/mam2.webp",
  "/images/dna-pattern.webp",
];

const lectures = [
  {
    id: "lecture-1",
    lnum: "L01",
    label: "Lecture One",
    no: "01",
    title: "Severe Male Factor and the Limits of Routine Workup",
    body: "When oligoasthenoteratozoospermia is the diagnosis on paper, the clinical question is what to do next. How to read a poor semen analysis with precision, what is salvageable, and when to stop trying to optimize what cannot be optimized.",
    duration: "90 min · Live",
  },
  {
    id: "lecture-2",
    lnum: "L02",
    label: "Lecture Two",
    no: "02",
    title: "Oocyte Quality and the Follicular Microenvironment",
    body: "Why some oocytes look right and behave wrong. The bioenergetic picture of the ovary, the early signs of reproductive aging, and what can and cannot be done to reprogram outcomes.",
    duration: "90 min · Live",
  },
  {
    id: "lecture-3",
    lnum: "L03",
    label: "Lecture Three",
    no: "03",
    title: "Ovulation Induction for IUI, Read Like a Clinician",
    body: "The protocols are well known. The judgment is not. How to choose induction agents and dosing for the specific patient, not the average one, and how to recognise the cycle that is heading the wrong way before the result confirms it.",
    duration: "90 min · Live",
  },
  {
    id: "lecture-4",
    lnum: "L04",
    label: "Lecture Four",
    no: "04",
    title: "IUI Monitoring and Outcome Optimization",
    body: "The cycle does not end when the trigger is given. How to monitor an IUI cycle in real time, what the follicle and endometrium are telling you on each scan, and the small decisions that compound into better outcomes.",
    duration: "90 min · Live",
  },
  {
    id: "lecture-5",
    lnum: "L05",
    label: "Lecture Five",
    no: "05",
    title: "Pelvic Infections and the Chronic Inflammation Cascade",
    body: "The diagnosis that gets missed because no one is looking for it. How chronic pelvic inflammation quietly shapes implantation, ovulation, and tubal function, and what to test for when standard workups come back clean.",
    duration: "90 min · Live",
  },
];

const fullCurriculum = [
  {
    num: "01",
    title: "Severe Male Factor and the Limits of Routine Workup",
    body: "The semen analysis report tells you what is wrong. It does not tell you what to do next. This lecture covers the framework for assessing severe male factor infertility — what oligoasthenoteratozoospermia actually predicts, when to escalate to advanced tests, when to refer for surgical retrieval, and how to set realistic expectations with a couple whose path forward is going to be longer than the average. The judgment layer that sits above the standard report.",
  },
  {
    num: "02",
    title: "Oocyte Quality and the Follicular Microenvironment",
    body: "Oocyte quality is the variable that decides most IVF outcomes, and the one clinicians have the least control over. This lecture unpacks the bioenergetic and metabolic picture of the ovary, the cellular signals that distinguish a competent oocyte from a compromised one, and the emerging frameworks for ovarian aging that go beyond AMH. The reasoning behind interventions like CoQ10, DHEA, growth hormone, and intraovarian PRP — what the evidence says, what it does not, and where clinical judgment fills in.",
  },
  {
    num: "03",
    title: "Ovulation Induction for IUI, Read Like a Clinician",
    body: "Letrozole, clomiphene, gonadotropins. The agents are well known and the protocols are written down. The clinical question is which agent, which dose, for which patient, and what to watch for once the cycle is in motion. How to read the early follicular response, when to adjust mid-cycle, and how to recognise the patient who is going to overrespond or underrespond before the result tells you.",
  },
  {
    num: "04",
    title: "IUI Monitoring and Outcome Optimization",
    body: "The lecture on what happens between Day 2 and the pregnancy test. How to monitor follicular development in real time, what endometrial thickness and pattern are actually telling you, the timing of the trigger, and the post-trigger window where small decisions about sperm processing, insemination timing, and luteal support compound into outcome differences. The mechanics of a well-run IUI cycle.",
  },
  {
    num: "05",
    title: "Pelvic Infections and the Chronic Inflammation Cascade",
    body: "The most underdiagnosed problem in routine infertility workup. How chronic pelvic infections, including subclinical endometritis and silent tubal disease, shape implantation, ovulation, and reproductive outcomes. What to test for, when to test, the diagnostic methods that catch what standard workups miss, and the treatment frameworks that change the cycle that has been failing for reasons no one could name.",
  },
];

const enrollPerks = [
  "Five live lectures with Dr. Sunita",
  "Live Q&A in every session",
  "Clinical protocol sheets",
  "Certificate on completion",
  "Replay access after the live cohort closes",
];

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function CorePage() {
  const navigate = useNavigate();
  const eyebrow = "font-mono text-[12px] font-medium tracking-[0.28em] uppercase text-t-gold";

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="-mt-20 relative bg-[#1A1505] min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/Foundation.webp')] bg-cover bg-center opacity-[0.10]" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-t-gold/10 blur-[130px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1505]/30 to-[#1A1505]" />
        </div>

        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 pt-28 pb-12 w-full">
          <div className="flex items-center gap-2 mb-5">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30">STAR Curriculum</span>
            <span className="text-white/20 text-xs">/</span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-t-gold/80">Tier II — Core</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            {/* Left — headline */}
            <div className="lg:w-[400px] shrink-0">
              <div className="inline-flex items-center gap-2 border border-t-gold/25 bg-t-gold/10 px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-t-gold animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-t-gold">Opens after Foundation</span>
              </div>

              <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.02em] text-white mb-4" style={{ fontSize: "clamp(38px,4.8vw,62px)" }}>
                Core<br /><span className="text-t-gold">Series</span>
              </h1>

              <h2 className="font-display text-2xl pb-2 italic leading-[1.55] text-white">
                The clinical decisions, taught at the level a fertility doctor actually makes them
              </h2>
              <p className="text-[14px] text-white/55 leading-[1.65] mb-5">
                Five live lectures with Dr. Sunita Tandulwadkar. Designed for the doctor who has the biology straight, and is now ready to think clinically — about the cases a textbook does not make decisions for you on.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["5 Lectures", "Live Q&A", "Certificate"].map((t) => (
                  <span key={t} className="font-mono text-[10.2px] tracking-[0.18em] uppercase text-white/40 border border-white/30 px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>

              {/* Desktop-only button — hidden on mobile */}
              <a
                href="#register"
                className="hidden lg:inline-flex group items-center gap-2.5 bg-t-gold hover:bg-[#A88516] text-navy hover:text-white px-6 py-3 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 rounded-[3px]"
              >
                Notify Me When Core Opens
                <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-150">→</span>
              </a>
            </div>

            {/* Right — intro video */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                {/* Ambient glow */}
                <div className="absolute -inset-6 bg-t-gold/8 blur-[60px] rounded-full pointer-events-none" />

                {/* Floating label badge */}
                <div className="absolute -top-[14px] left-5 z-10 flex items-center gap-1.5 bg-[#221c0a] border border-t-gold/30 px-3 py-[5px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-t-gold animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-t-gold/80">Core Series · Intro</span>
                </div>

                {/* Main frame */}
                <div className="relative rounded-[3px] overflow-hidden border border-t-gold/20 shadow-[0_0_0_1px_rgba(212,166,33,0.06),0_0_60px_rgba(212,166,33,0.10),0_32px_64px_-12px_rgba(0,0,0,0.75)]">
                  {/* Top accent stripe */}
                  <div className="h-[2px] bg-gradient-to-r from-t-gold/15 via-t-gold to-t-gold/15" />

                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${VIDEOS.foundationIntro}?rel=0&modestbranding=1&color=white`}
                      title="Dr. Sunita Tandulwadkar — Core Series Introduction"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>

                  {/* Bottom info bar */}
                  <div className="bg-[#15110a] px-4 py-2.5 flex items-center justify-between border-t border-t-gold/10">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/30">Dr. Sunita Tandulwadkar</span>
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-t-gold/40">STAR Academy</span>
                  </div>
                </div>

                {/* Corner brackets */}
                <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-t-gold/55 pointer-events-none" />
                <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-t-gold/55 pointer-events-none" />
                <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-t-gold/55 pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-t-gold/55 pointer-events-none" />
              </div>

              {/* Mobile-only button — below video */}
              <a
                href="#register"
                className="lg:hidden mt-5 w-full flex items-center justify-center gap-2.5 bg-t-gold hover:bg-[#A88516] text-navy hover:text-white py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 rounded-[3px] group"
              >
                Notify Me When Core Opens
                <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-150">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LECTURE CARDS ────────────────────────────────────── */}
      <section className="bg-[#fdf9ed] pt-14 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">

          <div className="text-center max-w-[520px] mx-auto mb-10">
            <span className={`${eyebrow} block mb-3`}>The Curriculum</span>
            <h2 className="font-display font-medium text-[clamp(26px,3.5vw,38px)] leading-[1.12] text-navy">
              Five lectures, where biology meets the patient
            </h2>
            <p className="mt-2.5 text-[14px] text-slate">
              Opens after the first Foundation cohort closes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {lectures.map((l, idx) => (
              <div
                key={l.id}
                id={l.id}
                className="group bg-white border border-[#ead8a4] rounded-[5px] overflow-hidden flex flex-col hover:-translate-y-[3px] hover:shadow-[0_16px_40px_-16px_rgba(212,166,33,0.30)] hover:border-t-gold transition-all duration-300"
              >
                <div className="relative w-full aspect-video overflow-hidden bg-[#1A1505] shrink-0">
                  <img
                    src={LECTURE_THUMBS[idx]}
                    alt={l.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-55 scale-[1.04] group-hover:scale-100 group-hover:opacity-65 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1505]/75 via-[#1A1505]/20 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/60 bg-black/35 backdrop-blur-sm px-2 py-1">
                      {l.label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-t-gold text-navy px-2 py-1 text-[9px] font-mono tracking-[0.14em] uppercase">
                    <LockIcon size={10} />
                    <span>Locked</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full border border-t-gold/35 bg-black/30 backdrop-blur-sm flex items-center justify-center text-t-gold/50">
                      <LockIcon size={18} />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-3">
                    <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/60">{l.duration}</span>
                  </div>
                </div>

                <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-[9.5px] font-medium tracking-[0.18em] uppercase text-t-gold">
                      {l.label}
                    </span>
                    <span className="font-display italic text-[26px] leading-none text-t-gold/20 font-bold select-none">
                      {l.no}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-[20px] leading-[1.25] text-navy mb-2.5">
                    {l.title}
                  </h3>
                  <p className="text-[13px] leading-[1.65] flex-grow">
                    {l.body}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#f1e3b3] flex items-center justify-between">
                    <Link to="/course/foundation" className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold p-3 rounded-xl tracking-[0.14em] uppercase text-t-gold hover:gap-3 transition-all duration-200">
                      Opens after Foundation
                      <span className="w-4 h-[1.5px] bg-t-gold relative after:content-[''] after:absolute after:right-0 after:-top-[2px] after:w-[5px] after:h-[5px] after:border-t after:border-r after:border-t-gold after:rotate-45" />
                    </Link>
                    <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-t-gold">Tier II</span>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* ── Compact Premium Notify Ribbon ── */}
          <a
            href="#register"
            className="group relative mt-6 block overflow-hidden rounded-[18px] border border-[#4f3f1f] bg-[linear-gradient(135deg,#1A1505_0%,#221c0a_45%,#2c2410_100%)] transition-all duration-300 hover:border-[#7a662f]"
          >
            {/* Soft gold ambient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,166,33,0.16),transparent_40%)]" />

            {/* Subtle texture */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 px-5 py-5 sm:px-6 sm:py-6">

              {/* LEFT */}
              <div className="min-w-0">

                {/* Label */}
                <div className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-[#e0c25c]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A621]" />
                  Core Series
                </div>

                {/* Heading */}
                <h3 className="mt-3 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.05] text-[#f5f1e8]">
                  Join the waitlist for the
                  <span className="block text-[#e0c25c] mt-1">
                    Five-Lecture Core Program
                  </span>
                </h3>

                {/* Meta */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-[0.14em] text-[#94886e]">
                  <span>Live on Zoom</span>

                  <span className="hidden sm:block h-1 w-1 rounded-full bg-[#544324]" />

                  <span>Opens after Foundation</span>

                  <span className="hidden sm:block h-1 w-1 rounded-full bg-[#544324]" />

                  <span>Schedule TBA</span>
                </div>
              </div>

              {/* RIGHT CTA */}
              <div className="flex items-center gap-4 shrink-0">

                {/* Small info */}
                <div className="hidden md:block text-right">
                  <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#827258]">
                    Waitlist Open
                  </div>

                  <div className="mt-1 text-[13px] text-[#d4cdbc]">
                    First notified, first enrolled
                  </div>
                </div>

                {/* Button */}
                <div className="inline-flex items-center gap-3 rounded-full border border-[#7a662f] bg-[#322516] px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 group-hover:border-[#b8923a] group-hover:bg-[#40301d]">
                  Notify Me

                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#4b3a21] transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── WHY THIS COURSE ──────────────────────────────────── */}
      <section className="bg-[#1A1505] py-16">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="border-l-[3px] border-t-gold pl-7">
            <span className={`${eyebrow} block mb-4`}>Why this course exists</span>
            <p className="font-display italic leading-[1.55] text-white/70" style={{ fontSize: "clamp(17px,2vw,22px)" }}>
              For the doctor who has been in practice long enough to know what works most of the time, and quiet enough to admit that the cases that do not respond are the ones they think about on the way home. Core is for those cases. The patient whose semen analysis is bad in a way that no protocol fixes. The cycle that keeps producing the wrong oocyte. The IUI patient who has done everything right and still has not conceived. The chronic pelvic inflammation no one tested for. Core teaches the layer where clinical judgment is built, one difficult case at a time.
            </p>
          </div>
        </div>
      </section>

      {/* ── FULL CURRICULUM + WAITLIST CARD ───────────────── */}
      <section className="bg-[#fdf9ed] pt-16 pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-16 items-start">

            <div>
              <span className={`${eyebrow} block mb-3`}>Full Curriculum</span>
              <h3 className="font-display font-medium text-[clamp(22px,2.5vw,32px)] text-navy mb-1.5 leading-[1.18]">
                Five live lectures with Dr. Sunita Tandulwadkar.
              </h3>
              <p className="font-display italic text-[15px] text-t-gold mb-8">
                What each lecture does for your practice.
              </p>

              <div className="divide-y divide-[#ead8a4]">
                {fullCurriculum.map((l) => (
                  <div key={l.num} className="grid grid-cols-[48px_1fr] gap-4 py-5">
                    <div className="font-display font-bold text-[34px] text-t-gold leading-none pt-1 select-none">
                      {l.num}
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-[19px] text-navy mb-1.5 leading-[1.25]">
                        {l.title}
                      </h4>
                      <p className="text-[13.5px] leading-[1.65] text-slate">{l.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-[100px] h-fit">
              <div className="bg-white border border-[#ead8a4] rounded-[5px] overflow-hidden shadow-[0_4px_24px_-6px_rgba(212,166,33,0.18)]">
                <div className="h-[3px] bg-gradient-to-r from-t-gold/30 via-t-gold to-t-gold/30" />
                <div className="p-7">
                  <span className={`${eyebrow} block mb-2.5`}>Opening soon</span>
                  <h3 className="font-display font-medium text-[23px] text-navy mb-2.5 leading-[1.22]">
                    Be the first to know when Core opens.
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-slate mb-5">
                    Core opens after the first Foundation cohort closes. Leave your details and we will write to you when enrolment opens, with full schedule and pricing.
                  </p>

                  <div className="bg-[#fbf3d1] border border-t-gold/40 rounded-[3px] px-4 py-3 mb-5">
                    <div className="font-display font-semibold text-[28px] text-navy leading-none mb-0.5">
                      Pricing TBA
                    </div>
                    <div className="font-mono text-[11px] py-2 tracking-wide">Core Series · Tier II</div>
                  </div>

                  <a href="#register" className="w-full flex items-center justify-center gap-2 bg-t-gold hover:bg-[#A88516] text-navy hover:text-white py-3 font-body font-semibold text-[13px] tracking-[0.03em] transition-colors duration-250 group mb-2.5 rounded-[3px]">
                    Notify Me
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </a>
                  <button type="button" onClick={() => navigate("/course/foundation")} className="w-full flex items-center justify-center text-t-gold border border-t-gold/35 hover:border-t-gold hover:bg-[#fbf3d1] py-3 font-body font-medium text-[13px] transition-all duration-200 rounded-[3px]">
                    See Foundation first
                  </button>

                  <ul className="mt-5 pt-5 border-t border-[#f1e3b3] space-y-2.5">
                    {enrollPerks.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[13px] text-soft-black">
                        <span className="w-[18px] h-[18px] rounded-full bg-t-gold/10 border border-t-gold/25 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 10 10" width="10" height="10">
                            <path d="M2 5l2 2 4-4" stroke="#D4A621" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          </svg>
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── REGISTER / NOTIFY SECTION ─────────────────────────── */}
      <section id="register" className="bg-[#1A1505] pt-16 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">

            {/* Left — context */}
            <div className="lg:pt-2">
              <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-t-gold block mb-3">Register Interest</span>
              <h2 className="font-display font-medium text-white leading-[1.15] mb-4" style={{ fontSize: "clamp(24px,3vw,38px)" }}>
                Join the Core waitlist.
              </h2>
              <p className="text-[14px] text-white/45 leading-[1.7] mb-8 max-w-[38ch]">
                Reach out with any question about Core, the pathway, or how it follows on from Foundation. We respond to every enquiry.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "🔓", text: "Opens after first Foundation cohort closes" },
                  { icon: "🖥", text: "Live on Zoom — attend from anywhere" },
                  { icon: "🎓", text: "Certificate on completion" },
                  { icon: "💬", text: "Interactive Q&A every session" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-[16px]">{item.icon}</span>
                    <span className="text-[13px] text-white/50">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-t-gold/10">
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-gold/50 mb-2">Foundation begins</p>
                <p className="font-display text-[22px] text-white/80">{COURSE.startDate}</p>
              </div>
            </div>

            {/* Right — direct contact panel */}
            <div className="bg-[#221c0a] border border-t-gold/20 rounded-[4px] overflow-hidden shadow-[0_0_0_1px_rgba(212,166,33,0.05),0_24px_60px_-10px_rgba(0,0,0,0.5)]">
              <div className="h-[2px] bg-gradient-to-r from-t-gold/15 via-t-gold to-t-gold/15" />
              <div className="p-6 sm:p-8">
                <span className="font-mono text-[11px] tracking-[0.26em] uppercase text-t-gold block text-center mb-1.5">Core Series · Tier II</span>
                <h3 className="font-display text-white text-center text-[24px] leading-tight mb-1">
                  Talk to the Academy team.
                </h3>
                <p className="text-center text-[13px] text-white/55 leading-[1.6] mb-6">
                  Direct line to the people who will be teaching the cohort. No forms, no funnels.
                </p>

                <div className="space-y-3 mb-6">
                  <a
                    href="tel:+919876543210"
                    className="group flex items-center justify-between gap-4 border border-t-gold/25 bg-t-gold/[0.04] hover:bg-t-gold/[0.12] hover:border-t-gold/55 px-4 py-3 rounded-[3px] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-t-gold/15 border border-t-gold/30 flex items-center justify-center text-t-gold">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-gold/70 mb-0.5">Phone</p>
                        <p className="font-display text-[16px] text-white leading-none">+91 98765 43210</p>
                      </div>
                    </div>
                    <span className="text-t-gold/60 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>

                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border border-t-gold/25 bg-t-gold/[0.04] hover:bg-t-gold/[0.12] hover:border-t-gold/55 px-4 py-3 rounded-[3px] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-t-gold/15 border border-t-gold/30 flex items-center justify-center text-t-gold">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1c-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-gold/70 mb-0.5">WhatsApp</p>
                        <p className="font-display text-[16px] text-white leading-none">Chat with us</p>
                      </div>
                    </div>
                    <span className="text-t-gold/60 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>

                  <a
                    href="mailto:hello@staracademy.in"
                    className="group flex items-center justify-between gap-4 border border-t-gold/25 bg-t-gold/[0.04] hover:bg-t-gold/[0.12] hover:border-t-gold/55 px-4 py-3 rounded-[3px] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-t-gold/15 border border-t-gold/30 flex items-center justify-center text-t-gold">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-gold/70 mb-0.5">Email</p>
                        <p className="font-display text-[16px] text-white leading-none break-all">hello@staracademy.in</p>
                      </div>
                    </div>
                    <span className="text-t-gold/60 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="w-full inline-flex items-center justify-center gap-2 bg-t-gold hover:bg-[#A88516] text-navy hover:text-white py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase rounded-[3px] transition-colors duration-200 group"
                >
                  Notify Me When Core Opens
                  <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-150">→</span>
                </button>

                <p className="mt-4 text-center font-mono text-[9px] tracking-[0.22em] uppercase text-white/35">
                  Replies within 1 working day
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
