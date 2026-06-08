import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import Context from './utils/Context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
        <ToastContainer 
          position="bottom-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="dark" 
        />
      </BrowserRouter>
    </Context>
  </StrictMode>
);
