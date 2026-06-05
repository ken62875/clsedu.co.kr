import Link from 'next/link';

const FloatingButton = () => {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 group flex items-center gap-4">
      <span className="bg-cls-black text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block shadow-lg font-medium tracking-tight translate-x-4 group-hover:translate-x-0 duration-300">
        무료 상담 신청
      </span>
      <Link href="https://talk.naver.com/ct/wf8ty8t?frm=mnmb#nafullscreen" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-[58px] h-[58px] bg-cls-orange text-white rounded-full shadow-2xl hover:bg-cls-orange-light hover:scale-110 transition-all duration-300 ease-out cursor-pointer relative">
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-white"></span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </Link>
    </div>
  );
};

export default FloatingButton;
