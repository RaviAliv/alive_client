import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Nav from "./Nav";
import Footer from "./Footer";
import ActivityLoginPrompt from "./ActivityLoginPrompt";

const AUTH_PATHS = ["/login", "/signup"];

export default function Layout() {
  const { pathname } = useLocation();
  const { sessionKicked, clearKicked } = useAuth();

  // Clear the kicked banner automatically when user reaches the login page,
  // and auto-dismiss after 6s on any other page.
  useEffect(() => {
    if (!sessionKicked) return;
    if (AUTH_PATHS.some((p) => pathname.startsWith(p))) {
      clearKicked();
      return;
    }
    const t = setTimeout(clearKicked, 6000);
    return () => clearTimeout(t);
  }, [sessionKicked, pathname]);

  const showBanner = sessionKicked && !AUTH_PATHS.some((p) => pathname.startsWith(p));

  return (
    <>
      <Nav />

      {showBanner && (
        <div className="fixed top-0 inset-x-0 z-[200] bg-red-700 text-white text-center px-4 py-3 flex items-center justify-center gap-4">
          <span className="text-sm font-mono tracking-wide">
            You were signed out because your account was logged in on another device.
          </span>
          <button
            onClick={clearKicked}
            className="text-white/70 hover:text-white text-lg leading-none"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      <ActivityLoginPrompt />

      <main>
        <div key={pathname} className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
