export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-1 text-gray-500">학습 진행률과 최근 소식을 한눈에 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 학습 현황 위젯 */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">진행 중인 수업</h3>
          <div className="text-4xl font-extrabold text-cls-orange">3<span className="text-lg text-gray-600 font-medium ml-1">과목</span></div>
          <div className="mt-4 w-full bg-orange-200 rounded-full h-2">
            <div className="bg-cls-orange h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">이번 달 학습 목표 75% 달성</p>
        </div>

        {/* 미납 결제 위젯 */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">결제 현황</h3>
          <div className="text-3xl font-extrabold text-gray-800">1<span className="text-lg text-gray-600 font-medium ml-1">건 미납</span></div>
          <p className="mt-4 text-sm text-red-500 font-medium bg-red-50 py-1.5 px-3 rounded-md inline-block">10월 수강료 결제 필요</p>
        </div>

        {/* 최근 알림 위젯 */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">새로운 알림</h3>
          <div className="text-4xl font-extrabold text-gray-800">2<span className="text-lg text-gray-600 font-medium ml-1">건</span></div>
          <p className="mt-4 text-sm text-gray-600">다음 주 모의고사 안내 외 1건</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">오늘의 시간표</h3>
          <ul className="space-y-4">
            <li className="flex bg-white shadow-sm border border-gray-100 rounded-xl p-4 items-center">
              <div className="bg-slate-100 text-gray-800 font-bold px-3 py-2 rounded-lg mr-4 text-sm w-20 text-center">17:00</div>
              <div>
                <p className="font-bold text-gray-900">고등 수학 (상) 심화반</p>
                <p className="text-sm text-gray-500">302호 | 김수학 강사</p>
              </div>
            </li>
            <li className="flex bg-white shadow-sm border border-gray-100 rounded-xl p-4 items-center">
              <div className="bg-slate-100 text-gray-800 font-bold px-3 py-2 rounded-lg mr-4 text-sm w-20 text-center">19:00</div>
              <div>
                <p className="font-bold text-gray-900">수능 영어 실전 모의고사</p>
                <p className="text-sm text-gray-500">201호 | 박영어 강사</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">학원 공지사항</h3>
          <ul className="divide-y divide-gray-100 border border-gray-100 rounded-xl px-4 bg-white shadow-sm">
            <li className="py-4 flex justify-between items-center">
              <p className="font-medium text-gray-800 hover:text-cls-orange cursor-pointer">10월 등록 일정 및 교재 안내</p>
              <span className="text-xs text-gray-400">10.11</span>
            </li>
            <li className="py-4 flex justify-between items-center">
              <p className="font-medium text-gray-800 hover:text-cls-orange cursor-pointer">중간고사 대비 특강 개설 안내</p>
              <span className="text-xs text-gray-400">10.05</span>
            </li>
            <li className="py-4 flex justify-between items-center">
              <p className="font-medium text-gray-800 hover:text-cls-orange cursor-pointer">차량 운행 시간표 변경 공지</p>
              <span className="text-xs text-gray-400">09.28</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
