type Props = {
  large?: boolean;
};

export default function BookCard({ large }: Props) {
  return (
    <div
      className={`relative overflow-hidden flex flex-col
        bg-[#05080F]
        shadow-[0_0_70px_rgba(197,164,109,0.22),0_0_28px_rgba(197,164,109,0.12),inset_0_0_60px_rgba(197,164,109,0.04)]
        ${large ? "w-full max-w-[480px]" : "w-full max-w-[340px]"}`}
    >
      {/* ── Layer 1: Wide ambient gold halo (center-upper) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none
          bg-[radial-gradient(ellipse_80%_65%_at_50%_42%,rgba(197,164,109,0.24)_0%,rgba(168,135,79,0.08)_50%,transparent_75%)]"
      />

      {/* ── Layer 2: Warm floor / pedestal glow (bottom-up) ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[50%] z-0 pointer-events-none
          bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(197,164,109,0.38)_0%,rgba(168,135,79,0.14)_42%,transparent_68%)]"
      />

      {/* ── Layer 3: Bright core spot (book centre) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none
          bg-[radial-gradient(ellipse_38%_28%_at_50%_38%,rgba(245,210,130,0.16)_0%,transparent_20%)]"
      />

      {/* ── Layer 4: Left edge warm rim light ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none
          bg-[radial-gradient(ellipse_25%_55%_at_0%_50%,rgba(197,164,109,0.10)_0%,transparent_20%)]"
      />

      {/* ── Book image ── */}
      <div
        className={`relative z-[1] w-full
          ${large ? "aspect-[4/5]" : "h-[240px]"}
          bg-[url('/images/book-card-image.webp')]
          bg-center bg-contain bg-no-repeat`}
      />

      {/* ── Layer 5: Screen-blend shimmer overlay on image ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen
          bg-[radial-gradient(ellipse_55%_45%_at_50%_48%,rgba(197,164,109,0.07)_0%,transparent_62%)]"
      />

      {/* ── Layer 6: Gold top-edge reflection bar ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-[15%] right-[15%] h-px z-[3] pointer-events-none
          bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      {/* ── Layer 7: Gold bottom-edge glow bar ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[10%] right-[10%] h-px z-[3] pointer-events-none
          bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
    </div>
  );
}
