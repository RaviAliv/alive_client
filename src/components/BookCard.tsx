type Props = {
  large?: boolean;
};

export default function BookCard({ large }: Props) {
  return (
    <div
      className={`relative  overflow-hidden
      ]
      flex flex-col
      ${large ? "w-full max-w-[480px]" : "w-full max-w-[340px]"}`}
    >
      {/* Image — fully visible, no crop. Aspect ratio matches source so it scales without cropping on any screen. */}
      <div
        className={`relative z-[1] w-full
          ${large ? "aspect-[4/4]" : "h-[240px]"}
          bg-[url('/images/book-card-image.webp')]
          bg-center bg-contain bg-no-repeat `}
      />


      {/* Caption */}
      {/* <div className="relative z-[1] text-center px-5 pt-3.5 pb-3 border-t border-[rgba(197,164,109,0.25)]">
        <span className="block mb-1 font-mono text-[10px] font-medium tracking-[0.28em] uppercase text-gold">
          The Faculty
        </span>
        <div className="font-display italic text-ivory text-[19px] leading-snug">
          Dr. Sunita Tandulwadkar
        </div>
      </div> */}
    </div>
  );
}
