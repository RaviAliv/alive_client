import { useNavigate, Link } from "react-router-dom";
import { VIDEOS, COURSE } from "../lib/config";

const LECTURE_THUMBS = [
  "/images/Advanced.webp",
  "/images/embryo.webp",
  "/images/dna-pattern.webp",
  "/images/Foundation.webp",
  "/images/mam2.webp",
];

const lectures = [
  { id: "lecture-1", lnum: "L01", label: "Lecture One",   no: "01", title: "Stimulation Strategy in IVF",          body: "Building protocols that match the patient, not the textbook. How to choose stimulation logic from age, reserve, and prior response.",                                                            duration: "90 min · Live" },
  { id: "lecture-2", lnum: "L02", label: "Lecture Two",   no: "02", title: "OHSS Prevention and Management",       body: "Reading risk early, choosing the right trigger, and managing the patient when prevention is not enough.",                                                                                                 duration: "90 min · Live" },
  { id: "lecture-3", lnum: "L03", label: "Lecture Three", no: "03", title: "The Retrieval, Done Right",            body: "Technique, timing, and the small decisions that change yield and safety in the OPU theatre.",                                                                                                            duration: "90 min · Live" },
  { id: "lecture-4", lnum: "L04", label: "Lecture Four",  no: "04", title: "Embryology for the Clinician",          body: "What happens in the lab, and what every IVF doctor should know about culture, grading, and the moments where clinical judgment intersects with embryology.",                                          duration: "90 min · Live" },
  { id: "lecture-5", lnum: "L05", label: "Lecture Five",  no: "05", title: "The Implantation Window",              body: "How to think about endometrial receptivity in practical, clinical terms — and how that changes transfer decisions.",                                                                                       duration: "90 min · Live" },
];

const fullCurriculum = [
  { num: "01", title: "Stimulation Strategy in IVF",         body: "Stimulation is not a single protocol. This lecture walks through the decision logic of choosing antagonist vs agonist, gonadotropin dosing for the specific ovary in front of you, and how to adapt mid-cycle when the response is reading differently than predicted." },
  { num: "02", title: "OHSS Prevention and Management",      body: "OHSS is a risk you read in the first scan, not a complication you manage in the last. How to predict high-responders, when to switch trigger, and the management framework when prevention has not worked." },
  { num: "03", title: "The Retrieval, Done Right",           body: "OPU is technical, but the outcome difference between average and excellent comes from small decisions — needle approach, aspiration pressure, follicle flushing logic, and intra-operative judgment that compounds across hundreds of cycles." },
  { num: "04", title: "Embryology for the Clinician",        body: "The clinician who understands what is happening in the lab makes better decisions at every step. Culture systems, grading frameworks, freeze-thaw realities, and the embryology questions every IVF doctor should be able to answer." },
  { num: "05", title: "The Implantation Window",             body: "Endometrial receptivity is the variable that decides whether a good embryo becomes a pregnancy. How to think about the window practically — preparation, timing, and the decisions that matter clinically when transfer outcomes are not adding up." },
];

