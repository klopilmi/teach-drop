import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('TOKEN');

        if (!token) {
            setLoading(false);
            return;
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        api.get('/auth/user')
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                Cookies.remove('TOKEN');
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = (userData, tokenData) => {
        setUser(userData);
        Cookies.set('TOKEN', tokenData, { expires: 7 });
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`;
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.error('[AuthContext] Logout failed:', err.message);
        } finally {
            setUser(null);
            Cookies.remove('TOKEN');
            delete api.defaults.headers.common['Authorization'];
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
