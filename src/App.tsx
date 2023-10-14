import { Button, Container, Grid, CssBaseline, ThemeProvider } from '@mui/material';
import AutoRefresh from './components/autoRefresh';
import EmailInput from './components/emailInput';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import Inbox from './components/inbox';
import { theme } from './assets/theme';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer />
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', py: 3 }}>
              <Button variant="outlined" color="primary" sx={{ mb: 5 }}>
                Receber notificações
              </Button>
              <Grid container spacing={2} sx={{ flex: 1 }}>
                <Grid item xs={12} sx={{ border: '1px solid #ccc' }}>
                  <EmailInput />
                  <AutoRefresh />
                </Grid>
                <Grid item container xs={12} sx={{ border: '1px solid #ccc' }}>
                  <Inbox />
                </Grid>
              </Grid>
            </Container>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
