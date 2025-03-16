import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'  // Import HelmetProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>  {/* Bọc ứng dụng bằng HelmetProvider */}
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </HelmetProvider>
)
