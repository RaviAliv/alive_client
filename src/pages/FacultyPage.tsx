import BookCard from "../components/BookCard";

export default function FacultyPage() {
  return (
    <>
      <section className="relative bg-black bg-[url('/images/faculty-bg.webp')] bg-center bg-cover bg-no-repeat pt-[100px] pb-20 text-ivory after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-[rgba(10,14,22,0.45)] after:to-[rgba(10,14,22,0.85)]">
        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-[0.9fr_1fr] gap-[40px] md:gap-20 items-center">
          <BookCard large />
          <div>
            <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold mb-6">
              The Faculty
            </span>
            <h1 className="font-display font-medium text-[clamp(34px,4.5vw,56px)] leading-[1.05] text-ivory mb-6">
              The Pioneer of Indian Endoscopy and Reproductive Medicine.
            </h1>
            <p className="text-[17px] leading-[1.7] text-gold-light opacity-90 max-w-[56ch]">
              Dr. Sunita Tandulwadkar has been practising, teaching, and
              shaping reproductive medicine in India for more than 35 years.
              She founded and leads STAR Academy to bring that experience
              directly to the next generation of doctors, in a structured,
              progressive, live format.
            </p>
          </div>
        </div>
      </section>

      <section className="py-[clamp(80px,10vw,140px)] bg-ivory">
        <div className="max-w-[1000px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="mb-20 last:mb-0">
            <span className="block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-4">
              Practice and Reputation
            </span>
            <h3 className="font-display font-medium text-[clamp(24px,2.6vw,34px)] text-navy mb-7 max-w-[24ch] leading-[1.15]">
              Three decades of shaping Indian IVF and endoscopic surgery.
            </h3>
            <p className="text-base leading-[1.8] text-slate mb-[18px] max-w-[62ch]">
              Dr. Sunita Tandulwadkar is Head of the Department of Obstetrics
              and Gynaecology, and Chief of the IVF and Endoscopy Centre at
              Ruby Hall Clinic, Pune, one of India's leading tertiary referral
              hospitals. She is the Founder and Medical Director of Solo
              Clinic IVF, and Co-Founder and Medical Director of ALIV
              Regenerative Wellness.
            </p>
            <p className="text-base leading-[1.8] text-slate mb-[18px] max-w-[62ch]">
              In 1994, she became India's first female gynecological
              endoscopic surgeon, performing advanced minimal-access
              procedures at a time when such work was rare in the country.
              Since then, she has been at the forefront of Indian infertility
              care, surgical innovation, and regenerative medicine.
            </p>
          </div>

          <div className="mb-20 last:mb-0">
            <span className="block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-4">
              Credentials
            </span>
            <h3 className="font-display font-medium text-[clamp(24px,2.6vw,34px)] text-navy mb-7 max-w-[24ch] leading-[1.15]">
              Presidencies, firsts, and academic output.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-9">
              {[
                {
                  h: "Presidencies",
                  items: [
                    "President, ISAR 2026 to 2028",
                    "President, FOGSI 2025",
                    "President, PHOXI 2025",
                    "Past President, IAGE",
                  ],
                },
                {
                  h: "Clinical Firsts",
                  items: [
                    "1994. India's first female gynecological endoscopic surgeon",
                    "India's first stem cell application in regenerative medicine",
                    "World's first successful stem cell application at age 45",
                  ],
                },
                {
                  h: "Academic Output",
                  items: [
                    "39 books authored",
                    "106 peer-reviewed publications",
                    "400+ invited faculty engagements, national and international",
                  ],
                },
                {
                  h: "Institutional Leadership",
                  items: [
                    "Head, Dept. of OBGYN, Ruby Hall Clinic, Pune",
                    "Chief, IVF and Endoscopy Centre, Ruby Hall Clinic",
                    "Founder and Medical Director, Solo Clinic IVF",
                    "Co-Founder and Medical Director, ALIV",
                  ],
                },
              ].map((card) => (
                <div
                  key={card.h}
                  className="relative border border-border-warm p-7 bg-cream before:content-[''] before:absolute before:top-0 before:left-0 before:w-8 before:h-[2px] before:bg-gold"
                >
                  <h4 className="font-mono text-[11px] tracking-[0.2em] text-gold-deep uppercase mb-[18px]">
                    {card.h}
                  </h4>
                  <ul className="list-none">
                    {card.items.map((item, i) => (
                      <li
                        key={i}
                        className="py-2 text-sm text-soft-black border-b border-[rgba(216,208,192,0.6)] last:border-b-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20 last:mb-0">
            <span className="block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-4">
              Teaching Philosophy
            </span>
            <h3 className="font-display font-medium text-[clamp(24px,2.6vw,34px)] text-navy mb-7 max-w-[24ch] leading-[1.15]">
              Clinical judgment, not content consumption.
            </h3>
            <p className="text-base leading-[1.8] text-slate mb-[18px] max-w-[62ch]">
              "Doctors do not need more lectures. They need a structured way
              to build the clinical judgment that actually changes outcomes.
              STAR Academy exists because the way infertility is taught today,
              in fragments and webinars, produces familiarity without depth.
              My goal is to teach the way reproductive medicine is actually
              practised: progressively, connectedly, and honestly."
            </p>
            <p className="text-base leading-[1.8] text-slate mb-[18px] max-w-[62ch]">
              Her teaching style is clinical first, evidence-anchored, and
              built around the specific decisions a practising doctor has to
              make in a real consultation. Not abstract theory. Not textbook
              recitation. The thinking behind the work.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
