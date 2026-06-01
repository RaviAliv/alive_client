import { useState, useEffect, useRef, type FormEvent } from "react";
import { Link } from "react-router-dom";

/* ─── Data ───────────────────────────────────────────────── */
const LECTURES = [
  { id: "l01", no: "01", title: "The Complete Arc of the Ovarian Cycle",        duration: "90 min · Live" },
  { id: "l02", no: "02", title: "Ovulation, Triggering, and Timing",             duration: "90 min · Live" },
  { id: "l03", no: "03", title: "Reading the Luteal Phase as a Clinical Signal", duration: "90 min · Live" },
  { id: "l04", no: "04", title: "The Molecular Dialogue of Implantation",        duration: "90 min · Live" },
  { id: "l05", no: "05", title: "The Precision Diagnostic Roadmap",              duration: "90 min · Live" },
];

const PRICE_EACH   = 999;
const BUNDLE_FULL  = PRICE_EACH * 5;                    // 4995
const BUNDLE_PRICE = Math.round(BUNDLE_FULL * 0.8);     // 3996  (exactly 20% off)
const BUNDLE_SAVE  = BUNDLE_FULL - BUNDLE_PRICE;        // 999

/* ─── Country picker ─────────────────────────────────────── */
type Country = { cca2: string; name: string; code: string; flagSvg: string };

async function loadCountries(): Promise<Country[]> {
  const res  = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2");
  const data = await res.json();
  const list: Country[] = (data as any[])
    .filter((c) => c.idd?.root && c.idd.suffixes?.length)
    .map((c) => {
      const sfx = c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : "";
      return { cca2: c.cca2, name: c.name.common, code: (c.idd.root as string) + sfx, flagSvg: c.flags?.svg || c.flags?.png };
    })
    .filter((c) => c.code.length >= 2 && c.flagSvg);
  const priority: Record<string, string> = { "+1": "US", "+7": "RU", "+44": "GB", "+61": "AU" };
  const seen = new Map<string, Country>();
  for (const c of list) {
    if (!seen.has(c.code)) seen.set(c.code, c);
    else if (priority[c.code] === c.cca2) seen.set(c.code, c);
  }
  const unique = Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
  const india  = unique.find((c) => c.cca2 === "IN");
  return india ? [india, ...unique.filter((c) => c.cca2 !== "IN")] : unique;
}

