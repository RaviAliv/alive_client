import { useState } from "react";
import { Link } from "react-router-dom";
import { VIDEOS } from "../lib/config";

const goldGradient = "bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]";
const eyebrow = "font-mono text-[12px] font-medium tracking-[0.28em] uppercase text-gold-deep";
const eyebrowGold = "font-mono text-[15px] font-medium tracking-[0.28em] uppercase text-gold";
const arrow = "inline-block transition-transform duration-300 group-hover:translate-x-1";

export default function FacultyPage() {
  const [videoHover, setVideoHover] = useState(false);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative -mt-5 min-h-screen flex items-center bg-[linear-gradient(rgba(10,14,22,0.85),rgba(10,14,22,0.85)),url('/images/header_footer.webp')] bg-cover bg-center overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] pt-[clamp(70px,12vw,40px)] pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text (+ inline video on mobile) */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-gold/60" />
                <span className={eyebrowGold}>Meet the Faculty</span>
              </div>

              <h1 className="font-display font-medium text-[clamp(36px,4.5vw,51px)] leading-[1.06] tracking-[-0.02em] text-ivory mb-4">
                Dr. Sunita Tandulwadkar
              </h1>

              <p className="font-display italic text-[clamp(16px,1.4vw,20px)] text-gold-light mb-5 leading-[1.45]">
                A clinician, a teacher, and the founder of the Academy
              </p>

              <p className="text-[15px] text-ivory/65 leading-[1.75] mb-7 max-w-[52ch]">
                For thirty-five years, Dr. Sunita has been the same kind of doctor in three different rooms. The operating theatre, the conference stage, and the corridor where a colleague stops her with a question. She has led India's IVF and endoscopy programmes, founded clinical institutions, and delivered the breakthrough that placed Indian reproductive medicine on the world map. The Academy is where all of that work becomes teachable.
              </p>

              {/* Video — mobile only, sits between description and badges */}
              <div className="lg:hidden relative aspect-video overflow-hidden border border-gold/35 bg-black mb-7">
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEOS.foundationIntro}?rel=0&modestbranding=1`}
                  title="Dr. Sunita Tandulwadkar — Foundation Series"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between border-t border-gold/20 bg-black/75 backdrop-blur-sm px-4 py-2.5">
                  <p className="font-display italic text-ivory text-[13px] leading-none">Dr. Sunita Tandulwadkar</p>
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-gold/50">STAR Academy</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {[
                  "President, ISAR · 2026–2028",
                  "Past President, FOGSI · 2025",
                  "Head, IVF & Endoscopy · Ruby Hall Clinic",
                ].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/25 bg-gold/5 font-mono text-[10px] tracking-[0.16em] uppercase text-gold-light">
                    <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                    {t}
                  </span>
                ))}
              </div>

              <Link
                to="/course/foundation"
                className={`inline-flex items-center gap-2.5 px-6 py-3 font-body font-bold text-[14px] tracking-[0.02em] border border-gold text-navy rounded-[2px] transition-all duration-300 hover:brightness-110 group ${goldGradient}`}
              >
                Explore the Foundation Series
                <span className={arrow}>&rarr;</span>
              </Link>
            </div>

            {/* Right — desktop-only hover-preview video */}
            <div
              className="relative hidden lg:flex flex-col"
              onMouseEnter={() => setVideoHover(true)}
              onMouseLeave={() => setVideoHover(false)}
            >
              <div className="relative aspect-video overflow-hidden border border-gold/35 z-[1] bg-black">
                {videoHover ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${VIDEOS.foundationIntro}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1`}
                    title="STAR Academy — Dr. Sunita Tandulwadkar"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  <>
                    <img
                      src="/images/mam2.webp"
                      alt="Dr. Sunita Tandulwadkar"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/15" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-[100px] h-[100px] rounded-full border border-gold/25 animate-ping" style={{ animationDuration: "2.4s" }} />
                      <div className="absolute w-[80px] h-[80px] rounded-full border border-gold/20 animate-ping" style={{ animationDuration: "2.4s", animationDelay: "0.6s" }} />
                      <div className="relative w-[68px] h-[68px] rounded-full border-2 border-gold bg-black/55 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(197,164,109,0.25)] hover:bg-gold group/play transition-all duration-300">
                        <svg viewBox="0 0 24 24" width="26" height="26" className="fill-gold group-hover/play:fill-navy ml-1.5 transition-colors duration-300">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute bottom-[52px] inset-x-0 flex justify-center">
                      <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-gold/60">Hover to preview</span>
                    </div>
                  </>
                )}
              </div>

              <div className="relative z-[1] flex items-center justify-between border border-t-0 border-gold/25 bg-black/75 backdrop-blur-sm px-5 py-3">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-gold mb-0.5">The Founder</p>
                  <p className="font-display italic text-ivory text-[15px] leading-none">Dr. Sunita Tandulwadkar</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${videoHover ? "bg-red-500 animate-pulse" : "bg-gold/40"}`} />
                  <span className="font-mono text-[9px] tracking-[0.16em] text-ivory/45">
                    {videoHover ? "PLAYING" : "02:14"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ───────────────────────────────────────── */}
      <section className="py-[clamp(50px,8vw,60px)] bg-[linear-gradient(rgba(248,245,239,0.82),rgba(248,245,239,0.82)),url('/images/marble.webp')] bg-cover bg-center">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">

          <div className="text-center max-w-[640px] mx-auto mb-12">
            <span className={`${eyebrow} block mb-3`}>Credentials</span>
            <h2 className="font-display font-medium text-[clamp(26px,3.5vw,40px)] leading-[1.1] tracking-[-0.015em] text-navy">
              Three decades of practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Current Roles */}
            <div className="bg-cream border border-border-warm">
              <div className="h-[3px] bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]" />
              <div className="px-6 py-4 border-b border-border-warm">
                <span className={eyebrow}>Current Institutional Roles</span>
              </div>
              <div className="divide-y divide-border-warm">
                {[
                  { role: "Founder", place: "STAR Academy of Reproduction" },
                  { role: "Founder & Medical Director", place: "Solo Clinic IVF & OBGYN" },
                  { role: "Co-Founder & Medical Director", place: "ALIV Regenerative Wellness" },
                  { role: "Head of Department, OBGYN", place: "Ruby Hall Clinic, Pune" },
                  { role: "Chief, IVF & Endoscopy Centre", place: "Ruby Hall Clinic, Pune" },
                ].map((item) => (
                  <div key={item.role} className="flex flex-col px-6 py-3 gap-0.5">
                    <span className="font-display text-[15px] text-navy">{item.role}</span>
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-gold-deep">{item.place}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership */}
            <div className="bg-cream border border-border-warm">
              <div className="h-[3px] bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]" />
              <div className="px-6 py-4 border-b border-border-warm">
                <span className={eyebrow}>Leadership & Society</span>
              </div>
              <div className="divide-y divide-border-warm">
                {[
                  { position: "President, ISAR", period: "2026–2028", current: true },
                  { position: "Founder President, Ovarian Rejuvenation", period: "2023", current: false },
                  { position: "Past President, FOGSI", period: "2025", current: false },
                  { position: "Past President, POGS", period: "2021–2022", current: false },
                  { position: "Past President, IAGE", period: "2019–2020", current: false },
                ].map((item) => (
                  <div key={item.position} className="flex items-center justify-between px-6 py-3.5 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {item.current && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse" />}
                      <span className={`font-display text-[15px] leading-[1.35] ${item.current ? "text-navy font-semibold" : "text-navy"}`}>
                        {item.position}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-gold-deep shrink-0">{item.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-cream border border-border-warm">
              <div className="h-[3px] bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]" />
              <div className="px-6 py-4 border-b border-border-warm">
                <span className={eyebrow}>Education & Fellowships</span>
              </div>
              <div className="divide-y divide-border-warm">
                {[
                  { degree: "MD, Obstetrics & Gynecology", year: "Postgraduate" },
                  { degree: "FICOG", year: "Fellow" },
                  { degree: "FICS, Gynae Endoscopy", year: "Fellow" },
                  { degree: "FRCOG (Honoris Causa)", year: "RCOG" },
                ].map((item) => (
                  <div key={item.degree} className="flex items-center justify-between px-6 py-3.5 gap-3">
                    <span className="font-display text-[16px] text-navy">{item.degree}</span>
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-gold-deep shrink-0">{item.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Honorable mentions */}
          <div className="mt-5 bg-cream border border-border-warm px-6 py-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className={`${eyebrow} shrink-0`}>Also:</span>
              {[
                "Vice President, West Zone FOGSI · 2015–17",
                "Board Member, ISGE · 2013–17",
                "Chairperson & Hon. Secretary, ISAR (MSR)",
              ].map((item) => (
                <span key={item} className="font-display italic text-[14px] text-slate">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────── */}
      <section className="py-[clamp(50px,8vw,60px)] bg-[linear-gradient(rgba(15,20,32,0.74),rgba(15,20,32,0.74)),url('/images/header_footer.webp')] bg-cover bg-center">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">

          <div className="text-center max-w-[640px] mx-auto mb-12">
            <span className={`${eyebrowGold} block mb-3`}>Milestones</span>
            <h2 className="font-display font-medium text-[clamp(26px,3.5vw,40px)] leading-[1.1] tracking-[-0.015em] text-ivory">
              The Journey So Far
            </h2>
            <p className="mt-3 text-[14px] text-ivory/50">Three decades of excellence, leadership, and breakthroughs</p>
          </div>

          <div className="max-w-[860px] mx-auto space-y-3">

            {/* Featured: 2018 */}
            <div className="bg-[rgba(197,164,109,0.08)] border border-gold/30 px-6 py-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-gold block mb-1.5">Breakthrough</span>
                  <h3 className="font-display font-medium text-[clamp(18px,2vw,22px)] text-gold-light leading-[1.2] mb-2">
                    India's First Stem Cell Baby
                  </h3>
                  <p className="text-[13px] text-ivory/55 max-w-[50ch] leading-[1.65]">
                    Revolutionary procedure led by Dr. Sunita. A historic moment that placed Indian reproductive medicine on the global map. World's first at age 45.
                  </p>
                </div>
                <span className="font-display font-medium text-[clamp(28px,3.5vw,40px)] text-gold/35 shrink-0 leading-none">2018</span>
              </div>
            </div>

            {/* Regular items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { year: "1995", title: "Clinical Practice Begins", desc: "Started OBGYN practice, laying the foundation for reproductive medicine." },
                { year: "2000", title: "IVF Specialization", desc: "Developed expertise in IVF and assisted reproductive technologies." },
                { year: "2010", title: "National Recognition", desc: "Recognized as a leading voice in reproductive medicine across India." },
                { year: "2019", title: "President, IAGE", desc: "Led Indian Association of Gynaecological Endoscopists." },
                { year: "2021", title: "President, POGS", desc: "Presided over Pune Obstetric and Gynaecological Society." },
                { year: "2023", title: "Ovarian Rejuvenation Society", desc: "Founded the Society of Ovarian Rejuvenation." },
              ].map((item) => (
                <div key={item.year} className="bg-[rgba(255,255,255,0.04)] border border-white/10 px-5 py-4 flex items-start gap-4 hover:border-gold/25 transition-colors duration-200">
                  <span className="font-display font-medium text-[24px] text-gold/30 leading-none shrink-0 pt-0.5">{item.year}</span>
                  <div>
                    <h4 className="font-display font-medium text-[16px] text-ivory mb-1">{item.title}</h4>
                    <p className="text-[13px] text-ivory/45 leading-[1.6]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured: 2025 */}
            <div className="bg-[rgba(197,164,109,0.08)] border border-gold/30 px-6 py-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-gold block mb-1.5">Highest Honour</span>
                  <h3 className="font-display font-medium text-[clamp(18px,2vw,22px)] text-gold-light leading-[1.2] mb-2">
                    FOGSI President & Lifetime Achievement Award
                  </h3>
                  <p className="text-[13px] text-ivory/55 max-w-[50ch] leading-[1.65]">
                    President of FOGSI and recipient of the Lifetime Achievement Award from the President of India in the same historic year.
                  </p>
                </div>
                <span className="font-display font-medium text-[clamp(28px,3.5vw,40px)] text-gold/35 shrink-0 leading-none">2025</span>
              </div>
            </div>

            {/* Featured: 2026 */}
            <div className="bg-[rgba(197,164,109,0.12)] border border-gold/45 px-6 py-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-gold">Current</span>
                  </div>
                  <h3 className="font-display font-medium text-[clamp(18px,2vw,22px)] text-gold-light leading-[1.2] mb-2">
                    ISAR President & STAR Academy Launch
                  </h3>
                  <p className="text-[13px] text-ivory/55 max-w-[50ch] leading-[1.65]">
                    Takes office as President of ISAR for 2026–2028. Launches STAR Academy Foundation Series on 15 July.
                  </p>
                </div>
                <span className="font-display font-medium text-[clamp(28px,3.5vw,40px)] text-gold/35 shrink-0 leading-none">2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BREAKTHROUGH ──────────────────────────────────────── */}
      <section className="py-[clamp(50px,8vw,60px)] bg-[linear-gradient(rgba(248,245,239,0.82),rgba(248,245,239,0.82)),url('/images/marble.webp')] bg-cover bg-center">
        <div className="max-w-[860px] mx-auto px-[clamp(20px,4vw,80px)]">

          <div className="text-center mb-10">
            <span className={`${eyebrow} block mb-3`}>Historic Moment</span>
            <h2 className="font-display font-medium text-[clamp(24px,3.5vw,28px)] leading-[1.1] tracking-[-0.015em] text-navy mb-2">
              A breakthrough that placed Indian reproductive medicine
            </h2>
            <p className="font-display font-medium italic text-[clamp(20px,2.8vw,32px)] leading-[1.1] text-gold-deep">
              on the world map
            </p>
          </div>

          <div className="bg-cream border border-border-warm overflow-hidden">
            <div className="h-[3px] bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]" />

            <div className="px-[clamp(24px,5vw,156px)] py-10">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-gold-deep border border-gold-deep/40 px-4 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-deep" />
                  16 April 2018
                </span>
              </div>

              <h3 className="font-display font-medium text-[clamp(20px,2.5vw,28px)] text-center text-navy mb-6 leading-[1.25]">
                The day India delivered its first stem cell baby
              </h3>

              <blockquote className="border-l-2 border-gold pl-6 mb-8 max-w-[502ch] mx-auto">
                <p className="font-display italic text-[clamp(14px,1.3vw,17px)] text-navy/85 leading-[1.65]">
                  It was the first time in India that a child had been brought into the world through the use of autologous stem cell therapy in fertility. It was also the first time in the world for a woman of 45
                </p>
              </blockquote>

              <div className="grid grid-cols-2 gap-px bg-border-warm max-w-[360px] mx-auto mb-8 border border-border-warm">
                {[
                  { num: "1st", label: "In India" },
                  { num: "1st", label: "Worldwide at 45" },
                ].map((s) => (
                  <div key={s.label} className="bg-cream text-center px-6 py-5">
                    <div className="font-display font-medium text-[32px] text-gold-deep leading-none mb-1">{s.num}</div>
                    <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate">{s.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-[14px] leading-[1.7] text-slate text-center max-w-[502ch] mx-auto">
                The procedure was led by Dr. Sunita and a team at her institutions. The technique she developed has since informed the regenerative work that continues at ALIV
              </p>

              <div className="mt-8 pt-6 border-t border-border-warm text-center">
                <div className="inline-flex items-center gap-3">
                  <span className="w-6 h-px bg-gold" />
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold-deep">Procedure Led By</span>
                  <span className="w-6 h-px bg-gold" />
                </div>
                <p className="font-display italic text-[18px] text-navy mt-2">Dr. Sunita Tandulwadkar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ──────────────────────────────────────── */}
      <section className="py-[clamp(50px,8vw,60px)] bg-[linear-gradient(rgba(15,20,32,0.74),rgba(15,20,32,0.74)),url('/images/header_footer.webp')] bg-cover bg-center">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">

          <div className="text-center max-w-[640px] mx-auto mb-12">
            <span className={`${eyebrowGold} block mb-3`}>Scholarly Impact</span>
            <h2 className="font-display font-medium text-[clamp(26px,3.5vw,40px)] leading-[1.1] tracking-[-0.015em] text-ivory">
              Written down, peer-reviewed,
              <span className="block italic text-gold-light mt-1">and on the editorial side of the page.</span>
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-px bg-[rgba(197,164,109,0.15)] border border-[rgba(197,164,109,0.15)] mb-8 max-w-[720px] mx-auto">
            {[
              { num: "39", label: "Books Authored" },
              { num: "106+", label: "Peer-Reviewed Papers" },
              { num: "400+", label: "Conference Lectures" },
            ].map((s) => (
              <div key={s.label} className="bg-[rgba(10,14,22,0.7)] text-center px-4 py-6">
                <div className="font-display font-medium text-[clamp(28px,3vw,42px)] text-gold leading-none mb-1.5">{s.num}</div>
                <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-ivory/50">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Editorial cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[860px] mx-auto">
            {[
              {
                head: "Editorial Roles",
                items: [
                  { title: "Editor-in-Chief", detail: "Indian Journal of Gynecological Endoscopy" },
                  { title: "Editorial Board Member", detail: "ESGE — European Society for Gynaecological Endoscopy" },
                ],
              },
              {
                head: "Reviewing & Advisory",
                items: [
                  { title: "Reviewer & Advisor", detail: "Journal of Human Reproductive Sciences" },
                  { title: "Invited Faculty", detail: "400+ National & International Conferences" },
                ],
              },
            ].map((card) => (
              <div key={card.head} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(197,164,109,0.18)]">
                <div className="px-6 py-4 border-b border-[rgba(197,164,109,0.18)]">
                  <span className={eyebrowGold}>{card.head}</span>
                </div>
                <div className="divide-y divide-[rgba(197,164,109,0.10)]">
                  {card.items.map((item) => (
                    <div key={item.title} className="px-6 py-4">
                      <div className="font-display font-medium text-[17px] text-ivory mb-1">{item.title}</div>
                      <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-gold/60">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recognition bar */}
          <div className="mt-5 max-w-[860px] mx-auto border border-[rgba(197,164,109,0.18)] bg-[rgba(255,255,255,0.03)] px-6 py-4 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {["Indexed in Scopus", "PubMed Central", "Cited 2,000+ times"].map((item) => (
              <span key={item} className="font-mono text-[11px] tracking-[0.14em] uppercase text-ivory/45">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ────────────────────────────────────────────── */}
      <section className="py-[clamp(50px,8vw,60px)] bg-[linear-gradient(rgba(248,245,239,0.82),rgba(248,245,239,0.82)),url('/images/marble.webp')] bg-cover bg-center">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">

          <div className="text-center max-w-[640px] mx-auto mb-12">
            <span className={`${eyebrow} block mb-3`}>Awards & Recognition</span>
            <h2 className="font-display font-medium text-[clamp(26px,3.5vw,40px)] leading-[1.1] tracking-[-0.015em] text-navy">
              Recognised across India, by the institutions that count
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              { year: "2025", title: "Lifetime Achievement Award", desc: "Conferred by the 14th President of India." },
              { year: "2020", title: "Pride of FOGSI", desc: "Federation of Obstetric and Gynaecological Societies of India." },
              { year: "2022", title: "IVF Icon of the Year", desc: "The Economic Times, Endoscopy category." },
            ].map((award) => (
              <div key={award.year} className="bg-cream border border-border-warm px-6 py-7 hover:-translate-y-1 hover:border-gold transition-all duration-300 group">
                <div className="font-display font-medium text-[42px] text-gold-deep/25 leading-none mb-4 group-hover:text-gold-deep/40 transition-colors duration-300">
                  {award.year}
                </div>
                <h3 className="font-display font-medium text-[20px] text-navy mb-2 leading-[1.25]">{award.title}</h3>
                <p className="text-[13px] text-slate leading-[1.65]">{award.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">

            {/* Image — natural size, no upscaling */}
            <div className="relative bg-[rgba(248,245,239,0.6)] border border-border-warm flex items-center justify-center p-4">
              <img
                src="/images/medals.webp"
                alt="Awards & medals received by Dr. Sunita Tandulwadkar"
                className="w-full h-auto object-contain max-h-[420px]"
                style={{ imageRendering: "auto" }}
              />
              {/* gold accent strip */}
              <div className="absolute bottom-0 inset-x-0 h-[3px] bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]" />
            </div>

            {/* Awards list */}
            <div className="flex flex-col justify-center">
              <span className={`${eyebrow} block mb-5`}>Also Recognised</span>
              <div className="divide-y divide-border-warm border-t border-border-warm">
                {[
                  { title: "Bharat Gaurav Puraskar", detail: "2019" },
                  { title: "Best Medical Practice Award", detail: "European Medical Association · 2016" },
                  { title: "Letter of Appreciation from the President of India", detail: "2012" },
                ].map((award) => (
                  <div key={award.title} className="flex flex-wrap justify-between items-baseline py-5 gap-3 group hover:pl-2 transition-all duration-200">
                    <span className="font-display font-medium text-[clamp(16px,1.4vw,19px)] text-navy group-hover:text-gold-deep transition-colors duration-200">
                      {award.title}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-gold-deep shrink-0">
                      {award.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY SHE TEACHES ───────────────────────────────────── */}
      <section className="py-[clamp(50px,8vw,60px)] bg-[linear-gradient(rgba(15,20,32,0.74),rgba(15,20,32,0.74)),url('/images/header_footer.webp')] bg-cover bg-center overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">

          <div className="text-center mb-10">
            <span className={`${eyebrowGold} block mb-3`}>Why She Teaches</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="font-display font-medium text-[clamp(26px,3.5vw,44px)] leading-[1.1] tracking-[-0.015em] text-ivory mb-6">
                The teacher she has been all along.
              </h2>
              <p className="text-[15px] text-ivory/65 leading-[1.75] mb-8">
                For thirty-five years, Dr. Sunita has been the doctor that other doctors call when the case stops making sense. Fellows in her department, colleagues from other cities, friends of friends who needed an answer. The Academy is what happens when that quiet, daily teaching becomes structured. Same voice. Same method. Same patience for the question behind the question. Just open to everyone now.
              </p>
              <blockquote className="relative pl-6 border-l-2 border-gold">
                <p className="font-display italic text-[clamp(15px,1.4vw,19px)] text-gold-light leading-[1.55]">
                  The best doctors are not the ones who know everything, but the ones who never stop asking questions.
                </p>
                <cite className="block mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-gold-deep not-italic">
                  — Dr. Sunita Tandulwadkar
                </cite>
              </blockquote>
            </div>

            <div>
              <img
                src="/images/mam.webp"
                alt="Dr. Sunita Tandulwadkar teaching"
                className="w-full h-auto rounded-[4px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-[linear-gradient(rgba(248,245,239,0.82),rgba(248,245,239,0.82)),url('/images/marble.webp')] bg-cover bg-center py-[clamp(40px,6vw,70px)] px-[clamp(20px,4vw,80px)]">
        <div className="relative overflow-hidden max-w-[1100px] mx-auto border border-gold/25 rounded-[4px] bg-[url('/images/header_footer.webp')] bg-cover bg-center">
          <div className="absolute inset-0 bg-[rgba(11,18,32,0.86)]" />
          <div className="absolute top-8 left-8 w-14 h-14 border-t border-l border-gold/35 hidden md:block z-[2]" />
          <div className="absolute bottom-8 right-8 w-14 h-14 border-b border-r border-gold/35 hidden md:block z-[2]" />
          <div className="relative z-[3] max-w-[700px] mx-auto text-center px-[clamp(24px,5vw,56px)] py-[clamp(40px,6vw,70px)] text-ivory">
            <span className="inline-block font-mono text-[11px] font-medium tracking-[0.28em] uppercase text-gold mb-4">
              The Invitation
            </span>
            <h2 className="font-display font-medium text-[clamp(26px,3.2vw,38px)] leading-[1.12] tracking-[-0.015em] text-ivory mb-4">
              Learn directly from Dr. Sunita Tandulwadkar.
            </h2>
            <p className="text-[15px] text-ivory/70 leading-[1.7] max-w-[48ch] mx-auto mb-7">
              The Foundation Series runs live, every Wednesday at 8 PM IST. Five lectures that rebuild how you read a fertility cycle.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/course/foundation/enroll"
                className={`inline-flex items-center gap-2 px-7 py-3 font-body font-bold text-[15px] tracking-[0.02em] text-black rounded-[2px] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] transition-all duration-300 group ${goldGradient}`}
              >
                Book My Seat
                <span className={arrow}>&rarr;</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-body font-medium text-[14px] tracking-[0.02em] border border-gold-light bg-transparent text-gold-light rounded-[2px] transition-all duration-300 hover:bg-gold-light hover:text-navy group"
              >
                Speak to Our Team
                <span className={arrow}>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
