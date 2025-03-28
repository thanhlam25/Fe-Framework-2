import React from 'react';
import './App.css'
import { Route, Routes, useParams, useRoutes } from 'react-router-dom';
import Home from './pages/client/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import DetailProduct from './pages/client/detailProduct';
import Admin from './pages/admin/home';
import AddProduct from './pages/admin/addProduct';
import Categories from './pages/admin/Categories';
import PrivateRoute from './components/PrivateRoute';
import Cart from './pages/client/cart';
import ListProduct from './pages/admin/listProducts';
import ListUser from './pages/admin/listUser';
import UseDetail from './pages/admin/useDetail';
function App() {

  const DetailProductWrapper = () => {
    const { id } = useParams();
    if (!id) {
      return <div>Product ID không hợp lệ</div>;
    }
    return <DetailProduct productId={id} />;
  };
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/products/:id', element: <DetailProductWrapper /> },
    { path: '/cart', element: <Cart /> },



    { path: '/admin', element: <PrivateRoute element={<Admin />} /> },
    { path: '/admin/users', element: <PrivateRoute element={<ListUser />} /> },
    { path: '/admin/users/:id', element: <PrivateRoute element={<UseDetail />} /> },
    { path: '/admin/products', element: <PrivateRoute element={<ListProduct />} /> },
    { path: '/admin/add-product', element: <PrivateRoute element={<AddProduct />} /> },
    { path: '/admin/categories', element: <PrivateRoute element={<Categories />} /> },
  ])
  return routes
}

export default App
