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
    <section className="bg-transparent px-[clamp(20px,4vw,80px)]">
      <div className="max-w-[670px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-6">
          <span className="inline-block font-mono text-[11px] font-medium tracking-[0.26em] uppercase text-gold-deep mb-3">
            Why STAR Academy Exists
          </span>
          <h2 className="font-display font-medium text-[clamp(24px,3vw,34px)] leading-[1.1] text-navy tracking-[-0.015em] max-w-[820px] ">
            Start your learning journey with expert-led courses.
          </h2>
          <p className="text-[13px] text-slate mt-3 max-w-[520px] mx-auto leading-[1.55]">
            Share a few details and we'll get in touch about the STAR pathway
            tier that fits you.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_-20px_rgba(30,42,68,0.18)] border border-border-warm overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="font-display text-center text-2xl font-medium text-bold text-navy mb-7">
              Enquiry Form
            </h3>
            

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1.5 text-[13px] text-gray-700 font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
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
                    className="w-full px-3 py-2 text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
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
                  className="w-full px-3 py-2 text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1.5 text-[13px] text-gray-700 font-medium">
                    You Are A <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-border-warm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
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
                    className="w-full px-3 py-2 text-sm border border-border-warm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition"
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
                  rows={2}
                  placeholder="Tell us about your background or questions"
                  className="w-full px-3 py-2 text-sm border border-border-warm rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-black text-gold-light hover:text-gold border border-navy hover:border-gold py-2.5 rounded-[2px] font-body font-medium text-sm tracking-[0.02em] transition-all duration-300 group cursor-pointer"
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
