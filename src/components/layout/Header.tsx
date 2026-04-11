"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm flex flex-col">
      {/* Top GNB */}
      <div className="w-full bg-gray-50 border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex justify-between items-center text-xs font-medium text-gray-500">
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-cls-orange transition-colors">알림장</Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:text-cls-orange transition-colors">교육비 결제</Link>
            <span className="text-gray-300">|</span>
            <Link href="/contact" className="hover:text-cls-orange transition-colors">교육상담예약</Link>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/my-account/dashboard" className="text-cls-orange font-bold hover:text-orange-600 transition-colors">마이페이지</Link>
                <span className="text-gray-300">|</span>
                <button onClick={logout} className="hover:text-cls-orange transition-colors">로그아웃</button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-cls-orange transition-colors">로그인</Link>
                <span className="text-gray-300">|</span>
                <Link href="/signup" className="hover:text-cls-orange transition-colors">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-1 flex justify-start items-center">
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
            
            <nav className="hidden md:flex flex-shrink-0 items-center justify-center space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors">학원소개</Link>
            <Link href="/teachers" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors">강사소개</Link>
            <div className="relative group">
              <Link href="/curriculum" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors flex items-center gap-1 py-6">
                교과과정
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-16 left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0 z-50">
                <div className="py-2">
                  <Link href="/curriculum/high-school" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-slate-50 hover:text-cls-orange font-medium">고등부</Link>
                  <Link href="/curriculum/middle-school" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-slate-50 hover:text-cls-orange font-medium">중등부</Link>
                  <Link href="/curriculum/elementary-school" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-slate-50 hover:text-cls-orange font-medium">초등부</Link>
                  <Link href="/curriculum/special-program" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-slate-50 hover:text-cls-orange font-medium">특별 프로그램</Link>
                </div>
              </div>
            </div>
            <Link href="/program" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors">프로그램</Link>
            <Link href="/story" className="text-gray-700 hover:text-cls-orange font-semibold transition-colors">스토리</Link>
          </nav>

          <div className="flex-1 hidden md:flex justify-end items-center">
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
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute w-full left-0 top-20 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">학원소개</Link>
          <Link href="/teachers" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">강사소개</Link>
          <div className="space-y-1">
            <Link href="/curriculum" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">교과과정</Link>
            <div className="pl-6 space-y-1 bg-slate-50/50 rounded-lg py-1">
              <Link href="/curriculum/high-school" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-cls-orange">고등부</Link>
              <Link href="/curriculum/middle-school" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-cls-orange">중등부</Link>
              <Link href="/curriculum/elementary-school" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-cls-orange">초등부</Link>
              <Link href="/curriculum/special-program" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-cls-orange">특별 프로그램</Link>
            </div>
          </div>
          <Link href="/program" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">프로그램</Link>
          <Link href="/story" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cls-orange hover:bg-slate-50 rounded-md">스토리</Link>
          <div className="pt-4 space-y-3">
            {isLoggedIn ? (
              <div className="bg-slate-50 p-2 rounded-lg space-y-1">
                <Link href="/my-account/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-bold text-cls-orange hover:bg-slate-100 rounded-md">마이페이지</Link>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-slate-100 rounded-md">로그아웃</button>
              </div>
            ) : (
              <div className="flex space-x-2 px-3 pb-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">로그인</Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 text-center border-2 border-cls-orange text-cls-orange px-4 py-2.5 rounded-md text-sm font-bold hover:bg-cls-orange hover:text-white transition-colors">회원가입</Link>
              </div>
            )}
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
