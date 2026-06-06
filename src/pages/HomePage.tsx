import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import HeroCarousel from "../components/HeroCarousel";
import { VIDEOS, ENROLL_URL } from "../lib/config";

const eyebrow =
  "inline-block font-mono text-[14px] font-medium tracking-[0.26em] uppercase text-gold-deep";
const eyebrowGold = eyebrow.replace("text-gold-deep", "text-gold");
const arrow =
  "inline-block transition-transform duration-300 group-hover:translate-x-1";

/** Academy card whose YouTube video autoplays (muted) while hovered. */
function VideoCard({ h, p }: { h: string; p: string }) {
  const [hover, setHover] = useState(false);
  const base = `https://www.youtube.com/embed/${VIDEOS.foundationIntro}`;
  const src = hover
    ? `${base}?autoplay=1&mute=1&rel=0&playsinline=1`
    : `${base}?rel=0`;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-cream relative border border-border-warm overflow-hidden w-[82%] shrink-0 snap-start md:w-auto md:shrink transition-all duration-500 ease-out md:group-hover/cards:scale-[0.96] md:group-hover/cards:opacity-60 md:hover:!scale-[1.04] md:hover:!opacity-100 hover:z-10 hover:shadow-[0_20px_40px_-20px_rgba(30,42,68,0.18)]"
    >
      {/* Video — autoplays muted on hover */}
      <div className="h-[200px] overflow-hidden bg-black">
        <iframe
          src={src}
          title="STAR Academy — Dr. Sunita Tandulwadkar"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
      {/* Gold accent below the video */}
      <div className="h-[3px] bg-gold" />
      <div className="pt-4 pb-7 px-8">
        <h3 className="font-display text-[28px] text-navy mb-[18px] font-medium">
          {h}
        </h3>
        <p className="text-soft-black text-[15px] leading-[1.7]">{p}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const tiersRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState(0);
  const TIER_COUNT = 4;

  // Snap point for card[idx] = its position inside the scroller minus the scroll-padding.
  // We must scroll to the exact snap point or snap-mandatory will reject the smooth scroll.
  const snapPointFor = (el: HTMLElement, card: HTMLElement) => {
    const padL = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    return card.offsetLeft - el.offsetLeft - padL;
  };

  const scrollToTier = (idx: number) => {
    const el = tiersRef.current;
    if (!el) return;
    const target = el.children[idx] as HTMLElement | undefined;
    if (!target) return;
    el.scrollTo({ left: snapPointFor(el, target), behavior: "smooth" });
  };

  // Auto-advance every 7s on mobile. Reads current position so it survives manual swipes.
  useEffect(() => {
    const el = tiersRef.current;
    if (!el) return;
    if (window.matchMedia("(min-width: 640px)").matches) return;

    const id = window.setInterval(() => {
      const cards = Array.from(el.children) as HTMLElement[];
      if (!cards.length) return;
      let currentIdx = 0;
      let best = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const dist = Math.abs(snapPointFor(el, cards[i]) - el.scrollLeft);
        if (dist < best) {
          best = dist;
          currentIdx = i;
        }
      }
      const next = cards[(currentIdx + 1) % cards.length];
      el.scrollTo({ left: snapPointFor(el, next), behavior: "smooth" });
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  // Scroll listener purely updates the active-dot state. No scrollTo here.
  useEffect(() => {
    const el = tiersRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(el.children) as HTMLElement[];
        if (!cards.length) return;
        let closestIdx = 0;
        let best = Infinity;
        for (let i = 0; i < cards.length; i++) {
          const dist = Math.abs(snapPointFor(el, cards[i]) - el.scrollLeft);
          if (dist < best) {
            best = dist;
            closestIdx = i;
          }
        }
        setActiveTier(closestIdx);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-5 h-[calc(100vh-60px)] min-h-[600px] bg-black overflow-hidden flex items-center">
        {/* Desktop: cycling carousel */}
        <div className="hidden md:block">
          <HeroCarousel />
        </div>
        {/* Mobile: single static image — the carousel crops badly on small screens */}
        <img
          src="/images/header_footer.webp"
          alt=""
          aria-hidden="true"
          className="md:hidden absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/65 to-black/45 md:bg-gradient-to-r md:from-[rgba(10,14,22,0.85)] md:via-[rgba(10,14,22,0.25)] md:to-transparent" />
        <div className="relative z-[2] max-w-[1280px] mx-auto pt-16 md:pt-[100px] pb-8 px-[clamp(20px,4vw,80px)] w-full">
          <div className="max-w-[640px] mx-auto md:mx-0 text-center md:text-left">
            <span className={`${eyebrowGold} mb-4`}>THE FOUNDATION SERIES</span>
            <h1 className="font-display font-medium text-[clamp(20px,3.6vw,46px)] leading-[1.08] tracking-[-0.02em] text-ivory mb-4">
              Five live lectures that rebuild how you read a fertility cycle
            </h1>
            <p className="text-gold-light text-[clamp(17px,1vw,25px)] leading-[1.55] mb-6 max-w-[520px]">
              From the hormonal signal to the implantation window to the diagnostic roadmap. Taught the way an experienced reproductive specialist sees the patient in front of them
            </p>
            <div className="flex gap-2.5 flex-wrap justify-center md:justify-start mb-6">
              <a
                href={ENROLL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 font-body font-bold text-[15px] tracking-[0.02em]   text-black rounded-xl bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] group"
              >
                Reserve Your Seat <span className={arrow}>&rarr;</span>
              </a>
              <Link
                to="/faculty"
                className="inline-flex items-center gap-2 px-6 py-3 font-body font-medium text-[13px] tracking-[0.02em] border border-gold-light bg-transparent text-gold-light rounded-xl transition-all duration-300 hover:bg-gold-light hover:text-navy group"
              >
                See the Curriculum <span className={arrow}>&rarr;</span>
              </Link>
            </div>
            <div className="flex gap-3 flex-wrap justify-center md:justify-start font-mono text-[10px] text-gold tracking-[0.15em] uppercase">
              <span>FIVE LECTURES</span>
              <span className="text-gold-deep opacity-60">/</span>
              <span>EVERY WEDNESDAY</span>
              <span className="text-gold-deep opacity-60">/</span>
              <span>LIVE ON ZOOM</span>
            </div>
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section className="relative bg-[linear-gradient(rgba(248,245,239,0.78),rgba(248,245,239,0.78)),url('/images/marble.webp')] bg-cover bg-center py-15 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-start relative z-[1]">
          <div>
            {/* Only the eyebrow + heading are centered */}
            <div className="text-center">
              <span className={` ${eyebrow}  mb-4`}>Why STAR Academy Exists</span>
              <h2 className="font-display font-medium text-[clamp(26px,5vw,40px)] leading-[1.05] tracking-[-0.015em] text-navy mb-9">
                Infertility practice should not be learned in fragments.
              </h2>
            </div>
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
              { c: "bg-[#19984F]", label: "Foundation" },
              { c: "bg-[#F5CB38]", label: "Core" },
              { c: "bg-[#283049]", label: "Advanced" },
              { c: "bg-[#DA3834]", label: "Masterclass" },
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
      <section className="pt-[clamp(20px,8vw,40px)] pb-[clamp(70px,10vw,150px)] bg-[linear-gradient(rgba(15,20,32,0.74),rgba(15,20,32,0.74)),url('/images/header_footer.webp')] bg-cover bg-center">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center max-w-[720px] mx-auto mb-12">
            <span className={`${eyebrowGold} mb-[18px]`}>The Pathway</span>
            <h2 className="font-display font-medium text-[clamp(30px,3.8vw,48px)] leading-[1.1] text-ivory">
              Four tiers. One continuous academic pathway
            </h2>
          </div>

          <div ref={tiersRef} className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-7 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-pl-[clamp(20px,4vw,80px)] -mx-[clamp(20px,4vw,80px)] sm:mx-0 px-[clamp(20px,4vw,80px)] sm:px-0 pb-3 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden group/cards">
            {[
              {
                img: "/images/Foundation.webp",
                accent: "bg-t-green",
                accentText: "text-t-green",
                ring: "group-hover/card:border-t-green",
                letter: "F",
                rest: "oundation",
                tier: "Tier I",
                title: "Foundation",
                desc: "Mastering the absolute basics of reproductive medicine. Five live lectures rebuilding the biological foundations every clinical decision rests on.",
                lectures: "5 Lectures",
                to: "/course/foundation",
                cta: "Explore",
                live: true,
              },
              {
                img: "/images/Core.webp",
                accent: "bg-t-gold",
                accentText: "text-t-gold",
                ring: "group-hover/card:border-t-gold",
                letter: "C",
                rest: "ore",
                tier: "Tier II",
                title: "Core",
                desc: "Simple, highly effective infertility treatments. Five lectures on evaluation, ovulation induction, IUI workflow, and the hidden pelvic drivers.",
                lectures: "5 Lectures",
                to: "/course/core",
                cta: "Explore",
                live: false,
              },
              {
                img: "/images/Advanced.webp",
                accent: "bg-t-blue",
                accentText: "text-t-blue",
                ring: "group-hover/card:border-t-blue",
                letter: "A",
                rest: "dvanced",
                tier: "Tier III",
                title: "Advanced",
                desc: "IVF practising tips and tactical execution. Seven lectures on stimulation, OHSS prevention, retrieval, embryology, and transfer mechanics.",
                lectures: "7 Lectures",
                to: "/course/advanced",
                cta: "Explore",
                live: false,
              },
              {
                img: "/images/Masterclass.webp",
                accent: "bg-t-red",
                accentText: "text-t-red",
                ring: "group-hover/card:border-t-red",
                letter: "M",
                rest: "asterclass",
                tier: "Tier IV",
                title: "Masterclass",
                desc: "In-depth, singular subject mastery. Ten deep-dives on the highest-complexity cases: implantation failure, recurrent loss, and endometriosis.",
                lectures: "10 Lectures",
                to: "/course/masterclass",
                cta: "Explore",
                live: false,
              },
            ].map((c) => (
              <div
                key={c.title}
                className={`group/card relative flex flex-col bg-cream border border-border-warm w-full shrink-0 snap-start sm:w-auto sm:shrink transition-all duration-500 ease-out sm:group-hover/cards:scale-[0.96] sm:group-hover/cards:opacity-60 sm:hover:!scale-[1.04] sm:hover:!opacity-100 hover:z-10 hover:shadow-[0_30px_60px_-20px_rgba(30,42,68,0.28)] ${c.ring}`}
              >
                <div className={`absolute top-0 left-0 right-0 h-[3px] z-[3] ${c.accent}`} />
                <div className="relative">
                  <div className="relative h-[220px] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    {c.live ? (
                      <span className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.18em] uppercase text-ivory ${c.accent} border border-white/30 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white before:animate-pulse`}>
                        Enrolling
                      </span>
                    ) : (
                      <span className="absolute top-4 right-4 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.18em] uppercase text-ivory/85 bg-black/45 border border-white/15 backdrop-blur-sm">
                        Coming Soon
                      </span>
                    )}
                    <span className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.22em] uppercase text-gold-light">
                      {c.tier}
                    </span>
                  </div>
                  <div className="absolute -bottom-7 left-6 z-[2] flex items-stretch shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)]">
                    <div className={`relative w-12 h-14 flex items-center justify-center font-display font-semibold text-[28px] text-ivory border-2 border-gold ${c.accent}`}>
                      {c.letter}
                    </div>
                    <div className="flex items-center bg-cream border-y-2 border-r-2 border-gold -ml-px px-1">
                      <span className={`font-display font-semibold text-[22px] leading-none tracking-[0.01em] ${c.accentText}`}>
                        {c.rest}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1 pt-12 pb-7 px-6">
                  <p className="text-[14px] leading-[1.7] text-black mb-5 flex-1">{c.desc}</p>
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border-warm">
                    <span className={`flex items-center gap-1.5 font-bold text-[10.5px] tracking-[0.15em] uppercase ${c.accentText} before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-current`}>
                      {c.lectures}
                    </span>
                    <span className="w-px h-3 bg-border-warm" />
                    <span className="font-mono text-[10.5px] tracking-[0.15em] uppercase font-bold text-gold">Live on Zoom</span>
                  </div>
                  <Link
                    to={c.to}
                    className="group/btn mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 font-body font-semibold text-[13px] tracking-[0.02em] border border-gold-deep text-black rounded-md bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)]  "
                  >
                    {c.cta}
                    <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots — mobile only */}
          <div className="sm:hidden flex justify-center gap-2 mt-6">
            {Array.from({ length: TIER_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToTier(i)}
                aria-label={`Go to tier ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeTier ? "w-6 bg-gold" : "w-2 bg-gold/40"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* <div className="bg-[url('/images/white_background.webp')] bg-cover bg-center py-[clamp(40px,7vw,80px)]">
        <RegistrationForm />
      </div> */}

      {/* FACULTY SHORT */}
      <section className="relative bg-[linear-gradient(rgba(15,20,32,0.74),rgba(15,20,32,0.74)),url('/images/header_footer.webp')] bg-cover bg-center text-ivory py-[clamp(38px,7vw,60px)] overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-gold/40 z-[1] hidden md:block" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-gold/40 z-[1] hidden md:block" />

        <div className="relative z-[1] max-w-[1240px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center max-w-[840px] mx-auto mb-5 md:mb-7">
            <span className={`${eyebrowGold} block mb-2`}>The Faculty</span>
            <p className="font-mono text-[11px] tracking-[0.20em] uppercase text-ivory/70 mb-2">
              Built for the doctor who wants to think clearly, not just learn more
            </p>
            <h2 className="font-display font-medium italic text-gold-light text-[clamp(22px,3.4vw,40px)] leading-[1.15] tracking-[-0.01em] px-2 sm:px-0">
              Founder and faculty, Academy of SRT
            </h2>
            <div className="mt-4 w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[0.78fr_1fr] gap-8 md:gap-12 lg:gap-14 items-stretch">
            {/* Left: BookCard */}
            <div className="relative mx-auto md:mx-0 self-center w-full max-w-[400px] md:max-w-none flex items-center justify-center">
              {/* Atmospheric glow behind book */}
              <div className="absolute inset-0 pointer-events-none">
                {/* <div className="absolute inset-x-[10%] bottom-0 top-[20%] bg-[radial-gradient(ellipse_80%_70%_at_50%_90%,rgba(197,164,109,0.18),transparent_70%)]" />
                <div className="absolute inset-x-[15%] inset-y-[10%] bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(197,164,109,0.08),transparent_65%)]" /> */}
              </div>
              <BookCard large />
            </div>

            {/* Right: single cohesive panel */}
            <div className="relative flex flex-col
             justify-center bg-[rgba(10,14,22,0.5)] backdrop-blur-sm border border-gold/20 px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7">
              <p className="text-[15px] leading-[1.65] mb-4 max-w-[58ch]">
                Dr. Sunita Tandulwadkar has spent over thirty-five years in IVF, endoscopy, and reproductive medicine. She heads the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune, founded Solo Clinic IVF, and co-founded ALIV Stem Cell Research.
                She is President of ISAR for 2026-2028, and President FOGSI of 2025. Every lecture in the Academy is taught by her, in the same voice and the same method she uses with her own patients.
              </p>

              {/* Stat grid — 3 cols on sm+, 2 cols on xs with 3rd spanning full */}
              <div className="grid grid-cols-3 gap-px bg-gold/20 border border-gold/20 mb-4">
                {[
                  { num: "35+", label: "Years Practice" },
                  { num: "39", label: "Books Authored" },
                  { num: "106+", label: "Peer Papers" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[rgba(10,14,22,0.7)] backdrop-blur-sm px-2 py-3 sm:px-3 text-center transition-colors duration-300 hover:bg-[rgba(10,14,22,0.85)]"
                  >
                    <div className="font-display text-[clamp(20px,2vw,28px)] text-gold leading-none mb-1">
                      {s.num}
                    </div>
                    <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.10em] sm:tracking-[0.16em] uppercase text-ivory/70 leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="relative pl-5 mb-4 font-display italic text-[clamp(14px,1.2vw,18px)] text-gold-light leading-[1.5] before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-gradient-to-b before:from-gold before:via-gold-deep before:to-transparent">
                In reproductive medicine, I do have an authority. In
                regenerative medicine, India's first stem cell success, and
                the world's first at the age of 45, goes to my credit.
                <cite className="block mt-2 font-mono not-italic text-[10px] tracking-[0.20em] text-gold-deep uppercase">
                  — Dr. Sunita Tandulwadkar
                </cite>
              </blockquote>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                {[
                  "President, ISAR 2026–2028",
                  "India's First Endoscopic Surgeon, 1994",
                  "World's First Stem Cell Success at 45",
                ].map((cred) => (
                  <span
                    key={cred}
                    className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.16em] uppercase px-2.5 py-1.5 border border-gold-deep/60 text-gold-light bg-[rgba(197,164,109,0.06)] rounded-sm"
                  >
                    {cred}
                  </span>
                ))}
              </div>

              <Link to="/faculty" className="self-start inline-flex items-center gap-2 px-5 py-2.5 font-body font-medium text-[13px] tracking-[0.02em] border rounded-[2px] cursor-pointer transition-all duration-300 group bg-transparent text-gold border-gold hover:bg-gold hover:text-navy">
                Read Dr. Sunita's full profile <span className={arrow}>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* 3-CARD MINI BLOCK */}
      <section className="py-[clamp(48px,7vw,90px)] bg-[linear-gradient(rgba(248,245,239,0.78),rgba(248,245,239,0.78)),url('/images/marble.webp')] bg-cover bg-center">
        <div className="max-w-[720px] mx-auto mb-5 text-center px-[clamp(20px,4vw,80px)]">
          <span className={`${eyebrow} mb-[18px]`}>The Academy</span>
          <h2 className="font-display font-medium text-[clamp(30px,3.8vw,48px)] leading-[1.1] text-navy mb-5">
            A doctor-led academic platform in infertility and IVF
          </h2>
          <p className="text-slate text-[17px] leading-[1.7]">
            Founded by Dr. Sunita Tandulwadkar, India's pioneering IVF and
            endoscopic surgeon. Designed to train the next generation of
            reproductive medicine specialists the way serious clinical work is
            actually practised.
          </p>
        </div>
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] flex md:grid md:grid-cols-3 gap-3 md:gap-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-pl-[clamp(20px,4vw,80px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden group/cards">
          {[
            {
              h: "What it is",
              p: "Live training in infertility and IVF, taught in a structured order. Each tier builds on the one before, moving from fundamentals to advanced clinical decisions. Sessions are taught on Zoom, with room for questions every week.",
            },
            {
              h: "Who it is for",
              p: "Gynecologists starting or growing an infertility practice. IVF clinicians sharpening their protocols. Fellowship trainees in reproductive medicine. Doctors who want to learn how to think through a case, not just hear another lecture.",
            },
            {
              h: "Why it is different",
              p: "Taught by an IVF and gynecologic endoscopy specialist with three decades of clinical practice. Focused on the decisions doctors actually make in the clinic. Built as a four-tier pathway, so each course continues where the last one ended.",
            },
          ].map((c) => (
            <VideoCard key={c.h} h={c.h} p={c.p} />
          ))}
        </div>

      </section>
      {/* WHY JOIN */}
      <section className=" pt-[clamp(50px,8vw,40px)] pb-[clamp(60px,10vw,120px)] bg-[linear-gradient(rgba(15,20,32,0.74),rgba(15,20,32,0.74)),url('/images/header_footer.webp')] bg-cover bg-center">
        <div className="max-w-[720px] mx-auto mb-20 text-center px-[clamp(20px,4vw,80px)]">
          <span className={`${eyebrowGold} block mb-[10px]`}>Why STAR Academy</span>
          <h2 className="font-display font-medium text-[clamp(30px,3.8vw,48px)] leading-[1.1] text-ivory">
            Why doctors across India are choosing STAR
          </h2>
        </div>

        {[
          {
            reverse: false,
            src: "/images/mam.webp",
            eb: "Taught by a pioneer",
            h: "Learn directly from one of India's most authoritative voices in IVF.",
            p: "Dr. Sunita Tandulwadkar has performed IVF and endoscopic surgery for more than three decades. She has led ISAR, IAGE, FOGSI, and PHOXI at the national level. STAR Academy is the first time her teaching is available in a structured, live, stepwise format directly to doctors across the country.",
          }
          // {
          //   reverse: true,
          //   src: "/images/jugment.webp",
          //   eb: "Built for clinical judgment",
          //   h: "Not just protocols. Practical reasoning for real patients.",
          //   p: "Most online infertility courses teach lists of steps. STAR teaches the reasoning behind the steps. You will learn not only what to do in a given clinical situation, but why it works, when it fails, and how to adapt when the case does not follow the textbook. This is the difference between information and judgment.",
          // },
          // {
          //   reverse: false,
          //   src: "/images/pyramid.webp",
          //   eb: "Progressive, not fragmented",
          //   h: "A continuous pathway, not a one-off webinar.",
          //   p: "Webinars teach a topic. STAR teaches a subject. From the first lecture on reproductive endocrinology to the final masterclass on difficult cases, every session builds on the one before it. The four tiers form one connected educational pathway that takes clinicians from fundamentals to advanced application.",
          // },
        ].map((row, i) => (
          <div
            key={i}
            className="max-w-[1280px] -mt-7 mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-20 items-center mb-[30px] md:mb-[100px] last:mb-0"
          >
            <img
              src={row.src}
              alt={row.eb}
              className={`w-full  h-auto rounded-xl ${row.reverse ? "md:order-2" : ""
                }`}
            />
            <div>
              <span className="text-md text-[#F7DB7D] font-mono  uppercase text-bold py-4 ">{row.eb}</span>
              <h3 className="font-display font-medium text-[clamp(22px,2.4vw,30px)] text-ivory leading-[1.2] mt-3 mb-[18px]">
                {row.h}
              </h3>
              <p className="text-base leading-[1.75] text-ivory/80 max-w-[55ch]">
                {row.p}
              </p>
            </div>
          </div>
        ))}

      </section>
      {/* ENROLLMENT CTA */}
      <section className="bg-white py-[clamp(34px,4vw,62px)] px-[clamp(20px,4vw,80px)]">
        <div
          className="
      relative
      overflow-hidden
      max-w-[1100px]
      mx-auto
      border border-gold/25
      rounded-[28px]
      bg-[url('/images/header_footer.webp')]
      bg-cover
      bg-center
    "
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[rgba(11,18,32,0.82)] " />

          {/* Decorative corner accents */}
          <div className="absolute top-8 left-8 w-14 h-14 border-t border-l border-gold/40 hidden md:block z-[2]" />
          <div className="absolute bottom-8 right-8 w-14 h-14 border-b border-r border-gold/40 hidden md:block z-[2]" />

          {/* Content */}
          <div className="relative z-[3] max-w-[880px] mx-auto text-center px-[clamp(24px,5vw,56px)] py-[clamp(40px,6vw,70px)] text-ivory">

            <span className="inline-block font-mono text-[10px] sm:text-[12px] font-medium tracking-[0.15em] sm:tracking-[0.3em] uppercase text-gold mb-4 whitespace-nowrap">
              Now Enrolling &middot; 15 July 2026
            </span>

            <h2 className="font-display font-medium text-[clamp(26px,3.6vw,40px)] leading-[1.12] tracking-[-0.015em] text-ivory mb-4">
              The first batch begins on 15 July. Reserve your seat.
              <span className="italic text-gold-light">
                {" "}
              </span>
            </h2>

            <p className="text-[15px] leading-[1.7] text-ivory/80 max-w-[56ch] mx-auto mb-7">
              The Foundation Series runs live, every Wednesday at 8 PM IST.
              Live Q&amp;A in every session. Seats are limited so the cohort
              stays small enough for direct teaching.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={ENROLL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 font-body font-bold text-[15px] tracking-[0.02em] text-black rounded-xl bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] "
              >
                Reserve Your Seat →
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 font-body font-medium text-[13px] tracking-[0.02em] border border-gold-light bg-transparent text-gold-light rounded-xl transition-all duration-300 hover:bg-gold-light hover:text-navy"
              >
                Speak to Our Team →
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
            <Link to="/course/foundation" className={btnPrimary}>
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


    </>
  );
}
