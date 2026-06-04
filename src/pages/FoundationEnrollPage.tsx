import { useState, useEffect, useRef, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PRICING } from "../lib/config";

/* ─── Data ───────────────────────────────────────────────── */
const LECTURES = [
  { id: "l01", no: "01", title: "The Complete Arc of the Ovarian Cycle",        duration: "90 min · Live on Zoom" },
  { id: "l02", no: "02", title: "Ovulation, Triggering, and Timing",             duration: "90 min · Live on Zoom" },
  { id: "l03", no: "03", title: "Reading the Luteal Phase as a Clinical Signal", duration: "90 min · Live on Zoom" },
  { id: "l04", no: "04", title: "The Molecular Dialogue of Implantation",        duration: "90 min · Live on Zoom" },
  { id: "l05", no: "05", title: "The Precision Diagnostic Roadmap",              duration: "90 min · Live on Zoom" },
];

const { each: PRICE_EACH, bundlePrice: BUNDLE_PRICE, bundleSave: BUNDLE_SAVE } = PRICING;

const ACCENT     = "#21864E";
const ACCENT_DARK = "#186138";

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
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 border-r border-gray-200 bg-gray-50 h-full px-3 focus:outline-none hover:bg-gray-100 transition-colors"
      >
        {selected ? (
          <>
            <img src={selected.flagSvg} alt={selected.name} className="w-5 h-[14px] object-cover rounded-[2px]" />
            <span className="text-[12px] font-mono text-gray-600 whitespace-nowrap">{selected.code}</span>
          </>
        ) : <span className="text-[12px] text-gray-300">…</span>}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0 text-gray-400">
          <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-[260px] bg-white border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-50 overflow-hidden rounded-[3px]">
          <div className="px-3 pt-3 pb-2 border-b border-gray-100">
            <input
              ref={inputRef} type="text" value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code…"
              className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-green-400 rounded-[2px]"
            />
          </div>
          <ul className="max-h-[200px] overflow-y-auto">
            {filtered.length === 0
              ? <li className="py-5 text-center text-xs text-gray-400">No results</li>
              : filtered.map((c) => (
                <li key={c.cca2}>
                  <button
                    type="button"
                    onClick={() => { onSelect(c); setOpen(false); setSearch(""); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-green-50 transition-colors ${selected?.cca2 === c.cca2 ? "bg-green-50" : ""}`}
                  >
                    <img src={c.flagSvg} alt={c.name} className="w-5 h-[14px] object-cover rounded-[2px] shrink-0" />
                    <span className="flex-1 text-[12px] text-gray-600 truncate">{c.name}</span>
                    <span className="text-[11px] font-mono shrink-0" style={{ color: ACCENT }}>{c.code}</span>
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
  const [fullName,          setFullName]          = useState("");
  const [email,             setEmail]             = useState("");
  const [phone,             setPhone]             = useState("");
  const [countries,         setCountries]         = useState<Country[]>([]);
  const [loadingCountries,  setLoadingCountries]  = useState(true);
  const [selectedCountry,   setSelectedCountry]   = useState<Country | null>(null);
  const [selected,          setSelected]          = useState<string[]>([]);
  const [expandedId,        setExpandedId]        = useState<string | null>(null);
  const [submitting,        setSubmitting]        = useState(false);
  const [success,           setSuccess]           = useState(false);
  const [error,             setError]             = useState("");

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

  const inputCls = [
    "w-full px-3 py-2.5 text-[13.5px] bg-white rounded-[3px] transition",
    "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-100",
  ].join(" ");
  const labelCls = "block mb-1.5 font-mono text-[10px] tracking-[0.14em] uppercase font-bold text-gray-700";

  return (
    <div className="min-h-screen bg-white" style={{ marginTop: -20 }}>

      {/* ── Top bar ── */}
      <div className="border-b border-gray-300 px-5 sm:px-8 md:px-12 py-5 bg-white">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between">
          <div>
            <span className="font-mono text-[11px] tracking-[0.26em] uppercase block mb-0.5" style={{ color: ACCENT }}>
              Foundation Series · Tier I
            </span>
            <h1 className="font-display font-medium text-[18px] text-gray-900 leading-none">Complete Your Enrolment</h1>
          </div>
          <Link
            to="/course/foundation"
            className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← Back to Course
          </Link>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 md:px-12 py-8">
        {success ? (
          <div className="max-w-[460px] mx-auto text-center py-20">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ border: `1px solid ${ACCENT}40`, background: `${ACCENT}10` }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[9px] tracking-[0.26em] uppercase block mb-2" style={{ color: ACCENT }}>
              Enquiry Received
            </span>
            <h2 className="font-display font-medium text-[26px] text-gray-900 mb-3">
              Thank you, {fullName.split(" ")[0]}.
            </h2>
            <p className="text-[13.5px] text-gray-500 leading-[1.7] mb-7">
              We've received your registration and will be in touch to confirm your seat and payment details.
            </p>
            <Link
              to="/course/foundation"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase px-5 py-2.5 transition-colors rounded-[3px] text-white"
              style={{ background: ACCENT, border: `1px solid ${ACCENT}` }}
            >
              ← Back to Foundation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ── LEFT: Lecture selection ── */}
            <div className="bg-white rounded-[4px] overflow-hidden" style={{ border: "1.5px solid #d1d5db", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>

              {/* Top accent line */}
              <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${ACCENT}30, ${ACCENT}, ${ACCENT}30)` }} />

              <div className="p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.26em] uppercase block mb-1" style={{ color: ACCENT }}>
                      Foundation Series
                    </span>
                    <h2 className="font-display font-medium text-[20px] text-gray-900 leading-none">Select Your Lectures</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(selected.length === 5 ? [] : LECTURES.map((l) => l.id))}
                    className="font-mono text-[9px] tracking-[0.16em] uppercase transition-colors border px-3 py-1.5 rounded-[2px] text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
                  >
                    {selected.length === 5 ? "Clear all" : "Select all 5"}
                  </button>
                </div>

                {/* ── Bundle button — TOP ── */}
                {!isBundle ? (
                  <button
                    type="button"
                    onClick={() => setSelected(LECTURES.map((l) => l.id))}
                    className="w-full mb-5 flex items-center gap-4 px-4 py-4 transition-all group hover:brightness-105 active:scale-[0.99]"
                    style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`, border: `1px solid ${ACCENT}`, cursor: "pointer" }}
                  >
                    {/* Plus icon circle */}
                    <div
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>

                    {/* Text block */}
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold text-[14px] leading-none mb-1">
                        Enroll All 5 Lectures
                      </p>
                      <p className="font-mono text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                        ₹{BUNDLE_PRICE.toLocaleString("en-IN")} bundle&nbsp;
                        <span className="line-through" style={{ color: "rgba(255,255,255,0.35)" }}>
                          ₹{(PRICE_EACH * 5).toLocaleString("en-IN")}
                        </span>
                      </p>
                    </div>

                    {/* Save pill */}
                    <div
                      className="shrink-0 text-center px-3 py-1.5"
                      style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
                    >
                      <p className="font-mono text-[8px] tracking-[0.14em] uppercase text-white/70 leading-none mb-0.5">Save</p>
                      <p className="font-display font-medium text-white text-[15px] leading-none">₹{BUNDLE_SAVE.toLocaleString("en-IN")}</p>
                    </div>
                  </button>
                ) : (
                  <div
                    className="w-full mb-5 flex items-center justify-between px-4 py-3"
                    style={{ background: `${ACCENT}10`, border: `1.5px solid ${ACCENT}40` }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: ACCENT }}
                      >
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <span className="text-[12px] font-semibold block leading-none mb-0.5" style={{ color: "#111827" }}>
                          Bundle applied
                        </span>
                        <span className="font-mono text-[10px]" style={{ color: "#6b7280" }}>
                          ₹{BUNDLE_PRICE.toLocaleString("en-IN")} total · you save ₹{BUNDLE_SAVE.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelected([])}
                      className="font-mono text-[9px] tracking-[0.14em] uppercase text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* ── Lecture accordion ── */}
                <div className="mb-5" style={{ border: "1.5px solid #d1d5db", borderRadius: 3 }}>
                  {LECTURES.map((l, i) => {
                    const checked  = selected.includes(l.id);
                    const isOpen   = expandedId === l.id;
                    return (
                      <div
                        key={l.id}
                        style={{
                          borderBottom: i < LECTURES.length - 1 ? "1.5px solid #d1d5db" : "none",
                          background: checked ? `${ACCENT}08` : "#fff",
                        }}
                      >
                        {/* Collapsed header row — always visible */}
                        <div className="flex items-center gap-3 px-4 py-3.5 select-none">

                          {/* Checkbox — stops propagation so it doesn't toggle expand */}
                          <div
                            onClick={(e) => { e.stopPropagation(); toggleLecture(l.id); }}
                            className="w-[18px] h-[18px] rounded-[3px] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                            style={{
                              background: checked ? ACCENT : "#fff",
                              border: `2px solid ${checked ? ACCENT : "#6b7280"}`,
                            }}
                          >
                            {checked && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>

                          {/* Number */}
                          <span
                            className="font-mono text-[11px] font-semibold tracking-[0.1em] shrink-0 w-6"
                            style={{ color: checked ? ACCENT : "#374151" }}
                          >
                            {l.no}
                          </span>

                          {/* Title — click to expand */}
                          <span
                            className="flex-1 text-[13.5px] font-medium leading-[1.3] cursor-pointer"
                            style={{ color: "#111827" }}
                            onClick={() => setExpandedId(isOpen ? null : l.id)}
                          >
                            {l.title}
                          </span>

                          {/* Chevron — expand toggle */}
                          <button
                            type="button"
                            onClick={() => setExpandedId(isOpen ? null : l.id)}
                            className="shrink-0 ml-2 p-1 transition-transform duration-200"
                            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                            aria-label={isOpen ? "Collapse" : "Expand"}
                          >
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 8 11 13 6" />
                            </svg>
                          </button>
                        </div>

                        {/* Expanded content */}
                        <div
                          style={{
                            overflow: "hidden",
                            maxHeight: isOpen ? "120px" : "0px",
                            transition: "max-height 0.3s ease",
                          }}
                        >
                          <div
                            className="px-4 pb-4 pt-0 ml-[54px] flex items-center justify-between"
                            style={{ borderTop: `1px solid #e5e7eb` }}
                          >
                            <div className="pt-3">
                              <span className="font-mono text-[11px] text-gray-600 block mb-1">{l.duration}</span>
                              <span
                                className="font-mono text-[10px] tracking-[0.14em] uppercase cursor-pointer"
                                style={{ color: checked ? ACCENT : "#374151" }}
                                onClick={() => toggleLecture(l.id)}
                              >
                                {checked ? "✓ Selected" : "Click to select"}
                              </span>
                            </div>
                            <span
                              className="font-mono text-[15px] font-bold"
                              style={{ color: "#111827" }}
                            >
                              ₹{PRICE_EACH.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* ── Price summary ── */}
                <div className="flex items-end justify-between pt-4" style={{ borderTop: "1.5px solid #d1d5db" }}>
                  <div className="space-y-1">
                    {selected.length > 0 && (
                      <p className="text-[13px] text-gray-700">
                        {selected.length} lecture{selected.length > 1 ? "s" : ""} × ₹{PRICE_EACH.toLocaleString("en-IN")}
                        <span className="ml-2 font-medium">= ₹{subtotal.toLocaleString("en-IN")}</span>
                      </p>
                    )}
                    {isBundle && (
                      <p className="text-[13px] font-semibold" style={{ color: ACCENT }}>
                        Bundle discount −₹{BUNDLE_SAVE.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-gray-500 mb-0.5">Total</p>
                    <p className="font-display text-[32px] leading-none" style={{ color: "#111827" }}>
                      {selected.length === 0
                        ? <span className="text-gray-300 text-[24px]">₹ —</span>
                        : `₹${total.toLocaleString("en-IN")}`}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="lg:sticky lg:top-[100px]">
              <div className="bg-white rounded-[4px] overflow-hidden" style={{ border: "1.5px solid #d1d5db", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${ACCENT}30, ${ACCENT}, ${ACCENT}30)` }} />
                <div className="p-6">
                  <span className="font-mono text-[10px] tracking-[0.26em] uppercase block mb-1" style={{ color: ACCENT }}>
                    Your Details
                  </span>
                  <h2 className="font-display font-medium text-[20px] text-gray-900 mb-5 leading-none">Registration</h2>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">

                    {/* Name */}
                    <div>
                      <label className={labelCls}>Full Name <span style={{ color: ACCENT }}>*</span></label>
                      <input
                        type="text" required placeholder="Dr. / your full name"
                        value={fullName} onChange={(e) => setFullName(e.target.value)}
                        className={inputCls}
                        style={{ color: "#111827" }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelCls}>Email Address <span style={{ color: ACCENT }}>*</span></label>
                      <input
                        type="email" required placeholder="your@email.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className={inputCls}
                        style={{ color: "#111827" }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={labelCls}>Phone Number <span style={{ color: ACCENT }}>*</span></label>
                      <div
                        className="flex rounded-[3px] overflow-visible transition h-[42px]"
                        style={{ border: "1.5px solid #d1d5db" }}
                      >
                        {loadingCountries ? (
                          <div className="flex items-center px-3 bg-gray-50 border-r border-gray-300">
                            <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
                          </div>
                        ) : (
                          <CountryPicker countries={countries} selected={selectedCountry} onSelect={setSelectedCountry} />
                        )}
                        <input
                          type="tel" required placeholder="Phone number" value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          className="flex-1 min-w-0 px-3 text-[13px] bg-white focus:outline-none rounded-r-[3px]"
                          style={{ color: "#111827" }}
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-[12px] text-red-700 bg-red-50 border border-red-300 rounded-[3px] px-3 py-2 font-medium">
                        {error}
                      </p>
                    )}

                    {/* Order summary + pay */}
                    <div className="pt-4" style={{ borderTop: "1.5px solid #d1d5db" }}>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-mono text-[10px] tracking-[0.16em] uppercase font-semibold" style={{ color: "#374151" }}>
                          {selected.length === 0
                            ? "No lectures selected"
                            : `${selected.length} lecture${selected.length > 1 ? "s" : ""} selected`}
                        </span>
                        <span className="font-display text-[22px] leading-none" style={{ color: "#111827" }}>
                          {selected.length === 0
                            ? <span className="text-gray-400 text-[16px]">₹ —</span>
                            : `₹${total.toLocaleString("en-IN")}`}
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting || selected.length === 0}
                        className="w-full flex items-center justify-center gap-2 py-3.5 font-mono text-[10.5px] font-bold tracking-[0.2em] uppercase transition-all rounded-[3px] group cursor-pointer"
                        style={{
                          background: selected.length > 0
                            ? `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`
                            : "#e5e7eb",
                          color: selected.length > 0 ? "#fff" : "#6b7280",
                          cursor: selected.length === 0 ? "not-allowed" : "pointer",
                        }}
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Processing…
                          </>
                        ) : selected.length === 0 ? (
                          "← Select lectures first"
                        ) : (
                          <>PAY NOW <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span></>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[10px] font-mono tracking-wide text-gray-500">
                        Secured by Razorpay · All amounts in INR
                      </span>
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
