import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { LectureDetailData } from "../../pages/course/data/foundationLectureDetails";
import LectureRegisterPrompt from "./LectureRegisterPrompt";
import { useAuth } from "../../context/AuthContext";
import { apiGet, getToken } from "../../lib/api";

const ENROLL_PATH = "/course/foundation/enroll";

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

  const { user, initialized } = useAuth();
  const [hasFullAccess, setHasFullAccess] = useState(false);

  useEffect(() => {
    if (!initialized) return;
    // Admins and superadmins have inherent full access
    if (user?.systemRole === "admin" || user?.systemRole === "superadmin") {
      setHasFullAccess(true);
      return;
    }
    if (!getToken()) return;
    apiGet<{ courses: { course: string; expiresAt: string | null; grantAllLectures: boolean }[] }>("/admin/my-access")
      .then((d) => {
        const found = d.courses.find((c) => c.course === "foundation");
        if (!found || !found.grantAllLectures) return;
        const notExpired = !found.expiresAt || new Date(found.expiresAt) > new Date();
        if (notExpired) setHasFullAccess(true);
      })
      .catch(() => {});
  }, [initialized, user?.systemRole]);

  const EnrollBtn = ({ className }: { className?: string }) => (
    <Link
      to={hasFullAccess ? "/video" : ENROLL_PATH}
      className={`inline-flex items-center gap-2.5 px-6 py-3 font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:brightness-110 group ${className ?? ""}`}
      style={{ background: `linear-gradient(180deg, ${accent} 0%, ${accentDark} 100%)`, color: "#fff", border: `1px solid ${accent}` }}
    >
      {hasFullAccess ? "Explore Lecture" : "Reserve My Seat"}
      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
    </Link>
  );

  return (
    <div className="font-body">
      <LectureRegisterPrompt accent={accent} />

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section
        className="-mt-20 relative overflow-hidden flex items-center"
        style={{ background: darkBg, minHeight: "100svh" }}
      >
        {/* Hero background image — full opacity, gradient overlay controls text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('${lecture.thumbnail ?? "/images/FoundationLa.webp"}')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        {/* Dark gradient overlay so text stays readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(7,20,16,0.78) 0%, rgba(7,20,16,0.55) 55%, rgba(7,20,16,0.18) 100%)",
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

          <div className="max-w-[760px]">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 border font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ background: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.82)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}cc` }} />
              {tierLabel} · Lecture {lecture.num}
            </div>

            <h1
              className="font-display font-medium leading-[1.05] tracking-[-0.01em] mb-2"
              style={{ fontSize: "clamp(2rem,4.2vw,3.2rem)", color: "#ffffff", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              {lecture.headline}
            </h1>

            <p
              className="font-display italic mb-4"
              style={{ fontSize: "clamp(1rem,1.4vw,1.2rem)", color: "#f5dfa0", lineHeight: 1.5, textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
            >
              {lecture.tagline}
            </p>

            <p className="leading-[1.7] mb-6 max-w-[70ch]"
              style={{ fontSize: "0.9375rem", color: "rgba(200,210,205,0.72)", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
              {lecture.heroBody}
            </p>

            {/* Logistics strip */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-y-2 mb-6 py-3"
              style={{ borderTop: `1px solid rgba(255,255,255,0.18)`, borderBottom: `1px solid rgba(255,255,255,0.18)` }}>
              {[
                lecture.date.split(",")[0],
                lecture.date.split(",").slice(1).join(",").trim(),
                lecture.time,
                lecture.platform,
              ].map((item, i, arr) => (
                <span key={i}
                  className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase py-0.5"
                  style={{ color: "rgba(255,255,255,0.92)" }}>
                  <span className="hidden sm:inline" style={{
                    paddingLeft: i === 0 ? 0 : 14,
                    paddingRight: i === arr.length - 1 ? 0 : 14,
                    borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
                  }}>{item}</span>
                  <span className="sm:hidden">{item}</span>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <EnrollBtn />
              <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: "#f5dfa0" }}>
                Interactive Q&amp;A · Limited Seats
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT THIS LECTURE IS ─────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: lightBg }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-20">
              <p className="font-mono text-[15px] font-medium tracking-[0.22em] uppercase mb-5" style={{ color: accent }}>
                What You Will Be Getting From This Lecture

              </p>
              <h2 className="font-display font-medium leading-[1.18] text-navy"
                style={{ fontSize: "clamp(1.5rem,2.8vw,1.1rem)" }}>
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

{/* Certification moved — see just above registration section */}

      {/* ── 6. THE DETAILS ───────────────────────────────────────── */}
      <section className="py-5 md:py-5" style={{ background: lightBg }}>
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
              { label: "Date", value: lecture.date, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
              { label: "Time", value: lecture.time, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" /></svg> },
              { label: "Platform", value: lecture.platform, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg> },
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {lecture.whatsIncluded.map((item) => (
              <div key={item.key} className="bg-white p-5 flex flex-col gap-3"
                style={{ border: `1.5px solid ${accent}35`, boxShadow: `0 2px 8px rgba(0,0,0,0.07)` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: accent }}>
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase mb-1.5" style={{ color: accent }}>{item.key}</p>
                  <p className="leading-[1.55] font-medium" style={{ fontSize: "0.9375rem", color: "#1f2937" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {lecture.logisticsTrailing && (
            <p className="text-center text-[14px] italic pt-8"
              style={{ color: "#4b5563", borderTop: `1px solid ${accent}25` }}>
              {lecture.logisticsTrailing}
            </p>
          )}
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

      {/* Faculty section hidden */}

      {/* ── 7. ITALIC QUOTE ──────────────────────────────────────── */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: darkBg }}>
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

      {/* ── CERTIFICATION ────────────────────────────────────────── */}
      <section className="py-14 md:py-20 overflow-hidden" style={{ background: darkBg }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10 lg:gap-16 items-center">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase mb-5" style={{ color: accent }}>
                Certification
              </p>
              <h2 className="font-display font-medium leading-[1.12] mb-5 text-white"
                style={{ fontSize: "clamp(1.6rem,3vw,2.1rem)" }}>
                Earn your participation certificate
              </h2>
              <p className="leading-[1.75] mb-4 max-w-[52ch]"
                style={{ fontSize: "0.9875rem", color: "rgba(248,245,239,0.65)" }}>
                Complete all lectures and receive a digital certificate of participation from the Sunita Tandulwadkar Academy of Reproduction — downloadable and shareable immediately on completion.
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
                        <path d="M2 5l2 2 4-4" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[0.9rem]" style={{ color: "rgba(248,245,239,0.72)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <EnrollBtn />
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-full blur-[60px] pointer-events-none"
                style={{ background: `${accent}10` }} />
              <div className="relative rounded-[4px] overflow-hidden"
                style={{ border: `1px solid ${accent}40`, boxShadow: `0 24px 60px -10px rgba(0,0,0,0.12)` }}>
                <div className="h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${accent}50, ${accent}, ${accent}50)` }} />
                <img
                  src="/images/star_certificate_page.webp"
                  alt="STAR Academy Participation Certificate"
                  className="w-full block"
                  style={{ background: "#f8f5ef" }}
                />
              </div>
              <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: accent }} />
              <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: accent }} />
              <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: accent }} />
              <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: accent }} />
            </div>
          </div>
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
                <Link
                  to={hasFullAccess ? "/video" : ENROLL_PATH}
                  className="inline-flex items-center gap-2.5 px-8 py-4 font-mono text-[10.5px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 hover:brightness-110 group"
                  style={{ background: `linear-gradient(180deg, ${accent} 0%, ${accentDark} 100%)`, color: "#fff", border: `1px solid ${accent}` }}>
                  {hasFullAccess ? "Explore Lecture" : "Reserve My Seat"}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
                {!hasFullAccess && (
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: accent }}>
                    Limited Seats
                  </span>
                )}
              </div>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "#6b7280" }}>
                Interactive Q&amp;A Included · Certificate on Completion
              </p>
            </div>

            {/* Stats panel */}
            <div className="grid grid-cols-2" style={{ border: `1px solid ${accent}` }}>
              {[
                { n: String(totalLectures), label: "Lectures" },
                { n: "Live", label: "on Zoom" },
                { n: "1", label: "Certificate" },
                { n: "Q&A", label: "Included" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-3 text-center"
                  style={{
                    borderRight: i % 2 === 0 ? `1px solid ${accent}` : "none",
                    borderBottom: i < 2 ? `1px solid ${accent}` : "none",
                    background: i % 2 !== 0 ? `${accent}08` : "#ffffff",
                  }}>
                  <span className="font-display font-semibold leading-none mb-1.5 bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)] bg-clip-text text-transparent"
                    style={{ fontSize: "clamp(1.4rem,2.2vw,1.9rem)" }}>
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
