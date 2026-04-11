export default function NotificationPage() {
  const notifications = [
    {
      id: 1,
      type: "공지",
      title: "[필독] 10월 학원 운영 일정 안내",
      date: "2023.09.28",
      isNew: true,
      content: "안녕하세요 CLS 에듀케이션입니다. 10월 공휴일(개천절, 한글날) 및 중간고사 대비 보충 수업 일정을 안내해 드립니다..."
    },
    {
      id: 2,
      type: "과제",
      title: "고등 수학 (상) 심화반 이번 주 과제 안내",
      date: "2023.09.27",
      isNew: true,
      content: "심화 교재 45p~52p 풀고 오답노트 작성해 오기. 추가 프린트물도 잊지 마세요."
    },
    {
      id: 3,
      type: "개인",
      title: "9월 학력평가 성적 상담 안내",
      date: "2023.09.20",
      isNew: false,
      content: "홍길동 학생의 9월 학평 성적표가 도착했습니다. 이번 주 중으로 학부모님 통화 예정입니다."
    },
    {
      id: 4,
      type: "결제",
      title: "9월 수강료 결제 완료 안내",
      date: "2023.09.01",
      isNew: false,
      content: "9월 수강료 결제가 정상적으로 처리되었습니다. 결제 영수증은 결제내역 메뉴에서 확인 가능합니다."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">알림장</h1>
          <p className="mt-1 text-gray-500">학원의 중요한 공지와 담당 선생님의 메시지를 확인하세요.</p>
        </div>
      </div>

      <div className="bg-white border text-sm flex gap-2 border-gray-200 p-1 rounded-xl w-max">
        <button className="px-4 py-2 rounded-lg bg-slate-100 font-bold text-gray-800">전체</button>
        <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-slate-50">학원 공지</button>
        <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-slate-50">수업/과제</button>
        <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-slate-50">1:1 메시지</button>
      </div>

      <div className="space-y-4">
        {notifications.map((noti) => (
          <div key={noti.id} className={`p-5 rounded-xl border transition-all cursor-pointer ${noti.isNew ? 'bg-orange-50/50 border-orange-200 hover:bg-orange-50' : 'bg-white border-gray-200 hover:bg-slate-50'}`}>
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center mb-2">
                <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                  noti.type === '공지' ? 'bg-blue-100 text-blue-700' :
                  noti.type === '과제' ? 'bg-purple-100 text-purple-700' :
                  noti.type === '개인' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {noti.type}
                </span>
                <span className="text-sm text-gray-500">{noti.date}</span>
                {noti.isNew && <span className="flex w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
              </div>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{noti.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{noti.content}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 border border-gray-300 text-sm font-bold text-gray-700 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
          더보기 (4/12)
        </button>
      </div>
    </div>
  );
}
