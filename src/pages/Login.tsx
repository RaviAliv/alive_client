import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { apiPost } from "../lib/api";
import { useAuth, type AuthUser } from "../context/AuthContext";

const inputCls =
  "w-full px-[15px] py-[13px] bg-[rgba(255,255,255,0.06)] md:bg-white border border-[rgba(197,164,109,0.25)] md:border-border-warm font-body text-sm text-ivory md:text-navy placeholder:text-ivory/30 md:placeholder:text-slate/40 transition-colors focus:outline-none focus:border-gold md:focus:border-gold";
const labelCls =
  "block font-bold text-[10.5px] tracking-[0.2em] text-gold/80 md:text-gold-deep uppercase mb-2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const eyeIconCls = "w-[18px] h-[18px] stroke-current stroke-[1.6] fill-none";
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className={eyeIconCls} aria-hidden="true">
    <path
      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" className={eyeIconCls} aria-hidden="true">
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

type Errors = { email?: string; password?: string };

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
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
      const data = await apiPost<{ token: string; user: AuthUser }>(
        "/auth/login",
        { email: email.trim(), password }
      );
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async (cred: CredentialResponse) => {
    if (!cred.credential) return;
    setFormError(null);
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#0A0E16] md:bg-ivory py-0 md:py-8 px-0 md:px-6 -mt-1">
      <div className="w-full max-w-[720px] mx-auto overflow-hidden md:rounded-2xl md:shadow-[0_20px_50px_-20px_rgba(30,42,68,0.18)] md:border md:border-border-warm grid grid-cols-1 md:grid-cols-5">

        {/* Mobile-only brand header */}
        <div className="relative md:hidden overflow-hidden" style={{ minHeight: 180 }}>
          <img src="/images/SignUp.webp" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E16]/60 to-[#0A0E16]" />
          <div className="relative z-10 px-6 pt-10 pb-6 text-center">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/70 block mb-2">STAR Academy of SRT</span>
            <h2 className="text-[26px] font-medium text-ivory leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Welcome back.</h2>
            <p className="text-[12.5px] text-ivory/50 mt-1">Sign in to continue your learning journey</p>
          </div>
        </div>

        {/* Desktop left brand panel */}
        <div className="relative bg-navy text-white p-4 hidden md:flex flex-col justify-center md:col-span-2">
          <img src="/images/SignUp.webp" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-10">
            <span className="inline-block font-mono text-[10px] tracking-[0.26em] uppercase text-gold-light mb-3">STAR Academy</span>
            <h2 className="font-display text-[28px] font-medium mb-3 leading-tight">Welcome back to your learning journey.</h2>
            <p className="text-sm leading-relaxed text-white/85">Sign in to access your enrolled courses, live sessions, and learning resources from the STAR pathway.</p>
          </div>
        </div>

        {/* Form panel */}
        <div className="bg-[#0A0E16] md:bg-white px-6   pb-8 md:col-span-3">
          <h1 className="text-[26px] md:text-[32px] font-medium text-ivory md:text-navy mb-1 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Sign in</h1>
          <p className="text-[13px] text-ivory/50 md:text-slate mb-6">
            New here?{" "}
            <Link to="/signup" className="text-gold font-medium hover:text-gold/80 md:hover:text-navy transition-colors">
              Create an account
            </Link>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {formError && (
              <p className="rounded-lg border border-t-red/40 bg-t-red/10 px-3 py-2 text-[13px] text-t-red">
                {formError}
              </p>
            )}
            <div>
              <label className={labelCls} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                className={`${inputCls} ${
                  errors.email ? "border-t-red focus:border-t-red" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-[12px] text-t-red">{errors.email}</p>
              )}
            </div>

            <div>
              <label className={labelCls} htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!errors.password}
                  className={`${inputCls} pr-12 ${
                    errors.password ? "border-t-red focus:border-t-red" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ivory/40 md:text-slate hover:text-ivory md:hover:text-navy transition-colors"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-[12px] text-t-red">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-[13px] text-ivory/60 md:text-slate">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[13px] text-gold/80 hover:text-gold md:text-gold-deep md:hover:text-navy transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full justify-center inline-flex items-center gap-2.5 px-5 py-2 font-body font-bold text-[15px] tracking-[0.02em] rounded-lg cursor-pointer transition-all duration-300 bg-[#A87928] text-black hover:brightness-110 hover:shadow-[0_8px_22px_-6px_rgba(247,219,125,0.4)] disabled:opacity-60 disabled:cursor-not-allowed group md:bg-navy md:text-gold-light md:rounded-[2px] md:hover:bg-black md:hover:border-gold md:border md:border-navy"
            >
              {submitting ? "Signing in…" : "Sign In"}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </button>

            <div className="flex items-center gap-3 ">
              <span className="h-px flex-1 bg-[rgba(197,164,109,0.2)] md:bg-border-warm" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/30 md:text-slate">or</span>
              <span className="h-px flex-1 bg-[rgba(197,164,109,0.2)] md:bg-border-warm" />
            </div>
            <div className="w-full -mt-2 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogle}
                onError={() => setFormError("Google sign-in failed.")}
                text="continue_with"
                shape="rectangular"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
