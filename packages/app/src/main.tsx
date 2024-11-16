import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import { AppProvider } from './components/Provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <Toaster position="bottom-center" />
      <App />
    </AppProvider>
  </React.StrictMode>
);
