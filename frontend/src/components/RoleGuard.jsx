import { Navigate } from 'react-router-dom';

export default function RoleGuard({ children, allowedRoles, userRole }) {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
