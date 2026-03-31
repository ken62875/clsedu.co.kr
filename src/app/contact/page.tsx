import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cls-navy mb-4">상담 문의 신청</h1>
          <p className="text-gray-600 font-light">
            아래 양식을 작성해주시면, 확인 후 빠른 시일 내에 연락드리겠습니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">학생 이름 *</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-gold focus:border-transparent outline-none transition-all placeholder-gray-400 font-light" placeholder="홍길동" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">학교 및 학년 *</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-gold focus:border-transparent outline-none transition-all placeholder-gray-400 font-light" placeholder="신현고 2학년" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">보호자 연락처 *</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-gold focus:border-transparent outline-none transition-all placeholder-gray-400 font-light" placeholder="010-0000-0000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">관심 과목 / 프로그램</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-gold focus:border-transparent outline-none transition-all font-light bg-white">
                  <option value="">선택해주세요</option>
                  <option value="math">수학</option>
                  <option value="english">영어</option>
                  <option value="korean">국어</option>
                  <option value="science">과학</option>
                  <option value="consulting">입시 컨설팅</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">문의 내용</label>
              <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-gold focus:border-transparent outline-none transition-all placeholder-gray-400 font-light resize-none" placeholder="궁금하신 사항이나 아이의 현재 학습 상태를 간단히 적어주세요."></textarea>
            </div>

            <div className="pt-4 flex items-center">
              <input type="checkbox" id="privacy" className="w-5 h-5 text-cls-gold focus:ring-cls-gold border-gray-300 rounded" />
              <label htmlFor="privacy" className="ml-3 text-sm text-gray-600 font-light">
                개인정보 수집 및 이용에 동의합니다. (필수)
              </label>
            </div>

            <button type="button" className="w-full py-4 px-6 bg-cls-navy text-white rounded-lg font-bold text-lg hover:bg-cls-navy-light transition-all shadow-md mt-6">
              상담 신청 완료
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
