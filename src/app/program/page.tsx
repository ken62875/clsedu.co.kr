import React from "react";

export default function Program() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50">
      <div className="w-20 h-20 bg-cls-navy/10 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl text-cls-navy">🏆</span>
      </div>
      <h1 className="text-3xl font-bold text-cls-navy mb-4">학습 프로그램</h1>
      <p className="text-gray-500 font-light">초/중/고 내신 및 입시 윈터스쿨 등 다양한 프로그램 상세 안내가 준비 중입니다.</p>
      <div className="mt-12 opacity-50 text-sm border-t pt-8 border-gray-200">
        <p>Mockup Page</p>
      </div>
    </div>
  );
}
