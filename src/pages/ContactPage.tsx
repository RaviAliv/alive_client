import { useState } from "react";

const inputCls =
  "w-full px-[15px] py-[13px] bg-white border border-border-warm font-body text-sm text-navy transition-colors focus:outline-none focus:border-gold";
const labelCls =
  "block font-mono text-[10.5px] tracking-[0.2em] text-gold-deep uppercase mb-2";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative pt-[100px] pb-[60px] bg-ivory border-b border-border-warm overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-[45%] before:h-full before:bg-[url('/images/ornament.webp')] before:bg-right-top before:bg-cover before:bg-no-repeat before:opacity-50 before:pointer-events-none">
        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-5">
            Contact
          </span>
          <h1 className="font-display font-medium text-[clamp(36px,4.5vw,64px)] leading-[1.05] text-navy mb-5 tracking-[-0.015em] max-w-[800px]">
            Talk to the STAR Academy team.
          </h1>
          <p className="text-[17px] leading-[1.6] text-slate max-w-[800px]">
            Questions about enrolment, the curriculum, or institutional
            partnerships. We respond within one working day.
          </p>
        </div>
      </section>

      <section className="py-[clamp(80px,10vw,140px)] bg-ivory">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-2 gap-[50px] md:gap-[70px]">
          <div>
            <h3 className="font-display font-medium text-[clamp(26px,2.8vw,34px)] text-navy mb-[18px]">
              Get in touch.
            </h3>
            <p className="text-base text-slate leading-[1.7] mb-9 max-w-[40ch]">
              Whether you are enrolling, evaluating the curriculum for your
              institution, or exploring a speaking engagement, our team is
              happy to help.
            </p>

            {[
              {
                icon: "@",
                h: "Email",
                primary: "[ email placeholder ]",
                muted: "For enrolment, academic queries, and general contact.",
              },
              {
                icon: "W",
                h: "WhatsApp",
                primary: "[ phone placeholder ]",
                muted: "Fastest response during India business hours.",
              },
              {
                icon: "P",
                h: "Phone",
                primary: "[ phone placeholder ]",
                muted: "Monday to Saturday, 10 AM to 6 PM IST.",
              },
              {
                icon: "L",
                h: "Location",
                primary: "Pune, Maharashtra, India",
                muted:
                  "All courses are delivered online, nationally and internationally.",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="grid grid-cols-[40px_1fr] gap-[18px] mb-[22px] pb-[22px] border-b border-border-warm last:border-b-0"
              >
                <div className="w-10 h-10 bg-navy text-gold flex items-center justify-center text-[15px] font-mono">
                  {m.icon}
                </div>
                <div>
                  <h5 className="font-mono text-[11px] tracking-[0.2em] text-gold-deep uppercase mb-1.5">
                    {m.h}
                  </h5>
                  <p className="text-[15px] text-navy leading-[1.4]">
                    {m.primary}
                  </p>
                  <p className="text-[13px] text-slate leading-[1.4]">
                    {m.muted}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="bg-cream border border-border-warm px-9 py-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <h3 className="font-display font-medium text-[26px] text-navy mb-[26px]">
              Send a message.
            </h3>

            <div className="mb-[18px]">
              <label className={labelCls}>Full Name</label>
              <input
                type="text"
                placeholder="Dr. [your name]"
                required
                className={inputCls}
              />
            </div>
            <div className="mb-[18px]">
              <label className={labelCls}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                className={inputCls}
              />
            </div>
            <div className="mb-[18px]">
              <label className={labelCls}>Phone (optional)</label>
              <input type="tel" placeholder="+91" className={inputCls} />
            </div>
            <div className="mb-[18px]">
              <label className={labelCls}>Inquiry Type</label>
              <select
                defaultValue="Foundation Series enrolment"
                className={inputCls}
              >
                <option>Foundation Series enrolment</option>
                <option>Curriculum or academic question</option>
                <option>Institutional partnership</option>
                <option>Speaking engagement</option>
                <option>General query</option>
              </select>
            </div>
            <div className="mb-[18px]">
              <label className={labelCls}>Message</label>
              <textarea
                placeholder="Tell us what you are looking for..."
                required
                className={`${inputCls} resize-y min-h-[110px]`}
              />
            </div>

            <button
              type="submit"
              className="w-full justify-center inline-flex items-center gap-2.5 px-7 py-4 font-body font-medium text-[15px] tracking-[0.02em] border border-navy rounded-[2px] cursor-pointer transition-all duration-300 bg-navy text-gold-light hover:bg-black hover:border-gold hover:text-gold group"
            >
              {submitted ? "Message sent" : "Send Message"}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
