import { useNavigate, Link } from "react-router-dom";
import { VIDEOS, COURSE } from "../lib/config";

const LECTURE_THUMBS = [
  "/images/Masterclass.webp",
  "/images/embryo.webp",
  "/images/dna-pattern.webp",
  "/images/Foundation.webp",
  "/images/mam2.webp",
];

const lectures = [
  { id: "lecture-1", lnum: "L01", label: "Lecture One",   no: "01", title: "IUI Masterclass",                       body: "Refining IUI practice to its highest expression — the small decisions that compound into pregnancy rates.",  duration: "60 min · Live" },
  { id: "lecture-2", lnum: "L02", label: "Lecture Two",   no: "02", title: "Endometriosis and Fertility",           body: "Approaching one of the most complex drivers of subfertility — diagnosis, surgical judgment, and IVF planning.", duration: "60 min · Live" },
  { id: "lecture-3", lnum: "L03", label: "Lecture Three", no: "03", title: "Unexplained Infertility",               body: "Working through the cases where the workup is normal but the conception is not.",                            duration: "60 min · Live" },
  { id: "lecture-4", lnum: "L04", label: "Lecture Four",  no: "04", title: "Recurrent Implantation Failure",        body: "The investigative and therapeutic logic for one of IVF's hardest scenarios.",                                duration: "60 min · Live" },
  { id: "lecture-5", lnum: "L05", label: "Lecture Five",  no: "05", title: "Recurrent Pregnancy Loss",              body: "A structured framework for evaluating and treating recurrent miscarriage.",                                  duration: "60 min · Live" },
];

const fullCurriculum = [
  { num: "01", title: "IUI Masterclass",                body: "Past the basics, into the layer where IUI outcomes are decided. Patient selection beyond standard indications, monitoring decisions that separate average from excellent, and the protocol refinements drawn from thousands of cycles." },
  { num: "02", title: "Endometriosis and Fertility",    body: "How endometriosis shapes fertility decisions — when to operate, when to go straight to IVF, and how to plan stimulation in the disease-altered ovary. The clinical judgment that decides timeline and outcome." },
  { num: "03", title: "Unexplained Infertility",        body: "The diagnosis that is not really a diagnosis. How to extend the workup intelligently, when to stop investigating, and how to choose the treatment ladder when nothing on paper explains the failure." },
  { num: "04", title: "Recurrent Implantation Failure", body: "RIF is a clinical phenotype with many causes. A framework for sequencing investigation — uterine, immunological, embryonic, endometrial — and a therapeutic logic for the patient whose embryos look right but never stick." },
  { num: "05", title: "Recurrent Pregnancy Loss",       body: "How to structure RPL evaluation without over-investigating, the conditions that are actionable, those that are not, and the counselling framework for the couple whose pregnancies keep ending." },
];

