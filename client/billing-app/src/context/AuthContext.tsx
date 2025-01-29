import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { checkAuth, login, logout } from '../services/authService';

interface AuthContextType {
  isAuthenticationInProgress: boolean
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticationInProgress, setIsAuthenticationInProgress] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      setIsAuthenticationInProgress(true);
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
      setIsAuthenticationInProgress(false);
    };
    authenticate();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    await login(username, password);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{isAuthenticationInProgress, isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};