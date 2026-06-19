import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { setPostLoginRedirect } from "../../lib/postLoginRedirect";

const ENROLL_PATH = "/course/foundation/enroll";

const POPUP_DELAY_MS = 20_000;

export default function LectureRegisterPrompt({ accent }: { accent: string }) {
  const [visible, setVisible] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) return;
    const timer = setTimeout(() => setVisible(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  const dismiss = () => setVisible(false);

  const handleRegister = () => {
    if (isLoggedIn) {
      navigate(ENROLL_PATH);
      dismiss();
      return;
    }
    setPostLoginRedirect(ENROLL_PATH);
    navigate("/login");
  };

  if (!visible || isLoggedIn) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center px-4"
      style={{ background: "rgba(6,8,14,0.78)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="relative w-full max-w-[400px] bg-[#0c1018] border border-[rgba(197,164,109,0.25)] rounded-2xl overflow-hidden shadow-[0_40px_80px_-16px_rgba(0,0,0,0.8)] animate-fade-in">
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${accent}, #f7db7d, ${accent})` }} />

        <div className="px-8 pt-7 pb-8 text-center">
          <div className="w-12 h-12 mx-auto mb-5 rounded-full border border-[rgba(197,164,109,0.3)] bg-[rgba(197,164,109,0.08)] flex items-center justify-center">
            <img src="/images/logo.png" alt="STAR" className="w-7 h-7 object-contain" />
          </div>

          <span className="font-mono text-[9.5px] tracking-[0.28em] uppercase text-gold-deep/80 block mb-3">
            Seats Are Limited
          </span>

          <h2 className="font-display font-medium text-[22px] leading-[1.15] text-ivory mb-3">
            Ready to reserve your seat?
          </h2>

          <p className="text-[13.5px] leading-[1.65] text-ivory/50 mb-7 max-w-[30ch] mx-auto">
            Register now to join Dr. Sunita Tandulwadkar live and lock in your place in the cohort.
          </p>

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleRegister}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-body font-bold text-[14px] tracking-[0.02em] bg-[#A87928] hover:brightness-110 hover:shadow-[0_8px_22px_-6px_rgba(247,219,125,0.5)] text-black rounded-lg transition-all duration-200 group"
            >
              Register Now
              <span className="inline-block group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-ivory/25 hover:text-ivory/50 transition-colors"
            >
              Continue browsing
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-ivory/30 hover:text-ivory/70 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
