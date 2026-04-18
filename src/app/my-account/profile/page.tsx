"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";

type ProfileData = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  avatarUrl: string | null;
};

function getRoleLabel(role?: string) {
  const r = role?.toUpperCase();
  if (r === 'STUDENT') return '학생 회원';
  if (r === 'PARENT') return '학부모 회원';
  if (r === 'TEACHER') return '강사';
  if (r === 'ADMIN' || r === 'SUPER_ADMIN') return '관리자';
  return '회원';
}

export default function ProfilePage() {
  const { user, checkSession } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 비밀번호 편집 상태
  const [isEditingPw, setIsEditingPw] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [savingPw, setSavingPw] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setProfile(data.user);
          setPhone(data.user.phone || '');
          setEmail(data.user.email || '');
          setAvatarPreview(data.user.avatarUrl || null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = ev => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleAvatarUpload() {
    if (!avatarFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', avatarFile);
      const res = await fetch('/api/profile/avatar', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setAvatarFile(null);
        await checkSession();
        setSaveMsg({ type: 'success', text: '프로필 사진이 업데이트되었습니다.' });
      } else {
        setSaveMsg({ type: 'error', text: data.error || '업로드에 실패했습니다.' });
      }
    } catch {
      setSaveMsg({ type: 'error', text: '업로드 중 오류가 발생했습니다.' });
    } finally {
      setUploading(false);
    }
  }

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, email }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMsg({ type: 'success', text: '프로필이 저장되었습니다.' });
        setProfile(prev => prev ? { ...prev, phone, email } : prev);
      } else {
        setSaveMsg({ type: 'error', text: data.error || '저장에 실패했습니다.' });
      }
    } catch {
      setSaveMsg({ type: 'error', text: '저장 중 오류가 발생했습니다.' });
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordSave() {
    if (!newPw || !confirmPw || !currentPw) {
      setPwMsg({ type: 'error', text: '모든 항목을 입력해주세요.' });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ type: 'error', text: '새 비밀번호가 일치하지 않습니다.' });
      return;
    }
    if (newPw.length < 8) {
      setPwMsg({ type: 'error', text: '새 비밀번호는 8자 이상이어야 합니다.' });
      return;
    }
    setSavingPw(true);
    setPwMsg(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (data.success) {
        setPwMsg({ type: 'success', text: '비밀번호가 변경되었습니다.' });
        setIsEditingPw(false);
        setCurrentPw('');
        setNewPw('');
        setConfirmPw('');
      } else {
        setPwMsg({ type: 'error', text: data.error || '비밀번호 변경에 실패했습니다.' });
      }
    } catch {
      setPwMsg({ type: 'error', text: '오류가 발생했습니다.' });
    } finally {
      setSavingPw(false);
    }
  }

  function cancelPasswordEdit() {
    setIsEditingPw(false);
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setPwMsg(null);
  }

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 bg-gray-100 rounded w-48" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  const displayName = profile?.name || user?.name || '사용자';
  const displayEmail = profile?.email || user?.email || '';
  const displayRole = getRoleLabel(profile?.role || user?.role);
  const currentAvatar = avatarPreview || profile?.avatarUrl || null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">프로필 설정</h1>
        <p className="mt-1 text-gray-500">내 개인정보를 확인하고 수정할 수 있습니다.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 sm:p-10">

          {/* 프로필 사진 + 기본 정보 */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 pb-10 border-b border-gray-100">
            <div className="relative group">
              <div
                onClick={handleAvatarClick}
                className="w-24 h-24 rounded-full overflow-hidden bg-cls-orange/20 flex items-center justify-center border-4 border-white shadow-lg cursor-pointer"
              >
                {currentAvatar ? (
                  <Image
                    src={currentAvatar}
                    alt={displayName}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-4xl font-bold text-cls-orange">
                    {displayName.charAt(0)}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-bold">변경</span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
              <p className="text-gray-500 mt-1">{displayEmail || '이메일 미등록'}</p>
              <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1 bg-slate-100 text-gray-700 rounded-full text-xs font-bold">
                  {displayRole}
                </span>
                {displayEmail && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    이메일 등록됨
                  </span>
                )}
              </div>

              {/* 아바타 업로드 버튼 (파일 선택 후 표시) */}
              {avatarFile && (
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={handleAvatarUpload}
                    disabled={uploading}
                    className="px-4 py-2 text-sm font-bold text-white bg-cls-orange rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-colors"
                  >
                    {uploading ? '업로드 중...' : '사진 저장'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAvatarFile(null); setAvatarPreview(profile?.avatarUrl || null); }}
                    className="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 저장 메시지 */}
          {saveMsg && (
            <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
              saveMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
            }`}>
              {saveMsg.text}
            </div>
          )}

          {/* 프로필 폼 */}
          <form onSubmit={handleProfileSave} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* 이름 (수정 불가) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">이름</label>
                <input
                  type="text"
                  disabled
                  value={displayName}
                  className="bg-gray-50 appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm text-gray-500 focus:outline-none sm:text-sm cursor-not-allowed"
                />
                <p className="mt-1.5 text-xs text-gray-500">이름 변경은 학원 데스크로 문의해주세요.</p>
              </div>

              {/* 휴대폰 번호 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">휴대폰 번호</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">이메일 주소</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all"
                />
              </div>

            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-cls-orange hover:bg-orange-600 focus:outline-none disabled:opacity-50 transition-colors"
              >
                {saving ? '저장 중...' : '정보 저장'}
              </button>
            </div>
          </form>

          {/* 비밀번호 섹션 */}
          <div className="mt-10 pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">비밀번호</h3>
                <p className="text-sm text-gray-500 mt-0.5">계정 보안을 위해 정기적으로 변경하세요.</p>
              </div>
              {!isEditingPw && (
                <button
                  type="button"
                  onClick={() => { setIsEditingPw(true); setPwMsg(null); }}
                  className="text-sm font-bold text-cls-orange hover:text-orange-600 underline underline-offset-2 transition-colors"
                >
                  수정
                </button>
              )}
            </div>

            {!isEditingPw ? (
              <div className="flex items-center px-4 py-3 border border-gray-200 rounded-xl bg-gray-50">
                <span className="text-gray-400 tracking-[0.25em] text-xl">••••••••</span>
              </div>
            ) : (
              <div className="space-y-4">
                {pwMsg && (
                  <div className={`px-4 py-3 rounded-xl text-sm font-medium ${
                    pwMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                  }`}>
                    {pwMsg.text}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">현재 비밀번호</label>
                  <input
                    type="password"
                    value={currentPw}
                    onChange={e => setCurrentPw(e.target.value)}
                    placeholder="현재 비밀번호 입력"
                    autoComplete="current-password"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">새 비밀번호</label>
                    <input
                      type="password"
                      value={newPw}
                      onChange={e => setNewPw(e.target.value)}
                      placeholder="8자 이상"
                      autoComplete="new-password"
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">새 비밀번호 확인</label>
                    <input
                      type="password"
                      value={confirmPw}
                      onChange={e => setConfirmPw(e.target.value)}
                      placeholder="비밀번호 재입력"
                      autoComplete="new-password"
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cls-orange focus:border-transparent sm:text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePasswordSave}
                    disabled={savingPw}
                    className="px-5 py-2.5 text-sm font-bold text-white bg-cls-orange rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-colors"
                  >
                    {savingPw ? '변경 중...' : '비밀번호 변경'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelPasswordEdit}
                    className="px-5 py-2.5 text-sm font-bold text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
