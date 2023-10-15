import { Container, Grid } from '@mui/material';
import EmailInput from '../../components/emailInput';
import AutoRefresh from '../../components/autoRefresh';
import Inbox from '../../components/inbox';
import ButtonNotification from '../../components/buttonNotification';

const Home = () => {
  return (
    <Container component="main" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', py: 3 }}>
      {/* Botão de notificação */}
      <ButtonNotification />
      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid item xs={12} sx={{ border: '1px solid #ccc' }}>
          {/* Input onde o email é gerado */}
          <EmailInput />
          {/* Atualização automática dos emails recebidos */}
          <AutoRefresh />
        </Grid>
        <Grid item container xs={12} sx={{ border: '1px solid #ccc' }}>
          {/* Caixa de entrada de emails */}
          <Inbox />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
