import RoleGuard from './components/RoleGuard';
import DashboardLayout from './layouts/DashboardLayout';
import StudentLayout from './layouts/StudentLayout';
import About from './pages/About';
import Category from './pages/Category';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Register';
import Role from './pages/Role';
import StudentHome from './pages/StudentHome';

const userRole = 'contributor'; // You'll later pull this from your auth system

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/register', element: <Register /> },

  // Dashboard Routes (Admin, Contributor)
  {
    path: '/lessons',
    element: (
      <RoleGuard allowedRoles={['admin', 'contributor']} userRole={userRole}>
        <DashboardLayout>
          <Lesson />
        </DashboardLayout>
      </RoleGuard>
    ),
  },
  {
    path: '/categories',
    element: (
      <RoleGuard allowedRoles={['admin']} userRole={userRole}>
        <DashboardLayout>
          <Category />
        </DashboardLayout>
      </RoleGuard>
    ),
  },
  {
    path: '/roles',
    element: (
      <RoleGuard allowedRoles={['admin']} userRole={userRole}>
        <DashboardLayout>
          <Role />
        </DashboardLayout>
      </RoleGuard>
    ),
  },

  // Student-only Home
  {
    path: '/home',
    element: (
      <RoleGuard allowedRoles={['student']} userRole={userRole}>
        <StudentLayout>
          <StudentHome />
        </StudentLayout>
      </RoleGuard>
    ),
  },

  // Profile (no layout wrapper for now)
  { path: '/profile', element: <ProfilePage /> },

  { path: '/unauthorized', element: <div>Unauthorized Access</div> },
];
export default routes;