import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

type Payment = {
  _id: string;
  orderId: string;
  paymentId?: string;
  fullName: string;
  email: string;
  phone?: string;
  lectureIds: string[];
  amount: number;
  status: string;
  createdAt: string;
};

const LECTURE_LABELS: Record<string, string> = {
  l01: "HPO Axis & Follicular Endocrinology",
  l02: "Endocrinology of Follicular Phase",
  l03: "Ovulation & Precision Triggering",
  l04: "Luteal Phase Endocrinology",
  l05: "Implantation — Molecular Dialogue",
  l06: "Spermatogenesis",
};

export default function Transactions() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiGet<{ payments: Payment[]; totalRevenue: number }>("/admin/transactions")
      .then((d) => { setPayments(d.payments); setTotalRevenue(d.totalRevenue); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      (p.paymentId ?? "").toLowerCase().includes(q) ||
      p.orderId.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">Super Admin Panel</p>
          <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
          <p className="text-sm text-slate-400 mt-1">All successful Razorpay payments</p>
        </div>
        {/* Revenue summary */}
        <div className="bg-white rounded-2xl border border-slate-200 px-6 py-4 shadow-sm text-right"
          style={{ borderTop: "3px solid #21864E" }}>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-[#21864E]">₹{totalRevenue.toLocaleString("en-IN")}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{payments.length} paid orders</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1E2A44] rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name, email, payment ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E2A44]/20 shadow-sm"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <IcoReceipt />
              </div>
              <p className="text-slate-500 font-medium">
                {search ? "No transactions match your search" : "No transactions yet"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Date</th>
                      <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Customer</th>
                      <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Lectures</th>
                      <th className="text-right px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Amount</th>
                      <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Payment ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filtered.map((p) => {
                      const isBundle = p.lectureIds.length >= 6;
                      const lectureLabel = isBundle
                        ? "Full Bundle (6 lectures)"
                        : p.lectureIds.map((id) => LECTURE_LABELS[id] ?? id).join(", ");
                      return (
                        <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 text-slate-500 text-[12px] whitespace-nowrap">
                            {new Date(p.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit", month: "short", year: "numeric",
                            })}
                            <br />
                            <span className="text-[11px] text-slate-400">
                              {new Date(p.createdAt).toLocaleTimeString("en-IN", {
                                hour: "2-digit", minute: "2-digit",
                              })}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-800 text-[13px]">{p.fullName}</p>
                            <p className="text-slate-400 text-[11px]">{p.email}</p>
                            {p.phone && <p className="text-slate-400 text-[11px]">{p.phone}</p>}
                          </td>
                          <td className="px-5 py-4 max-w-[240px]">
                            <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              isBundle
                                ? "bg-amber-50 text-amber-700"
                                : "bg-blue-50 text-blue-700"
                            }`}>
                              {isBundle ? "Full Bundle" : `${p.lectureIds.length} lecture${p.lectureIds.length > 1 ? "s" : ""}`}
                            </span>
                            <p className="text-[11px] text-slate-400 mt-1 leading-tight line-clamp-2" title={lectureLabel}>
                              {lectureLabel}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className="text-[15px] font-bold text-[#21864E]">₹{p.amount.toLocaleString("en-IN")}</span>
                          </td>
                          <td className="px-5 py-4">
                            {p.paymentId ? (
                              <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded select-all">
                                {p.paymentId}
                              </span>
                            ) : (
                              <span className="text-slate-300 text-[11px]">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function IcoReceipt() {
  return (
    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}
