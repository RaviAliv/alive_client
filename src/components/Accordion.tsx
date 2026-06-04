import { useState, type ReactNode } from "react";

type AccordionItem = {
  q: string;
  a: ReactNode;
};

type Props = {
  items: AccordionItem[];
  defaultOpen?: number;
  dark?: boolean;
};

export default function Accordion({ items, defaultOpen = -1, dark = false }: Props) {
  const [openIdx, setOpenIdx] = useState<number>(defaultOpen);

  return (
    <div className="max-w-[860px] mx-auto px-[clamp(20px,4vw,80px)]">
      {items.map((item, i) => {
        const isOpen = i === openIdx;

        return (
          <div
            key={i}
            className={`
              relative border-b transition-colors duration-300
              ${dark ? "border-white/8" : "border-border-warm"}
              ${i === 0 ? (dark ? "border-t border-white/8" : "border-t border-border-warm") : ""}
            `}
          >
            {/* Gold left accent bar — visible when open */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-[2.5px] bg-gold transition-all duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Question button */}
            <button
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`
                w-full border-0 py-6 pl-5 pr-5 flex justify-between items-center
                cursor-pointer text-left gap-6 transition-colors duration-200
                font-display font-medium text-[clamp(16px,1.5vw,20px)] leading-[1.35]
                ${dark
                  ? `${isOpen ? "text-ivory" : "text-ivory/75"} hover:text-ivory`
                  : `${isOpen ? "text-navy" : "text-navy/80"} hover:text-navy`
                }
                ${dark ? "bg-transparent hover:bg-white/[0.025]" : "bg-transparent hover:bg-black/[0.02]"}
              `}
            >
              {item.q}

              {/* Icon — circle with +/– */}
              <span
                aria-hidden="true"
                className={`
                  relative w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center
                  border transition-all duration-300
                  ${isOpen
                    ? "border-gold bg-gold/10 rotate-45"
                    : dark
                      ? "border-white/20 bg-transparent"
                      : "border-border-warm bg-transparent"
                  }
                `}
              >
                {/* Horizontal bar */}
                <span className={`absolute w-[10px] h-px transition-colors duration-300 ${isOpen ? "bg-gold" : dark ? "bg-ivory/60" : "bg-navy/60"}`} />
                {/* Vertical bar */}
                <span className={`absolute w-px h-[10px] transition-all duration-300 ${isOpen ? "bg-gold opacity-0" : dark ? "bg-ivory/60" : "bg-navy/60"}`} />
              </span>
            </button>

            {/* Answer panel */}
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-[450ms] ease-in-out ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-5 pr-14 pb-7">
                {typeof item.a === "string" ? (
                  <p className={`text-[15px] leading-[1.75] max-w-[60ch] ${dark ? "text-ivory/50" : "text-slate"}`}>
                    {item.a}
                  </p>
                ) : (
                  item.a
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