function CountryPicker({ countries, selected, onSelect }: {
  countries: Country[]; selected: Country | null; onSelect: (c: Country) => void;
}) {
  const [open,   setOpen]   = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 30); }, [open]);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
  );

  return (
    <div ref={wrapRef} className="relative shrink-0 h-full">
      <button type="button" onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 border-r border-t-green/20 bg-[#0d1f17] h-full px-3 focus:outline-none hover:bg-[#122a1c] transition-colors">
        {selected ? (
          <>
            <img src={selected.flagSvg} alt={selected.name} className="w-5 h-[14px] object-cover rounded-[2px]" />
            <span className="text-[12px] font-mono text-white/70 whitespace-nowrap">{selected.code}</span>
          </>
        ) : <span className="text-[12px] text-white/30">…</span>}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0 text-white/30">
          <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-[260px] bg-[#0a1c13] border border-t-green/25 rounded-[3px] shadow-[0_12px_40px_rgba(0,0,0,0.7)] z-50 overflow-hidden">
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
                    className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-t-green/10 transition-colors ${selected?.cca2 === c.cca2 ? "bg-t-green/10" : ""}`}>
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

/* ─── Page ───────────────────────────────────────────────── */
export default function FoundationEnrollPage() {
  const [fullName, setFullName] = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [countries,         setCountries]         = useState<Country[]>([]);
  const [loadingCountries,  setLoadingCountries]  = useState(true);
  const [selectedCountry,   setSelectedCountry]   = useState<Country | null>(null);
  const [selected,   setSelected]   = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [error,      setError]      = useState("");

  useEffect(() => {
    loadCountries()
      .then((list) => { setCountries(list); setSelectedCountry(list.find((c) => c.cca2 === "IN") ?? list[0] ?? null); })
      .catch(console.error)
      .finally(() => setLoadingCountries(false));
  }, []);

  const toggleLecture = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]);

  const isBundle = selected.length === 5;
  const subtotal = selected.length * PRICE_EACH;
  const discount = isBundle ? BUNDLE_SAVE : 0;
  const total    = isBundle ? BUNDLE_PRICE : subtotal;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim())                     { setError("Please enter your email address."); return; }
    if (!selectedCountry || !phone.trim()) { setError("Please enter a valid phone number."); return; }
    if (selected.length === 0)             { setError("Please select at least one lecture."); return; }
    setSubmitting(true); setError("");
    try {
      const courseLabel = isBundle
        ? "Foundation Series — Complete Bundle (All 5 Lectures)"
        : "Foundation Series: " + selected.map((id) => LECTURES.find((l) => l.id === id)?.title ?? id).join("; ");
      const res = await fetch("/api/enquiry", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email: email.trim(), phoneNumber: selectedCountry.code + phone.trim(), course: courseLabel, message: "" }),
      });
      const text = await res.text();
      let data: any = {};
      if (text) { try { data = JSON.parse(text); } catch { /**/ } }
      if (!res.ok) throw new Error(data.message || `Error ${res.status}.`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Could not connect. Please try again.");
    } finally { setSubmitting(false); }
  };

  const inputCls = "w-full px-3 py-2 text-[13px] bg-[#0d1f17] border border-t-green/20 text-white/85 placeholder:text-white/25 focus:outline-none focus:border-t-green/60 focus:ring-1 focus:ring-t-green/15 rounded-[3px] transition";
  const labelCls = "block mb-1 font-mono text-[9.5px] tracking-[0.16em] uppercase text-white/40";

  return (
    <div className="min-h-screen -mt-5 bg-[#071410]">

      {/* ── Top bar ── */}
      <div className="border-b border-t-green/15 px-5 sm:px-8 md:px-12 py-5">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between">
          <div>
            <span className="font-mono text-[12px] tracking-[0.26em] uppercase text-t-green block mb-0.5">Foundation Series · Tier I</span>
            <h1 className="font-display font-medium text-[18px] text-white leading-none">Complete Your Enrolment</h1>
          </div>
          <Link to="/foundation"
            className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-white hover:text-t-green transition-colors">
            ← Back to Course
          </Link>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 py-7">
        {success ? (
          <div className="max-w-[460px] mx-auto text-center py-20">
            <div className="w-16 h-16 rounded-full border border-t-green/30 bg-t-green/10 flex items-center justify-center mx-auto mb-5">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke="#21864E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-t-green block mb-2">Enquiry Received</span>
            <h2 className="font-display font-medium text-[26px] text-white mb-3">Thank you, {fullName.split(" ")[0]}.</h2>
            <p className="text-[13.5px] text-white/45 leading-[1.7] mb-7">
              We've received your registration and will be in touch to confirm your seat and payment details.
            </p>
            <Link to="/foundation"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-t-green border border-t-green/30 px-5 py-2.5 hover:bg-t-green hover:text-white transition-colors rounded-[3px]">
              ← Back to Foundation
            </Link>
          </div>
        ) : (
          /* ── LEFT: course selection  |  RIGHT: form ── */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ── LEFT: Lecture selection ── */}
            <div className="bg-[#0a1c13] border border-t-green/20 rounded-[4px] overflow-hidden shadow-[0_0_0_1px_rgba(33,134,78,0.05)]">
              <div className="h-[2px] bg-gradient-to-r from-t-green/15 via-t-green to-t-green/15" />
              <div className="p-5">

                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-t-green block mb-0.5">Foundation Series</span>
                    <h2 className="font-display font-medium text-[18px] text-white leading-none">Select Your Lectures</h2>
                  </div>
                  <button type="button"
                    onClick={() => setSelected(selected.length === 5 ? [] : LECTURES.map((l) => l.id))}
                    className="font-mono text-[9px] tracking-[0.16em] uppercase text-t-green/50 hover:text-t-green transition-colors border border-t-green/20 px-3 py-1.5 hover:border-t-green/50 rounded-[2px]">
                    {selected.length === 5 ? "Clear all" : "Select all 5"}
                  </button>
                </div>

                {/* Bundle banner */}
                {isBundle && (
                  <div className="mb-4 bg-t-green/10 border border-t-green/25 rounded-[3px] px-3 py-2 flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4" stroke="#21864E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="#21864E" strokeWidth="1.5"/>
                    </svg>
                    <span className="text-[11.5px] text-t-green font-medium">
                      Bundle discount applied — 20% off · You save ₹{BUNDLE_SAVE.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {/* 2-column lecture grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                  {LECTURES.map((l) => {
                    const checked = selected.includes(l.id);
                    return (
                      <label key={l.id}
                        className={`flex items-start gap-2.5 p-3 rounded-[3px] border cursor-pointer transition-all duration-150 select-none ${
                          checked
                            ? "border-t-green/45 bg-t-green/10"
                            : "border-t-green/12 bg-[#0d1f17] hover:border-t-green/30 hover:bg-[#0f2218]"
                        }`}>
                        <span className={`mt-0.5 w-4 h-4 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-t-green border-t-green" : "border-t-green/30"}`}>
                          {checked && <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </span>
                        <input type="checkbox" checked={checked} onChange={() => toggleLecture(l.id)} className="sr-only" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-t-green/50">L{l.no}</span>
                            <span className={`font-mono text-[11.5px] font-semibold shrink-0 ${checked ? "text-white" : "text-white/30"}`}>
                              ₹{PRICE_EACH.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <p className={`text-[12px] leading-[1.3] ${checked ? "text-white/85" : "text-white/45"}`}>{l.title}</p>
                          <p className="text-[9.5px] text-white/22 font-mono mt-0.5">{l.duration}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Price summary */}
                <div className="border-t border-t-green/15 pt-4">
                  <div className="flex items-end justify-between">
                    <div className="space-y-1.5">
                      {selected.length > 0 && (
                        <p className="text-[12px] text-white/35">
                          {selected.length} lecture{selected.length > 1 ? "s" : ""} × ₹{PRICE_EACH}
                          <span className="ml-2">= ₹{subtotal.toLocaleString("en-IN")}</span>
                        </p>
                      )}
                      {isBundle && (
                        <p className="text-[12px] text-t-green">
                          20% bundle discount −₹{discount.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/30 mb-0.5">Total</p>
                      <p className="font-display text-[32px] text-white leading-none">
                        {selected.length === 0
                          ? <span className="text-white/20 text-[24px]">₹ —</span>
                          : `₹${total.toLocaleString("en-IN")}`}
                      </p>
                    </div>
                  </div>

                  {/* Bundle nudge */}
                  {selected.length > 0 && !isBundle && (
                    <button type="button" onClick={() => setSelected(LECTURES.map((l) => l.id))}
                      className="mt-3 w-full font-mono text-[11px] tracking-[0.16em] uppercase text-white border border-t-green/20 py-2 hover:bg-t-green/10 hover:text-t-green hover:border-t-green/40 transition-colors rounded-[2px] hover:cursor-pointer">
                      Add all 5 · save ₹{(subtotal + (5 - selected.length) * PRICE_EACH - BUNDLE_PRICE).toLocaleString("en-IN")} with bundle
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* ── RIGHT: Form + Pay ── */}
            <div className="lg:sticky lg:top-[100px]">
              <div className="bg-[#0a1c13] border border-t-green/20 rounded-[4px] overflow-hidden shadow-[0_0_0_1px_rgba(33,134,78,0.05)]">
                <div className="h-[2px] bg-gradient-to-r from-t-green/15 via-t-green to-t-green/15" />
                <div className="p-5">
                  <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-t-green block mb-0.5">Your Details</span>
                  <h2 className="font-display font-medium text-[18px] text-white mb-5 leading-none">Registration</h2>

                  <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                    {/* Name */}
                    <div>
                      <label className={labelCls}>Full Name <span className="text-t-green">*</span></label>
                      <input type="text" required placeholder="Dr. / your full name"
                        value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelCls}>Email Address <span className="text-t-green">*</span></label>
                      <input type="email" required placeholder="your@email.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={labelCls}>Phone Number <span className="text-t-green">*</span></label>
                      <div className="flex rounded-[3px] border border-t-green/20 overflow-visible focus-within:border-t-green/60 focus-within:ring-1 focus-within:ring-t-green/15 transition h-[38px]">
                        {loadingCountries ? (
                          <div className="flex items-center px-3 bg-[#0d1f17] border-r border-t-green/20">
                            <div className="w-3.5 h-3.5 border-2 border-t-green/20 border-t-t-green rounded-full animate-spin" />
                          </div>
                        ) : (
                          <CountryPicker countries={countries} selected={selectedCountry} onSelect={setSelectedCountry} />
                        )}
                        <input type="tel" required placeholder="Phone number" value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          className="flex-1 min-w-0 px-3 text-[13px] bg-[#0d1f17] text-white/85 placeholder:text-white/25 focus:outline-none rounded-r-[3px]" />
                      </div>
                    </div>

                    {error && (
                      <p className="text-[11.5px] text-red-400 bg-red-900/20 border border-red-400/20 rounded-[3px] px-3 py-2">{error}</p>
                    )}

                    {/* Divider with order summary */}
                    <div className="border-t border-t-green/15 pt-3.5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/30">
                          {selected.length === 0 ? "No lectures selected" : `${selected.length} lecture${selected.length > 1 ? "s" : ""} selected`}
                        </span>
                        <span className="font-display text-[22px] text-white leading-none">
                          {selected.length === 0 ? <span className="text-white/20 text-[16px]">₹ —</span> : `₹${total.toLocaleString("en-IN")}`}
                        </span>
                      </div>

                      <button type="submit" disabled={submitting || selected.length === 0}
                        className="w-full flex items-center py-2 justify-center gap-2 bg-t-green hover:bg-[#196638] hover:cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed text-white py-3 font-mono text-[10.5px] font-bold tracking-[0.2em] uppercase transition-colors rounded-[3px] group">
                        {submitting ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing…</>
                        ) : selected.length === 0 ? (
                          "← Select lectures first"
                        ) : (
                          <>PAY NOW   <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span></>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white/20">
                        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[10px] font-mono tracking-wide text-white/22">Secured by Razorpay · All amounts in INR</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
