import React from "react";

export default function Teachers() {
  return (
    <div className="min-h-screen bg-white">
      {/* Visual Header */}
      <div className="bg-cls-black py-24 text-center mt-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 px-4">
          <span className="inline-block px-4 py-1 rounded-full bg-cls-orange text-white text-sm font-bold tracking-widest mb-6 border border-cls-orange/50 shadow-lg shadow-cls-orange/20">
            OUR INSTRUCTORS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            최고의 강사진이 <span className="text-cls-orange">결과</span>를 증명합니다
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            "선생님의 자부심이 곧 아이들의 실력이 됩니다."<br/>
            대치·목동 출신 검증된 강사진이 신내동 교육의 패러다임을 바꿉니다.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Director / Head Teacher */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10 border-l-4 border-cls-orange pl-4">
            <h2 className="text-3xl font-bold text-cls-black">원장 및 대표 강사</h2>
            <span className="text-gray-400 font-light hidden sm:inline-block">Head Instructor</span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 group">
            <div className="md:w-2/5 md:bg-gray-50 flex items-center justify-center p-0 relative overflow-hidden">
              <div className="w-full h-[400px] md:h-full bg-slate-200 relative">
                {/* 묵언의 고품질 Placeholder (강사 사진 변경 가능) */}
                <div className="absolute inset-0 bg-gradient-to-t from-cls-black/80 to-transparent z-10 md:hidden"></div>
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" 
                  alt="원장님 프로필" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="md:w-3/5 p-10 md:p-14 relative bg-white">
              <div className="absolute top-14 right-14 text-6xl text-gray-100 font-serif leading-none opacity-50 hidden md:block">"</div>
              <h3 className="text-cls-orange font-bold text-lg mb-2">원장 / 입시 총괄</h3>
              <h4 className="text-4xl font-extrabold text-cls-black mb-6 flex items-end gap-3">
                최금란 <span className="text-xl text-gray-400 font-normal">Choi Geum-Ran</span>
              </h4>
              <p className="text-xl text-gray-700 italic font-light mb-8 break-keep leading-relaxed relative z-10">
                "올바른 방향 설정 없이 속도만 내는 공부는 의미가 없습니다. 학생 한 명 한 명의 잠재력을 정확히 파악하여, 깊이 있는 공부 근육을 길러주는 것이 CLS에듀케이션의 존재 이유입니다."
              </p>
              
              <div className="space-y-4 text-gray-600 font-light">
                <div className="flex items-start gap-3">
                  <span className="text-cls-orange mt-1">✓</span>
                  <p><span className="font-semibold text-cls-black mr-2">학력:</span> 서울 소재 주요 대학 사범대 수학교육과 졸업</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cls-orange mt-1">✓</span>
                  <p><span className="font-semibold text-cls-black mr-2">경력:</span> 대치동/목동 대형 학원 입시반 전임 (전)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cls-orange mt-1">✓</span>
                  <p><span className="font-semibold text-cls-black mr-2">실적:</span> 스카이(SKY) 및 메디컬 계열 다수 배출 (20여년 경력)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cls-orange mt-1">✓</span>
                  <p><span className="font-semibold text-cls-black mr-2">철학:</span> 진짜 실력은 속도가 아니라 깊이에서 나옵니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Instructors Grid */}
        <div>
          <div className="flex items-center gap-4 mb-10 border-b pb-4">
            <h2 className="text-3xl font-bold text-cls-black">과목별 전임 강사진</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Teacher Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="h-72 overflow-hidden relative bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop" 
                  alt="수학 기명훈 선생님" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cls-black/90 via-cls-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-cls-orange px-3 py-1 rounded-md text-xs font-bold mb-2 inline-block">수학 (Math)</span>
                  <h4 className="text-2xl font-bold flex items-center gap-2">기명훈 <span className="text-sm font-light text-gray-300">T</span></h4>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 font-light text-sm italic mb-6 leading-relaxed bg-slate-50 p-4 rounded-lg border-l-2 border-cls-black">
                  "문제 풀이 스킬보다 중요한 것은 논리적 사고의 흐름을 짚어내는 것입니다."
                </p>
                <ul className="text-sm text-gray-600 space-y-3 font-light">
                  <li className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>연세대학교 수학과 졸업</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>전) 중계동 탑학원 고등부 팀장</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>신현고/원묵고 내신 수학 전문가</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Teacher Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="h-72 overflow-hidden relative bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=800&auto=format&fit=crop" 
                  alt="영어 윤지민 선생님" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cls-black/90 via-cls-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-cls-orange px-3 py-1 rounded-md text-xs font-bold mb-2 inline-block">영어 (English)</span>
                  <h4 className="text-2xl font-bold flex items-center gap-2">윤지민 <span className="text-sm font-light text-gray-300">T</span></h4>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 font-light text-sm italic mb-6 leading-relaxed bg-slate-50 p-4 rounded-lg border-l-2 border-cls-black">
                  "단순 암기가 아닌, 문장의 구조와 언어적 감각을 체득하는 고품격 영어."
                </p>
                <ul className="text-sm text-gray-600 space-y-3 font-light">
                  <li className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>한국외국어대학교 영어과 졸업</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>TESOL 수료 및 미국 교환학생 이수</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>수능 영어 독해/빈칸추론 밀착 코칭</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Teacher Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="h-72 overflow-hidden relative bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=800&auto=format&fit=crop" 
                  alt="국어 이준석 선생님" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cls-black/90 via-cls-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-cls-orange px-3 py-1 rounded-md text-xs font-bold mb-2 inline-block">국어 (Korean)</span>
                  <h4 className="text-2xl font-bold flex items-center gap-2">이준석 <span className="text-sm font-light text-gray-300">T</span></h4>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 font-light text-sm italic mb-6 leading-relaxed bg-slate-50 p-4 rounded-lg border-l-2 border-cls-black">
                  "문해력이 모든 성적의 기본입니다. 지문을 관통하는 핵심을 짚어줍니다."
                </p>
                <ul className="text-sm text-gray-600 space-y-3 font-light">
                  <li className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>고려대학교 국어국문학과 졸업</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>현역 국어/논술 지문 분석서 다수 검수</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cls-orange font-bold">•</span>
                    <span>중랑구 내신 국어 및 수능 비문학 특화</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
