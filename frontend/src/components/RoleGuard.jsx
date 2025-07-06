import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleGuard({ allowedRoles, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but unauthorized
    return <Navigate to="/profile" replace />;
  }

  return children;
}
