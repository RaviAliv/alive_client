import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../../lib/api";

type Alloc = { course: string; allocatedSeats: number; usedSeats: number };
type GrantedUser = {
  _id: string; course: string; createdAt: string;
  isActive: boolean;
  grantAllLectures?: boolean;
  lectures?: string[];
  user: { _id: string; name: string; email: string };
};

const COURSES = ["foundation", "core", "advanced", "masterclass"];
const COURSE_COLOR: Record<string, string> = {
  foundation: "#21864E", core: "#D4A621", advanced: "#1E5AA6", masterclass: "#C8102E",
};

export default function AdminDashboard() {
  const [allocations, setAllocations] = useState<Alloc[]>([]);
  const [granted, setGranted] = useState<GrantedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Filters for the grants table
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");

  const flash = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500);
  };

  const loadData = () =>
    Promise.all([
      apiGet<{ allocations: Alloc[] }>("/admin/my-allocation"),
      apiGet<{ accesses: GrantedUser[] }>("/admin/granted"),
    ])
      .then(([a, g]) => { setAllocations(a.allocations); setGranted(g.accesses); })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));

  useEffect(() => { loadData(); }, []);

  const deleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Permanently delete "${userName}"?\n\nThis removes all their course access and cannot be undone.`)) return;
    setDeleting(userId);
    try {
      await apiDelete(`/admin/users/${userId}`);
      flash(`Deleted: ${userName}`);
      loadData();
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to delete user", "error");
    } finally {
      setDeleting(null);
    }
  };

  const totalGranted = granted.length;
  const totalSeats = allocations.reduce((s, a) => s + a.allocatedSeats, 0);
  const usedSeats = allocations.reduce((s, a) => s + a.usedSeats, 0);

  // Client-side filtered view
  const filtered = granted.filter((g) => {
    const matchesCourse = courseFilter === "all" || g.course === courseFilter;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q ||
      g.user?.name?.toLowerCase().includes(q) ||
      g.user?.email?.toLowerCase().includes(q);
    return matchesCourse && matchesSearch;
  });

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-red-700 text-sm">{error}</div>
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Admin Panel</p>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          {toast && (
            <div className={`text-sm px-4 py-2 rounded-xl font-medium border ${
              toast.type === "error" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
            }`}>{toast.msg}</div>
          )}
          <Link to="/panel/admin/grant"
            className="flex items-center gap-2 bg-[#1E2A44] hover:bg-[#141C2E] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Grant Access
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Granted", value: totalGranted, note: "access grants you've made" },
          { label: "Seats Allocated", value: totalSeats, note: "across all courses" },
          { label: "Seats Used", value: usedSeats, note: `${totalSeats ? Math.round((usedSeats / totalSeats) * 100) : 0}% of allocation` },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-slate-800">{s.value.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Quota cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Your Seat Quotas</h2>
          <Link to="/panel/admin/grant" className="text-xs text-[#1E2A44] hover:underline font-medium">
            Grant access →
          </Link>
        </div>
        {allocations.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 max-w-md">
            No seats allocated yet. Contact your Super Admin to receive a seat quota.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allocations.map((a) => {
              const pct = Math.round((a.usedSeats / a.allocatedSeats) * 100);
              const rem = a.allocatedSeats - a.usedSeats;
              return (
                <div key={a.course} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: COURSE_COLOR[a.course] }} />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 capitalize">{a.course}</p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{rem.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 mt-0.5">remaining of {a.allocatedSeats.toLocaleString()}</p>
                  <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-red-400" : pct >= 70 ? "bg-amber-400" : "bg-[#1E2A44]"}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{pct}% used · {a.usedSeats} granted</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Grants table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
            Access Grants
            <span className="ml-2 text-slate-400 font-normal normal-case">
              ({filtered.length}{filtered.length !== granted.length ? ` of ${granted.length}` : ""})
            </span>
          </h2>
          <button onClick={loadData} className="text-xs text-slate-500 hover:text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white transition-colors">
            Refresh
          </button>
        </div>

        {granted.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <p className="text-slate-400 text-sm mb-3">You haven't granted access to anyone yet.</p>
            <Link to="/panel/admin/grant"
              className="inline-flex items-center gap-2 bg-[#1E2A44] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#141C2E] transition-colors">
              Start Granting Access
            </Link>
          </div>
        ) : (
          <>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search name or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-4 py-1.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 focus:border-[#1E2A44] bg-white w-52"
                />
                {search && (
                  <button onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Course pills */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCourseFilter("all")}
                  className={`text-[11px] px-3 py-1 rounded-full font-semibold transition-colors ${
                    courseFilter === "all"
                      ? "bg-[#1E2A44] text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  All
                </button>
                {COURSES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCourseFilter(courseFilter === c ? "all" : c)}
                    className={`text-[11px] px-3 py-1 rounded-full font-semibold capitalize transition-all ${
                      courseFilter === c
                        ? "text-white ring-2 ring-offset-1"
                        : "text-white opacity-50 hover:opacity-80"
                    }`}
                    style={{
                      background: COURSE_COLOR[c],
                      ...(courseFilter === c ? { ringColor: COURSE_COLOR[c] } : {}),
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {filtered.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-slate-400 text-sm">No grants match your filters.</p>
                  <button onClick={() => { setSearch(""); setCourseFilter("all"); }}
                    className="mt-2 text-xs text-[#1E2A44] hover:underline font-medium">
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {["User", "Email", "Course", "Lectures", "Granted On", ""].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((g) => (
                        <tr key={g._id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-800">{g.user?.name ?? "—"}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{g.user?.email ?? "—"}</td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] px-2.5 py-1 rounded-full text-white font-semibold capitalize"
                              style={{ background: COURSE_COLOR[g.course] ?? "#888" }}>
                              {g.course}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {g.grantAllLectures !== false ? (
                              <span className="text-[11px] text-slate-500">All lectures</span>
                            ) : (g.lectures?.length ?? 0) === 0 ? (
                              <span className="text-[11px] text-amber-500 font-medium">No lectures</span>
                            ) : (
                              <span className="text-[11px] text-slate-600 font-medium">
                                {g.lectures!.length} lecture{g.lectures!.length !== 1 ? "s" : ""}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                            {new Date(g.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                          <td className="px-4 py-2 text-right">
                            {g.user && (
                              <button
                                onClick={() => deleteUser(g.user._id, g.user.name)}
                                disabled={!!deleting}
                                title={`Delete ${g.user.name}`}
                                className="p-1.5 rounded-lg border border-transparent text-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-wait"
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
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {filtered.length > 0 && granted.length > filtered.length && (
                <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-400">
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
