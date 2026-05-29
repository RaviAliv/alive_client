import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const [params]  = useSearchParams();
  const [status,  setStatus]  = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      setMessage("No verification token found in the link.");
      return;
    }

    fetch(`/api/auth/verify-email/${token}`)
      .then(async (res) => {
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Could not reach the server. Please try again.");
      });
  }, [params]);

  return (
    <section className="-mt-20 min-h-screen flex items-center justify-center bg-[#0A0E16] px-5">
      <div className="absolute inset-0 bg-[url('/images/header_footer.webp')] bg-cover bg-center opacity-20 pointer-events-none" />

      <div className="relative z-[1] w-full max-w-[420px] border border-gold/20 bg-[rgba(10,14,22,0.75)] backdrop-blur-sm px-8 py-10 text-center">

        {status === "loading" && (
          <>
            <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-6" />
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-gold/60">
              Verifying your email…
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="#C5A46D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-gold block mb-4">
              Verified
            </span>
            <h1 className="font-display font-medium text-[26px] text-ivory mb-3 leading-[1.15]">
              Your email is confirmed.
            </h1>
            <p className="text-[14px] text-ivory/60 mb-8 leading-[1.65]">
              Your STAR Academy account is now active. You can sign in and access your courses.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[linear-gradient(90deg,#b9842a,#f7db7d,#b9842a)] text-navy font-mono font-bold text-[11px] tracking-[0.16em] uppercase hover:brightness-110 transition-all"
            >
              Sign In →
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 rounded-full border border-red-500/40 flex items-center justify-center mx-auto mb-6">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4l10 10M14 4L4 14" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-red-400 block mb-4">
              Link Invalid
            </span>
            <h1 className="font-display font-medium text-[24px] text-ivory mb-3 leading-[1.15]">
              Verification failed.
            </h1>
            <p className="text-[14px] text-ivory/60 mb-8 leading-[1.65]">
              {message || "This link may have expired or already been used."}
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-7 py-3 border border-gold/50 text-gold font-mono text-[11px] tracking-[0.16em] uppercase hover:bg-gold hover:text-navy transition-all"
            >
              Sign Up Again →
            </Link>
          </>
        )}

      </div>
    </section>
  );
}
