import axios from 'axios';
import { useState } from 'react';
import InputField from './InputField';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL;


        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                email,
                password,
            });

            console.log('Logged in!', response.data);
            localStorage.setItem('token', response.data.access_token);
            // Redirect to dashboard or other page
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="h-full flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-[#22577A] text-center">Login</h2>

                <InputField
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                    label="Password"
                    type="password"
                    placeholder="********"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-[#22577A] text-white py-2 rounded-lg hover:bg-[#183C56] transition"
                >
                    Login
                </button>

                <span className='p-4 w-full flex items-center justify-center text-center text-brand-500'>
                    <p>Not registered? Register <b><a href='/register'>here.</a></b></p>
                </span>
            </form>
        </div>
    );
};

export default LoginForm;
