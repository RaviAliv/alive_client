import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gold-light pt-20 pb-[30px] relative">
      <div className="max-w-[1280px] mx-auto mb-[50px] px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] gap-9 md:gap-[50px]">
        <div>
          <div className="flex items-center gap-3 mb-[18px]">
            <img
              src="/images/logo.webp"
              alt="STAR logo"
              className="w-11 h-11 bg-white p-1 border border-gold"
            />
            <span className="font-display text-[15px] text-gold-light leading-[1.2]">
              Sunita Tandulwadkar
              <br />
              <small className="text-[10px] tracking-[0.18em] text-gold uppercase">
                Academy of Reproduction
              </small>
            </span>
          </div>
          <p className="font-display italic text-sm text-gold max-w-[26ch] leading-[1.5]">
            A Stepwise Learning Platform in Infertility and IVF.
          </p>
        </div>

        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-[18px]">
            Courses
          </h5>
          <ul className="list-none">
            {[
              { to: "/foundation", label: "Foundation Series" },
              { to: "/courses", label: "Core (coming soon)" },
              { to: "/courses", label: "Advanced (coming soon)" },
              { to: "/courses", label: "Masterclass (coming soon)" },
            ].map((l, i) => (
              <li key={i} className="mb-2.5">
                <Link
                  to={l.to}
                  className="text-sm text-gold-light opacity-75 transition-opacity duration-200 hover:opacity-100 hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-[18px]">
            Academy
          </h5>
          <ul className="list-none">
            {[
              { to: "/about", label: "About STAR" },
              { to: "/faculty", label: "Faculty" },
              { to: "/faq", label: "FAQ" },
              { to: "/contact", label: "Contact" },
            ].map((l, i) => (
              <li key={i} className="mb-2.5">
                <Link
                  to={l.to}
                  className="text-sm text-gold-light opacity-75 transition-opacity duration-200 hover:opacity-100 hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-[18px]">
            Legal
          </h5>
          <ul className="list-none">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
              (label) => (
                <li key={label} className="mb-2.5">
                  <a
                    href="#"
                    className="text-sm text-gold-light opacity-75 transition-opacity duration-200 hover:opacity-100 hover:text-gold"
                  >
                    {label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-[18px]">
            Stay updated
          </h5>
          <p className="text-sm leading-[1.5] text-gold-light opacity-75 mb-4">
            Next-batch announcements and upcoming tier launches.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Newsletter signup placeholder");
            }}
            className="flex mb-[18px]"
          >
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="flex-1 bg-transparent border border-gold-deep border-r-0 px-3.5 py-2.5 text-ivory font-body text-[13px] focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-gold text-navy border border-gold px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase font-medium cursor-pointer transition-colors duration-200 hover:bg-gold-light"
            >
              Join
            </button>
          </form>
          <div className="flex gap-2.5">
            {[
              { label: "in", aria: "LinkedIn" },
              { label: "ig", aria: "Instagram" },
              { label: "yt", aria: "YouTube" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.aria}
                className="w-9 h-9 border border-gold-deep flex items-center justify-center text-gold text-[13px] transition-colors duration-200 hover:bg-gold hover:text-navy"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-[30px] px-[clamp(20px,4vw,80px)] border-t border-[rgba(197,164,109,0.15)] flex justify-between flex-wrap gap-[18px] font-mono text-[11px] tracking-[0.12em] text-gold-light opacity-60 uppercase">
        <span>(c) 2026 Sunita Tandulwadkar Academy of Reproduction</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
