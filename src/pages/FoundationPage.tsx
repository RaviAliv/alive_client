import RegistrationForm from "../components/RegistrationForm";

const YT_INTRO = "QkiegbAnFqc";

const LECTURE_THUMBS = [
  "/images/Foundation.webp",
  "/images/embryo.webp",
  "/images/jugment.webp",
  "/images/mam2.webp",
  "/images/dna-pattern.webp",
];

const lectures = [
  { id: "lecture-1", lnum: "L01", label: "Lecture One",   no: "01", title: "The 300-Day Ovarian Symphony",            body: "The complete arc of how an oocyte matures, from the first hormonal signal to ovulation. The HPO axis, follicular endocrinology, and folliculogenesis, laid down as the layer every later clinical decision rests on.", duration: "90 min" },
  { id: "lecture-2", lnum: "L02", label: "Lecture Two",   no: "02", title: "Ovulation and Precision Triggering",      body: "Ovulation physiology from molecular dynamics to clinical application. When to trigger, why it works, and how to adapt with confidence when the standard playbook does not give the expected result.", duration: "90 min" },
  { id: "lecture-3", lnum: "L03", label: "Lecture Three", no: "03", title: "The Corpus Luteum as a Clinical Compass", body: "Advances in luteal phase support. The corpus luteum read not as a checkbox at the end of a cycle, but as a clinical signal that tells you what the cycle is doing.", duration: "90 min" },
  { id: "lecture-4", lnum: "L04", label: "Lecture Four",  no: "04", title: "Implantation, the Genesis Dialogue",      body: "The molecular dialogue between the human embryo and the endometrium. The signals each sends, what makes that dialogue succeed or fail, and the biology your patients ask you to explain.", duration: "90 min" },
  { id: "lecture-5", lnum: "L05", label: "Lecture Five",  no: "05", title: "The Precision Diagnostic Roadmap",        body: "The diagnostic framework working specialists use in female fertility evaluation. What to ask first, what to order, and how to read results in the context of the biology covered across the series.", duration: "90 min" },
];

const fullCurriculum = [
  { num: "01", title: "The Complete Arc of the Ovarian Cycle",         body: "The full story of how an oocyte matures over 300 days, from the first hormonal signal through to ovulation. Where every clinical decision actually sits on the biology, and what you gain by seeing the whole arc instead of the single month in front of you." },
  { num: "02", title: "Ovulation, Triggering, and Timing",             body: "From molecular dynamics to clinical application. Why ovulation works the way it does, when to trigger, what makes a trigger succeed or fail, and how to adapt when the textbook playbook breaks down in a real patient." },
  { num: "03", title: "Reading the Luteal Phase as a Clinical Signal", body: "The corpus luteum as a diagnostic compass, not a checkbox. Current understanding of luteal phase support. How to recognise what a luteal phase is telling you, and how to support it intelligently in the right patient." },
  { num: "04", title: "The Molecular Dialogue of Implantation",        body: "Implantation is not a timing problem. It is a conversation between the embryo and the endometrium. Understand how endometrial receptivity and embryonic signalling actually work, and why this changes the way you think about implantation failure." },
  { num: "05", title: "The Precision Diagnostic Road Map",             body: "How to evaluate a fertility patient with precision, not breadth. What to test, what to skip, and how to interpret every result in the full clinical context. The diagnostic philosophy that separates efficient practice from exhaustive over-investigation." },
];

