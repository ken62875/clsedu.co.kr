import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo-clsedu-landscape.webp" 
                alt="CLS 에듀케이션 로고" 
                width={180} 
                height={50} 
                className="w-auto h-10 object-contain"
                priority
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors">학원소개</Link>
            <Link href="/teachers" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors">강사소개</Link>
            <Link href="/curriculum" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors">교과과정</Link>
            <Link href="/program" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors">프로그램</Link>
            <Link href="/story" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors">스토리</Link>
          </nav>

          <div className="hidden md:flex items-center">
            <Link href="/contact" className="bg-cls-black text-white px-6 py-2.5 rounded-md font-bold hover:bg-cls-black-light transition-colors shadow-md">
              상담 문의
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-cls-black focus:outline-none p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
