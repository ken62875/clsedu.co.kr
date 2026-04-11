"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"student" | "parent">("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("회원가입이 완료되었습니다. (추후 API 연동 예정)");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            CLS 에듀케이션과 함께 학습을 시작하세요
          </p>
        </div>

        {/* 탭 전환 영역 */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 text-center text-sm font-bold transition-all border-b-2 ${
              activeTab === "student"
                ? "border-cls-orange text-cls-orange"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("student")}
          >
            학생 회원가입
          </button>
          <button
            className={`flex-1 py-4 text-center text-sm font-bold transition-all border-b-2 ${
              activeTab === "parent"
                ? "border-cls-orange text-cls-orange"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("parent")}
          >
            학부모 회원가입
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {activeTab === "student" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-lg font-bold text-gray-900">학생 정보 입력</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">이메일 (아이디)</label>
                <div className="mt-1">
                  <input type="email" required className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">비밀번호</label>
                  <div className="mt-1">
                    <input type="password" required className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
                  <div className="mt-1">
                    <input type="password" required className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">이름 (실명)</label>
                  <div className="mt-1">
                    <input type="text" required className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
                  <div className="mt-1 flex space-x-2">
                    <input type="tel" required placeholder="010-0000-0000" className="flex-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                    <button type="button" className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">인증</button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">학부모 정보 입력</h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">학부모 이름</label>
                    <div className="mt-1">
                      <input type="text" required className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">학부모 휴대폰 번호</label>
                    <div className="mt-1 flex space-x-2">
                      <input type="tel" required className="flex-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                      <button type="button" className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">인증</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "parent" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-lg font-bold text-gray-900">학부모 정보 입력</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">이름 (실명)</label>
                <div className="mt-1">
                  <input type="text" required className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
                  <div className="mt-1 flex space-x-2">
                    <input type="tel" required className="flex-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                    <button type="button" className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">인증</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">이메일 주소</label>
                  <div className="mt-1">
                    <input type="email" required className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">학생 정보 등록</h3>
                  <button type="button" className="text-sm font-medium text-cls-orange hover:text-orange-600">+ 자녀 추가</button>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">학생 이름</label>
                      <input type="text" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cls-orange focus:border-cls-orange sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">휴대폰 번호</label>
                      <input type="tel" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cls-orange focus:border-cls-orange sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">이메일</label>
                      <input type="email" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cls-orange focus:border-cls-orange sm:text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-cls-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              회원가입 완료
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="font-bold text-cls-orange hover:text-orange-600 transition-colors">
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
