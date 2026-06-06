import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { apiPost } from "../lib/api";
import { useAuth, type AuthUser } from "../context/AuthContext";

const labelCls =
  "flex items-center font-mono text-[10.5px] tracking-[0.1em]  uppercase mb-1.5";
const inputCls =
  "w-full rounded-lg border border-border-warm bg-cream/50 py-2.5 pl-11 pr-3.5 font-body text-sm text-navy placeholder:text-slate/55 transition-all duration-200 focus:outline-none focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/25";
const errInputCls = "border-t-red focus:border-t-red focus:ring-t-red/20";

const ROLES = [
  { value: "mbbs", label: "MBBS Student" },
  { value: "md", label: "MD / DGO" },
  { value: "dnb", label: "DNB" },
  { value: "gynecologist", label: "Gynecologist" },
  { value: "ivf", label: "IVF Specialist" },
  { value: "fellow", label: "Fellow / Resident" },
  { value: "other", label: "Other" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,16}$/;

type Errors = {
  name?: string;
  email?: string;
  mobile?: string;
  dob?: string;
  password?: string;
  confirm?: string;
  terms?: string;
};

const STRENGTH = [
  { label: "Too short", bar: "bg-t-red", width: "w-1/4" },
  { label: "Weak", bar: "bg-t-red", width: "w-1/4" },
  { label: "Fair", bar: "bg-t-gold", width: "w-2/4" },
  { label: "Good", bar: "bg-gold", width: "w-3/4" },
  { label: "Strong", bar: "bg-t-green", width: "w-full" },
] as const;

/* — icons — */
const icon =
  "w-[17px] h-[17px] stroke-slate/60 stroke-[1.6] fill-none [vector-effect:non-scaling-stroke]";
const UserIcon = () => (
  <svg viewBox="0 0 24 24" className={icon}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" className={icon}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className={icon}>
    <path
      d="M5 4h4l2 5-3 2a14 14 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
      strokeLinejoin="round"
    />
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" className={icon}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
  </svg>
);
const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" className={icon}>
    <circle cx="12" cy="9" r="3" />
    <path d="M6 21v-1a6 6 0 0 1 12 0v1" strokeLinecap="round" />
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" className={icon}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
  </svg>
);
const eyeIcon = "w-[17px] h-[17px] stroke-current stroke-[1.6] fill-none";
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className={eyeIcon} aria-hidden="true">
    <path
      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" className={eyeIcon} aria-hidden="true">
    <path
      d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-3.2 4.2M6.6 6.6A18.4 18.4 0 0 0 2 12s3.5 7 10 7a10.8 10.8 0 0 0 4.2-.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.9 9.9a3 3 0 0 0 4.2 4.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="m3 3 18 18" strokeLinecap="round" />
  </svg>
);

