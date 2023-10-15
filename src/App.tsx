import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { theme } from './assets/theme';
import Home from './pages/home';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer />
            {/* ----- Componente principal ----- */}
            <Home />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
