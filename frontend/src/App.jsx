import { useRoutes } from 'react-router-dom';
import './global.css';
import routes from './routes';

export default function App() {
  return useRoutes(routes);
}
