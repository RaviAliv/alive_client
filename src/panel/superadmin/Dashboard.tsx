import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

type Stats = { totalUsers: number; totalAdmins: number; courseCounts: Record<string, number> };

const COURSES = ["foundation", "core", "advanced", "masterclass"];
const COURSE_COLOR: Record<string, string> = {
  foundation: "#21864E", core: "#D4A621", advanced: "#1E5AA6", masterclass: "#C8102E",
};

export default function SuperDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<{ stats: Stats }>("/admin/stats").then((d) => setStats(d.stats)).finally(() => setLoading(false));
  }, []);

  const totalEnrolled = Object.values(stats?.courseCounts ?? {}).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Super Admin Panel</p>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" /></div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Users",    value: stats?.totalUsers ?? 0,  color: "bg-blue-50 text-blue-700 border-blue-100" },
              { label: "Admins",         value: stats?.totalAdmins ?? 0, color: "bg-purple-50 text-purple-700 border-purple-100" },
              { label: "Enrollments",    value: totalEnrolled,           color: "bg-green-50 text-green-700 border-green-100" },
              { label: "Active Courses", value: COURSES.length,          color: "bg-amber-50 text-amber-700 border-amber-100" },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl border p-5 ${s.color}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">{s.label}</p>
                <p className="text-3xl font-bold">{s.value.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Enrollment bars */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-lg">
            <h2 className="text-sm font-semibold text-slate-700 mb-5">Enrollments by Course</h2>
            <div className="space-y-4">
              {COURSES.map((c) => {
                const count = stats?.courseCounts[c] ?? 0;
                const max = Math.max(...Object.values(stats?.courseCounts ?? {}), 1);
                return (
                  <div key={c}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm text-slate-600 capitalize font-medium">{c}</span>
                      <span className="text-sm font-bold text-slate-800">{count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(count / max) * 100}%`, background: COURSE_COLOR[c] }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
