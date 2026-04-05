import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Visual Header */}
      <div className="relative bg-cls-black py-24 md:py-32 text-center mt-0 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transform scale-105"
          style={{ backgroundImage: "url('https://media.clsedu.co.kr/hero-01-clsedu-main-building-rebuild-optimized.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cls-black/60 to-cls-black/20" />
        
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-md">
            About <span className="text-cls-orange">CLS</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            "공부가 외롭지 않도록, 결과가 두렵지 않도록<br className="hidden sm:block"/>
            곁에서 함께 걷는 교육"
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {/* Intro Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cls-orange/10 rounded-bl-full"></div>
          <h2 className="text-3xl font-bold text-cls-black mb-6">신내동 최고의 교육 파트너</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 break-keep">
            단순히 지식을 전달하는 곳을 넘어, 아이들의 학습 습관과 마음까지 세심하게 살피는 곳. <br className="hidden md:block"/>
            신내동에서 꾸준히 신뢰를 쌓아온 CLS에듀케이션이 우리 아이들의 '든든한 교육 파트너'가 되어드립니다.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div>
              <p className="text-sm text-gray-400 mb-1">위치</p>
              <p className="font-semibold text-cls-black">신내동 영창빌딩 7층</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">대상</p>
              <p className="font-semibold text-cls-black">초등, 중등, 고등</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">과목</p>
              <p className="font-semibold text-cls-black">국 · 영 · 수 · 과</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">특징</p>
              <p className="font-semibold text-cls-black">내신분석, 윈터스쿨</p>
            </div>
          </div>
        </div>

        {/* Philosophy Details */}
        <h3 className="text-2xl md:text-3xl font-bold text-cls-black text-center mb-12">CLS에듀케이션 <span className="text-cls-orange">교육 철학</span></h3>
        
        <div className="space-y-6 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center border border-slate-100">
            <div className="w-16 h-16 shrink-0 bg-cls-orange text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">1</div>
            <div>
              <h4 className="text-xl font-bold text-cls-black mb-3">첫 만남부터 밀착 케어까지: "1:1 맞춤형 로드맵"</h4>
              <p className="text-gray-600 leading-relaxed font-light break-keep">
                아이마다 속도가 다르고 취약한 부분이 다릅니다. CLS는 학생이 처음 방문하는 순간부터 현재의 학습 상태와 목표를 정밀하게 진단합니다.
                원장님과 실장님이 직접 심층 상담을 진행하며, 과목별 선생님들과 유기적으로 소통하여 빈틈없이 관리합니다.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center border border-slate-100">
            <div className="w-16 h-16 shrink-0 bg-cls-black text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">2</div>
            <div>
              <h4 className="text-xl font-bold text-cls-black mb-3">CLS만의 특별함: "공부 근육을 기르는 관리 시스템"</h4>
              <p className="text-gray-600 leading-relaxed font-light break-keep">
                수업만 듣고 끝나는 공부는 진짜 실력이 되지 않습니다. 학생이 '스스로 공부하는 힘'을 기를 수 있도록 꼼꼼한 피드백을 제공하며,
                권위적인 강의 대신 편하게 질문할 수 있는 따뜻한 분위기를 지향합니다.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center border border-slate-100">
            <div className="w-16 h-16 shrink-0 bg-cls-orange text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">3</div>
            <div>
              <h4 className="text-xl font-bold text-cls-black mb-3">지역 학교 최적화: "성장하는 안정적 학습 공동체"</h4>
              <p className="text-gray-600 leading-relaxed font-light break-keep">
                신현고, 혜원여고, 원묵고 등 인근 학교 학생들이 모여 서로 긍정적인 자극을 주고받습니다.
                각 학교별 출제 경향을 꿰뚫는 내신 완벽 대비와 방학 윈터스쿨로 다음 학기를 탄탄히 준비합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Promise Section */}
        <div className="bg-cls-black text-white rounded-3xl p-10 md:p-16 mb-20 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1513258496099-481620b4cbdb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-8 text-cls-orange">CLS에듀케이션의 약속</h3>
            <div className="space-y-6 text-lg font-light leading-relaxed max-w-4xl mx-auto opacity-90 break-keep">
              <p>학습 습관이 흔들릴 때는 조용히 손을 내밀어 중심을 잡아주고, 어려운 과목은 끝까지 함께 풀어내며 아이 스스로 "해냈다"는 변화를 느낄 수 있도록 돕겠습니다.</p>
              <p>학창 시절 배우는 것은 입시 지식 그 이상입니다. 포기하지 않는 인내와 스스로를 밀어붙이는 열정으로 '자기 자신'을 만들어갑니다.</p>
              <p className="font-medium text-white italic mt-8 text-xl opacity-100">"부모님께서 안심하고 맡기실 수 있는 곳, 아이들에게 좋은 시간으로 남는 곳 — CLS가 그 자리를 지키겠습니다."</p>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-slate-100">
          <h3 className="text-2xl font-bold text-cls-black mb-8 border-b pb-4">찾아오시는 길</h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-slate-100 rounded-xl h-64 md:h-full flex items-center justify-center text-slate-400">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>지도 영역 (추후 API 연동)</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-cls-black text-lg mb-2">주소 (Address)</h4>
                <p className="text-gray-600 font-light">서울특별시 중랑구 봉화산로 218 영창빌딩 7층</p>
              </div>
              <div>
                <h4 className="font-bold text-cls-black text-lg mb-2">교통편 (Transport)</h4>
                <ul className="text-gray-600 space-y-2 list-disc list-inside font-light">
                  <li><strong>지하철:</strong> 6호선 봉화산역 3/4번 출구 이동</li>
                  <li><strong>버스:</strong> 영창빌딩 앞 정류장 하차</li>
                  <li><strong>주차:</strong> 건물 내 주차장 이용 문의 필요</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-cls-black text-lg mb-2">상담 문의 (Contact)</h4>
                <p className="text-gray-600 font-light">📞 02-493-8899 (평일/주말 14:00 - 22:00)<br/><br/>카카오톡 채널 'CLS 에듀케이션학원' 검색</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
