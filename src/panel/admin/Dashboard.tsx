import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../../lib/api";
import { COURSES, COURSE_COLOR } from "../shared/lectureConfig";
import { useAuth } from "../../context/AuthContext";

type Alloc = { course: string; allocatedSeats: number; usedSeats: number };
type GrantedUser = {
  _id: string; course: string; createdAt: string;
  isActive: boolean;
  grantAllLectures?: boolean;
  lectures?: string[];
  user: { _id: string; name: string; email: string };
};

type AdminRow = {
  _id: string; name: string; email: string;
  allocations: Record<string, { allocated: number; used: number }>;
};

type Toast = { msg: string; type: "success" | "error" };

export default function AdminDashboard() {
  const { user } = useAuth();
  if (user?.systemRole === "superadmin") return <SuperAdminView />;
  return <MyAdminDashboard />;
}

function SuperAdminView() {
  const [admins,  setAdmins]  = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<{ admins: AdminRow[] }>("/admin/admins")
      .then((d) => setAdmins(d.admins))
      .finally(() => setLoading(false));
  }, []);

  const totalAllocated = admins.reduce((s, a) => s + Object.values(a.allocations).reduce((ss, v) => ss + v.allocated, 0), 0);
  const totalUsed      = admins.reduce((s, a) => s + Object.values(a.allocations).reduce((ss, v) => ss + v.used, 0), 0);

  if (loading) return (
    <div className="flex justify-center py-24">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-1">Super Admin · Admin View</p>
          <h1 className="text-[26px] font-bold text-slate-800 leading-tight">Admin Usage Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Seat allocation and usage across all admins</p>
        </div>
        <Link to="/panel/super/admins"
          className="flex items-center gap-2 bg-[#1E2A44] hover:bg-[#141C2E] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          Manage Admins →
        </Link>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        {[
          { label: "Admins",           value: admins.length },
          { label: "Total Allocated",  value: totalAllocated.toLocaleString() },
          { label: "Total Used",       value: `${totalUsed.toLocaleString()} (${totalAllocated ? Math.round((totalUsed / totalAllocated) * 100) : 0}%)` },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      {admins.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-slate-500 text-sm">No admins yet. Promote users from the All Users panel.</p>
          <Link to="/panel/super/users" className="mt-3 inline-block text-sm text-[#1E2A44] font-semibold hover:underline">
            Go to All Users →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 min-w-[200px]">Admin</th>
                  {COURSES.map((c) => (
                    <th key={c} className="text-center px-4 py-3 text-[10px] font-bold uppercase tracking-wider min-w-[110px]"
                      style={{ color: COURSE_COLOR[c] }}>{c}</th>
                  ))}
                  <th className="text-center px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((a) => {
                  const adminTotal = Object.values(a.allocations).reduce((s, v) => s + v.used, 0);
                  const adminAlloc = Object.values(a.allocations).reduce((s, v) => s + v.allocated, 0);
                  return (
                    <tr key={a._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <Link to="/panel/super/admins"
                          className="font-semibold text-[#1E2A44] hover:text-blue-600 hover:underline decoration-dotted transition-colors leading-tight block">
                          {a.name}
                        </Link>
                        <p className="text-slate-400 text-xs mt-0.5">{a.email}</p>
                      </td>
                      {COURSES.map((c) => {
                        const alloc = a.allocations[c];
                        const used  = alloc?.used ?? 0;
                        const total = alloc?.allocated ?? 0;
                        const pct   = total ? Math.min(100, Math.round((used / total) * 100)) : 0;
                        const isFull = total > 0 && pct >= 100;
                        return (
                          <td key={c} className="px-4 py-3 text-center">
                            {total === 0 ? (
                              <span className="text-slate-300 text-xs">—</span>
                            ) : (
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-[12px] font-bold" style={{ color: isFull ? "#ef4444" : COURSE_COLOR[c] }}>
                                  {used} / {total}
                                </span>
                                <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: isFull ? "#ef4444" : COURSE_COLOR[c] }} />
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-center">
                        <span className="text-[12px] font-bold text-slate-700">
                          {adminTotal} / {adminAlloc}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200">
                <tr>
                  <td className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Totals</td>
                  {COURSES.map((c) => {
                    const used  = admins.reduce((s, a) => s + (a.allocations[c]?.used ?? 0), 0);
                    const total = admins.reduce((s, a) => s + (a.allocations[c]?.allocated ?? 0), 0);
                    return (
                      <td key={c} className="px-4 py-3 text-center text-[11px] font-bold text-slate-600">
                        {total > 0 ? `${used} / ${total}` : "—"}
                      </td>
                    );
                  })}
                  <td className="px-4 py-3 text-center text-[11px] font-bold text-slate-700">
                    {totalUsed} / {totalAllocated}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function MyAdminDashboard() {
  const [allocations, setAllocations] = useState<Alloc[]>([]);
  const [granted,     setGranted]     = useState<GrantedUser[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [deleting,    setDeleting]    = useState<string | null>(null);
  const [toast,       setToast]       = useState<Toast | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [search,      setSearch]      = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");

  const flash = (msg: string, type: Toast["type"] = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = useCallback(async () => {
    try {
      const [a, g] = await Promise.all([
        apiGet<{ allocations: Alloc[] }>("/admin/my-allocation"),
        apiGet<{ accesses: GrantedUser[] }>("/admin/granted"),
      ]);
      setAllocations(a.allocations);
      setGranted(g.accesses);
      setLastUpdated(new Date());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Refresh when tab regains visibility — ensures changes made in superadmin panel are reflected
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") loadData();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [loadData]);

  const deleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Permanently delete "${userName}"?\n\nThis removes all their course access and cannot be undone.`)) return;
    setDeleting(userId);
    try {
      await apiDelete(`/admin/users/${userId}`);
      flash(`Deleted: ${userName}`);
      loadData();
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to delete user", "error");
    } finally { setDeleting(null); }
  };

  const totalGranted = granted.length;
  const totalSeats   = allocations.reduce((s, a) => s + a.allocatedSeats, 0);
  const usedSeats    = allocations.reduce((s, a) => s + a.usedSeats, 0);
  const pctUsed      = totalSeats ? Math.round((usedSeats / totalSeats) * 100) : 0;

  const filtered = granted.filter((g) => {
    const matchesCourse = courseFilter === "all" || g.course === courseFilter;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q ||
      g.user?.name?.toLowerCase().includes(q) ||
      g.user?.email?.toLowerCase().includes(q);
    return matchesCourse && matchesSearch;
  });

  if (loading) return (
    <div className="flex justify-center py-24">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
      <p className="text-red-700 text-sm font-medium">{error}</p>
      <button onClick={loadData} className="mt-3 text-sm text-red-600 underline hover:no-underline">Retry</button>
    </div>
  );

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-1">Admin Panel</p>
          <h1 className="text-[26px] font-bold text-slate-800 leading-tight">Dashboard</h1>
          {lastUpdated && (
            <p className="text-[11px] text-slate-400 mt-1">
              Updated {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {toast && (
            <div className={`text-sm px-4 py-2 rounded-xl font-medium border ${
              toast.type === "error" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
            }`}>{toast.msg}</div>
          )}
          <button onClick={loadData}
            className="flex items-center gap-2 px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 hover:bg-white bg-slate-50 text-slate-600 font-medium transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <Link to="/panel/admin/grant"
            className="flex items-center gap-2 bg-[#1E2A44] hover:bg-[#141C2E] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Grant Access
          </Link>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        <StatCard
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          value={totalGranted}
          label="Active Grants"
          sub="students with access"
          color="#1E2A44"
        />
        <StatCard
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          value={totalSeats}
          label="Seats Allocated"
          sub="across all courses"
          color="#1E5AA6"
        />
        <StatCard
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          value={`${pctUsed}%`}
          label="Seats Used"
          sub={`${usedSeats} of ${totalSeats} granted`}
          color={pctUsed >= 90 ? "#C8102E" : pctUsed >= 70 ? "#D4A621" : "#21864E"}
        />
      </div>

      {/* ── Quota cards ── */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Seat Quotas</h2>
          <Link to="/panel/admin/grant" className="text-[12px] text-[#1E2A44] hover:underline font-semibold">
            Grant access →
          </Link>
        </div>
        {allocations.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 max-w-md">
            No seats allocated yet. Ask your Super Admin to allocate a seat quota.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSES.map((course) => {
              const a = allocations.find((x) => x.course === course);
              if (!a) return (
                <div key={course} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm opacity-50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: COURSE_COLOR[course] }} />
                    <p className="text-[10.5px] font-bold uppercase tracking-widest text-slate-400 capitalize">{course}</p>
                  </div>
                  <p className="text-sm text-slate-400">No allocation</p>
                </div>
              );
              const pct = Math.min(Math.round((a.usedSeats / a.allocatedSeats) * 100), 100);
              const rem = a.allocatedSeats - a.usedSeats;
              const barColor = pct >= 90 ? "#ef4444" : pct >= 70 ? "#f59e0b" : COURSE_COLOR[course];
              return (
                <div key={course} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COURSE_COLOR[course] }} />
                      <p className="text-[10.5px] font-bold uppercase tracking-widest text-slate-400 capitalize">{course}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
                      pct >= 90 ? "bg-red-50 text-red-500" : pct >= 70 ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-400"
                    }`}>{pct}%</span>
                  </div>
                  <p className="text-[28px] font-bold text-slate-800 leading-none mt-2">{rem.toLocaleString()}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">remaining of {a.allocatedSeats.toLocaleString()}</p>
                  <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: barColor }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1.5">{a.usedSeats} granted</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Grants table ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">
            Access Grants
            <span className="ml-2 text-slate-400 font-normal normal-case text-[12px]">
              ({filtered.length}{filtered.length !== granted.length ? ` of ${granted.length}` : ""})
            </span>
          </h2>
        </div>

        {granted.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">No access grants yet</p>
            <p className="text-slate-400 text-xs mb-4">Grant course access to students to see them here.</p>
            <Link to="/panel/admin/grant"
              className="inline-flex items-center gap-2 bg-[#1E2A44] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#141C2E] transition-colors">
              Grant Access Now
            </Link>
          </div>
        ) : (
          <>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text" placeholder="Search name or email…" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-8 py-2 text-[13px] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 focus:border-[#1E2A44] bg-white w-52"
                />
                {search && (
                  <button onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 leading-none">✕</button>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <FilterPill label="All" active={courseFilter === "all"} onClick={() => setCourseFilter("all")} />
                {COURSES.map((c) => (
                  <FilterPill
                    key={c} label={c} active={courseFilter === c}
                    color={COURSE_COLOR[c]}
                    onClick={() => setCourseFilter(courseFilter === c ? "all" : c)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {filtered.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-slate-400 text-sm">No grants match filters.</p>
                  <button onClick={() => { setSearch(""); setCourseFilter("all"); }}
                    className="mt-2 text-xs text-[#1E2A44] hover:underline font-medium">Clear filters</button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {["Student", "Course", "Lectures", "Granted On", ""].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 last:text-right">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((g) => {
                        const lectureCount = g.lectures?.length ?? 0;
                        const allLecs = g.grantAllLectures !== false;
                        return (
                          <tr key={g._id} className="hover:bg-slate-50/70 transition-colors group">
                            <td className="px-4 py-3">
                              <p className="font-semibold text-slate-800 text-[13px]">{g.user?.name ?? "—"}</p>
                              <p className="text-slate-400 text-[11.5px] mt-0.5">{g.user?.email ?? "—"}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-[10.5px] px-2.5 py-1 rounded-full text-white font-semibold capitalize"
                                style={{ background: COURSE_COLOR[g.course] ?? "#888" }}>
                                {g.course}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {allLecs ? (
                                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                  All lectures
                                </span>
                              ) : lectureCount === 0 ? (
                                <span className="text-[11px] text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">No lectures</span>
                              ) : (
                                <span className="text-[11px] text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">
                                  {lectureCount} lecture{lectureCount !== 1 ? "s" : ""}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-slate-400 text-[12px] whitespace-nowrap">
                              {new Date(g.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </td>
                            <td className="px-4 py-2 text-right">
                              {g.user && (
                                <button
                                  onClick={() => deleteUser(g.user._id, g.user.name)}
                                  disabled={!!deleting}
                                  title={`Delete ${g.user.name}`}
                                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg border border-transparent text-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all disabled:opacity-50 disabled:cursor-wait"
                                >
                                  {deleting === g.user._id ? (
                                    <span className="block w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  )}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {filtered.length > 0 && granted.length > filtered.length && (
                <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 text-[11px] text-slate-400">
                  Showing {filtered.length} of {granted.length} grants
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, sub, color }: {
  icon: React.ReactNode; value: string | number; label: string; sub: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: color + "18", color }}>
          {icon}
        </div>
      </div>
      <p className="text-[28px] font-bold text-slate-800 leading-none">{typeof value === "number" ? value.toLocaleString() : value}</p>
      <p className="text-[12px] font-semibold text-slate-600 mt-1">{label}</p>
      <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
    </div>
  );
}

function FilterPill({ label, active, color, onClick }: {
  label: string; active: boolean; color?: string; onClick: () => void;
}) {
  if (color) {
    return (
      <button onClick={onClick}
        className={`text-[11px] px-3 py-1 rounded-full font-semibold capitalize transition-all ${
          active ? "text-white ring-2 ring-offset-1 ring-white" : "text-white opacity-45 hover:opacity-75"
        }`}
        style={{ background: color }}>
        {label}
      </button>
    );
  }
  return (
    <button onClick={onClick}
      className={`text-[11px] px-3 py-1 rounded-full font-semibold transition-colors ${
        active ? "bg-[#1E2A44] text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
      }`}>
      {label}
    </button>
  );
}
