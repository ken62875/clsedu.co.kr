"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  phone?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  checkSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.isLoggedIn && data.user) {
          setIsLoggedIn(true);
          setUser(data.user);
          return;
        }
      }
    } catch (err) {}
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    await fetch("/api/auth/me", { method: "POST" }); // 쿠키 삭제 API 호출
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, checkSession }}>
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
