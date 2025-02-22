import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ** MUI Imports
import { ThemeProvider, createTheme } from '@mui/material/styles';

// ** Third Party Imports
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './redux/store'; // Import persistor

const baseTheme = createTheme();

const RootComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={baseTheme}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className={'react-toastify'}
            closeButton={true}
          />
          <ToastContainer />
          <Toaster
            position="top-right"
            containerStyle={{
              top: isAuthenticated ? 120 : 50, // Adjust based on auth status
            }}
            toastOptions={{ className: 'react-hot-toast' }}
          />
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><RootComponent /></Provider>);

reportWebVitals();
