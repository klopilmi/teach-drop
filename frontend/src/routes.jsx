import About from './pages/About';
import Category from './pages/Category';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Register from './pages/Register';
import Role from './pages/Role';
import StudentHome from './pages/StudentHome';
// import Users from './pages/Users';

const userRole = 'contributor'; // 'admin', 'student'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/register', element: <Register /> },


  {
    path: '/lessons',
    element: (
      // <RoleGuard allowedRoles={['admin', 'contributor', 'student']} userRole={userRole}>
      <Lesson />
      // </RoleGuard>
    ),
  },
  // {
  //   path: '/users',
  //   element: (
  //     <RoleGuard allowedRoles={['admin']} userRole={userRole}>
  //       <Users />
  //     </RoleGuard>
  //   ),
  // },
  {
    path: '/categories',
    element: (
      // <RoleGuard allowedRoles={['admin']} userRole={userRole}>
      <Category />
      // </RoleGuard>
    ),
  },
  {
    path: '/roles',
    element: (
      // <RoleGuard allowedRoles={['admin']} userRole={userRole}>
      <Role />
      // </RoleGuard>
    ),
  },
  {
    path: '/home',
    element: (
      // <RoleGuard allowedRoles={['student']} userRole={userRole}>
      <StudentHome />
      // </RoleGuard>
    ),
  },
];

export default routes;
