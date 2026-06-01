import { useEffect } from "react";
import { createPortal } from "react-dom";
import FoundationEnrollForm from "./FoundationEnrollForm";

export default function FoundationEnrollModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(0,0,0,0.72)",
      }}
      onClick={onClose}
    >
      {/* Stop click from closing when clicking inside the panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          backgroundColor: "#071410",
          border: "1px solid rgba(33,134,78,0.22)",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 0 0 1px rgba(33,134,78,0.06), 0 40px 100px rgba(0,0,0,0.85)",
        }}
      >
        {/* Top green accent stripe */}
        <div style={{ height: "2px", background: "linear-gradient(90deg, rgba(33,134,78,0.15), #21864E, rgba(33,134,78,0.15))" }} />

        <div className="p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-t-green block mb-1.5">
                Foundation Series · Tier I
              </span>
              <h2 className="font-display font-medium text-[21px] leading-[1.15] text-white">
                Register Your Seat
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-white/40 hover:text-white transition-colors"
              style={{ fontSize: "24px", lineHeight: 1, marginTop: "2px" }}
            >
              ×
            </button>
          </div>

          <FoundationEnrollForm />
        </div>
      </div>
    </div>,
    document.body
  );
}
