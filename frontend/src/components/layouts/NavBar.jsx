import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/'); // Redirect after logout
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    // ✅ Handle the TeachDrop logo click
    const handleLogoClick = () => {
        if (!user) {
            navigate('/');
        } else if (user.role === 'student') {
            navigate('/home');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <nav className="flex justify-between items-center bg-brand-400 text-white px-6 py-3">
            <div className="text-lg font-bold cursor-pointer" onClick={handleLogoClick}>
                TeachDrop
            </div>

            <div className="flex gap-4 items-center">
                {user && user.role === 'contributor' && (
                    <Link to="/contributor/lessons">My Lessons</Link>
                )}

                {user && user.role === 'student' && (
                    <>
                        <Link to="/profile">Profile</Link>
                    </>
                )}

                {user ? (
                    <button onClick={handleLogout} className="bg-white text-brand-500 px-3 py-1 rounded">Logout</button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}
