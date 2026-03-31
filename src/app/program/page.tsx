import React from "react";
import Link from "next/link";

export default function Program() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Visual Header */}
      <div className="bg-cls-black py-24 text-center mt-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 px-4">
          <span className="inline-block px-4 py-1 rounded-full border border-gray-600 text-gray-300 text-sm font-bold tracking-widest mb-6">
            PROGRAM & SYSTEM
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            결과가 증명하는 <span className="text-cls-orange">완벽한 학습 시스템</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            주먹구구식 강의를 넘어, 예습-수업-클리닉으로 이어지는<br className="hidden md:block"/>
            CLS에듀케이션만의 3단계 다면 관리 프로세스를 경험하세요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
        
        {/* Core Process (3 Steps) */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-cls-black mb-4">CLS 3-STEP Learning Process</h2>
            <p className="text-gray-500 font-light text-lg">듣기만 하는 수업이 아닌, 학생 본인의 실력으로 체득화하는 과학적 시스템</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-[40%] left-[15%] right-[15%] h-1 bg-gradient-to-r from-gray-200 via-cls-orange/50 to-gray-200 -z-10"></div>
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-gray-300 hover:border-cls-orange transition-colors duration-300 text-center relative">
              <div className="w-16 h-16 bg-white border-4 border-gray-100 text-gray-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto -mt-16 mb-6 shadow-sm">1</div>
              <h3 className="text-2xl font-bold text-cls-black mb-4">Pre-Study <br/><span className="text-lg text-gray-500 font-medium">예습 및 과제 점검</span></h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                수업 전 주도적인 예습을 통해 학습 목표를 인지하고, 이전 시간 과제 풀이를 밀착 점검하여 빈틈을 파악합니다.
              </p>
              <ul className="text-sm text-left text-gray-500 space-y-2 bg-slate-50 p-4 rounded-lg">
                <li>• 지정된 교재 예습 노트 작성</li>
                <li>• 일일 단어/개념 확인 테스트</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-cls-orange transform md:-translate-y-4 text-center relative z-10">
              <div className="w-16 h-16 bg-cls-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto -mt-16 mb-6 shadow-md shadow-cls-orange/30">2</div>
              <h3 className="text-2xl font-bold text-cls-black mb-4">Core Lecture <br/><span className="text-lg text-cls-orange font-medium">핵심 심화 강의</span></h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                단순 진도 빼기식 강의가 아닌 핵심 원리 이해와 심화 응용에 집중합니다. 자체 제작 프리미엄 교재를 활용합니다.
              </p>
              <ul className="text-sm text-left text-gray-500 space-y-2 bg-slate-50 p-4 rounded-lg border border-cls-orange/10">
                <li>• 학교별 내신 출제 경향 분석 강의</li>
                <li>• 수준별 맞춤 분반 진행</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-gray-300 hover:border-cls-black transition-colors duration-300 text-center relative">
              <div className="w-16 h-16 bg-cls-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto -mt-16 mb-6 shadow-sm">3</div>
              <h3 className="text-2xl font-bold text-cls-black mb-4">1:1 Clinic <br/><span className="text-lg text-gray-500 font-medium">개별 맞춤 클리닉</span></h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                당일 배운 내용은 당일 완벽 숙지. 정규 수업 후 개별 질문 시간과 클리닉을 통해 학습 결손을 제로(0)로 만듭니다.
              </p>
              <ul className="text-sm text-left text-gray-500 space-y-2 bg-slate-50 p-4 rounded-lg">
                <li>• 오답 노트 작성 및 유사 문항 풀이</li>
                <li>• 강사와 조교의 1:1 대면 피드백</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Level Targeted Programs */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10 border-l-4 border-cls-orange pl-4">
            <h2 className="text-3xl font-bold text-cls-black">대상별 특화 커리큘럼</h2>
          </div>

          <div className="space-y-12">
            {/* Middle School */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10 items-center hover:shadow-lg transition-shadow">
              <div className="md:w-1/3">
                <div className="bg-slate-100 rounded-2xl h-64 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-6xl mb-4">🏫</span>
                  <h3 className="text-2xl font-bold text-cls-black">중등부 프로그램</h3>
                  <p className="text-cls-orange font-bold mt-2">"고등 선행과 내신 100점의 완성"</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-bold text-cls-black mb-4">자유학년제 대비 및 특목/자사고 입시</h4>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  점수화되지 않는 중등 1학년 시기부터 올바른 학습 습관을 체화합니다. 신현중, 원묵중 등 인근 학교의 출제 스타일을 빅데이터화 하여 완벽한 학교별 내신 대비를 제공하며, 상위권 학생들을 위한 고등 통합 선행 학습을 함께 진행합니다.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm font-light">
                  <div className="bg-slate-50 p-4 rounded-lg border-l-2 border-cls-black">
                    <span className="font-bold text-cls-black block mb-1">내신 집중 대비반</span>
                    시험 4주 전 학교별 맞춤 교재 진행
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border-l-2 border-cls-orange">
                    <span className="font-bold text-cls-black block mb-1">고등 선행반</span>
                    수능형 독해 및 모의고사 수학 기초
                  </div>
                </div>
              </div>
            </div>

            {/* High School */}
            <div className="bg-cls-black rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row-reverse gap-10 items-center">
              <div className="md:w-1/3">
                <div className="bg-gray-800 rounded-2xl h-64 flex flex-col items-center justify-center p-6 text-center border border-gray-700">
                  <span className="text-6xl mb-4">🎓</span>
                  <h3 className="text-2xl font-bold text-white">고등부/입시 프로그램</h3>
                  <p className="text-cls-orange font-bold mt-2">"수능 1등급과 SKY 합격 로드맵"</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-bold text-cls-orange mb-4">수능/내신 투트랙 심화 시스템</h4>
                <p className="text-gray-300 font-light leading-relaxed mb-6">
                  대입 성공이라는 최종 목표를 향해 달리는 가장 중요한 시기. 변별력을 가르는 킬러 문항 대비와 최신 수능 트렌드 반영 프리미엄 하프 모의고사를 매주 실시합니다. 학생부 종합 전형(학종) 대비 컨설팅까지 원장이 직접 챙깁니다.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm font-light">
                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-gray-500 text-gray-300">
                    <span className="font-bold text-white block mb-1">수능 정규반</span>
                    EBS 수능특강/완성 연계 완벽 대비
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border-l-2 border-cls-orange text-gray-300">
                    <span className="font-bold text-white block mb-1">입시 컨설팅</span>
                    생기부 관리 및 수시/정시 원서 접수 코칭
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Table CTA box */}
        <div className="bg-gradient-to-br from-cls-orange to-cls-orange-light rounded-3xl p-10 text-center text-white shadow-xl shadow-cls-orange/20">
          <h3 className="text-3xl font-bold mb-4">자세한 학년별 시간표가 궁금하신가요?</h3>
          <p className="text-lg opacity-90 mb-8 font-light">
            학생의 학년과 지망 수준에 따라 다양한 클래스가 실시간으로 운영중입니다.<br/>
            상담을 남겨주시면 최적의 반 편성과 시간표를 안내해 드립니다.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-cls-orange rounded-xl font-bold hover:bg-cls-black hover:text-white transition-colors duration-300 shadow-lg">
            반 편성 및 시간표 문의하기
          </Link>
        </div>

      </div>
    </div>
  );
}
