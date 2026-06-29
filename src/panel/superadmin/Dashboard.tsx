import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../lib/api";
import { COURSE_LECTURES } from "../shared/lectureConfig";

type Stats = { totalUsers: number; totalAdmins: number; courseCounts: Record<string, number> };
type TxSummary = { totalRevenue: number; count: number };

const COURSES = ["foundation", "core", "advanced", "masterclass"] as const;
const COURSE_COLOR: Record<string, string> = {
  foundation: "#21864E", core: "#D4A621", advanced: "#1E5AA6", masterclass: "#C8102E",
};
const COURSE_LABEL: Record<string, string> = {
  foundation: "Foundation Series", core: "Core Series",
  advanced: "Advanced Series", masterclass: "Masterclass Series",
};

export default function SuperDashboard() {
  const [stats,        setStats]        = useState<Stats | null>(null);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [txSummary,    setTxSummary]    = useState<TxSummary>({ totalRevenue: 0, count: 0 });
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    Promise.all([
      apiGet<{ stats: Stats }>("/admin/stats"),
      apiGet<{ availability: Record<string, string[]> }>("/admin/r2-availability").catch(() => ({ availability: {} })),
      apiGet<{ payments: { amount: number }[]; totalRevenue: number }>("/admin/transactions").catch(() => ({ payments: [], totalRevenue: 0 })),
    ]).then(([s, a, t]) => {
      setStats(s.stats);
      setAvailability(a.availability ?? {});
      setTxSummary({ totalRevenue: t.totalRevenue ?? 0, count: (t.payments ?? []).length });
    }).finally(() => setLoading(false));
  }, []);

  const totalEnrolled   = Object.values(stats?.courseCounts ?? {}).reduce((a, b) => a + b, 0);
  const totalLectures   = Object.values(COURSE_LECTURES).reduce((a, b) => a + b.length, 0);
  const uploadedLectures = Object.values(availability).reduce((a, b) => a + b.length, 0);

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Super Admin Panel</p>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Link to="/panel/super/users"
          className="flex items-center gap-2 bg-[#1E2A44] hover:bg-[#141C2E] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
          </svg>
          All Users
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* ── Stat cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-7">
            {[
              {
                label: "Total Users", value: stats?.totalUsers ?? 0,
                icon: <IcoUsers />, color: "#1E5AA6", bg: "#EEF3FB",
                link: "/panel/super/users", hint: "View all →",
              },
              {
                label: "Admins", value: stats?.totalAdmins ?? 0,
                icon: <IcoShield />, color: "#7C3AED", bg: "#F5F0FF",
                link: "/panel/super/admins", hint: "Manage →",
              },
              {
                label: "Enrollments", value: totalEnrolled,
                icon: <IcoChart />, color: "#21864E", bg: "#EDFBF3",
                link: undefined, hint: "Across all courses",
              },
              {
                label: "Active Courses", value: COURSES.length,
                icon: <IcoBook />, color: "#D4A621", bg: "#FEF9EC",
                link: undefined, hint: `${uploadedLectures} / ${totalLectures} lectures live`,
              },
              {
                label: "Total Revenue", value: `₹${txSummary.totalRevenue.toLocaleString("en-IN")}`,
                icon: <IcoReceipt />, color: "#0F766E", bg: "#F0FDFA",
                link: "/panel/super/transactions", hint: `${txSummary.count} paid orders →`,
              },
            ].map((s) => (
              <div key={s.label}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all group"
                style={{ borderTop: `3px solid ${s.color}` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                    {s.icon}
                  </div>
                  {s.link && (
                    <Link to={s.link}
                      className="text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: s.color }}>
                      {s.hint}
                    </Link>
                  )}
                </div>
                <p className="text-[30px] font-bold text-slate-800 leading-none">{typeof s.value === "number" ? s.value.toLocaleString() : s.value}</p>
                <p className="text-[11px] font-semibold text-slate-500 mt-1">{s.label}</p>
                {!s.link && <p className="text-[10px] text-slate-400 mt-0.5">{s.hint}</p>}
              </div>
            ))}
          </div>

          {/* ── Two columns ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
            {/* Enrollments by course */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Enrollments by Course</h2>
                <span className="text-[11px] text-slate-400">{totalEnrolled} total</span>
              </div>
              <div className="space-y-4">
                {COURSES.map((c) => {
                  const count = stats?.courseCounts[c] ?? 0;
                  const max = Math.max(...Object.values(stats?.courseCounts ?? {}), 1);
                  return (
                    <div key={c}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[12px] text-slate-600 capitalize font-medium">{COURSE_LABEL[c]}</span>
                        <span className="text-[12px] font-bold text-slate-800">{count}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${(count / max) * 100}%`, background: COURSE_COLOR[c] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lecture / Video status */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Video Library Status</h2>
                <span className="text-[11px] text-slate-400">{uploadedLectures} / {totalLectures} uploaded</span>
              </div>
              <div className="space-y-4">
                {COURSES.map((c) => {
                  const lectures = COURSE_LECTURES[c] ?? [];
                  const uploaded = (availability[c] ?? []).length;
                  const pct      = lectures.length ? Math.round((uploaded / lectures.length) * 100) : 0;
                  const allDone  = uploaded === lectures.length;
                  const noneDone = uploaded === 0;
                  return (
                    <div key={c}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[12px] text-slate-600 capitalize font-medium">{COURSE_LABEL[c]}</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          allDone  ? "bg-green-50 text-green-700" :
                          noneDone ? "bg-slate-100 text-slate-400" :
                                     "bg-amber-50 text-amber-700"
                        }`}>
                          {uploaded} / {lectures.length} lectures
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: COURSE_COLOR[c] }} />
                      </div>
                      {/* Lecture names */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {lectures.map((lec) => {
                          const live = (availability[c] ?? []).includes(lec);
                          return (
                            <span key={lec}
                              title={lec}
                              className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide truncate max-w-[120px] ${
                                live ? "text-white" : "bg-slate-100 text-slate-400"
                              }`}
                              style={live ? { background: COURSE_COLOR[c] } : {}}>
                              {lec.length > 20 ? lec.slice(0, 18) + "…" : lec}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Quick actions ── */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { to: "/panel/super/users",  label: "Manage Users",   sub: "View, promote, grant access",       icon: <IcoUsers />,  color: "#1E5AA6" },
                { to: "/panel/super/admins", label: "Manage Admins",  sub: "Profile, seat quotas, search",      icon: <IcoShield />, color: "#7C3AED" },
                { to: "/panel/admin/grant",  label: "Grant Access",   sub: "Bulk or manual course access",      icon: <IcoKey />,    color: "#21864E" },
                { to: "/panel/admin",        label: "Admin Dashboard",sub: "View enrolled users & usage",       icon: <IcoChart />,  color: "#D4A621" },
                { to: "/panel/super/transactions", label: "Transactions", sub: "Payment history & revenue", icon: <IcoReceipt />, color: "#0F766E" },
              ].map((a) => (
                <Link key={a.to} to={a.to}
                  className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: a.color + "18", color: a.color }}>
                    {a.icon}
                  </div>
                  <p className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{a.label}</p>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">{a.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function IcoUsers() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" /></svg>;
}
function IcoShield() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}
function IcoChart() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
}
function IcoKey() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>;
}
function IcoBook() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
}
function IcoReceipt() {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
}
