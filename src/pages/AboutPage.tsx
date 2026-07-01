import { useState } from "react";
import { Link } from "react-router-dom";

const YT_VIDEO = "QkiegbAnFqc";

const arrow =
  "inline-block transition-transform duration-300 group-hover:translate-x-1 ";

const STATS = [
  { num: "35+",  label: "Years in Practice" },
  { num: "39",   label: "Books Authored"    },
  { num: "106+", label: "Peer Papers"       },
  { num: "400+", label: "Faculty Talks"     },
];

const INSTITUTIONS = [
  {
    name: "Ruby Hall Clinic",
    city: "Pune",
    roles: ["Head, Dept of OBGYN", "Chief, IVF & Endoscopy Centre"],
    detail:
      "India's premier multi-specialty hospital. Over thirty years as head of its fertility and endoscopic surgery programme.",
  },
  {
    name: "Solo Clinic IVF",
    city: "Pune",
    roles: ["Founder", "Medical Director"],
    detail:
      "A dedicated IVF and fertility centre built to extend specialist reproductive care and applied clinical research.",
  },
  {
    name: "ALIV Stem Cell Research",
    city: "Pune & Mumbai",
    roles: ["Co-Founder", "Medical Director"],
    detail:
      "Home to India's first regenerative procedures in reproductive outcomes — and the world's first at the age of 45.",
  },
];

const CREDENTIALS = [
  "President, FOGSI 2025",
  "President-elect, ISAR 2026–2028",
  "India's First Endoscopic Surgeon, 1994",
  "World's First Stem Cell Success at 45",
  "Head, IVF & Endoscopy — Ruby Hall Clinic",
  "Founder, Solo Clinic IVF",
  "Co-Founder, ALIV Stem Cell Research",
];