const enrollPerks = [
  "Ten 60-minute deep-dive lectures",
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

export default function MasterclassPage() {
  const navigate = useNavigate();
  const eyebrow = "font-mono text-[12px] font-medium tracking-[0.28em] uppercase text-t-red";

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="-mt-20 relative bg-[#170709] min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/Masterclass.webp')] bg-cover bg-center opacity-[0.10]" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-t-red/10 blur-[130px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#170709]/30 to-[#170709]" />
        </div>

        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 pt-28 pb-12 w-full">
          <div className="flex items-center gap-2 mb-5">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30">STAR Curriculum</span>
            <span className="text-white/20 text-xs">/</span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-t-red/80">Tier IV — Masterclass</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="lg:w-[400px] shrink-0">
              <div className="inline-flex items-center gap-2 border border-t-red/25 bg-t-red/10 px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-t-red animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-t-red">Opens after Advanced</span>
              </div>

              <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.02em] text-white mb-4" style={{ fontSize: "clamp(38px,4.8vw,62px)" }}>
                Masterclass<br /><span className="text-t-red">Series</span>
              </h1>

              <h2 className="font-display text-2xl pb-2 italic leading-[1.55] text-white">
                The hardest cases in reproductive medicine, approached with judgment
              </h2>
              <p className="text-[14px] text-white/55 leading-[1.65] mb-5">
                Ten 60-minute deep-dives with Dr. Sunita Tandulwadkar. For the doctor ready to think about the cases where protocols run out and clinical judgment takes over.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["10 Lectures", "Live Q&A", "Certificate"].map((t) => (
                  <span key={t} className="font-mono text-[10.2px] tracking-[0.18em] uppercase text-white/40 border border-white/30 px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="#register"
                className="hidden lg:inline-flex group items-center gap-2.5 bg-t-red hover:bg-[#a00c25] text-white px-6 py-3 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 rounded-[3px]"
              >
                Notify Me When Masterclass Opens
                <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-150">→</span>
              </a>
            </div>

            <div className="flex-1 min-w-0">
              <div className="relative">
                <div className="absolute -inset-6 bg-t-red/8 blur-[60px] rounded-full pointer-events-none" />

                <div className="absolute -top-[14px] left-5 z-10 flex items-center gap-1.5 bg-[#1f0a0d] border border-t-red/30 px-3 py-[5px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-t-red animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-t-red/80">Masterclass Series · Intro</span>
                </div>

                <div className="relative rounded-[3px] overflow-hidden border border-t-red/20 shadow-[0_0_0_1px_rgba(200,16,46,0.06),0_0_60px_rgba(200,16,46,0.10),0_32px_64px_-12px_rgba(0,0,0,0.75)]">
                  <div className="h-[2px] bg-gradient-to-r from-t-red/15 via-t-red to-t-red/15" />

                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${VIDEOS.foundationIntro}?rel=0&modestbranding=1&color=white`}
                      title="Dr. Sunita Tandulwadkar — Masterclass Series Introduction"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>

                  <div className="bg-[#13060a] px-4 py-2.5 flex items-center justify-between border-t border-t-red/10">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/30">Dr. Sunita Tandulwadkar</span>
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-t-red/40">STAR Academy</span>
                  </div>
                </div>

                <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-t-red/55 pointer-events-none" />
                <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-t-red/55 pointer-events-none" />
                <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-t-red/55 pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-t-red/55 pointer-events-none" />
              </div>

              <a
                href="#register"
                className="lg:hidden mt-5 w-full flex items-center justify-center gap-2.5 bg-t-red hover:bg-[#a00c25] text-white py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 rounded-[3px] group"
              >
                Notify Me When Masterclass Opens
                <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-150">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LECTURE CARDS ────────────────────────────────────── */}
      <section className="bg-[#fbf0f2] pt-14 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">

          <div className="text-center max-w-[520px] mx-auto mb-10">
            <span className={`${eyebrow} block mb-3`}>The Curriculum</span>
            <h2 className="font-display font-medium text-[clamp(26px,3.5vw,38px)] leading-[1.12] text-navy">
              Ten deep-dives on the cases that matter most
            </h2>
            <p className="mt-2.5 text-[14px] text-slate">
              Opens after the Advanced cohort closes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {lectures.map((l, idx) => (
              <div
                key={l.id}
                id={l.id}
                className="group bg-white border border-[#f0cfd5] rounded-[5px] overflow-hidden flex flex-col hover:-translate-y-[3px] hover:shadow-[0_16px_40px_-16px_rgba(200,16,46,0.30)] hover:border-t-red transition-all duration-300"
              >
                <div className="relative w-full aspect-video overflow-hidden bg-[#170709] shrink-0">
                  <img
                    src={LECTURE_THUMBS[idx]}
                    alt={l.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-55 scale-[1.04] group-hover:scale-100 group-hover:opacity-65 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#170709]/75 via-[#170709]/20 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/60 bg-black/35 backdrop-blur-sm px-2 py-1">
                      {l.label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-t-red text-white px-2 py-1 text-[9px] font-mono tracking-[0.14em] uppercase">
                    <LockIcon size={10} />
                    <span>Locked</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full border border-t-red/35 bg-black/30 backdrop-blur-sm flex items-center justify-center text-t-red/50">
                      <LockIcon size={18} />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-3">
                    <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/60">{l.duration}</span>
                  </div>
                </div>

                <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-[9.5px] font-medium tracking-[0.18em] uppercase text-t-red">
                      {l.label}
                    </span>
                    <span className="font-display italic text-[26px] leading-none text-t-red/20 font-bold select-none">
                      {l.no}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-[20px] leading-[1.25] text-navy mb-2.5">
                    {l.title}
                  </h3>
                  <p className="text-[13px] leading-[1.65] flex-grow">
                    {l.body}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#f5dfe3] flex items-center justify-between">
                    <Link to="/course/advanced" className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold p-3 rounded-xl tracking-[0.14em] uppercase text-t-red hover:gap-3 transition-all duration-200">
                      Opens after Advanced
                      <span className="w-4 h-[1.5px] bg-t-red relative after:content-[''] after:absolute after:right-0 after:-top-[2px] after:w-[5px] after:h-[5px] after:border-t after:border-r after:border-t-red after:rotate-45" />
                    </Link>
                    <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-t-red">Tier IV</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS COURSE ──────────────────────────────────── */}
      <section className="bg-[#170709] py-16">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="border-l-[3px] border-t-red pl-7">
            <span className={`${eyebrow} block mb-4`}>Why this course exists</span>
            <p className="font-display italic leading-[1.55] text-white/70" style={{ fontSize: "clamp(17px,2vw,22px)" }}>
              For the experienced doctor who knows that the cases that matter most are the ones that do not follow the textbook. Recurrent implantation failure. Recurrent pregnancy loss. Diminished ovarian reserve. Endometriosis. The cases where protocols run out and judgment takes over. Masterclass exists for the doctor who is ready to think about these cases with the depth they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* ── FULL CURRICULUM + WAITLIST CARD ───────────────── */}
      <section className="bg-[#fbf0f2] pt-16 pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-16 items-start">

            <div>
              <span className={`${eyebrow} block mb-3`}>Full Curriculum</span>
              <h3 className="font-display font-medium text-[clamp(22px,2.5vw,32px)] text-navy mb-1.5 leading-[1.18]">
                Ten deep-dive lectures with Dr. Sunita Tandulwadkar.
              </h3>
              <p className="font-display italic text-[15px] text-t-red mb-8">
                The cases where clinical judgment is built.
              </p>

              <div className="divide-y divide-[#f0cfd5]">
                {fullCurriculum.map((l) => (
                  <div key={l.num} className="grid grid-cols-[48px_1fr] gap-4 py-5">
                    <div className="font-display font-bold text-[34px] text-t-red leading-none pt-1 select-none">
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

              <p className="mt-7 px-5 py-4 bg-t-red/8 border-l-2 border-t-red font-display italic text-[14px] leading-[1.6] text-slate">
                Plus five further lectures on diminished ovarian reserve, biological therapies, myoma management, male factor and azoospermia, and PCOS.
              </p>
            </div>

            <aside className="lg:sticky lg:top-[100px] h-fit">
              <div className="bg-white border border-[#f0cfd5] rounded-[5px] overflow-hidden shadow-[0_4px_24px_-6px_rgba(200,16,46,0.18)]">
                <div className="h-[3px] bg-gradient-to-r from-t-red/30 via-t-red to-t-red/30" />
                <div className="p-7">
                  <span className={`${eyebrow} block mb-2.5`}>Opening soon</span>
                  <h3 className="font-display font-medium text-[23px] text-navy mb-2.5 leading-[1.22]">
                    Be the first to know when Masterclass opens.
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-slate mb-5">
                    Masterclass opens after the Advanced cohort closes. Leave your details and we will write to you when enrolment opens, with full schedule and pricing.
                  </p>

                  <div className="bg-[#f9dde2] border border-t-red/40 rounded-[3px] px-4 py-3 mb-5">
                    <div className="font-display font-semibold text-[28px] text-navy leading-none mb-0.5">
                      Pricing TBA
                    </div>
                    <div className="font-mono text-[11px] py-2 tracking-wide">Masterclass Series · Tier IV</div>
                  </div>

                  <a href="#register" className="w-full flex items-center justify-center gap-2 bg-t-red hover:bg-[#a00c25] text-white py-3 font-body font-semibold text-[13px] tracking-[0.03em] transition-colors duration-250 group mb-2.5 rounded-[3px]">
                    Notify Me
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </a>
                  <button type="button" onClick={() => navigate("/course/foundation")} className="w-full flex items-center justify-center text-t-red border border-t-red/35 hover:border-t-red hover:bg-[#f9dde2] py-3 font-body font-medium text-[13px] transition-all duration-200 rounded-[3px]">
                    Start with Foundation
                  </button>

                  <ul className="mt-5 pt-5 border-t border-[#f5dfe3] space-y-2.5">
                    {enrollPerks.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[13px] text-soft-black">
                        <span className="w-[18px] h-[18px] rounded-full bg-t-red/10 border border-t-red/25 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 10 10" width="10" height="10">
                            <path d="M2 5l2 2 4-4" stroke="#C8102E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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
      <section id="register" className="bg-[#170709] pt-16 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">

            <div className="lg:pt-2">
              <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-t-red block mb-3">Register Interest</span>
              <h2 className="font-display font-medium text-white leading-[1.15] mb-4" style={{ fontSize: "clamp(24px,3vw,38px)" }}>
                Join the Masterclass waitlist.
              </h2>
              <p className="text-[14px] text-white/45 leading-[1.7] mb-8 max-w-[38ch]">
                Reach out with any question about Masterclass, the pathway, or how the highest tier follows on from Advanced. We respond to every enquiry.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "🔓", text: "Opens after Advanced cohort closes" },
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

              <div className="mt-8 pt-8 border-t border-t-red/10">
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-red/50 mb-2">Foundation begins</p>
                <p className="font-display text-[22px] text-white/80">{COURSE.startDate}</p>
              </div>
            </div>

            <div className="bg-[#1f0a0d] border border-t-red/20 rounded-[4px] overflow-hidden shadow-[0_0_0_1px_rgba(200,16,46,0.05),0_24px_60px_-10px_rgba(0,0,0,0.5)]">
              <div className="h-[2px] bg-gradient-to-r from-t-red/15 via-t-red to-t-red/15" />
              <div className="p-6 sm:p-8">
                <span className="font-mono text-[11px] tracking-[0.26em] uppercase text-t-red block text-center mb-1.5">Masterclass Series · Tier IV</span>
                <h3 className="font-display text-white text-center text-[24px] leading-tight mb-1">
                  Talk to the Academy team.
                </h3>
                <p className="text-center text-[13px] text-white/55 leading-[1.6] mb-6">
                  Direct line to the people who will be teaching the cohort. No forms, no funnels.
                </p>

                <div className="space-y-3 mb-6">
                  <a href="tel:+919876543210" className="group flex items-center justify-between gap-4 border border-t-red/25 bg-t-red/[0.04] hover:bg-t-red/[0.12] hover:border-t-red/55 px-4 py-3 rounded-[3px] transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-t-red/15 border border-t-red/30 flex items-center justify-center text-t-red">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-red/70 mb-0.5">Phone</p>
                        <p className="font-display text-[16px] text-white leading-none">+91 98765 43210</p>
                      </div>
                    </div>
                    <span className="text-t-red/60 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>

                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border border-t-red/25 bg-t-red/[0.04] hover:bg-t-red/[0.12] hover:border-t-red/55 px-4 py-3 rounded-[3px] transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-t-red/15 border border-t-red/30 flex items-center justify-center text-t-red">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1c-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-red/70 mb-0.5">WhatsApp</p>
                        <p className="font-display text-[16px] text-white leading-none">Chat with us</p>
                      </div>
                    </div>
                    <span className="text-t-red/60 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>

                  <a href="mailto:hello@staracademy.in" className="group flex items-center justify-between gap-4 border border-t-red/25 bg-t-red/[0.04] hover:bg-t-red/[0.12] hover:border-t-red/55 px-4 py-3 rounded-[3px] transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-t-red/15 border border-t-red/30 flex items-center justify-center text-t-red">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-t-red/70 mb-0.5">Email</p>
                        <p className="font-display text-[16px] text-white leading-none break-all">hello@staracademy.in</p>
                      </div>
                    </div>
                    <span className="text-t-red/60 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                </div>

                <button type="button" onClick={() => navigate("/contact")} className="w-full inline-flex items-center justify-center gap-2 bg-t-red hover:bg-[#a00c25] text-white py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase rounded-[3px] transition-colors duration-200 group">
                  Notify Me When Masterclass Opens
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
