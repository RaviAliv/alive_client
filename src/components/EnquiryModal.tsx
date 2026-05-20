import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

const ROLES = [
  { value: "mbbs", label: "MBBS Student" },
  { value: "md", label: "MD / DGO" },
  { value: "dnb", label: "DNB" },
  { value: "gynecologist", label: "Gynecologist" },
  { value: "ivf", label: "IVF Specialist" },
  { value: "fellow", label: "Fellow / Resident" },
  { value: "other", label: "Other" },
];

const COURSES = [
  { value: "all", label: "All Courses" },
  { value: "foundation", label: "Foundation Series (Tier I)" },
  { value: "core", label: "Core Series (Tier II)" },
  { value: "advanced", label: "Advanced Series (Tier III)" },
  { value: "masterclass", label: "Masterclass Series (Tier IV)" },
];

type Props = {
  open: boolean;
  onClose: () => void;
  /** Title of the tier the user clicked, e.g. "The Core Series" — used to prefill. */
  courseLabel?: string;
};

const inputCls =
  "w-full px-3.5 py-2.5 text-sm text-navy border border-border-warm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition";
const labelCls = "block mb-1.5 text-[13px] text-soft-black font-medium";

export default function EnquiryModal({ open, onClose, courseLabel }: Props) {
  const [role, setRole] = useState("");
  const [course, setCourse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Reset + prefill whenever the modal is (re)opened
  useEffect(() => {
    if (!open) return;
    const key = ["foundation", "core", "advanced", "masterclass"].find((k) =>
      courseLabel?.toLowerCase().includes(k)
    );
    setCourse(key ?? "all");
    setRole("");
    setSubmitted(false);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [open, courseLabel]);

  // Escape to close + lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Freeze the page in place. Compensate for the removed scrollbar width so
    // the background content doesn't shift when scrolling is disabled.
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: replace with real API call, e.g. POST /api/enquiry
    setSubmitted(true);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative z-[1] w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-border-warm shadow-[0_30px_80px_-30px_rgba(30,42,68,0.45)] animate-fade-in">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry form"
          className="absolute top-3.5 right-3.5 z-[2] w-9 h-9 flex items-center justify-center rounded-full text-slate hover:bg-mist hover:text-navy transition-colors text-[22px] leading-none"
        >
          &times;
        </button>

        {submitted ? (
          /* Success state */
          <div className="px-7 py-12 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-t-green/12 border border-t-green/40 grid place-items-center text-t-green text-2xl">
              &#10003;
            </div>
            <h3 className="font-display text-[26px] font-medium text-navy mb-2">
              Thank you.
            </h3>
            <p className="text-[14px] text-slate leading-relaxed max-w-[34ch] mx-auto mb-7">
              Your enquiry has been received. Our team will be in touch about the
              STAR pathway tier that fits you.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-navy hover:bg-black text-gold-light hover:text-gold border border-navy hover:border-gold rounded-[2px] font-body font-medium text-sm tracking-[0.02em] transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="px-7 py-8 sm:px-8">
            {/* Heading */}
            <span className="inline-block font-mono text-[10px] tracking-[0.26em] uppercase text-gold-deep mb-2">
              Course Enquiry
            </span>
            <h3
              id="enquiry-modal-title"
              className="font-display text-[26px] font-medium text-navy leading-tight mb-1"
            >
              {courseLabel ? `Enquire about ${courseLabel}` : "Enquire about STAR Academy"}
            </h3>
            <p className="text-[13px] text-slate mb-6">
              Share a few details and we'll get in touch. Fields marked{" "}
              <span className="text-t-red">*</span> are required.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    Full Name <span className="text-t-red">*</span>
                  </label>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Dr. [your name]"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    Phone Number <span className="text-t-red">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>
                  Email Address <span className="text-t-red">*</span>
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    You Are A <span className="text-t-red">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className={`${inputCls} cursor-pointer ${
                      role ? "" : "text-slate/60"
                    }`}
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value} className="text-navy">
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Course of Interest</label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className={`${inputCls} cursor-pointer`}
                  >
                    {COURSES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Message</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your background or questions"
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-black text-gold-light hover:text-gold border border-navy hover:border-gold py-3 rounded-[2px] font-body font-medium text-sm tracking-[0.02em] transition-all duration-300 group"
              >
                Submit Enquiry
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
