"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("phone");
  const [contactValue, setContactValue] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText("");
    try {
      const res = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactMethod, contactValue })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert(data.message);
      setStep(2);
    } catch (err: any) {
      setErrorText(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText("");
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactValue, code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResetToken(data.resetToken);
      setStep(3);
    } catch (err: any) {
      setErrorText(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorText("비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsLoading(true);
    setErrorText("");
    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert("비밀번호 설정이 완료되었습니다. 새 비밀번호로 로그인해주세요.");
      router.push("/login");
    } catch (err: any) {
      setErrorText(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-2">비밀번호 초기 설정</h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          기존 사용자 중 비밀번호가 없는 분들은 본인 인증 후 안전하게 비밀번호를 설정할 수 있습니다.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-0"></div>
          {[1, 2, 3].map((num) => (
            <div key={num} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
              step === num ? "bg-cls-orange text-white border-cls-orange" : 
              step > num ? "bg-orange-100 text-cls-orange border-orange-200" : "bg-white text-gray-400 border-gray-300"
            }`}>
              {num}
            </div>
          ))}
        </div>

        {errorText && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium">
            {errorText}
          </div>
        )}

        {step === 1 && (
          <form className="space-y-5 animate-in fade-in" onSubmit={handleSendCode}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">인증 수단 선택</label>
              <div className="flex gap-4">
                <label className="flex-1 border p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 border-gray-300 transition-colors">
                  <input type="radio" value="phone" checked={contactMethod === "phone"} onChange={() => setContactMethod("phone")} className="sr-only" />
                  <span className={`text-sm font-bold ${contactMethod === "phone" ? "text-cls-orange" : "text-gray-500"}`}>휴대폰</span>
                </label>
                <label className="flex-1 border p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 border-gray-300 transition-colors">
                  <input type="radio" value="email" checked={contactMethod === "email"} onChange={() => setContactMethod("email")} className="sr-only" />
                  <span className={`text-sm font-bold ${contactMethod === "email" ? "text-cls-orange" : "text-gray-500"}`}>이메일</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {contactMethod === "phone" ? "휴대폰 번호 (- 없이 입력)" : "이메일 주소"}
              </label>
              <input
                type={contactMethod === "phone" ? "tel" : "email"}
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm"
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-cls-orange hover:bg-orange-600 focus:outline-none disabled:opacity-50 transition-colors">
              인증번호 발송
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-5 animate-in fade-in" onSubmit={handleVerifyCode}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">인증번호 입력 (더미: 123456)</label>
              <input
                type="text"
                required
                placeholder="6자리 숫자"
                className="appearance-none block w-full px-4 py-3 text-center tracking-[0.5em] text-lg font-bold border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg text-sm font-bold hover:bg-gray-50">이전</button>
              <button type="submit" disabled={isLoading} className="flex-[2] py-3 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-cls-orange hover:bg-orange-600 disabled:opacity-50">인증 확인</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-5 animate-in fade-in" onSubmit={handleSetPassword}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">새 비밀번호</label>
              <input
                type="password"
                required
                placeholder="새로운 비밀번호를 입력해주세요"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">비밀번호 확인</label>
              <input
                type="password"
                required
                placeholder="비밀번호를 한번 더 입력해주세요"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-cls-orange hover:bg-orange-600 focus:outline-none disabled:opacity-50 transition-colors">
              비밀번호 설정 완료
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-sm text-gray-600">
          <Link href="/login" className="font-bold text-gray-500 hover:text-gray-700 underline transition-colors">
            로그인 화면으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
