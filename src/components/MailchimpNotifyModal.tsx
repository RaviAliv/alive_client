import { useState, useEffect, useRef } from "react";

const API = "/api/newsletter/waitlist";

type Status = "idle" | "loading" | "success" | "error";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accentHex: string;
  courseLabel?: string;
  courseSlug?: string;
}

export default function MailchimpNotifyModal({
  isOpen,
  onClose,
  accentHex,
  courseLabel = "Core",
  courseSlug = "core",
}: Props) {
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(""); setEmail(""); setStatus("idle"); setErrMsg("");
      setTimeout(() => emailRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrMsg("");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), course: courseSlug }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.72)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-sm"
        style={{ background: "#111", border: `1px solid ${accentHex}55` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[3px] w-full rounded-t-sm" style={{ background: accentHex }} />

        <div className="p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors text-xl leading-none"
          >
            ✕
          </button>

          {status === "success" ? (
            <div className="text-center py-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
                style={{ background: `${accentHex}22`, border: `1px solid ${accentHex}66` }}
              >
                ✓
              </div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase mb-2" style={{ color: accentHex }}>
                You're on the list
              </p>
              <p className="text-white text-lg font-medium mb-2">
                We'll write to you when {courseLabel} opens.
              </p>
              <p className="text-white/45 text-sm">
                No spam — one email when enrolment opens.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 font-mono text-xs tracking-[0.16em] uppercase px-6 py-2.5 rounded-sm transition-opacity hover:opacity-80"
                style={{ background: accentHex, color: "#fff" }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: accentHex }}>
                {courseLabel} · Waitlist
              </p>
              <h2 className="text-white text-2xl font-semibold mb-1">
                Be the first to know.
              </h2>
              <p className="text-white/45 text-sm mb-6 leading-relaxed">
                We'll email you when {courseLabel} enrolment opens — no spam, one email.
              </p>

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-white/40 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. / your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-white placeholder-white/25 rounded-sm outline-none transition"
                    style={{ background: "#1a1a1a", border: `1px solid #333` }}
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-white/40 mb-1.5">
                    Email Address <span style={{ color: accentHex }}>*</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-white placeholder-white/25 rounded-sm outline-none transition"
                    style={{ background: "#1a1a1a", border: `1px solid #333` }}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs">{errMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 font-mono text-xs font-bold tracking-[0.18em] uppercase rounded-sm transition-opacity disabled:opacity-60"
                  style={{ background: accentHex, color: "#fff" }}
                >
                  {status === "loading" ? "Sending…" : "Notify Me →"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
