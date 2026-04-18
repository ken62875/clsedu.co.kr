"use client";

import { useEffect, useState } from "react";

type Schedule = {
  id: string;
  className: string;
  teachers: string;
  startTimeStr: string;
  color: string;
};

type Notice = {
  id: string;
  title: string;
  publishedAt: string | null;
  slug: string;
};

type PaymentInfo = {
  amount: number;
  status: string;
  paymentDate: string;
  remarks: string | null;
} | null;

type DashboardData = {
  activeClassCount: number;
  todaySchedules: Schedule[];
  latestPayment: PaymentInfo;
  thisMonthPaid: boolean;
  notices: Notice[];
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, '0')}`;
}

function formatAmount(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/my-dashboard')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 bg-gray-100 rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-48 bg-gray-100 rounded-xl" />
          <div className="h-48 bg-gray-100 rounded-xl" />
        </div>
      </div>
    );
  }

  const activeClassCount = data?.activeClassCount ?? 0;
  const todaySchedules = data?.todaySchedules ?? [];
  const notices = data?.notices ?? [];
  const latestPayment = data?.latestPayment ?? null;
  const thisMonthPaid = data?.thisMonthPaid ?? false;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-1 text-gray-500">학습 진행률과 최근 소식을 한눈에 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 진행 중인 수업 위젯 */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">진행 중인 수업</h3>
          <div className="text-4xl font-extrabold text-cls-orange">
            {activeClassCount}
            <span className="text-lg text-gray-600 font-medium ml-1">과목</span>
          </div>
          {activeClassCount > 0 ? (
            <p className="mt-4 text-sm text-gray-600">현재 {activeClassCount}개 수업 수강 중</p>
          ) : (
            <p className="mt-4 text-sm text-gray-500">수강 중인 수업이 없습니다.</p>
          )}
        </div>

        {/* 결제 현황 위젯 */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">결제 현황</h3>
          {latestPayment ? (
            <>
              <div className="text-3xl font-extrabold text-gray-800">
                {formatAmount(latestPayment.amount)}
                <span className="text-base text-gray-500 font-medium ml-1">원</span>
              </div>
              {thisMonthPaid ? (
                <p className="mt-4 text-sm text-green-600 font-medium bg-green-50 py-1.5 px-3 rounded-md inline-block">
                  이번 달 결제 완료
                </p>
              ) : (
                <p className="mt-4 text-sm text-red-500 font-medium bg-red-50 py-1.5 px-3 rounded-md inline-block">
                  이번 달 미납 확인 필요
                </p>
              )}
            </>
          ) : (
            <>
              <div className="text-3xl font-extrabold text-gray-400">-</div>
              <p className="mt-4 text-sm text-gray-500">결제 내역이 없습니다.</p>
            </>
          )}
        </div>

        {/* 공지 현황 위젯 */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">학원 소식</h3>
          <div className="text-4xl font-extrabold text-gray-800">
            {notices.length}
            <span className="text-lg text-gray-600 font-medium ml-1">건</span>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            {notices[0] ? `최근: ${notices[0].title.slice(0, 20)}${notices[0].title.length > 20 ? '...' : ''}` : '최근 공지가 없습니다.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 오늘의 시간표 */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">오늘의 시간표</h3>
          {todaySchedules.length > 0 ? (
            <ul className="space-y-4">
              {todaySchedules.map(s => (
                <li key={s.id} className="flex bg-white shadow-sm border border-gray-100 rounded-xl p-4 items-center">
                  <div
                    className="font-bold px-3 py-2 rounded-lg mr-4 text-sm w-20 text-center text-white"
                    style={{ backgroundColor: s.color || '#f97316' }}
                  >
                    {s.startTimeStr}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{s.className}</p>
                    <p className="text-sm text-gray-500">{s.teachers || '강사 미정'}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-32 bg-slate-50 rounded-xl border border-gray-100">
              <p className="text-gray-400 text-sm">오늘 수업이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 학원 공지사항 */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">학원 공지사항</h3>
          {notices.length > 0 ? (
            <ul className="divide-y divide-gray-100 border border-gray-100 rounded-xl px-4 bg-white shadow-sm">
              {notices.map(n => (
                <li key={n.id} className="py-4 flex justify-between items-center">
                  <p className="font-medium text-gray-800 hover:text-cls-orange cursor-pointer line-clamp-1 flex-1 pr-3">
                    {n.title}
                  </p>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                    {formatDate(n.publishedAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-32 bg-slate-50 rounded-xl border border-gray-100">
              <p className="text-gray-400 text-sm">등록된 공지사항이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
