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
  lectureIds: string[];
};

type Payment = {
  _id: string;
  orderId: string;
  paymentId?: string;
  fullName: string;
  email: string;
  lectureIds: string[];
  amount: number;
  status: string;
  createdAt: string;
};

// Short IDs for foundation course (index matches COURSE_LECTURES["foundation"])
const FOUNDATION_IDS = ["l01", "l02", "l03", "l04", "l05", "l06"];

const LECTURE_LABEL: Record<string, string> = {
  l01: "HPO Axis: From Physiology to Precision",
  l02: "The Endocrine Architecture of Follicular Phase — From Endocrinology to Survival of the Fittest Follicle",
  l03: "Ovulation: From Follicle Destiny to Follicle Rupture — The 350-Day Symphony",
  l04: "Luteal Phase: Physiology, Endocrinology and Clinical Importance",
  l05: "Spermatogenesis: From Germ Cell Development to Semen Analysis, Genetics to Clinical Terminologies",
  l06: "Implantation: From Endometrial Receptivity to Endometrium–Embryo Dialogue",
};

const COURSE_META: Record<string, {
  label: string; tier: string; tierNum: string; desc: string; color: string;
  enrollPath: string; lightBg: string;
}> = {
  foundation: {
    label: "Foundation Series", tier: "Tier I", tierNum: "01",
    desc: "Endocrinology and physiology of reproductive medicine",
    color: "#21864E", lightBg: "#EDFBF3", enrollPath: "/course/foundation/enroll",
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

// Lecture ID → availability mapping per course (for ID-based access check)
const COURSE_LECTURE_IDS: Record<string, string[]> = {
  foundation: FOUNDATION_IDS,
};

const COURSES_ORDER = ["foundation", "core", "advanced", "masterclass"] as const;
const TOTAL_DAYS = 28;
const MAX_VISIBLE = 6;

const daysUntil = (d: Date) => Math.max(0, Math.ceil((d.getTime() - Date.now()) / 86_400_000));
const percentLeft = (grantedAt: string, expiresAt: Date) => {
  const start = new Date(grantedAt).getTime();
  const end = expiresAt.getTime();
  return Math.min(100, Math.max(0, ((end - Date.now()) / (end - start)) * 100));
};
const urgencyColor = (base: string, days: number | null) =>
  days === null ? base : days <= 5 ? "#ef4444" : days <= 10 ? "#f59e0b" : base;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

// ── Icons ────────────────────────────────────────────────────────────────────
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
const IcoClock = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IcoChevron = ({ up }: { up: boolean }) => (
  <svg className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${up ? "rotate-180" : ""}`}
    fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const IcoReceipt = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);
const IcoExtLink = () => (
  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function MyCourses() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"courses" | "payments">("courses");
  const [courses, setCourses] = useState<Access[]>([]);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    Promise.all([
      apiGet<{ courses: Access[] }>("/admin/my-access"),
      apiGet<{ availability: Record<string, string[]> }>("/admin/r2-availability").catch(() => ({ availability: {} })),
      apiGet<{ payments: Payment[] }>("/payment/my-payments").catch(() => ({ payments: [] })),
    ])
      .then(([a, r, p]) => {
        setCourses(a.courses);
        setAvailability(r.availability ?? {});
        setPayments(p.payments ?? []);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (user?.systemRole === "superadmin") return <Navigate to="/panel/super" replace />;
  if (user?.systemRole === "admin") return <Navigate to="/panel/admin" replace />;

  const toggleExpand = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const now = new Date();
  const activeCount = courses.filter((a) => !a.expiresAt || new Date(a.expiresAt) > now).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Student Panel</p>
        <h1 className="text-2xl font-bold text-slate-800">My Learning</h1>
        {!loading && !error && (
          <p className="text-sm text-slate-400 mt-1">
            {activeCount > 0
              ? `${activeCount} active course${activeCount > 1 ? "s" : ""} · access window is ${TOTAL_DAYS} days`
              : "No active courses yet"}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        <button onClick={() => setTab("courses")}
          className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${
            tab === "courses" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}>
          My Courses
        </button>
        <button onClick={() => setTab("payments")}
          className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-1.5 ${
            tab === "payments" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}>
          Payment History
          {payments.length > 0 && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              tab === "payments" ? "bg-[#21864E] text-white" : "bg-slate-300 text-slate-600"
            }`}>
              {payments.length}
            </span>
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-red-700 text-sm">{error}</div>
      ) : tab === "courses" ? (
        <CoursesTab
          courses={courses}
          availability={availability}
          expanded={expanded}
          toggleExpand={toggleExpand}
          now={now}
        />
      ) : (
        <PaymentsTab payments={payments} />
      )}
    </div>
  );
}

