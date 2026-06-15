import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { apiGet, apiPost } from "../../lib/api";

type Alloc = { course: string; allocatedSeats: number; usedSeats: number };
type GrantResult = { granted: number; alreadyHadAccess: number; notFound: string[] };

const COURSES = ["foundation", "core", "advanced", "masterclass"];
const COURSE_COLOR: Record<string, string> = {
  foundation: "#21864E", core: "#D4A621", advanced: "#1E5AA6", masterclass: "#C8102E",
};
const COURSE_LECTURES: Record<string, string[]> = {
  foundation:  ["Lecture 1", "Lecture 2", "Lecture 3", "Lecture 4", "Lecture 5"],
  core:        ["Lecture 1", "Lecture 2", "Lecture 3", "Lecture 4", "Lecture 5", "Lecture 6"],
  advanced:    ["Lecture 1", "Lecture 2", "Lecture 3", "Lecture 4", "Lecture 5"],
  masterclass: ["Lecture 1", "Lecture 2", "Lecture 3", "Lecture 4"],
};

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
  const [allocations, setAllocations] = useState<Alloc[]>([]);
  const [allocLoaded, setAllocLoaded]  = useState(false);
  const [course,      setCourse]       = useState("foundation");
  const [allLectures, setAllLectures]  = useState(false);
  const [selLectures, setSelLectures]  = useState<string[]>([]);
  const [manualEmails, setManualEmails] = useState("");
  const [excelEmails, setExcelEmails]  = useState<string[]>([]);
  const [fileName,    setFileName]     = useState("");
  const [submitting,  setSubmitting]   = useState(false);
  const [result,      setResult]       = useState<GrantResult | null>(null);
  const [error,       setError]        = useState("");
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

  useEffect(() => { refreshAlloc(); }, []);

  // Reset lecture selection when course changes
  const handleCourseChange = (c: string) => {
    setCourse(c);
    setAllLectures(false);
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

  const currentAlloc = allocations.find((a) => a.course === course);
  const remaining    = currentAlloc ? currentAlloc.allocatedSeats - currentAlloc.usedSeats : 0;
  const lectureReady = allLectures || selLectures.length > 0;
  const currentLecs  = COURSE_LECTURES[course] || [];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const wb = XLSX.read(evt.target?.result, { type: "binary" });
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
    reader.readAsBinaryString(file);
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
      setAllLectures(false); setSelLectures([]);
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
            {!allLectures && selLectures.length > 0 && (
              <span className="text-[10px] font-semibold" style={{ color }}>
                {selLectures.length} / {currentLecs.length} selected
              </span>
            )}
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            {/* All lectures row */}
            <button
              type="button"
              onClick={toggleAllLectures}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100"
            >
              <CheckBox checked={allLectures} color={color} />
              <span className="text-[13px] font-semibold text-slate-700">All lectures</span>
              {allLectures && (
                <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded text-white" style={{ background: color }}>
                  Full access
                </span>
              )}
            </button>

            {/* Individual lectures */}
            <div className="divide-y divide-slate-50">
              {currentLecs.map((lec, i) => {
                const checked = allLectures || selLectures.includes(lec);
                return (
                  <button
                    key={lec}
                    type="button"
                    onClick={() => toggleLecture(lec)}
                    disabled={allLectures}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left disabled:cursor-default"
                  >
                    <CheckBox checked={checked} color={color} disabled={allLectures} />
                    <span className={`text-[12px] ${checked ? "text-slate-700 font-medium" : "text-slate-500"}`}>
                      {lec}
                    </span>
                    <span className="ml-auto text-[10px] text-slate-300">#{i + 1}</span>
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
            <p><strong className="text-green-900">{result.granted}</strong> new grant{result.granted !== 1 ? "s" : ""}</p>
            {result.alreadyHadAccess > 0 && (
              <p className="text-green-600">{result.alreadyHadAccess} already had access (skipped)</p>
            )}
          </div>
          {result.notFound.length > 0 && (
            <div className="mt-3 pt-3 border-t border-green-200">
              <p className="text-sm font-semibold text-amber-700 mb-1">
                {result.notFound.length} email{result.notFound.length !== 1 ? "s" : ""} not registered:
              </p>
              <div className="bg-white rounded-lg border border-amber-200 p-2 max-h-32 overflow-y-auto">
                {result.notFound.map((e) => (
                  <p key={e} className="text-xs text-amber-700 font-mono py-0.5">{e}</p>
                ))}
              </div>
              <p className="text-xs text-amber-600 mt-1.5">These users need to create an account first.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
