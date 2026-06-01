import { useState, useEffect, useRef, type FormEvent } from "react";

/* ─── Types ─────────────────────────────────────────────── */
type Country = {
  cca2:    string;   // "IN"
  name:    string;   // "India"
  code:    string;   // "+91"
  flagSvg: string;   // "https://flagcdn.com/in.svg"
};

/* ─── Courses ────────────────────────────────────────────── */
const COURSES = [
  { value: "foundation",  label: "Foundation Series"  },
  { value: "core",        label: "Core Series"         },
  { value: "advanced",    label: "Advanced Series"     },
  { value: "masterclass", label: "Masterclass Series"  },
];

/* ─── Fetch & normalise REST-Countries data ──────────────── */
async function loadCountries(): Promise<Country[]> {
  const res  = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2"
  );
  const data = await res.json();

  const list: Country[] = (data as any[])
    .filter((c) => c.idd?.root && c.idd.suffixes?.length)
    .map((c) => {
      // Single suffix  → root + suffix  ("+9"+"1" = "+91")
      // Multiple suffixes → just root   ("+1" for NANP region)
      const suffix = c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : "";
      return {
        cca2:    c.cca2                           as string,
        name:    c.name.common                    as string,
        code:    (c.idd.root as string) + suffix,
        flagSvg: (c.flags?.svg || c.flags?.png)  as string,
      };
    })
    .filter((c) => c.code.length >= 2 && c.flagSvg);

  // Deduplicate by dial code — keep the most-recognisable country
  const priority: Record<string, string> = {
    "+1": "US", "+7": "RU", "+44": "GB", "+61": "AU", "+64": "NZ",
  };
  const seen = new Map<string, Country>();
  for (const c of list) {
    if (!seen.has(c.code)) {
      seen.set(c.code, c);
    } else if (priority[c.code] === c.cca2) {
      seen.set(c.code, c); // Override with the priority country
    }
  }

  const unique = Array.from(seen.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Pin India at top
  const india = unique.find((c) => c.cca2 === "IN");
  return india
    ? [india, ...unique.filter((c) => c.cca2 !== "IN")]
    : unique;
}

