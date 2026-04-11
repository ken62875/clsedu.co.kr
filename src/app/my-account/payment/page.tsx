export default function PaymentPage() {
  const payments = [
    {
      id: "PAY-2023-1002",
      date: "2023.10.02",
      title: "10월 고등 수학 (상) 심화반 수강료",
      amount: "350,000",
      status: "결제대기",
      method: "-",
    },
    {
      id: "PAY-2023-0901",
      date: "2023.09.01",
      title: "9월 고등 수학 (상) 심화반 수강료",
      amount: "350,000",
      status: "결제완료",
      method: "신용카드 (신한)",
    },
    {
      id: "PAY-2023-0801",
      date: "2023.08.01",
      title: "8월 고등 수학 (상) 심화반 수강료 + 교재비",
      amount: "380,000",
      status: "결제완료",
      method: "신용카드 (현대)",
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">결제 내역</h1>
        <p className="mt-1 text-gray-500">과거 결제 이력과 미납된 결제 건을 확인하고 결제할 수 있습니다.</p>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-100 text-red-600 rounded-full mt-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-red-800 text-lg">미결제 항목이 1건 있습니다.</h3>
            <p className="text-red-600 mt-1">10월 고등 수학 수강료 결제가 지연되고 있습니다. 정해진 기한 내에 결제를 완료해주세요.</p>
          </div>
        </div>
        <button className="whitespace-nowrap px-6 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-md transition-colors w-full sm:w-auto">
          지금 결제하기
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider">주문번호 / 일자</th>
              <th scope="col" className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider">결제내용</th>
              <th scope="col" className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider">결제수단</th>
              <th scope="col" className="px-6 py-4 text-right font-bold text-gray-500 uppercase tracking-wider">결제금액</th>
              <th scope="col" className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider">상태</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{payment.id}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{payment.date}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 font-medium">{payment.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  {payment.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-gray-900">
                  {payment.amount}원
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payment.status === '결제완료' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                  {payment.status === '결제대기' && (
                    <button className="ml-2 px-3 py-1 text-xs font-medium border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50">
                      결제
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center mt-6">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
             이전
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-cls-orange bg-orange-50 text-sm font-bold text-cls-orange">
            1
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            다음
          </button>
        </nav>
      </div>
    </div>
  );
}
