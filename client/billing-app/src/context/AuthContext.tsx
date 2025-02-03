import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {checkAuth, login, logout} from '../services/authService';

interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
}

interface AuthContextType {
    isAuthenticationInProgress: boolean;
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticationInProgress, setIsAuthenticationInProgress] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const authenticate = async () => {
            setIsAuthenticationInProgress(true);
            const {isAuthenticated, user} = await checkAuth();
            setIsAuthenticated(isAuthenticated);
            setUser(user);
            setIsAuthenticationInProgress(false);
        };
        authenticate();
    }, []);

    const handleLogin = async (username: string, password: string) => {
        const response = await login(username, password);
        setUser(response.user);
        setIsAuthenticated(true);
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{isAuthenticationInProgress, isAuthenticated, user, login: handleLogin, logout: handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};