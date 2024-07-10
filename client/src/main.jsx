import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouteProvider } from './providers/RouterProvider'
import { AuthProvider } from './providers/AuthProvider';
import { FileProvider } from './providers/FileProvider';

import './assets/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FileProvider>
        <RouteProvider />
      </FileProvider>
    </AuthProvider>
  </React.StrictMode>
)
