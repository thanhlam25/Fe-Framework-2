import React from 'react';
import './App.css'
import { Route, Routes, useRoutes } from 'react-router-dom';
import Home from './pages/client/home';

function App() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },

  ])
  return routes
}

export default App
