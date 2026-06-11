import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ACTIVITY_DELAY_MS = 30_000; // 30 seconds of activity
const SESSION_KEY = "star_login_prompt_shown";

const AUTH_PATHS = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-email", "/registration"];

export default function ActivityLoginPrompt() {
  const [visible, setVisible] = useState(false);
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  // Single mount-only effect — starts the activity timer once
  useEffect(() => {
    if (isLoggedIn) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (AUTH_PATHS.some((p) => window.location.pathname.startsWith(p))) return;
    if (localStorage.getItem("star_auth")) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const startTimer = () => {
      if (timer) return; // already armed
      timer = setTimeout(() => {
        // Check again at fire time — user may have logged in or navigated to auth page
        if (!sessionStorage.getItem(SESSION_KEY) &&
            !AUTH_PATHS.some((p) => window.location.pathname.startsWith(p)) &&
            !localStorage.getItem("star_auth")) {
          setVisible(true);
        }
      }, ACTIVITY_DELAY_MS);
    };

    const EVENTS = ["mousemove", "keydown", "scroll", "click", "touchstart"] as const;
    EVENTS.forEach((ev) => window.addEventListener(ev, startTimer, { once: true, passive: true }));

    return () => {
      EVENTS.forEach((ev) => window.removeEventListener(ev, startTimer));
      if (timer) clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Hide when user navigates to an auth page
  useEffect(() => {
    if (AUTH_PATHS.some((p) => pathname.startsWith(p))) setVisible(false);
  }, [pathname]);

  if (!visible || isLoggedIn) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center px-4"
      style={{ background: "rgba(6,8,14,0.78)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="relative w-full max-w-[400px] bg-[linear-gradient(rgba(10,14,22,0.96),rgba(10,14,22,0.96)),url('/images/header_footer.webp')] bg-cover bg-center border border-[rgba(197,164,109,0.25)] rounded-2xl overflow-hidden shadow-[0_40px_80px_-16px_rgba(0,0,0,0.8)] animate-fade-in">
        {/* Gold top bar */}
        <div className="h-[3px] bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]" />

        <div className="px-8 pt-7 pb-8 text-center">
          <div className="w-12 h-12 mx-auto mb-5 rounded-full border border-[rgba(197,164,109,0.3)] bg-[rgba(197,164,109,0.08)] flex items-center justify-center">
            <img src="/images/logo.png" alt="STAR" className="w-7 h-7 object-contain" />
          </div>

          <span className="font-mono text-[9.5px] tracking-[0.28em] uppercase text-gold-deep/80 block mb-3">
            STAR Academy of SRT
          </span>

          <h2 className="font-display font-medium text-[22px] leading-[1.15] text-ivory mb-3">
            Enjoying what you see?
          </h2>

          <p className="text-[13.5px] leading-[1.65] text-ivory/50 mb-7 max-w-[30ch] mx-auto">
            Login to access your enrolled courses, lecture materials, and updates from Dr. Sunita Tandulwadkar.
          </p>

          <div className="flex flex-col gap-2.5">
            <Link
              to="/login"
              onClick={dismiss}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-body font-bold text-[14px] tracking-[0.02em] bg-[#A87928] hover:brightness-110 hover:shadow-[0_8px_22px_-6px_rgba(247,219,125,0.5)] text-black rounded-lg transition-all duration-200 group"
            >
              LogIn Your Account
              <span className="inline-block group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
            <Link
              to="/signup"
              onClick={dismiss}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-body font-medium text-[13.5px] tracking-[0.02em] border border-[rgba(197,164,109,0.3)] text-gold-light rounded-lg transition-all duration-200 hover:border-gold hover:bg-[rgba(197,164,109,0.06)]"
            >
              Create Your Account
            </Link>
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
