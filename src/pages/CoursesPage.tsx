import { Link } from "react-router-dom";

type Course = {
  letter: "S" | "T" | "A" | "R";
  tierLabel: string;
  title: string;
  body: string;
  meta: string[];
  live: boolean;
  accent: string;
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

const accentBorder = {
  "t-green": "border-l-t-green",
  "t-gold": "border-l-t-gold",
  "t-blue": "border-l-t-blue",
  "t-red": "border-l-t-red",
} as const;

export default function CoursesPage() {
  return (
    <>
      <section className="relative pt-[100px] pb-[60px] bg-ivory border-b border-border-warm overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-[45%] before:h-full before:bg-[url('/images/ornament.webp')] before:bg-right-top before:bg-cover before:bg-no-repeat before:opacity-50 before:pointer-events-none">
        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-5">
            The Pathway
          </span>
          <h1 className="font-display font-medium text-[clamp(36px,4.5vw,64px)] leading-[1.05] text-navy mb-5 tracking-[-0.015em] max-w-[800px]">
            A stepwise curriculum in infertility and IVF.
          </h1>
          <p className="text-[17px] leading-[1.6] text-slate max-w-[800px]">
            The STAR pathway is a four-tier academic journey. Foundation
            teaches interpretation. Core teaches workflow. Advanced teaches
            IVF strategy. Masterclass refines judgment. Each tier is taught
            live by Dr. Sunita Tandulwadkar, on Zoom, every Wednesday at 8:00
            PM IST.
          </p>
        </div>
      </section>

      <section className="pt-[60px] pb-[clamp(80px,10vw,140px)] bg-ivory">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid gap-7">
          {courses.map((c) => (
            <div
              key={c.letter}
              className={`relative grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 items-center px-7 sm:px-[42px] py-[26px] sm:py-[38px] bg-cream border border-border-warm border-l-4 ${
                accentBorder[c.accent as keyof typeof accentBorder]
              } transition-all duration-300 ${
                c.live
                  ? "hover:translate-x-1 hover:shadow-[0_20px_40px_-20px_rgba(30,42,68,0.18)]"
                  : "opacity-70 saturate-50"
              }`}
            >
              <div
                className={`w-[60px] h-[60px] flex items-center justify-center font-display font-semibold text-[32px] text-ivory border border-gold ${
                  accentBg[c.accent as keyof typeof accentBg]
                }`}
              >
                {c.letter}
              </div>
              <div>
                <span className="block font-mono text-[11px] text-gold-deep tracking-[0.18em] uppercase mb-1.5">
                  {c.tierLabel}
                </span>
                <h3 className="font-display font-medium text-[30px] text-navy mb-2">
                  {c.title}
                </h3>
                <p className="text-[15px] text-slate mb-3.5 max-w-[56ch] leading-[1.55]">
                  {c.body}
                </p>
                <div className="flex gap-[18px] flex-wrap font-mono text-[11px] tracking-[0.1em] text-gold-deep uppercase">
                  {c.meta.map((m) => (
                    <span
                      key={m}
                      className="flex items-center gap-1.5 before:content-[''] before:w-1 before:h-1 before:bg-gold before:rounded-full"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                {c.live ? (
                  <Link
                    to="/foundation"
                    className="inline-flex items-center gap-2.5 px-7 py-4 font-body font-medium text-[15px] tracking-[0.02em] border border-navy rounded-[2px] bg-navy text-gold-light transition-all duration-300 hover:bg-black hover:border-gold hover:text-gold group"
                  >
                    View &amp; Enrol
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                ) : (
                  <span className="font-mono text-[11px] tracking-[0.2em] text-slate px-[18px] py-3 border border-border-warm uppercase">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
