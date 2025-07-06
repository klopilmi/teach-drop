import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { user } = useAuth();

    const roleRoutes = {
        admin: [
            { path: '/categories', label: 'Categories', color: 'bg-blue-500' },
            { path: '/lessons', label: 'Lessons', color: 'bg-green-500' },
            { path: '/roles', label: 'Roles', color: 'bg-purple-500' },
        ],
        contributor: [
            { path: '/lessons', label: 'Lessons', color: 'bg-green-500' },
        ],
    };

    const buttons = roleRoutes[user?.role] || [];

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Hi, welcome to your dashboard</h1>
            <div className="flex flex-wrap">
                {buttons.map(({ path, label, color }) => (
                    <Link key={path} to={path} className="m-2">
                        <button className={`p-2 text-white rounded ${color}`}>
                            {label}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}
