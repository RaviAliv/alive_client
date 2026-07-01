import { useState } from "react";
import { Link } from "react-router-dom";
import { COURSE } from "../lib/config";

const COURSES = [
  { to: "/course/foundation",   label: "Foundation Series" },
  { to: "/course/core",         label: "Core Series" },
  { to: "/course/advanced",     label: "Advanced Series" },
  { to: "/course/masterclass",  label: "Masterclass Series" },
];

const ACADEMY = [
  { to: "/about",   label: "About STAR" },
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
    aria: "LinkedIn",
    href: "https://www.linkedin.com/company/academy-of-srt/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    aria: "Instagram",
    href: "https://www.instagram.com/academyofsrt",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    aria: "YouTube",
    href: "https://www.youtube.com/@Soloclinicivf",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="#0C101A" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="font-mono text-[9px] font-semibold tracking-[0.28em] uppercase text-gold mb-5 flex items-center gap-2">
      <span className="w-3 h-px bg-gold/50" />
      {children}
    </h5>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li className="mb-2.5">
      <Link
        to={to}
        className="group inline-flex items-center gap-1.5 text-[12.5px] text-ivory/40 hover:text-gold-light focus-visible:text-gold-light transition-colors duration-200 leading-none outline-none"
      >
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">{label}</span>
      </Link>
    </li>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMsg(data.message || "You're subscribed!");
      } else {
        setStatus("error");
        setMsg(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <p className="text-[12px] text-emerald-400 font-mono tracking-wide py-2">
        ✓ {msg}
      </p>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mb-3">
        <input
          type="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 min-w-0 bg-transparent border border-[rgba(197,164,109,0.22)] sm:border-r-0 px-3 py-2.5 text-ivory/70 font-body text-[12px] focus:outline-none focus:border-gold/60 placeholder:text-ivory/20 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-transparent border border-[rgba(197,164,109,0.22)] sm:border-l-0 hover:bg-gold hover:border-gold hover:text-navy focus-visible:bg-gold focus-visible:border-gold focus-visible:text-navy outline-none px-4 py-2.5 font-mono text-[9px] tracking-[0.2em] uppercase text-gold transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-[11px] text-red-400 mb-2">{msg}</p>
      )}
    </>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[linear-gradient(rgba(6,9,16,0.92),rgba(6,9,16,0.92)),url('/images/navbar.webp')] bg-cover bg-center text-gold-light">
      {/* Top gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(197,164,109,0.5)] to-transparent" />

      <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] pt-12 pb-5">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr_1fr_1.4fr] gap-8 md:gap-10 pb-10 border-b border-[rgba(197,164,109,0.10)]">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <img src="/images/logo.png" alt="STAR logo" className="w-16 h-9 object-contain" />
              <div className="font-display text-[14px] text-gold-light leading-[1.2] group-hover:text-gold transition-colors">
                Sunita Tandulwadkar
                <small className="block text-[8px] tracking-[0.22em] text-gold/60 uppercase mt-[3px]">
                  Academy of Reproduction
                </small>
              </div>
            </Link>

            <p className="font-display italic text-[13px] text-ivory/35 max-w-[24ch] leading-[1.6] mb-6">
              A step-wise learning platform in infertility and reproductive medicine.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.aria}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.aria}
                  className="w-8 h-8 border border-[rgba(197,164,109,0.18)] flex items-center justify-center text-gold/40 hover:border-gold hover:text-gold hover:bg-[rgba(197,164,109,0.08)] hover:-translate-y-0.5 focus-visible:border-gold focus-visible:text-gold outline-none transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <ColHead>Courses</ColHead>
            <ul className="list-none">
              {COURSES.map((l) => (
                <FooterLink key={l.label} to={l.to} label={l.label} />
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <ColHead>Academy</ColHead>
            <ul className="list-none">
              {ACADEMY.map((l) => (
                <FooterLink key={l.label} to={l.to} label={l.label} />
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <ColHead>Legal</ColHead>
            <ul className="list-none">
              {LEGAL.map((l) => (
                <li key={l.label} className="mb-2.5">
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-[12.5px] text-ivory/40 hover:text-gold-light focus-visible:text-gold-light transition-colors duration-200 outline-none"
                  >
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <ColHead>Stay Updated</ColHead>
            <p className="text-[12px] text-ivory/35 leading-[1.6] mb-4">
              Next-batch announcements and upcoming tier launches.
            </p>
            <div className="mb-5">
              <NewsletterForm />
            </div>

            {/* Enrolling badge */}
            <div className="inline-flex items-center gap-2 border border-[rgba(197,164,109,0.18)] px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-gold/50">
                {COURSE.enrollmentLabel}
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-5 font-mono text-[9.5px] tracking-[0.12em] uppercase text-ivory/20">
          <span>© 2026 Sunita Tandulwadkar Academy of Reproduction. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="text-ivory/15">Pune, India</span>
            <span className="text-ivory/15">·</span>
            <a
              href="mailto:drsrtacademy@gmail.com"
              className="hover:text-gold/50 transition-colors duration-200"
            >
              drsrtacademy@gmail.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
