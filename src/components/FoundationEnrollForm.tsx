import { useState, useEffect, useRef, type FormEvent } from "react";

/* ─── Types ─────────────────────────────────────────────── */
type Country = { cca2: string; name: string; code: string; flagSvg: string };

export const FOUNDATION_LECTURES = [
  { id: "l01", label: "L01 — The Complete Arc of the Ovarian Cycle" },
  { id: "l02", label: "L02 — Ovulation, Triggering, and Timing" },
  { id: "l03", label: "L03 — Reading the Luteal Phase as a Clinical Signal" },
  { id: "l04", label: "L04 — The Molecular Dialogue of Implantation" },
  { id: "l05", label: "L05 — The Precision Diagnostic Roadmap" },
];

export async function loadCountries(): Promise<Country[]> {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2");
  const data = await res.json();
  const list: Country[] = (data as any[])
    .filter((c) => c.idd?.root && c.idd.suffixes?.length)
    .map((c) => {
      const suffix = c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : "";
      return { cca2: c.cca2, name: c.name.common, code: (c.idd.root as string) + suffix, flagSvg: c.flags?.svg || c.flags?.png };
    })
    .filter((c) => c.code.length >= 2 && c.flagSvg);
  const priority: Record<string, string> = { "+1": "US", "+7": "RU", "+44": "GB", "+61": "AU" };
  const seen = new Map<string, Country>();
  for (const c of list) {
    if (!seen.has(c.code)) seen.set(c.code, c);
    else if (priority[c.code] === c.cca2) seen.set(c.code, c);
  }
  const unique = Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
  const india = unique.find((c) => c.cca2 === "IN");
  return india ? [india, ...unique.filter((c) => c.cca2 !== "IN")] : unique;
}

