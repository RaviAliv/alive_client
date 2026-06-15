import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../lib/api";

type Access = { course: string; grantedAt: string; expiresAt: string | null };

const COURSE_INFO: Record<string, { label: string; tier: string; desc: string; color: string }> = {
  foundation: { label: "Foundation Series", tier: "Tier I",   desc: "Core concepts and fundamentals of reproductive medicine", color: "#21864E" },
  core:        { label: "Core Series",       tier: "Tier II",  desc: "In-depth clinical training and laboratory techniques",    color: "#D4A621" },
  advanced:    { label: "Advanced Series",   tier: "Tier III", desc: "Advanced clinical practice and complex case management",  color: "#1E5AA6" },
  masterclass: { label: "Masterclass Series",tier: "Tier IV",  desc: "Expert-level mastery and cutting-edge research",         color: "#C8102E" },
};

export default function MyCourses() {
  const [courses, setCourses] = useState<Access[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<{ courses: Access[] }>("/admin/my-access")
      .then((d) => setCourses(d.courses))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const isExpired = (expiresAt: string | null) =>
    expiresAt ? new Date(expiresAt) < new Date() : false;

  const activeCourses = courses.filter((c) => !isExpired(c.expiresAt));
  const expiredCourses = courses.filter((c) => isExpired(c.expiresAt));

  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Student Panel</p>
        <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-red-700 text-sm">{error}</div>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-md shadow-sm">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="font-semibold text-slate-700 mb-1">No course access yet</p>
          <p className="text-sm text-slate-400 mb-4">You haven't been granted access to any course. Contact an admin or explore what's available.</p>
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E2A44] hover:underline">
            Browse courses →
          </Link>
        </div>
      ) : (
        <>
          {activeCourses.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Active Access</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {activeCourses.map((c) => {
                  const info = COURSE_INFO[c.course];
                  if (!info) return null;
                  return (
                    <div key={c.course} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-1 w-full" style={{ background: info.color }} />
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{info.label}</p>
                            <p className="text-[10px] font-mono uppercase tracking-wider mt-0.5" style={{ color: info.color }}>{info.tier}</p>
                          </div>
                          <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">{info.desc}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Granted</p>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {new Date(c.grantedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          </div>
                          <Link to="/video"
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                            style={{ background: info.color }}>
                            Watch Lectures →
                          </Link>
                        </div>
                        {c.expiresAt && (
                          <p className="text-[10px] text-amber-600 mt-2 font-medium">
                            Expires {new Date(c.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {expiredCourses.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Expired</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl opacity-60">
                {expiredCourses.map((c) => {
                  const info = COURSE_INFO[c.course];
                  if (!info) return null;
                  return (
                    <div key={c.course} className="bg-white rounded-2xl border border-slate-200 p-5">
                      <p className="font-semibold text-slate-600">{info.label}</p>
                      <p className="text-xs text-red-500 mt-1 font-medium">
                        Expired {c.expiresAt && new Date(c.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
