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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] bg-[linear-gradient(rgba(12,16,26,0.55),rgba(12,16,26,0.55)),url('/images/navbar.webp')] bg-cover bg-center border-b border-[rgba(197,164,109,0.18)] transition-[padding] duration-300 ${
        scrolled ? "py-2.5" : "py-[10px]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] flex items-center justify-between gap-10">
        <div
          className="flex items-center gap-3.5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-20 h-10 rounded-[2px] p-[3px]  flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="STAR Academy logo"
              
            />
          </div>
          <div
            className={`font-display font-medium text-md leading-[1.2] tracking-[0.01em] ${goldGradientText}`}
          >
            Sunita Tandulwadkar
            <span
              className={`block text-[7.3px] font-mono font-normal tracking-[0.22em] uppercase mt-[3px] ${goldGradientText}`}
            >
              Academy of Reproduction
            </span>
          </div>
        </div>

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

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className={`hidden md:inline-flex flex-shrink-0 items-center gap-2.5 px-4 py-2 font-body font-bold text-[15px] tracking-[0.02em] border border-gold text-navy rounded-[2px] cursor-pointer transition-all duration-300 ease-in-out hover:brightness-110 group ${goldGradient}`}
          >
            Logout
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </button>
        ) : (
          <Link
            to="/login"
            className={`hidden md:inline-flex flex-shrink-0 items-center gap-2.5 px-4 py-2 font-body font-bold text-[15px] tracking-[0.02em] border border-gold text-navy rounded-[2px] transition-all duration-300 ease-in-out hover:brightness-110 group ${goldGradient}`}
          >
            Login
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        )}

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden bg-transparent border-0 cursor-pointer p-2"
        >
          <span className="block w-[22px] h-[1.5px] bg-gold-light my-[5px] transition-all duration-300" />
          <span className="block w-[22px] h-[1.5px] bg-gold-light my-[5px] transition-all duration-300" />
          <span className="block w-[22px] h-[1.5px] bg-gold-light my-[5px] transition-all duration-300" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[rgba(197,164,109,0.18)]">
          <ul className="flex flex-col px-[clamp(20px,4vw,80px)] py-3 list-none">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `block py-3 font-body text-sm font-medium tracking-[0.04em] border-b border-[rgba(197,164,109,0.12)] ${
                      isActive
                        ? goldGradientText
                        : `text-ivory opacity-85 ${goldGradientTextHover}`
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`inline-flex items-center gap-2.5 px-4 py-2 font-body font-bold text-[15px] tracking-[0.02em] border border-gold text-navy rounded-[2px] cursor-pointer ${goldGradient}`}
                >
                  Logout
                  <span>&rarr;</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`inline-flex items-center gap-2.5 px-4 py-2 font-body font-bold text-[15px] tracking-[0.02em] border border-gold text-navy rounded-[2px] ${goldGradient}`}
                >
                  Login
                  <span>&rarr;</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
