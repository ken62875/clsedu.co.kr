"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string | null;
  phone?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) => {
  // SSR 단계에서 서버가 전달한 세션 스냅샷으로 초기화합니다.
  // 덕분에 첫 렌더된 HTML 에 이미 올바른 헤더(마이페이지/로그아웃 등)가 포함되어
  // 로그인 후 페이지 전환 시 "로그인/회원가입 → 마이페이지/로그아웃" 깜빡임이 발생하지 않습니다.
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialUser));
  const [user, setUser] = useState<User | null>(initialUser);
  // initialUser 가 있으면 추가 세션 체크가 필요 없으므로 곧바로 로딩 종료 상태
  const [isLoading, setIsLoading] = useState(!initialUser);

  const router = useRouter();
  const inflight = useRef<Promise<void> | null>(null);

  const checkSession = useCallback(async () => {
    if (inflight.current) return inflight.current;
    const p = (async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.isLoggedIn && data.user) {
            setIsLoggedIn(true);
            setUser(data.user);
            return;
          }
        }
      } catch {
        // 네트워크 오류는 현재 상태 유지 (서버 스냅샷이 있다면 그걸 신뢰)
        if (initialUser) return;
      }
      setIsLoggedIn(false);
      setUser(null);
    })().finally(() => {
      inflight.current = null;
    });
    inflight.current = p;
    return p;
  }, [initialUser]);

  useEffect(() => {
    // initialUser 가 주입되어 있으면 서버 스냅샷을 그대로 신뢰 — 클라이언트 재검증 생략
    if (initialUser) return;
    checkSession().finally(() => setIsLoading(false));
  }, [checkSession, initialUser]);

  const login = useCallback(
    (userData: User) => {
      setIsLoggedIn(true);
      setUser(userData);
      // 서버 컴포넌트들이 새 세션 쿠키를 반영하도록 RSC 페이로드를 재요청
      router.refresh();
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/me", { method: "POST", credentials: "include" });
    } catch {
      // 네트워크 오류여도 클라이언트 상태는 리셋
    }
    setIsLoggedIn(false);
    setUser(null);
    // 서버에서 쿠키가 제거된 상태로 HTML 을 다시 그려, 헤더 유틸리티 내비가 즉시 "로그인/회원가입"으로 바뀜
    router.refresh();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, login, logout, checkSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
