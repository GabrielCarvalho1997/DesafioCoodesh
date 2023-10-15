import { Container, Grid } from '@mui/material';
import EmailInput from '../../components/emailInput';
import Inbox from '../../components/inbox';
import ButtonNotification from '../../components/buttonNotification';

const Home = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', py: 3 }}>
      {/* Botão de notificação */}
      <ButtonNotification />
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ border: '1px solid #ccc', pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Input onde o email é gerado */}
          <EmailInput />
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
