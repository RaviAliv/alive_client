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

  const divider = dark ? "border-white/8" : "border-border-warm";
  const questionCls = dark
    ? "text-ivory"
    : "text-navy";
  const answerCls = dark
    ? "text-ivory/55"
    : "text-slate";

  return (
    <div className="max-w-[860px] mx-auto px-[clamp(20px,4vw,80px)]">
      {items.map((item, i) => {
        const isOpen = i === openIdx;
        return (
          <div
            key={i}
            className={`border-b ${divider} first:border-t first:${divider}`}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`w-full bg-transparent border-0 py-6 flex justify-between items-center cursor-pointer text-left font-display font-medium text-[clamp(17px,1.5vw,21px)] leading-[1.3] gap-6 ${questionCls}`}
            >
              {item.q}
              <span
                aria-hidden="true"
                className={`relative w-6 h-6 flex-shrink-0 border transition-[transform,border-color] duration-300 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[10px] before:h-px before:bg-gold after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-px after:h-[10px] after:bg-gold ${
                  isOpen ? "rotate-45 border-gold" : "border-gold/50"
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-[max-height,padding] duration-[400ms] ease-in-out ${
                isOpen ? "max-h-[500px] pb-[22px]" : "max-h-0"
              }`}
            >
              {typeof item.a === "string" ? (
                <p className={`text-[15px] leading-[1.7] max-w-[58ch] ${answerCls}`}>
                  {item.a}
                </p>
              ) : (
                item.a
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
