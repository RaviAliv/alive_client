import { useEffect, useRef, useState } from "react";
import RegistrationForm from "../components/RegistrationForm";

const lectures = [
  {
    id: "lecture-1",
    lnum: "L01",
    label: "Lecture One",
    no: "01",
    title: "The 300-Day Ovarian Symphony",
    body: "The complete arc of how an oocyte matures, from the first hormonal signal to ovulation. The HPO axis, follicular endocrinology, and folliculogenesis, laid down as the layer every later clinical decision rests on.",
  },
  {
    id: "lecture-2",
    lnum: "L02",
    label: "Lecture Two",
    no: "02",
    title: "Ovulation and Precision Triggering",
    body: "Ovulation physiology from molecular dynamics to clinical application. When to trigger, why it works, and how to adapt with confidence when the standard playbook does not give the expected result.",
  },
  {
    id: "lecture-3",
    lnum: "L03",
    label: "Lecture Three",
    no: "03",
    title: "The Corpus Luteum as a Clinical Compass",
    body: "Advances in luteal phase support. The corpus luteum read not as a checkbox at the end of a cycle, but as a clinical signal that tells you what the cycle is doing.",
  },
  {
    id: "lecture-4",
    lnum: "L04",
    label: "Lecture Four",
    no: "04",
    title: "Implantation, the Genesis Dialogue",
    body: "The molecular dialogue between the human embryo and the endometrium. The signals each sends, what makes that dialogue succeed or fail, and the biology your patients ask you to explain.",
  },
  {
    id: "lecture-5",
    lnum: "L05",
    label: "Lecture Five",
    no: "05",
    title: "The Precision Diagnostic Roadmap",
    body: "The diagnostic framework working specialists use in female fertility evaluation. What to ask first, what to order, and how to read results in the context of the biology covered across the series. Built to take into clinic.",
  },
];

const fullCurriculum = [
  {
    num: "01",
    title: "The Complete Arc of the Ovarian Cycle",
    body: "The full story of how an oocyte matures over 300 days, from the first hormonal signal through to ovulation. Where every clinical decision actually sits on the biology, and what you gain by seeing the whole arc instead of the single month in front of you.",
  },
  {
    num: "02",
    title: "Ovulation, Triggering, and Timing",
    body: "From molecular dynamics to clinical application. Why ovulation works the way it does, when to trigger, what makes a trigger succeed or fail, and how to adapt when the textbook playbook breaks down in a real patient.",
  },
  {
    num: "03",
    title: "Reading the Luteal Phase as a Clinical Signal",
    body: "The corpus luteum as a diagnostic compass, not a checkbox. Current understanding of luteal phase support. How to recognise what a luteal phase is telling you, and how to support it intelligently in the right patient.",
  },
  {
    num: "04",
    title: "The Molecular Dialogue of Implantation",
    body: "Implantation is not a timing problem. It is a conversation between the embryo and the endometrium. Understand how endometrial receptivity and embryonic signalling actually work, and why this changes the way you think about implantation failure.",
  },
  {
    num: "05",
    title: "The Precision Diagnostic Road Map",
    body: "How to evaluate a fertility patient with precision, not breadth. What to test, what to skip, and how to interpret every result in the full clinical context. The diagnostic philosophy that separates efficient practice from exhaustive over-investigation.",
  },
];

const enrollPerks = [
  "Five live lectures with Dr. Sunita",
  "Interactive Q&A every session",
  "Clinical protocol sheets",
  "Certificate on completion",
  "One email, one entry access",
];

