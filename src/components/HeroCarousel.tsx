import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/images/heroImg1.webp",
  "/images/heroImg2.webp",
  "/images/heroImg3.webp",
];

const SLIDE_INTERVAL_MS = 5000;
const TRANSITION_MS = 800;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const slides = [...HERO_IMAGES, HERO_IMAGES[0]];

  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(true);
      setIndex((prev) => prev + 1);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (index === HERO_IMAGES.length) {
      const id = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, TRANSITION_MS);
      return () => clearTimeout(id);
    }
  }, [index]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="flex h-full"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(index * 100) / slides.length}%)`,
          transition: animate
            ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
            : "none",
        }}
      >
        {slides.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="h-full shrink-0"
            style={{ width: `${100 / slides.length}%` }}
          >
            <img
              src={src}
              alt={`Hero slide ${(i % HERO_IMAGES.length) + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
