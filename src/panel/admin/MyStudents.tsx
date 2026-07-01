import { useEffect, useState, useCallback } from "react";
import { apiGet, apiDelete } from "../../lib/api";

type StudentRow = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  course: string;
  lectures: string[];
  lectureIds: string[];
  grantAllLectures: boolean;
  expiresAt: string;
  createdAt: string;
  status: "invited" | "active";
};

type Alloc = { course: string; allocatedSeats: number; usedSeats: number };

const COURSE_COLOR: Record<string, string> = {
  foundation: "#21864E", core: "#D4A621", advanced: "#1E5AA6", masterclass: "#C8102E",
};
const COURSE_LABEL: Record<string, string> = {
  foundation: "Foundation", core: "Core", advanced: "Advanced", masterclass: "Masterclass",
};
const COURSES = ["foundation", "core", "advanced", "masterclass"];

export default function MyStudents() {
  const [students,    setStudents]    = useState<StudentRow[]>([]);
  const [allocations, setAllocations] = useState<Alloc[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [activeCourse, setActiveCourse] = useState("all");
  const [revoking,    setRevoking]    = useState<string | null>(null);
  const [toast,       setToast]       = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const flash = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 5000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [g, a] = await Promise.all([
        apiGet<{ accesses: StudentRow[] }>("/admin/granted"),
        apiGet<{ allocations: Alloc[] }>("/admin/my-allocation"),
      ]);
      setStudents(g.accesses);
      setAllocations(a.allocations);
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to load", "err");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleRevoke = async (s: StudentRow) => {
    const isPending = s.status === "invited";
    const confirmMsg = isPending
      ? `Cancel invitation for ${s.name} (${s.email})?\n\nTheir seat will be freed and you can invite someone else.`
      : `Remove course access for ${s.name} (${s.email})?\n\n⚠️ This student has already activated their account.\nTheir seat will NOT be freed — it is permanently consumed.\n\nContinue?`;
    if (!confirm(confirmMsg)) return;

    setRevoking(s._id);
    try {
      const res = await apiDelete<{ message: string; isPending: boolean }>(`/admin/grant/${s.userId}/${s.course}`);
      setStudents((prev) => prev.filter((x) => x._id !== s._id));
      flash(res.message);
      // Refresh allocation counts
      const a = await apiGet<{ allocations: Alloc[] }>("/admin/my-allocation");
      setAllocations(a.allocations);
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to revoke", "err");
    } finally {
      setRevoking(null);
    }
  };

  const visible = activeCourse === "all"
    ? students
    : students.filter((s) => s.course === activeCourse);

  const counts = COURSES.reduce((acc, c) => {
    const rows = students.filter((s) => s.course === c);
    acc[c] = {
      total:   rows.length,
      invited: rows.filter((s) => s.status === "invited").length,
      active:  rows.filter((s) => s.status === "active").length,
    };
    return acc;
  }, {} as Record<string, { total: number; invited: number; active: number }>);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Admin Panel</p>
        <h1 className="text-2xl font-bold text-slate-800">My Students</h1>
        <p className="text-sm text-slate-400 mt-1">Track course access requests and student activation status</p>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium border ${
          toast.type === "ok"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-red-50 text-red-700 border-red-200"
        }`}>{toast.msg}</div>
      )}

      {/* Quota cards */}
      {allocations.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {allocations.map((a) => {
            const color = COURSE_COLOR[a.course] ?? "#64748b";
            const remaining = a.allocatedSeats - a.usedSeats;
            const pct = a.allocatedSeats > 0 ? Math.round((a.usedSeats / a.allocatedSeats) * 100) : 0;
            return (
              <div key={a.course} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
                    {COURSE_LABEL[a.course]}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    remaining === 0 ? "bg-red-100 text-red-600" :
                    remaining <= 5  ? "bg-amber-100 text-amber-700" :
                                      "bg-emerald-50 text-emerald-700"
                  }`}>
                    {remaining} left
                  </span>
                </div>
                <p className="text-xl font-bold text-slate-800">{a.usedSeats}<span className="text-sm font-normal text-slate-400"> / {a.allocatedSeats}</span></p>
                <p className="text-[10px] text-slate-400 mt-0.5">seats used</p>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                </div>
                <div className="mt-2 flex gap-3 text-[10px] text-slate-500">
                  <span><span className="font-semibold text-amber-600">{counts[a.course]?.invited ?? 0}</span> invited</span>
                  <span><span className="font-semibold text-emerald-600">{counts[a.course]?.active ?? 0}</span> active</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Seat rules info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-5 text-xs text-blue-700 leading-relaxed">
        <strong>Seat rules:</strong>{" "}
        Cancelling an <span className="font-semibold text-amber-700">Invited</span> student (hasn't set password) frees their seat — you can invite someone else.{" "}
        Removing an <span className="font-semibold text-emerald-700">Active</span> student (has logged in) removes their access but the seat is <strong>permanently consumed</strong> and cannot be reassigned.
      </div>

      {/* Course filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setActiveCourse("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
            activeCourse === "all"
              ? "bg-slate-800 text-white border-slate-800"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          All ({students.length})
        </button>
        {COURSES.filter((c) => students.some((s) => s.course === c)).map((c) => (
          <button key={c} onClick={() => setActiveCourse(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              activeCourse === c ? "text-white border-transparent" : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
            style={activeCourse === c ? { background: COURSE_COLOR[c] } : {}}
          >
            {COURSE_LABEL[c]} ({students.filter((s) => s.course === c).length})
          </button>
        ))}
      </div>

      {/* Student table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400 text-sm">Loading students…</div>
      ) : visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400 text-sm">
          No students found. Use <strong>Grant Access</strong> to invite students.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Student", "Course", "Status", "Granted On", "Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {visible.map((s) => {
                const isInvited = s.status === "invited";
                const color = COURSE_COLOR[s.course] ?? "#64748b";
                const isRevoking = revoking === s._id;
                const grantedOn = s.createdAt
                  ? new Date(s.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                  : "—";

                return (
                  <tr key={s._id} className={`transition-colors ${isInvited ? "hover:bg-amber-50/30" : "hover:bg-emerald-50/20"}`}>
                    {/* Student */}
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800 leading-tight">{s.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono">{s.email}</p>
                    </td>
                    {/* Course */}
                    <td className="px-4 py-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: color }}>
                        {COURSE_LABEL[s.course]}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      {isInvited ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          Invited
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      )}
                    </td>
                    {/* Granted on */}
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{grantedOn}</td>
                    {/* Action */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleRevoke(s)}
                        disabled={isRevoking}
                        title={isInvited ? "Cancel invite & free seat" : "Remove access (seat stays consumed)"}
                        className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-wait ${
                          isInvited
                            ? "text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100"
                            : "text-red-600 bg-red-50 border-red-200 hover:bg-red-100"
                        }`}
                      >
                        {isRevoking ? "…" : isInvited ? "Cancel invite" : "Remove"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Legend footer */}
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/40 flex gap-5 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Invited — waiting to set password</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Active — has logged in &amp; can access course</span>
          </div>
        </div>
      )}
    </div>
  );
}
