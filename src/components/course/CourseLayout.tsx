import { Link, useNavigate } from "react-router-dom";
import { THEMES, type CourseAction, type CourseConfig } from "./types";

function accentVars(accentHex: string): React.CSSProperties {
  const a = (decimal: number) =>
    accentHex +
    Math.round(decimal * 255)
      .toString(16)
      .padStart(2, "0");
  return {
    ["--accent" as never]: accentHex,
    ["--accent-04" as never]: a(0.04),
    ["--accent-08" as never]: a(0.08),
    ["--accent-10" as never]: a(0.1),
    ["--accent-12" as never]: a(0.12),
    ["--accent-15" as never]: a(0.15),
    ["--accent-20" as never]: a(0.2),
    ["--accent-25" as never]: a(0.25),
    ["--accent-30" as never]: a(0.3),
    ["--accent-35" as never]: a(0.35),
    ["--accent-40" as never]: a(0.4),
    ["--accent-55" as never]: a(0.55),
  };
}

function ActionButton({
  action,
  className,
  style,
  children,
}: {
  action: CourseAction;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  if (action.type === "anchor") {
    const external = action.target.startsWith("http");
    return (
      <a
        href={action.target}
        className={className}
        style={style}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={() => navigate(action.target)} className={className} style={style}>
      {children}
    </button>
  );
}

export default function CourseLayout({ course }: { course: CourseConfig }) {
  const theme = THEMES[course.accent];
  const eyebrowCls = `font-mono text-[12px] font-medium tracking-[0.28em] uppercase ${theme.textAccent}`;
  const accentStyle = accentVars(theme.accentHex);

  return (
    <div style={accentStyle}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="-mt-20 relative min-h-screen flex flex-col justify-center" style={{ background: theme.darkBg }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-cover bg-center opacity-[0.10]" style={{ backgroundImage: `url(/images/${course.title}.webp)` }} />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[var(--accent-10)] blur-[130px]" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, ${theme.darkBg}4d, ${theme.darkBg})` }} />
        </div>

        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 pt-28 pb-12 w-full">
          <div className="flex items-center gap-2 mb-5">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30">STAR Curriculum</span>
            <span className="text-white/20 text-xs">/</span>
            <span className={`font-mono text-[10px] tracking-[0.22em] uppercase ${theme.textAccent} opacity-80`}>{course.tierLabel}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_3fr] gap-8 lg:gap-12 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-[var(--accent-25)] bg-[var(--accent-10)] px-3 py-1.5 rounded-full mb-4">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.bgAccent} animate-pulse`} />
                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${theme.textAccent}`}>{course.statusLabel}</span>
              </div>

              <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.02em] text-white mb-4" style={{ fontSize: "clamp(38px,4.8vw,62px)" }}>
                {course.title}
                {course.titleSuffix && (
                  <>
                    <br />
                    <span className={theme.textAccent}>{course.titleSuffix}</span>
                  </>
                )}
              </h1>

              <h2 className="font-display text-2xl pb-2 italic leading-[1.55] text-white">{course.subtitle}</h2>
              <p className="text-[14px] text-white/55 leading-[1.65] mb-5">{course.description}</p>

              {/* Mobile-only video — sits between description and badges */}
              <div className="lg:hidden mb-5 relative rounded-[3px] overflow-hidden border border-[var(--accent-20)]"
                style={{ boxShadow: `0 0 60px ${theme.accentHex}1c` }}>
                <div className="h-[2px] bg-gradient-to-r from-[var(--accent-15)] via-[var(--accent)] to-[var(--accent-15)]" />
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${course.videoId}?rel=0&modestbranding=1&color=white`}
                    title={`Dr. Sunita Tandulwadkar — ${course.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                <div className="px-4 py-2 flex items-center justify-between border-t border-[var(--accent-10)]" style={{ background: theme.videoFrameBg }}>
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/30">Dr. Sunita Tandulwadkar</span>
                  <span className={`font-mono text-[9px] tracking-[0.18em] uppercase ${theme.textAccent} opacity-40`}>STAR Academy</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {course.badges.map((t) => (
                  <span key={t} className="font-mono text-[10.2px] tracking-[0.18em] uppercase text-white/40 border border-white/30 px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>

              <ActionButton
                action={course.primaryCta}
                className={`group items-center gap-2.5 ${theme.bgAccent} hover:brightness-110 active:brightness-95 text-white px-6 py-3 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-all duration-200 rounded-[3px] shadow-[0_4px_16px_-4px_var(--accent-40)] hover:shadow-[0_8px_24px_-4px_var(--accent-55)] hover:cursor-pointer lg:inline-flex hidden`}
              >
                {course.primaryCta.label}
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-150">→</span>
              </ActionButton>
              {/* Mobile CTA — below the badges */}
              <ActionButton
                action={course.primaryCta}
                className={`lg:hidden w-full flex items-center justify-center gap-2.5 ${theme.bgAccent} hover:brightness-110 active:brightness-95 text-white py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-all duration-200 rounded-[3px] group shadow-[0_4px_16px_-4px_var(--accent-40)]`}
              >
                {course.primaryCta.label}
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-150">→</span>
              </ActionButton>
            </div>

            <div className="hidden lg:block min-w-0">
              <div className="relative">
                <div className="absolute -inset-6 bg-[var(--accent-08)] blur-[60px] rounded-full pointer-events-none" />

                <div className="absolute -top-[14px] left-5 z-10 flex items-center gap-1.5 border border-[var(--accent-30)] px-3 py-[5px]" style={{ background: theme.videoStripBg }}>
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.bgAccent} animate-pulse`} />
                  <span className={`font-mono text-[9px] tracking-[0.2em] uppercase ${theme.textAccent} opacity-80`}>{course.videoBadgeLabel}</span>
                </div>

                <div
                  className="relative rounded-[3px] overflow-hidden border border-[var(--accent-20)]"
                  style={{ boxShadow: `0 0 0 1px ${theme.accentHex}11, 0 0 60px ${theme.accentHex}1c, 0 32px 64px -12px rgba(0,0,0,0.75)` }}
                >
                  <div className="h-[2px] bg-gradient-to-r from-[var(--accent-15)] via-[var(--accent)] to-[var(--accent-15)]" />

                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${course.videoId}?rel=0&modestbranding=1&color=white`}
                      title={`Dr. Sunita Tandulwadkar — ${course.title} Series Introduction`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>

                  <div className="px-4 py-2.5 flex items-center justify-between border-t border-[var(--accent-10)]" style={{ background: theme.videoFrameBg }}>
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/30">Dr. Sunita Tandulwadkar</span>
                    <span className={`font-mono text-[9px] tracking-[0.18em] uppercase ${theme.textAccent} opacity-40`}>STAR Academy</span>
                  </div>
                </div>

                <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[var(--accent-55)] pointer-events-none" />
                <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[var(--accent-55)] pointer-events-none" />
                <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[var(--accent-55)] pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[var(--accent-55)] pointer-events-none" />
              </div>

              <ActionButton
                action={course.primaryCta}
                className={`lg:hidden mt-5 w-full flex items-center justify-center gap-2.5 ${theme.bgAccent} hover:brightness-110 active:brightness-95 text-white py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase transition-all duration-200 rounded-[3px] group shadow-[0_4px_16px_-4px_var(--accent-40)]`}
              >
                {course.primaryCta.label}
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-150">→</span>
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── LECTURE CARDS ────────────────────────────────────── */}
      <section className="pt-14 pb-10" style={{ background: theme.lightBg }}>
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="text-center max-w-[520px] mx-auto mb-10">
            <span className={`${eyebrowCls} block mb-3`}>{course.lectureEyebrow}</span>
            <h2 className="font-display font-medium text-[clamp(20px,2vw,38px)] leading-[1.12] text-navy">{course.lectureTitle}</h2>
            <p className="mt-2.5 text-[14px] text-slate">{course.lectureNote}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {course.lectures.map((l, i) => {
              const isLastOdd = course.lectures.length % 2 !== 0 && i === course.lectures.length - 1;
              return (
              <div
                key={l.id}
                id={l.id}
                className={`group relative flex flex-col overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.22)]${isLastOdd ? " sm:col-span-2 sm:max-w-[calc(50%-12px)] sm:mx-auto sm:w-full" : ""}`}
                style={{
                  background: theme.darkBg,
                  border: `1px solid ${theme.cardBorder}`,
                  borderRadius: "6px",
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 inset-x-0 h-[3px] z-[2]"
                  style={{ background: `linear-gradient(90deg, ${theme.accentHex}80, ${theme.accentHex}, ${theme.accentHex}80)` }}
                />

                {/* Image */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "230px", background: theme.darkBg }}
                >
                  <img
                    src={l.thumb}
                    alt={l.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 scale-[1.04] group-hover:scale-100 group-hover:opacity-75 transition-all duration-600"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${theme.darkBg}e6 0%, ${theme.darkBg}55 50%, ${theme.darkBg}22 100%)` }}
                  />

                  {/* Duration bottom-left */}
                  <div className="absolute bottom-3.5 left-4 z-[1]">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/50">{l.duration}</span>
                  </div>

                  {/* Large number — decorative bottom-right */}
                  <div
                    className="absolute bottom-1 right-4 font-display font-bold text-[56px] leading-none select-none z-[1] pointer-events-none"
                    style={{ color: `${theme.accentHex}22` }}
                  >
                    {l.no}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
                  <span
                    className="font-mono text-[9.5px] font-medium tracking-[0.2em] uppercase mb-3 block"
                    style={{ color: theme.accentHex }}
                  >
                    {l.label}
                  </span>

                  <h3 className="font-display font-semibold text-[clamp(18px,1.8vw,2px)] leading-[1.25] text-white mb-2.5">
                    {l.title}
                  </h3>

                  <p className="text-[13px] leading-[1.7] text-white/50 flex-grow mb-5">
                    {l.body}
                  </p>

                  {/* Footer: Enroll + Explore Now */}
                  <div
                    className="flex items-center gap-2 pt-4 border-t"
                    style={{ borderColor: `${theme.accentHex}25` }}
                  >
                    <ActionButton
                      action={course.primaryCta}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 font-bold text-[11px] tracking-[0.16em] uppercase text-white transition-all duration-200 hover:brightness-110"
                      style={{ background: theme.accentHex } as React.CSSProperties}
                    >
                      Enroll
                    </ActionButton>
                    {l.detailPath && (
                      <Link
                        to={l.detailPath}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 font-bold text-[11px] tracking-[0.16em] uppercase border transition-colors duration-200 hover:opacity-80"
                        style={{ color: theme.accentHex, borderColor: `${theme.accentHex}50` }}
                      >
                        Explore Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Ribbon */}
          <a
            href="#register"
            className="group relative mt-6 block overflow-hidden rounded-[18px] border transition-all duration-300"
            style={{
              borderColor: `${theme.accentHex}55`,
              background: `linear-gradient(135deg, ${theme.darkBg} 0%, ${theme.videoStripBg} 45%, ${theme.videoFrameBg} 100%)`,
            }}
          >
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at top right, ${theme.accentHex}33, transparent 40%)` }} />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 px-5 py-5 sm:px-6 sm:py-6">
              <div className="min-w-0">
                <div className={`inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] ${theme.textAccent}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${theme.bgAccent}`} />
                  {course.ribbon.eyebrow}
                </div>

                <h3 className="mt-3 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.05] text-[#f5f1e8]">
                  {course.ribbon.headline}
                  <span className={`block ${theme.textAccent} mt-1`}>{course.ribbon.headlineAccent}</span>
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-[0.14em] text-white/40">
                  {course.ribbon.meta.map((m, i) => (
                    <span key={m} className="flex items-center gap-3">
                      {i > 0 && <span className="hidden sm:block h-1 w-1 rounded-full bg-white/20" />}
                      <span>{m}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden md:block text-right">
                  <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/40">{course.ribbon.rightLabel}</div>
                  <div className="mt-1 text-[13px] text-white/75">{course.ribbon.rightSub}</div>
                </div>

                <div
                  className="inline-flex items-center gap-3 rounded-full border px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white transition-all duration-200"
                  style={{ borderColor: `${theme.accentHex}80`, background: `${theme.accentHex}25` }}
                >
                  {course.ribbon.cta}
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-1" style={{ background: `${theme.accentHex}40` }}>
                    →
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── PROGRESSION ARGUMENT (optional) ─────────────────── */}
      {course.progression && (
        <section className="py-8  md:py-10" style={{ background: theme.darkBg }}>
          <div className="max-w-[1180px]  px-5 sm:px-8 md:px-12">
            <div style={{ maxWidth: 880, margin: "0 auto" }}>
              <span className={`${eyebrowCls} block mb-4`}>{course.progression.eyebrow}</span>
              <h2 className="font-display font-medium text-white leading-[1.16] mb-5" style={{ fontSize: "clamp(22px,4vw,34px)", maxWidth: "82ch" }}>
                {course.progression.heading}
              </h2>
              {course.progression.paragraphs.map((p, i) => (
                <p key={i} className="text-white/75 leading-[1.72] mb-5 max-w-[84ch]" style={{ fontSize: "1.0625rem" }}>{p}</p>
              ))}
              <p
                className="font-display italic text-[1.2rem] leading-[1.55] mt-8 pt-6 max-w-[84ch]"
                style={{ color: `${theme.accentHex}cc`, borderTop: `1px solid ${theme.accentHex}25` }}
              >
                {course.progression.closingQuote}
              </p>
            </div>
          </div>
        </section>
      )}

    

      {/* ── FULL CURRICULUM + ASIDE ────────────────────────── */}
      <section className="pt-16 pb-24" style={{ background: theme.lightBg }}>
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-16 items-start">
            <div>
              <span className={`${eyebrowCls} block mb-3`}>Full Curriculum</span>
              <h3 className="font-display font-medium text-[clamp(22px,2.5vw,32px)] text-navy mb-1.5 leading-[1.18]">{course.curriculumHeadline}</h3>
              <p className={`font-display italic text-[15px] ${theme.textAccent} mb-8`}>{course.curriculumSubhead}</p>

              <div>
                {course.fullCurriculum.map((l) => (
                  <div key={l.num} className="grid grid-cols-[48px_1fr] gap-4 py-5 border-b last:border-0" style={{ borderColor: theme.cardBorder }}>
                    <div className="font-display font-bold text-[34px] leading-none pt-1 select-none bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)] bg-clip-text text-transparent">{l.num}</div>
                    <div>
                      <h4 className="font-display font-medium text-[19px] text-navy mb-1.5 leading-[1.25]">{l.title}</h4>
                      <p className="text-[13.5px] leading-[1.65] text-slate">{l.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {course.curriculumFootnote && (
                <p className={`mt-7 px-5 py-4 border-l-2 ${theme.borderAccent} font-display italic text-[14px] leading-[1.6] text-slate`} style={{ background: `${theme.accentHex}14` }}>
                  {course.curriculumFootnote}
                </p>
              )}
            </div>

            <aside className="lg:sticky lg:top-[100px] h-fit">
              <div className="bg-white border rounded-[5px] overflow-hidden" style={{ borderColor: theme.cardBorder, boxShadow: `0 4px 24px -6px ${theme.accentHex}30` }}>
                <div className="h-[3px] bg-gradient-to-r from-[var(--accent-30)] via-[var(--accent)] to-[var(--accent-30)]" />
                <div className="p-7">
                  <span className={`${eyebrowCls} block mb-2.5`}>{course.asideEyebrow}</span>
                  <h3 className="font-display font-medium text-[23px] text-navy mb-2.5 leading-[1.22]">{course.asideTitle}</h3>
                  <p className="text-[13px] leading-[1.65] text-slate mb-5">{course.asideDescription}</p>

                  <div className="border border-[var(--accent-40)] rounded-[3px] px-4 py-3 mb-5" style={{ background: theme.softAccent }}>
                    <div className="font-display font-semibold text-[28px] text-navy leading-none mb-0.5">{course.asidePrice}</div>
                    <div className="font-mono text-[11px] py-2 tracking-wide">{course.asidePriceSub}</div>
                  </div>

                  <ActionButton
                    action={course.asidePrimaryCta}
                    className={`w-full flex items-center justify-center gap-2 ${theme.bgAccent} hover:brightness-110 active:brightness-95 text-white py-3 font-body font-semibold text-[13px] tracking-[0.03em] transition-all duration-200 group mb-2.5 rounded-[3px]`}
                  >
                    {course.asidePrimaryCta.label}
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </ActionButton>

                  <ActionButton
                    action={course.asideSecondaryCta}
                    className={`w-full flex items-center justify-center ${theme.textAccent} border border-[var(--accent-35)] py-3 font-body font-medium text-[13px] transition-all duration-200 rounded-[3px]`}
                  >
                    {course.asideSecondaryCta.label}
                  </ActionButton>

                  <ul className="mt-5 pt-5 border-t space-y-2.5" style={{ borderColor: theme.cardDivider }}>
                    {course.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[13px] text-soft-black">
                        <span className="w-[18px] h-[18px] rounded-full bg-[var(--accent-10)] border border-[var(--accent-25)] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 10 10" width="10" height="10">
                            <path d="M2 5l2 2 4-4" stroke={theme.accentHex} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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

      {/* ── PATHWAY (optional) ───────────────────────────────── */}
      {course.pathway && (() => {
        const TIER_HEX: Record<string, string> = {
          foundation: "#21864E",
          core:        "#D4A621",
          advanced:    "#1E5AA6",
          masterclass: "#C8102E",
        };
        const TIER_ORDER = ["foundation", "core", "advanced", "masterclass"];
        const activeIdx = TIER_ORDER.indexOf(course.slug);
        return (
          <section className="pb-10 " style={{ background: theme.lightBg }}>
            <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">

              {/* Header */}
              <div className="text-center mb-12">
                <span className={`${eyebrowCls} block mb-3`}>{course.pathway.eyebrow}</span>
                <h2 className="font-display font-medium text-navy leading-[1.16] mx-auto"
                    style={{ fontSize: "clamp(22px,3vw,32px)", maxWidth: "46ch" }}>
                  {course.pathway.title}
                </h2>
              </div>

              {/* Step strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 max-w-[1040px] mx-auto mb-10">
                {course.pathway.steps.map((step, i) => {
                  const color     = TIER_HEX[step.tier] ?? "#9ca3af";
                  const isActive  = i === activeIdx;
                  const isDone    = i < activeIdx;   // prerequisite already completed
                  const isFuture  = i > activeIdx;   // not yet open

                  // Border: active & done = tier colour; future = light gray
                  const borderColor = isFuture ? "#d1d5db" : color;
                  // Dot: active = solid tier; done = lighter tier; future = white with gray border
                  const dotBg      = isActive ? color : isDone ? color : "#e9eaeb";
                  const dotBorder  = isActive ? color : isDone ? color         : "#c8cacb";
                  // Label (tier name)
                  const labelColor = isActive ? color : isDone ? color         : "#6b7280";
                  // Description
                  const descColor  = isActive ? "#111827" : isDone ? "#374151" : "#6b7280";
                  // Status
                  const statusColor = isActive ? color : isDone ? `${color}bb` : "#9ca3af";

                  return (
                    <div
                      key={step.label}
                      className="relative text-center px-4 py-7"
                      style={{ borderTop: `3px solid ${borderColor}` }}
                    >
                      {/* Node dot */}
                      <div
                        className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full"
                        style={{
                          background: dotBg,
                          border: `2px solid ${dotBorder}`,
                          boxShadow: isActive ? `0 0 0 5px ${color}25` : "none",
                        }}
                      />

                      {/* Tier name */}
                      <p className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase mb-3"
                         style={{ color: labelColor }}>
                        {step.label}
                      </p>

                      {/* Description */}
                      <p className="font-display text-[1.1rem] leading-[1.3] mb-3"
                         style={{ color: descColor }}>
                        {step.desc}
                      </p>

                      {/* Status */}
                      <p className="font-mono text-[9px] tracking-[0.18em] uppercase"
                         style={{ color: statusColor }}>
                        {step.status}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Body */}
              <p className="text-center text-[1.0rem] leading-[1.72] text-slate max-w-[70ch] mx-auto">
                {course.pathway.body}
              </p>
            </div>
          </section>
        );
      })()}


  

      {/* ── WHY QUOTE (optional) ─────────────────────────────── */}
      {course.whyQuote && (
        <section className="py-10 md:py-14 bg-gray-300">
          <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12 text-center">
            <div className="w-14 h-px mx-auto mb-4" style={{ background: "#c5a46d" }} />
            <p className="font-display italic leading-[1.55] text-navy" style={{ fontSize: "clamp(0.15rem,1.85vw,1.3rem)" }}>
              {course.whyQuote}
            </p>
            <div className="w-14 h-px mx-auto mt-4" style={{ background: "#c5a46d" }} />
          </div>
        </section>
      )}

      {/* ── REGISTER ─────────────────────────────────────────── */}
      <section id="register" className="pt-10 pb-10" style={{ background: theme.darkBg }}>
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-center">
            <div className="lg:pt-2">
              <span className={`font-mono text-[12px] tracking-[0.26em] uppercase ${theme.textAccent} block mb-3`}>{course.registerEyebrow}</span>
              <h2 className="font-display font-medium text-white leading-[1.15] mb-4" style={{ fontSize: "clamp(24px,3vw,38px)" }}>
                {course.registerTitle}
              </h2>
              <p className="text-[14px] text-white/45 leading-[1.7] mb-8 max-w-[48ch]">{course.registerDescription}</p>
              <div className="space-y-3">
                {course.registerItems.map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-[16px]">{item.icon}</span>
                    <span className="text-[13px] text-white/50">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[var(--accent-10)]">
                <p className={`font-mono text-[9px] tracking-[0.22em] uppercase ${theme.textAccent} opacity-50 mb-2`}>{course.registerStartsLabel}</p>
                <p className="font-display text-[22px] text-white/80">{course.registerStartsValue}</p>
              </div>
            </div>

            <div
              className="border border-[var(--accent-20)] rounded-[4px] overflow-hidden"
              style={{ background: theme.registerPanelBg, boxShadow: `0 0 0 1px ${theme.accentHex}0d, 0 24px 60px -10px rgba(0,0,0,0.5)` }}
            >
              <div className="h-[2px] bg-gradient-to-r from-[var(--accent-15)] via-[var(--accent)] to-[var(--accent-15)]" />
              <div className="p-6 sm:p-8">
                <span className={`font-mono text-[11px] tracking-[0.26em] uppercase ${theme.textAccent} block text-center mb-1.5`}>{course.panelEyebrow}</span>
                <h3 className="font-display text-white text-center text-[24px] leading-tight mb-1">{course.panelTitle}</h3>
                <p className="text-center text-[13px] text-white/55 leading-[1.6] mb-6">{course.panelDescription}</p>

                <ActionButton
                  action={course.panelCta}
                  className={`w-full inline-flex items-center justify-center gap-2 ${theme.bgAccent} hover:brightness-110 active:brightness-95 text-white py-3.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] uppercase rounded-[3px] transition-all duration-200 group`}
                >
                  {course.panelCta.label}
                  <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-150">→</span>
                </ActionButton>

                <p className="mt-4 text-center font-mono text-[9px] tracking-[0.22em] uppercase text-white/35">Replies within 1 working day</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
