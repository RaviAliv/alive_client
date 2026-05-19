import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

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
  const [, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
      className={`fixed top-0 left-0 right-0 z-[100] bg-[rgba(30,42,68,0.94)] backdrop-blur-md border-b border-[rgba(197,164,109,0.18)] transition-[padding] duration-300 ${
        scrolled ? "py-2.5" : "py-[10px]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] flex items-center justify-between gap-10">
        <div
          className="flex items-center gap-3.5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-white rounded-[2px] p-[3px] border border-gold flex-shrink-0">
            <img
              src="/images/logo.webp"
              alt="STAR Academy logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className={`font-display font-medium text-xl leading-[1.2] tracking-[0.01em] ${goldGradientText}`}
          >
            Sunita Tandulwadkar
            <span
              className={`block text-[10.5px] font-mono font-normal tracking-[0.22em] uppercase mt-[3px] ${goldGradientText}`}
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

        <Link
          to="/foundation"
          className={`hidden md:inline-flex flex-shrink-0 items-center gap-2.5 px-4 py-3 font-body font-bold text-[15px] tracking-[0.02em] border border-gold text-navy rounded-[2px] transition-all duration-300 ease-in-out hover:brightness-110 group ${goldGradient}`}
        >
          Enroll Now
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
          className="md:hidden bg-transparent border-0 cursor-pointer p-2"
        >
          <span className="block w-[22px] h-[1.5px] bg-gold-light my-[5px] transition-all duration-300" />
          <span className="block w-[22px] h-[1.5px] bg-gold-light my-[5px] transition-all duration-300" />
          <span className="block w-[22px] h-[1.5px] bg-gold-light my-[5px] transition-all duration-300" />
        </button>
      </div>
    </nav>
  );
}