function Field({
  label,
  required,
  icon,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="ml-1 text-t-red">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          {icon}
        </span>
        {children}
      </div>
      {error && <p className="mt-1.5 text-[12px] text-t-red">{error}</p>}
    </div>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    role: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [signedUpEmail, setSignedUpEmail] = useState<string | null>(null);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const strength = useMemo(() => {
    const p = form.password;
    if (!p) return -1;
    if (p.length < 8) return 0;
    let s = 1;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  }, [form.password]);

  const today = new Date().toISOString().split("T")[0];

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    // mobile & dob are optional — only validated when provided
    if (form.mobile.trim() && !PHONE_RE.test(form.mobile.trim()))
      next.mobile = "Enter a valid mobile number.";
    if (form.dob && form.dob > today)
      next.dob = "Date of birth can't be in the future.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8)
      next.password = "Use at least 8 characters.";
    if (!form.confirm) next.confirm = "Please re-enter your password.";
    else if (form.confirm !== form.password)
      next.confirm = "Passwords do not match.";
    if (!form.terms) next.terms = "Please accept the terms to continue.";
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    setFormError(null);
    try {
      await apiPost("/auth/signup", {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        dob: form.dob || undefined,
        role: form.role || undefined,
        password: form.password,
      });
      setSignedUpEmail(form.email.trim());
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Sign up failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async (cred: CredentialResponse) => {
    if (!cred.credential) return;
    setFormError(null);
    try {
      const data = await apiPost<{ token: string; user: AuthUser }>(
        "/auth/google",
        { credential: cred.credential }
      );
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Google sign-in failed."
      );
    }
  };

  if (signedUpEmail) {
    return (
      <section className="-mt-20 min-h-screen flex items-center justify-center bg-[#0A0E16] px-5">
        <div className="absolute inset-0 bg-[url('/images/header_footer.webp')] bg-cover bg-center opacity-20 pointer-events-none" />
        <div className="relative z-[1] w-full max-w-[420px] border border-gold/20 bg-[rgba(10,14,22,0.75)] backdrop-blur-sm px-8 py-10 text-center">
          <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4 4 8-8" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-gold block mb-4">
            Check your inbox
          </span>
          <h1 className="font-display font-medium text-[26px] text-ivory mb-3 leading-[1.15]">
            Verify your email
          </h1>
          <p className="text-[14px] text-ivory/60 mb-2 leading-[1.65]">
            We sent a verification link to
          </p>
          <p className="font-mono text-[13px] text-gold mb-8 break-all">{signedUpEmail}</p>
          <p className="text-[13px] text-ivory/40 mb-6">
            Click the link in the email to activate your account, then sign in.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[linear-gradient(90deg,#b9842a,#f7db7d,#b9842a)] text-navy font-mono font-bold text-[11px] tracking-[0.16em] uppercase hover:brightness-110 transition-all"
          >
            Go to Sign In →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-ivory min-h-[calc(100vh-60px)] flex items-center py-[clamp(13px,4vw,25px)] px-[clamp(20px,2vw,60px)] overflow-hidden">
      {/* soft decorative glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 w-[380px] h-[380px] rounded-full bg-gold/10 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 w-[320px] h-[320px] rounded-full bg-navy/5 blur-[120px] pointer-events-none"
      />

      <div className="relative w-full max-w-[840px] mx-auto bg-white rounded-[20px] shadow-[0_30px_70px_-30px_rgba(30,42,68,0.32)] border border-border-warm overflow-hidden grid grid-cols-1 md:grid-cols-5">
        {/* Left brand panel */}
        <div className="relative bg-navy text-white p-10 hidden md:flex flex-col justify-center md:col-span-2 overflow-hidden">
          <img
            src="./images/Login.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/70 to-navy" />
          <div className="relative z-10">
            <span className="inline-block font-mono text-[10px] tracking-[0.26em] uppercase text-gold-light mb-4">
              Join STAR Academy
            </span>
            <h2 className="font-display text-[30px] font-medium mb-3 leading-[1.15]">
              Begin a stepwise journey in infertility &amp; IVF.
            </h2>
            <p className="text-sm leading-relaxed text-white/80">
              Create your account to enroll in the four-tier STAR pathway, taught
              live by Dr. Sunita Tandulwadkar.
            </p>
          </div>
          <ul className="relative z-10 space-y-3 text-sm mt-8">
            {[
              "Foundation to Masterclass tiers",
              "Live sessions on Zoom",
              "Personalised academic guidance",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/15 border border-gold/40 grid place-items-center text-gold-light text-[11px]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right form panel */}
        <div className="p-5 sm:p-9 md:p-5 md:col-span-3">
          <h1 className="font-display text-[clamp(26px,3vw,32px)] font-medium text-navy mb-1 leading-tight">
            Create your account
          </h1>
          <p className="text-[13px] text-slate mb-5">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-gold-deep font-medium hover:text-navy transition-colors"
            >
              Sign in
            </Link>
          </p>

          <form className="space-y-4 text-black-500" onSubmit={handleSubmit} noValidate>
            {formError && (
              <p className="rounded-lg border border-t-red/40 bg-t-red/10 px-3 py-2 text-[13px] text-t-red">
                {formError}
              </p>
            )}
            <Field  label="Full Name" required icon={<UserIcon />} error={errors.name}>
              <input
                type="text"
                autoComplete="name"
                placeholder="Rahul Kumar"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
                className={`${inputCls} ${errors.name ? errInputCls : ""}`}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email" required icon={<MailIcon />} error={errors.email}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  className={`${inputCls} ${errors.email ? errInputCls : ""}`}
                />
              </Field>

              <Field
                label="Mobile Number"
                icon={<PhoneIcon />}
                error={errors.mobile}
              >
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={form.mobile}
                  onChange={(e) => set("mobile", e.target.value)}
                  aria-invalid={!!errors.mobile}
                  className={`${inputCls} ${errors.mobile ? errInputCls : ""}`}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Date of Birth"
                icon={<CalendarIcon />}
                error={errors.dob}
              >
                <input
                  type="date"
                  max={today}
                  value={form.dob}
                  onChange={(e) => set("dob", e.target.value)}
                  aria-invalid={!!errors.dob}
                  className={`${inputCls} ${errors.dob ? errInputCls : ""}`}
                />
              </Field>

              <div>
                <label className={labelCls}>You Are A</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <BadgeIcon />
                  </span>
                  <select
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                    className={`${inputCls} pr-10 appearance-none cursor-pointer ${
                      form.role ? "" : "text-slate/55"
                    }`}
                  >
                    <option value="">Select your role</option>
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value} className="text-navy">
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate/60">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-current stroke-[1.8] fill-none"
                    >
                      <path
                        d="m6 9 6 6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="password">
                  Password
                  <span className="ml-1 text-t-red">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    aria-invalid={!!errors.password}
                    className={`${inputCls} !pr-11 ${
                      errors.password ? errInputCls : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate hover:text-navy transition-colors"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {strength >= 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-border-warm/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${STRENGTH[strength].bar} ${STRENGTH[strength].width}`}
                      />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-slate">
                      {STRENGTH[strength].label}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-1.5 text-[12px] text-t-red">
                    {errors.password}
                  </p>
                )}
              </div>

              <Field
                label="Confirm Password"
                required
                icon={<LockIcon />}
                error={errors.confirm}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={form.confirm}
                  onChange={(e) => set("confirm", e.target.value)}
                  aria-invalid={!!errors.confirm}
                  className={`${inputCls} !pr-11 ${
                    errors.confirm ? errInputCls : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate hover:text-navy transition-colors"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </Field>
            </div>

            <div>
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => set("terms", e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-navy"
                />
                <span className="text-[13px] text-slate leading-[1.5]">
                  I agree to the{" "}
                  <a href="#" className="text-gold-deep hover:text-navy">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-gold-deep hover:text-navy">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1.5 text-[12px] text-t-red">{errors.terms}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full justify-center inline-flex items-center gap-2.5 px-7 py-2 font-body font-medium text-[15px] tracking-[0.02em] border border-navy rounded-[2px] cursor-pointer transition-all duration-300 bg-navy text-gold-light hover:bg-black hover:border-gold hover:text-gold disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {submitting ? "Creating account…" : "Create Account"}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>

            <div className="flex items-center gap-3 pt-1">
              <span className="h-px flex-1 bg-border-warm" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
                or
              </span>
              <span className="h-px flex-1 bg-border-warm" />
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogle}
                onError={() => setFormError("Google sign-in failed.")}
                text="signup_with"
                shape="rectangular"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
