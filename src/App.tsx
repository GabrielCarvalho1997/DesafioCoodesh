import { CssBaseline, ThemeProvider } from '@mui/material';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './assets/theme';
import AppRoutes from './routes';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <CssBaseline />
              <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Flip}
                style={{ width: 'auto', textAlign: 'center' }}
                theme="colored"
              />
              {/* ----- Componente principal ----- */}
              <AppRoutes />
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
