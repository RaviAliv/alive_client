import { Link } from "react-router-dom";
import type { LectureDetailData } from "../../pages/course/data/foundationLectureDetails";
import { ENROLL_URL } from "../../lib/config";

export type LectureDetailConfig = {
  accent: string;
  accentDark: string;
  darkBg: string;
  lightBg: string;
  courseSlug: string;
  courseName: string;
  tierLabel: string;
  enrollPath: string;
  totalLectures: number;
  ordinals: string[];
};

type CalendarEntry = Pick<LectureDetailData, "num" | "dateShort" | "time" | "title">;

export default function LectureDetailLayout({
  lecture,
  config,
  allLectures,
}: {
  lecture: LectureDetailData;
  config: LectureDetailConfig;
  allLectures: CalendarEntry[];
}) {
  const { accent, accentDark, darkBg, lightBg, courseSlug, courseName, tierLabel, totalLectures, ordinals } = config;


  const ReelFrame = () => (
    <div style={{ position: "relative", width: 268, height: 476, border: "1px solid #c5a46d", background: "#000", overflow: "hidden", flexShrink: 0 }}>
      {lecture.ytShortsId ? (
        <iframe
          src={`https://www.youtube.com/embed/${lecture.ytShortsId}?autoplay=1&mute=1&loop=1&playlist=${lecture.ytShortsId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={`${courseName} Lecture ${lecture.num} — preview`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-center leading-[1.8]" style={{ color: accent, opacity: 0.7 }}>
            Reel Preview<br />9:16 · Autoplay
          </span>
        </div>
      )}
    </div>
  );

  const EnrollBtn = ({ className, label = "Reserve My Seat" }: { className?: string; label?: string }) => (
    <a
      href={ENROLL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 px-6 py-3 font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:brightness-110 group ${className ?? ""}`}
      style={{ background: `linear-gradient(180deg, ${accent} 0%, ${accentDark} 100%)`, color: "#fff", border: `1px solid ${accent}` }}
    >
      {label}
      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
    </a>
  );

  return (
    <div className="font-body">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section
        className="-mt-20 relative overflow-hidden flex items-center"
        style={{ background: darkBg, minHeight: "100svh" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 10%, ${accent}14, transparent 50%),
                         radial-gradient(ellipse at 80% 90%, ${accent}0d, transparent 50%)`,
          }}
        />
        <div className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 pt-24 pb-8">
          {/* Breadcrumb */}
          <nav className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30 mb-5 flex items-center gap-2 flex-wrap">
            <Link to="/courses" className="hover:text-white/60 transition-colors">Courses</Link>
            <span>/</span>
            <Link to={`/course/${courseSlug}`} className="hover:text-white/60 transition-colors">{courseName}</Link>
            <span>/</span>
            <span style={{ color: accent }}>Lecture {lecture.num}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-10 lg:gap-14 items-center">
            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 border font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ background: `${accent}1f`, borderColor: accent, color: accent }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}b0` }} />
                {tierLabel} · Lecture {lecture.num}
              </div>

              <h1 className="font-display font-medium leading-[1.05] tracking-[-0.01em] text-white mb-2"
                style={{ fontSize: "clamp(1.8rem,3.6vw,2.8rem)" }}>
                {lecture.headline}
              </h1>

              <p className="font-display italic mb-3"
                style={{ fontSize: "clamp(0.95rem,1.3vw,1.15rem)", color: accent, lineHeight: 1.5 }}>
                {lecture.tagline}
              </p>

              <p className="text-white/70 leading-[1.65] mb-5 max-w-[78ch]" style={{ fontSize: "0.9375rem" }}>
                {lecture.heroBody}
              </p>

              {/* Mobile reel — between description and logistics, hidden on desktop */}
              <div className="flex lg:hidden justify-center mb-5">
                <div className="flex flex-col items-center">
                  <ReelFrame />
                  <div className="flex items-center justify-between mt-2 font-mono text-[9px] tracking-[0.16em] uppercase"
                    style={{ width: 268, maxWidth: "100%", color: accent }}>
                    <span>Dr. Sunita · {courseSlug.charAt(0).toUpperCase() + courseSlug.slice(1)} {lecture.num}</span>
                    <span className="text-white/50">Intro</span>
                  </div>
                </div>
              </div>

              {/* Logistics strip */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-y-2 mb-5 py-3"
                style={{ borderTop: `1px solid ${accent}30`, borderBottom: `1px solid ${accent}30` }}>
                {[
                  lecture.date.split(",")[0],
                  lecture.date.split(",").slice(1).join(",").trim(),
                  lecture.time,
                  lecture.duration,
                  lecture.platform,
                ].map((item, i, arr) => (
                  <span key={i}
                    className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase py-0.5"
                    style={{
                      color: accent,
                      paddingLeft: i === 0 ? 0 : undefined,
                      paddingRight: undefined,
                    }}>
                    <span className="hidden sm:inline" style={{
                      paddingLeft: i === 0 ? 0 : 14,
                      paddingRight: i === arr.length - 1 ? 0 : 14,
                      borderRight: i < arr.length - 1 ? `1px solid ${accent}30` : "none",
                    }}>{item}</span>
                    <span className="sm:hidden">{item}</span>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <EnrollBtn />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: accent, opacity: 0.6 }}>
                  Live Q&amp;A · Limited Seats
                </span>
              </div>
            </div>

            {/* Right: YouTube Shorts reel — desktop only */}
            <div className="hidden lg:flex flex-col items-end lg:-mt-8">
              <ReelFrame />
              <div className="flex items-center justify-between mt-2.5 font-mono text-[9px] tracking-[0.16em] uppercase"
                style={{ width: 268, color: accent }}>
                <span>Dr. Sunita · {courseSlug.charAt(0).toUpperCase() + courseSlug.slice(1)} {lecture.num}</span>
                <span className="text-white/50">Intro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT THIS LECTURE IS ─────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: lightBg }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-20">
              <p className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase mb-5" style={{ color: accent }}>
                What This Lecture Is
              </p>
              <h2 className="font-display font-medium leading-[1.18] text-navy"
                style={{ fontSize: "clamp(1.5rem,2.8vw,2.1rem)" }}>
                {lecture.whatItIsTitle}
              </h2>
              <div className="mt-6 w-10 h-0.5"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
            </div>
            <div>
              {lecture.whatItIsBody.map((para, i) => (
                <p key={i} className="leading-[1.82] mb-6 last:mb-0"
                  style={{ fontSize: "1.025rem", color: "#374a40" }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE FORMAT ────────────────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ background: darkBg }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-20 items-start">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase mb-5" style={{ color: accent }}>
                The Format
              </p>
              <h2 className="font-display font-medium leading-[1.16] text-white mb-6"
                style={{ fontSize: "clamp(1.5rem,2.8vw,2.1rem)" }}>
                {lecture.formatTitle}
              </h2>
              <EnrollBtn className="mt-2" label="Reserve My Seat" />
            </div>
            <div>
              {lecture.formatBody.map((para, i) => (
                <p key={i} className="leading-[1.82] mb-5 last:mb-0"
                  style={{ fontSize: "1.0rem", color: "rgba(248,245,239,0.72)" }}>
                  {para}
                </p>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
                {[
                  { label: lecture.formatAttrs[0], icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                  { label: lecture.formatAttrs[1], icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                  { label: lecture.formatAttrs[2], icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                ].map(({ label, icon }) => (
                  <div key={label} className="flex flex-col gap-3 p-5"
                    style={{ background: `${accent}0d`, border: `1px solid ${accent}28` }}>
                    {icon}
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase leading-[1.5]"
                      style={{ color: accent }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. OUTCOMES ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: lightBg }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-20">
              <p className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase mb-5" style={{ color: accent }}>
                Outcomes
              </p>
              <h2 className="font-display font-medium leading-[1.18] text-navy"
                style={{ fontSize: "clamp(1.5rem,2.8vw,2.1rem)" }}>
                What you will be able to do after this lecture.
              </h2>
              <div className="mt-6 w-10 h-0.5"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lecture.outcomes.map((outcome, i) => (
                <div key={i} className="bg-white p-5 flex gap-4 items-start"
                  style={{ border: `1.5px solid ${accent}35`, boxShadow: `0 2px 8px rgba(0,0,0,0.07)` }}>
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: accent }}>
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="leading-[1.6] font-medium text-[0.9375rem]" style={{ color: "#1f2937" }}>{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CERTIFICATION ─────────────────────────────────────── */}
      <section className="py-10 md:py-10 overflow-hidden" style={{ background: darkBg }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 md:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_580px] gap-10 lg:gap-16 items-center">
            {/* Left: text */}
            <div>
              <p className="font-mono text-[15px] font-medium tracking-[0.22em] uppercase mb-5" style={{ color: accent }}>
                Certification
              </p>
              <h2 className="font-display font-medium leading-[1.12] text-white mb-5"
                style={{ fontSize: "clamp(1.6rem,3vw,2.1rem)" }}>
                Earn your participation certificate
              </h2>
              <p className="leading-[1.75] mb-4 max-w-[52ch]"
                style={{ fontSize: "0.9875rem", color: "rgba(248,245,239,0.65)" }}>
                completion of each lectures and receive a certificate of participation from the Sunita Tandulwadkar Academy of Reproduction. Issued digitally and available immediately on completion.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Issued on completion of all " + totalLectures + " " + courseName + " lectures",
                  "Digital certificate — downloadable and shareable",
                  "Issued in the name you register with",
                  "Recognised by the STAR Academy",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: `${accent}20`, border: `1px solid ${accent}50` }}>
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-[0.9rem]" style={{ color: "rgba(248,245,239,0.7)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <EnrollBtn label="Reserve My Seat" />
            </div>

            {/* Right: certificate image */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-full blur-[60px] pointer-events-none"
                style={{ background: `${accent}14` }} />
              <div className="relative rounded-[4px] overflow-hidden"
                style={{ border: `1px solid ${accent}40`, boxShadow: `0 24px 60px -10px rgba(0,0,0,0.6)` }}>
                <div className="h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${accent}50, ${accent}, ${accent}50)` }} />
                <img
                  src="/images/star_certificate_page.webp"
                  alt="STAR Academy Participation Certificate"
                  className="w-full block"
                  style={{ background: "#f8f5ef" }}
                />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 pointer-events-none"
                style={{ borderColor: accent }} />
              <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 pointer-events-none"
                style={{ borderColor: accent }} />
              <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 pointer-events-none"
                style={{ borderColor: accent }} />
              <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 pointer-events-none"
                style={{ borderColor: accent }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. THE DETAILS ───────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: lightBg }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="mb-10">
            <p className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase mb-3" style={{ color: accent }}>
              The Details
            </p>
            <h2 className="font-display font-medium leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#111827" }}>
              {lecture.logisticsTitle}
            </h2>
          </div>

          {/* When & Where */}
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase mb-4" style={{ color: accent }}>
            When and Where
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {[
              { label: "Date", value: lecture.date, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
              { label: "Time", value: lecture.time, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg> },
              { label: "Duration", value: lecture.duration, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> },
              { label: "Platform", value: lecture.platform, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg> },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white p-5 flex flex-col gap-3"
                style={{ border: `1.5px solid ${accent}35`, boxShadow: `0 2px 8px rgba(0,0,0,0.07)` }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${accent}15`, border: `1.5px solid ${accent}40` }}>
                  {icon}
                </div>
                <div>
                  <p className="font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase mb-1.5" style={{ color: accent }}>{label}</p>
                  <p className="font-display leading-[1.25] font-medium" style={{ fontSize: "1rem", color: "#111827" }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What's Included */}
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase mb-4" style={{ color: accent }}>
            What's Included
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {lecture.whatsIncluded.map((item) => (
              <div key={item.key} className="bg-white p-5 flex flex-col gap-3"
                style={{ border: `1.5px solid ${accent}35`, boxShadow: `0 2px 8px rgba(0,0,0,0.07)` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: accent }}>
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase mb-1.5" style={{ color: accent }}>{item.key}</p>
                  <p className="leading-[1.55] font-medium" style={{ fontSize: "0.9375rem", color: "#1f2937" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[14px] italic pt-8"
            style={{ color: "#4b5563", borderTop: `1px solid ${accent}25` }}>
            {lecture.logisticsTrailing}
          </p>
        </div>
      </section>

      {/* ── CALENDAR: Where this lecture sits ────────────────────── */}
      <section className="py-8 md:py-8" style={{ background: lightBg, borderTop: "1px solid #e5e7eb" }}>
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="text-center mb-10">
            <p className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase mb-4" style={{ color: accent }}>
              Where This Lecture Sits
            </p>
            <h2 className="font-display font-medium leading-[1.16] text-navy mb-4 mx-auto"
              style={{ fontSize: "clamp(1.7rem,3.2vw,2.4rem)", maxWidth: "30ch" }}>
              {totalLectures} lectures, one continuous arc. This is the {ordinals[parseInt(lecture.num) - 1]}.
            </h2>
          </div>

          {/* Progress arc */}
          <div className="hidden lg:flex items-center mb-10 px-8">
            {allLectures.map((cal, i) => {
              const isCurrent = cal.num === lecture.num;
              const isDone = parseInt(cal.num) < parseInt(lecture.num);
              return (
                <div key={cal.num} className="flex items-center" style={{ flex: 1 }}>
                  <div className="flex flex-col items-center" style={{ minWidth: 48 }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[10px] font-bold mb-2 transition-all duration-200"
                      style={{
                        background: isCurrent ? accent : isDone ? `${accent}25` : "transparent",
                        border: `2px solid ${isCurrent ? accent : isDone ? `${accent}80` : `${accent}70`}`,
                        color: isCurrent ? "#fff" : isDone ? accent : `${accent}cc`,
                        boxShadow: isCurrent ? `0 0 0 5px ${accent}18` : "none",
                      }}>
                      {cal.num}
                    </div>
                    <span className="font-mono text-[8px] tracking-[0.14em] uppercase text-center"
                      style={{ color: isCurrent ? accent : "#6b7280" }}>
                      {cal.dateShort.split(" ").slice(1, 3).join(" ")}
                    </span>
                  </div>
                  {i < allLectures.length - 1 && (
                    <div style={{ flex: 1, height: 2, marginBottom: 22, background: isDone ? accent : `${accent}55` }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Cards — 5-col on desktop, 2-col on tablet, 1-col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
            {allLectures.map((cal) => {
              const isCurrent = cal.num === lecture.num;
              return (
                <Link key={cal.num} to={`/course/${courseSlug}/lecture/${cal.num}`}
                  className="relative block p-5 transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: isCurrent ? darkBg : "#ffffff",
                    border: `1.5px solid ${isCurrent ? accent : `${accent}30`}`,
                    boxShadow: isCurrent ? `0 16px 40px ${accent}28` : "0 1px 4px rgba(0,0,0,0.05)",
                  }}>
                  {isCurrent && (
                    <span className="absolute -top-[10px] left-4 font-mono text-[8px] font-semibold tracking-[0.22em] uppercase px-2.5 py-1 text-white whitespace-nowrap"
                      style={{ background: accent }}>
                      You Are Here
                    </span>
                  )}
                  <div className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase mb-3" style={{ color: accent }}>
                    Lecture {cal.num}
                  </div>
                  <div className="font-display text-[1rem] leading-[1.15] mb-1"
                    style={{ color: isCurrent ? "#fff" : "#1a2e23" }}>
                    {cal.dateShort}
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-4"
                    style={{ color: isCurrent ? "rgba(248,245,239,0.45)" : "#9ca3af" }}>
                    {cal.time}
                  </div>
                  <h3 className="font-display text-[0.9375rem] leading-[1.35] m-0"
                    style={{ color: isCurrent ? "rgba(248,245,239,0.9)" : "#1a2e23" }}>
                    {cal.title}
                  </h3>
                </Link>
              );
            })}
          </div>

          <div className="text-center pt-8" style={{ borderTop: `1px solid ${accent}20` }}>
            <p className="font-display italic text-navy text-[1.05rem] max-w-[62ch] mx-auto leading-[1.65]">
              The series is bundled. Reserving a seat reserves it for all {totalLectures} lectures.
            </p>
          </div>
        </div>
      </section>

      {/* ── FACULTY ──────────────────────────────────────────────── */}
      <section style={{ background: darkBg, overflow: "hidden" }}>
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]">
            <div className="relative" style={{ minHeight: 320, maxHeight: 480 }}>
              <img src="/images/lacture_faculty.webp" alt="Dr. Sunita Tandulwadkar"
                className="w-full h-full object-cover object-top"
                style={{ minHeight: 320, maxHeight: 480, display: "block" }} />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to right, transparent 50%, ${darkBg} 100%), linear-gradient(to top, ${darkBg} 0%, transparent 30%), linear-gradient(to bottom, ${darkBg} 0%, transparent 20%)` }} />
            </div>
            <div className="flex flex-col justify-center px-8 lg:px-14 py-16 lg:py-20">
              <p className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase mb-6" style={{ color: accent }}>
                The Faculty
              </p>
              <h3 className="font-display font-medium text-white leading-[1.1] mb-8"
                style={{ fontSize: "clamp(1.8rem,2.8vw,2.5rem)" }}>
                Dr. Sunita<br />Tandulwadkar
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {["ISAR President 2026–28", "FOGSI Past President 2025", "Ruby Hall Clinic, Pune", "Founder · Solo Clinic IVF", "Three Decades in Reproductive Medicine"].map((cred) => (
                  <span key={cred} className="font-mono text-[9px] tracking-[0.14em] uppercase px-3 py-1.5"
                    style={{ background: `${accent}15`, border: `1px solid ${accent}38`, color: "#7dc4a0" }}>
                    {cred}
                  </span>
                ))}
              </div>
              <p className="leading-[1.8] mb-8 max-w-[50ch]"
                style={{ fontSize: "0.9875rem", color: "rgba(248,245,239,0.62)" }}>
                {lecture.facultyBio}
              </p>
              <Link to="/faculty"
                className="inline-flex items-center gap-2.5 font-mono text-[10px] font-semibold tracking-[0.22em] uppercase pb-1.5 transition-all duration-200 hover:gap-4 self-start"
                style={{ color: "#c5a46d", borderBottom: "1px solid rgba(197,164,109,0.4)" }}>
                Read Her Full Profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. ITALIC QUOTE ──────────────────────────────────────── */}
      <section className="relative py-14 md:py-12 overflow-hidden" style={{ background: darkBg }}>
        <div className="relative max-w-[840px] mx-auto px-5 sm:px-8 md:px-12 text-center">
          <div className="w-8 h-px mx-auto mb-10" style={{ background: "#c5a46d" }} />
          <p className="font-display italic leading-[1.65] text-white/80"
            style={{ fontSize: "clamp(1.15rem,0.4vw,1.5rem)" }}>
            {lecture.whyQuote}
          </p>
          <div className="w-8 h-px mx-auto mt-10" style={{ background: "#c5a46d" }} />
          <p className="font-mono text-[9px] tracking-[0.22em] uppercase mt-6"
            style={{ color: "#c5a46d", opacity: 0.6 }}>
            Dr. Sunita Tandulwadkar
          </p>
        </div>
      </section>

      {/* ── 8. REGISTRATION ──────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: lightBg }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-14 items-center">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-[0.28em] uppercase mb-4" style={{ color: accent }}>
                {courseName} · Lecture {lecture.num}
              </p>
              <h2 className="font-display font-medium leading-[1.1] mb-4"
                style={{ fontSize: "clamp(1.6rem,3vw,2.5rem)", color: "#1a2e23" }}>
                {lecture.headline}
              </h2>
              <p className="text-[15px] leading-[1.72] mb-8" style={{ color: "#4a5e52", maxWidth: "46ch" }}>
                Join Dr. Sunita Tandulwadkar live. {lecture.date} · {lecture.time} · {lecture.platform}.
              </p>
              <div className="flex flex-wrap items-center gap-5 mb-4">
                <a href={ENROLL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 font-mono text-[10.5px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 hover:brightness-110 group"
                  style={{ background: `linear-gradient(180deg, ${accent} 0%, ${accentDark} 100%)`, color: "#fff", border: `1px solid ${accent}` }}>
                  Reserve My Seat
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: accent }}>
                  Limited Seats
                </span>
              </div>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "#6b7280" }}>
                Live Q&amp;A Included · Certificate on Completion
              </p>
            </div>

            {/* Stats panel */}
            <div className="grid grid-cols-2" style={{ border: `1px solid ${accent}` }}>
              {[
                { n: String(totalLectures), label: "Lectures"    },
                { n: "90",                  label: "Min Each"    },
                { n: "Live",                label: "on Zoom"     },
                { n: "1",                   label: "Certificate" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-7 px-3 text-center"
                  style={{
                    borderRight:  i % 2 === 0 ? `1px solid ${accent}` : "none",
                    borderBottom: i < 2        ? `1px solid ${accent}` : "none",
                    background:   i % 2 !== 0  ? `${accent}08`        : "#ffffff",
                  }}>
                  <span className="font-display font-semibold leading-none mb-1.5 bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)] bg-clip-text text-transparent"
                    style={{ fontSize: "clamp(1.6rem,2.4vw,2.1rem)" }}>
                    {stat.n}
                  </span>
                  <span className="font-mono text-[8.5px] tracking-[0.2em] uppercase" style={{ color: accent }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
