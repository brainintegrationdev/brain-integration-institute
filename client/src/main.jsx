import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouteProvider } from './providers/RouterProvider'
import { AuthProvider } from './providers/AuthProvider';
import { FileProvider } from './providers/FileProvider';
import { PractitionerProvider } from './providers/PractitionerContext';
import { CloudinaryProvider } from './providers/CloudinaryProvider';
import "./assets/global.css"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>
    <CloudinaryProvider>
      <PractitionerProvider>
      <FileProvider>
        <RouteProvider />
      </FileProvider>
      </PractitionerProvider>
      </CloudinaryProvider>
    </AuthProvider>
   
  </React.StrictMode>
)
