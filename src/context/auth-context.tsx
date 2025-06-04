
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Added usePathname

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username?: string, password?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (username?: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      router.push('/');
      setIsLoading(false);
      return true;
    } else {
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    router.push('/login');
    setIsLoading(false);
  };

  // Effect to redirect if auth state changes while on a page
  useEffect(() => {
    if (!isLoading) { // Only run redirects once initial loading is done
      const isLoginPage = pathname === '/login';
      if (isAuthenticated && isLoginPage) {
        router.push('/');
      } else if (!isAuthenticated && !isLoginPage) {
        router.push('/login');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
