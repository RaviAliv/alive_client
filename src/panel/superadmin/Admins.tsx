import { useEffect, useState, useCallback, useRef } from "react";
import { apiGet, apiPost, apiPatch } from "../../lib/api";
import { Link } from "react-router-dom";

type AdminRow = {
  _id: string; name: string; email: string;
  adminStatus?: "pending" | "active";
  organisation?: string; contactNumber?: string; designation?: string;
  city?: string; specialisation?: string; website?: string;
  allocations: Record<string, { allocated: number; used: number }>;
};

const COURSES = ["foundation", "core", "advanced", "masterclass"] as const;
const COURSE_COLOR: Record<string, string> = {
  foundation: "#21864E", core: "#D4A621", advanced: "#1E5AA6", masterclass: "#C8102E",
};

const isPending = (a: AdminRow) => a.adminStatus === "pending";

type EditKey = { adminId: string; course: string };

export default function ManageAdmins() {
  const [admins,       setAdmins]       = useState<AdminRow[]>([]);
  const [filtered,     setFiltered]     = useState<AdminRow[]>([]);
  const [search,       setSearch]       = useState("");
  const [loading,      setLoading]      = useState(true);
  const [toast,        setToast]        = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [editKey,      setEditKey]      = useState<EditKey | null>(null);
  const [editVal,      setEditVal]      = useState("");
  const [saving,       setSaving]       = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Profile side panel
  const [profileAdmin,  setProfileAdmin]  = useState<AdminRow | null>(null);
  const [profileEdit,   setProfileEdit]   = useState(false);
  const [profileForm,   setProfileForm]   = useState<Partial<AdminRow>>({});
  const [profileSaving, setProfileSaving] = useState(false);
  const [resending,     setResending]     = useState(false);

  // Invite panel
  const [showInvite,  setShowInvite]  = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName,  setInviteName]  = useState("");
  const [inviting,    setInviting]    = useState(false);

  const flash = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 4000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await apiGet<{ admins: AdminRow[] }>("/admin/admins");
      setAdmins(d.admins);
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to load", "error");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (editKey) setTimeout(() => inputRef.current?.focus(), 30);
  }, [editKey]);

  useEffect(() => {
    if (!search.trim()) { setFiltered(admins); return; }
    const q = search.toLowerCase();
    setFiltered(admins.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      (a.organisation ?? "").toLowerCase().includes(q) ||
      (a.city ?? "").toLowerCase().includes(q)
    ));
  }, [search, admins]);

  // ── Seat editing ──────────────────────────────────────────────────────────
  const openEdit   = (admin: AdminRow, course: string) => {
    setEditKey({ adminId: admin._id, course });
    setEditVal(String(admin.allocations[course]?.allocated ?? 0));
  };
  const cancelEdit = () => { setEditKey(null); setEditVal(""); };

  const saveEdit = async () => {
    if (!editKey) return;
    const seats = parseInt(editVal);
    if (isNaN(seats) || seats < 0) return;
    setSaving(true);
    try {
      await apiPost("/admin/allocate", { adminId: editKey.adminId, course: editKey.course, seats });
      setAdmins(prev => prev.map(a => {
        if (a._id !== editKey.adminId) return a;
        const used = a.allocations[editKey.course]?.used ?? 0;
        return { ...a, allocations: { ...a.allocations, [editKey.course]: { allocated: seats, used } } };
      }));
      flash(`Set ${editKey.course} → ${seats} seats`);
      setEditKey(null); setEditVal("");
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to save", "error");
    } finally { setSaving(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  const addSeats = (delta: number) => setEditVal(v => String(Math.max(0, (parseInt(v) || 0) + delta)));

  // ── Profile panel ─────────────────────────────────────────────────────────
  const openProfile = (admin: AdminRow) => {
    setProfileAdmin(admin);
    setProfileForm({
      name: admin.name, organisation: admin.organisation ?? "",
      contactNumber: admin.contactNumber ?? "", designation: admin.designation ?? "",
      city: admin.city ?? "", specialisation: admin.specialisation ?? "", website: admin.website ?? "",
    });
    setProfileEdit(false);
  };

  const saveProfile = async () => {
    if (!profileAdmin) return;
    setProfileSaving(true);
    try {
      const d = await apiPatch<{ admin: AdminRow }>(`/admin/admins/${profileAdmin._id}/profile`, profileForm);
      const updated = { ...profileAdmin, ...d.admin };
      setAdmins(prev => prev.map(a => a._id === updated._id ? { ...a, ...updated } : a));
      setProfileAdmin(updated);
      setProfileEdit(false);
      flash("Profile updated");
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to save profile", "error");
    } finally { setProfileSaving(false); }
  };

  const resendInvite = async (admin: AdminRow) => {
    setResending(true);
    try {
      await apiPost("/admin/invite-admin", { email: admin.email });
      flash(`Invite resent to ${admin.email}`);
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to resend", "error");
    } finally { setResending(false); }
  };

  // ── Invite admin ──────────────────────────────────────────────────────────
  const sendInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    try {
      const d = await apiPost<{ action: string; message: string; admin: AdminRow }>("/admin/invite-admin", {
        email: inviteEmail.trim(), name: inviteName.trim() || undefined,
      });
      flash(d.message);
      setShowInvite(false);
      setInviteEmail(""); setInviteName("");
      setAdmins(prev => {
        const exists = prev.find(a => a._id === d.admin._id);
        if (exists) return prev.map(a => a._id === d.admin._id ? { ...a, ...d.admin } : a);
        return [{ ...d.admin }, ...prev];
      });
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to send invite", "error");
    } finally { setInviting(false); }
  };

  // ── Derived stats ─────────────────────────────────────────────────────────
  const totalUsed      = admins.reduce((s, a) => s + Object.values(a.allocations).reduce((ss, v) => ss + v.used, 0), 0);
  const totalAllocated = admins.reduce((s, a) => s + Object.values(a.allocations).reduce((ss, v) => ss + v.allocated, 0), 0);
  const pendingCount   = admins.filter(isPending).length;

  return (
    <div className="relative">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Super Admin</p>
          <h1 className="text-2xl font-bold text-slate-800">Manage Admins</h1>
        </div>
        <div className="flex items-center gap-3">
          {toast && (
            <div className={`text-sm px-4 py-2 rounded-xl font-medium border ${
              toast.type === "error" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
            }`}>{toast.msg}</div>
          )}
          <button onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 bg-[#1E2A44] hover:bg-[#141C2E] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Admin
          </button>
        </div>
      </div>

      {/* ── Summary strip ── */}
      {admins.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "Admins",           value: admins.length },
            { label: "Pending Setup",    value: pendingCount,  color: pendingCount > 0 ? "text-amber-600" : undefined },
            { label: "Total Allocated",  value: totalAllocated.toLocaleString() },
            { label: "Seats Used",       value: `${totalUsed} (${totalAllocated ? Math.round((totalUsed / totalAllocated) * 100) : 0}%)` },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{s.label}</p>
              <p className={`text-xl font-bold ${s.color ?? "text-slate-800"}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Pending banner ── */}
      {pendingCount > 0 && (
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800">
          <svg className="w-4 h-4 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            <strong>{pendingCount} admin{pendingCount !== 1 ? "s" : ""}</strong> {pendingCount !== 1 ? "have" : "has"} not yet accepted their invitation.
            Seat quotas unlock once they set their password and log in.
          </span>
        </div>
      )}

      {/* ── Search bar ── */}
      {!loading && admins.length > 0 && (
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search by name, email, org, city…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 focus:border-[#1E2A44] bg-white"
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs">✕</button>
            )}
          </div>
          <p className="text-xs text-slate-400">
            Click <span className="font-semibold text-slate-600">name</span> for profile ·
            Click <span className="font-semibold text-slate-600">course cell</span> to set seat quota
          </p>
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && admins.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-slate-700 font-semibold mb-1">No admins yet</p>
          <p className="text-sm text-slate-400 mb-5">Invite someone as Admin, or promote an existing user from All Users.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setShowInvite(true)}
              className="px-4 py-2 rounded-xl bg-[#1E2A44] text-white text-sm font-semibold hover:bg-[#141C2E] transition-colors">
              Invite Admin
            </button>
            <Link to="/panel/super/users"
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
              All Users
            </Link>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
        </div>
      )}

      {/* ── Admin table ── */}
      {!loading && admins.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">No admins match "{search}"</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 min-w-[220px]">Admin</th>
                    {COURSES.map((c) => (
                      <th key={c} className="text-center px-4 py-3 text-[10px] font-bold uppercase tracking-wider min-w-[130px]"
                        style={{ color: COURSE_COLOR[c] }}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((a) => {
                    const pending = isPending(a);
                    return (
                      <tr key={a._id} className={`transition-colors ${pending ? "bg-amber-50/30 hover:bg-amber-50/60" : "hover:bg-slate-50/40"}`}>
                        {/* Admin info */}
                        <td className="px-5 py-4">
                          <div className="flex items-start gap-2.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 mt-0.5"
                              style={{ background: pending ? "#D97706" : "#1E2A44" }}>
                              {a.name[0].toUpperCase()}
                            </div>
                            <div>
                              <button onClick={() => openProfile(a)} className="text-left group">
                                <p className="font-semibold text-[#1E2A44] group-hover:text-blue-600 underline underline-offset-2 decoration-dotted transition-colors leading-tight">
                                  {a.name}
                                </p>
                              </button>
                              <p className="text-slate-400 text-xs mt-0.5">{a.email}</p>
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                {pending ? (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    Pending
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    Active
                                  </span>
                                )}
                                {a.organisation && (
                                  <span className="text-slate-400 text-[10px]">{a.organisation}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Course seat cells */}
                        {COURSES.map((c) => {
                          const alloc     = a.allocations[c];
                          const isEditing = editKey?.adminId === a._id && editKey?.course === c;
                          const used      = alloc?.used ?? 0;
                          const allocated = alloc?.allocated ?? 0;
                          const remaining = allocated - used;
                          const pct       = allocated ? Math.min(100, Math.round((used / allocated) * 100)) : 0;
                          const isFull    = allocated > 0 && remaining <= 0;
                          const isEmpty   = allocated === 0;

                          if (pending) {
                            return (
                              <td key={c} className="px-4 py-3 text-center">
                                <span className="text-[9px] font-semibold text-amber-400 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                  Awaiting activation
                                </span>
                              </td>
                            );
                          }

                          return (
                            <td key={c} className="px-4 py-3 text-center align-middle">
                              {isEditing ? (
                                <div className="inline-flex flex-col items-center gap-2 w-full max-w-[160px]">
                                  <div className="flex gap-1">
                                    {[10, 50, 100].map((d) => (
                                      <button key={d} type="button" onClick={() => addSeats(d)}
                                        className="text-[10px] px-1.5 py-0.5 rounded font-bold text-white hover:opacity-80 transition-colors"
                                        style={{ background: COURSE_COLOR[c] }}>
                                        +{d}
                                      </button>
                                    ))}
                                  </div>
                                  <input
                                    ref={inputRef}
                                    type="number" min={0} max={99999}
                                    value={editVal}
                                    onChange={(e) => setEditVal(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full text-center px-2 py-1.5 rounded-lg border-2 text-sm font-bold focus:outline-none"
                                    style={{ borderColor: COURSE_COLOR[c], color: COURSE_COLOR[c] }}
                                  />
                                  <div className="flex gap-1.5 w-full">
                                    <button onClick={cancelEdit}
                                      className="flex-1 py-1 text-[11px] rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 font-medium transition-colors">
                                      Cancel
                                    </button>
                                    <button onClick={saveEdit} disabled={saving}
                                      className="flex-1 py-1 text-[11px] rounded-lg font-bold text-white transition-colors disabled:opacity-50"
                                      style={{ background: COURSE_COLOR[c] }}>
                                      {saving ? "…" : "Save"}
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button onClick={() => openEdit(a, c)}
                                  className="group w-full flex flex-col items-center gap-1 px-2 py-2 rounded-xl hover:bg-slate-50 transition-colors">
                                  {isEmpty ? (
                                    <span className="text-slate-300 text-xs font-medium group-hover:text-slate-500 transition-colors flex items-center gap-1">
                                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                      </svg>
                                      Set quota
                                    </span>
                                  ) : (
                                    <>
                                      <div className="flex items-baseline gap-0.5">
                                        <span className="text-sm font-bold" style={{ color: isFull ? "#ef4444" : COURSE_COLOR[c] }}>
                                          {remaining}
                                        </span>
                                        <span className="text-[10px] text-slate-400"> / {allocated}</span>
                                      </div>
                                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full transition-all"
                                          style={{ width: `${pct}%`, background: isFull ? "#ef4444" : COURSE_COLOR[c] }} />
                                      </div>
                                      <span className="text-[9px] text-slate-400 group-hover:text-slate-600 transition-colors">
                                        {used} used · click to edit
                                      </span>
                                    </>
                                  )}
                                </button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── Invite Admin slide-in panel ── */}
      {showInvite && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => { setShowInvite(false); setInviteEmail(""); setInviteName(""); }} />
          <div className="fixed right-0 top-0 bottom-0 z-50 w-[390px] bg-white shadow-2xl flex flex-col border-l border-slate-200">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg,#1E2A44,#263354)" }}>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/50">Super Admin</p>
                <p className="font-bold text-white text-[16px] mt-0.5">Create Admin Account</p>
              </div>
              <button onClick={() => { setShowInvite(false); setInviteEmail(""); setInviteName(""); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 transition-colors">✕</button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* How it works */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How it works
                </p>
                <ol className="space-y-1.5 text-xs text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">1</span>
                    Enter the email address of the person you want to make an admin
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">2</span>
                    They receive an invitation email with a secure link (valid 7 days)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">3</span>
                    They click the link, set their password, and log in
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">4</span>
                    Status changes from <strong>Pending</strong> to <strong>Active</strong> — you can then assign seat quotas
                  </li>
                </ol>
              </div>

              {/* Email input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="admin@hospital.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !inviting && sendInvite()}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 focus:border-[#1E2A44]"
                  autoFocus
                />
              </div>

              {/* Name input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Name <span className="text-slate-300 font-normal normal-case text-[10px]">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Dr. Firstname Lastname"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !inviting && sendInvite()}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 focus:border-[#1E2A44]"
                />
                <p className="text-[10px] text-slate-400 mt-1">Defaults to the email prefix if left empty</p>
              </div>

              {/* Edge-case info box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 space-y-1.5">
                <p className="font-semibold text-slate-600 text-[11px]">What happens if the email already exists?</p>
                <p>• <strong>Existing regular user</strong> → promoted to Admin immediately, notification email sent</p>
                <p>• <strong>Pending admin</strong> → invitation email resent with a fresh 7-day link</p>
                <p>• <strong>Already active admin</strong> → error shown (no duplicate)</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-100">
              <button
                onClick={sendInvite}
                disabled={inviting || !inviteEmail.trim()}
                className="w-full py-3 rounded-xl bg-[#1E2A44] text-white text-sm font-bold hover:bg-[#141C2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {inviting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending Invitation…</>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Invitation
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Profile side panel ── */}
      {profileAdmin && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => { setProfileAdmin(null); setProfileEdit(false); }} />
          <div className="fixed right-0 top-0 bottom-0 z-50 w-[380px] bg-white shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden">
            {/* Panel header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: isPending(profileAdmin) ? "#D97706" : "#1E2A44" }}>
                  {profileAdmin.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-[15px] leading-tight">{profileAdmin.name}</p>
                  {isPending(profileAdmin) ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Pending Activation
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Active
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => { setProfileAdmin(null); setProfileEdit(false); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 transition-colors">✕</button>
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Pending warning + resend */}
              {isPending(profileAdmin) && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs text-amber-700 font-medium mb-3 leading-relaxed">
                    This admin has not yet accepted their invitation and set a password.
                    Seat quotas will unlock once they log in.
                  </p>
                  <button
                    onClick={() => resendInvite(profileAdmin)}
                    disabled={resending}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {resending ? (
                      <div className="w-3 h-3 border border-amber-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    Resend Invitation Email
                  </button>
                </div>
              )}

              {!profileEdit ? (
                <div className="space-y-3">
                  {[
                    { label: "Email",          value: profileAdmin.email },
                    { label: "Designation",    value: profileAdmin.designation },
                    { label: "Organisation",   value: profileAdmin.organisation },
                    { label: "Specialisation", value: profileAdmin.specialisation },
                    { label: "Contact",        value: profileAdmin.contactNumber },
                    { label: "City",           value: profileAdmin.city },
                    { label: "Website",        value: profileAdmin.website },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
                      <span className={`text-sm ${value ? "text-slate-800 font-medium" : "text-slate-300 italic"}`}>
                        {value || "—"}
                      </span>
                    </div>
                  ))}

                  {!isPending(profileAdmin) && (
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Seat Allocation</p>
                      <div className="space-y-2.5">
                        {COURSES.map((c) => {
                          const alloc = profileAdmin.allocations[c];
                          const used  = alloc?.used ?? 0;
                          const total = alloc?.allocated ?? 0;
                          const pct   = total ? Math.min(100, Math.round((used / total) * 100)) : 0;
                          return (
                            <div key={c}>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs capitalize font-medium text-slate-600">{c}</span>
                                <span className="text-xs text-slate-500">{used} / {total || "—"}</span>
                              </div>
                              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: COURSE_COLOR[c] }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    { key: "name",           label: "Name",           type: "text" },
                    { key: "designation",    label: "Designation",    type: "text", placeholder: "e.g. Dr., Sr. Consultant" },
                    { key: "organisation",   label: "Organisation",   type: "text", placeholder: "Hospital / Clinic name" },
                    { key: "specialisation", label: "Specialisation", type: "text", placeholder: "e.g. IVF, Gynaecology" },
                    { key: "contactNumber",  label: "Contact Number", type: "tel",  placeholder: "+91 9876543210" },
                    { key: "city",           label: "City",           type: "text", placeholder: "City, State" },
                    { key: "website",        label: "Website",        type: "url",  placeholder: "https://…" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</label>
                      <input
                        type={type} placeholder={placeholder}
                        value={(profileForm as any)[key] ?? ""}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 focus:border-[#1E2A44]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Panel footer */}
            <div className="px-5 py-4 border-t border-slate-100 flex gap-2.5">
              {!profileEdit ? (
                <button onClick={() => setProfileEdit(true)}
                  className="flex-1 py-2.5 rounded-xl bg-[#1E2A44] text-white text-sm font-semibold hover:bg-[#141C2E] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <>
                  <button onClick={() => setProfileEdit(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={saveProfile} disabled={profileSaving}
                    className="flex-1 py-2.5 rounded-xl bg-[#1E2A44] text-white text-sm font-semibold hover:bg-[#141C2E] transition-colors disabled:opacity-50">
                    {profileSaving ? "Saving…" : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
