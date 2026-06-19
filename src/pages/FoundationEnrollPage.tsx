import { useState, useEffect, useRef, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PRICING } from "../lib/config";
import { apiGet, getToken } from "../lib/api";

/* ─── Data ───────────────────────────────────────────────── */
const LECTURES = [
  { id: "l01", no: "01", title: "300-day Ovarian Symphony - HPO Axis & Follicular Endocrinology",                           duration: "90 min · Live on Zoom" },
  { id: "l02", no: "02", title: "Endocrinology of Follicular Phase",                                                        duration: "90 min · Live on Zoom" },
  { id: "l03", no: "03", title: "Ovulation – Physiology / Precision Triggering / Molecular Dynamics to Clinical Applications", duration: "90 min · Live on Zoom" },
  { id: "l04", no: "04", title: "Luteal Phase Endocrinology and Advances in Luteal Phase Support",                          duration: "90 min · Live on Zoom" },
  { id: "l05", no: "05", title: "Implantation – Decoding the Molecular Dialogue of Human Embryo Implantation",             duration: "90 min · Live on Zoom" },
  { id: "l06", no: "06", title: "Spermatogenesis - What Everyone Should Know",                                              duration: "90 min · Live on Zoom" },
];

const { each: PRICE_EACH, bundlePrice: BUNDLE_PRICE, bundleSave: BUNDLE_SAVE } = PRICING;

const ACCENT     = "#21864E";
const ACCENT_DARK = "#186138";

/* ─── Country picker ─────────────────────────────────────── */
type Country = { cca2: string; name: string; code: string; flag: string };

// Flag emoji from ISO 3166-1 alpha-2 code (works on all modern OS/browsers)
const f = (cc: string) =>
  String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

