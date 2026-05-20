import { useState, type FormEvent } from "react";

const COURSES = [
  { value: "all", label: "All Courses" },
  { value: "foundation", label: "Foundation Series" },
  { value: "core", label: "Core Series" },
  { value: "advanced", label: "Advanced Series" },
  { value: "masterclass", label: "Masterclass Series" },
];

const ROLES = [
  { value: "mbbs", label: "MBBS Student" },
  { value: "md", label: "MD / DGO" },
  { value: "dnb", label: "DNB" },
  { value: "gynecologist", label: "Gynecologist" },
  { value: "ivf", label: "IVF Specialist" },
  { value: "fellow", label: "Fellow / Resident" },
  { value: "other", label: "Other" },
];

export default function RegistrationForm() {
  const [course, setCourse] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="bg-ivory  px-[clamp(20px,4vw,80px)]">
      <div className="max-w-[1080px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-4">
            Why STAR Academy Exists
          </span>
          <h2 className="font-display font-medium text-[clamp(28px,3.5vw,44px)] leading-[1.1] text-navy tracking-[-0.015em] max-w-[720px] mx-auto">
            Start your learning journey with expert-led courses.
          </h2>
          <p className="text-[15px] text-slate mt-4 max-w-[560px] mx-auto leading-[1.6]">
            Share a few details and we'll get in touch about the STAR pathway
            tier that fits you.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_-20px_rgba(30,42,68,0.18)] border border-border-warm overflow-hidden grid grid-cols-1 md:grid-cols-5">
          {/* Left Side */}
          <div className="relative bg-navy text-white p-8 hidden md:flex flex-col justify-center md:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Course Enquiry"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="relative z-10">
              <span className="inline-block font-mono text-[10px] tracking-[0.26em] uppercase text-gold-light mb-3">
                Course Enquiry
              </span>
              <h3 className="font-display text-2xl font-medium mb-3 leading-tight">
                A stepwise curriculum in infertility and IVF.
              </h3>
              <p className="text-sm leading-relaxed mb-5 text-white/85">
                Foundation, Core, Advanced &amp; Masterclass — taught live by
                Dr. Sunita Tandulwadkar.
              </p>

              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Four-tier STAR pathway
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Live sessions on Zoom
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Personalised guidance
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="p-8 md:p-10 md:col-span-3">
            <h3 className="font-display text-2xl font-medium text-navy mb-1">
              Enquiry Form
            </h3>
            <p className="text-[13px] text-slate mb-6">
              Fields marked <span className="text-red-500">*</span> are required.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-[13px] text-gray-700 font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-[13px] text-gray-700 font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    className="w-full px-3.5 py-2.5 text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-[13px] text-gray-700 font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-[13px] text-gray-700 font-medium">
                    You Are A <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-border-warm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-[13px] text-gray-700 font-medium">
                    Course of Interest
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-border-warm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
                  >
                    <option value="" disabled>
                      Select a course
                    </option>
                    {COURSES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-[13px] text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your background or questions"
                  className="w-full px-3.5 py-2.5 text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-black text-gold-light hover:text-gold border border-navy hover:border-gold py-3 rounded-[2px] font-body font-medium text-sm tracking-[0.02em] transition-all duration-300 group"
              >
                Submit Enquiry
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