const enrollPerks = [
  "Seven live lectures with Dr. Sunita",
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

export default function AdvancedPage() {
  const navigate = useNavigate();
  const eyebrow = "font-mono text-[12px] font-medium tracking-[0.28em] uppercase text-t-blue";

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="-mt-20 relative bg-[#0a1428] min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/Advanced.webp')] bg-cover bg-center opacity-[0.10]" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-t-blue/10 blur-[130px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1428]/30 to-[#0a1428]" />
        </div>

        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 pt-28 pb-12 w-full">
          <div className="flex items-center gap-2 mb-5">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30">STAR Curriculum</span>
            <span className="text-white/20 text-xs">/</span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-t-blue/80">Tier III — Advanced</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="lg:w-[400px] shrink-0">
              <div className="inline-flex items-center gap-2 border border-t-blue/25 bg-t-blue/10 px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-t-blue animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-t-blue">Opens after Core</span>
              </div>

              <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.02em] text-white mb-4" style={{ fontSize: "clamp(38px,4.8vw,62px)" }}>
                Advanced<br /><span className="text-t-blue">Series</span>
              </h1>

              <h2 className="font-display text-2xl pb-2 italic leading-[1.55] text-white">
                IVF strategy, taught with the precision of three decades of practice
              </h2>
              <p className="text-[14px] text-white/55 leading-[1.65] mb-5">
                Seven live lectures with Dr. Sunita Tandulwadkar. For the IVF practitioner who is past the protocols and ready for the tactical execution that separates outcomes.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["7 Lectures", "Live Q&A", "Certificate"].map((t) => (
                  <span key={t} className="font-mono text-[10.2px] tracking-[0.18em] uppercase text-white/40 border border-white/30 px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="#register"
                className="hidden lg:inline-flex group items-center gap-2.5 bg-t-blue hover:bg-[#164785] text-white px-6 py-3 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 rounded-[3px]"
              >
                Notify Me When Advanced Opens
                <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-150">→</span>
              </a>
            </div>

            <div className="flex-1 min-w-0">
              <div className="relative">
                <div className="absolute -inset-6 bg-t-blue/8 blur-[60px] rounded-full pointer-events-none" />

                <div className="absolute -top-[14px] left-5 z-10 flex items-center gap-1.5 bg-[#0e1a32] border border-t-blue/30 px-3 py-[5px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-t-blue animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-t-blue/80">Advanced Series · Intro</span>
                </div>

                <div className="relative rounded-[3px] overflow-hidden border border-t-blue/20 shadow-[0_0_0_1px_rgba(30,90,166,0.06),0_0_60px_rgba(30,90,166,0.10),0_32px_64px_-12px_rgba(0,0,0,0.75)]">
                  <div className="h-[2px] bg-gradient-to-r from-t-blue/15 via-t-blue to-t-blue/15" />

                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${VIDEOS.foundationIntro}?rel=0&modestbranding=1&color=white`}
                      title="Dr. Sunita Tandulwadkar — Advanced Series Introduction"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>

                  <div className="bg-[#080f1f] px-4 py-2.5 flex items-center justify-between border-t border-t-blue/10">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/30">Dr. Sunita Tandulwadkar</span>
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-t-blue/40">STAR Academy</span>
                  </div>
                </div>

                <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-t-blue/55 pointer-events-none" />
                <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-t-blue/55 pointer-events-none" />
                <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-t-blue/55 pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-t-blue/55 pointer-events-none" />
              </div>

              <a
                href="#register"
                className="lg:hidden mt-5 w-full flex items-center justify-center gap-2.5 bg-t-blue hover:bg-[#164785] text-white py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 rounded-[3px] group"
              >
                Notify Me When Advanced Opens
                <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-150">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LECTURE CARDS ────────────────────────────────────── */}
      <section className="bg-[#eef3fb] pt-14 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">

          <div className="text-center max-w-[520px] mx-auto mb-10">
            <span className={`${eyebrow} block mb-3`}>The Curriculum</span>
            <h2 className="font-display font-medium text-[clamp(26px,3.5vw,38px)] leading-[1.12] text-navy">
              Seven lectures, IVF strategy refined
            </h2>
            <p className="mt-2.5 text-[14px] text-slate">
              Opens after the Core cohort closes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {lectures.map((l, idx) => (
              <div
                key={l.id}
                id={l.id}
                className="group bg-white border border-[#cfdbef] rounded-[5px] overflow-hidden flex flex-col hover:-translate-y-[3px] hover:shadow-[0_16px_40px_-16px_rgba(30,90,166,0.30)] hover:border-t-blue transition-all duration-300"
              >
                <div className="relative w-full aspect-video overflow-hidden bg-[#0a1428] shrink-0">
                  <img
                    src={LECTURE_THUMBS[idx]}
                    alt={l.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-55 scale-[1.04] group-hover:scale-100 group-hover:opacity-65 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1428]/75 via-[#0a1428]/20 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/60 bg-black/35 backdrop-blur-sm px-2 py-1">
                      {l.label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-t-blue text-white px-2 py-1 text-[9px] font-mono tracking-[0.14em] uppercase">
                    <LockIcon size={10} />
                    <span>Locked</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full border border-t-blue/35 bg-black/30 backdrop-blur-sm flex items-center justify-center text-t-blue/50">
                      <LockIcon size={18} />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-3">
                    <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/60">{l.duration}</span>
                  </div>
                </div>

                <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-[9.5px] font-medium tracking-[0.18em] uppercase text-t-blue">
                      {l.label}
                    </span>
                    <span className="font-display italic text-[26px] leading-none text-t-blue/20 font-bold select-none">
                      {l.no}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-[20px] leading-[1.25] text-navy mb-2.5">
                    {l.title}
                  </h3>
                  <p className="text-[13px] leading-[1.65] flex-grow">
                    {l.body}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#dde7f6] flex items-center justify-between">
                    <Link to="/course/core" className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold p-3 rounded-xl tracking-[0.14em] uppercase text-t-blue hover:gap-3 transition-all duration-200">
                      Opens after Core
                      <span className="w-4 h-[1.5px] bg-t-blue relative after:content-[''] after:absolute after:right-0 after:-top-[2px] after:w-[5px] after:h-[5px] after:border-t after:border-r after:border-t-blue after:rotate-45" />
                    </Link>
                    <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-t-blue">Tier III</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS COURSE ──────────────────────────────────── */}
      <section className="bg-[#0a1428] py-16">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="border-l-[3px] border-t-blue pl-7">
            <span className={`${eyebrow} block mb-4`}>Why this course exists</span>
            <p className="font-display italic leading-[1.55] text-white/70" style={{ fontSize: "clamp(17px,2vw,22px)" }}>
              For the IVF practitioner who has run hundreds of cycles, but knows that every protocol decision could be sharper. Who wants to refine their stimulation logic, retrieval technique, transfer mechanics, and OHSS prevention with the precision of someone who has done this work for three decades. Advanced exists for the doctor who is past the protocols and ready for the tactical execution that separates outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ── FULL CURRICULUM + WAITLIST CARD ───────────────── */}
      <section className="bg-[#eef3fb] pt-16 pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-16 items-start">

            <div>
              <span className={`${eyebrow} block mb-3`}>Full Curriculum</span>
              <h3 className="font-display font-medium text-[clamp(22px,2.5vw,32px)] text-navy mb-1.5 leading-[1.18]">
                Seven live lectures with Dr. Sunita Tandulwadkar.
              </h3>
              <p className="font-display italic text-[15px] text-t-blue mb-8">
                What each lecture does for your IVF practice.
              </p>

              <div className="divide-y divide-[#cfdbef]">
                {fullCurriculum.map((l) => (
                  <div key={l.num} className="grid grid-cols-[48px_1fr] gap-4 py-5">
                    <div className="font-display font-bold text-[34px] text-t-blue leading-none pt-1 select-none">
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
              <div className="bg-white border border-[#cfdbef] rounded-[5px] overflow-hidden shadow-[0_4px_24px_-6px_rgba(30,90,166,0.18)]">
                <div className="h-[3px] bg-gradient-to-r from-t-blue/30 via-t-blue to-t-blue/30" />
                <div className="p-7">
                  <span className={`${eyebrow} block mb-2.5`}>Opening soon</span>
                  <h3 className="font-display font-medium text-[23px] text-navy mb-2.5 leading-[1.22]">
                    Be the first to know when Advanced opens.
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-slate mb-5">
                    Advanced opens after the Core cohort closes. Leave your details and we will write to you when enrolment opens, with full schedule and pricing.
                  </p>

                  <div className="bg-[#dee9f8] border border-t-blue/40 rounded-[3px] px-4 py-3 mb-5">
                    <div className="font-display font-semibold text-[28px] text-navy leading-none mb-0.5">
                      Pricing TBA
                    </div>
                    <div className="font-mono text-[11px] py-2 tracking-wide">Advanced Series · Tier III</div>
                  </div>

                  <a href="#register" className="w-full flex items-center justify-center gap-2 bg-t-blue hover:bg-[#164785] text-white py-3 font-body font-semibold text-[13px] tracking-[0.03em] transition-colors duration-250 group mb-2.5 rounded-[3px]">
                    Notify Me
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </a>
                  <button type="button" onClick={() => navigate("/course/foundation")} className="w-full flex items-center justify-center text-t-blue border border-t-blue/35 hover:border-t-blue hover:bg-[#dee9f8] py-3 font-body font-medium text-[13px] transition-all duration-200 rounded-[3px]">
                    Start with Foundation
                  </button>

                  <ul className="mt-5 pt-5 border-t border-[#dde7f6] space-y-2.5">
                    {enrollPerks.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[13px] text-soft-black">
                        <span className="w-[18px] h-[18px] rounded-full bg-t-blue/10 border border-t-blue/25 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 10 10" width="10" height="10">
                            <path d="M2 5l2 2 4-4" stroke="#1E5AA6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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

      {/* ── REGISTER SECTION ─────────────────────────────────── */}
      <section id="register" className="bg-[#0a1428] pt-16 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">

            <div className="lg:pt-2">
              <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-t-blue block mb-3">Register Interest</span>
              <h2 className="font-display font-medium text-white leading-[1.15] mb-4" style={{ fontSize: "clamp(24px,3vw,38px)" }}>
                Join the Advanced waitlist.
              </h2>
              <p className="text-[14px] text-white/45 leading-[1.7] mb-8 max-w-[38ch]">
                Reach out with any question about Advanced, the pathway, or how it follows on from Core. We respond to every enquiry.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "🔓", text: "Opens after Core cohort closes" },
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

              <div className="mt-8 pt-8 border-t border-t-blue/10">
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-blue/50 mb-2">Foundation begins</p>
                <p className="font-display text-[22px] text-white/80">{COURSE.startDate}</p>
              </div>
            </div>

            <div className="bg-[#0e1a32] border border-t-blue/20 rounded-[4px] overflow-hidden shadow-[0_0_0_1px_rgba(30,90,166,0.05),0_24px_60px_-10px_rgba(0,0,0,0.5)]">
              <div className="h-[2px] bg-gradient-to-r from-t-blue/15 via-t-blue to-t-blue/15" />
              <div className="p-6 sm:p-8">
                <span className="font-mono text-[11px] tracking-[0.26em] uppercase text-t-blue block text-center mb-1.5">Advanced Series · Tier III</span>
                <h3 className="font-display text-white text-center text-[24px] leading-tight mb-1">
                  Talk to the Academy team.
                </h3>
                <p className="text-center text-[13px] text-white/55 leading-[1.6] mb-6">
                  Direct line to the people who will be teaching the cohort. No forms, no funnels.
                </p>

                <div className="space-y-3 mb-6">
                  <a href="tel:+919876543210" className="group flex items-center justify-between gap-4 border border-t-blue/25 bg-t-blue/[0.04] hover:bg-t-blue/[0.12] hover:border-t-blue/55 px-4 py-3 rounded-[3px] transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-t-blue/15 border border-t-blue/30 flex items-center justify-center text-t-blue">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-blue/70 mb-0.5">Phone</p>
                        <p className="font-display text-[16px] text-white leading-none">+91 98765 43210</p>
                      </div>
                    </div>
                    <span className="text-t-blue/60 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>

                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border border-t-blue/25 bg-t-blue/[0.04] hover:bg-t-blue/[0.12] hover:border-t-blue/55 px-4 py-3 rounded-[3px] transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-t-blue/15 border border-t-blue/30 flex items-center justify-center text-t-blue">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1c-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-blue/70 mb-0.5">WhatsApp</p>
                        <p className="font-display text-[16px] text-white leading-none">Chat with us</p>
                      </div>
                    </div>
                    <span className="text-t-blue/60 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>

                  <a href="mailto:hello@staracademy.in" className="group flex items-center justify-between gap-4 border border-t-blue/25 bg-t-blue/[0.04] hover:bg-t-blue/[0.12] hover:border-t-blue/55 px-4 py-3 rounded-[3px] transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-t-blue/15 border border-t-blue/30 flex items-center justify-center text-t-blue">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-blue/70 mb-0.5">Email</p>
                        <p className="font-display text-[16px] text-white leading-none break-all">hello@staracademy.in</p>
                      </div>
                    </div>
                    <span className="text-t-blue/60 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                </div>

                <button type="button" onClick={() => navigate("/contact")} className="w-full inline-flex items-center justify-center gap-2 bg-t-blue hover:bg-[#164785] text-white py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase rounded-[3px] transition-colors duration-200 group">
                  Notify Me When Advanced Opens
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
