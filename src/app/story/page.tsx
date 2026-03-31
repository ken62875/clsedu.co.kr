import React from "react";

export default function Story() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50">
      <div className="w-20 h-20 bg-cls-navy/10 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl text-cls-navy">✏️</span>
      </div>
      <h1 className="text-3xl font-bold text-cls-navy mb-4">CLS 스토리 (블로그)</h1>
      <p className="text-gray-500 font-light">학원 소식과 입시 칼럼, 성적 향상 스토리가 업데이트 될 게시판 양식입니다.</p>
      <div className="mt-12 opacity-50 text-sm border-t pt-8 border-gray-200">
        <p>Mockup Page (Board)</p>
      </div>
    </div>
  );
}
