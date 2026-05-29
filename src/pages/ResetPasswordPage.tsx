import { useState, type FormEvent } from "react";
import { useSearchParams, Link } from "react-router-dom";

type Status = "form" | "success" | "error";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(token ? "form" : "error");
  const [errorMsg, setErrorMsg] = useState(token ? "" : "No reset token found in the link.");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!password) next.password = "Password is required.";
    else if (password.length < 8) next.password = "Use at least 8 characters.";
    if (!confirm) next.confirm = "Please re-enter your password.";
    else if (confirm !== password) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Reset failed.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="-mt-20 min-h-screen flex items-center justify-center bg-[#0A0E16] px-5">
      <div className="absolute inset-0 bg-[url('/images/header_footer.webp')] bg-cover bg-center opacity-20 pointer-events-none" />

      <div className="relative z-[1] w-full max-w-[420px] border border-gold/20 bg-[rgba(10,14,22,0.75)] backdrop-blur-sm px-8 py-10">

        {status === "success" && (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-gold block mb-4">
              Password Updated
            </span>
            <h1 className="font-display font-medium text-[26px] text-ivory mb-3 leading-[1.15]">
              All done!
            </h1>
            <p className="text-[14px] text-ivory/60 mb-8 leading-[1.65]">
              Your password has been reset. You can now sign in with your new password.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[linear-gradient(90deg,#b9842a,#f7db7d,#b9842a)] text-navy font-mono font-bold text-[11px] tracking-[0.16em] uppercase hover:brightness-110 transition-all"
            >
              Sign In →
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border border-red-500/40 flex items-center justify-center mx-auto mb-6">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4l10 10M14 4L4 14" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-red-400 block mb-4">
              Link Invalid
            </span>
            <h1 className="font-display font-medium text-[24px] text-ivory mb-3 leading-[1.15]">
              Reset link expired.
            </h1>
            <p className="text-[14px] text-ivory/60 mb-8 leading-[1.65]">
              {errorMsg || "This link may have expired or already been used."}
            </p>
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 px-7 py-3 border border-gold/50 text-gold font-mono text-[11px] tracking-[0.16em] uppercase hover:bg-gold hover:text-navy transition-all"
            >
              Request New Link →
            </Link>
          </div>
        )}

        {status === "form" && (
          <>
            <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-gold block mb-5">
              Password Reset
            </span>
            <h1 className="font-display font-medium text-[26px] text-ivory mb-2 leading-[1.15]">
              Set a new password
            </h1>
            <p className="text-[14px] text-ivory/55 mb-8 leading-[1.65]">
              Choose a strong password with at least 8 characters.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label className="block font-mono text-[10.5px] tracking-[0.2em] uppercase text-gold/70 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-11 bg-white/5 border border-gold/20 text-ivory placeholder:text-ivory/30 font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-ivory/70 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-[1.6] fill-none">
                        <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-3.2 4.2M6.6 6.6A18.4 18.4 0 0 0 2 12s3.5 7 10 7a10.8 10.8 0 0 0 4.2-.8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m3 3 18 18" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-[1.6] fill-none">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-[12px] text-red-400">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block font-mono text-[10.5px] tracking-[0.2em] uppercase text-gold/70 mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-gold/20 text-ivory placeholder:text-ivory/30 font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                />
                {errors.confirm && (
                  <p className="mt-1.5 text-[12px] text-red-400">{errors.confirm}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[linear-gradient(90deg,#b9842a,#f7db7d,#b9842a)] text-navy font-mono font-bold text-[11px] tracking-[0.16em] uppercase hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Updating…" : "Reset Password →"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
