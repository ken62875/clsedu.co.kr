"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">프로필 설정</h1>
        <p className="mt-1 text-gray-500">내 개인정보를 확인하고 수정할 수 있습니다.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 pb-10 border-b border-gray-100">
            <div className="w-24 h-24 rounded-full bg-cls-orange/20 flex items-center justify-center border-4 border-white shadow-lg relative cursor-pointer group">
              <span className="text-4xl font-bold text-cls-orange">{user?.name?.charAt(0) || 'U'}</span>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">수정</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name || '홍길동'}</h2>
              <p className="text-gray-500 mt-1">{user?.email || 'test@example.com'}</p>
              <div className="mt-3">
                <span className="px-3 py-1 bg-slate-100 text-gray-700 rounded-full text-xs font-bold">
                  {user?.role === 'student' ? '학생 회원' : '학부모 회원'}
                </span>
                <span className="ml-2 text-sm text-green-600 font-medium tracking-tight">인증 완료 계정</span>
              </div>
            </div>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">이름</label>
                <input type="text" disabled defaultValue={user?.name || '홍길동'} className="bg-gray-50 appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm text-gray-500 focus:outline-none sm:text-sm cursor-not-allowed" />
                <p className="mt-1.5 text-xs text-gray-500">이름 변경은 학원 데스크로 문의해주세요.</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">휴대폰 번호</label>
                <div className="flex space-x-2">
                  <input type="tel" defaultValue="010-1234-5678" className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all" />
                  <button type="button" className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap">변경</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">이메일 주소</label>
                <input type="email" defaultValue={user?.email || 'test@example.com'} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">비밀번호 변경</label>
                <button type="button" className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm text-gray-700 bg-white cursor-text focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent transition-all">
                  ••••••••
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex justify-end space-x-3">
              <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors">
                취소
              </button>
              <button type="submit" className="px-6 py-2.5 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-cls-orange hover:bg-orange-600 focus:outline-none transition-colors">
                저장하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
