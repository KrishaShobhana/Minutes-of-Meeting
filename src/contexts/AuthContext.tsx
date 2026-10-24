"use client";
import React, { createContext, useContext, useState } from "react";
import type { User, UserRole } from "@/types/mom";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    // For demo, any email/password is accepted. In real app, call API here.
    setUser({ email, role });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export default AuthContext;
