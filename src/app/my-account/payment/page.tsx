import { redirect } from "next/navigation";
import { getMyAccountUser, getMyPayments } from "@/lib/my-account/queries";
import PaymentPagination from "@/components/my-account/PaymentPagination";

const PAGE_SIZE = 20;

function formatDate(d: Date): string {
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function statusLabel(status: string) {
  const s = status.toUpperCase();
  if (s === "PAID" || s === "COMPLETED")
    return { label: "결제완료", cls: "bg-green-100 text-green-800" };
  if (s === "PENDING" || s === "UNPAID")
    return { label: "결제대기", cls: "bg-red-100 text-red-800" };
  if (s === "REFUNDED") return { label: "환불", cls: "bg-gray-100 text-gray-700" };
  return { label: status, cls: "bg-gray-100 text-gray-700" };
}

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const user = await getMyAccountUser();
  if (!user) redirect("/login");

  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10));

  const { payments, total } = await getMyPayments(user.id, page, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pendingCount = payments.filter((p) => {
    const s = p.status.toUpperCase();
    return s === "PENDING" || s === "UNPAID";
  }).length;

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
            <p className="text-red-600 mt-1">학원 데스크에서 결제 안내를 받으실 수 있습니다.</p>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
        {payments.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <p className="font-medium text-gray-500">결제 내역이 없습니다.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider">
                  주문번호 / 일자
                </th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider">
                  결제수단
                </th>
                <th className="px-6 py-4 text-right font-bold text-gray-500 uppercase tracking-wider">
                  결제금액
                </th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider">
                  상태
                </th>
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

      <PaymentPagination page={page} totalPages={totalPages} />
    </div>
  );
}
