type Props = {
  large?: boolean;
};

export default function BookCard({ large }: Props) {
  return (
    <div
      className={`relative bg-charcoal border border-gold p-[22px] aspect-[3/4.2] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] before:content-[''] before:absolute before:inset-[10px] before:border before:border-[rgba(197,164,109,0.4)] before:pointer-events-none ${
        large ? "max-w-[400px] aspect-[3/4.3]" : "max-w-[360px]"
      }`}
    >
      <div className="relative z-[1] flex items-center gap-3 mb-3">
        <img
          src="/images/logo.webp"
          alt="STAR"
          className="w-9 h-9 bg-white p-[3px] border border-gold"
        />
        <div>
          <div className="font-display font-medium text-[13px] text-ivory leading-[1.1]">
            Sunita Tandulwadkar
          </div>
          <div className="font-mono text-[9px] tracking-[0.18em] text-gold uppercase mt-0.5">
            Academy of Reproduction
          </div>
        </div>
      </div>

      <div className="relative z-[1] flex-1 my-2 mx-0 mb-4 min-h-[240px] h-[70%] bg-[url('/images/book-card-image.webp')] bg-center bg-contain bg-no-repeat" />

      <div className="relative z-[1] text-center pt-4 border-t border-[rgba(197,164,109,0.25)]">
        <span className="block mb-1.5 font-mono text-[9.5px] font-medium tracking-[0.26em] uppercase text-gold">
          The Faculty
        </span>
        <div className="font-display italic text-ivory text-base">
          Dr. Sunita Tandulwadkar
        </div>
      </div>
    </div>
  );
}
