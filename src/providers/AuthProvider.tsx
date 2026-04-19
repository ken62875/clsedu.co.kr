"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // StrictMode/탭 포커스 등으로 인한 중복 체크를 억제하기 위한 in-flight promise ref
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
        // 네트워크 오류는 비로그인 처리
      }
      setIsLoggedIn(false);
      setUser(null);
    })().finally(() => {
      inflight.current = null;
    });
    inflight.current = p;
    return p;
  }, []);

  useEffect(() => {
    checkSession().finally(() => setIsLoading(false));
  }, [checkSession]);

  const login = useCallback((userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/me", { method: "POST", credentials: "include" });
    } catch {
      // 네트워크 오류여도 클라이언트 상태는 리셋
    }
    setIsLoggedIn(false);
    setUser(null);
  }, []);

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
