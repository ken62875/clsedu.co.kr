export default function ClassPage() {
  const classes = [
    {
      id: 1,
      title: "고등 수학 (상) 최상위권 심화반",
      teacher: "김수학 쌤",
      progress: 60,
      schedule: "매주 화, 목 17:00 - 19:00",
      status: "수강중",
      thumbnail: "bg-indigo-50 border-indigo-100 text-indigo-700"
    },
    {
      id: 2,
      title: "수능 영어 1등급 목표 실전반",
      teacher: "박영어 쌤",
      progress: 85,
      schedule: "매주 월, 수 19:30 - 21:30",
      status: "수강중",
      thumbnail: "bg-orange-50 border-orange-100 text-orange-700"
    },
    {
      id: 3,
      title: "통합과학 중간고사 대비 특강",
      teacher: "이과학 쌤",
      progress: 100,
      schedule: "매주 토 10:00 - 13:00",
      status: "종료",
      thumbnail: "bg-slate-50 border-slate-200 text-slate-500"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">나의 수업</h1>
          <p className="mt-1 text-gray-500">수강 중인 과목과 출석, 진도 현황을 확인하세요.</p>
        </div>
        <div className="hidden sm:flex space-x-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">전체 3</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">수강중 2</span>
        </div>
      </div>

      <div className="space-y-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg border ${cls.thumbnail}`}>
                  {cls.title.slice(3, 5)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${cls.status === '수강중' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {cls.status}
                    </span>
                    <span className="text-sm font-medium text-gray-500">{cls.teacher}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{cls.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{cls.schedule}</p>
                </div>
              </div>
              
              <div className="w-full sm:w-48">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">진도율</span>
                  <span className="font-bold text-cls-orange">{cls.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${cls.progress === 100 ? 'bg-gray-400' : 'bg-cls-orange'}`} 
                    style={{ width: `${cls.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-50 text-gray-700 font-medium text-sm rounded-lg border border-gray-200 hover:bg-slate-100 transition-colors">
                  강의자료
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-cls-orange text-white font-medium text-sm rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                  강의실 입장
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
