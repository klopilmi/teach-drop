import Cookies from 'js-cookie';
import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => Cookies.get('TOKEN') || null);

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        Cookies.set('TOKEN', tokenData, { expires: 7 }); // expires in 7 days
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout'); // call your logout API
        } catch (error) {
            console.error('Logout failed', error);
            // Optional: still clear local auth even if server logout fails
        } finally {
            setUser(null);
            setToken(null);
            Cookies.remove('TOKEN');
        }
    };
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook to use the auth context
export function useAuth() {
    return useContext(AuthContext);
}
