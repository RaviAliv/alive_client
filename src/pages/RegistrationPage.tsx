import { useState, useEffect, type FormEvent } from "react";
import { loadCountries, CountryPicker } from "../components/FoundationEnrollForm";

type Country = { cca2: string; name: string; code: string; flagSvg: string };

const COURSE_OPTIONS = [
  { value: "Foundation Series — Tier I", label: "Foundation Series", tier: "Tier I",   color: "#21864E" },
  { value: "Core Series — Tier II",      label: "Core Series",       tier: "Tier II",  color: "#D4A621" },
  { value: "Advanced Series — Tier III", label: "Advanced Series",   tier: "Tier III", color: "#1E5AA6" },
  { value: "Masterclass — Tier IV",      label: "Masterclass",       tier: "Tier IV",  color: "#C8102E" },
  { value: "Not sure yet",               label: "Not sure yet",      tier: "",         color: "#6B7280" },
];

const INPUT = "w-full px-3 py-2 text-[13px] bg-[rgba(255,255,255,0.05)] border border-white/12 text-ivory placeholder:text-white/25 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/15 rounded-[4px] transition";

export default function RegistrationPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [fullName, setFullName]     = useState("");
  const [email, setEmail]           = useState("");
  const [phone, setPhone]           = useState("");
  const [city, setCity]             = useState("");
  const [course, setCourse]         = useState("");
  const [message, setMessage]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState("");

  useEffect(() => {
    loadCountries()
      .then((list) => {
        setCountries(list);
        setSelectedCountry(list.find((c) => c.cca2 === "IN") ?? list[0] ?? null);
      })
      .catch(console.error)
      .finally(() => setLoadingCountries(false));
  }, []);

  const reset = () => {
    setFullName(""); setEmail(""); setPhone(""); setCity("");
    setCourse(""); setMessage(""); setSuccess(false); setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName.trim()) { setError("Please enter your full name."); return; }
    if (!email.trim())    { setError("Please enter your email address."); return; }
    if (!selectedCountry || !phone.trim()) { setError("Please enter a valid phone number."); return; }
    if (!city.trim())     { setError("Please enter your city."); return; }
    if (!course)          { setError("Please select a course."); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phoneNumber: selectedCountry.code + phone.trim(),
          course,
          message: [city.trim() ? `City: ${city.trim()}` : "", message.trim()].filter(Boolean).join("\n"),
        }),
      });
      const text = await res.text();
      let data: any = {};
      if (text) { try { data = JSON.parse(text); } catch { /**/ } }
      if (!res.ok) throw new Error(data.message || `Error ${res.status}.`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Could not connect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[linear-gradient(rgba(8,12,20,0.93),rgba(8,12,20,0.93)),url('/images/header_footer.webp')] bg-cover bg-center flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[500px]">

        {/* Header */}
        <div className="text-center mb-5">
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">Academy of SRT</span>
          <h1 className="font-display font-medium text-[clamp(22px,3vw,28px)] leading-[1.1] text-ivory mt-1">
            Reserve Your Seat
          </h1>
        </div>

        {/* Card */}
        <div className="bg-[rgba(255,255,255,0.03)] border border-white/10 rounded-xl px-6 py-5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]">

          {success ? (
            <div className="py-10 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L19 7" stroke="#C5A46D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-display text-[20px] text-ivory mb-1.5">Thank you, {fullName.split(" ")[0]}!</p>
                <p className="text-[13px] text-ivory/45 max-w-[28ch] mx-auto leading-[1.6]">
                  We've received your registration and will be in touch within 24 hours.
                </p>
              </div>
              <button type="button" onClick={reset}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/50 hover:text-gold border-b border-gold/25 pb-px transition-colors">
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3.5">

              {/* Name + Email row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-mono text-[9.5px] tracking-[0.16em] uppercase text-ivory/40">
                    Full Name <span className="text-gold">*</span>
                  </label>
                  <input type="text" required placeholder="Dr. / your name"
                    value={fullName} onChange={(e) => setFullName(e.target.value)}
                    className={INPUT} />
                </div>
                <div>
                  <label className="block mb-1 font-mono text-[9.5px] tracking-[0.16em] uppercase text-ivory/40">
                    Email <span className="text-gold">*</span>
                  </label>
                  <input type="email" required placeholder="your@email.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className={INPUT} />
                </div>
              </div>

              {/* Phone + City row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-mono text-[9.5px] tracking-[0.16em] uppercase text-ivory/40">
                    Phone <span className="text-gold">*</span>
                  </label>
                  <div className="flex rounded-[4px] border border-white/12 overflow-visible focus-within:border-gold/40 focus-within:ring-1 focus-within:ring-gold/15 transition h-[36px]">
                    {loadingCountries ? (
                      <div className="flex items-center px-3 bg-[rgba(255,255,255,0.05)] border-r border-white/12">
                        <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
                      </div>
                    ) : (
                      <CountryPicker countries={countries} selected={selectedCountry} onSelect={setSelectedCountry} />
                    )}
                    <input type="tel" required placeholder="Number"
                      value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 min-w-0 px-2 text-[13px] bg-[rgba(255,255,255,0.05)] text-ivory placeholder:text-white/25 focus:outline-none rounded-r-[4px]" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-mono text-[9.5px] tracking-[0.16em] uppercase text-ivory/40">
                    City <span className="text-gold">*</span>
                  </label>
                  <input type="text" required placeholder="Your city"
                    value={city} onChange={(e) => setCity(e.target.value)}
                    className={INPUT} />
                </div>
              </div>

              {/* Course — compact 2×2 + 1 chip grid */}
              <div>
                <label className="block mb-1.5 font-mono text-[9.5px] tracking-[0.16em] uppercase text-ivory/40">
                  Course Interest <span className="text-gold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COURSE_OPTIONS.map((c) => {
                    const sel = course === c.value;
                    return (
                      <label
                        key={c.value}
                        className={`flex items-center gap-2.5 px-3 py-2 border rounded-[4px] cursor-pointer transition-all duration-150 select-none ${
                          !c.tier ? "col-span-2" : ""
                        } ${
                          sel
                            ? "border-white/20 bg-white/[0.07]"
                            : "border-white/8 bg-[rgba(255,255,255,0.02)] hover:border-white/14"
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                          style={{ borderColor: sel ? c.color : "rgba(255,255,255,0.2)" }}>
                          {sel && <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />}
                        </span>
                        <input type="radio" name="course" value={c.value} checked={sel}
                          onChange={() => setCourse(c.value)} className="sr-only" />
                        <div className="min-w-0">
                          <div className="text-[12px] text-ivory/80 leading-none truncate">{c.label}</div>
                          {c.tier && (
                            <div className="font-mono text-[8px] tracking-[0.14em] uppercase mt-[3px]" style={{ color: c.color }}>{c.tier}</div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Message — optional */}
              <div>
                <label className="block mb-1 font-mono text-[9.5px] tracking-[0.16em] uppercase text-ivory/40">
                  Message <span className="text-ivory/20 normal-case tracking-normal font-sans">(optional)</span>
                </label>
                <textarea rows={2} placeholder="Your background, questions, or anything else…"
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  className={`${INPUT} resize-none`} />
              </div>

              {error && (
                <p className="text-[11.5px] text-red-400 bg-red-900/20 border border-red-400/20 rounded-[4px] px-3 py-2">
                  {error}
                </p>
              )}

              <button type="submit" disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-[#A87928] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-black font-body font-bold text-[13.5px] tracking-[0.03em] py-2.5 rounded-[4px] transition-all duration-200 hover:shadow-[0_8px_22px_-6px_rgba(247,219,125,0.5)] group mt-1">
                {submitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Reserve My Seat
                    <span className="inline-block group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </>
                )}
              </button>

              <p className="text-center text-[10.5px] text-ivory/20">
                We'll reach out within 24 hours. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
