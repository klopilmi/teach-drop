import InputField from './InputField'; // adjust the path if needed

const LoginForm = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <form className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-[#22577A] text-center">Login</h2>

                <InputField
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                />

                <InputField
                    label="Password"
                    type="password"
                    placeholder="********"
                    autoComplete="current-password"
                />

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