export default function FoundationPage() {
  const [open, setOpen] = useState(false);
  const [selectLabel, setSelectLabel] = useState("All five lectures");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!selectRef.current) return;
      if (!selectRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const eyebrow =
    "font-mono text-[11px] font-medium tracking-[0.28em] uppercase text-gold-deep";

  return (
    <>
      {/* SERIES HEADER */}
      <section className="bg-cream border-b border-border-warm pt-[54px] pb-[50px]">
        <div className="max-w-[1180px] mx-auto px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-10">
          <div>
            <span className={`${eyebrow} block mb-3.5`}>
              STAR Curriculum &nbsp;/&nbsp; Tier I
            </span>
            <div className="font-display font-semibold text-[46px] md:text-[60px] leading-none text-t-green tracking-[-0.015em]">
              Foundation Series
            </div>
            <p className="mt-3.5 text-base text-slate max-w-[430px]">
              The biology layer of reproductive medicine. Five live lectures,
              taught by Dr. Sunita Tandulwadkar.
            </p>
          </div>

          {/* Lecture dropdown */}
          <div
            ref={selectRef}
            className="relative w-full md:w-auto md:min-w-[300px]"
          >
            <label className="block font-mono text-[10px] tracking-[0.22em] uppercase text-gold-deep mb-2.5">
              Jump to a lecture
            </label>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              className="w-full flex items-center justify-between bg-ivory border-[1.5px] border-t-green rounded-[3px] px-[18px] py-[15px] cursor-pointer text-[15px] text-soft-black transition-colors duration-200 hover:bg-t-green-soft"
              style={{ ["--tw-bg-opacity" as never]: undefined }}
            >
              <span>{selectLabel}</span>
              <span
                className={`ml-3.5 w-[9px] h-[9px] border-r-2 border-b-2 border-t-green transition-transform duration-250 ${
                  open ? "rotate-[-135deg]" : "rotate-45"
                }`}
              />
            </button>
            <div
              className={`absolute top-[calc(100%+6px)] left-0 right-0 bg-ivory border-[1.5px] border-t-green rounded-[3px] overflow-hidden z-40 shadow-[0_18px_40px_rgba(20,28,46,0.16)] transition-all duration-200 ${
                open
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1.5"
              }`}
            >
              {lectures.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => {
                    setSelectLabel(l.title);
                    setOpen(false);
                  }}
                  className="flex items-baseline gap-3 px-[18px] py-[13px] text-[14px] text-soft-black border-b border-mist last:border-b-0 transition-colors duration-150 hover:bg-[#E8F2EB]"
                >
                  <span className="font-mono text-[11px] text-t-green font-medium flex-shrink-0">
                    {l.lnum}
                  </span>
                  <span>{l.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO VIDEO */}
      <section className="pt-16 pb-5">
        <div className="max-w-[1180px] mx-auto px-10">
          <div className="relative max-w-[960px] mx-auto rounded-[5px] overflow-hidden border border-border-warm shadow-[0_30px_70px_-28px_rgba(20,28,46,0.45)]">
            <div className="relative w-full pt-[56.25%] bg-navy-dark">
              <iframe
                src="https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID"
                title="Dr. Sunita Tandulwadkar introduces the Foundation Series"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
          <p className="text-center mt-[22px] text-sm text-slate">
            <span className="font-display italic font-medium text-base text-soft-black">
              Dr. Sunita Tandulwadkar introduces the Foundation Series.
            </span>
            <br />
            A short walk-through of what the five lectures cover and who they
            are built for.
          </p>
        </div>
      </section>

      {/* LECTURE PLACARDS */}
      <section className="pt-[44px] pb-20">
        <div className="max-w-[1180px] mx-auto px-10">
          <div className="text-center max-w-[620px] mx-auto mb-[50px]">
            <span className={`${eyebrow} block mb-4`}>The Curriculum</span>
            <h2 className="font-display font-medium text-[32px] md:text-[40px] leading-[1.12] text-navy">
              Five lectures, one continuous arc
            </h2>
            <p className="mt-3.5 text-[15px] text-slate">
              Each lecture builds on the one before it. Select any lecture to
              read what it covers and to register.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px]">
            {lectures.map((l) => (
              <a
                key={l.id}
                id={l.id}
                href="#"
                className="relative overflow-hidden bg-cream border border-border-warm rounded-[5px] pt-[34px] px-8 pb-[30px] flex flex-col transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_22px_48px_-26px_rgba(20,28,46,0.4)] hover:border-t-green before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-t-green"
              >
                <div className="flex items-center justify-between mb-[18px]">
                  <span className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-t-green">
                    {l.label}
                  </span>
                  <span className="font-display italic text-[30px] text-gold leading-none">
                    {l.no}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[25px] leading-[1.2] text-navy mb-3.5">
                  {l.title}
                </h3>
                <p className="text-[14.5px] text-slate leading-[1.62] flex-grow">
                  {l.body}
                </p>
                <div className="mt-5 pt-[18px] border-t border-mist flex items-baseline gap-2">
                  <span className="font-display font-semibold text-[26px] text-navy">
                    &#8377;799
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate">
                    per lecture
                  </span>
                </div>
                <span className="mt-[18px] inline-flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-t-green self-start transition-all duration-200 group">
                  Know more
                  <span className="relative inline-block w-[22px] h-[1.5px] bg-t-green after:content-[''] after:absolute after:right-0 after:-top-[3px] after:w-[7px] after:h-[7px] after:border-t-[1.5px] after:border-r-[1.5px] after:border-t-green after:rotate-45" />
                </span>
              </a>
            ))}

            {/* Series card */}
            <a
              href="#inquiry"
              className="relative overflow-hidden bg-[#E8F2EB] border border-border-warm rounded-[5px] pt-[34px] px-8 pb-[30px] flex flex-col transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_22px_48px_-26px_rgba(20,28,46,0.4)] hover:border-t-green before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-t-green"
            >
              <div className="flex items-center justify-between mb-[18px]">
                <span className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-t-green">
                  Complete Series
                </span>
                <span className="font-display italic text-[30px] text-gold leading-none">
                  &#9733;
                </span>
              </div>
              <h3 className="font-display font-semibold text-[25px] leading-[1.2] text-navy mb-3.5">
                Enroll in the Foundation Series
              </h3>
              <p className="text-[14.5px] text-slate leading-[1.62] flex-grow">
                All five lectures, live on Zoom, every Wednesday at 8:00 PM IST.
                The series begins 15 July 2026. Register your interest using the
                inquiry form below.
              </p>
              <span className="mt-[18px] inline-flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-t-green self-start transition-all duration-200">
                Inquire now
                <span className="relative inline-block w-[22px] h-[1.5px] bg-t-green after:content-[''] after:absolute after:right-0 after:-top-[3px] after:w-[7px] after:h-[7px] after:border-t-[1.5px] after:border-r-[1.5px] after:border-t-green after:rotate-45" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="inquiry" className="bg-ivory  pb-[88px]">
        <RegistrationForm />
      </section>

      {/* WHY THIS COURSE EXISTS */}
      <section className="bg-ivory p pb-10">
        <div className="max-w-[900px] mx-auto px-10 border-l-[3px] border-t-green pl-9">
          <span className="font-mono text-[11px] font-medium tracking-[0.28em] uppercase text-t-green block mb-4">
            Why this course exists
          </span>
          <p className="font-display italic text-[clamp(10px,2vw,22px)] leading-[1.45] text-navy">
            For the doctor who feels like they are practising infertility in
            fragments. Who learned physiology a decade ago and has never
            formally returned to it. Who treats patients confidently enough,
            but quietly wonders if they are reading the cycle the way the best
            specialists do. Foundation exists for that doctor. Not to teach
            new information, but to rebuild the framework that everything else
            sits on.
          </p>
        </div>
      </section>

      {/* FOUND BODY: FULL CURRICULUM + NOW ENROLLING */}
      <section className="bg-ivory pt-[60px] pb-[100px]">
        <div className="max-w-[1180px] mx-auto px-10 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-10 md:gap-20 items-start">
          {/* Full Curriculum */}
          <div>
            <span className={`${eyebrow} block mb-3.5`}>Full Curriculum</span>
            <h3 className="font-display font-medium text-[clamp(24px,2.6vw,34px)] text-navy mb-3.5 leading-[1.15]">
              Five live lectures with Dr. Sunita Tandulwadkar.
            </h3>
            <p className="font-display italic text-[17px] text-gold-deep mb-8">
              What each lecture does for your practice.
            </p>

            {fullCurriculum.map((l, idx) => (
              <div
                key={l.num}
                className={`grid grid-cols-[60px_1fr] gap-6 py-[26px] ${
                  idx !== fullCurriculum.length - 1
                    ? "border-b border-border-warm"
                    : ""
                }`}
              >
                <div className="font-display font-medium text-[36px] text-t-green leading-none">
                  {l.num}
                </div>
                <div>
                  <h4 className="font-display font-medium text-[22px] text-navy mb-2 leading-[1.25]">
                    {l.title}
                  </h4>
                  <p className="text-[14.5px] leading-[1.6] text-slate">
                    {l.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Now enrolling card */}
          <aside className="relative bg-cream border border-border-warm p-[38px_34px] md:sticky md:top-[110px] h-fit before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-t-green">
            <span className="font-mono text-[11px] font-medium tracking-[0.28em] uppercase text-t-green block mb-3.5">
              Now enrolling
            </span>
            <h3 className="font-display font-medium text-[26px] text-navy mb-4 leading-[1.2]">
              Secure your seat in the inaugural batch.
            </h3>
            <p className="text-[14px] leading-[1.6] text-slate mb-[22px]">
              Join Dr. Sunita live for all five Foundation lectures. Limited
              seats to maintain Q&amp;A quality.
            </p>
            <div className="font-display font-medium text-[32px] text-navy mb-2">
              [ Price ]
            </div>
            <div className="text-[13px] text-slate mb-[26px]">
              Foundation Series &middot; Tier I access
            </div>
            <a
              href="#inquiry"
              className="w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-black text-gold-light hover:text-gold border border-navy hover:border-gold py-3 rounded-[2px] font-body font-medium text-sm tracking-[0.02em] transition-all duration-300 group mb-3"
            >
              Enroll Now
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#inquiry"
              className="w-full inline-flex items-center justify-center bg-transparent text-navy border border-navy py-3 rounded-[2px] font-body font-medium text-sm tracking-[0.02em] transition-colors duration-300 hover:bg-navy hover:text-ivory"
            >
              Ask a question first
            </a>
            <ul className="list-none mt-[26px] pt-[22px] border-t border-border-warm">
              {enrollPerks.map((p) => (
                <li
                  key={p}
                  className="py-1.5 pl-5 text-[13.5px] text-soft-black relative before:content-['+'] before:absolute before:left-0 before:text-t-green before:font-bold"
                >
                  {p}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
