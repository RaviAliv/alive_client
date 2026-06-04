import { useState } from "react";
import { Link } from "react-router-dom";

const CONTACT = {
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "+91 98765 43210",
  whatsappHref: "https://wa.me/919876543210",
  email: "hello@staracademy.in",
  emailHref: "mailto:hello@staracademy.in",
  address: "6th Floor, Bund Garden, Pune",
  hours: "Mon – Sat · 10 AM – 6 PM IST",
  mapShortUrl: "https://share.google/XjDvADxB5FtvKmyX1",
};

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/academyofsrt",
    handle: "@academyofsrt",
    brand: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1c-1.3.1-2.2.3-3 .6-.8.3-1.5.7-2.1 1.4C1.3 2.7.9 3.4.6 4.2c-.3.8-.5 1.7-.6 3C0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.1.6.6 1.3 1 2.1 1.4.8.3 1.7.5 3 .6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.1-1.4.6-.6 1-1.3 1.4-2.1.3-.8.5-1.7.6-3 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.1C21.3 1.3 20.6.9 19.8.6c-.8-.3-1.7-.5-3-.6C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.9a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Soloclinicivf",
    handle: "@Soloclinicivf",
    brand: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/academy-of-srt/",
    handle: "Academy of SRT",
    brand: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.22 0z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1bvaLAxmmr/?mibextid=wwXIfr",
    handle: "STAR Academy",
    brand: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: "How is the Foundation Series delivered?",
    a: "Live on Zoom every Wednesday at 8 PM IST. Five lectures, taught directly by Dr. Sunita Tandulwadkar.",
  },
  {
    q: "Will I get a recording if I miss a class?",
    a: "Yes — enrolled doctors receive the session recording within 24 hours of each live class.",
  },
  {
    q: "Is the course suitable for fellowship trainees?",
    a: "Yes — designed for gynecologists, IVF clinicians, and fellowship trainees in reproductive medicine.",
  },
];

