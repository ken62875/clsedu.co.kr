"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo-clsedu-landscape.webp" 
                alt="CLS 에듀케이션 로고" 
                width={400} 
                height={110} 
                className="w-auto h-10 object-contain"
                priority
                unoptimized
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
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-cls-orange focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute w-full left-0 top-20 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">학원소개</Link>
          <Link href="/teachers" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">강사소개</Link>
          <Link href="/curriculum" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">교과과정</Link>
          <Link href="/program" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">프로그램</Link>
          <Link href="/story" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">스토리</Link>
          <div className="pt-4">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-cls-black text-white px-6 py-3 rounded-md font-bold hover:bg-cls-black-light transition-colors shadow-md">
              상담 문의
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
