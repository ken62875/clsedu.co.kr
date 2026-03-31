import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-cls-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-cls-black via-cls-black/80 to-transparent" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-20">
          <span className="inline-block px-4 py-1 rounded-full bg-cls-orange text-white text-sm font-bold tracking-widest mb-6 animate-fade-in-up">
            초·중·고 내신 및 입시 전문
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 drop-shadow-lg">
            진짜 실력은 <br className="hidden sm:block" />
            <span className="text-cls-orange">속도</span>가 아니라 <span className="text-cls-orange">깊이</span>에서 나옵니다.
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-gray-200 font-light mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            단순히 지식을 전달하는 곳을 넘어,<br className="sm:hidden"/> 
            아이들의 학습 습관과 마음까지 세심하게 살핍니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/program" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-cls-black transition-all duration-300">
              프로그램 보기
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-cls-orange text-white rounded-lg font-bold text-lg shadow-xl hover:bg-cls-orange-light hover:-translate-y-1 transition-all duration-300">
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-cls-orange font-bold tracking-widest uppercase mb-2">Philosophy</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-cls-black mb-6 tracking-tight">
              "최고의 가치는 사람입니다"
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              CLS에듀케이션은 학생 한 명, 한 명을 소중히 여깁니다.<br/>
              개별화된 관리와 진심 어린 소통으로 학생들의 무한한 잠재력을 이끌어냅니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-16">
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
              <div className="w-14 h-14 bg-cls-black text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-cls-black mb-4">1:1 맞춤형 로드맵</h4>
              <p className="text-gray-600 leading-relaxed font-light">
                아이마다 속도가 다르고 취약한 부분이 다릅니다. 학생의 상태와 목표를 정밀하게 진단하여 최적화된 학습 방향을 설정합니다.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
              <div className="w-14 h-14 bg-cls-orange text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-cls-black mb-4">공부 근육 관리 시스템</h4>
              <p className="text-gray-600 leading-relaxed font-light">
                수업만 듣고 끝나는 것이 아니라, 학생 스스로 공부하는 힘을 기를 수 있도록 꼼꼼한 피드백과 동기부여를 제공합니다.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
              <div className="w-14 h-14 bg-cls-black text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-cls-black mb-4">함께 성장하는 공동체</h4>
              <p className="text-gray-600 leading-relaxed font-light">
                신현고, 원묵고 등 인근 학교 학생들이 모여 긍정적인 자극을 주고받으며 완벽한 내신 대비 및 방학 특강을 진행합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-cls-orange font-bold tracking-widest uppercase mb-2">Programs</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-cls-black tracking-tight">대상별 맞춤 프로그램</h3>
            </div>
            <Link href="/program" className="text-cls-black hover:text-cls-orange font-bold mt-4 md:mt-0 flex items-center transition-colors">
              전체 프로그램 보기
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-cls-black/10 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-20">🎒</span>
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-cls-orange font-bold mb-2">Elementary</div>
                <h4 className="text-2xl font-bold text-cls-black mb-4">초등부</h4>
                <p className="text-gray-600 mb-6 font-light h-20">
                  공부에 대한 흥미를 높이고 올바른 학습 습관을 형성하는 기초 탄탄 과정입니다.
                </p>
                <Link href="/program" className="text-cls-black font-semibold hover:text-cls-orange inline-flex items-center">
                  자세히 보기 &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-cls-black/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-20">📚</span>
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-cls-orange font-bold mb-2">Middle School</div>
                <h4 className="text-2xl font-bold text-cls-black mb-4">중등부</h4>
                <p className="text-gray-600 mb-6 font-light h-20">
                  신현중 등 인근 학교의 철저한 내신 분석을 통해 성적 향상과 고등 선행을 동시에 이룹니다.
                </p>
                <Link href="/program" className="text-cls-black font-semibold hover:text-cls-orange inline-flex items-center">
                  자세히 보기 &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-cls-black/30 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-20">🎓</span>
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-cls-orange font-bold mb-2">High School</div>
                <h4 className="text-2xl font-bold text-cls-black mb-4">고등부/입시</h4>
                <p className="text-gray-600 mb-6 font-light h-20">
                  수능과 내신을 아우르는 심층 학습 및 의대/명문대 진학을 위한 입시 컨설팅을 제공합니다.
                </p>
                <Link href="/program" className="text-cls-black font-semibold hover:text-cls-orange inline-flex items-center">
                  자세히 보기 &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Review Section */}
      <section className="py-24 bg-cls-black text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">학부모님이 CLS를 믿고 맡기시는 이유</h2>
          <div className="bg-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/20 relative">
            <svg className="absolute top-6 left-6 w-12 h-12 text-cls-orange opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-6 relative z-10 px-8">
              "아이가 학원 가는 걸 즐거워해요. 무엇보다 우리 아이가 오늘 무엇을 배웠고 어떻게 변하고 있는지 정기적으로 공유해주셔서 정말 안심이 됩니다."
            </p>
            <p className="font-bold text-cls-orange">- 학부모님 수강 후기 중 -</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-cls-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            우리 아이의 변화, 지금부터 시작하세요.
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90 font-light">
            아이가 스스로 '해냈다'는 변화를 느낄 수 있도록 CLS가 끝까지 함께 걷겠습니다.
          </p>
          <Link href="/contact" className="inline-block px-10 py-5 bg-white text-cls-black rounded-xl font-extrabold text-xl shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300">
            1:1 상담 및 레벨 테스트 예약
          </Link>
        </div>
      </section>
    </div>
  );
}
