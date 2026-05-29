import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setFormError("");

    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setEmailError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setSent(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="-mt-20 min-h-screen flex items-center justify-center bg-[#0A0E16] px-5">
      <div className="absolute inset-0 bg-[url('/images/header_footer.webp')] bg-cover bg-center opacity-20 pointer-events-none" />

      <div className="relative z-[1] w-full max-w-[420px] border border-gold/20 bg-[rgba(10,14,22,0.75)] backdrop-blur-sm px-8 py-10">

        {sent ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 6l8 5 8-5M2 6v9a1 1 0 001 1h14a1 1 0 001-1V6" stroke="#C5A46D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-gold block mb-4">
              Email Sent
            </span>
            <h1 className="font-display font-medium text-[26px] text-ivory mb-3 leading-[1.15]">
              Check your inbox
            </h1>
            <p className="text-[14px] text-ivory/60 mb-8 leading-[1.65]">
              If an account exists for <span className="text-gold font-mono text-[13px]">{email}</span>, you will receive a password reset link shortly.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-7 py-3 border border-gold/50 text-gold font-mono text-[11px] tracking-[0.16em] uppercase hover:bg-gold hover:text-navy transition-all"
            >
              Back to Sign In →
            </Link>
          </div>
        ) : (
          <>
            <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-gold block mb-5">
              Password Reset
            </span>
            <h1 className="font-display font-medium text-[26px] text-ivory mb-2 leading-[1.15]">
              Forgot your password?
            </h1>
            <p className="text-[14px] text-ivory/55 mb-8 leading-[1.65]">
              Enter your account email and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {formError && (
                <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-400">
                  {formError}
                </p>
              )}

              <div>
                <label className="block font-mono text-[10.5px] tracking-[0.2em] uppercase text-gold/70 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-gold/20 text-ivory placeholder:text-ivory/30 font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                />
                {emailError && (
                  <p className="mt-1.5 text-[12px] text-red-400">{emailError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[linear-gradient(90deg,#b9842a,#f7db7d,#b9842a)] text-navy font-mono font-bold text-[11px] tracking-[0.16em] uppercase hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send Reset Link →"}
              </button>

              <p className="text-center text-[13px] text-ivory/40">
                Remember your password?{" "}
                <Link to="/login" className="text-gold hover:text-gold/70 transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
