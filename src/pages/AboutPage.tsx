const eyebrow =
  "inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-4";

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-[100px] pb-[60px] bg-ivory border-b border-border-warm overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-[45%] before:h-full before:bg-[url('/images/ornament.webp')] before:bg-right-top before:bg-cover before:bg-no-repeat before:opacity-50 before:pointer-events-none">
        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <span className={`${eyebrow} mb-5 block`}>About STAR Academy</span>
          <h1 className="font-display font-medium text-[clamp(36px,4.5vw,64px)] leading-[1.05] text-navy mb-5 tracking-[-0.015em] max-w-[800px]">
            A structured academic initiative in Indian reproductive medicine.
          </h1>
          <p className="text-[17px] leading-[1.6] text-slate max-w-[800px]">
            STAR Academy was founded to change how infertility and IVF are
            taught to doctors. A stepwise pathway, taught live by a pioneer,
            built for clinical judgment.
          </p>
        </div>
      </section>

      <section className="py-[clamp(80px,10vw,140px)] bg-ivory">
        <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,80px)]">
          {[
            {
              eb: "What STAR Stands For",
              h: "Sunita Tandulwadkar Academy of Reproduction.",
              body: [
                "STAR is named after its founder, Dr. Sunita Tandulwadkar. Each letter of the acronym represents a tier of the academic pathway she has built, from Foundation through Masterclass. The name reflects the philosophy: clinical growth is a progression, not an event.",
              ],
            },
            {
              eb: "Vision",
              h: "Translating pioneering experience into the future of reproductive education.",
              body: [
                "Infertility education today is experienced in fragments. Webinars cover isolated topics. Conference sessions offer glimpses without continuity. Treatment is often taught before the fundamentals that make treatment meaningful.",
                "STAR Academy was created to replace fragmented learning with a stepwise academic pathway. A progressive educational structure that moves from fundamentals to advanced IVF decision-making, taught directly by one of India's most respected pioneers in the field.",
              ],
            },
          ].map((sec, i) => (
            <section key={i} className="mb-20 last:mb-0">
              <span className={`${eyebrow} block`}>{sec.eb}</span>
              <h3 className="font-display font-medium text-[clamp(26px,3vw,38px)] text-navy mb-6 max-w-[24ch] leading-[1.15]">
                {sec.h}
              </h3>
              {sec.body.map((p, j) => (
                <p
                  key={j}
                  className="text-[17px] leading-[1.8] text-slate mb-[18px] max-w-[62ch]"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section className="mb-20">
            <span className={`${eyebrow} block`}>Educational Philosophy</span>
            <h3 className="font-display font-medium text-[clamp(26px,3vw,38px)] text-navy mb-6 max-w-[24ch] leading-[1.15]">
              Three principles that shape every lecture.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-[30px]">
              {[
                {
                  t: "Basics to Advanced",
                  d: "Every clinical decision rests on a biological foundation. STAR teaches the fundamentals first, then the treatment. Not the other way around.",
                },
                {
                  t: "Practical and Structured",
                  d: "Every lecture is built around the decisions a practising doctor actually has to make. Protocol sheets, not just theory. Real cases, not just slides.",
                },
                {
                  t: "Evidence Anchored",
                  d: "Reproductive medicine evolves quickly. STAR stays anchored in current evidence, transparent about uncertainty, and honest about what the data does and does not yet show.",
                },
              ].map((c) => (
                <div
                  key={c.t}
                  className="px-[26px] py-[30px] bg-cream border border-border-warm border-t-[3px] border-t-gold"
                >
                  <h4 className="font-display font-medium text-[22px] text-navy mb-3">
                    {c.t}
                  </h4>
                  <p className="text-[14.5px] leading-[1.65] text-slate">
                    {c.d}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {[
            {
              eb: "Who STAR Is For",
              h: "A doctor-to-doctor initiative.",
              body: [
                "STAR is designed exclusively for medical professionals. Gynecologists beginning or expanding infertility practice. IVF clinicians refining their protocols. Fellowship trainees in reproductive medicine. Doctors building serious infertility practice who want the reasoning behind the work.",
                "STAR is not a patient-facing programme. It does not replace consultations. It is a closed, clinical, academic space for doctors training doctors.",
              ],
            },
            {
              eb: "Long-term Roadmap",
              h: "From Foundation to Masterclass, over the next 18 months.",
              body: [
                "STAR Academy launches with the Foundation Series on 15 July 2026. Over the following year, Core, Advanced, and Masterclass tiers will roll out in sequence. Every tier is designed to stand on its own and to build the next. Together, they form the first structured, progressive academic pathway in Indian reproductive medicine.",
              ],
            },
          ].map((sec, i) => (
            <section key={i} className="mb-20 last:mb-0">
              <span className={`${eyebrow} block`}>{sec.eb}</span>
              <h3 className="font-display font-medium text-[clamp(26px,3vw,38px)] text-navy mb-6 max-w-[24ch] leading-[1.15]">
                {sec.h}
              </h3>
              {sec.body.map((p, j) => (
                <p
                  key={j}
                  className="text-[17px] leading-[1.8] text-slate mb-[18px] max-w-[62ch]"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
