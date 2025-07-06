import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { user } = useAuth();

    const roleRoutes = {
        admin: [
            { path: '/categories', label: 'Manage Categories', color: 'bg-blue-500' },
            { path: '/lessons', label: 'Manage Lessons', color: 'bg-green-500' },
            { path: '/roles', label: 'Manage Roles', color: 'bg-purple-500' },

        ],
        contributor: [
            { path: '/lessons', label: 'Manage Lessons', color: 'bg-green-500' },
        ],
    };

    const buttons = roleRoutes[user?.role] || [];

    return (
        <div>
            <h1 className="bg-brand-100 text-xl font-bold mb-4 rounded text-brand-500 p-[40px]"> 👋 Hello there! 🚀 Welcome to your dashboard 🎉</h1>
            <div className="flex flex-wrap justify-evenly">
                {buttons.map(({ path, label, color }) => (
                    <Link key={path} to={path} className="m-2">
                        <button className={`p-12 text-white text-lg rounded  w-[200px] ${color}`}>
                            {label}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}
