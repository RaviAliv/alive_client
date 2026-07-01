import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { apiGet, apiPost } from "../../lib/api";
import { COURSES, COURSE_COLOR } from "../shared/lectureConfig";

type Alloc = { course: string; allocatedSeats: number; usedSeats: number };
type GrantResult = { granted: number; updated: number; invited: number; notFound: string[] };

const COURSE_LABEL: Record<string, string> = {
  foundation: "Foundation Series",
  core: "Core Series",
  advanced: "Advanced Series",
  masterclass: "Masterclass Series",
};

export default function GrantAccess() {
  const [allocations,  setAllocations]  = useState<Alloc[]>([]);
  const [allocLoaded,  setAllocLoaded]  = useState(false);
  const [students,     setStudents]     = useState<{ email: string; course: string }[]>([]);
  const [course,       setCourse]       = useState("foundation");
  const [manualEmails, setManualEmails] = useState("");
  const [excelEmails,  setExcelEmails]  = useState<string[]>([]);
  const [fileName,     setFileName]     = useState("");
  const [submitting,   setSubmitting]   = useState(false);
  const [result,       setResult]       = useState<GrantResult | null>(null);
  const [error,        setError]        = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const refreshAlloc = async () => {
    try {
      const [allocRes, studentsRes] = await Promise.all([
        apiGet<{ allocations: Alloc[] }>("/admin/my-allocation"),
        apiGet<{ accesses: { email: string; course: string }[] }>("/admin/granted"),
      ]);
      setAllocations(allocRes.allocations);
      setStudents(studentsRes.accesses ?? []);
    } catch {
      // non-fatal
    } finally {
      setAllocLoaded(true);
    }
  };

  useEffect(() => {
    refreshAlloc();
  }, []);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") refreshAlloc();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  const handleCourseChange = (c: string) => {
    setCourse(c);
    setResult(null);
    setError("");
  };

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
    if (!emails.length) { setError("Enter at least one email address."); return; }
    setError(""); setResult(null); setSubmitting(true);
    try {
      // Always grant full bundle (lectures: null = grantAllLectures)
      const data = await apiPost<GrantResult>("/admin/grant", { emails, course, lectures: null });
      setResult(data);
      setManualEmails(""); setExcelEmails([]); setFileName("");
      if (fileRef.current) fileRef.current.value = "";
      refreshAlloc();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to grant access");
    } finally {
      setSubmitting(false);
    }
  };

  const currentAlloc   = allocations.find((a) => a.course === course);
  const remaining      = currentAlloc ? currentAlloc.allocatedSeats - currentAlloc.usedSeats : 0;
  const emails         = emailList();
  const color          = COURSE_COLOR[course];

  // Emails already in THIS admin's student list for the selected course.
  // Note: a student may also have access granted by another admin/superadmin —
  // the server handles that deduplication. We only warn, never hard-block on
  // the client estimate, because it could undercount existing access.
  const alreadyStudents = emails.filter((e) =>
    students.some((s) => s.email === e && s.course === course)
  );
  const newEmails = emails.filter((e) => !alreadyStudents.includes(e));
  // Only hard-block when this admin's own known-new count clearly exceeds quota.
  // The server is authoritative — it may grant fewer if some are already granted
  // by another admin, so we never block on a client-side overcount.
  const overQuota = allocLoaded && !!currentAlloc && newEmails.length > remaining;

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Admin Panel</p>
        <h1 className="text-2xl font-bold text-slate-800">Grant Course Access</h1>
        <p className="text-sm text-slate-400 mt-1">Students get full bundle access to all lectures in the selected course.</p>
      </div>

      {/* Quota banner */}
      {allocLoaded && (
        currentAlloc ? (
          <div className={`rounded-2xl p-4 mb-5 text-sm border ${
            remaining <= 0 ? "bg-red-50 border-red-200 text-red-800" :
            remaining < 10 ? "bg-amber-50 border-amber-200 text-amber-800" :
                             "bg-blue-50 border-blue-200 text-blue-800"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold capitalize">{course}</span> quota:{" "}
                <span className="font-bold">{remaining} seat{remaining !== 1 ? "s" : ""} remaining</span>
                {" "}of {currentAlloc.allocatedSeats} allocated
              </div>
              {remaining > 0 && (
                <span className="text-[11px] font-semibold opacity-60">{currentAlloc.usedSeats} used</span>
              )}
            </div>
            {remaining <= 0 && (
              <p className="mt-1 text-xs opacity-80">All seats consumed — contact Super Admin to get more.</p>
            )}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 text-sm text-amber-800">
            No seat allocation for <strong className="capitalize">{course}</strong>. Contact your Super Admin.
          </div>
        )
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">

        {/* Course selector */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Course</label>
          <div className="grid grid-cols-2 gap-2">
            {COURSES.map((c) => {
              const col = COURSE_COLOR[c];
              const alloc = allocations.find((a) => a.course === c);
              const rem = alloc ? alloc.allocatedSeats - alloc.usedSeats : null;
              const active = course === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCourseChange(c)}
                  className={`relative flex flex-col items-start px-3.5 py-3 rounded-xl border-2 text-left transition-all ${
                    active ? "shadow-sm" : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                  style={active ? { borderColor: col, background: col + "0A" } : {}}
                >
                  <span className="text-[12px] font-bold" style={active ? { color: col } : { color: "#475569" }}>
                    {COURSE_LABEL[c]}
                  </span>
                  {allocLoaded && (
                    <span className={`text-[10px] mt-0.5 font-medium ${
                      rem === null ? "text-amber-500" :
                      rem === 0   ? "text-red-500" :
                                    "text-slate-400"
                    }`}>
                      {rem === null ? "No allocation" : rem === 0 ? "No seats left" : `${rem} seat${rem !== 1 ? "s" : ""} left`}
                    </span>
                  )}
                  {active && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: col }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bundle access indicator */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed" style={{ borderColor: color + "60", background: color + "08" }}>
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <div>
            <p className="text-[12px] font-semibold" style={{ color }}>Full Bundle Access</p>
            <p className="text-[11px] text-slate-500">Includes all current and future lectures in this course</p>
          </div>
        </div>

        {/* Manual emails */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
            Enter Emails
            {manualEmails && (
              <span className="ml-2 normal-case font-normal text-slate-500">
                ({manualEmails.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean).length} entered)
              </span>
            )}
          </label>
          <textarea
            value={manualEmails}
            onChange={(e) => { setManualEmails(e.target.value); setError(""); }}
            rows={5}
            placeholder={"user@example.com\nanother@email.com\n(one per line or comma-separated)"}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 resize-none font-mono leading-relaxed bg-white placeholder:text-slate-300"
          />
        </div>

        {/* Excel upload */}
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

        {/* Grant summary */}
        {emails.length > 0 && (
          <div className="space-y-2">
            {/* Already-a-student warning */}
            {alreadyStudents.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                <p className="font-semibold mb-1">
                  {alreadyStudents.length === emails.length
                    ? "All entered emails already have access to this course."
                    : `${alreadyStudents.length} email${alreadyStudents.length !== 1 ? "s" : ""} already have access — will be skipped:`}
                </p>
                <ul className="text-xs font-mono space-y-0.5 text-amber-700">
                  {alreadyStudents.map((e) => <li key={e}>• {e}</li>)}
                </ul>
              </div>
            )}

            {/* New grants summary */}
            {newEmails.length > 0 && (
              <div className={`rounded-xl px-4 py-3 text-sm border ${overQuota ? "bg-red-50 border-red-200 text-red-700" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                <div className="flex items-center justify-between">
                  <span>
                    Granting <strong>{COURSE_LABEL[course]}</strong> to{" "}
                    <strong>{newEmails.length}</strong> new student{newEmails.length !== 1 ? "s" : ""}
                  </span>
                  {overQuota && (
                    <span className="text-xs font-bold text-red-600">Exceeds quota — {remaining} left</span>
                  )}
                </div>
                {!overQuota && currentAlloc && (
                  <p className="text-xs mt-0.5 text-slate-400">
                    {remaining - newEmails.length} seat{(remaining - newEmails.length) !== 1 ? "s" : ""} remaining after this grant
                  </p>
                )}
              </div>
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

        <button
          type="submit"
          disabled={submitting || emails.length === 0 || overQuota || (allocLoaded && !currentAlloc)}
          className="w-full bg-[#1E2A44] hover:bg-[#141C2E] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
        >
          {submitting ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
          ) : newEmails.length === 0 && emails.length > 0 ? (
            "All selected students already have access"
          ) : (
            `Grant ${COURSE_LABEL[course]} to ${newEmails.length || 0} Student${newEmails.length !== 1 ? "s" : ""}`
          )}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-emerald-800">Done</h3>
          </div>
          <div className="space-y-2 text-sm text-emerald-700">
            {result.granted === 0 && result.updated === 0 ? (
              <p>Everyone already had access — no changes made.</p>
            ) : (
              <>
                {result.granted > 0 && (
                  <p>
                    <strong className="text-emerald-900">{result.granted}</strong> new student{result.granted !== 1 ? "s" : ""} granted —{" "}
                    <strong>{result.granted}</strong> seat{result.granted !== 1 ? "s" : ""} consumed.
                  </p>
                )}
                {result.updated > 0 && (
                  <p className="text-emerald-600 text-xs">
                    {result.updated} student{result.updated !== 1 ? "s" : ""} already had access and were upgraded to full bundle.
                  </p>
                )}
              </>
            )}
            {result.invited > 0 && (
              <p className="flex items-center gap-1.5 text-emerald-600">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {result.invited} invite email{result.invited !== 1 ? "s" : ""} sent — student{result.invited !== 1 ? "s" : ""} will set up their password via the link.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
