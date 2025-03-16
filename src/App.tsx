import React from 'react';
import './App.css'
import { Route, Routes, useRoutes } from 'react-router-dom';
import Home from './pages/client/home';
import ProductItem from './components/ProductItem';

function App() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    {
      path: '/test', element: <ProductItem onWishlistToggle={function (id: string): void {
        throw new Error('Function not implemented.');
      }} />
    },

  ])
  return routes
}

export default App
