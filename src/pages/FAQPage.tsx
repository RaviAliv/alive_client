import Accordion from "../components/Accordion";

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Who STAR is for",
    items: [
      { q: "Who is STAR Academy for?", a: "STAR Academy is designed for gynecologists, IVF clinicians, fellowship trainees, and doctors building or strengthening infertility practice. It is a doctor-to-doctor academic programme and is not a patient-facing course." },
      { q: "Is STAR only for IVF specialists?", a: "No. STAR is designed for any doctor working with, or wanting to work with, reproductive medicine patients. That includes general gynecologists expanding into infertility, IVF clinicians refining practice, and trainees building the discipline from the beginning." },
      { q: "Is this useful for doctors who already practise infertility?", a: "Yes. Many practising infertility doctors have never formally revisited the foundations since training. The Foundation Series offers that reset with depth. Advanced tiers go further into protocol-level practice refinement." },
      { q: "How do I know which tier is right for me?", a: "Start with Foundation if you are building or expanding infertility practice, or if you want a rigorous reset on fundamentals. Core suits doctors formalising first-line treatment workflow. Advanced is for IVF practitioners refining ART. Masterclass is for experienced doctors facing complex cases. If you are unsure, contact our team." },
    ],
  },
  {
    title: "Format and Delivery",
    items: [
      { q: "Are sessions live or pre-recorded?", a: "All sessions are conducted live on Zoom with real-time Q&A and direct interaction with Dr. Sunita Tandulwadkar." },
      { q: "Will recordings be available?", a: "Optional recording access may be offered for selected courses at a nominal additional fee. Exact details on duration and pricing are shared at enrolment." },
      { q: "Do I need to attend all sessions in a tier?", a: "Attendance is strongly encouraged for continuity. Recording access, where purchased, ensures you can revisit missed content. Certificate requirements include minimum attendance criteria shared at enrolment." },
      { q: "What language are sessions in?", a: "All STAR sessions are delivered in English." },
      { q: "Will cases be discussed?", a: "Yes. Every session includes case-based discussion and real clinical scenarios. Q&A welcomes case-specific questions from participants, where appropriate to the session topic." },
    ],
  },
  {
    title: "Enrolment and Payment",
    items: [
      { q: "How do I register?", a: "Enrolment is through the Foundation Series page on this website. Select the tier you want, complete the secure payment, and you receive confirmation by email. Access details are shared closer to the start date." },
      { q: "What if my payment does not go through?", a: "Contact our team directly via email or WhatsApp. We will help you complete the enrolment and confirm your seat." },
      { q: "Can I change my batch, date, or time?", a: "Each tier runs as a scheduled batch. If you need to transfer to a future batch, our team will help on a case-by-case basis, subject to availability." },
      { q: "Are refunds available?", a: "No. Course payments are one-time and non-refundable once processed. Recording access, where purchased, ensures continuity if a session cannot be attended live." },
      { q: "How will I know my seat is confirmed?", a: "You will receive an email confirmation within a few minutes of successful payment. Access details follow closer to the start date. If you do not receive a confirmation, contact our team immediately." },
    ],
  },
  {
    title: "Certificates and Assessment",
    items: [
      { q: "Is there a certificate?", a: "Yes. A certificate pathway is provided on successful completion of each tier. Completion criteria include attendance and, where applicable, a short assessment at the end of the tier." },
      { q: "Will the course have CME credits?", a: "CME accreditation is in process. Once confirmed, the accrediting body and credit allocation will be communicated to all enrolled participants and on this page." },
      { q: "What is the value of the certificate?", a: "The certificate confirms completion of a structured academic pathway by Dr. Sunita Tandulwadkar at STAR Academy. It is designed to support clinical credibility and CME evidence, not as a substitute for formal qualification." },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="relative pt-[100px] pb-[60px] bg-ivory border-b border-border-warm overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-[45%] before:h-full before:bg-[url('/images/ornament.webp')] before:bg-right-top before:bg-cover before:bg-no-repeat before:opacity-50 before:pointer-events-none">
        <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,4vw,80px)]">
          <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-5">
            FAQ
          </span>
          <h1 className="font-display font-medium text-[clamp(36px,4.5vw,64px)] leading-[1.05] text-navy mb-5 tracking-[-0.015em] max-w-[800px]">
            Questions, answered.
          </h1>
          <p className="text-[17px] leading-[1.6] text-slate max-w-[800px]">
            Everything doctors ask before enrolling. Organised by category.
          </p>
        </div>
      </section>

      <section className="py-[clamp(80px,10vw,140px)] bg-ivory">
        <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,80px)]">
          {groups.map((g) => (
            <div key={g.title} className="mb-14 last:mb-0">
              <h4 className="font-mono text-xs tracking-[0.22em] text-gold-deep uppercase pb-3 mb-2 border-b border-gold-deep">
                {g.title}
              </h4>
              <Accordion items={g.items} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
