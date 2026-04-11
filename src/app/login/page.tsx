"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        if (data.error === "PASSWORD_NOT_SET") {
          alert("비밀번호 설정이 필요한 사용자입니다. 패스워드 설정 화면으로 이동합니다.");
          router.push("/login/set-password");
          return;
        }
        const errorMsg = data.debugDetail ? `[서버 오류 상세]\n${data.debugDetail}` : (data.error || "로그인에 실패했습니다.");
        throw new Error(errorMsg);
      }

      // Context 상태 업데이트 및 리다이렉트
      login(data.user);
      router.push("/my-account/dashboard");
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            CLS 에듀케이션에 오신 것을 환영합니다
          </p>
        </div>
        
        {loginError && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium">
            {loginError}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="userid" className="sr-only">이메일 또는 휴대폰 번호</label>
              <input
                id="userid"
                name="userid"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all"
                placeholder="이메일 또는 휴대폰 번호"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-cls-orange focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                아이디 저장
              </label>
            </div>

            <div className="text-sm">
              <Link href="#" className="font-medium text-cls-orange hover:text-orange-500 transition-colors">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-cls-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors shadow-md hover:shadow-lg"
            >
              로그인
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                또는 소셜 계정으로 로그인
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-[#03C75A] hover:bg-[#02b351] shadow-sm transition-all text-white font-bold"
              >
                N
              </button>
            </div>
            <div>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-[#FEE500] hover:bg-[#ebd300] shadow-sm transition-all text-[#000000] font-bold"
              >
                K
              </button>
            </div>
            <div>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 shadow-sm transition-all text-gray-500 font-bold"
              >
                G
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          아직 계정이 없으신가요?{' '}
          <Link href="/signup" className="font-bold text-cls-orange hover:text-orange-600 transition-colors">
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
