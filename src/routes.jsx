import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import AdminPanel from './components/AdminPanel';
import SellerDashboard from './components/SellerDashboard';
import MemberArea from './components/MemberArea';
import ProductPage from './components/ProductPage';
import Login from './components/Login';
import Register from './components/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'admin', element: <AdminPanel /> },
      { path: 'seller', element: <SellerDashboard /> },
      { path: 'member', element: <MemberArea /> },
      { path: 'product/:id', element: <ProductPage /> }
    ]
  }
]);
