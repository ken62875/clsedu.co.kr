"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [view, setView] = useState<'LOGIN' | 'SMS_AUTH'>('LOGIN');

  // 로그인 상태
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // SMS 인증 상태
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [smsError, setSmsError] = useState("");
  const [smsMessage, setSmsMessage] = useState("");

  // 일반 로그인 처리
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

  // SMS 인증 요청
  const handleSendSms = async () => {
    if (!phone) {
      setSmsError("휴대폰 번호를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    setSmsError("");
    setSmsMessage("");

    try {
      const res = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactValue: phone })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(
          (data.error || "인증번호 발송에 실패했습니다.") + 
          (data.details ? `\n\n[상세 에러 내역]\n${data.details}` : "")
        );
      }
      
      setIsCodeSent(true);
      setSmsMessage(data.message || "인증번호가 전송되었습니다.");
    } catch (err: any) {
      setSmsError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!code) {
      setSmsError("인증번호를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    setSmsError("");
    
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactValue: phone, code })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "인증번호 확인에 실패했습니다.");
      
      if (data.isPasswordSet) {
        alert("이미 비밀번호가 설정되어 있습니다. 기존 비밀번호로 로그인해주세요.");
        setView('LOGIN');
        setUserid(phone);
      } else {
        alert("인증이 완료되었습니다. 비밀번호 설정 화면으로 이동합니다.");
        // resetToken 등을 이용해 안전한 패스워드 설정 페이지로 이동
        router.push(`/login/set-password?token=${data.resetToken}`);
      }
    } catch (err: any) {
      setSmsError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            {view === 'LOGIN' ? '로그인' : '초기 휴대폰 인증'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            CLS 에듀케이션에 오신 것을 환영합니다
          </p>
        </div>

        {view === 'LOGIN' && (
          <>
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl mt-4">
              <p className="text-sm text-gray-800 font-medium mb-3 leading-relaxed">
                현재 수강중인 학생들은 학원에 등록된 휴대폰으로 인증을 하고 비밀번호를 설정하면 로그인이 할 수 있습니다.
              </p>
              <button
                type="button"
                onClick={() => setView('SMS_AUTH')}
                className="w-full py-2 bg-white text-cls-orange border border-cls-orange rounded-lg font-bold text-sm hover:bg-orange-50 transition-colors"
              >
                휴대폰 번호로 초기 인증하기
              </button>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium">
                {loginError}
              </div>
            )}

            <form className="mt-6 space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4 rounded-md shadow-sm">
                <div>
                  <label htmlFor="userid" className="block text-sm font-medium text-gray-700 mb-1">아이디(휴대폰 또는 이메일)</label>
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
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
                    자동 로그인
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/login/forgot-password" className="font-medium text-cls-orange hover:text-orange-500 transition-colors">
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-cls-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors shadow-md hover:shadow-lg disabled:bg-gray-400"
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                </button>
              </div>
            </form>
          </>
        )}

        {view === 'SMS_AUTH' && (
          <div className="mt-8 space-y-6">
            <div className="mb-4">
              <button 
                onClick={() => setView('LOGIN')}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                &larr; 일반 로그인으로 돌아가기
              </button>
            </div>

            {smsError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium">
                {smsError}
              </div>
            )}
            
            {smsMessage && (
              <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100 font-medium">
                {smsMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  휴대폰 번호
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 appearance-none rounded-lg block px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cls-orange sm:text-sm"
                    placeholder="010-3015-1688 입력"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isCodeSent && !!code} // 인증 성공 후면 변경 불가 (단순 방어코드)
                  />
                  <button
                    type="button"
                    onClick={handleSendSms}
                    disabled={isLoading}
                    className="px-4 py-3 bg-gray-800 text-white rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors disabled:bg-gray-400 whitespace-nowrap"
                  >
                    {isCodeSent ? '재발송' : '인증'}
                  </button>
                </div>
              </div>

              {isCodeSent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    인증번호 입력
                  </label>
                  <input
                    type="text"
                    className="w-full appearance-none rounded-lg block px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cls-orange sm:text-sm"
                    placeholder="인증번호 6자리"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={isLoading}
                    className="mt-4 w-full py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-cls-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors shadow-md disabled:bg-gray-400"
                  >
                    인증 후 로그인 / 비밀번호 설정
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                또는
              </span>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            학원에 처음오신 학생들은 신규로{' '}
            <Link href="/signup" className="font-bold text-cls-orange hover:text-orange-600 transition-colors">
              [회원가입]
            </Link>{' '}
            해주세요.
          </div>
        </div>
      </div>
    </div>
  );
}
