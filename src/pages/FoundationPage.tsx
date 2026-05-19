export default function FoundationPage() {
  return (
    <>
      <section className="relative bg-t-green text-ivory pt-[100px] pb-20 overflow-hidden after:content-[''] after:absolute after:-top-[20%] after:-right-[5%] after:w-[500px] after:h-[500px] after:bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_transparent_70%)]">
        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="max-w-[820px]">
            <span className="inline-block font-mono text-[11px] tracking-[0.25em] py-1.5 px-3 border border-white/45 mb-7 uppercase">
              Tier I &middot; Foundation
            </span>
            <h1 className="font-display font-medium text-[clamp(44px,5.5vw,80px)] leading-[1.02] mb-6 tracking-[-0.015em]">
              The Foundation Series.
            </h1>
            <p className="font-display italic text-[clamp(18px,1.8vw,24px)] text-white/90 max-w-[50ch]">
              Mastering the absolute basics of reproductive medicine.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy text-ivory py-[26px]">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-2 md:grid-cols-5 gap-[18px] md:gap-8">
          {[
            { l: "Date", v: "Commences 15 July 2026" },
            { l: "Cadence", v: "Every Wednesday" },
            { l: "Time", v: "8:00 PM IST" },
            { l: "Format", v: "Live on Zoom" },
            { l: "Access", v: "One email, one entry" },
          ].map((m) => (
            <div key={m.l}>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-gold mb-1.5 uppercase">
                {m.l}
              </span>
              <strong className="font-display font-medium text-[17px] text-ivory">
                {m.v}
              </strong>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ivory pt-20 pb-10">
        <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,80px)] border-l-[3px] border-t-green pl-9 md:pl-9">
          <span className="block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-t-green mb-4">
            Why this course exists
          </span>
          <p className="font-display italic text-[clamp(20px,2vw,28px)] leading-[1.45] text-navy">
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

      <section className="pt-[60px] pb-[clamp(80px,10vw,140px)] bg-ivory">
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-[50px] md:gap-20 items-start">
          <div>
            <span className="block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-3.5">
              Full Curriculum
            </span>
            <h3 className="font-display font-medium text-[clamp(24px,2.6vw,34px)] text-navy mb-3.5">
              Five live lectures with Dr. Sunita Tandulwadkar.
            </h3>
            <p className="font-display italic text-[17px] text-gold-deep mb-8">
              What each lecture does for your practice.
            </p>

            {[
              { num: "01", title: "The Complete Arc of the Ovarian Cycle", body: "The full story of how an oocyte matures over 300 days, from the first hormonal signal through to ovulation. Where every clinical decision actually sits on the biology, and what you gain by seeing the whole arc instead of the single month in front of you." },
              { num: "02", title: "Ovulation, Triggering, and Timing", body: "From molecular dynamics to clinical application. Why ovulation works the way it does, when to trigger, what makes a trigger succeed or fail, and how to adapt when the textbook playbook breaks down in a real patient." },
              { num: "03", title: "Reading the Luteal Phase as a Clinical Signal", body: "The corpus luteum as a diagnostic compass, not a checkbox. Current understanding of luteal phase support. How to recognise what a luteal phase is telling you, and how to support it intelligently in the right patient." },
              { num: "04", title: "The Molecular Dialogue of Implantation", body: "Implantation is not a timing problem. It is a conversation between the embryo and the endometrium. Understand how endometrial receptivity and embryonic signalling actually work, and why this changes the way you think about implantation failure." },
              { num: "05", title: "The Precision Diagnostic Road Map", body: "How to evaluate a fertility patient with precision, not breadth. What to test, what to skip, and how to interpret every result in the full clinical context. The diagnostic philosophy that separates efficient practice from exhaustive over-investigation." },
            ].map((l) => (
              <div
                key={l.num}
                className="grid grid-cols-[60px_1fr] gap-6 py-[26px] border-b border-border-warm last:border-b-0"
              >
                <div className="font-display font-medium text-4xl text-t-green leading-none">
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

          <aside className="relative bg-cream border border-border-warm py-[38px] px-[34px] md:sticky md:top-[110px] h-fit before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-t-green">
            <span className="block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-t-green mb-3.5">
              Now enrolling
            </span>
            <h3 className="font-display font-medium text-[26px] text-navy mb-4 leading-[1.2]">
              Secure your seat in the inaugural batch.
            </h3>
            <p className="text-sm leading-[1.6] text-slate mb-[22px]">
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
              href="#"
              className="w-full justify-center mb-3 inline-flex items-center gap-2.5 px-7 py-4 font-body font-medium text-[15px] tracking-[0.02em] border border-navy rounded-[2px] bg-navy text-gold-light transition-all duration-300 hover:bg-black hover:border-gold hover:text-gold group"
            >
              Enrol Now
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#"
              className="w-full justify-center inline-flex items-center gap-2.5 px-7 py-4 font-body font-medium text-[15px] tracking-[0.02em] border border-navy rounded-[2px] bg-transparent text-navy transition-all duration-300 hover:bg-navy hover:text-gold-light"
            >
              Ask a question first
            </a>
            <ul className="list-none mt-[26px] pt-[22px] border-t border-border-warm">
              {[
                "Five live lectures with Dr. Sunita",
                "Interactive Q&A every session",
                "Clinical protocol sheets",
                "Certificate on completion",
                "One email, one entry access",
              ].map((item) => (
                <li
                  key={item}
                  className="relative py-1.5 text-[13.5px] text-soft-black pl-5 before:content-['+'] before:absolute before:left-0 before:text-t-green before:font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
