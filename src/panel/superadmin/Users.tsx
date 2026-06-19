import { useEffect, useState, useCallback, useRef } from "react";
import { apiGet, apiPatch, apiPost, apiDelete } from "../../lib/api";
import { COURSES, COURSE_COLOR, COURSE_LECTURES } from "../shared/lectureConfig";

// null = all lectures accessible, [] = none granted, [...] = specific lectures
type CourseLectures = Record<string, string[] | null>;

type UserRow = {
  _id: string; name: string; email: string;
  systemRole: "user" | "admin" | "superadmin";
  isVerified: boolean; createdAt: string;
  courses: string[];
  courseLectures: CourseLectures;
};

type Toast   = { msg: string; type: "success" | "error" };
type DropPos = { userId: string; course: string; top: number; left: number };

function CheckBox({ checked, color }: { checked: boolean; color: string }) {
  return (
    <div
      className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all"
      style={checked
        ? { borderColor: color, backgroundColor: color }
        : { borderColor: "#cbd5e1", backgroundColor: "transparent" }}
    >
      {checked && (
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
          <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default function AllUsers() {
  const [users,        setUsers]        = useState<UserRow[]>([]);
  const [total,        setTotal]        = useState(0);
  const [page,         setPage]         = useState(1);
  const [pages,        setPages]        = useState(1);
  const [search,       setSearch]       = useState("");
  const [loading,      setLoading]      = useState(true);
  const [toast,        setToast]        = useState<Toast | null>(null);
  const [busy,         setBusy]         = useState<string | null>(null);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});

  // Lecture manage dropdown (clicking an already-granted badge)
  const [drop,    setDrop]    = useState<DropPos | null>(null);
  const dropRef               = useRef<HTMLDivElement>(null);

  // Grant confirmation modal (clicking a not-yet-granted badge)
  const [grantModal,    setGrantModal]    = useState<{ user: UserRow; course: string } | null>(null);
  const [modalAllLecs,  setModalAllLecs]  = useState(false);
  const [modalSelLecs,  setModalSelLecs]  = useState<string[]>([]);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = (msg: string, type: Toast["type"] = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async (p = page, q = search) => {
    setLoading(true);
    try {
      const d = await apiGet<{ users: UserRow[]; total: number; pages: number }>(
        `/admin/users?page=${p}&search=${encodeURIComponent(q)}`
      );
      setUsers(d.users); setTotal(d.total); setPages(d.pages);
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    apiGet<{ availability: Record<string, string[]> }>("/admin/r2-availability")
      .then((d) => setAvailability(d.availability))
      .catch(() => {});
  }, []);

  // Refresh when tab regains focus — keeps data in sync with admin panel changes
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [load]);

  // Close dropdown on outside click / scroll
  useEffect(() => {
    if (!drop) return;
    const onMouse  = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDrop(null);
    };
    const onScroll = () => setDrop(null);
    document.addEventListener("mousedown", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, [drop]);

  const handleSearch = (val: string) => {
    setSearch(val); setPage(1);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => load(1, val), 400);
  };

  const toggleRole = async (u: UserRow) => {
    const next = u.systemRole === "admin" ? "user" : "admin";
    if (!confirm(`${u.systemRole === "admin" ? "Demote to user" : "Promote to admin"}: ${u.name}?`)) return;
    setBusy(`role-${u._id}`);
    try {
      await apiPatch(`/admin/users/${u._id}/system-role`, { systemRole: next });
      flash(`${u.name} → ${next}`);
      load();
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to update role", "error");
    } finally { setBusy(null); }
  };

  const deleteUser = async (u: UserRow) => {
    if (!confirm(`Permanently delete "${u.name}" (${u.email})?\n\nThis removes all course access and cannot be undone.`)) return;
    setBusy(`del-${u._id}`); setDrop(null);
    try {
      await apiDelete(`/admin/users/${u._id}`);
      flash(`Deleted: ${u.name}`); load();
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to delete user", "error");
    } finally { setBusy(null); }
  };

  const revokeAccess = async (u: UserRow, course: string) => {
    setBusy(`access-${u._id}-${course}`); setDrop(null);
    try {
      await apiDelete(`/admin/users/${u._id}/access/${course}`);
      flash(`Revoked ${course} from ${u.name}`); load();
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to revoke access", "error");
    } finally { setBusy(null); }
  };

  // Badge click: gray = open grant modal, colored = open lecture dropdown
  const handleBadgeClick = (e: React.MouseEvent<HTMLButtonElement>, u: UserRow, course: string, has: boolean) => {
    if (!has) {
      setGrantModal({ user: u, course });
      setModalAllLecs(false);
      setModalSelLecs([]);
      return;
    }
    if (drop?.userId === u._id && drop?.course === course) { setDrop(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    setDrop({ userId: u._id, course, top: rect.bottom + 6, left: rect.left });
  };

  // Confirm grant from modal
  const confirmGrant = async () => {
    if (!grantModal) return;
    const { user, course } = grantModal;
    const lectures = modalAllLecs ? null : modalSelLecs;
    setGrantModal(null);
    setBusy(`access-${user._id}-${course}`);
    try {
      await apiPost(`/admin/users/${user._id}/access`, { course, lectures });
      flash(`Granted ${course} to ${user.name}`); load();
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to grant access", "error");
    } finally { setBusy(null); }
  };

  // Optimistic lecture patch helper
  const patchLectures = async (userId: string, course: string, prev: string[] | null, next: string[] | null) => {
    setUsers(us => us.map(u => u._id === userId
      ? { ...u, courseLectures: { ...u.courseLectures, [course]: next } } : u
    ));
    try {
      await apiPatch(`/admin/users/${userId}/access/${course}/lectures`, { lectures: next });
    } catch (err) {
      setUsers(us => us.map(u => u._id === userId
        ? { ...u, courseLectures: { ...u.courseLectures, [course]: prev } } : u
      ));
      flash(err instanceof Error ? err.message : "Failed to update lectures", "error");
    }
  };

  const toggleLecture = (userId: string, course: string, lecture: string) => {
    const user = users.find(u => u._id === userId);
    if (!user) return;
    const prev = user.courseLectures[course] ?? null;
    const all  = COURSE_LECTURES[course] || [];
    let next: string[] | null;
    if (prev === null) {
      // All unlocked → lock every lecture except this one
      next = all.filter(l => l !== lecture);
    } else if (prev.includes(lecture)) {
      // Unlocked → lock it
      next = prev.filter(l => l !== lecture);
    } else {
      // Locked → unlock it; normalise to null if all are now unlocked
      const added = [...prev, lecture];
      next = added.length === all.length ? null : added;
    }
    patchLectures(userId, course, prev, next);
  };

  const unlockAll = (userId: string, course: string) => {
    const user = users.find(u => u._id === userId);
    if (!user) return;
    const prev = user.courseLectures[course] ?? null;
    if (prev === null) return;
    patchLectures(userId, course, prev, null);
  };

  const dropUser    = drop ? users.find(u => u._id === drop.userId) : null;
  const dropLectures = drop && dropUser ? (dropUser.courseLectures[drop.course] ?? null) : null;
  const dropAllLecs = drop ? (COURSE_LECTURES[drop.course] || []) : [];

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Super Admin</p>
          <h1 className="text-2xl font-bold text-slate-800">
            All Users <span className="text-slate-400 font-normal text-lg">({total.toLocaleString()})</span>
          </h1>
        </div>
        {toast && (
          <div className={`text-sm px-4 py-2 rounded-xl font-medium border ${
            toast.type === "error" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
          }`}>{toast.msg}</div>
        )}
      </div>

      {/* ── Search ── */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search by name or email..."
            value={search} onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 focus:border-[#1E2A44] bg-white"
          />
        </div>
        <button onClick={() => load()}
          className="px-4 py-2 text-sm rounded-xl border border-slate-200 hover:bg-white bg-slate-50 text-slate-600 font-medium transition-colors">
          Refresh
        </button>
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <p className="text-xs text-slate-400">Click gray to grant · Click colored to manage lectures:</p>
        {COURSES.map((c) => (
          <span key={c} className="text-[10px] px-2 py-0.5 rounded font-semibold text-white capitalize" style={{ background: COURSE_COLOR[c] }}>{c}</span>
        ))}
        <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-400">not granted</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-400">{search ? `No users matching "${search}"` : "No users found"}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {["Name / Email", "System Role", "Course Access", "Joined", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Name */}
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800 leading-tight">{u.name}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{u.email}</p>
                      {!u.isVerified && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 font-semibold mt-0.5 inline-block">unverified</span>
                      )}
                    </td>
                    {/* Role */}
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                        u.systemRole === "superadmin" ? "bg-amber-100 text-amber-700" :
                        u.systemRole === "admin"      ? "bg-blue-100 text-blue-700" :
                                                        "bg-slate-100 text-slate-500"
                      }`}>{u.systemRole}</span>
                    </td>
                    {/* Course badges */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {COURSES.map((c) => {
                          const has     = u.courses.includes(c);
                          const lecs    = has ? (u.courseLectures[c] ?? null) : undefined;
                          const isBusy  = busy === `access-${u._id}-${c}`;
                          const isOpen  = drop?.userId === u._id && drop?.course === c;
                          // lecs === null → all accessible; [] → none; [...] → partial
                          const noLecs  = Array.isArray(lecs) && lecs.length === 0;
                          const partLecs = Array.isArray(lecs) && lecs.length > 0;
                          const allLecs  = lecs === null;

                          return (
                            <button
                              key={c}
                              onClick={(e) => !isBusy && handleBadgeClick(e, u, c, has)}
                              disabled={!!busy}
                              title={
                                !has      ? `Grant ${c}` :
                                allLecs   ? `All lectures · click to manage` :
                                noLecs    ? `No lectures granted · click to manage` :
                                            `${(lecs as string[]).length} lectures · click to manage`
                              }
                              className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-semibold capitalize transition-all min-w-[60px] justify-center ${
                                isBusy ? "opacity-50 cursor-wait" :
                                has    ? "text-white hover:opacity-80 cursor-pointer" :
                                         "bg-slate-100 text-slate-400 hover:bg-slate-200 cursor-pointer"
                              } ${isOpen ? "ring-2 ring-offset-1 ring-white" : ""}`}
                              style={has ? { background: COURSE_COLOR[c] } : {}}
                            >
                              {isBusy ? "…" : (
                                <>
                                  {c}
                                  {has && (
                                    noLecs ? (
                                      <svg className="w-2.5 h-2.5 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                    ) : partLecs ? (
                                      <svg className="w-2.5 h-2.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                      </svg>
                                    ) : (
                                      <svg className={`w-2 h-2 opacity-70 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                      </svg>
                                    )
                                  )}
                                </>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    {/* Joined */}
                    <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      {u.systemRole !== "superadmin" && (
                        <div className="flex items-center gap-2">
                          <button onClick={() => toggleRole(u)} disabled={!!busy}
                            className="text-[11px] px-3 py-1.5 rounded-lg border font-medium transition-colors hover:bg-[#1E2A44] hover:text-white hover:border-[#1E2A44] border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-wait whitespace-nowrap">
                            {busy === `role-${u._id}` ? "…" : u.systemRole === "admin" ? "Demote" : "Make Admin"}
                          </button>
                          <button onClick={() => deleteUser(u)} disabled={!!busy} title={`Delete ${u.name}`}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-wait">
                            {busy === `del-${u._id}` ? (
                              <span className="block w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pages > 1 && (
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <p className="text-xs text-slate-400">Page {page} of {pages} · {total.toLocaleString()} users</p>
              <div className="flex items-center gap-2">
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1 text-sm rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-white font-medium">← Prev</button>
                <button disabled={page === pages} onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 text-sm rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-white font-medium">Next →</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Lecture manage dropdown (position: fixed to escape table overflow) ── */}
      {drop && dropUser && (
        <div
          ref={dropRef}
          style={{ position: "fixed", top: drop.top, left: drop.left, zIndex: 9999 }}
          className="w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100"
            style={{ backgroundColor: COURSE_COLOR[drop.course] + "18" }}>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: COURSE_COLOR[drop.course] }}>
                {drop.course}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {dropLectures === null
                  ? `All ${dropAllLecs.length} lectures unlocked`
                  : dropLectures.length === 0
                    ? "No lectures granted"
                    : `${dropLectures.length} / ${dropAllLecs.length} lectures`}
              </p>
            </div>
            <button onClick={() => setDrop(null)}
              className="text-slate-400 hover:text-slate-600 w-6 h-6 flex items-center justify-center text-sm rounded hover:bg-slate-100">✕</button>
          </div>

          {/* All lectures row */}
          {(() => {
            const avail = availability[drop.course] ?? [];
            const availCount = Object.keys(availability).length > 0
              ? dropAllLecs.filter(l => avail.includes(l)).length
              : dropAllLecs.length;
            const noneReady = Object.keys(availability).length > 0 && availCount === 0;
            const allReady  = availCount === dropAllLecs.length;
            return (
              <button
                onClick={() => !noneReady && unlockAll(drop.userId, drop.course)}
                disabled={noneReady}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-50 border-b border-slate-100 transition-colors text-left disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckBox checked={dropLectures === null} color={COURSE_COLOR[drop.course]} />
                <span className="text-[12px] font-semibold text-slate-700 flex-1">All lectures</span>
                {!allReady && Object.keys(availability).length > 0 && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200 flex-shrink-0">
                    {availCount}/{dropAllLecs.length} ready
                  </span>
                )}
              </button>
            );
          })()}

          {/* Individual lectures */}
          <div className="max-h-52 overflow-y-auto">
            {dropAllLecs.map((lec) => {
              const uploaded  = (availability[drop.course] ?? []).includes(lec);
              const notReady  = Object.keys(availability).length > 0 && !uploaded;
              const unlocked  = !notReady && (dropLectures === null || dropLectures.includes(lec));
              return (
                <button key={lec}
                  disabled={notReady}
                  title={notReady ? "Video not yet uploaded to Cloudflare R2" : undefined}
                  onClick={() => !notReady && toggleLecture(drop.userId, drop.course, lec)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors text-left disabled:cursor-not-allowed disabled:opacity-50">
                  <CheckBox checked={unlocked} color={COURSE_COLOR[drop.course]} />
                  <span className="text-[12px] text-slate-600 flex-1">{lec}</span>
                  {notReady && (
                    <span className="text-[9px] font-semibold px-1 py-0.5 rounded bg-slate-100 text-slate-400 uppercase tracking-wide flex-shrink-0">
                      N/A
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Revoke */}
          <div className="border-t border-slate-100 p-2">
            <button onClick={() => revokeAccess(dropUser, drop.course)} disabled={!!busy}
              className="w-full text-[11px] py-1.5 rounded-lg text-red-500 hover:bg-red-50 font-medium transition-colors disabled:opacity-50">
              Revoke Access
            </button>
          </div>
        </div>
      )}

      {/* ── Grant confirmation modal ── */}
      {grantModal && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onMouseDown={(e) => { if (e.target === e.currentTarget) setGrantModal(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-[340px] overflow-hidden">
            {/* Modal header */}
            <div className="px-5 py-4 border-b border-slate-100"
              style={{ background: COURSE_COLOR[grantModal.course] + "14" }}>
              <p className="text-[10px] font-mono uppercase tracking-wider mb-1"
                style={{ color: COURSE_COLOR[grantModal.course] }}>Grant Course Access</p>
              <h3 className="font-bold text-slate-800 text-[17px] capitalize leading-tight">
                {grantModal.course}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                → {grantModal.user.name} · {grantModal.user.email}
              </p>
            </div>

            {/* Lecture selection */}
            <div className="px-4 pt-3 pb-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Lectures to Grant
              </p>

              {/* All lectures toggle */}
              {(() => {
                const avail = availability[grantModal.course] ?? [];
                const allLecs = COURSE_LECTURES[grantModal.course] || [];
                const availCount = Object.keys(availability).length > 0
                  ? allLecs.filter(l => avail.includes(l)).length
                  : allLecs.length;
                const noneReady = Object.keys(availability).length > 0 && availCount === 0;
                const allReady  = availCount === allLecs.length;
                return (
                  <button
                    disabled={noneReady}
                    onClick={() => { if (!noneReady) { setModalAllLecs(v => !v); if (!modalAllLecs) setModalSelLecs([]); } }}
                    className="w-full flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-slate-50 transition-colors text-left disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CheckBox checked={modalAllLecs} color={COURSE_COLOR[grantModal.course]} />
                    <span className="text-[13px] font-semibold text-slate-700 flex-1">All lectures</span>
                    {!allReady && Object.keys(availability).length > 0 && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200 flex-shrink-0">
                        {availCount}/{allLecs.length} ready
                      </span>
                    )}
                  </button>
                );
              })()}

              {/* Divider */}
              <div className="border-t border-slate-100 my-1" />

              {/* Individual lectures — unchecked by default */}
              <div className="max-h-44 overflow-y-auto">
                {(COURSE_LECTURES[grantModal.course] || []).map((lec) => {
                  const uploaded  = (availability[grantModal.course] ?? []).includes(lec);
                  const notReady  = Object.keys(availability).length > 0 && !uploaded;
                  const isDisabled = modalAllLecs || notReady;
                  const checked   = !notReady && (modalAllLecs || modalSelLecs.includes(lec));
                  return (
                    <button
                      key={lec}
                      disabled={isDisabled}
                      title={notReady ? "Video not yet uploaded to Cloudflare R2" : undefined}
                      onClick={() => {
                        if (isDisabled) return;
                        setModalSelLecs(prev =>
                          prev.includes(lec) ? prev.filter(l => l !== lec) : [...prev, lec]
                        );
                      }}
                      className="w-full flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-slate-50 transition-colors text-left disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckBox checked={checked} color={COURSE_COLOR[grantModal.course]} />
                      <span className="text-[12px] text-slate-600 flex-1">{lec}</span>
                      {notReady && (
                        <span className="text-[9px] font-semibold px-1 py-0.5 rounded bg-slate-100 text-slate-400 uppercase tracking-wide flex-shrink-0">
                          Not uploaded
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4 pt-2 flex gap-2.5">
              <button onClick={() => setGrantModal(null)}
                className="flex-1 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                Cancel
              </button>
              <button
                onClick={confirmGrant}
                disabled={!modalAllLecs && modalSelLecs.length === 0}
                className="flex-1 py-2.5 text-sm rounded-xl font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: COURSE_COLOR[grantModal.course] }}
              >
                Grant Access
                {(modalAllLecs || modalSelLecs.length > 0) && (
                  <span className="ml-1 opacity-80">
                    ({modalAllLecs ? "all" : modalSelLecs.length})
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
