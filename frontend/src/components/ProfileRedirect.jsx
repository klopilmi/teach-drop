export default function ProfileRedirect() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    if (user.role === 'admin' || user.role === 'contributor') {
        return <Navigate to="/lessons" />;
    }

    if (user.role === 'student') {
        return <Navigate to="/home" />;
    }

    return <div>Unknown role</div>;
}
