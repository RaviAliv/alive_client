import { Link } from "react-router-dom";

type Course = {
  letter: "S" | "T" | "A" | "R";
  tierLabel: string;
  title: string;
  body: string;
  meta: string[];
  live: boolean;
  accent: "t-green" | "t-gold" | "t-blue" | "t-red";
};

const courses: Course[] = [
  {
    letter: "S",
    tierLabel: "Tier I · Foundation · Enrolling Now",
    title: "The Foundation Series",
    body:
      "Mastering the absolute basics of reproductive medicine. Five live lectures rebuilding the biological foundations every clinical decision rests on, from the HPO axis through to female fertility diagnostics.",
    meta: ["5 Lectures", "Commences 15 July 2026", "Live on Zoom"],
    live: true,
    accent: "t-green",
  },
  {
    letter: "T",
    tierLabel: "Tier II · Core · Coming Soon",
    title: "The Core Series",
    body:
      "Simple, highly effective infertility treatments. Five live lectures on evaluation, ovulation induction, IUI workflow, and the hidden pelvic and inflammatory drivers that quietly affect outcomes.",
    meta: ["5 Lectures", "Launch date to be announced"],
    live: false,
    accent: "t-gold",
  },
  {
    letter: "A",
    tierLabel: "Tier III · Advanced · Coming Soon",
    title: "The Advanced Series",
    body:
      "IVF practising tips and tactical execution tricks. Seven live lectures on stimulation, OHSS prevention, retrieval technique, embryology for clinicians, transfer mechanics, and ovarian rejuvenation.",
    meta: ["7 Lectures", "Launch date to be announced"],
    live: false,
    accent: "t-blue",
  },
  {
    letter: "R",
    tierLabel: "Tier IV · Masterclass · Coming Soon",
    title: "The Masterclass Series",
    body:
      "In-depth, singular subject mastery. Ten 60-minute deep-dives on the highest-complexity cases in reproductive medicine: implantation failure, recurrent loss, diminished reserve, endometriosis, and more.",
    meta: ["10 Lectures", "Launch date to be announced"],
    live: false,
    accent: "t-red",
  },
];

const accentBg = {
  "t-green": "bg-t-green",
  "t-gold": "bg-t-gold",
  "t-blue": "bg-t-blue",
  "t-red": "bg-t-red",
} as const;

const accentText = {
  "t-green": "text-t-green",
  "t-gold": "text-t-gold",
  "t-blue": "text-t-blue",
  "t-red": "text-t-red",
} as const;

const accentHeader = {
  "t-green":
    "bg-gradient-to-br from-t-green to-[#0F6B33] before:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]",
  "t-gold":
    "bg-gradient-to-br from-t-gold to-[#C28A0E] before:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_60%)]",
  "t-blue":
    "bg-gradient-to-br from-t-blue to-[#143F7A] before:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]",
  "t-red":
    "bg-gradient-to-br from-t-red to-[#A11616] before:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]",
} as const;

const accentDot = {
  "t-green": "bg-t-green",
  "t-gold": "bg-t-gold",
  "t-blue": "bg-t-blue",
  "t-red": "bg-t-red",
} as const;

