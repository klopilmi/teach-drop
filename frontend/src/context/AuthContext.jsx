import Cookies from 'js-cookie';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => Cookies.get('TOKEN') || null);

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        Cookies.set('TOKEN', tokenData, { expires: 7 }); // expires in 7 days
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove('TOKEN'); // this was previously 'token'
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
