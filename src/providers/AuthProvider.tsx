"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: "student" | "parent" | "admin";
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 더미: 초기 마운트 시 로컬스토리지 등에서 가져와도 되지만, 일단 메모리 기반으로 둠.
  // 실제 프로젝트 연동 시 이곳에서 세션/토큰 검증 로직 처리.

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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
