import Link from "next/link";
import Image from "next/image";
import React from 'react';

interface FooterData {
  slogan: string;
  description: string;
  phone: string;
  hours: string;
  address: string;
  bizName: string;
  bizOwner: string;
  bizNumber: string;
  bizAddress: string;
}

const FALLBACK: FooterData = {
  slogan: "진짜 실력은 속도가 아니라 깊이에서 나옵니다.",
  description: "고등·중등·초등학생 대상 국영수과 단과 및 종합반",
  phone: "02-493-8899",
  hours: "14:00 ~ 22:00",
  address: "서울특별시 중랑구 봉화산로 218\n영창빌딩 7층 (신내동)",
  bizName: "씨엘에스(CLS)에듀케이션학원",
  bizOwner: "최금란",
  bizNumber: "701-94-01998",
  bizAddress: "서울 중랑구 신내동 613-8",
};

async function fetchFooterData(): Promise<FooterData> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return FALLBACK;
  try {
    const res = await fetch(`${apiUrl}/api/site-content?section=footer`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return FALLBACK;
    const { items } = await res.json();
    const item = items?.find((i: { key: string }) => i.key === "main");
    if (!item) return FALLBACK;
    return { ...FALLBACK, ...(item.data as object) };
  } catch {
    return FALLBACK;
  }
}

const Footer = async () => {
  const f = await fetchFooterData();

  return (
    <footer className="bg-cls-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="mb-6 bg-white/10 p-4 rounded-lg inline-block">
              <Image
                src="/logo-clsedu-landscape.webp"
                alt="CLS 에듀케이션 로고"
                width={300}
                height={80}
                className="w-auto h-8 object-contain brightness-0 invert"
                unoptimized
              />
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed font-light">
              {f.slogan}<br />
              {f.description}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cls-orange">Contact Us</h4>
            <ul className="space-y-2 text-gray-300 font-light">
              <li className="flex items-start">
                <span className="w-20 font-medium">상담전화:</span>
                <span>{f.phone}</span>
              </li>
              <li className="flex items-start">
                <span className="w-20 font-medium">상담시간:</span>
                <span>{f.hours}</span>
              </li>
              <li className="flex items-start">
                <span className="w-20 font-medium">학원주소:</span>
                <span style={{ whiteSpace: "pre-line" }}>{f.address}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cls-orange">Business Info</h4>
            <ul className="space-y-2 text-gray-300 font-light">
              <li><span className="font-medium">상호명:</span> {f.bizName}</li>
              <li><span className="font-medium">대표자:</span> {f.bizOwner}</li>
              <li><span className="font-medium">사업자번호:</span> {f.bizNumber}</li>
              <li><span className="font-medium">소재지:</span> {f.bizAddress}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-light gap-4">
          <p>COPYRIGHT © {new Date().getFullYear()} CLS EDUCATION. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
            <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
