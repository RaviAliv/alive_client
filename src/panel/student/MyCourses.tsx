import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { apiGet } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { COURSE_LECTURES } from "../shared/lectureConfig";

type Access = {
  course: string;
  grantedAt: string;
  expiresAt: string | null;
  grantAllLectures: boolean;
  lectures: string[];
};

const COURSE_META: Record<string, {
  label: string; tier: string; tierNum: string; desc: string; color: string;
  enrollPath: string; lightBg: string;
}> = {
  foundation: {
    label: "Foundation Series", tier: "Tier I", tierNum: "01",
    desc: "Endocrinology and physiology of reproductive medicine",
    color: "#21864E", lightBg: "#EDFBF3", enrollPath: "/course/foundation",
  },
  core: {
    label: "Core Series", tier: "Tier II", tierNum: "02",
    desc: "In-depth clinical training and laboratory techniques",
    color: "#D4A621", lightBg: "#FEF9EC", enrollPath: "/course/core",
  },
  advanced: {
    label: "Advanced Series", tier: "Tier III", tierNum: "03",
    desc: "Advanced practice and complex case management",
    color: "#1E5AA6", lightBg: "#EEF3FB", enrollPath: "/course/advanced",
  },
  masterclass: {
    label: "Masterclass Series", tier: "Tier IV", tierNum: "04",
    desc: "Expert-level mastery and cutting-edge research",
    color: "#C8102E", lightBg: "#FEF0F0", enrollPath: "/course/masterclass",
  },
};

const COURSES_ORDER = ["foundation", "core", "advanced", "masterclass"] as const;
const TOTAL_DAYS  = 28;
const MAX_VISIBLE = 6;

const daysUntil   = (d: Date) => Math.max(0, Math.ceil((d.getTime() - Date.now()) / 86_400_000));
const percentLeft = (grantedAt: string, expiresAt: Date) => {
  const start = new Date(grantedAt).getTime();
  const end   = expiresAt.getTime();
  return Math.min(100, Math.max(0, ((end - Date.now()) / (end - start)) * 100));
};
const urgencyColor = (base: string, days: number | null) =>
  days === null ? base : days <= 5 ? "#ef4444" : days <= 10 ? "#f59e0b" : base;

