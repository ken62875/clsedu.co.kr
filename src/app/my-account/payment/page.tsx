"use client";

import { useEffect, useState } from "react";

type PaymentRow = {
  id: string;
  amount: number;
  method: string | null;
  status: string;
  paymentDate: string;
};

const PAGE_SIZE = 20;

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
}

function statusLabel(status: string) {
  const s = status.toUpperCase();
  if (s === "PAID" || s === "COMPLETED") return { label: "결제완료", cls: "bg-green-100 text-green-800" };
  if (s === "PENDING" || s === "UNPAID") return { label: "결제대기", cls: "bg-red-100 text-red-800" };
  if (s === "REFUNDED") return { label: "환불", cls: "bg-gray-100 text-gray-700" };
  return { label: status, cls: "bg-gray-100 text-gray-700" };
}

export default function PaymentPage() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/my-payments?page=${page}&limit=${PAGE_SIZE}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          if (!cancelled) setError(err.error || `오류가 발생했습니다. (${res.status})`);
          return;
        }
        const data = await res.json();
        if (!cancelled) {
          setPayments(data.payments || []);
          setTotal(data.total || 0);
        }
      } catch {
        if (!cancelled) setError("결제 내역을 불러오는 데 실패했습니다.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const pendingCount = payments.filter((p) => {
    const s = p.status.toUpperCase();
    return s === "PENDING" || s === "UNPAID";
  }).length;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">결제 내역</h1>
        <p className="mt-1 text-gray-500">과거 결제 이력과 미납된 결제 건을 확인할 수 있습니다.</p>
      </div>

      {pendingCount > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex items-start gap-4">
          <div className="p-2 bg-red-100 text-red-600 rounded-full mt-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-red-800 text-lg">
              결제 대기 항목이 {pendingCount}건 있습니다.
            </h3>
            <p className="text-red-600 mt-1">
              학원 데스크에서 결제 안내를 받으실 수 있습니다.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="py-20 text-center text-red-500 font-medium">{error}</div>
        ) : payments.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <p className="font-medium text-gray-500">결제 내역이 없습니다.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider">주문번호 / 일자</th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider">결제수단</th>
                <th className="px-6 py-4 text-right font-bold text-gray-500 uppercase tracking-wider">결제금액</th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => {
                const st = statusLabel(payment.status);
                return (
                  <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{payment.id}</div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {formatDate(payment.paymentDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                      {payment.method || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-gray-900">
                      {payment.amount.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${st.cls}`}
                      >
                        {st.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <span className="relative inline-flex items-center px-4 py-2 border border-cls-orange bg-orange-50 text-sm font-bold text-cls-orange">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
