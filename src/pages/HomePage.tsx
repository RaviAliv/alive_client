import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import HeroCarousel from "../components/HeroCarousel";
import RegistrationForm from "../components/RegistrationForm";

const eyebrow =
  "inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep";
const eyebrowGold = eyebrow.replace("text-gold-deep", "text-gold");
const btnBase =
  "inline-flex items-center gap-2.5 px-7 py-4 font-body font-medium text-[15px] tracking-[0.02em] border rounded-[2px] cursor-pointer transition-all duration-300 group";
const btnGold = `${btnBase} bg-gold text-navy border-gold hover:bg-gold-light`;
const btnGhostGold = `${btnBase} bg-transparent text-gold border-gold hover:bg-gold hover:text-navy`;
const btnPrimary = `${btnBase} bg-navy text-gold-light border-navy hover:bg-black hover:border-gold hover:text-gold`;
const arrow =
  "inline-block transition-transform duration-300 group-hover:translate-x-1";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative -mt-20 h-screen min-h-[600px] bg-black overflow-hidden flex items-center">
        <HeroCarousel />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,14,22,0.92)] via-[rgba(10,14,22,0.65)] to-[rgba(10,14,22,0.45)] z-[1]" />
        <div className="relative z-[2] max-w-[1280px] mx-auto pt-[100px] pb-8 px-[clamp(20px,4vw,80px)] w-full">
          <div className="max-w-[640px]">
            <span className={`${eyebrowGold} mb-4`}>Commencing 15 July 2026</span>
            <h1 className="font-display font-medium text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.02em] text-ivory mb-4">
              A structured academic pathway
              <br />
              in Indian infertility and IVF.
            </h1>
            <p className="text-gold-light text-[clamp(13px,1vw,15px)] leading-[1.55] mb-6 max-w-[520px]">
              Founded and led by Dr. Sunita Tandulwadkar. A live, progressive
              learning platform for gynecologists, IVF clinicians, and
              fellowship trainees who want clinical judgment, not fragments.
            </p>
            <div className="flex gap-2.5 flex-wrap mb-6">
              <Link
                to="/foundation"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-body font-medium text-[13px] tracking-[0.02em] border bg-gold text-navy border-gold hover:bg-gold-light rounded-[2px] transition-all duration-300 group"
              >
                Explore the Foundation Series <span className={arrow}>&rarr;</span>
              </Link>
              <Link
                to="/faculty"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-body font-medium text-[13px] tracking-[0.02em] border bg-transparent text-gold border-gold hover:bg-gold hover:text-navy rounded-[2px] transition-all duration-300 group"
              >
                Meet the Faculty <span className={arrow}>&rarr;</span>
              </Link>
            </div>
            <div className="flex gap-3 flex-wrap font-mono text-[10px] text-gold tracking-[0.15em] uppercase">
              <span>Every Wednesday</span>
              <span className="text-gold-deep opacity-60">/</span>
              <span>8:00 PM IST</span>
              <span className="text-gold-deep opacity-60">/</span>
              <span>Live on Zoom</span>
            </div>
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section className="relative bg-ivory py-15 overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-1/2 before:h-[30%]  before:bg-right-top before:bg-cover before:bg-no-repeat before:opacity-45 before:pointer-events-none">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-start relative z-[1]">
          <div>
            <span className={`${eyebrow} text-2xl mb-8`}>Why STAR Academy Exists</span>
            <h2 className="font-display font-medium text-[clamp(26px,5vw,54px)] leading-[1.05] tracking-[-0.015em] text-navy mb-9 max-w-[14ch]">
              Infertility practice should not be learned in fragments.
            </h2>
            <p className="text-[clamp(16px,1.15vw,18px)] leading-[1.7] text-slate mb-4">
              Today, most infertility education reaches Indian doctors as
              scattered webinars, disconnected lectures, and isolated topic
              updates. The discipline, one of the most clinically demanding in
              gynecology, is rarely taught as one connected body of knowledge.
            </p>
            <p className="text-[clamp(16px,1.15vw,18px)] leading-[1.7] text-slate mb-4">
              STAR Academy was built to change that. A live, progressive
              academic pathway that takes clinicians from reproductive
              endocrinology through to advanced IVF decision-making, taught
              directly by one of India's most respected pioneers in the field.
            </p>
            <div className="mt-9 font-display italic text-[clamp(20px,1.8vw,26px)] text-gold-deep pl-5 border-l-2 border-gold">
              Four tiers. One continuous pathway. Twenty-seven lectures.
            </div>
          </div>
          <div className="md:sticky md:top-[120px] flex md:flex-col flex-row md:gap-3 gap-3 items-center md:pl-5 pl-0 md:border-l md:border-t-0 border-t border-gold-deep md:pt-0 pt-5">
            {[
              { c: "bg-t-green", label: "Foundation" },
              { c: "bg-t-gold", label: "Core" },
              { c: "bg-t-blue", label: "Advanced" },
              { c: "bg-t-red", label: "Masterclass" },
            ].map((chip) => (
              <div
                key={chip.label}
                className={`group relative w-[18px] h-[18px] border border-gold ${chip.c}`}
              >
                <span className="absolute left-[34px] top-1/2 -translate-y-1/2 font-display italic text-sm text-slate whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {chip.label}
                </span>
              </div>
            ))}
            <div className="hidden md:block mt-4 font-display italic text-[13px] text-center text-slate [writing-mode:vertical-rl] [text-orientation:mixed] tracking-[0.2em]">
              S T A R
            </div>
          </div>
        </div>
      </section>

      {/* TIER CARDS */}
      <section className="pb-[clamp(70px,10vw,100px)] bg-ivory">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center max-w-[720px] mx-auto mb-12">
            <span className={`${eyebrow} mb-[18px]`}>The Pathway</span>
            <h2 className="font-display font-medium text-[clamp(30px,3.8vw,48px)] leading-[1.1] text-navy">
              Four tiers. One continuous academic pathway.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              {
                img: "/images/marble.webp",
                accent: "bg-t-green",
                accentText: "text-t-green",
                ring: "group-hover/card:border-t-green",
                letter: "F",
                rest: "oundation",
                tier: "Tier I",
                title: "Foundation",
                desc: "Mastering the absolute basics of reproductive medicine. Five live lectures rebuilding the biological foundations every clinical decision rests on.",
                lectures: "5 Lectures",
                to: "/foundation",
                cta: "Explore",
                live: true,
              },
              {
                img: "/images/ornament.webp",
                accent: "bg-t-gold",
                accentText: "text-t-gold",
                ring: "group-hover/card:border-t-gold",
                letter: "C",
                rest: "ore",
                tier: "Tier II",
                title: "Core",
                desc: "Simple, highly effective infertility treatments. Five lectures on evaluation, ovulation induction, IUI workflow, and the hidden pelvic drivers.",
                lectures: "5 Lectures",
                to: "/courses",
                cta: "Coming Soon",
                live: false,
              },
              {
                img: "/images/dna-pattern.webp",
                accent: "bg-t-blue",
                accentText: "text-t-blue",
                ring: "group-hover/card:border-t-blue",
                letter: "A",
                rest: "dvanced",
                tier: "Tier III",
                title: "Advanced",
                desc: "IVF practising tips and tactical execution. Seven lectures on stimulation, OHSS prevention, retrieval, embryology, and transfer mechanics.",
                lectures: "7 Lectures",
                to: "/courses",
                cta: "Coming Soon",
                live: false,
              },
              {
                img: "/images/faculty-bg.webp",
                accent: "bg-t-red",
                accentText: "text-t-red",
                ring: "group-hover/card:border-t-red",
                letter: "M",
                rest: "asterclass",
                tier: "Tier IV",
                title: "Masterclass",
                desc: "In-depth, singular subject mastery. Ten deep-dives on the highest-complexity cases: implantation failure, recurrent loss, and endometriosis.",
                lectures: "10 Lectures",
                to: "/courses",
                cta: "Coming Soon",
                live: false,
              },
            ].map((c) => (
              <div
                key={c.title}
                className={`group/card relative flex flex-col bg-cream border border-border-warm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(30,42,68,0.28)] ${c.ring}`}
              >
                {/* Top accent ribbon */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] z-[3] ${c.accent}`}
                />

                {/* Image wrapper: outer keeps letter badge visible; inner clips for zoom */}
                <div className="relative">
                  <div className="relative h-[220px] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Status pill */}
                    {c.live ? (
                      <span
                        className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.18em] uppercase text-ivory ${c.accent} border border-white/30 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white before:animate-pulse`}
                      >
                        Enrolling
                      </span>
                    ) : (
                      <span className="absolute top-4 right-4 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.18em] uppercase text-ivory/85 bg-black/45 border border-white/15 backdrop-blur-sm">
                        Coming Soon
                      </span>
                    )}

                    {/* Tier label bottom-right of image */}
                    <span className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.22em] uppercase text-gold-light">
                      {c.tier}
                    </span>
                  </div>

                  {/* Letter badge half-overlapping — first letter in box, rest of word extends to the right */}
                  <div className="absolute -bottom-7 left-6 z-[2] flex items-stretch shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)]">
                    <div
                      className={`relative w-12 h-14 flex items-center text-right pl-4 justify-center font-display font-semibold text-[28px] text-ivory border-2 border-gold ${c.accent}`}
                    >
                      {c.letter}
                    </div>
                    <div className="flex items-center bg-cream border-y-2 border-r-2 border-gold -ml-px px-1">
                      <span
                        className={`font-display font-semibold text-[22px] leading-none tracking-[0.01em] ${c.accentText}`}
                      >
                        {c.rest}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 pt-12 pb-7 px-6">
                  {/* <h3 className="font-display font-medium text-[26px] text-navy mb-3 leading-[1.15] transition-colors duration-300 group-hover/card:text-black">
                    {c.title}
                  </h3> */}
                  <p className="text-[14px] leading-[1.7] text-slate mb-5 flex-1">
                    {c.desc}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border-warm">
                    <span
                      className={`flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.15em] uppercase ${c.accentText} before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-current`}
                    >
                      {c.lectures}
                    </span>
                    <span className="w-px h-3 bg-border-warm" />
                    <span className="font-mono text-[10.5px] tracking-[0.15em] uppercase text-gold-deep">
                      Live on Zoom
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    to={c.to}
                    className="group/btn mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 font-body font-semibold text-[13px] tracking-[0.02em] border border-gold text-navy rounded-[2px] bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_20px_-6px_rgba(168,121,40,0.5)]"
                  >
                    {c.cta}
                    <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            <RegistrationForm/>
      {/* 3-CARD MINI BLOCK */}
      <section className="py-[clamp(80px,10vw,140px)] bg-ivory">
        <div className="max-w-[720px] mx-auto mb-16 text-center px-[clamp(20px,4vw,80px)]">
          <span className={`${eyebrow} mb-[18px]`}>The Academy</span>
          <h2 className="font-display font-medium text-[clamp(30px,3.8vw,48px)] leading-[1.1] text-navy mb-5">
            A doctor-led academic platform in infertility and IVF.
          </h2>
          <p className="text-slate text-[17px] leading-[1.7]">
            Founded by Dr. Sunita Tandulwadkar, India's pioneering IVF and
            endoscopic surgeon. Designed to train the next generation of
            reproductive medicine specialists the way serious clinical work is
            actually practised.
          </p>
        </div>
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              top: "bg-t-green",
              h: "What it is",
              p: "A live, stepwise learning platform in infertility and IVF. A space for structured, clinically relevant teaching that moves from fundamentals to advanced decision-making.",
            },
            {
              top: "bg-t-blue",
              h: "Who it is for",
              p: "Gynecologists building or expanding infertility practice. IVF clinicians refining their protocols. Fellowship trainees in reproductive medicine. Doctors who want clinical judgment, not passive content.",
            },
            {
              top: "bg-t-red",
              h: "Why it is different",
              p: "Conducted by an internationally respected pioneer in IVF and gynecologic endoscopy. Focused on practical decision-making. Designed to progress from basics to advanced application.",
            },
          ].map((c) => (
            <div
              key={c.h}
              className="bg-cream relative border border-border-warm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(30,42,68,0.18)]"
            >
              <div className={`h-1 ${c.top}`} />
              <div className="pt-9 pb-10 px-8">
                <h3 className="font-display text-[28px] text-navy mb-[18px] font-medium">
                  {c.h}
                </h3>
                <p className="text-soft-black text-[15px] leading-[1.7]">
                  {c.p}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-14 px-[clamp(20px,4vw,80px)]">
          <Link
            to="/about"
            className="group text-gold-deep font-medium text-sm tracking-[0.02em] uppercase font-mono inline-flex items-center gap-2 pb-0.5 border-b border-current transition-all duration-300 hover:text-navy hover:gap-3.5"
          >
            Learn more about STAR Academy <span>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* FACULTY SHORT */}
      <section className="relative  bg-center bg-cover bg-no-repeat bg-black text-ivory py-[clamp(40px,10vw,10px)] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-[rgba(10,14,22,0.78)] after:via-[rgba(10,14,22,0.7)] after:to-[rgba(10,14,22,0.92)] after:z-0">
        {/* Decorative corner accents */}
        <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-gold/40 z-[1] hidden md:block" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-gold/40 z-[1] hidden md:block" />

        <div className="relative z-[1] max-w-[1240px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center max-w-[640px] mx-auto mb-14 md:mb-16">
            <span className={`${eyebrowGold} block mb-4`}>The Faculty</span>
            <h2 className="font-display font-medium text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.015em] text-ivory">
              The Pioneer of Indian Endoscopy and
              <span className="italic text-gold-light"> Reproductive Medicine.</span>
            </h2>
            <div className="mt-6 w-16 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[0.78fr_1fr] gap-[50px] md:gap-16 lg:gap-20 items-center">
            {/* Left: BookCard with framing */}
            <div className="relative mx-auto md:mx-0">
              <div className="absolute -inset-3 border border-gold/30 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold pointer-events-none" />
              <BookCard large />
            </div>

            {/* Right: Bio + Credentials */}
            <div>
              <p className="text-[16px] leading-[1.75] text-ivory/85 mb-7 max-w-[58ch]">
                Dr. Sunita Tandulwadkar is one of India's most respected names
                in infertility, IVF, and gynecologic endoscopy, with over 35
                years of clinical, academic, and leadership experience. She
                has built and led IVF and endoscopy centres, authored 39
                books, published more than 106 peer-reviewed papers, and been
                invited as faculty at over 400 national and international
                platforms.
              </p>

              {/* Stat grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gold/20 border border-gold/20 mb-9">
                {[
                  { num: "35+", label: "Years Practice" },
                  { num: "39", label: "Books Authored" },
                  { num: "106+", label: "Peer Papers" },
                  { num: "400+", label: "Faculty Talks" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[rgba(10,14,22,0.7)] backdrop-blur-sm px-4 py-5 text-center transition-colors duration-300 hover:bg-[rgba(10,14,22,0.85)]"
                  >
                    <div className="font-display text-[clamp(24px,2.4vw,32px)] text-gold leading-none mb-1.5">
                      {s.num}
                    </div>
                    <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ivory/70">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="relative pl-7 my-8 font-display italic text-[clamp(17px,1.4vw,21px)] text-gold-light leading-[1.55] max-w-[58ch] before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-gradient-to-b before:from-gold before:via-gold-deep before:to-transparent">
                <span className="absolute -left-1 -top-3 font-display text-[44px] text-gold/50 leading-none select-none">
                  &ldquo;
                </span>
                In reproductive medicine, I do have an authority. In
                regenerative medicine, India's first stem cell success, and
                the world's first at the age of 45, goes to my credit.
                <cite className="block mt-4 font-mono not-italic text-[10px] tracking-[0.22em] text-gold-deep uppercase">
                  — Dr. Sunita Tandulwadkar
                </cite>
              </blockquote>

              <div className="flex flex-wrap gap-2 mb-9">
                {[
                  "President, ISAR 2026–2028",
                  "India's First Endoscopic Surgeon, 1994",
                  "World's First Stem Cell Success at 45",
                ].map((cred) => (
                  <span
                    key={cred}
                    className="font-mono text-[10px] tracking-[0.16em] uppercase px-3 py-1.5 border border-gold-deep/60 text-gold-light bg-[rgba(197,164,109,0.06)] rounded-sm"
                  >
                    {cred}
                  </span>
                ))}
              </div>

              <Link to="/faculty" className={btnGhostGold}>
                Read Dr. Sunita's full profile <span className={arrow}>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PATHWAY */}
      {/* <section className="relative bg-black text-ivory py-[clamp(80px,10vw,140px)] overflow-hidden before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[220px] before:bg-[url('/images/pathway-decor.webp')] before:bg-center before:bg-cover before:bg-no-repeat before:opacity-55 before:pointer-events-none before:[mask-image:linear-gradient(90deg,black_35%,transparent_100%)] after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-0 after:w-[220px] after:bg-[url('/images/pathway-decor.webp')] after:bg-center after:bg-cover after:bg-no-repeat after:opacity-55 after:pointer-events-none after:-scale-x-100 after:[mask-image:linear-gradient(90deg,black_35%,transparent_100%)]">
        <div className="relative z-[1] max-w-[820px] mx-auto mb-20 px-[clamp(20px,4vw,80px)]">
          <span className={`${eyebrowGold} mb-5`}>The Architecture</span>
          <h2 className="font-display font-medium text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.015em] text-ivory mb-7">
            An architectural framework for mastering reproductive medicine.
          </h2>
          <p className="text-[clamp(16px,1.15vw,18px)] leading-[1.7] text-gold-light opacity-90 max-w-[58ch]">
            Four tiers. Each letter of STAR represents a stage of clinical
            growth. Together they form a continuous pathway, from the
            fundamentals of reproductive endocrinology to the refinement of
            the hardest IVF cases.
          </p>
        </div>

        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-2 gap-[50px] md:gap-20 items-center">
          <div className="text-center">
            <img
              src="/images/pyramid.webp"
              alt="The four-tier STAR pathway pyramid"
              className="max-w-[460px] mx-auto [filter:drop-shadow(0_30px_60px_rgba(197,164,109,0.22))]"
            />
          </div>
          <div className="flex flex-col gap-6">
            {[
              { c: "bg-t-green", letter: "S", t: "Tier I · Foundation", d: "Mastering the absolute basics of reproductive medicine." },
              { c: "bg-t-gold", letter: "T", t: "Tier II · Core", d: "Simple, highly effective infertility treatments." },
              { c: "bg-t-blue", letter: "A", t: "Tier III · Advanced", d: "IVF practising tips and tactical execution tricks." },
              { c: "bg-t-red", letter: "R", t: "Tier IV · Masterclass", d: "In-depth, singular subject mastery." },
            ].map((row) => (
              <div
                key={row.letter}
                className="grid grid-cols-[64px_1fr] gap-5 items-center py-[18px] border-b border-[rgba(197,164,109,0.15)] last:border-b-0"
              >
                <div
                  className={`w-[60px] h-[60px] flex items-center justify-center font-display font-semibold text-[30px] text-ivory border border-gold ${row.c}`}
                >
                  {row.letter}
                </div>
                <div>
                  <h4 className="font-body font-semibold text-[13px] text-gold tracking-[0.08em] mb-1 uppercase">
                    {row.t}
                  </h4>
                  <p className="font-display text-[19px] text-ivory leading-[1.35]">
                    {row.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-[1] max-w-[1280px] mx-auto mt-20 px-[clamp(20px,4vw,80px)]">
          <h3 className="text-center mb-[50px] font-display text-[clamp(20px,1.8vw,26px)] text-gold-light">
            How the pathway progresses.
          </h3>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-5 md:before:content-[''] md:before:absolute md:before:top-5 md:before:left-[10%] md:before:right-[10%] md:before:h-px md:before:bg-gold-deep md:before:z-0">
            {[
              { c: "bg-t-green", n: "1", h: "Foundation", p: "builds interpretation." },
              { c: "bg-t-gold", n: "2", h: "Core", p: "builds workflow and treatment thinking." },
              { c: "bg-t-blue", n: "3", h: "Advanced", p: "builds IVF and ART strategy." },
              { c: "bg-t-red", n: "4", h: "Masterclass", p: "builds refinement and difficult-case judgment." },
            ].map((s) => (
              <div key={s.n} className="relative z-[1] text-center">
                <div
                  className={`w-10 h-10 rounded-full mx-auto mb-6 flex items-center justify-center font-body font-semibold text-ivory text-[13px] border border-gold shadow-[0_0_0_6px_var(--color-black)] ${s.c}`}
                >
                  {s.n}
                </div>
                <h5 className="font-display font-medium text-[21px] mb-2 text-ivory">
                  {s.h}
                </h5>
                <p className="text-[13px] leading-[1.55] text-gold-light opacity-80 max-w-[22ch] mx-auto">
                  {s.p}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-[1] text-center mt-[70px] px-[clamp(20px,4vw,80px)]">
          <em className="font-display italic text-base text-gold-light opacity-85 block mb-7">
            Each level prepares the clinician for the next, so learning becomes
            continuous rather than episodic.
          </em>
          <Link to="/courses" className={btnGold}>
            Explore the full pathway <span className={arrow}>&rarr;</span>
          </Link>
        </div>
      </section> */}

      {/* FOUNDATION LAUNCH STRIP */}
      {/* <section className="py-[clamp(80px,10vw,140px)] bg-ivory">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-[0.95fr_1fr] shadow-[0_40px_80px_-40px_rgba(30,42,68,0.2)]">
          <div className="relative bg-t-green text-ivory px-7 py-10 md:px-12 md:py-14 before:content-[''] before:absolute before:top-5 before:right-5 before:w-7 before:h-7 before:border-t before:border-r before:border-white/30">
            <span className="inline-block font-mono text-[11px] tracking-[0.25em] py-1.5 px-3 border border-white/45 mb-7 uppercase text-ivory">
              Tier I &middot; Foundation
            </span>
            <h2 className="font-display font-medium text-[clamp(36px,4vw,50px)] leading-[1.05] text-ivory mb-3">
              The Foundation Series.
            </h2>
            <div className="font-display italic text-[17px] text-white/85 mb-8">
              Mastering the absolute basics of reproductive medicine.
            </div>
            <ul className="list-none mb-8">
              {[
                "The complete arc of the ovarian cycle, from hormonal signal to ovulation",
                "Ovulation, triggering, and timing as a clinical decision",
                "Reading the luteal phase as a diagnostic compass",
                "Implantation and the molecular dialogue between embryo and endometrium",
                "The precision diagnostic road map in female fertility",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm leading-[1.5] py-2.5 pl-[18px] border-l-2 border-white/40 text-white/90 mb-1.5"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6 border-t border-white/25">
              {[
                "Commences 15 July 2026",
                "Wednesdays, 8:00 PM IST",
                "Live on Zoom",
                "Certificate on completion",
              ].map((m) => (
                <div
                  key={m}
                  className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/[0.88] flex items-center gap-2 before:content-[''] before:w-[5px] before:h-[5px] before:bg-gold before:rounded-full"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-cream px-7 py-10 md:px-12 md:py-14 flex flex-col justify-center">
            <h3 className="font-display font-medium text-[clamp(24px,2.6vw,32px)] text-navy mb-4 leading-[1.2]">
              Now enrolling for the inaugural batch.
            </h3>
            <p className="text-[15px] leading-[1.6] text-slate mb-8">
              Join Dr. Sunita Tandulwadkar live for all five Foundation
              lectures. Direct interaction, real-time Q&amp;A, clinical
              protocol sheets for every session.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-7">
              <div className="border border-border-warm py-5 px-[18px] bg-white">
                <span className={`${eyebrow} text-[10px] block mb-2.5`}>
                  Foundation Series
                </span>
                <div className="font-display font-medium text-xl text-navy mb-1.5 tracking-[0.01em]">
                  [ Price ]
                </div>
                <div className="text-xs text-slate leading-[1.4]">
                  Tier I access
                </div>
              </div>
              <div className="border border-gold py-5 px-[18px] bg-navy text-ivory">
                <span className="inline-block font-mono text-[10px] font-medium tracking-[0.26em] uppercase text-gold block mb-2.5">
                  Complete Pathway
                </span>
                <div className="font-display font-medium text-xl text-gold-light mb-1.5 tracking-[0.01em]">
                  [ Price ]
                </div>
                <div className="text-xs text-white/70 leading-[1.4]">
                  All four tiers as they launch
                </div>
              </div>
            </div>
            <Link to="/foundation" className={btnPrimary}>
              Enroll in the Foundation Series <span className={arrow}>&rarr;</span>
            </Link>
            <div className="font-mono text-[10px] tracking-[0.15em] text-slate mt-[18px] uppercase opacity-70">
              Secure payment / Instant confirmation / Foundation seats limited
            </div>
          </div>
        </div>
      </section> */}

      {/* LEARNING */}
      {/* <section className="relative py-[clamp(80px,10vw,140px)] bg-ivory overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-[40%] before:h-[35%] before:bg-[url('/images/ornament.webp')] before:bg-right-top before:bg-cover before:bg-no-repeat before:opacity-45 before:pointer-events-none">
        <div className="relative z-[1]">
          <div className="max-w-[640px] mx-auto mb-[60px] px-[clamp(20px,4vw,80px)]">
            <span className={`${eyebrow} mb-[18px] block`}>
              The Learning Experience
            </span>
            <h2 className="font-display font-medium text-[clamp(30px,3.8vw,48px)] leading-[1.1] text-navy mb-[18px]">
              What your enrolment includes.
            </h2>
            <p className="font-display italic text-[18px] text-gold-deep">
              Every element is designed to be applied in practice, not
              passively consumed.
            </p>
          </div>
          <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Live Teaching", desc: "Live Zoom lectures delivered directly by Dr. Sunita Tandulwadkar." },
              { num: "02", title: "Interactive Q&A", desc: "Direct doubt-clearing and case-based discussion in every session." },
              { num: "03", title: "Weekly Progression", desc: "Structured, stepwise academic flow. Every session builds on the last." },
              { num: "04", title: "Protocol Sheets", desc: "One-page clinical reference sheets for real-time application in practice." },
              { num: "05", title: "Recording Access", desc: "Optional access to recordings for selected courses, at a nominal additional fee." },
              { num: "06", title: "Certificate Pathway", desc: "Certification issued on completion of each tier in the pathway." },
            ].map((t) => (
              <div
                key={t.num}
                className="bg-cream border border-border-warm pt-8 pb-8 px-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-gold"
              >
                <div className="font-display font-medium text-[32px] text-gold-deep mb-2">
                  {t.num}
                </div>
                <div className="w-[26px] h-[1.5px] bg-gold-deep mb-5" />
                <div className="font-body font-semibold text-base text-navy mb-2.5 tracking-[0.01em]">
                  {t.title}
                </div>
                <div className="text-sm leading-[1.6] text-slate">
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* WHY JOIN */}
      <section className="py-[clamp(80px,10vw,140px)] bg-mist">
        <div className="max-w-[720px] mx-auto mb-20 text-center px-[clamp(20px,4vw,80px)]">
          <span className={`${eyebrow} block mb-[18px]`}>Why STAR Academy</span>
          <h2 className="font-display font-medium text-[clamp(30px,3.8vw,48px)] leading-[1.1] text-navy">
            Why doctors across India are choosing STAR.
          </h2>
        </div>

        {[
          {
            reverse: false,
            img: "bg-black bg-[url('/images/dna-pattern.webp')] bg-center bg-cover",
            imgChildren: null,
            eb: "Taught by a pioneer",
            h: "Learn directly from one of India's most authoritative voices in IVF.",
            p: "Dr. Sunita Tandulwadkar has performed IVF and endoscopic surgery for more than three decades. She has led ISAR, IAGE, FOGSI, and PHOXI at the national level. STAR Academy is the first time her teaching is available in a structured, live, stepwise format directly to doctors across the country.",
          },
          {
            reverse: true,
            img: "bg-charcoal bg-[url('/images/book-card-image.webp')] bg-center bg-contain bg-no-repeat",
            imgChildren: null,
            eb: "Built for clinical judgment",
            h: "Not just protocols. Practical reasoning for real patients.",
            p: "Most online infertility courses teach lists of steps. STAR teaches the reasoning behind the steps. You will learn not only what to do in a given clinical situation, but why it works, when it fails, and how to adapt when the case does not follow the textbook. This is the difference between information and judgment.",
          },
          {
            reverse: false,
            img: "bg-black flex items-center justify-center",
            imgChildren: (
              <img
                src="/images/pyramid.webp"
                alt="Four-tier pathway"
                className="max-h-[85%] [filter:drop-shadow(0_20px_40px_rgba(197,164,109,0.3))]"
              />
            ),
            eb: "Progressive, not fragmented",
            h: "A continuous pathway, not a one-off webinar.",
            p: "Webinars teach a topic. STAR teaches a subject. From the first lecture on reproductive endocrinology to the final masterclass on difficult cases, every session builds on the one before it. The four tiers form one connected educational pathway that takes clinicians from fundamentals to advanced application.",
          },
        ].map((row, i) => (
          <div
            key={i}
            className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-20 items-center mb-[60px] md:mb-[100px] last:mb-0"
          >
            <div
              className={`aspect-[4/3] bg-cream border border-border-warm relative overflow-hidden ${row.img} ${
                row.reverse ? "md:order-2" : ""
              }`}
            >
              {row.imgChildren}
            </div>
            <div>
              <span className={`${eyebrow} block mb-4`}>{row.eb}</span>
              <h3 className="font-display font-medium text-[clamp(22px,2.4vw,30px)] text-navy leading-[1.2] mb-[18px]">
                {row.h}
              </h3>
              <p className="text-base leading-[1.75] text-slate max-w-[55ch]">
                {row.p}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