// ── Courses Tab ───────────────────────────────────────────────────────────────
function CoursesTab({
  courses, availability, expanded, toggleExpand, now,
}: {
  courses: Access[];
  availability: Record<string, string[]>;
  expanded: Record<string, boolean>;
  toggleExpand: (k: string) => void;
  now: Date;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl items-start">
      {COURSES_ORDER.map((courseKey) => {
        const meta = COURSE_META[courseKey];
        const access = courses.find((a) => a.course === courseKey);
        const expiresAt = access?.expiresAt ? new Date(access.expiresAt) : null;
        const isActive = !!access && (!expiresAt || expiresAt > now);
        const isExpired = !!access && !!expiresAt && expiresAt <= now;
        const daysLeft = isActive && expiresAt ? daysUntil(expiresAt) : null;
        const pct = isActive && expiresAt && access.grantedAt
          ? percentLeft(access.grantedAt, expiresAt) : 0;
        const barColor = urgencyColor(meta.color, daysLeft);
        const lectures = COURSE_LECTURES[courseKey] ?? [];
        const courseIds = COURSE_LECTURE_IDS[courseKey] ?? [];
        const r2Lectures = availability[courseKey] ?? [];
        const courseHasVideos = r2Lectures.length > 0;
        const isExpanded = !!expanded[courseKey];

        const getLectureState = (lec: string, idx: number): "locked" | "coming-soon" | "ready" => {
          if (!isActive) return "locked";
          if (access!.grantAllLectures) {
            // Full access
          } else {
            // Check by lecture name (admin grants) OR by ID (payment grants)
            const lectureId = courseIds[idx];
            const hasById = !!(lectureId && access!.lectureIds.includes(lectureId));
            const hasByName = access!.lectures.includes(lec);
            if (!hasById && !hasByName) return "locked";
          }
          // Has access — check if video is in R2
          const hasVideo = r2Lectures.some(
            (r) => r.trim().toLowerCase() === lec.trim().toLowerCase()
          );
          return hasVideo ? "ready" : "coming-soon";
        };

        const visibleLecs = isExpanded ? lectures : lectures.slice(0, MAX_VISIBLE);
        const hiddenCount = lectures.length - MAX_VISIBLE;
        const hasMore = hiddenCount > 0;

        // Count accessible lectures for this course card
        const readyCount = lectures.filter((lec, idx) => getLectureState(lec, idx) === "ready").length;
        const accessCount = isActive
          ? lectures.filter((lec, idx) => getLectureState(lec, idx) !== "locked").length
          : 0;

        return (
          <div key={courseKey}
            className="rounded-2xl border border-slate-200 bg-white flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">

            {/* Header band */}
            <div className="relative px-5 pt-5 pb-4 overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${meta.color}18 0%, ${meta.color}08 100%)` }}>
              <span className="absolute right-4 top-3 text-[52px] font-black leading-none select-none pointer-events-none"
                style={{ color: meta.color + "12" }}>
                {meta.tierNum}
              </span>

              <div className="flex items-start justify-between gap-3 relative">
                <div className="min-w-0">
                  <span className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full mb-2"
                    style={{ background: meta.color + "20", color: meta.color }}>
                    {meta.tier}
                  </span>
                  <h3 className="font-bold text-slate-800 text-[15px] leading-snug">{meta.label}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{meta.desc}</p>
                  {isActive && (
                    <p className="text-[10px] font-medium mt-1" style={{ color: meta.color }}>
                      {readyCount}/{lectures.length} lecture{lectures.length !== 1 ? "s" : ""} available
                      {accessCount > readyCount && ` · ${accessCount - readyCount} coming soon`}
                    </p>
                  )}
                </div>

                {/* Status badge top-right */}
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
                  <span className={`shrink-0 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                    courseHasVideos
                      ? "bg-amber-50 text-amber-600 border border-amber-200"
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    {courseHasVideos ? "Available" : "Coming Soon"}
                  </span>
                )}
              </div>

              {isExpired && (
                <p className="mt-2 text-[10.5px] text-red-500 font-medium">
                  Expired {expiresAt!.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              )}
            </div>

            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${meta.color}60, transparent)` }} />

            {/* Lecture list */}
            <div className="flex-1 flex flex-col">
              <div className="divide-y divide-slate-100">
                {visibleLecs.map((lec, idx) => {
                  const state = getLectureState(lec, idx);
                  const num = String(idx + 1).padStart(2, "0");
                  // Video exists in R2 regardless of purchase state
                  const hasVideo = r2Lectures.some(
                    (r) => r.trim().toLowerCase() === lec.trim().toLowerCase()
                  );

                  if (state === "ready") {
                    return (
                      <Link key={lec} to="/video"
                        className="flex flex-col px-4 py-3 group transition-colors hover:bg-slate-50"
                        style={{ borderLeft: `3px solid ${meta.color}` }}>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold tabular-nums shrink-0 w-5 text-center"
                            style={{ color: meta.color }}>{num}</span>
                          <span className="shrink-0" style={{ color: meta.color }}><IcoPlay /></span>
                          <span className="text-[12px] flex-1 min-w-0 truncate font-medium text-slate-700 group-hover:text-slate-900">
                            {lec}
                          </span>
                          <span className="shrink-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-white px-2.5 py-1 rounded-lg"
                            style={{ background: meta.color }}>
                            Watch <IcoExtLink />
                          </span>
                        </div>
                        {expiresAt && daysLeft !== null && (
                          <div className="mt-2 ml-8 flex items-center gap-2">
                            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: meta.color + "20" }}>
                              <div className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${pct}%`, background: barColor }} />
                            </div>
                            <span className="text-[9px] font-bold tabular-nums shrink-0" style={{ color: barColor }}>
                              {daysLeft}d left
                            </span>
                          </div>
                        )}
                      </Link>
                    );
                  }

                  if (state === "coming-soon") {
                    return (
                      <div key={lec}
                        className="flex items-center gap-3 px-4 py-3 border-l-[3px] border-amber-300">
                        <span className="text-[10px] font-bold tabular-nums shrink-0 w-5 text-center text-amber-500">{num}</span>
                        <span className="shrink-0 text-amber-400"><IcoClock /></span>
                        <span className="text-[12px] flex-1 min-w-0 truncate text-slate-600 font-medium">{lec}</span>
                        <span className="shrink-0 flex items-center gap-1 text-[9px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg whitespace-nowrap">
                          <IcoClock /> Coming Soon
                        </span>
                      </div>
                    );
                  }

                  // locked — not purchased
                  return (
                    <div key={lec}
                      className="flex items-center gap-3 px-4 py-3 border-l-[3px] border-transparent">
                      <span className="text-[10px] font-bold tabular-nums shrink-0 w-5 text-center text-slate-400">{num}</span>
                      <span className="shrink-0 text-slate-400"><IcoLock /></span>
                      <span className="text-[12px] flex-1 min-w-0 truncate text-slate-500 font-medium">{lec}</span>
                      {!hasVideo && (
                        <span className="shrink-0 flex items-center gap-1 text-[9px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg whitespace-nowrap">
                          <IcoClock /> Coming Soon
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {hasMore && (
                <button onClick={() => toggleExpand(courseKey)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border-t border-slate-100 text-[11.5px] font-semibold transition-all hover:bg-slate-50 group"
                  style={{ color: meta.color }}>
                  <IcoChevron up={isExpanded} />
                  {isExpanded ? "Show less" : `+${hiddenCount} more lecture${hiddenCount !== 1 ? "s" : ""}`}
                </button>
              )}
            </div>

            {/* CTA */}
            <div className="px-4 pb-4 pt-3 border-t border-slate-100 mt-auto">
              {isActive && readyCount > 0 && (
                <Link to="/video"
                  className="w-full flex items-center justify-center gap-2 text-[13px] font-bold py-2.5 rounded-xl text-white transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
                  style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5.14v14l11-7-11-7z" /></svg>
                  Watch {readyCount} Lecture{readyCount !== 1 ? "s" : ""}
                </Link>
              )}
              {isActive && readyCount === 0 && (
                <div className="w-full flex items-center justify-center gap-2 text-[13px] font-medium py-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <IcoClock />
                  Videos uploading — check back soon
                </div>
              )}
              {isExpired && (
                <Link to={meta.enrollPath}
                  className="w-full flex items-center justify-center gap-2 text-[13px] font-bold py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#1E2A44,#263354)" }}>
                  Renew Access →
                </Link>
              )}
              {!access && (
                <Link to={meta.enrollPath}
                  className="w-full flex items-center justify-center gap-2 text-[13px] font-bold py-2.5 rounded-xl transition-all hover:shadow-sm active:scale-[0.98] border-2"
                  style={{ color: meta.color, borderColor: meta.color + "50", background: meta.lightBg }}>
                  {courseHasVideos ? "Enroll Now →" : "Coming Soon"}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Payments Tab ──────────────────────────────────────────────────────────────
function PaymentsTab({ payments }: { payments: Payment[] }) {
  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm max-w-2xl">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <IcoReceipt />
        </div>
        <p className="text-slate-700 font-semibold text-[15px]">No payment history</p>
        <p className="text-slate-400 text-sm mt-1.5">Purchase history and receipts appear here after checkout.</p>
      </div>
    );
  }

  const totalSpent = payments.reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div className="max-w-2xl space-y-4">
      {/* Summary bar */}
      <div className="bg-white rounded-2xl border border-slate-200 px-6 py-5 shadow-sm flex flex-wrap gap-6 items-center justify-between"
        style={{ borderTop: "3px solid #21864E" }}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">Total Spent</p>
          <p className="text-[28px] font-extrabold text-[#21864E] leading-none">
            ₹{totalSpent.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">Orders</p>
            <p className="text-[22px] font-bold text-slate-800 leading-none">{payments.length}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">Lectures</p>
            <p className="text-[22px] font-bold text-slate-800 leading-none">
              {[...new Set(payments.flatMap((p) => p.lectureIds))].length}
            </p>
          </div>
        </div>
      </div>

      {/* Payment cards */}
      {payments.map((p, orderIdx) => {
        const isBundle = p.lectureIds.length >= 6;
        return (
          <div key={p._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Status ribbon */}
            <div className="h-[3px] bg-gradient-to-r from-[#21864E] via-[#43c479] to-[#21864E]" />

            {/* Card header */}
            <div className="flex items-start justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 uppercase tracking-wide">
                    ✓ Paid
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    Order #{orderIdx + 1}
                  </span>
                </div>
                <p className="text-[14px] font-bold text-slate-800">
                  {fmtDate(p.createdAt)}
                  <span className="text-[11px] font-normal text-slate-400 ml-2">{fmtTime(p.createdAt)}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[24px] font-extrabold text-[#21864E] leading-none">
                  ₹{p.amount.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">INR</p>
              </div>
            </div>

            {/* What was purchased */}
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-slate-200 inline-block" />
                Foundation Series
                <span className="w-4 h-px bg-slate-200 inline-block" />
              </p>
              {isBundle ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[11px] font-bold text-amber-700">Full Bundle</span>
                  <span className="text-[10px] text-amber-600">All 6 lectures — complete access</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {p.lectureIds.map((id) => (
                    <div key={id} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-[#21864E] shrink-0 mt-0.5">
                        {id.toUpperCase()}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-700 leading-snug font-medium truncate">
                          {LECTURE_LABEL[id] ?? id}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                        ₹{Math.round(p.amount / p.lectureIds.length).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reference IDs */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">Payment Reference</p>
              <div className="grid grid-cols-1 gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 w-20 shrink-0">Order ID</span>
                  <code className="text-[10px] text-slate-600 font-mono select-all bg-white px-2 py-0.5 rounded border border-slate-200 flex-1 truncate">
                    {p.orderId}
                  </code>
                </div>
                {p.paymentId && (
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-400 w-20 shrink-0">Payment ID</span>
                    <code className="text-[10px] text-slate-600 font-mono select-all bg-white px-2 py-0.5 rounded border border-slate-200 flex-1 truncate">
                      {p.paymentId}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
