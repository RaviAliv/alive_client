import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/faculty", label: "Faculty" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const courseLinks = [
  { to: "/course/foundation", label: "Foundation Series", tier: "Tier I",   color: "#21864E" },
  { to: "/course/core",       label: "Core Series",       tier: "Tier II",  color: "#D4A621" },
  { to: "/course/advanced",   label: "Advanced Series",   tier: "Tier III", color: "#1E5AA6" },
  { to: "/course/masterclass",label: "Masterclass Series",       tier: "Tier IV",  color: "#C8102E" },
];

const goldGradient = "bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]";
const goldGradientText = `${goldGradient} bg-clip-text text-transparent`;
const goldGradientTextHover =
  "hover:bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)] hover:bg-clip-text hover:text-transparent";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesExpanded, setCoursesExpanded] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isCoursesActive = pathname.startsWith("/courses") || pathname.startsWith("/course/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCoursesExpanded(false);
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
          {/* Home */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `font-body text-sm font-medium tracking-[0.04em] py-1.5 border-b transition-[opacity,color] duration-200 ${
                  isActive
                    ? `opacity-100 border-gold ${goldGradientText}`
                    : `text-ivory opacity-85 border-transparent hover:opacity-100 hover:border-gold ${goldGradientTextHover}`
                }`
              }
            >
              Home
            </NavLink>
          </li>

          {/* Courses — dropdown on hover */}
          <li className="relative group/courses">
            {/* Clicking the label navigates to /courses */}
            <button
              onClick={() => navigate("/courses")}
              className={`font-body text-sm font-medium tracking-[0.04em] py-1.5 flex items-center gap-1 transition-[opacity,color] duration-200 cursor-pointer ${
                isCoursesActive
                  ? `opacity-100 ${goldGradientText}`
                  : `text-ivory opacity-85 hover:opacity-100 ${goldGradientTextHover}`
              }`}
            >
              <span className={`border-b ${isCoursesActive ? "border-gold" : "border-transparent group-hover/courses:border-gold"}`}>Courses</span>
              <svg
                className="w-3 h-3 transition-transform duration-200 group-hover/courses:rotate-180 mt-px"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Invisible bridge fills the gap so hover doesn't break mid-way */}
            <div className="absolute top-full left-0 right-0 h-3 opacity-0 group-hover/courses:pointer-events-auto pointer-events-none" />

            {/* Dropdown panel — pt-3 creates the visual gap without a hover dead zone */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[230px] pt-3 opacity-0 pointer-events-none group-hover/courses:opacity-100 group-hover/courses:pointer-events-auto transition-all duration-200 translate-y-1 group-hover/courses:translate-y-0">
              {/* Arrow */}
              <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#0c1018] border-l border-t border-[rgba(197,164,109,0.3)]" />
              <div className="bg-[#0c1018] border border-[rgba(197,164,109,0.25)] rounded-xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]">
                <div className="px-4 pt-3 pb-1">
                  <span className="font-mono text-[8px] tracking-[0.28em] uppercase text-gold-deep/70">Learning Pathway</span>
                </div>
                {courseLinks.map((c) => (
                  <Link
                    key={c.to}
                    to={c.to}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.06] transition-colors duration-150 group/item"
                  >
                    <span
                      className="w-[3px] h-8 rounded-full shrink-0"
                      style={{ background: c.color }}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-body text-[13px] font-medium text-ivory/90 group-hover/item:text-ivory leading-snug">{c.label}</span>
                      <span className="font-mono text-[8.5px] tracking-[0.18em] uppercase mt-[2px]" style={{ color: c.color }}>{c.tier}</span>
                    </div>
                  </Link>
                ))}
                <div className="mx-4 border-t border-[rgba(197,164,109,0.12)] mt-1" />
                <Link
                  to="/courses"
                  className="flex items-center justify-between px-4 py-2.5 font-body text-[11.5px] font-medium tracking-[0.04em] text-gold/70 hover:text-gold transition-colors"
                >
                  View all courses
                  <span className="text-[13px]">&rarr;</span>
                </Link>
              </div>
            </div>
          </li>

          {/* Remaining links */}
          {links.filter(l => l.to !== "/").map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
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
            className={`hidden md:inline-flex flex-shrink-0 items-center gap-2.5 px-4 py-2 font-body font-bold text-[15px] tracking-[0.02em] border border-gold-deep text-black rounded-md bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] group`}
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
            {/* Home */}
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center justify-between py-4 font-body text-[17px] font-medium tracking-[0.03em] ${
                    isActive ? goldGradientText : "text-ivory/80"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>Home</span>
                    {isActive && <span className={`text-[11px] font-mono tracking-[0.18em] ${goldGradientText}`}>◆</span>}
                  </>
                )}
              </NavLink>
            </li>

            {/* Courses — expandable */}
            <li>
              <button
                onClick={() => setCoursesExpanded((v) => !v)}
                className={`flex items-center justify-between w-full py-4 font-body text-[17px] font-medium tracking-[0.03em] ${
                  isCoursesActive ? goldGradientText : "text-ivory/80"
                }`}
              >
                <span>Courses</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-250 ${coursesExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Sub-items */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  coursesExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-3 pl-3 flex flex-col gap-0.5">
                  {courseLinks.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/[0.05] transition-colors"
                    >
                      <span
                        className="w-[3px] h-8 rounded-full shrink-0"
                        style={{ background: c.color }}
                      />
                      <div>
                        <div className="font-body text-[15px] font-medium text-ivory/85">{c.label}</div>
                        <div className="font-mono text-[9px] tracking-[0.18em] uppercase mt-[1px]" style={{ color: c.color }}>{c.tier}</div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/courses"
                    className="flex items-center gap-2 py-2 px-3 mt-1 font-body text-[13px] text-gold/70 hover:text-gold transition-colors"
                  >
                    <span>View all courses</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            </li>

            {/* Remaining links */}
            {links.filter(l => l.to !== "/").map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
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
