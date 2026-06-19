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
  {
    to: "/course/foundation",
    label: "Foundation Series",
    tier: "Tier I",
    color: "#21864E",
    lectures: [
      { title: "300-day Ovarian Symphony - HPO Axis & Follicular Endocrinology", path: "/course/foundation/lecture/01" },
      { title: "Endocrinology of Follicular Phase", path: "/course/foundation/lecture/02" },
      { title: "Ovulation – Physiology / Precision Triggering / Molecular Dynamics to Clinical Applications", path: "/course/foundation/lecture/03" },
      { title: "Luteal Phase Endocrinology and Advances in Luteal Phase Support", path: "/course/foundation/lecture/04" },
      { title: "Implantation – Decoding the Molecular Dialogue of Human Embryo Implantation", path: "/course/foundation/lecture/05" },
      { title: "Spermatogenesis - What Everyone Should Know", path: "/course/foundation/lecture/06" },
    ],
  },
  {
    to: "/course/core",
    label: "Core Series",
    tier: "Tier II",
    color: "#D4A621",
    lectures: [
      { title: "Severe Male Factor and the Limits of Routine Workup", path: "/course/core" },
      { title: "Oocyte Quality and the Follicular Microenvironment", path: "/course/core" },
      { title: "Ovulation Induction for IUI, Read Like a Clinician", path: "/course/core" },
      { title: "IUI Monitoring and Outcome Optimization", path: "/course/core" },
      { title: "Pelvic Infections and the Chronic Inflammation Cascade", path: "/course/core" },
    ],
  },
  {
    to: "/course/advanced",
    label: "Advanced Series",
    tier: "Tier III",
    color: "#1E5AA6",
    lectures: [
      { title: "Choosing the Right Stimulation Protocol", path: "/course/advanced" },
      { title: "OHSS Prevention & Safety", path: "/course/advanced" },
      { title: "Oocyte Retrieval Tips & Tricks", path: "/course/advanced" },
      { title: "Embryology for Clinicians", path: "/course/advanced" },
      { title: "Optimizing IVF Implantation", path: "/course/advanced" },
      { title: "Troubleshoot in Embryo Transfer", path: "/course/advanced" },
      { title: "Redefining Oocyte Quality", path: "/course/advanced" },
    ],
  },
  {
    to: "/course/masterclass",
    label: "Masterclass Series",
    tier: "Tier IV",
    color: "#C8102E",
    lectures: [
      { title: "Endometriosis & Infertility", path: "/course/masterclass" },
      { title: "Unexplained Infertility", path: "/course/masterclass" },
      { title: "Recurrent Implantation Failure", path: "/course/masterclass" },
      { title: "Recurrent Pregnancy Losses", path: "/course/masterclass" },
      { title: "Diminished Ovarian Reserve", path: "/course/masterclass" },
      { title: "Ovarian Rejuvenation", path: "/course/masterclass" },
      { title: "Myoma & Infertility", path: "/course/masterclass" },
      { title: "Severe Male Factor / Azoospermia", path: "/course/masterclass" },
      { title: "PCOS & Fertility", path: "/course/masterclass" },
      { title: "Difficult Embryo Transfer", path: "/course/masterclass" },
      { title: "Obesity & Infertility", path: "/course/masterclass" },
    ],
  },
];