export default function ContactPage() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Try to copy; if the OS has a mail client the mailto: href will still fire.
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      e.preventDefault();
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Clipboard blocked — fall through to mailto: behaviour.
    }
  };

  return (
    <div className="-mt-20 bg-[#0A0E16] text-ivory">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_-5%,rgba(197,164,109,0.20),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(30,42,68,0.65),transparent_60%)]"
          aria-hidden="true"
        />

        {/* Copied toast */}
        <div
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl border border-gold/40 bg-[#0A0E16]/95 backdrop-blur-md shadow-[0_20px_50px_-20px_rgba(197,164,109,0.45)] font-mono text-[11px] tracking-[0.22em] uppercase text-gold transition-all duration-300 ${
            emailCopied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          ✓ Email copied · {CONTACT.email}
        </div>

        <section className="relative pt-[100px] pb-8">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <span className="font-mono text-[10.5px] tracking-[0.32em] uppercase text-gold/90 mb-3 inline-block">
                  ✦ Get in touch
                </span>
                <h1 className="font-display font-medium text-[clamp(30px,4.2vw,52px)] leading-[1.05] tracking-[-0.018em] text-ivory mb-3">
                  Let's start a{" "}
                  <em className="not-italic italic bg-gradient-to-r from-[#f7db7d] via-gold to-[#a77926] bg-clip-text text-transparent">
                    conversation.
                  </em>
                </h1>
                <p className="text-[14px] sm:text-[15px] leading-[1.6] text-ivory/65 max-w-[52ch]">
                  Real people from the STAR Academy team in Pune read every
                  message and reply within one working day.
                </p>
              </div>

              <div className="lg:justify-self-end w-full lg:max-w-[360px]">
                <div className="rounded-2xl border border-gold/15 bg-[rgba(255,255,255,0.025)] backdrop-blur-md p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-t-green animate-pulse" />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ivory/70">Hours</span>
                    </div>
                    <span className="text-[12px] text-ivory/90 font-medium">{CONTACT.hours}</span>
                  </div>
                  <div className="h-px bg-gold/10" />
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ivory/70">Reply</span>
                    <span className="text-[12px] text-ivory/90 font-medium">Within 1 working day</span>
                  </div>
                  <div className="h-px bg-gold/10" />
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ivory/70">Based</span>
                    <span className="text-[12px] text-ivory/90 font-medium">Pune, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-8">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  label: "Phone",
                  value: CONTACT.phone,
                  hint: "Call during office hours",
                  href: CONTACT.phoneHref,
                  external: false,
                  cta: "Call now",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  value: CONTACT.email,
                  hint: "Click to copy — or open your mail app",
                  href: CONTACT.emailHref,
                  external: false,
                  cta: emailCopied ? "Copied ✓" : "Copy email",
                  onClick: handleCopyEmail,
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  value: CONTACT.whatsapp,
                  hint: "Fastest for quick queries",
                  href: CONTACT.whatsappHref,
                  external: true,
                  cta: "Open chat",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                      <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1c-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3C3.8 15 3.3 13.5 3.3 12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7-3.9 8.3-8.7 8.3z" />
                    </svg>
                  ),
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
                  {...(c.onClick && { onClick: c.onClick })}
                  className="group relative rounded-2xl border border-gold/15 bg-gradient-to-br from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.01)] backdrop-blur-md p-5 transition-all duration-300 hover:border-gold/45 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_18px_40px_-18px_rgba(197,164,109,0.30)]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-colors duration-300">
                      {c.icon}
                    </span>
                    <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-gold/70">{c.label}</span>
                  </div>
                  <p className="font-mono text-[18px] text-ivory leading-tight mb-1 break-all">{c.value}</p>
                  <p className="text-[12px] text-ivory/55 mb-4">{c.hint}</p>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-gold border-b border-gold/30 pb-0.5 group-hover:text-gold-light group-hover:border-gold transition-colors">
                    {c.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="relative pb-8">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 rounded-2xl border border-gold/15 bg-[rgba(255,255,255,0.025)] backdrop-blur-md overflow-hidden">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] bg-[#0A0E16] border-b lg:border-b-0 lg:border-r border-gold/15">
                <iframe
                  title="STAR Academy location"
                  src="https://www.google.com/maps?q=Bund+Garden+Pune&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full border-0 invert hue-rotate-180 contrast-95"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[rgba(10,14,22,0.35)] to-transparent" />
              </div>

              <div className="p-6 md:p-7 flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-gold/80 mb-2">✦ Find us</span>
                <h1 className="font-display text-[15px] text-ivory leading-[1.2] mb-3">STAR ACADEMY ·  PUNE</h1>
                <p className="font-display text-[20px] text-ivory leading-[1.3] mb-3"> 6th Floor, ALIV - Regenerative Wellness</p>
                <p className="text-[13px] text-ivory/65 leading-[1.6] mb-5">
                  Bund Garden, Pune 411001 · Maharashtra, India
                </p>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/70 w-14">Day</span>
                    <span className="text-[12.5px] text-ivory/85">Mon – Sat</span>
                    
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/70 w-14">Hours</span>
                    <span className="text-[12.5px] text-ivory/85">10 AM – 6 PM IST</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/70 w-14">Visits</span>
                    <span className="text-[12.5px] text-ivory/85">By appointment</span>
                  </div>
                </div>

                <a
                  href={CONTACT.mapShortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 font-body font-semibold text-[13px] tracking-[0.02em] rounded-xl bg-gradient-to-r from-[#a77926] via-[#f7db7d] to-[#a87928] text-navy hover:brightness-110 hover:shadow-[0_12px_28px_-10px_rgba(247,219,125,0.55)] transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Get Directions
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-8">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
            <div className="flex items-end justify-between mb-5 gap-4 flex-wrap">
              <div>
                <span className="font-mono text-[10.5px] tracking-[0.26em] uppercase text-gold/90 block mb-1.5">
                  ✦ Follow along
                </span>
                <h2 className="font-display font-medium text-[clamp(20px,2.4vw,28px)] leading-tight text-ivory">
                  Stay close to the practice.
                </h2>
              </div>
              <p className="text-[12.5px] text-ivory/55 max-w-[300px]">
                Clinical clips, lecture highlights, and announcements.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="group relative rounded-xl border border-gold/15 bg-[rgba(255,255,255,0.025)] backdrop-blur-md p-4 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                  style={{ ["--brand" as never]: s.brand } as React.CSSProperties}
                >
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 110%, ${s.brand}40, transparent 70%)` }}
                  />
                  <span
                    className="pointer-events-none absolute inset-0 rounded-xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ borderColor: s.brand }}
                  />
                  <div className="relative flex items-center justify-between mb-3">
                    <span className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] border border-gold/20 flex items-center justify-center text-ivory/80 transition-colors duration-300 group-hover:bg-[var(--brand)] group-hover:text-white group-hover:border-[var(--brand)]">
                      {s.icon}
                    </span>
                    <span className="text-gold/60 group-hover:text-[var(--brand)] transition-colors text-sm">↗</span>
                  </div>
                  <p className="relative font-display text-[16px] text-ivory leading-tight">{s.name}</p>
                  <p className="relative font-mono text-[10px] tracking-[0.14em] text-ivory/50 mt-0.5 break-all">
                    {s.handle}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="relative pb-16">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
            <div className="rounded-2xl border border-gold/15 bg-[rgba(255,255,255,0.025)] backdrop-blur-md p-6 md:p-8">
              <div className="flex items-end justify-between gap-4 flex-wrap mb-5">
                <div>
                  <span className="font-mono text-[10.5px] tracking-[0.26em] uppercase text-gold/90 block mb-1.5">
                    ✦ Quick answers
                  </span>
                  <h2 className="font-display font-medium text-[clamp(20px,2.4vw,28px)] leading-tight text-ivory">
                    Before you write to us.
                  </h2>
                </div>
                <Link
                  to="/faq"
                  className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-gold border-b border-gold/40 pb-0.5 hover:text-gold-light hover:border-gold-light transition-colors"
                >
                  Read all FAQ
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {FAQS.map((f) => (
                  <div
                    key={f.q}
                    className="rounded-xl border border-gold/12 bg-[rgba(255,255,255,0.02)] p-4 transition-colors duration-300 hover:border-gold/30 hover:bg-[rgba(197,164,109,0.05)]"
                  >
                    <h3 className="font-display text-[14.5px] text-ivory mb-2 leading-[1.35]">{f.q}</h3>
                    <p className="text-[12px] leading-[1.6] text-ivory/60">{f.a}</p>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-gold/10 flex items-center justify-between flex-wrap gap-4">
                <p className="font-display italic text-[13.5px] text-ivory/70 max-w-[380px]">
                  "Every doctor we teach was once a doctor who reached out first."
                </p>
                <Link
                  to="/course/foundation"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 font-body font-semibold text-[12.5px] tracking-[0.02em] rounded-xl bg-gradient-to-r from-[#a77926] via-[#f7db7d] to-[#a87928] text-navy hover:brightness-110 hover:shadow-[0_12px_28px_-10px_rgba(247,219,125,0.55)] transition-all duration-300"
                >
                  View the Foundation Series
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
