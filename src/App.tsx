import { Button, Container, Grid } from '@mui/material';
import AutoRefresh from './components/autoRefresh';
import EmailInput from './components/emailInput';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <Container component="main">
            <Button variant="outlined" color="primary" sx={{ mb: 5 }}>
              Receber notificações
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ border: '1px solid #ccc', pb: 5 }}>
                <EmailInput />
                <AutoRefresh />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ border: '1px solid #ccc' }}>
                Inbox
              </Grid>
              <Grid item xs={12} sm={8} sx={{ border: '1px solid #ccc' }}>
                teste
              </Grid>
            </Grid>
          </Container>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