const COUNTRIES: Country[] = [
  // India first
  { cca2: "IN", name: "India",                    code: "+91",  flag: f("IN") },
  // Rest alphabetically
  { cca2: "AF", name: "Afghanistan",              code: "+93",  flag: f("AF") },
  { cca2: "AL", name: "Albania",                  code: "+355", flag: f("AL") },
  { cca2: "DZ", name: "Algeria",                  code: "+213", flag: f("DZ") },
  { cca2: "AR", name: "Argentina",                code: "+54",  flag: f("AR") },
  { cca2: "AM", name: "Armenia",                  code: "+374", flag: f("AM") },
  { cca2: "AU", name: "Australia",                code: "+61",  flag: f("AU") },
  { cca2: "AT", name: "Austria",                  code: "+43",  flag: f("AT") },
  { cca2: "AZ", name: "Azerbaijan",               code: "+994", flag: f("AZ") },
  { cca2: "BH", name: "Bahrain",                  code: "+973", flag: f("BH") },
  { cca2: "BD", name: "Bangladesh",               code: "+880", flag: f("BD") },
  { cca2: "BE", name: "Belgium",                  code: "+32",  flag: f("BE") },
  { cca2: "BT", name: "Bhutan",                   code: "+975", flag: f("BT") },
  { cca2: "BR", name: "Brazil",                   code: "+55",  flag: f("BR") },
  { cca2: "BN", name: "Brunei",                   code: "+673", flag: f("BN") },
  { cca2: "BG", name: "Bulgaria",                 code: "+359", flag: f("BG") },
  { cca2: "KH", name: "Cambodia",                 code: "+855", flag: f("KH") },
  { cca2: "CA", name: "Canada",                   code: "+1",   flag: f("CA") },
  { cca2: "CL", name: "Chile",                    code: "+56",  flag: f("CL") },
  { cca2: "CN", name: "China",                    code: "+86",  flag: f("CN") },
  { cca2: "CO", name: "Colombia",                 code: "+57",  flag: f("CO") },
  { cca2: "HR", name: "Croatia",                  code: "+385", flag: f("HR") },
  { cca2: "CZ", name: "Czech Republic",           code: "+420", flag: f("CZ") },
  { cca2: "DK", name: "Denmark",                  code: "+45",  flag: f("DK") },
  { cca2: "EG", name: "Egypt",                    code: "+20",  flag: f("EG") },
  { cca2: "ET", name: "Ethiopia",                 code: "+251", flag: f("ET") },
  { cca2: "FI", name: "Finland",                  code: "+358", flag: f("FI") },
  { cca2: "FR", name: "France",                   code: "+33",  flag: f("FR") },
  { cca2: "GE", name: "Georgia",                  code: "+995", flag: f("GE") },
  { cca2: "DE", name: "Germany",                  code: "+49",  flag: f("DE") },
  { cca2: "GH", name: "Ghana",                    code: "+233", flag: f("GH") },
  { cca2: "GR", name: "Greece",                   code: "+30",  flag: f("GR") },
  { cca2: "HK", name: "Hong Kong",                code: "+852", flag: f("HK") },
  { cca2: "HU", name: "Hungary",                  code: "+36",  flag: f("HU") },
  { cca2: "IS", name: "Iceland",                  code: "+354", flag: f("IS") },
  { cca2: "ID", name: "Indonesia",                code: "+62",  flag: f("ID") },
  { cca2: "IE", name: "Ireland",                  code: "+353", flag: f("IE") },
  { cca2: "IL", name: "Israel",                   code: "+972", flag: f("IL") },
  { cca2: "IT", name: "Italy",                    code: "+39",  flag: f("IT") },
  { cca2: "JP", name: "Japan",                    code: "+81",  flag: f("JP") },
  { cca2: "JO", name: "Jordan",                   code: "+962", flag: f("JO") },
  { cca2: "KZ", name: "Kazakhstan",               code: "+7",   flag: f("KZ") },
  { cca2: "KE", name: "Kenya",                    code: "+254", flag: f("KE") },
  { cca2: "KW", name: "Kuwait",                   code: "+965", flag: f("KW") },
  { cca2: "KG", name: "Kyrgyzstan",               code: "+996", flag: f("KG") },
  { cca2: "LB", name: "Lebanon",                  code: "+961", flag: f("LB") },
  { cca2: "MY", name: "Malaysia",                 code: "+60",  flag: f("MY") },
  { cca2: "MV", name: "Maldives",                 code: "+960", flag: f("MV") },
  { cca2: "MX", name: "Mexico",                   code: "+52",  flag: f("MX") },
  { cca2: "MN", name: "Mongolia",                 code: "+976", flag: f("MN") },
  { cca2: "MA", name: "Morocco",                  code: "+212", flag: f("MA") },
  { cca2: "MM", name: "Myanmar",                  code: "+95",  flag: f("MM") },
  { cca2: "NP", name: "Nepal",                    code: "+977", flag: f("NP") },
  { cca2: "NL", name: "Netherlands",              code: "+31",  flag: f("NL") },
  { cca2: "NZ", name: "New Zealand",              code: "+64",  flag: f("NZ") },
  { cca2: "NG", name: "Nigeria",                  code: "+234", flag: f("NG") },
  { cca2: "NO", name: "Norway",                   code: "+47",  flag: f("NO") },
  { cca2: "OM", name: "Oman",                     code: "+968", flag: f("OM") },
  { cca2: "PK", name: "Pakistan",                 code: "+92",  flag: f("PK") },
  { cca2: "PH", name: "Philippines",              code: "+63",  flag: f("PH") },
  { cca2: "PL", name: "Poland",                   code: "+48",  flag: f("PL") },
  { cca2: "PT", name: "Portugal",                 code: "+351", flag: f("PT") },
  { cca2: "QA", name: "Qatar",                    code: "+974", flag: f("QA") },
  { cca2: "RO", name: "Romania",                  code: "+40",  flag: f("RO") },
  { cca2: "RU", name: "Russia",                   code: "+7",   flag: f("RU") },
  { cca2: "SA", name: "Saudi Arabia",             code: "+966", flag: f("SA") },
  { cca2: "RS", name: "Serbia",                   code: "+381", flag: f("RS") },
  { cca2: "SG", name: "Singapore",                code: "+65",  flag: f("SG") },
  { cca2: "ZA", name: "South Africa",             code: "+27",  flag: f("ZA") },
  { cca2: "KR", name: "South Korea",              code: "+82",  flag: f("KR") },
  { cca2: "ES", name: "Spain",                    code: "+34",  flag: f("ES") },
  { cca2: "LK", name: "Sri Lanka",                code: "+94",  flag: f("LK") },
  { cca2: "SE", name: "Sweden",                   code: "+46",  flag: f("SE") },
  { cca2: "CH", name: "Switzerland",              code: "+41",  flag: f("CH") },
  { cca2: "TW", name: "Taiwan",                   code: "+886", flag: f("TW") },
  { cca2: "TZ", name: "Tanzania",                 code: "+255", flag: f("TZ") },
  { cca2: "TH", name: "Thailand",                 code: "+66",  flag: f("TH") },
  { cca2: "TN", name: "Tunisia",                  code: "+216", flag: f("TN") },
  { cca2: "TR", name: "Turkey",                   code: "+90",  flag: f("TR") },
  { cca2: "UG", name: "Uganda",                   code: "+256", flag: f("UG") },
  { cca2: "UA", name: "Ukraine",                  code: "+380", flag: f("UA") },
  { cca2: "AE", name: "United Arab Emirates",     code: "+971", flag: f("AE") },
  { cca2: "GB", name: "United Kingdom",           code: "+44",  flag: f("GB") },
  { cca2: "US", name: "United States",            code: "+1",   flag: f("US") },
  { cca2: "UZ", name: "Uzbekistan",               code: "+998", flag: f("UZ") },
  { cca2: "VN", name: "Vietnam",                  code: "+84",  flag: f("VN") },
  { cca2: "ZW", name: "Zimbabwe",                 code: "+263", flag: f("ZW") },
];

