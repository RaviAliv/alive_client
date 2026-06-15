import { useEffect, useState, useCallback } from "react";
import { apiGet, apiPost } from "../../lib/api";
import { Link } from "react-router-dom";

type AdminRow = {
  _id: string; name: string; email: string;
  allocations: Record<string, { allocated: number; used: number }>;
};

const COURSES = ["foundation", "core", "advanced", "masterclass"];

export default function ManageAdmins() {
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState({ adminId: "", course: "foundation", seats: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formErr, setFormErr] = useState("");

  const flash = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await apiGet<{ admins: AdminRow[] }>("/admin/admins");
      setAdmins(d.admins);
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to load", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleAllocate = async (e: React.FormEvent) => {
    e.preventDefault(); setFormErr("");
    if (!form.adminId) { setFormErr("Select an admin."); return; }
    if (!form.seats || parseInt(form.seats) < 1) { setFormErr("Enter a valid seat count."); return; }
    setFormLoading(true);
    try {
      await apiPost("/admin/allocate", {
        adminId: form.adminId,
        course: form.course,
        seats: parseInt(form.seats),
      });
      flash(`Allocated ${form.seats} seats for ${form.course}`);
      setForm((f) => ({ ...f, seats: "" }));
      load();
    } catch (err) {
      setFormErr(err instanceof Error ? err.message : "Failed to allocate");
    } finally {
      setFormLoading(false);
    }
  };

  const totalUsed = admins.reduce((sum, a) => sum + Object.values(a.allocations).reduce((s, v) => s + v.used, 0), 0);
  const totalAllocated = admins.reduce((sum, a) => sum + Object.values(a.allocations).reduce((s, v) => s + v.allocated, 0), 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Super Admin</p>
          <h1 className="text-2xl font-bold text-slate-800">Manage Admins</h1>
        </div>
        {toast && (
          <div className={`text-sm px-4 py-2 rounded-xl font-medium border ${
            toast.type === "error" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
          }`}>{toast.msg}</div>
        )}
      </div>

      {/* Summary strip */}
      {admins.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Admins", value: admins.length },
            { label: "Total Allocated", value: totalAllocated.toLocaleString() },
            { label: "Total Used", value: `${totalUsed.toLocaleString()} (${totalAllocated ? Math.round((totalUsed / totalAllocated) * 100) : 0}%)` },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{s.label}</p>
              <p className="text-xl font-bold text-slate-800">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Allocate form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Allocate Seats to Admin</h2>
        {admins.length === 0 && !loading ? (
          <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
            No admins yet. Go to{" "}
            <Link to="/panel/super/users" className="font-semibold underline hover:no-underline">All Users</Link>
            {" "}and promote a user to Admin first.
          </div>
        ) : (
          <form onSubmit={handleAllocate} className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[180px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">Admin</label>
              <select value={form.adminId} onChange={(e) => setForm((f) => ({ ...f, adminId: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 bg-white">
                <option value="">Select admin...</option>
                {admins.map((a) => <option key={a._id} value={a._id}>{a.name} ({a.email})</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">Course</label>
              <select value={form.course} onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 bg-white capitalize">
                {COURSES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">Seats</label>
              <input type="number" min={1} max={5000} value={form.seats}
                onChange={(e) => setForm((f) => ({ ...f, seats: e.target.value }))} placeholder="e.g. 200"
                className="w-28 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 bg-white" />
            </div>
            <button type="submit" disabled={formLoading}
              className="bg-[#1E2A44] hover:bg-[#141C2E] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50 whitespace-nowrap">
              {formLoading ? "Saving…" : "Allocate Seats"}
            </button>
          </form>
        )}
        {formErr && <p className="text-sm text-red-600 mt-2">{formErr}</p>}
      </div>

      {/* Admins table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
        </div>
      ) : admins.length === 0 ? null : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Admin</th>
                  {COURSES.map((c) => (
                    <th key={c} className="text-center px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 capitalize">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((a) => (
                  <tr key={a._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{a.name}</p>
                      <p className="text-slate-400 text-xs">{a.email}</p>
                    </td>
                    {COURSES.map((c) => {
                      const alloc = a.allocations[c];
                      const pct = alloc ? Math.min(Math.round((alloc.used / alloc.allocated) * 100), 100) : 0;
                      return (
                        <td key={c} className="px-4 py-3 text-center">
                          {alloc ? (
                            <div>
                              <p className="text-xs font-bold text-slate-800">{alloc.used}/{alloc.allocated}</p>
                              <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-16 mx-auto">
                                <div className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-red-400" : "bg-[#1E2A44]"}`}
                                  style={{ width: `${pct}%` }} />
                              </div>
                              <p className="text-[9px] text-slate-400 mt-0.5">{alloc.allocated - alloc.used} left</p>
                            </div>
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