const goldGradient = "bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]";
const goldGradientText = `${goldGradient} bg-clip-text text-transparent`;
const goldGradientTextHover =
  "hover:bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)] hover:bg-clip-text hover:text-transparent";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesExpanded, setCoursesExpanded] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const panelHref =
    user?.systemRole === "superadmin" ? "/panel/super" :
    user?.systemRole === "admin" ? "/panel/admin" :
    "/panel/my-courses";

  const roleLabel =
    user?.systemRole === "superadmin" ? "Super Admin" :
    user?.systemRole === "admin" ? "Admin" :
    "Student";

  const initials = user?.name
    ? user.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0].toUpperCase()).join("")
    : "?";

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] bg-[linear-gradient(rgba(12,16,26,0.55),rgba(12,16,26,0.55)),url('/images/navbar.webp')] bg-cover bg-center border-b border-[rgba(197,164,109,0.18)] transition-[padding] duration-300 ${
        scrolled ? "py-2" : "py-[4px]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-[clamp(20px,4vw,80px)] flex items-center justify-between ">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer shrink-0"
          onClick={() => navigate("/")}
        >
          <img src="/images/webLogo.png" alt="STAR Academy of Reproduction" className="h-9 sm:h-14 w-auto" />
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

          {/* Courses — mega-menu on hover */}
          <li className="relative group/courses">
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
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] h-3 opacity-0 group-hover/courses:pointer-events-auto pointer-events-none" />

            {/* Mega-menu panel */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] pt-3 opacity-0 pointer-events-none group-hover/courses:opacity-100 group-hover/courses:pointer-events-auto transition-all duration-200 translate-y-1 group-hover/courses:translate-y-0">
              {/* Arrow */}
              <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#0c1018] border-l border-t border-[rgba(197,164,109,0.3)]" />

              <div className="bg-[#0c1018] border border-[rgba(197,164,109,0.25)] rounded-xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]">
                {/* Panel header */}
                <div className="px-5 pt-3 pb-2 border-b border-[rgba(197,164,109,0.10)]">
                  <span className="font-mono text-[8px] tracking-[0.28em] uppercase text-gold-deep/70">Learning Pathway</span>
                </div>

                {/* 4-column grid of courses */}
                <div className="grid grid-cols-4 divide-x divide-[rgba(197,164,109,0.10)]">
                  {courseLinks.map((c) => (
                    <div key={c.to} className="px-4 py-4 flex flex-col">
                      {/* Course header — click goes to course page */}
                      <Link
                        to={c.to}
                        className="flex items-center gap-2 mb-3 shrink-0 group/hdr"
                      >
                        <span
                          className="w-[3px] h-6 rounded-full shrink-0"
                          style={{ background: c.color }}
                        />
                        <div className="min-w-0">
                          <div className="font-body text-[11.5px] font-semibold text-ivory/90 group-hover/hdr:text-ivory leading-tight">
                            {c.label}
                          </div>
                          <div
                            className="font-mono text-[9px] tracking-[0.18em] uppercase mt-[2px]"
                            style={{ color: c.color }}
                          >
                            {c.tier}
                          </div>
                        </div>
                      </Link>

                      {/* Lecture list */}
                      <div className="flex flex-col gap-[2px]">
                        {c.lectures.map((l, i) => (
                          <Link
                            key={i}
                            to={l.path}
                            className="flex items-start gap-1.5 py-[3px] px-1.5 -mx-1.5 rounded hover:bg-white/[0.05] group/lec transition-colors"
                          >
                            <span
                              className="font-mono text-[7px] mt-[2.5px] shrink-0 w-4 text-right leading-none"
                              style={{ color: c.color + "99" }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-body text-[11px] text-ivory/50 group-hover/lec:text-ivory/85 leading-[1.35] transition-colors">
                              {l.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                
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
          <Link
            to={panelHref}
            className="hidden md:flex items-center gap-2 flex-shrink-0 group"
          >
            {user?.avatar && !avatarError ? (
              <img
                key={user.avatar}
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                onError={() => setAvatarError(true)}
                className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-[rgba(197,164,109,0.45)] group-hover:ring-[rgba(197,164,109,0.9)] transition-all"
              />
            ) : (
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px] text-navy shrink-0 ring-2 ring-[rgba(197,164,109,0.45)] group-hover:ring-[rgba(197,164,109,0.9)] transition-all ${goldGradient}`}>
                {initials}
              </div>
            )}
            <span className={`font-body text-sm font-medium tracking-[0.03em] ${goldGradientText}`}>
              {user?.name?.split(" ")[0]}
            </span>
          </Link>
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

            {/* Courses — expandable with lecture list */}
            <li>
              <div
                className={`flex items-center justify-between w-full py-4 font-body text-[17px] font-medium tracking-[0.03em] ${
                  isCoursesActive ? goldGradientText : "text-ivory/80"
                }`}
              >
                <button
                  onClick={() => navigate("/courses")}
                  className="flex-1 text-left"
                >
                  Courses
                </button>
                <button
                  onClick={() => setCoursesExpanded((v) => !v)}
                  aria-label={coursesExpanded ? "Collapse courses" : "Expand courses"}
                  aria-expanded={coursesExpanded}
                  className="p-2 -m-2"
                >
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
              </div>

              {/* Sub-items with lecture lists */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  coursesExpanded ? "max-h-[1400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-3 flex flex-col gap-3">
                  {courseLinks.map((c) => (
                    <div key={c.to}>
                      {/* Course header */}
                      <Link
                        to={c.to}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/[0.05] transition-colors"
                      >
                        <span
                          className="w-[3px] h-7 rounded-full shrink-0"
                          style={{ background: c.color }}
                        />
                        <div>
                          <div className="font-body text-[14px] font-semibold text-ivory/85">{c.label}</div>
                          <div
                            className="font-mono text-[8px] tracking-[0.18em] uppercase mt-[1px]"
                            style={{ color: c.color }}
                          >
                            {c.tier}
                          </div>
                        </div>
                      </Link>
                      {/* Lecture list */}
                      <div className="pl-6 flex flex-col gap-[1px]">
                        {c.lectures.map((l, i) => (
                          <Link
                            key={i}
                            to={l.path}
                            className="flex items-start gap-2 py-1.5 px-3 rounded-md hover:bg-white/[0.04] group/lec transition-colors"
                          >
                            <span
                              className="font-mono text-[8px] mt-[2px] shrink-0 w-4"
                              style={{ color: c.color + "99" }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-body text-[11.5px] text-ivory/55 group-hover/lec:text-ivory/80 leading-snug transition-colors">
                              {l.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
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

          <div className="mt-8 space-y-3">
            {isLoggedIn ? (
              <Link
                to={panelHref}
                className="flex items-center gap-3 p-4 rounded-xl border border-[rgba(197,164,109,0.2)] bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
              >
                {user?.avatar && !avatarError ? (
                  <img
                    key={user.avatar}
                    src={user.avatar}
                    alt={user?.name}
                    referrerPolicy="no-referrer"
                    onError={() => setAvatarError(true)}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-navy shrink-0 ${goldGradient}`}>
                    {initials}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-body text-[15px] font-semibold text-ivory truncate">{user?.name}</p>
                  <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-gold/70">{roleLabel}</span>
                </div>
                <span className="text-[#f7db7d] text-lg">&rarr;</span>
              </Link>
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