function CountryPicker({ selected, onSelect }: {
  selected: Country; onSelect: (c: Country) => void;
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

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
  );

  return (
    <div ref={wrapRef} className="relative shrink-0 h-full">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 border-r border-gray-200 bg-gray-50 h-full px-3 focus:outline-none hover:bg-gray-100 transition-colors"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="text-[12px] font-mono text-gray-600 whitespace-nowrap">{selected.code}</span>
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
                    className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-green-50 transition-colors ${selected.cca2 === c.cca2 ? "bg-green-50" : ""}`}
                  >
                    <span className="text-base leading-none shrink-0">{c.flag}</span>
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

/* ─── Razorpay script loader ─────────────────────────────── */
function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).Razorpay) { resolve(); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload  = () => resolve();
    s.onerror = () => reject(new Error("Could not load payment processor. Check your connection."));
    document.body.appendChild(s);
  });
}

/* ─── Already-access modal ───────────────────────────────── */
function AlreadyAccessModal({ expiresAt, onDismiss }: { expiresAt: string | null; onDismiss: () => void }) {
  const navigate = useNavigate();
  const daysLeft = expiresAt
    ? Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86_400_000))
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-[fadeInUp_0.25s_ease]">
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${ACCENT}50, ${ACCENT}, ${ACCENT}50)` }} />
        <div className="p-7">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: `${ACCENT}15`, border: `1.5px solid ${ACCENT}40` }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h3 className="font-display font-semibold text-[20px] text-center text-gray-900 mb-2 leading-tight">
            You already have access
          </h3>
          <p className="text-center text-[13px] text-gray-500 leading-[1.7] mb-1">
            You have active access to the <strong className="text-gray-700">Foundation Series</strong>.
          </p>
          {daysLeft !== null && (
            <p className="text-center text-[12px] font-mono mb-5" style={{ color: daysLeft <= 5 ? "#ef4444" : ACCENT }}>
              {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
            </p>
          )}
          {daysLeft === null && <div className="mb-5" />}

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => navigate("/video")}
              className="w-full py-3 rounded-xl font-mono text-[10.5px] font-bold tracking-[0.18em] uppercase text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}>
              Go to Video Library →
            </button>
            <button
              onClick={onDismiss}
              className="w-full py-2.5 rounded-xl font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200">
              Continue anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function FoundationEnrollPage() {
  const [fullName,        setFullName]        = useState("");
  const [email,           setEmail]           = useState("");
  const [phone,           setPhone]           = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [selected,        setSelected]        = useState<string[]>([]);
  const [expandedId,      setExpandedId]      = useState<string | null>(null);
  const [submitting,      setSubmitting]      = useState(false);
  const [success,         setSuccess]         = useState(false);
  const [error,           setError]           = useState("");
  const [accessModal,     setAccessModal]     = useState<{ expiresAt: string | null } | null>(null);

  // If logged in, check whether the user already has active Foundation access
  useEffect(() => {
    if (!getToken()) return;
    apiGet<{ courses: { course: string; expiresAt: string | null }[] }>("/admin/my-access")
      .then((d) => {
        const found = d.courses.find((c) => c.course === "foundation");
        if (!found) return;
        const notExpired = !found.expiresAt || new Date(found.expiresAt) > new Date();
        if (notExpired) setAccessModal({ expiresAt: found.expiresAt });
      })
      .catch(() => {}); // silently ignore — don't block enrollment if check fails
  }, []);

  const toggleLecture = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]);

  const isBundle = selected.length === 6;
  const subtotal = selected.length * PRICE_EACH;
  const total    = isBundle ? BUNDLE_PRICE : subtotal;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim())                  { setError("Please enter your full name."); return; }
    if (!email.trim())                     { setError("Please enter your email address."); return; }
    if (!phone.trim()) { setError("Please enter a valid phone number."); return; }
    if (selected.length === 0)             { setError("Please select at least one lecture."); return; }

    setSubmitting(true);
    setError("");

    try {
      // 1. Create order on server (amount computed & validated server-side)
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lectureIds: selected,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: selectedCountry.code + phone.trim(),
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message || "Could not initiate payment.");

      // 2. Ensure Razorpay checkout script is present
      await loadRazorpayScript();

      // 3. Open Razorpay modal; resolve on verified success, reject on cancel/failure
      await new Promise<void>((resolve, reject) => {
        let settled = false;

        const rzp = new (window as any).Razorpay({
          key: orderData.keyId,
          amount: orderData.amount,      // paise, as returned by server
          currency: orderData.currency,
          name: "Academy of SRT",
          description: isBundle
            ? "Foundation Series — All 5 Lectures"
            : `Foundation Series — ${selected.length} Lecture${selected.length > 1 ? "s" : ""}`,
          order_id: orderData.orderId,
          prefill: {
            name: fullName.trim(),
            email: email.trim(),
            contact: selectedCountry.code + phone.trim(),
          },
          theme: { color: ACCENT },
          // Verify signature server-side on success
          handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
            settled = true;
            try {
              const verifyRes = await fetch("/api/payment/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              });
              const verifyData = await verifyRes.json();
              if (!verifyRes.ok) throw new Error(verifyData.message || "Payment verification failed.");
              setSuccess(true);
              resolve();
            } catch (err: any) {
              reject(err);
            }
          },
          modal: {
            ondismiss: () => {
              // Only reject if handler hasn't already settled (i.e. user cancelled)
              if (!settled) {
                settled = true;
                reject(new Error("__cancelled__"));
              }
            },
          },
        });

        rzp.on("payment.failed", (resp: any) => {
          if (!settled) {
            settled = true;
            reject(new Error(resp.error?.description || "Payment failed. Please try again."));
          }
        });

        rzp.open();
      });
    } catch (err: any) {
      // Silently drop user-initiated cancellations; show real errors
      if (err.message !== "__cancelled__") {
        setError(err.message || "Could not connect. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = [
    "w-full px-3 py-2.5 text-[13.5px] bg-white rounded-[3px] transition",
    "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-100",
  ].join(" ");
  const labelCls = "block mb-1.5 font-mono text-[10px] tracking-[0.14em] uppercase font-bold text-gray-700";

  return (
    <>
    {accessModal && (
      <AlreadyAccessModal
        expiresAt={accessModal.expiresAt}
        onDismiss={() => setAccessModal(null)}
      />
    )}
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
              Payment Confirmed
            </span>
            <h2 className="font-display font-medium text-[26px] text-gray-900 mb-3">
              You're enrolled, {fullName.split(" ")[0]}.
            </h2>
            <p className="text-[13.5px] text-gray-500 leading-[1.7] mb-7">
              Your payment was successful. A confirmation with your access details will be sent to <strong className="text-gray-700">{email}</strong> shortly.
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
                <button
                  type="button"
                  onClick={() => setSelected(isBundle ? [] : LECTURES.map((l) => l.id))}
                  className="w-full mb-5 flex items-center gap-4 px-4 py-4 transition-all hover:brightness-105 active:scale-[0.99]"
                  style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`, border: `1px solid ${ACCENT}`, cursor: "pointer" }}
                >
                  {/* +/− icon circle */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)" }}
                  >
                    {isBundle ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    )}
                  </div>

                  {/* Text block */}
                  <div className="flex-1 text-left">
                    <p className="text-white font-semibold text-[14px] leading-none mb-1">
                      {isBundle ? "All 6 Lectures Selected" : "Enroll All 6 Lectures"}
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
                        <CountryPicker selected={selectedCountry} onSelect={setSelectedCountry} />
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
    </>
  );
}
