import { useEffect, useState } from "react";
import { apiGet, apiPut, apiDelete } from "../../lib/api";

// Canonical lecture definitions per course
const COURSE_LECTURES: Record<string, { id: string; label: string }[]> = {
  Foundation: [
    { id: "l01", label: "L01 — HPO Axis: From Physiology to Precision" },
    { id: "l02", label: "L02 — The Endocrine Architecture of Follicular Phase" },
    { id: "l03", label: "L03 — Ovulation: From Follicle Destiny to Follicle Rupture" },
    { id: "l04", label: "L04 — Luteal Phase: Physiology, Endocrinology and Clinical Importance" },
    { id: "l05", label: "L05 — Spermatogenesis: From Germ Cell Development to Semen Analysis" },
    { id: "l06", label: "L06 — Implantation: From Endometrial Receptivity to Embryo Dialogue" },
  ],
};

const FOLDER_TO_COURSE: Record<string, string> = {
  Foundation: "foundation",
  Core: "core",
  Advance: "advanced",
  Masterclass: "masterclass",
};

type R2File = { key: string; name: string; size: number; lastModified: string };
type Mapping = { _id: string; course: string; lectureId: string; r2Key: string };

function fmtBytes(b: number) {
  if (b > 1_000_000_000) return (b / 1_000_000_000).toFixed(1) + " GB";
  if (b > 1_000_000) return (b / 1_000_000).toFixed(1) + " MB";
  return (b / 1_000).toFixed(0) + " KB";
}

export default function VideoMapping() {
  const [files, setFiles] = useState<Record<string, R2File[]>>({});
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null); // r2Key being saved
  const [pendingSelections, setPendingSelections] = useState<Record<string, string>>({}); // key → lectureId
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const load = () => {
    setLoading(true);
    Promise.all([
      apiGet<{ files: Record<string, R2File[]> }>("/admin/r2-files"),
      apiGet<{ mappings: Mapping[] }>("/admin/video-mapping"),
    ]).then(([f, m]) => {
      setFiles(f.files);
      setMappings(m.mappings);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  // Build a quick lookup: r2Key → mapping
  const mappingByKey: Record<string, Mapping> = {};
  mappings.forEach((m) => { mappingByKey[m.r2Key] = m; });

  const showMsg = (type: "ok" | "err", text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleSave = async (file: R2File, folder: string) => {
    const lectureId = pendingSelections[file.key];
    if (!lectureId) return;
    const course = FOLDER_TO_COURSE[folder];
    if (!course) return;
    setSaving(file.key);
    try {
      await apiPut("/admin/video-mapping", { course, lectureId, r2Key: file.key });
      showMsg("ok", `Mapped "${file.name}" to ${lectureId}`);
      // Remove pending selection and reload mappings
      setPendingSelections((prev) => { const n = { ...prev }; delete n[file.key]; return n; });
      const m = await apiGet<{ mappings: Mapping[] }>("/admin/video-mapping");
      setMappings(m.mappings);
    } catch (e: any) {
      showMsg("err", e.message || "Failed to save mapping");
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (mapping: Mapping) => {
    setSaving(mapping.r2Key);
    try {
      await apiDelete(`/admin/video-mapping/${mapping._id}`);
      showMsg("ok", "Mapping removed");
      setMappings((prev) => prev.filter((m) => m._id !== mapping._id));
    } catch (e: any) {
      showMsg("err", e.message || "Failed to remove mapping");
    } finally {
      setSaving(null);
    }
  };

  const folders = Object.keys(files).filter((f) => (files[f]?.length ?? 0) > 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Super Admin Panel</p>
        <h1 className="text-2xl font-bold text-slate-800">Video Mapping</h1>
        <p className="text-sm text-slate-400 mt-1">
          Link R2 video files to lecture slots — regardless of filename
        </p>
      </div>

      {/* Alert */}
      {msg && (
        <div className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium ${
          msg.type === "ok"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {msg.text}
        </div>
      )}

      {/* How it works */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-7 text-sm text-amber-800">
        <strong>How it works:</strong> If a video was uploaded with a different filename than the system
        expects, students can&apos;t access it even after paying. Map each R2 file to the correct lecture
        slot here and access will be granted immediately — no re-upload needed.
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading R2 files and mappings…</p>
      ) : folders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400">
          No video files found in R2.
        </div>
      ) : (
        folders.map((folder) => {
          const folderFiles = files[folder] ?? [];
          const lectures = COURSE_LECTURES[folder] ?? [];

          return (
            <div key={folder} className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6">
              {/* Folder header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-800">{folder} Course</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {folderFiles.length} file{folderFiles.length !== 1 ? "s" : ""} in R2 ·{" "}
                    {mappings.filter((m) => m.course === FOLDER_TO_COURSE[folder]).length} mapped
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-500 px-2.5 py-1 rounded">
                  R2 / {folder}/
                </span>
              </div>

              {/* Files table */}
              <div className="divide-y divide-slate-50">
                {folderFiles.map((file) => {
                  const existing = mappingByKey[file.key];
                  const existingLabel = lectures.find((l) => l.id === existing?.lectureId)?.label;
                  const isSavingThis = saving === file.key;
                  const pendingId = pendingSelections[file.key] ?? "";

                  return (
                    <div key={file.key} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                      {/* File info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono truncate">
                          {file.key} · {fmtBytes(file.size)}
                        </p>
                        {existing && (
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Mapped → {existingLabel ?? existing.lectureId}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Controls */}
                      {lectures.length > 0 ? (
                        <div className="flex items-center gap-2 shrink-0">
                          {existing ? (
                            <button
                              onClick={() => handleDelete(existing)}
                              disabled={isSavingThis}
                              className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {isSavingThis ? "Removing…" : "Remove mapping"}
                            </button>
                          ) : (
                            <>
                              <select
                                value={pendingId}
                                onChange={(e) =>
                                  setPendingSelections((prev) => ({ ...prev, [file.key]: e.target.value }))
                                }
                                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
                              >
                                <option value="">— Select lecture —</option>
                                {lectures.map((l) => {
                                  // Disable already-mapped lecture slots
                                  const alreadyMapped = mappings.some(
                                    (m) => m.course === FOLDER_TO_COURSE[folder] && m.lectureId === l.id
                                  );
                                  return (
                                    <option key={l.id} value={l.id} disabled={alreadyMapped}>
                                      {l.label}{alreadyMapped ? " (mapped)" : ""}
                                    </option>
                                  );
                                })}
                              </select>
                              <button
                                onClick={() => handleSave(file, folder)}
                                disabled={!pendingId || isSavingThis}
                                className="text-xs bg-[#21864E] text-white px-3.5 py-1.5 rounded-lg hover:bg-[#1a6e3e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                {isSavingThis ? "Saving…" : "Save"}
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No lecture config for this folder</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
