import About from './pages/About';
// import Categories from './pages/Categories';
import Home from './pages/Home';
// import Lessons from './pages/Lessons';
// import Users from './pages/Users';

const userRole = 'contributor'; // 'admin', 'student'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },

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
  // {
  //   path: '/categories',
  //   element: (
  //     <RoleGuard allowedRoles={['admin']} userRole={userRole}>
  //       <Categories />
  //     </RoleGuard>
  //   ),
  // },
];

export default routes;
