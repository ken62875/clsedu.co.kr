"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">유효하지 않은 접근입니다.</h2>
        <p className="text-gray-600 mb-6">올바른 비밀번호 재설정 링크로 접속해주세요.</p>
        <Link href="/login/forgot-password" className="font-bold text-cls-orange hover:text-orange-600 transition-colors">
          비밀번호 다시 찾기
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "비밀번호 재설정에 실패했습니다.");
      }

      setMessage("비밀번호가 성공적으로 변경되었습니다. 잠시 후 로그인 화면으로 이동합니다.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          비밀번호 재설정
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          새로운 비밀번호를 입력해주세요.
        </p>
      </div>

      {error && (
        <div className="p-3 mt-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium">
          {error}
        </div>
      )}

      {message && (
        <div className="p-3 mt-4 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100 font-medium">
          {message}
        </div>
      )}

      {!message && (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">새로운 비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all"
                placeholder="새로운 비밀번호 (8자 이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password-confirm" className="sr-only">새로운 비밀번호 확인</label>
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                required
                minLength={8}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white transition-colors shadow-md hover:shadow-lg ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cls-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              }`}
            >
              {isLoading ? "변경 중..." : "비밀번호 변경하기"}
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-gray-600">
        <Link href="/login" className="font-bold text-cls-orange hover:text-orange-600 transition-colors">
          로그인 화면으로 돌아가기
        </Link>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <Suspense fallback={<div className="text-center py-8">로딩 중...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