// ── Icon components ─────────────────────────────────────────────────────────
const IcoLock = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-12V7a4 4 0 10-8 0v4h8z" />
  </svg>
);
const IcoPlay = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);
const IcoChevron = ({ up }: { up: boolean }) => (
  <svg className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${up ? "rotate-180" : ""}`}
    fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function MyCourses() {
  const { user } = useAuth();
  const [courses,   setCourses]   = useState<Access[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [expanded,  setExpanded]  = useState<Record<string, boolean>>({});

  if (user?.systemRole === "superadmin") return <Navigate to="/panel/super" replace />;
  if (user?.systemRole === "admin")      return <Navigate to="/panel/admin" replace />;

  useEffect(() => {
    apiGet<{ courses: Access[] }>("/admin/my-access")
      .then((d) => setCourses(d.courses))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const now         = new Date();
  const activeCount = courses.filter((a) => !a.expiresAt || new Date(a.expiresAt) > now).length;

  return (
    <div>
      {/* Page header */}
      <div className="mb-7">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Student Panel</p>
        <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>
        {!loading && !error && (
          <p className="text-sm text-slate-400 mt-1">
            {activeCount > 0
              ? `${activeCount} active · access window is ${TOTAL_DAYS} days per course`
              : "Enroll in a course below to get started"}
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-red-700 text-sm">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl items-start">
          {COURSES_ORDER.map((courseKey) => {
            const meta       = COURSE_META[courseKey];
            const access     = courses.find((a) => a.course === courseKey);
            const expiresAt  = access?.expiresAt ? new Date(access.expiresAt) : null;
            const isActive   = !!access && (!expiresAt || expiresAt > now);
            const isExpired  = !!access && !!expiresAt && expiresAt <= now;
            const daysLeft   = isActive && expiresAt ? daysUntil(expiresAt) : null;
            const pct        = isActive && expiresAt && access.grantedAt
              ? percentLeft(access.grantedAt, expiresAt) : 0;
            const barColor   = urgencyColor(meta.color, daysLeft);
            const lectures   = COURSE_LECTURES[courseKey] ?? [];
            const isExpanded = !!expanded[courseKey];

            const lectureUnlocked = (lec: string) =>
              isActive && (access!.grantAllLectures !== false || access!.lectures.includes(lec));

            const visibleLecs  = isExpanded ? lectures : lectures.slice(0, MAX_VISIBLE);
            const hiddenCount  = lectures.length - MAX_VISIBLE;
            const hasMore      = hiddenCount > 0;

            return (
              <div key={courseKey}
                className={`rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${
                  isActive   ? "border-slate-200 bg-white" :
                  isExpired  ? "border-red-100 bg-white" :
                               "border-slate-200 bg-white"
                }`}>

                {/* ── Coloured header band ── */}
                <div className="relative px-5 pt-5 pb-4 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${meta.color}18 0%, ${meta.color}08 100%)` }}>
                  {/* Tier watermark */}
                  <span className="absolute right-4 top-3 text-[52px] font-black leading-none select-none pointer-events-none"
                    style={{ color: meta.color + "12" }}>
                    {meta.tierNum}
                  </span>

                  <div className="flex items-start justify-between gap-3 relative">
                    <div className="min-w-0">
                      {/* Tier pill */}
                      <span className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full mb-2"
                        style={{ background: meta.color + "20", color: meta.color }}>
                        {meta.tier}
                      </span>
                      <h3 className="font-bold text-slate-800 text-[15px] leading-snug">{meta.label}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{meta.desc}</p>
                    </div>

                    {/* Status badge */}
                    {isActive && daysLeft !== null && (
                      <div className="shrink-0 text-right">
                        <div className="text-[22px] font-black leading-none" style={{ color: barColor }}>
                          {daysLeft}
                        </div>
                        <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">days left</div>
                      </div>
                    )}
                    {isActive && !expiresAt && (
                      <span className="shrink-0 text-[9px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide"
                        style={{ background: meta.lightBg, color: meta.color, borderColor: meta.color + "30" }}>
                        Lifetime
                      </span>
                    )}
                    {isExpired && (
                      <span className="shrink-0 text-[9px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-500 border border-red-200 uppercase tracking-wide">
                        Expired
                      </span>
                    )}
                    {!access && (
                      <span className="shrink-0 text-[9px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-400 uppercase tracking-wide">
                        Not Enrolled
                      </span>
                    )}
                  </div>

                  {/* Expiry progress bar */}
                  {isActive && expiresAt && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-slate-500 font-medium">
                          {expiresAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        {daysLeft !== null && daysLeft <= 7 && (
                          <span className="text-[9px] font-bold" style={{ color: barColor }}>
                            {daysLeft <= 2 ? "Expiring very soon!" : "Expiring soon"}
                          </span>
                        )}
                      </div>
                      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: meta.color + "20" }}>
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: barColor }} />
                      </div>
                    </div>
                  )}

                  {/* Expired notice */}
                  {isExpired && (
                    <p className="mt-2 text-[10.5px] text-red-500 font-medium">
                      Expired {expiresAt!.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>

                {/* ── Thin accent line ── */}
                <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${meta.color}60, transparent)` }} />

                {/* ── Lecture list ── */}
                <div className="flex-1 flex flex-col">
                  <div className="divide-y divide-slate-50">
                    {visibleLecs.map((lec, idx) => {
                      const unlocked = lectureUnlocked(lec);
                      return (
                        <div key={lec}
                          className={`flex items-center gap-3 px-4 py-2.5 group transition-colors ${
                            unlocked
                              ? "hover:bg-slate-50/70"
                              : "opacity-60 bg-slate-50/30"
                          }`}>
                          {/* Number */}
                          <span className="text-[10px] font-bold tabular-nums shrink-0"
                            style={{ color: unlocked ? meta.color : "#94a3b8" }}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>

                          {/* Left icon */}
                          <span style={{ color: unlocked ? meta.color : "#94a3b8" }}>
                            {unlocked ? <IcoPlay /> : <IcoLock />}
                          </span>

                          {/* Lecture name */}
                          <span className={`text-[11.5px] flex-1 truncate leading-snug ${
                            unlocked ? "text-slate-700 font-medium" : "text-slate-400"
                          }`}>
                            {lec}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* +N more / Show less toggle */}
                  {hasMore && (
                    <button
                      onClick={() => toggleExpand(courseKey)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border-t border-slate-100 text-[11.5px] font-semibold transition-all hover:bg-slate-50 group"
                      style={{ color: meta.color }}>
                      <IcoChevron up={isExpanded} />
                      {isExpanded
                        ? "Show less"
                        : `+${hiddenCount} more lecture${hiddenCount !== 1 ? "s" : ""}`}
                    </button>
                  )}
                </div>

                {/* ── CTA button ── */}
                <div className="px-4 pb-4 pt-3 border-t border-slate-100 mt-auto">
                  {isActive && (
                    <Link to="/video"
                      className="w-full flex items-center justify-center gap-2 text-[13px] font-bold py-2.5 rounded-xl text-white transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
                      style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                      Watch Lectures
                    </Link>
                  )}
                  {isExpired && (
                    <Link to={meta.enrollPath}
                      className="w-full flex items-center justify-center gap-2 text-[13px] font-bold py-2.5 rounded-xl text-white transition-all hover:opacity-90 hover:shadow-md"
                      style={{ background: "linear-gradient(135deg,#1E2A44,#263354)" }}>
                      Renew Access →
                    </Link>
                  )}
                  {!access && (
                    <Link to={meta.enrollPath}
                      className="w-full flex items-center justify-center gap-2 text-[13px] font-bold py-2.5 rounded-xl transition-all hover:shadow-sm active:scale-[0.98] border-2"
                      style={{
                        color: meta.color,
                        borderColor: meta.color + "50",
                        background: meta.lightBg,
                      }}>
                      Enroll Now →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