/* ─── Custom country picker ──────────────────────────────── */
function CountryPicker({
  countries,
  selected,
  onSelect,
}: {
  countries: Country[];
  selected:  Country | null;
  onSelect:  (c: Country) => void;
}) {
  const [open,   setOpen]   = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Auto-focus search when dropdown opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
  );

  return (
    <div ref={wrapRef} className="relative shrink-0 h-full">

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1 bg-gray-50 border-r border-border-warm h-full px-2.5 focus:outline-none cursor-pointer hover:bg-gray-100 transition-colors"
      >
        {selected ? (
          <>
            <img
              src={selected.flagSvg}
              alt={selected.name}
              className="w-5 h-[14px] object-cover rounded-[2px] shrink-0 shadow-sm"
            />
            <span className="text-[12px] font-mono text-gray-700 whitespace-nowrap">
              {selected.code}
            </span>
          </>
        ) : (
          <span className="text-[12px] text-gray-400">…</span>
        )}
        {/* Chevron */}
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="shrink-0 text-gray-400">
          <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-[260px] bg-white border border-border-warm rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 overflow-hidden">

          {/* Search */}
          <div className="px-3 pt-3 pb-2 border-b border-border-warm">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code…"
              className="w-full px-2.5 py-1.5 text-xs border border-border-warm rounded-lg focus:outline-none focus:ring-1 focus:ring-navy/30"
            />
          </div>

          {/* Country list */}
          <ul className="max-h-[210px] overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="py-5 text-center text-xs text-gray-400">
                No results found
              </li>
            ) : (
              filtered.map((c) => (
                <li key={c.cca2}>
                  <button
                    type="button"
                    onClick={() => { onSelect(c); setOpen(false); setSearch(""); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                      selected?.cca2 === c.cca2 ? "bg-navy/5" : ""
                    }`}
                  >
                    <img
                      src={c.flagSvg}
                      alt={c.name}
                      className="w-6 h-[17px] object-cover rounded-[2px] shrink-0 shadow-sm"
                    />
                    <span className="flex-1 text-[13px] text-gray-700 truncate">{c.name}</span>
                    <span className="text-[11px] text-gray-400 font-mono shrink-0">{c.code}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Props ──────────────────────────────────────────────── */
type Props = {
  hideHeading?:    boolean;
  hideSubHeading?: boolean;
  noPadding?:      boolean;
};

/* ─── Main component ─────────────────────────────────────── */
export default function RegistrationForm({
  hideHeading    = false,
  hideSubHeading = false,
  noPadding      = false,
}: Props) {
  // Country picker state
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [selected, setSelected]   = useState<Country | null>(null);

  // Form field state
  const [fullName, setFullName]   = useState("");
  const [email,    setEmail]      = useState("");
  const [phone,    setPhone]      = useState("");
  const [course,   setCourse]     = useState("");
  const [message,  setMessage]    = useState("");

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [error,      setError]      = useState("");

  useEffect(() => {
    loadCountries()
      .then((list) => {
        setCountries(list);
        setSelected(list.find((c) => c.cca2 === "IN") ?? list[0] ?? null);
      })
      .catch(console.error)
      .finally(() => setLoadingCountries(false));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected || !phone.trim()) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber: selected.code + phone.trim(),
          course,
          message,
        }),
      });

      // Safely parse JSON — guard against empty / non-JSON responses
      let data: Record<string, any> = {};
      const text = await res.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          // Server returned non-JSON (e.g. HTML error page)
          throw new Error(
            res.ok
              ? "Unexpected response from server."
              : `Server error ${res.status}. Please try again.`
          );
        }
      }

      if (!res.ok) {
        throw new Error(data.message || `Error ${res.status}. Please try again.`);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Could not connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full px-3 py-[7px] text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition bg-white placeholder:text-gray-400";

  return (
    <section className={`bg-transparent${noPadding ? "" : " px-[clamp(20px,4vw,80px)] -mt-5"}`}>
      <div className={noPadding ? "w-full" : "max-w-[520px] mx-auto"}>

        {/* ── Standalone heading ── */}
        {!hideHeading && (
          <div className="text-center mb-5">
            <span className="inline-block font-mono  text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-2">
              Enroll Now
            </span>
            <h2 className="font-display font-medium  text-[clamp(22px,3vw,32px)] leading-[1.1] text-navy tracking-[-0.015em]">
              Start your learning journey with expert-led courses
            </h2>
            <p className="text-[13px] text-slate mt-2 max-w-[440px] mx-auto leading-[1.55]">
              Share a few details and we'll get in touch shortly...
            </p>
          </div>
        )}

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl shadow-[0_16px_40px_-16px_rgba(30,42,68,0.16)] border border-border-warm overflow-visible">
          <div className="p-5 md:p-6">

            {!hideSubHeading && (
              <h3 className="font-display text-center text-xl font-medium text-navy mb-5">
                Enquiry Form
              </h3>
            )}

            {/* ── Success state ── */}
            {success ? (
              <div className="py-10 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5L18 6" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-display italic text-[20px] text-navy">Thank you, {fullName.split(" ")[0]}!</p>
                <p className="text-sm text-slate max-w-[30ch]">
                  Your enquiry has been received. We'll be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => { setSuccess(false); setFullName(""); setEmail(""); setPhone(""); setCourse(""); setMessage(""); }}
                  className="mt-2 text-xs text-gold-deep underline underline-offset-2 hover:text-navy transition-colors"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit} noValidate>

                {/* Row 1: Full Name | Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-[12px] text-gray-600 font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[12px] text-gray-600 font-medium">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Row 2: Phone (left) | Course (right) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {/* Phone with country picker */}
                  <div>
                    <label className="block mb-1 text-[12px] text-gray-600 font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex rounded-lg border border-border-warm overflow-visible focus-within:ring-2 focus-within:ring-navy/40 focus-within:border-navy transition min-h-[36px]">
                      {loadingCountries ? (
                        <div className="flex items-center px-3 bg-gray-50 border-r border-border-warm">
                          <div className="w-4 h-4 border-2 border-gray-200 border-t-navy rounded-full animate-spin" />
                        </div>
                      ) : (
                        <CountryPicker
                          countries={countries}
                          selected={selected}
                          onSelect={setSelected}
                        />
                      )}
                      <input
                        type="tel"
                        required
                        placeholder="Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="flex-1 min-w-0 px-2 text-sm bg-white focus:outline-none rounded-r-lg"
                      />
                    </div>
                  </div>

                  {/* Course of Interest */}
                  <div>
                    <label className="block mb-1 text-[12px] text-gray-600 font-medium">
                      Course of Interest
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-3 text-sm border border-border-warm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition h-[36px] text-gray-700"
                    >
                      <option value="" disabled>Select a course</option>
                      {COURSES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label className="block mb-1 text-[12px] text-gray-600 font-medium">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your background or questions"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition resize-none placeholder:text-gray-400"
                  />
                </div>

                {/* Error banner */}
                {error && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed text-gold-light hover:text-gold border border-navy hover:border-gold py-2.5 rounded-[2px] font-body font-medium text-sm tracking-[0.02em] transition-all duration-300 group cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gold-light/40 border-t-gold-light rounded-full animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Enquiry
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
