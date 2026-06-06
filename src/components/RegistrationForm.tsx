import { ENROLL_URL } from "../lib/config";

type Props = {
  hideHeading?:    boolean;
  hideSubHeading?: boolean;
  noPadding?:      boolean;
};

export default function RegistrationForm({
  hideHeading    = false,
  hideSubHeading = false,
  noPadding      = false,
}: Props) {
  return (
    <section className={`bg-transparent${noPadding ? "" : " px-[clamp(20px,4vw,80px)]"}`}>
      <div className={noPadding ? "w-full" : "max-w-[520px] mx-auto"}>

        {!hideHeading && (
          <div className="text-center mb-6">
            <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-2">
              Enroll Now
            </span>
            <h2 className="font-display font-medium text-[clamp(22px,3vw,32px)] leading-[1.1] text-navy tracking-[-0.015em]">
              Start your learning journey with expert-led courses
            </h2>
            <p className="text-[13px] text-slate mt-2 max-w-[440px] mx-auto leading-[1.55]">
              Share a few details and we'll get in touch shortly.
            </p>
          </div>
        )}

        {!hideSubHeading && !hideHeading && (
          <p className="text-center text-sm text-slate mb-5">
            Click below to reserve your spot.
          </p>
        )}

        <div className="flex justify-center">
          <a
            href={ENROLL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-black text-gold-light hover:text-gold border border-navy hover:border-gold py-3 px-10 rounded-[2px] font-body font-medium text-sm tracking-[0.02em] transition-all duration-300 group"
          >
            Reserve Your Seat
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
