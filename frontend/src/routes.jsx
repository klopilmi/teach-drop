import About from './pages/About';
import Category from './pages/Category';
import Home from './pages/Home';
import Register from './pages/Register';
import Role from './pages/Role';
// import Lessons from './pages/Lessons';
// import Users from './pages/Users';

const userRole = 'contributor'; // 'admin', 'student'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/register', element: <Register /> },


  // {
  //   path: '/lessons',
  //   element: (
  //     <RoleGuard allowedRoles={['admin', 'contributor', 'student']} userRole={userRole}>
  //       <Lessons />
  //     </RoleGuard>
  //   ),
  // },
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
];

export default routes;
