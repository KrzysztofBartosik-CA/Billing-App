import axios from 'axios';

const API_URL = 'http://localhost:2000/auth';

export const register = async (userData: {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    email: string;
}) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { username, password }, { withCredentials: true });
    return response.data;
};

export const checkAuth = async () => {
    try {
        const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return { isAuthenticated: false, user: null };
    }
};

export const logout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};