import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const { sessionKicked, clearKicked } = useAuth();

  return (
    <>
      <Nav />

      {sessionKicked && (
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

      <main>
        <div key={pathname} className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
