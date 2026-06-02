import { Link } from "react-router-dom";
import { COURSE } from "../lib/config";

const COURSES = [
  { to: "/course/foundation",  label: "Foundation Series" },
  { to: "/course/core",        label: "Core Series" },
  { to: "/course/advanced",    label: "Advanced Series" },
  { to: "/course/masterclass", label: "Masterclass Series" },
];

const ACADEMY = [
  { to: "/about",   label: "About STAR" },
  { to: "/faculty", label: "Faculty" },
  { to: "/faq",     label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const LEGAL = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Refund Policy" },
];

const SOCIALS = [
  {
    aria: "LinkedIn", href: "#",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    aria: "Instagram", href: "#",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  },
  {
    aria: "YouTube", href: "#",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#0C101A" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
  },
];

function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="font-mono text-[9.5px] font-semibold tracking-[0.24em] uppercase text-gold mb-4">
      {children}
    </h5>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <li className="mb-2">
      <Link to={to} className="text-[13px] text-gold-light/65 hover:text-gold transition-colors duration-200 leading-none">
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[linear-gradient(rgba(8,11,20,0.72),rgba(8,11,20,0.72)),url('/images/header_footer.webp')] bg-cover bg-center text-gold-light">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(197,164,109,0.45)] to-transparent" />

      <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] pt-10 pb-4">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr] gap-6 md:gap-10 pb-8 border-b border-[rgba(197,164,109,0.12)]">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group w-fit">
              <img src="/images/logo.png" alt="STAR logo" className="w-16 h-9 object-contain" />
              <span className="font-display text-[14px] text-gold-light leading-[1.2] group-hover:text-gold transition-colors">
                Sunita Tandulwadkar
                <small className="block text-[9px] tracking-[0.2em] text-gold/70 uppercase mt-[3px]">
                  Academy of Reproduction
                </small>
              </span>
            </Link>
            <p className="font-display italic text-[13px] text-gold/60 max-w-[24ch] leading-[1.55] mb-5">
              A step-wise learning platform in infertility and reproduction.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a key={s.aria} href={s.href} aria-label={s.aria}
                  className="w-8 h-8 border border-[rgba(197,164,109,0.22)] flex items-center justify-center text-gold/50 hover:border-gold hover:text-gold hover:bg-[rgba(197,164,109,0.08)] transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <ColHead>Courses</ColHead>
            <ul className="list-none">
              {COURSES.map((l) => <NavLink key={l.label} to={l.to} label={l.label} />)}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <ColHead>Academy</ColHead>
            <ul className="list-none">
              {ACADEMY.map((l) => <NavLink key={l.label} to={l.to} label={l.label} />)}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <ColHead>Legal</ColHead>
            <ul className="list-none">
              {LEGAL.map((l) => (
                <li key={l.label} className="mb-2">
                  <a href={l.href} className="text-[13px] text-gold-light/65 hover:text-gold transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <ColHead>Stay Updated</ColHead>
            <p className="text-[12.5px] text-gold-light/55 leading-[1.55] mb-4">
              Next-batch announcements and upcoming tier launches.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex mb-4">
              <input
                type="email" placeholder="your@email.com" required
                className="flex-1 min-w-0 bg-transparent border border-[rgba(197,164,109,0.28)] border-r-0 px-3 py-2 text-ivory/80 font-body text-[12.5px] focus:outline-none focus:border-gold placeholder:text-gold-light/25 transition-colors"
              />
              <button type="submit"
                className="bg-transparent border border-[rgba(197,164,109,0.28)] hover:bg-gold hover:border-gold hover:text-navy px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase text-gold transition-all duration-200 cursor-pointer whitespace-nowrap">
                Join
              </button>
            </form>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold/45">{COURSE.enrollmentLabel}</span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-4 font-mono text-[10px] tracking-[0.14em] uppercase text-gold-light/35">
          <span>© 2026 Sunita Tandulwadkar Academy of Reproduction</span>
          <div className="flex items-center gap-4">
            <span className="text-gold/25">Pune, India</span>
            <span className="text-gold/25">·</span>
            <a href="mailto:info@academyofsrt.com" className="hover:text-gold/60 transition-colors">info@academyofsrt.com</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