export default function CoursesPage() {
  return (
    <>
      {/* HERO: text left, video right */}
      <section className="relative pt-[80px] pb-[70px] bg-ivory border-b border-border-warm overflow-hidden">
        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: text */}
          <div>
            <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-5">
              The Pathway
            </span>
            <h1 className="font-display font-medium text-[clamp(34px,4.2vw,58px)] leading-[1.05] text-navy mb-5 tracking-[-0.015em]">
              A stepwise curriculum in infertility and IVF.
            </h1>
            <p className="text-[16.5px] leading-[1.65] text-slate mb-7">
              The STAR pathway is a four-tier academic journey. Foundation
              teaches interpretation. Core teaches workflow. Advanced teaches
              IVF strategy. Masterclass refines judgment. Each tier is taught
              live by Dr. Sunita Tandulwadkar, on Zoom, every Wednesday at 8:00
              PM IST.
            </p>
            <Link
              to="/foundation"
              className="inline-flex items-center gap-2.5 px-7 py-4 font-body font-medium text-[15px] tracking-[0.02em] border border-navy rounded-[2px] bg-navy text-gold-light transition-all duration-300 hover:bg-black hover:border-gold hover:text-gold group"
            >
              Explore the Foundation Series
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>

          {/* Right: video */}
          <div className="relative w-full rounded-[6px] overflow-hidden border border-border-warm shadow-[0_30px_70px_-30px_rgba(20,28,46,0.45)]">
            <div className="relative w-full pt-[56.25%] bg-navy">
              <iframe
                src="https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID"
                title="Dr. Sunita Tandulwadkar introduces the STAR pathway"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* COURSE CARDS GRID */}
      <section className="pt-[clamp(60px,7vw,100px)] pb-[clamp(80px,10vw,140px)] bg-ivory">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center mb-12 md:mb-14 max-w-[620px] mx-auto">
            <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-4">
              Four Tiers
            </span>
            <h2 className="font-display font-medium text-[clamp(28px,3.4vw,40px)] leading-[1.12] text-navy">
              From Foundation to Masterclass.
            </h2>
            <p className="mt-3.5 text-[15px] text-slate">
              Every tier stands on its own and builds the next.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {courses.map((c) => (
              <div
                key={c.letter}
                className="group relative flex flex-col bg-white rounded-[10px] overflow-hidden border border-border-warm shadow-[0_10px_30px_-15px_rgba(20,28,46,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-22px_rgba(20,28,46,0.35)]"
              >
                {/* Colored header */}
                <div
                  className={`relative overflow-hidden px-6 pt-7 pb-6 text-ivory before:content-[''] before:absolute before:inset-0 before:pointer-events-none ${
                    accentHeader[c.accent]
                  }`}
                >
                  {/* Status pill */}
                  <div className="relative z-[1] flex items-center justify-between mb-6">
                    <span
                      className={`inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ${
                        c.live
                          ? "bg-white/95 text-navy"
                          : "bg-white/15 text-white/90 border border-white/25"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          c.live ? "bg-t-green animate-pulse" : "bg-white/70"
                        }`}
                      />
                      {c.live ? "Enrolling Now" : "Coming Soon"}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/75">
                      {c.tierLabel.split("·")[0].trim()}
                    </span>
                  </div>

                  {/* Letter */}
                  <div className="relative z-[1] font-display font-bold text-[88px] leading-none text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.18)]">
                    {c.letter}
                  </div>

                  {/* Decorative ring */}
                  <span className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border-[1.5px] border-white/15 pointer-events-none" />
                  <span className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full border-[1.5px] border-white/10 pointer-events-none" />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-grow p-6">
                  <span
                    className={`block font-mono text-[10px] tracking-[0.18em] uppercase mb-2.5 font-medium ${
                      accentText[c.accent]
                    }`}
                  >
                    {c.tierLabel.split("·").slice(1).join("·").trim()}
                  </span>
                  <h3 className="font-display font-semibold text-[22px] text-navy mb-3 leading-[1.18]">
                    {c.title}
                  </h3>
                  <p className="text-[13.5px] text-slate mb-5 leading-[1.62] flex-grow">
                    {c.body}
                  </p>

                  <ul className="space-y-2 mb-6 pt-4 border-t border-border-warm">
                    {c.meta.map((m) => (
                      <li
                        key={m}
                        className="flex items-center gap-2.5 text-[12px] text-soft-black"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            accentDot[c.accent]
                          }`}
                        />
                        {m}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {c.live ? (
                      <Link
                        to="/foundation"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-body font-medium text-[13.5px] tracking-[0.02em] border border-navy rounded-[3px] bg-navy text-gold-light transition-all duration-300 hover:bg-black hover:border-gold hover:text-gold group/btn"
                      >
                        View &amp; Enrol
                        <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                          &rarr;
                        </span>
                      </Link>
                    ) : (
                      <span className="w-full inline-flex items-center justify-center gap-2 font-mono text-[10.5px] tracking-[0.18em] text-slate px-4 py-3 border border-dashed border-border-warm rounded-[3px] uppercase bg-ivory">
                        <span className="w-1 h-1 rounded-full bg-slate/50" />
                        Notify Me
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
