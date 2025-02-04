import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const { isAuthenticationInProgress, isAuthenticated, user, login, logout } = context;

    const isAdmin = user?.role === 'admin';
    return { isAuthenticationInProgress, isAuthenticated, isAdmin, user, login, logout };
};

export default useAuth;