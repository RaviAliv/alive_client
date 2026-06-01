import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/faculty", label: "Faculty" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const goldGradient = "bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]";
const goldGradientText = `${goldGradient} bg-clip-text text-transparent`;
const goldGradientTextHover =
  "hover:bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)] hover:bg-clip-text hover:text-transparent";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] bg-[linear-gradient(rgba(12,16,26,0.55),rgba(12,16,26,0.55)),url('/images/navbar.webp')] bg-cover bg-center border-b border-[rgba(197,164,109,0.18)] transition-[padding] duration-300 ${
        scrolled ? "py-3" : "py-[10px]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-[clamp(20px,4vw,80px)] flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => navigate("/")}
        >
          <div className="w-16 h-9 sm:w-20 sm:h-10 flex-shrink-0">
            <img src="/images/logo.png" alt="STAR Academy logo" className="w-full h-[40px]" />
          </div>
          <div className={`font-display font-medium text-sm sm:text-md leading-[1.2] tracking-[0.01em] ${goldGradientText}`}>
            Sunita Tandulwadkar
            <span className={`block text-[6.5px] sm:text-[7.3px] font-mono font-normal tracking-[0.22em] uppercase mt-[3px] ${goldGradientText}`}>
              Academy of Reproduction
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-[34px] list-none">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `font-body text-sm font-medium tracking-[0.04em] py-1.5 border-b transition-[opacity,color] duration-200 ${
                    isActive
                      ? `opacity-100 border-gold ${goldGradientText}`
                      : `text-ivory opacity-85 border-transparent hover:opacity-100 hover:border-gold ${goldGradientTextHover}`
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className={`hidden md:inline-flex flex-shrink-0 items-center gap-2.5 px-4 py-2 font-body font-bold text-[15px] tracking-[0.02em] border border-gold text-navy rounded-[2px] cursor-pointer transition-all duration-300 ease-in-out hover:brightness-110 group ${goldGradient}`}
          >
            Logout
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </button>
        ) : (
          <Link
            to="/login"
            className={`hidden md:inline-flex flex-shrink-0 items-center gap-2.5 px-4 py-2 font-body font-bold text-[15px] tracking-[0.02em] border border-gold text-navy rounded-[2px] transition-all duration-300 ease-in-out hover:brightness-110 group ${goldGradient}`}
          >
            Login
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        )}

        {/* Hamburger — animated to X when open */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden relative flex flex-col justify-center items-center w-9 h-9 shrink-0"
        >
          <span className={`block w-5 h-[1.5px] bg-[#f7db7d] absolute transition-all duration-[250ms] ${mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-[5px]"}`} />
          <span className={`block w-5 h-[1.5px] bg-[#f7db7d] transition-all duration-[250ms] ${mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"}`} />
          <span className={`block w-5 h-[1.5px] bg-[#f7db7d] absolute transition-all duration-[250ms] ${mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-[5px]"}`} />
        </button>
      </div>

      {/* Mobile menu — full-screen overlay */}
      <div
        className={`md:hidden fixed inset-0 top-[var(--nav-h,56px)] z-[99] transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "linear-gradient(180deg,rgba(8,14,22,0.98) 0%,rgba(8,14,22,1) 100%)" }}
      >
        <div className="flex flex-col h-full px-6 pt-6 pb-10 overflow-y-auto">
          <ul className="flex flex-col list-none divide-y divide-[rgba(197,164,109,0.10)]">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 font-body text-[17px] font-medium tracking-[0.03em] ${
                      isActive ? goldGradientText : "text-ivory/80"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{l.label}</span>
                      {isActive && <span className={`text-[11px] font-mono tracking-[0.18em] ${goldGradientText}`}>◆</span>}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`w-full flex items-center justify-center gap-2.5 px-4 py-3.5 font-body font-bold text-[15px] tracking-[0.04em] border border-gold text-navy rounded-[2px] ${goldGradient}`}
              >
                Logout &rarr;
              </button>
            ) : (
              <Link
                to="/login"
                className={`w-full flex items-center justify-center gap-2.5 px-4 py-3.5 font-body font-bold text-[15px] tracking-[0.04em] border border-gold text-navy rounded-[2px] ${goldGradient}`}
              >
                Login &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