const enrollPerks = [
  "Five live lectures with Dr. Sunita",
  "Interactive Q&A every session",
  "Clinical protocol sheets",
  "Certificate on completion",
  "One email, one entry access",
];

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function FoundationPage() {
  const eyebrow = "font-mono text-[12px] font-medium tracking-[0.28em] uppercase text-t-green";

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="-mt-20 relative bg-[#071410] min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/Foundation.webp')] bg-cover bg-center opacity-[0.10]" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-t-green/10 blur-[130px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071410]/30 to-[#071410]" />
        </div>

        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 pt-28 pb-12 w-full">
          <div className="flex items-center gap-2 mb-5">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30">STAR Curriculum</span>
            <span className="text-white/20 text-xs">/</span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-t-green/80">Tier I — Foundation</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            {/* Left — headline */}
            <div className="lg:w-[400px] shrink-0">
              <div className="inline-flex items-center gap-2 border border-t-green/25 bg-t-green/10 px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-t-green animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-t-green">Now Enrolling · July 2026</span>
              </div>

              <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.02em] text-white mb-4" style={{ fontSize: "clamp(38px,4.8vw,62px)" }}>
                Foundation<br /><span className="text-t-green">Series</span>
              </h1>

              <p className="text-[14px] text-white/55 leading-[1.65] mb-5">
                The biology layer of reproductive medicine. Five live lectures taught by Dr. Sunita Tandulwadkar — built to give every clinical decision a foundation it can rest on.
              </p>

              <div className="flex flex-wrap gap-2">
                {["5 Lectures","Q&A Included", "Certificate"].map((t) => (
                  <span key={t} className="font-mono text-[10.2px] tracking-[0.18em] uppercase text-white/40 border border-white/10 px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — intro video */}
            <div className="flex-1  min-w-0">
              <div className="relative">
                {/* Ambient glow */}
                <div className="absolute -inset-6 bg-t-green/8 blur-[60px] rounded-full pointer-events-none" />

                {/* Floating label badge */}
                <div className="absolute -top-[14px] left-5 z-10 flex items-center gap-1.5 bg-[#0c1d15] border border-t-green/30 px-3 py-[5px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-t-green animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-t-green/80">Foundation Series · Intro</span>
                </div>

                {/* Main frame */}
                <div className="relative rounded-[3px] overflow-hidden border border-t-green/20 shadow-[0_0_0_1px_rgba(33,134,78,0.06),0_0_60px_rgba(33,134,78,0.10),0_32px_64px_-12px_rgba(0,0,0,0.75)]">
                  {/* Top accent stripe */}
                  <div className="h-[2px] bg-gradient-to-r from-t-green/15 via-t-green to-t-green/15" />

                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${YT_INTRO}?rel=0&modestbranding=1&color=white`}
                      title="Dr. Sunita Tandulwadkar — Foundation Series Introduction"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>

                  {/* Bottom info bar */}
                  <div className="bg-[#060f0c] px-4 py-2.5 flex items-center justify-between border-t border-t-green/10">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/30">Dr. Sunita Tandulwadkar</span>
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-t-green/40">STAR Academy</span>
                  </div>
                </div>

                {/* Corner brackets */}
                <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-t-green/55 pointer-events-none" />
                <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-t-green/55 pointer-events-none" />
                <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-t-green/55 pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-t-green/55 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LECTURE CARDS ────────────────────────────────────── */}
      <section className="bg-[#f4f8f5] pt-14 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">

          <div className="text-center max-w-[520px] mx-auto mb-10">
            <span className={`${eyebrow} block mb-3`}>The Curriculum</span>
            <h2 className="font-display font-medium text-[clamp(26px,3.5vw,38px)] leading-[1.12] text-navy">
              Five lectures, one continuous arc
            </h2>
            <p className="mt-2.5 text-[14px] text-slate">
              All sessions are paid. Enroll to unlock full access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {lectures.map((l, idx) => (
              <div
                key={l.id}
                id={l.id}
                className="group bg-white border border-[#cce3d4] rounded-[5px] overflow-hidden flex flex-col hover:-translate-y-[3px] hover:shadow-[0_16px_40px_-16px_rgba(33,134,78,0.22)] hover:border-t-green transition-all duration-300"
              >
                <div className="relative w-full aspect-video overflow-hidden bg-[#0a1c13] shrink-0">
                  <img
                    src={LECTURE_THUMBS[idx]}
                    alt={l.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-55 scale-[1.04] group-hover:scale-100 group-hover:opacity-65 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071410]/75 via-[#071410]/20 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/60 bg-black/35 backdrop-blur-sm px-2 py-1">
                      {l.label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-t-green text-white px-2 py-1 text-[9px] font-mono tracking-[0.14em] uppercase">
                    <LockIcon size={10} />
                    <span>Paid</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full border border-t-green/35 bg-black/30 backdrop-blur-sm flex items-center justify-center text-t-green/50">
                      <LockIcon size={18} />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-3">
                    <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/40">{l.duration}</span>
                  </div>
                </div>

                <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-[9.5px] font-medium tracking-[0.18em] uppercase text-t-green">
                      {l.label}
                    </span>
                    <span className="font-display italic text-[26px] leading-none text-t-green/15 font-bold select-none">
                      {l.no}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-[20px] leading-[1.25] text-navy mb-2.5">
                    {l.title}
                  </h3>
                  <p className="text-[13px] text-slate leading-[1.65] flex-grow">
                    {l.body}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#e2f0e7] flex items-center justify-between">
                    <a href="#inquiry" className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-t-green hover:gap-3 transition-all duration-200">
                      Enroll to unlock
                      <span className="w-4 h-[1.5px] bg-t-green relative after:content-[''] after:absolute after:right-0 after:-top-[3px] after:w-[5px] after:h-[5px] after:border-t after:border-r after:border-t-green after:rotate-45" />
                    </a>
                    <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate/30">Premium</span>
                  </div>
                </div>
              </div>
            ))}

          </div>

         {/* ── Compact Premium Enrollment Ribbon ── */}
<a
  href="#inquiry"
  className="group relative mt-6 block overflow-hidden rounded-[18px] border border-[#1f4f34] bg-[linear-gradient(135deg,#071410_0%,#0b1d16_45%,#10261c_100%)] transition-all duration-300 hover:border-[#2f7a50]"
>
  {/* Soft green ambient */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_40%)]" />

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
      <div className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-[#5cc98d]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
        Foundation Series
      </div>

      {/* Heading */}
      <h3 className="mt-3 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.05] text-[#f5f1e8]">
        Enroll in the
        <span className="block text-[#5cc98d] mt-1">
          Complete Five-Lecture Program
        </span>
      </h3>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-[0.14em] text-[#7d9488]">
        <span>Live on Zoom</span>

        <span className="hidden sm:block h-1 w-1 rounded-full bg-[#335443]" />

        <span>Wednesdays · 8 PM IST</span>

        <span className="hidden sm:block h-1 w-1 rounded-full bg-[#335443]" />

        <span>Begins 15 July 2026</span>
      </div>
    </div>

    {/* RIGHT CTA */}
    <div className="flex items-center gap-4 shrink-0">

      {/* Small info */}
      <div className="hidden md:block text-right">
        <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#658273]">
          Enrollment Open
        </div>

        <div className="mt-1 text-[13px] text-[#c8d4cd]">
          Limited seats available
        </div>
      </div>

      {/* Button */}
      <div className="inline-flex items-center gap-3 rounded-full border border-[#2f7a50] bg-[#163222] px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 group-hover:border-[#4bb874] group-hover:bg-[#1d402c]">
        Enroll Now

        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#214b34] transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </div>
  </div>
</a>
        </div>
      </section>

      {/* ── WHY THIS COURSE ──────────────────────────────────── */}
      <section className="bg-[#071410] py-16">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="border-l-[3px] border-t-green pl-7">
            <span className={`${eyebrow} block mb-4`}>Why this course exists</span>
            <p className="font-display italic leading-[1.55] text-white/70" style={{ fontSize: "clamp(17px,2vw,22px)" }}>
              For the doctor who feels like they are practising infertility in fragments. Who learned physiology a decade ago and has never formally returned to it. Who treats patients confidently enough, but quietly wonders if they are reading the cycle the way the best specialists do. Foundation exists for that doctor. Not to teach new information, but to rebuild the framework that everything else sits on.
            </p>
          </div>
        </div>
      </section>

      {/* ── FULL CURRICULUM + ENROLLMENT CARD ───────────────── */}
      <section className="bg-[#f4f8f5] pt-16 pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-16 items-start">

            <div>
              <span className={`${eyebrow} block mb-3`}>Full Curriculum</span>
              <h3 className="font-display font-medium text-[clamp(22px,2.5vw,32px)] text-navy mb-1.5 leading-[1.18]">
                Five live lectures with Dr. Sunita Tandulwadkar.
              </h3>
              <p className="font-display italic text-[15px] text-t-green mb-8">
                What each lecture does for your practice.
              </p>

              <div className="divide-y divide-[#cce3d4]">
                {fullCurriculum.map((l) => (
                  <div key={l.num} className="grid grid-cols-[48px_1fr] gap-4 py-5">
                    <div className="font-display font-bold text-[34px] text-t-green leading-none pt-1 select-none">
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
              <div className="bg-white border border-[#cce3d4] rounded-[5px] overflow-hidden shadow-[0_4px_24px_-6px_rgba(33,134,78,0.12)]">
                <div className="h-[3px] bg-gradient-to-r from-t-green/30 via-t-green to-t-green/30" />
                <div className="p-7">
                  <span className={`${eyebrow} block mb-2.5`}>Now enrolling</span>
                  <h3 className="font-display font-medium text-[23px] text-navy mb-2.5 leading-[1.22]">
                    Secure your seat in the inaugural batch.
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-slate mb-5">
                    Join Dr. Sunita live for all five Foundation lectures. Limited seats.
                  </p>

                  <div className="bg-[#edf6f0] border border-t-green/20 rounded-[3px] px-4 py-3 mb-5">
                    <div className="font-display font-semibold text-[28px] text-navy leading-none mb-0.5">
                      [ Price ]
                    </div>
                    <div className="font-mono text-[11px] text-slate/60 tracking-wide">Foundation Series · Tier I</div>
                  </div>

                  <a href="#inquiry" className="w-full flex items-center justify-center gap-2 bg-t-green hover:bg-[#196638] text-white py-3 font-body font-semibold text-[13px] tracking-[0.03em] transition-colors duration-250 group mb-2.5 rounded-[3px]">
                    Enroll Now
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </a>
                  <a href="#inquiry" className="w-full flex items-center justify-center text-t-green border border-t-green/35 hover:border-t-green hover:bg-[#edf6f0] py-3 font-body font-medium text-[13px] transition-all duration-200 rounded-[3px]">
                    Ask a question first
                  </a>

                  <ul className="mt-5 pt-5 border-t border-[#d8ede0] space-y-2.5">
                    {enrollPerks.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[13px] text-soft-black">
                        <span className="w-[18px] h-[18px] rounded-full bg-t-green/10 border border-t-green/25 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 10 10" width="10" height="10">
                            <path d="M2 5l2 2 4-4" stroke="#21864E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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

      {/* ── INQUIRY FORM ─────────────────────────────────────── */}
      <section id="inquiry" className="bg-[#071410] pt-16 pb-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="text-center mb-10">
            <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-t-green block mb-2.5">Register interest</span>
            <h2 className="font-display font-medium text-white leading-[1.15]" style={{ fontSize: "clamp(24px,3vw,36px)" }}>
              Join the Foundation Series
            </h2>
          </div>
          <div className="max-w-[560px] mx-auto">
            <RegistrationForm hideHeading noPadding />
          </div>
        </div>
      </section>
    </>
  );
}
