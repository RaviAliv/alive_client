import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { apiGet, apiPost } from "../../lib/api";
import { COURSES, COURSE_COLOR, COURSE_LECTURES } from "../shared/lectureConfig";

type Alloc = { course: string; allocatedSeats: number; usedSeats: number };
type GrantResult = { granted: number; invited: number; alreadyHadAccess: number; notFound: string[] };


function CheckBox({ checked, color, disabled }: { checked: boolean; color: string; disabled?: boolean }) {
  return (
    <div
      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${disabled ? "opacity-50" : ""}`}
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

export default function GrantAccess() {
  const [allocations,  setAllocations]  = useState<Alloc[]>([]);
  const [allocLoaded,  setAllocLoaded]  = useState(false);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [course,       setCourse]       = useState("foundation");
  const [allLectures,  setAllLectures]  = useState(true);
  const [selLectures,  setSelLectures]  = useState<string[]>([]);
  const [manualEmails, setManualEmails] = useState("");
  const [excelEmails,  setExcelEmails]  = useState<string[]>([]);
  const [fileName,     setFileName]     = useState("");
  const [submitting,   setSubmitting]   = useState(false);
  const [result,       setResult]       = useState<GrantResult | null>(null);
  const [error,        setError]        = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const refreshAlloc = async () => {
    try {
      const d = await apiGet<{ allocations: Alloc[] }>("/admin/my-allocation");
      setAllocations(d.allocations);
    } catch {
      // non-fatal
    } finally {
      setAllocLoaded(true);
    }
  };

  const refreshAvailability = () =>
    apiGet<{ availability: Record<string, string[]> }>("/admin/r2-availability")
      .then((d) => setAvailability(d.availability))
      .catch(() => {});

  useEffect(() => {
    refreshAlloc();
    refreshAvailability();
  }, []);

  // Refresh on tab focus so changes from superadmin panel are reflected immediately
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        refreshAlloc();
        refreshAvailability();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  // Reset lecture selection when course changes
  const handleCourseChange = (c: string) => {
    setCourse(c);
    setAllLectures(true);
    setSelLectures([]);
    setResult(null);
    setError("");
  };

  const toggleAllLectures = () => {
    setAllLectures(v => !v);
    if (!allLectures) setSelLectures([]); // clear individual when enabling "all"
  };

  const toggleLecture = (lec: string) => {
    if (allLectures) return;
    setSelLectures(prev =>
      prev.includes(lec) ? prev.filter(l => l !== lec) : [...prev, lec]
    );
  };

  const currentAlloc  = allocations.find((a) => a.course === course);
  const remaining     = currentAlloc ? currentAlloc.allocatedSeats - currentAlloc.usedSeats : 0;
  const lectureReady  = allLectures || selLectures.length > 0;
  const currentLecs   = COURSE_LECTURES[course] || [];
  const r2Loaded      = Object.keys(availability).length > 0;
  const availableLecs = r2Loaded ? currentLecs.filter(l => (availability[course] ?? []).includes(l)) : currentLecs;
  const allVideosReady = availableLecs.length === currentLecs.length;
  const noVideosReady  = r2Loaded && availableLecs.length === 0;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const wb = XLSX.read(evt.target?.result);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1 }) as unknown[][];
        const found: string[] = [];
        rows.forEach((row) => row.forEach((cell) => {
          const val = String(cell ?? "").trim().toLowerCase();
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) found.push(val);
        }));
        setExcelEmails([...new Set(found)]);
      } catch {
        setError("Could not read the file. Please check the format.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExcelEmails([]); setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const emailList = (): string[] => {
    const manual = manualEmails.split(/[\n,;]+/).map((e) => e.trim().toLowerCase()).filter(Boolean);
    return [...new Set([...manual, ...excelEmails])];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emails = emailList();
    if (!emails.length)   { setError("Enter at least one email address."); return; }
    if (!lectureReady)    { setError("Select at least one lecture to grant."); return; }
    setError(""); setResult(null); setSubmitting(true);
    try {
      const lectures = allLectures ? null : selLectures;
      const data = await apiPost<GrantResult>("/admin/grant", { emails, course, lectures });
      setResult(data);
      setManualEmails(""); setExcelEmails([]); setFileName("");
      setAllLectures(true); setSelLectures([]);
      if (fileRef.current) fileRef.current.value = "";
      refreshAlloc();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to grant access");
    } finally {
      setSubmitting(false);
    }
  };

  const emails = emailList();
  const color  = COURSE_COLOR[course];

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Admin Panel</p>
        <h1 className="text-2xl font-bold text-slate-800">Grant Course Access</h1>
      </div>

      {/* Quota banner */}
      {allocLoaded && (
        currentAlloc ? (
          <div className={`rounded-2xl p-4 mb-5 text-sm border ${
            remaining <= 0   ? "bg-red-50 border-red-200 text-red-800" :
            remaining < 10   ? "bg-amber-50 border-amber-200 text-amber-800" :
                               "bg-blue-50 border-blue-200 text-blue-800"
          }`}>
            <span className="capitalize font-semibold">{course}</span> quota:{" "}
            <span className="font-bold">{remaining} seat{remaining !== 1 ? "s" : ""} remaining</span>
            {" "}of {currentAlloc.allocatedSeats} allocated
            {remaining <= 0 && " — contact Super Admin to get more seats."}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 text-sm text-amber-800">
            No seat allocation for <strong className="capitalize">{course}</strong>. Contact your Super Admin.
          </div>
        )
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">

        {/* ── Course selector ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Course</label>
          <select value={course} onChange={(e) => handleCourseChange(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 bg-white">
            {COURSES.map((c) => (
              <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)} Series</option>
            ))}
          </select>
        </div>

        {/* ── Lecture selector ── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lectures to Grant</label>
            <div className="flex items-center gap-2">
              {!allLectures && selLectures.length > 0 && (
                <span className="text-[10px] font-semibold" style={{ color }}>
                  {selLectures.length} / {currentLecs.length} selected
                </span>
              )}
              <button
                type="button"
                onClick={refreshAvailability}
                title="Refresh R2 video availability"
                className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                R2
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            {/* All lectures row */}
            <button
              type="button"
              disabled={noVideosReady}
              onClick={noVideosReady ? undefined : toggleAllLectures}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckBox checked={allLectures} color={color} disabled={noVideosReady} />
              <span className="text-[13px] font-semibold text-slate-700 flex-1">All lectures</span>
              {allLectures && !noVideosReady && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded text-white" style={{ background: color }}>
                  Full access
                </span>
              )}
              {!allVideosReady && r2Loaded && !allLectures && (
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
                  {availableLecs.length}/{currentLecs.length} ready
                </span>
              )}
            </button>

            {/* Individual lectures */}
            <div className="divide-y divide-slate-50">
              {currentLecs.map((lec, i) => {
                const uploaded  = (availability[course] ?? []).includes(lec);
                const notReady  = Object.keys(availability).length > 0 && !uploaded;
                const isDisabled = allLectures || notReady;
                const checked   = !notReady && (allLectures || selLectures.includes(lec));
                return (
                  <button
                    key={lec}
                    type="button"
                    onClick={() => !notReady && toggleLecture(lec)}
                    disabled={isDisabled}
                    title={notReady ? "Video not yet uploaded to Cloudflare R2" : undefined}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CheckBox checked={checked} color={color} disabled={isDisabled} />
                    <span className={`text-[12px] ${checked ? "text-slate-700 font-medium" : "text-slate-500"}`}>
                      {lec}
                    </span>
                    <span className="ml-auto flex items-center gap-1.5">
                      {notReady && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 uppercase tracking-wide">
                          Not uploaded
                        </span>
                      )}
                      <span className="text-[10px] text-slate-300">#{i + 1}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {!lectureReady && (
            <p className="text-[11px] text-slate-400 mt-1.5">Select at least one lecture or choose "All lectures".</p>
          )}
        </div>

        {/* ── Manual emails ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
            Enter Emails
            {manualEmails && (
              <span className="ml-2 normal-case font-normal text-slate-500">
                ({manualEmails.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean).length} entered)
              </span>
            )}
          </label>
          <textarea value={manualEmails} onChange={(e) => { setManualEmails(e.target.value); setError(""); }} rows={5}
            placeholder={"user@example.com\nanother@email.com\n(one per line or comma-separated)"}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 resize-none font-mono leading-relaxed bg-white placeholder:text-slate-300" />
        </div>

        {/* ── Excel upload ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Or Upload Excel / CSV</label>
          <div
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
              fileName ? "border-[#1E2A44]/30 bg-[#1E2A44]/[0.02]" : "border-slate-200 hover:border-[#1E2A44]/30"
            }`}
            onClick={() => !fileName && fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="hidden" />
            {fileName ? (
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#1E2A44] truncate max-w-[250px]">{fileName}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {excelEmails.length} email{excelEmails.length !== 1 ? "s" : ""} detected
                  </p>
                </div>
                <button type="button" onClick={clearFile}
                  className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors">
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <svg className="w-8 h-8 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-slate-500 font-medium">Upload Excel or CSV</p>
                <p className="text-xs text-slate-400 mt-0.5">Emails auto-detected from any column</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Grant summary ── */}
        {emails.length > 0 && (
          <div className="bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-600 border border-slate-200">
            <div className="flex items-center justify-between">
              <span>
                Granting <strong className="capitalize">{course}</strong> to{" "}
                <strong>{emails.length}</strong> user{emails.length !== 1 ? "s" : ""}
              </span>
              {allocLoaded && currentAlloc && emails.length > remaining && (
                <span className="text-red-600 text-xs font-semibold">Exceeds quota ({remaining} left)</span>
              )}
            </div>
            {lectureReady && (
              <p className="text-xs mt-1" style={{ color }}>
                {allLectures
                  ? `All ${currentLecs.length} lectures`
                  : selLectures.join(", ")}
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <button type="submit"
          disabled={submitting || emails.length === 0 || !lectureReady || (allocLoaded && !!currentAlloc && emails.length > remaining)}
          className="w-full bg-[#1E2A44] hover:bg-[#141C2E] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2">
          {submitting ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
          ) : (
            `Grant Access to ${emails.length || 0} User${emails.length !== 1 ? "s" : ""}`
          )}
        </button>
      </form>

      {/* ── Result ── */}
      {result && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-green-800">Access granted successfully</h3>
          </div>
          <div className="space-y-1.5 text-sm text-green-700">
            {result.granted === 0 && result.invited === 0 ? (
              <p className="text-green-700 font-medium">No new grants — everyone already had access.</p>
            ) : (
              <p>
                <strong className="text-green-900">{result.granted}</strong> new grant{result.granted !== 1 ? "s" : ""} created successfully.
              </p>
            )}
            {result.invited > 0 && (
              <p className="flex items-center gap-1.5 text-green-600">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {result.invited} new account{result.invited !== 1 ? "s" : ""} created — invite email{result.invited !== 1 ? "s" : ""} sent with a link to set up their password.
              </p>
            )}
            {result.alreadyHadAccess > 0 && (
              <p className="text-green-500 text-xs">{result.alreadyHadAccess} user{result.alreadyHadAccess !== 1 ? "s" : ""} already had access (skipped)</p>
            )}
            {result.notFound && result.notFound.length > 0 && (
              <div className="mt-2 pt-2 border-t border-green-200">
                <p className="text-amber-700 text-xs font-semibold mb-1">{result.notFound.length} email{result.notFound.length !== 1 ? "s" : ""} not found:</p>
                <ul className="text-xs text-amber-600 space-y-0.5">
                  {result.notFound.map((e) => <li key={e} className="font-mono">{e}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
