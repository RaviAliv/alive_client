import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import { foundationConfig } from "./course/data/foundation";
import { coreConfig } from "./course/data/core";
import { advancedConfig } from "./course/data/advanced";
import { masterclassConfig } from "./course/data/masterclass";

const eyebrow =
  "inline-block font-mono text-[14px] font-medium tracking-[0.26em] uppercase text-gold-deep";
const eyebrowGold = eyebrow.replace("text-gold-deep", "text-gold");
const arrow =
  "inline-block transition-transform duration-300 group-hover:translate-x-1";

/** Academy card whose YouTube video autoplays (muted) while hovered. */
function VideoCard({ h, p, videoId }: { h: string; p: string; videoId: string }) {
  const [hover, setHover] = useState(false);
  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1&controls=0&modestbranding=1&disablekb=1`;
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-cream relative border border-border-warm overflow-hidden w-[82%] shrink-0 snap-start md:w-auto md:shrink transition-all duration-500 ease-out md:group-hover/cards:scale-[0.96] md:group-hover/cards:opacity-60 md:hover:!scale-[1.04] md:hover:!opacity-100 hover:z-10 hover:shadow-[0_20px_40px_-20px_rgba(30,42,68,0.18)]"
    >
      {/* Thumbnail (default) → silent autoplay iframe (on hover) */}
      <div className="h-[200px] overflow-hidden bg-black relative">
        {hover ? (
          <iframe
            src={embedSrc}
            title="STAR Academy — Dr. Sunita Tandulwadkar"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0 scale-[1.05]"
          />
        ) : (
          <>
            <img
              src={thumb}
              alt={h}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
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
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const tierCardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Close the open lecture dropdown on outside click — no full-screen backdrop
  // element, which was fighting with the cards' hover-scale transforms and
  // causing them to jitter.
  useEffect(() => {
    if (!expandedTier) return;
    const onPointerDown = (e: MouseEvent) => {
      const card = tierCardRefs.current[expandedTier];
      if (card && !card.contains(e.target as Node)) setExpandedTier(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [expandedTier]);

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
          <div className="max-w-[540px] mx-auto md:mx-0 text-center md:text-left">
            <span className={`${eyebrowGold} mb-4`}>ACADEMY OF SRT</span>
            <h1 className="font-arial font-medium text-[clamp(35px,0.2vw,26px)] leading-[1.08] tracking-[-0.02em] text-ivory mb-4">
              Reproductive medicine, taught the way it deserves to be
            </h1>
            <p className="text-gold-light text-[clamp(17px,1vw,25px)] leading-[1.55] mb-2 max-w-[520px]">
              A stepwise learning platform in Infertility and Reproductive Endocrinology
Built to strengthen fundamentals, sharpen clinical reasoning, and translate biology into better patient care and outcomes. <br/>
</p><p className="text-white text-[clamp(10px,1vw,15px)]  text-bold leading-[1.55] mb-2 max-w-[520px]">LIVE 60 Minutes With Dr. Sunita Tandulwadkar Followed by Q&A
</p>

            <div className="flex gap-2.5 flex-wrap justify-center md:justify-start mb-6">
              <Link
                to="/course/foundation/lecture/01"
                className="inline-flex items-center gap-2 px-7 py-3 font-body font-bold text-[15px] tracking-[0.02em]   text-black rounded-xl bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] group"
              >
                Reserve Your Seat <span className={arrow}>&rarr;</span>
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 font-body font-medium text-[13px] tracking-[0.02em] border border-gold-light bg-transparent text-gold-light rounded-xl transition-all duration-300 hover:bg-gold-light hover:text-navy group"
              >
                See the Curriculum <span className={arrow}>&rarr;</span>
              </Link>
            </div>
            <div className="flex gap-3 flex-wrap items-center justify-center md:justify-start font-mono text-[10px] tracking-[0.15em] uppercase">
              <Link
                to="/course/foundation"
                className="text-gold border border-gold/30 px-3 py-1 rounded-md transition-all duration-300 hover:border-gold/70 hover:text-gold-light"
                style={{ boxShadow: "0 0 10px rgba(197,164,109,0.15), inset 0 0 8px rgba(197,164,109,0.04)" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 18px rgba(197,164,109,0.45), 0 0 36px rgba(197,164,109,0.18), inset 0 0 10px rgba(197,164,109,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 10px rgba(197,164,109,0.15), inset 0 0 8px rgba(197,164,109,0.04)")}
              >
                Explore Lecture Series
              </Link>
              <span className="text-gold-deep opacity-50">|</span>
              <span className="text-gold">Every Wednesday</span>
              <span className="text-gold-deep opacity-50">|</span>
              <span className="text-gold">Live on Zoom</span>
            </div>
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section className="relative bg-[linear-gradient(rgba(248,245,239,0.78),rgba(248,245,239,0.78)),url('/images/marble.webp')] bg-cover bg-center py-[clamp(48px,6vw,72px)] overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-start relative z-[1]">
          <div>
            {/* Only the eyebrow + heading are centered */}
            <div className="text-center">
              <span className={` ${eyebrow}  mb-4`}>Why STAR Academy Exists</span>
              <h2 className="font-display font-medium text-[clamp(26px,5vw,40px)] leading-[1.05] tracking-[-0.015em] text-navy mb-9">
                Infertility practice should not be learned in fragments
              </h2>
            </div>
            <p className="text-[clamp(16px,1.15vw,18px)] leading-[1.7] text-slate mb-4">
              Today, most infertility education reaches Indian doctors as
              scattered webinars, disconnected lectures, and isolated topic
              updates. The discipline, one of the most clinically demanding in
              gynecology, is rarely taught as one connected body of knowledge
            </p>
            <p className="text-[clamp(16px,1.15vw,18px)] leading-[1.7] text-slate mb-4">
              STAR Academy was built to change that. A live, progressive
              academic pathway that takes clinicians from reproductive
              endocrinology through to advanced IVF decision-making, taught
              directly by one of India's most respected pioneers in the field
            </p>
            <div className="mt-9 font-display italic text-[clamp(20px,1.8vw,26px)] text-gold-deep pl-5 border-l-2 border-gold">
              Four tiers. One continuous pathway. Fourty plus lectures.
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
      <section className="py-[clamp(48px,6vw,52px)] bg-[linear-gradient(rgba(15,20,32,0.74),rgba(15,20,32,0.74)),url('/images/header_footer.webp')] bg-cover bg-center">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center max-w-[820px] mx-auto mb-12">
            <span className={`${eyebrowGold} mb-[18px]`}>The Pathway</span>
            <h2 className="font-display font-medium text-[clamp(20px,3.8vw,38px)] leading-[1.1] text-ivory">
              One Pathway, Four Stages, 40+ Lectures
            </h2>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
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
                subTitle: "Foundation of Reproductive Medicine",
                desc: "The basics, taught like they decide everything. Rebuild the biology that quietly governs every cycle you manage.",
                lectures: "6 Lectures",
                to: "/course/foundation",
                cta: "Explore",
                live: true,
                lectureList: foundationConfig.lectures,
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
                subTitle: "Core Clinical Skills",
                desc: "Where most pregnancies are actually won. The judgment behind the everyday cases, and the pelvic factors working against them.",
                lectures: "6 Lectures",
                to: "/course/core",
                cta: "Explore",
                live: false,
                lectureList: coreConfig.lectures,
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
                subTitle: "Advanced IVF Practice",
                desc: "The skill between the textbook and the lab. Tactical execution for when the standard approach is not enough",
                lectures: "7 Lectures",
                to: "/course/advanced",
                cta: "Explore",
                live: false,
                lectureList: advancedConfig.lectures,
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
                subTitle: "Masterclass in Complex Cases",
                desc: "For the cases that do not resolve. Single-subject deep dives into the hardest problems in reproductive medicine",
                lectures: "10 Lectures",
                to: "/course/masterclass",
                cta: "Explore",
                live: false,
                lectureList: masterclassConfig.lectures,
              },
            ].map((c) => {
              const isExpanded = expandedTier === c.title;
              // Suppress the neighbor-dim/scale hover effect while any dropdown is
              // open — those transforms create new stacking contexts that fight
              // with the overlay panel and make the cards visibly jitter.
              const hoverFx = expandedTier === null
                ? "sm:group-hover/cards:scale-[0.96] sm:group-hover/cards:opacity-60 sm:hover:!scale-[1.04] sm:hover:!opacity-100 hover:z-10 hover:shadow-[0_30px_60px_-20px_rgba(30,42,68,0.28)]"
                : "";
              return (
                <div
                  key={c.title}
                  ref={(el) => { tierCardRefs.current[c.title] = el; }}
                  className={`group/card relative flex flex-col bg-cream border border-border-warm transition-all duration-500 ease-out ${hoverFx} ${c.ring}`}
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
                  <div className="flex flex-col flex-1 pt-12 pb-4 px-6">
                    <div className="mb-2">
                      <div className={`w-7 h-[2px] mb-2.5 ${c.accent}`} />
                      <h3 className={`font-display font-semibold text-[16.5px] leading-[1.3] tracking-[-0.01em] ${c.accentText}`}>
                        {c.subTitle}
                      </h3>
                    </div>
                    <p className="text-[13.5px] leading-[1.72] text-soft-black mb-3 flex-1">{c.desc}</p>
                    {/* View Lectures — Foundation only */}
                    {c.to === "/course/foundation" && (
                      <div className="relative mb-3 pb-3 border-b border-border-warm">
                        <button
                          type="button"
                          onClick={() => setExpandedTier(isExpanded ? null : c.title)}
                          aria-expanded={isExpanded}
                          className="flex items-center justify-between gap-2 w-full font-mono text-[10px] tracking-[0.18em] uppercase text-slate hover:text-navy transition-colors"
                        >
                          <span>{isExpanded ? "Hide Lectures" : "View Lectures"}</span>
                          <svg
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isExpanded && (
                          <div className="absolute left-0 right-0 top-full mt-2 z-20 bg-white border border-border-warm shadow-[0_20px_45px_-12px_rgba(30,42,68,0.35)] max-h-[260px] overflow-y-auto animate-fade-in">
                            <ul className="list-none m-0 p-0 divide-y divide-border-warm">
                              {c.lectureList.map((l) => (
                                <li key={l.id}>
                                  <Link
                                    to={l.detailPath || c.to}
                                    onClick={() => setExpandedTier(null)}
                                    className="flex items-center gap-3 px-4 py-2.5 group/lec hover:bg-black/[0.03] transition-colors"
                                  >
                                    <span className={`font-display font-medium text-[13px] shrink-0 w-6 ${c.accentText}`}>{l.no}</span>
                                    <span className="text-[12.5px] text-soft-black leading-snug group-hover/lec:text-navy">{l.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    <Link
                      to={c.to}
                      className="group/btn mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 font-body font-semibold text-[13px] tracking-[0.02em] border border-gold-deep text-black rounded-md bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)]"
                    >
                      {c.to === "/course/foundation" ? c.cta : "Coming Soon"}
                      {c.to === "/course/foundation" && (
                        <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">&rarr;</span>
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Separator strip */}
      <div className="bg-ivory border-y border-gold/30 py-10 px-[clamp(20px,4vw,52px)]">
        <div className="max-w-[1280px] mx-auto">
          {/* Top ornament */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="font-mono text-[12px] tracking-[0.32em] uppercase text-gold-deep text-center">The Academy in Numbers</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gold/40 border border-gold/40">
            {[
              { num: "40+",  label: "Total Lectures",  sub: "Across 4 tiers"          },
              { num: "4",    label: "Tiers in Pathway", sub: "Foundation to Masterclass" },
              { num: "35+",  label: "Years Experience", sub: "Dr. Sunita Tandulwadkar"  },
              { num: "live", label: "Every Session",    sub: "LIVE followed by Q&A"      },
            ].map((s) => (
              <div key={s.label} className="bg-ivory flex flex-col items-center justify-center py-4 px-4 text-center gap-1.5">
                {s.num === "live" ? (
                  <img
                    src="/images/liveLogo.png"
                    alt="Live"
                    className="h-9 w-auto object-contain mb-0.5"
                  />
                ) : (
                  <span className="font-body font-bold text-[clamp(34px,3.8vw,42px)] leading-none text-navy tracking-tight">{s.num}</span>
                )}
                <span className="font-mono text-[9.5px] font-semibold tracking-[0.24em] uppercase text-gold-deep mt-1">{s.label}</span>
                <span className="font-body text-[13px] text-slate leading-snug">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FACULTY SHORT */}
      {/* Faculty section hidden */}
      {/* 3-CARD MINI BLOCK */}
      <section className="py-[clamp(48px,7vw,52px)] bg-[linear-gradient(rgba(248,245,239,0.78),rgba(248,245,239,0.78)),url('/images/marble.webp')] bg-cover bg-center">
        <div className="max-w-[720px] mx-auto mb-5 text-center px-[clamp(20px,4vw,80px)]">
          <span className={`${eyebrow} mb-[18px]`}>The Academy</span>
          <h2 className="font-display font-medium text-[clamp(30px,3.8vw,38px)] leading-[1.1] text-navy mb-5">
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
              videoId: "vGhiP8et2mw",
            },
            {
              h: "Who it is for",
              p: "Gynecologists starting or growing an infertility practice. IVF clinicians sharpening their protocols. Fellowship trainees in reproductive medicine. Doctors who want to learn how to think through a case, not just hear another lecture.",
              videoId: "q3qxlNgOtaw",
            },
            {
              h: "Why it is different",
              p: "Taught by a pioneer IVF & Gynaecologic endoscopy specialist with 35+ years of clinical practice. Focused on the decisions doctors actually make in the clinic. Built as a four-tier pathway, so each course continues where the last one ended.",
              videoId: "hsbi4Cv4B0U",
            },
          ].map((c) => (
            <VideoCard key={c.h} h={c.h} p={c.p} videoId={c.videoId} />
          ))}
        </div>

      </section>
      {/* WHY JOIN */}
      <section className="py-[clamp(48px,6vw,52px)] bg-[linear-gradient(rgba(15,20,32,0.74),rgba(15,20,32,0.74)),url('/images/header_footer.webp')] bg-cover bg-center">
        

        {[
          {
            reverse: false,
            src: "/images/mam.webp",
            eb: "Taught by a pioneer",
            h: "Learn directly from one of India's most authoritative voices in IVF.",
            p: "Dr. Sunita Tandulwadkar brings over 35 years to IVF and endoscopic surgery, and is widely recognised as India's first female endoscopic surgeon. Throughout her career she has authored over 39+ books and 93+ publications. She serves as Chief of the IVF and Endoscopy Centre at Ruby Hall Clinic, Pune, Founder Solo IVF & ObGyn, and Co-Founder of ALIV Regenerative Wellness. One of the greatest achievements to her name was in the year 2018, when she delivered the world's first stem cell baby, to a 45-year-old woman.\n\nShe is currently President of ISAR (2026–2028) and Immediate Past President of FOGSI, and has led IAGE and POGS at the national level. Academy of SRT brings Dr. Sunita Tandulwadkar’s decades of clinical wisdom into a structured live interactive format, directly accessible to doctors across the globe.",
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
            className="max-w-[1280px]  mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-16 items-center mb-[30px] md:mb-[100px] last:mb-0"
          >
            <div className={`flex justify-center ${row.reverse ? "md:order-2" : ""}`}>
              <img
                src={row.src}
                alt={row.eb}
                className="w-full max-w-[450px] h-auto rounded-xl object-cover"
              />
            </div>
            <div>
              <span className="text-md text-[#F7DB7D] font-mono uppercase font-bold py-4">{row.eb}</span>
              <h3 className="font-display font-medium text-[clamp(15px,2.4vw,20px)] text-ivory leading-[1.2] mt-3 mb-[18px]">
                {row.h}
              </h3>
              {row.p.split("\n\n").map((para, j) => (
                <p key={j} className="text-base leading-[1.75] text-sm text-ivory/80 max-w-[55ch] mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}

      </section>
      {/* ENROLLMENT CTA */}
      <section className="bg-white py-[clamp(48px,6vw,72px)] px-[clamp(20px,4vw,80px)]">
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
              Now Enrolling &middot; 15th july 2026
            </span>

            <h2 className="font-display font-medium text-[clamp(16px,2vw,30px)] leading-[1.12] tracking-[-0.015em] text-ivory mb-4">
              The first batch begins on 15 July Reserve your seat
              <span className="italic text-gold-light">
                {" "}
              </span>
            </h2>

            <p className="text-[15px] leading-[1.7] text-ivory/80 max-w-[66ch] mx-auto mb-7">
              The Foundation Series runs live, every Wednesday at 8 PM IST.
              Interactive Q&amp;A in every session. Seats are limited so the cohort
              stays small enough for direct teaching.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/course/foundation/enroll"
                className="inline-flex items-center gap-2 px-7 py-3 font-body font-bold text-[15px] tracking-[0.02em] text-black rounded-xl bg-[#A87928] hover:brightness-110 hover:shadow-[0_10px_26px_-6px_rgba(247,219,125,0.7)] "
              >
                Reserve Your Seat →
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
                "Commences 15th july 2026",
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
