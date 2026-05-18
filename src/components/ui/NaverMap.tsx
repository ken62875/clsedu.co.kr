"use client";

const NAVER_MAP_URL =
  "https://map.naver.com/p/search/%EC%94%A8%EC%97%98%EC%97%90%EC%8A%A4%EC%97%90%EB%93%80%EC%BC%80%EC%9D%B4%EC%85%98%ED%95%99%EC%9B%90?c=15.00,0,0,0,dh";

export default function NaverMap() {
  return (
    <a
      href={NAVER_MAP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-xl overflow-hidden border border-slate-200 hover:border-cls-orange transition-colors group"
      style={{ height: "300px" }}
    >
      <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-3 text-center px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-cls-orange"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <div>
          <p className="text-sm font-semibold text-cls-black">씨엘에스(CLS)에듀케이션학원</p>
          <p className="text-xs text-gray-500 mt-0.5">서울시 중랑구 봉화산로 218 영창빌딩 7층</p>
        </div>
        <span className="mt-1 inline-flex items-center gap-1.5 bg-cls-orange text-white text-xs font-semibold px-4 py-2 rounded-full group-hover:bg-orange-600 transition-colors">
          네이버 지도에서 보기
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </span>
      </div>
    </a>
  );
}
