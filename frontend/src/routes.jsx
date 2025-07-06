import RoleGuard from './components/RoleGuard';
import BaseLayout from './layouts/BaseLayout';
import DashboardLayout from './layouts/DashboardLayout';
import StudentLayout from './layouts/StudentLayout';
import About from './pages/About';
import Category from './pages/Category';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Register';
import Role from './pages/Role';
import StudentHome from './pages/StudentHome';

const routes = [
  // Public Routes
  { path: '/', element: <Home /> }, // Login Page
  { path: '/about', element: <About /> },
  { path: '/register', element: <Register /> },

  // Dashboard Routes (Admin, Contributor)
  {
    path: '/dashboard',
    element: (
      <RoleGuard allowedRoles={['admin', 'contributor']}>
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </RoleGuard>
    ),
  },
  {
    path: '/lessons',
    element: (
      <RoleGuard allowedRoles={['admin', 'contributor']}>
        <DashboardLayout>
          <Lesson />
        </DashboardLayout>
      </RoleGuard>
    ),
  },
  {
    path: '/categories',
    element: (
      <RoleGuard allowedRoles={['admin']}>
        <DashboardLayout>
          <Category />
        </DashboardLayout>
      </RoleGuard>
    ),
  },
  {
    path: '/roles',
    element: (
      <RoleGuard allowedRoles={['admin']}>
        <DashboardLayout>
          <Role />
        </DashboardLayout>
      </RoleGuard>
    ),
  },

  // Student Home
  {
    path: '/home',
    element: (
      <RoleGuard allowedRoles={['student']}>
        <StudentLayout>
          <StudentHome />
        </StudentLayout>
      </RoleGuard>
    ),
  },

  // Profile Page (Accessible to ALL roles)
  {
    path: '/profile',
    element: (
      <RoleGuard allowedRoles={['admin', 'contributor', 'student']}>
        <BaseLayout>
          <ProfilePage />
        </BaseLayout>
      </RoleGuard>
    ),
  },

];

export default routes;