/* ─── Country picker ─────────────────────────────────────── */
export function CountryPicker({
  countries, selected, onSelect,
}: { countries: Country[]; selected: Country | null; onSelect: (c: Country) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 30); }, [open]);

  const filtered = countries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search));

  return (
    <div ref={wrapRef} className="relative shrink-0 h-full">
      <button type="button" onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 bg-[#0d1f17] border-r border-t-green/20 h-full px-3 focus:outline-none cursor-pointer hover:bg-[#122a1c] transition-colors">
        {selected ? (
          <>
            <img src={selected.flagSvg} alt={selected.name} className="w-5 h-[14px] object-cover rounded-[2px] shrink-0" />
            <span className="text-[12px] font-mono text-white/70 whitespace-nowrap">{selected.code}</span>
          </>
        ) : <span className="text-[12px] text-white/30">…</span>}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0 text-white/30">
          <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-[260px] bg-[#0a1c13] border border-t-green/25 rounded-[3px] shadow-[0_12px_40px_rgba(0,0,0,0.7)] z-[300] overflow-hidden">
          <div className="px-3 pt-3 pb-2 border-b border-t-green/15">
            <input ref={inputRef} type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code…"
              className="w-full px-2.5 py-1.5 text-xs bg-[#0d1f17] border border-t-green/20 text-white/80 placeholder:text-white/25 focus:outline-none focus:border-t-green/50 rounded-[2px]" />
          </div>
          <ul className="max-h-[200px] overflow-y-auto">
            {filtered.length === 0
              ? <li className="py-5 text-center text-xs text-white/30">No results</li>
              : filtered.map((c) => (
                <li key={c.cca2}>
                  <button type="button" onClick={() => { onSelect(c); setOpen(false); setSearch(""); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-t-green/10 transition-colors ${selected?.cca2 === c.cca2 ? "bg-t-green/10" : ""}`}>
                    <img src={c.flagSvg} alt={c.name} className="w-5 h-[14px] object-cover rounded-[2px] shrink-0" />
                    <span className="flex-1 text-[12px] text-white/70 truncate">{c.name}</span>
                    <span className="text-[11px] text-t-green/60 font-mono shrink-0">{c.code}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── The actual form ────────────────────────────────────── */
export default function FoundationEnrollForm({ onSuccess }: { onSuccess?: (name: string) => void }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedLectures, setSelectedLectures] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCountries()
      .then((list) => { setCountries(list); setSelectedCountry(list.find((c) => c.cca2 === "IN") ?? list[0] ?? null); })
      .catch(console.error)
      .finally(() => setLoadingCountries(false));
  }, []);

  const toggleLecture = (id: string) =>
    setSelectedLectures((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]);

  const reset = () => { setFullName(""); setEmail(""); setPhone(""); setSelectedLectures([]); setMessage(""); setSuccess(false); setError(""); };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!selectedCountry || !phone.trim()) { setError("Please enter a valid phone number."); return; }
    if (selectedLectures.length === 0) { setError("Please select at least one lecture."); return; }
    setSubmitting(true); setError("");
    try {
      const courseLabel = selectedLectures.length === 5
        ? "Foundation Series — All Lectures"
        : "Foundation Series: " + selectedLectures.map((id) => FOUNDATION_LECTURES.find((l) => l.id === id)?.label ?? id).join(", ");
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email: email.trim(), phoneNumber: selectedCountry.code + phone.trim(), course: courseLabel, message }),
      });
      const text = await res.text();
      let data: any = {};
      if (text) { try { data = JSON.parse(text); } catch { /**/ } }
      if (!res.ok) throw new Error(data.message || `Error ${res.status}.`);
      setSuccess(true);
      onSuccess?.(fullName);
    } catch (err: any) {
      setError(err.message || "Could not connect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full px-3 py-2 text-[13px] bg-[#0d1f17] border border-t-green/20 text-white/85 placeholder:text-white/25 focus:outline-none focus:border-t-green/60 focus:ring-1 focus:ring-t-green/20 rounded-[3px] transition";

  if (success) {
    return (
      <div className="py-10 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full border border-t-green/30 bg-t-green/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="#21864E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="font-display italic text-[20px] text-white mb-1">Thank you, {fullName.split(" ")[0]}!</p>
          <p className="text-[13px] text-white/45 max-w-[28ch] mx-auto leading-[1.6]">
            We've received your registration and will be in touch shortly.
          </p>
        </div>
        <button type="button" onClick={reset}
          className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-t-green/60 hover:text-t-green border-b border-t-green/30 pb-px transition-colors">
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block mb-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/45">
          Full Name <span className="text-t-green">*</span>
        </label>
        <input type="text" required placeholder="Dr. / your full name" value={fullName}
          onChange={(e) => setFullName(e.target.value)} className={inputCls} />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/45">
          Email Address <span className="text-t-green">*</span>
        </label>
        <input type="email" required placeholder="your@email.com" value={email}
          onChange={(e) => setEmail(e.target.value)} className={inputCls} />
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/45">
          Phone Number <span className="text-t-green">*</span>
        </label>
        <div className="flex rounded-[3px] border border-t-green/20 overflow-visible focus-within:border-t-green/50 focus-within:ring-1 focus-within:ring-t-green/20 transition h-[38px]">
          {loadingCountries ? (
            <div className="flex items-center px-3 bg-[#0d1f17] border-r border-t-green/20">
              <div className="w-4 h-4 border-2 border-t-green/20 border-t-t-green rounded-full animate-spin" />
            </div>
          ) : (
            <CountryPicker countries={countries} selected={selectedCountry} onSelect={setSelectedCountry} />
          )}
          <input type="tel" required placeholder="Phone number" value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="flex-1 min-w-0 px-3 text-[13px] bg-[#0d1f17] text-white/85 placeholder:text-white/25 focus:outline-none rounded-r-[3px]" />
        </div>
      </div>

      {/* Lecture checkboxes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/45">
            Select Lectures <span className="text-t-green">*</span>
          </label>
          <button type="button" onClick={() => setSelectedLectures(selectedLectures.length === FOUNDATION_LECTURES.length ? [] : FOUNDATION_LECTURES.map((l) => l.id))}
            className="font-mono text-[9px] tracking-[0.14em] uppercase text-t-green/50 hover:text-t-green transition-colors">
            {selectedLectures.length === FOUNDATION_LECTURES.length ? "Deselect all" : "Select all"}
          </button>
        </div>
        <div className="space-y-2">
          {FOUNDATION_LECTURES.map((l) => {
            const checked = selectedLectures.includes(l.id);
            return (
              <label key={l.id}
                className={`flex items-center gap-3 px-3 py-2.5 border rounded-[3px] cursor-pointer transition-all duration-150 select-none ${checked ? "border-t-green/50 bg-t-green/10" : "border-t-green/15 bg-[#0d1f17] hover:border-t-green/30 hover:bg-[#0f2218]"}`}>
                <span className={`w-4 h-4 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-t-green border-t-green" : "border-t-green/30"}`}>
                  {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <input type="checkbox" checked={checked} onChange={() => toggleLecture(l.id)} className="sr-only" />
                <span className="text-[12.5px] text-white/70 leading-[1.3]">{l.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="flex items-center gap-2 mb-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/45">
          Message <span className="text-white/25 normal-case tracking-normal font-sans text-[10px]">(optional)</span>
        </label>
        <textarea rows={3} placeholder="Your background, questions, or anything else…" value={message}
          onChange={(e) => setMessage(e.target.value)} className={`${inputCls} resize-none`} />
      </div>

      {error && <p className="text-[12px] text-red-400 bg-red-900/20 border border-red-400/20 rounded-[3px] px-3 py-2">{error}</p>}

      <button type="submit" disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-t-green hover:bg-[#196638]   disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 font-mono text-[10.5px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 rounded-[3px] group">
        {submitting ? (
          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</>
        ) : (
          <>Register My Seat <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span></>
        )}
      </button>
    </form>
  );
}