export default function AboutPage() {
  const [videoHover, setVideoHover] = useState(false);

  return (
    <>
      {/* ============================================================
          HERO — full-viewport, split layout
          -mt-20 cancels main { padding-top:80px } so we fill the screen
          ============================================================ */}
      <section className="-mt-20 relative min-h-screen flex flex-col overflow-hidden bg-[#0A0E16]">
        {/* Marble texture background */}
        <div
          className="absolute inset-0 bg-[url('/images/header_footer.webp')] bg-cover bg-center opacity-30"
          aria-hidden="true"
        />
        {/* Directional gradient: text side solid, image side transparent */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[rgba(10,14,22,0.97)] via-[rgba(10,14,22,0.75)] to-[rgba(10,14,22,0.18)]"
          aria-hidden="true"
        />

        {/* Corner accents */}
        <div className="absolute top-24 left-8 w-12 h-12 border-t border-l border-gold/40 hidden lg:block z-10" />
        <div className="absolute top-24 right-8 w-12 h-12 border-t border-r border-gold/40 hidden lg:block z-10" />

        {/* Main content row */}
        <div className="relative z-[2] flex-1 flex items-center w-full max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] pt-24 sm:pt-28 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center w-full">

            {/* ── Left: text ── */}
            <div>
              <span className="font-mono text-[11px] tracking-[0.30em] uppercase text-gold block mb-5">
                About the Academy
              </span>

              <h1 className="font-display font-medium text-[clamp(30px,4.6vw,64px)] leading-[1.08] tracking-[-0.018em] text-ivory mb-6">
                A live, stepwise{" "}
                <em className="not-italic italic text-gold-light">platform</em>
                {" "}in reproductive medicine
              </h1>

              {/* ── Mobile-only video (tap opens YouTube) ── */}
              <a
                href={`https://www.youtube.com/watch?v=${YT_VIDEO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:hidden block mb-8"
              >
                <div className="relative aspect-video overflow-hidden border border-gold/45 bg-[#050810]">
                  <img
                    src="/images/mam_aboutus.webp"
                    alt="Dr. Sunita Tandulwadkar — video"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,16,0.82)] via-[rgba(5,8,16,0.30)] to-[rgba(5,8,16,0.12)]" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[56px] h-[56px] rounded-full border-2 border-gold bg-[rgba(5,8,16,0.55)] backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(197,164,109,0.30)]">
                      <svg viewBox="0 0 24 24" width="22" height="22" className="fill-gold ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Tap hint */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                    <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-gold/55">
                      Tap to watch
                    </span>
                  </div>
                </div>
                {/* Meta bar */}
                <div className="flex items-center justify-between border border-t-0 border-gold/30 bg-[rgba(5,8,16,0.80)] px-4 py-2.5">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-gold mb-0.5">
                      The Founder
                    </p>
                    <p className="font-display italic text-ivory text-[14px] leading-none">
                      Dr. Sunita Tandulwadkar
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                    <span className="font-mono text-[9px] tracking-[0.16em] text-ivory/45">02:14</span>
                  </div>
                </div>
              </a>

              <p className="text-[15px] sm:text-[16px] leading-[1.75] text-ivory/70 max-w-[50ch] mb-8 sm:mb-10">
                Founded and led by Dr. Sunita Tandulwadkar — one of India's
                most respected pioneers in IVF and endoscopic surgery. Every
                lecture is taught live, in sequence, by the clinician who built it.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-7 py-3 font-body font-bold text-[15px] tracking-[0.02em] text-black rounded-xl bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] group"
                >
                  View Courses <span className={arrow}>→</span>
                </Link>
                {/* Meet the Faculty link hidden */}
              </div>
            </div>

            {/* ── Right: YouTube video (hover = autoplay muted) ── */}
            <div
              className="relative hidden lg:flex flex-col"
              onMouseEnter={() => setVideoHover(true)}
              onMouseLeave={() => setVideoHover(false)}
            >
              {/* Offset decorative shadow-frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-gold/20 pointer-events-none z-0" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-gold pointer-events-none z-0" />

              {/* Video wrapper — 16:9 */}
              <div className="relative aspect-video overflow-hidden border border-gold/45 z-[1] bg-[#050810]">

                {videoHover ? (
                  /* ── Playing: YouTube iframe autoplay + muted ── */
                  <iframe
                    src={`https://www.youtube.com/embed/${YT_VIDEO}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1`}
                    title="STAR Academy — Dr. Sunita Tandulwadkar"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  /* ── Idle: styled poster + play button ── */
                  <>
                    {/* Poster image */}
                    <img
                      src="/images/mam2.webp"
                      alt="Dr. Sunita Tandulwadkar — video"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 scale-[1.03] group-hover:scale-100"
                    />
                    {/* Cinematic dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,16,0.80)] via-[rgba(5,8,16,0.30)] to-[rgba(5,8,16,0.15)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,8,16,0.50)] to-transparent" />

                    {/* Animated gold pulse ring behind play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-[100px] h-[100px] rounded-full border border-gold/25 animate-ping" style={{ animationDuration: "2.4s" }} />
                      <div className="absolute w-[80px] h-[80px] rounded-full border border-gold/20 animate-ping" style={{ animationDuration: "2.4s", animationDelay: "0.6s" }} />

                      {/* Play button */}
                      <div className="relative w-[68px] h-[68px] rounded-full border-2 border-gold bg-[rgba(5,8,16,0.55)] backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-gold hover:border-gold group/play shadow-[0_0_30px_rgba(197,164,109,0.25)]">
                        <svg
                          viewBox="0 0 24 24"
                          width="26"
                          height="26"
                          className="fill-gold group-hover/play:fill-navy ml-1.5 transition-colors duration-300"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Hover hint */}
                    <div className="absolute bottom-[52px] left-0 right-0 flex justify-center">
                      <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-gold/60">
                        Hover to preview
                      </span>
                    </div>

                    {/* Inner gold frame */}
                    <div className="absolute inset-[10px] border border-gold/18 pointer-events-none" />
                  </>
                )}
              </div>

              {/* ── Video meta bar ── */}
              <div className="relative z-[1] flex items-center justify-between border border-t-0 border-gold/30 bg-[rgba(5,8,16,0.75)] backdrop-blur-sm px-5 py-3">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-gold mb-0.5">
                    The Founder
                  </p>
                  <p className="font-display italic text-ivory text-[15px] leading-none">
                    Dr. Sunita Tandulwadkar
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      videoHover ? "bg-red-500 animate-pulse" : "bg-gold/40"
                    }`}
                  />
                  <span className="font-mono text-[9px] tracking-[0.16em] text-ivory/45">
                    {videoHover ? "PLAYING" : "02:14"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Stats bar pinned to the hero bottom ── */}
        <div className="relative z-[2] w-full border-t border-gold/20 bg-[rgba(10,14,22,0.55)] backdrop-blur-sm">
          <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/15">
              {STATS.map((s) => (
                <div key={s.label} className="py-5 text-center">
                  <div className="font-display text-[clamp(22px,2.4vw,32px)] text-gold leading-none mb-1">
                    {s.num}
                  </div>
                  <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-ivory/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* ============================================================
          THE FOUNDER — bio (marble) + credentials card
          ============================================================ */}
      <section className="relative bg-[linear-gradient(rgba(248,245,239,0.93),rgba(248,245,239,0.93)),url('/images/marble.webp')] bg-cover bg-center py-[clamp(52px,7vw,96px)] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-start">

            {/* ── Left: bio ── */}
            <div>
              <span className="font-mono text-[15px] tracking-[0.26em] uppercase text-gold-deep block mb-5">
                The Founder
              </span>
              <h2 className="font-display font-medium text-[clamp(26px,3.6vw,48px)] leading-[1.1] tracking-[-0.01em] text-navy mb-3">
                A clinician who teaches the way she practises.
              </h2>
              <p className="font-display italic text-[16px] text-navy/60 mb-8 leading-[1.55]">
                Over thirty-five years. One continuous practice. Every lecture, live.
              </p>

              <div className="space-y-4 text-[16.5px] leading-[1.75] text-soft-black">
                <p>
                  Dr. Sunita Tandulwadkar heads the IVF and Endoscopy Centre
                  at Ruby Hall Clinic, Pune — one of India's leading tertiary
                  hospitals. She is the founder of Solo Clinic IVF and the
                  co-founder of ALIV Stem Cell Research.
                </p>
                <p>
                  She is President of FOGSI for 2025 and President-elect of
                  ISAR for 2026–2028. She delivered India's first stem cell
                  baby in 2018 — the world's first successful procedure of its
                  kind at the age of 45.
                </p>
                <p>
                  Across her career she has authored 39 books, published over
                  106 peer-reviewed papers, and spoken at more than 400
                  national and international conferences.
                </p>
              </div>

              <p className="font-display italic text-[17px] text-navy leading-[1.6] mt-8 pt-7 border-t border-border-warm max-w-[60ch]">
                Every lecture in the Academy is taught by her, in the same
                voice and the same method she uses with her own patients.
              </p>

              {/* Read her full clinical profile link hidden */}
            </div>

            {/* ── Right: image + credential list ── */}
            <div className="lg:sticky lg:top-28 space-y-4">
              {/* Photo */}
              <div className="relative overflow-hidden aspect-[4/3] border border-border-warm bg-mist">
                <img
                  src="/images/mam_aboutus.webp"
                  alt="Dr. Sunita Tandulwadkar at a conference"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-[8px] border border-[rgba(197,164,109,0.30)] pointer-events-none" />
              </div>

              {/* Credentials card */}
              <div className="bg-navy border border-[rgba(197,164,109,0.18)] px-6 py-6">
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-gold mb-4">
                  Positions &amp; Achievements
                </p>
                <ul className="flex flex-col gap-0">
                  {CREDENTIALS.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 py-2.5 border-b border-gold/10 last:border-0"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold mt-[8px] shrink-0" />
                      <span className="font-body text-[13px] text-ivory/80 leading-[1.45]">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ============================================================
          QUOTE STRIP — warm ivory band
          ============================================================ */}
      <section className="bg-[#F7F4EE] py-[clamp(32px,5vw,60px)] px-[clamp(20px,4vw,80px)]">
        <div className="max-w-[900px] mx-auto flex items-start gap-6 sm:gap-8">
          <div className="w-0.5 shrink-0 self-stretch bg-gradient-to-b from-gold via-gold-deep to-transparent" />
          <div>
            <p className="font-display italic text-[clamp(17px,2.2vw,26px)] text-navy/80 leading-[1.55]">
              "I have spent my career learning how to teach this — not as a
              workshop, not as a webinar, but as one continuous body of knowledge
              taught in full, the way it works in the clinic."
            </p>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold-deep mt-5">
              — Dr. Sunita Tandulwadkar
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE INSTITUTIONS — dark, numbered cards
          ============================================================ */}
      <section className="relative bg-[linear-gradient(rgba(10,14,22,0.93),rgba(10,14,22,0.93)),url('/images/header_footer.webp')] bg-cover bg-center text-ivory py-[clamp(52px,7vw,96px)] overflow-hidden">
        <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-gold/30 hidden md:block" />
        <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-gold/30 hidden md:block" />

        <div className="relative z-[1] max-w-[1240px] mx-auto px-[clamp(20px,4vw,80px)]">
          {/* Section header */}
          <div className="mb-10 text-center">
            <span className="font-mono text-[11px] tracking-[0.26em] uppercase text-gold block mb-5">
              The Institutions
            </span>
            <h2 className="font-display font-medium text-[clamp(20px,3.6vw,38px)] leading-[1.1] tracking-[-0.01em] text-ivory mb-5 max-w-[60ch] mx-auto">
              A teaching arm of a working clinical practice
            </h2>
            <p className="text-[16px] leading-[1.7] text-ivory/65 max-w-[102ch] mx-auto">
              Three institutions, three decades of clinical work. A hospital department, a fertility centre, and a regenerative wellness practice, each built and led by Dr. Sunita Tandulwadkar. The Academy is the teaching arm that sits across all three. Every lecture is drawn from the cases, protocols, and outcomes shaped inside each of them.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/18">
            {INSTITUTIONS.map((inst) => (
              <div
                key={inst.name}
                className="bg-[rgba(10,14,22,0.7)] px-5 py-6 sm:px-8 sm:py-5 group hover:bg-[rgba(37,24,2,0.75)] transition-colors duration-300"
              >
                {/* Large background number */}
                {/* <div className="font-display text-[clamp(52px,5.5vw,80px)]  leading-none mb-4 group-hover:text-gold/22 transition-colors duration-300 select-none">
                  {inst.num}
                </div> */}
                {/* <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-yellow-600 mb-2">
                  {inst.city}
                </p> */}
                <h3 className="font-display text-[22px] text-ivory leading-[1.2] mb-3">
                  {inst.name}
                </h3>
                <div className="flex flex-col gap-0.5 mb-5">
                  {inst.roles.map((r) => (
                    <p
                      key={r}
                      className="font-mono text-[10px] tracking-[0.14em] uppercase text-gold/65"
                    >
                      {r}
                    </p>
                  ))}
                </div>
                <p className="text-[14px] leading-[1.65] ">
                  {inst.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA — two columns: schedule info (left) + enquiry form (right)
          ============================================================ */}
      <section className="relative bg-[linear-gradient(rgba(253,251,246,0.97),rgba(253,251,246,0.97)),url('/images/marble.webp')] bg-cover bg-center py-[clamp(52px,7vw,96px)] overflow-hidden">
        <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-gold-deep/25 hidden md:block" />
        <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-gold-deep/25 hidden md:block" />

        <div className="relative z-[1] max-w-[1240px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* ── Left: info ── */}
            <div>
              <span className="font-mono text-[11px] tracking-[0.26em] uppercase text-gold-deep block mb-5">
                Now Enrolling
              </span>
              <h2 className="font-display font-medium text-[clamp(26px,3.6vw,30px)] leading-[1.1] tracking-[-0.01em] text-navy mb-5">
                The first batch begins on 15th july 2026
              </h2>
              <p className="text-[16px] leading-[1.7] text-slate mb-5">
                The Foundation Series runs live, every Wednesday at 8 PM IST.
                Six lectures. One structured beginning. Seats are limited so
                the cohort stays small enough for direct teaching
              </p>

              {/* Schedule details */}
              <dl className="flex flex-col gap-0 border-t border-border-warm mb-5">
                {[
                  { label: "Format",   value: "Live on Zoom · Every Wednesday" },
                  { label: "Time",     value: "8:00 PM IST"                    },
                  { label: "Duration", value: "Six lectures · 6 weeks"         },
                  { label: "Starts",   value: "15th july 2026"                   },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline gap-6 border-b border-border-warm py-3.5"
                  >
                    <dt className="font-mono text-[13px] tracking-[0.22em] uppercase text-gold w-24 shrink-0">
                      {row.label}
                    </dt>
                    <dd className="text-[15px] text-soft-black">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                to="/course/foundation"
                className="inline-flex items-center gap-2 px-7 py-3 font-body font-bold text-[15px] tracking-[0.02em] text-black rounded-xl bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] group"
              >
                Explore Foundation <span className={arrow}>→</span>
              </Link>
            </div>

            {/* ── Right: Foundation course card ── */}
            <div className="relative">
              <div className="absolute -inset-3 border border-gold/30 pointer-events-none hidden md:block" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-gold pointer-events-none hidden md:block" />

              <div className="relative bg-cream border border-border-warm overflow-hidden shadow-[0_30px_60px_-30px_rgba(30,42,68,0.28)]">
                {/* Top accent ribbon */}
                <div className="h-[3px] bg-t-green" />

                {/* Image + letter badge */}
                <div className="relative">
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src="/images/Foundation.webp"
                      alt="The Foundation Series"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.18em] uppercase text-ivory bg-t-green border border-white/30 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white before:animate-pulse">
                      Enrolling
                    </span>

                    <span className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.22em] uppercase text-gold-light">
                      Tier I
                    </span>
                  </div>

                  <div className="absolute -bottom-7 left-6 z-[2] flex items-stretch shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)]">
                    <div className="relative w-14 h-14 flex items-center justify-center font-display font-semibold text-[28px] text-ivory border-2 border-gold bg-t-green">
                      F
                    </div>
                    <div className="flex items-center bg-cream border-y-2 border-r-2 border-gold -ml-px px-1">
                      <span className="font-display font-semibold text-[22px] leading-none tracking-[0.01em] text-t-green">
                        oundation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="pt-12 pb-7 px-6">
                  <h3 className="font-display font-medium text-[26px] text-navy mb-3 leading-[1.15]">
                    The Foundation Series
                  </h3>
                  <p className="text-[14px] leading-[1.7] text-slate mb-5">
                    Mastering the absolute basics of reproductive medicine.
                    Five live lectures rebuilding the biological foundations
                    every clinical decision rests on, from the HPO axis through
                    to female fertility diagnostics.
                  </p>

          
                  <Link
                    to="/course/foundation"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-body font-semibold text-[14px] tracking-[0.02em] border border-gold-deep text-black rounded-md bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] group"
                  >
                    Book my seat
                    <span className={arrow}>→</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
