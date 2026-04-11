"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    studentName: "",
    schoolGrade: "",
    parentPhone: "",
    interest: "",
    message: "",
    privacy: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentName || !formData.schoolGrade || !formData.parentPhone) {
      alert("학생 이름, 학교 및 학년, 보호자 연락처는 필수 항목입니다.");
      return;
    }

    if (!formData.privacy) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "문의가 성공적으로 접수되었습니다.");
        // 초기화
        setFormData({
          studentName: "",
          schoolGrade: "",
          parentPhone: "",
          interest: "",
          message: "",
          privacy: false,
        });
      } else {
        alert(data.error || "이메일 발송 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cls-black mb-4">상담 문의 신청</h1>
          <p className="text-gray-600 font-light">
            아래 양식을 작성해주시면, 확인 후 빠른 시일 내에 연락드리겠습니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">학생 이름 *</label>
                <input 
                  type="text" 
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-orange focus:border-transparent outline-none transition-all placeholder-gray-400 font-light" 
                  placeholder="홍길동" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">학교 및 학년 *</label>
                <input 
                  type="text" 
                  name="schoolGrade"
                  value={formData.schoolGrade}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-orange focus:border-transparent outline-none transition-all placeholder-gray-400 font-light" 
                  placeholder="신현고 2학년" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">보호자 연락처 *</label>
                <input 
                  type="tel" 
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-orange focus:border-transparent outline-none transition-all placeholder-gray-400 font-light" 
                  placeholder="010-0000-0000" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">관심 과목 / 프로그램</label>
                <select 
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-orange focus:border-transparent outline-none transition-all font-light bg-white"
                >
                  <option value="">선택해주세요</option>
                  <option value="math">수학</option>
                  <option value="english">영어</option>
                  <option value="korean">국어</option>
                  <option value="science">과학</option>
                  <option value="consulting">입시 컨설팅</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">문의 내용</label>
              <textarea 
                rows={5} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cls-orange focus:border-transparent outline-none transition-all placeholder-gray-400 font-light resize-none" 
                placeholder="궁금하신 사항이나 아이의 현재 학습 상태를 간단히 적어주세요."
              ></textarea>
            </div>

            <div className="pt-4 flex items-center">
              <input 
                type="checkbox" 
                id="privacy" 
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                className="w-5 h-5 text-cls-orange focus:ring-cls-orange border-gray-300 rounded" 
              />
              <label htmlFor="privacy" className="ml-3 text-sm text-gray-600 font-light">
                개인정보 수집 및 이용에 동의합니다. (필수)
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={\`w-full py-4 px-6 bg-cls-black text-white rounded-lg font-bold text-lg transition-all shadow-md mt-6 \${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-cls-black-light'}\`}
            >
              {isLoading ? '전송 중...' : '상담 신청 완료'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
