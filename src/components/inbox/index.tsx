import { Box, Grid, Typography, Divider, Backdrop, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEmailState } from '../../store/email';
import { useEffect, useState } from 'react';
import { searchInbox, useInboxState } from '../../store/inbox';

const Inbox = () => {
  const email = useAppSelector(useEmailState);
  const inbox = useAppSelector(useInboxState);
  const dispatch = useAppDispatch();
  const [activeMessage, setActiveMessage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Busca emails recebidos
    if (email.id) {
      setLoading(true);
      dispatch(searchInbox(email.id))
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [dispatch, email.id]);

  return (
    <>
      {loading && (
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={4} sx={{ border: '1px solid #ccc' }}>
          <Typography fontSize={25} fontWeight={'bold'}>
            Inbox
          </Typography>
          <Typography fontSize={12}>Selecione um email para visualizar</Typography>
        </Grid>
        <Grid item xs={8} sx={{ border: '1px solid #ccc', backgroundColor: '#e7e7e7' }}></Grid>
        <Grid item xs={4} sx={{ border: '1px solid #ccc', minHeight: '30vh' }}>
          {inbox &&
            inbox.mails.map((item: any, i) => (
              <Box key={i}>
                <Box
                  key={i}
                  onClick={() => setActiveMessage(item)}
                  sx={{ cursor: 'pointer', backgroundColor: '#e7e7e7', mr: 2, p: 1 }}
                >
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '80%',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.headerSubject}
                  </Typography>
                  <Typography
                    color={'primary'}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '80%',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.fromAddr}
                  </Typography>
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '80%',
                      fontSize: 12,
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
        </Grid>
        <Grid item xs={8} sx={{ border: '1px solid #ccc', backgroundColor: '#e7e7e7' }}>
          {activeMessage && (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography fontSize={30} fontWeight={'bold'}>
                {activeMessage.headerSubject}
              </Typography>
              <Typography sx={{ flexGrow: 1, backgroundColor: '#fff', mr: 2, mb: 2, p: 1 }}>
                {activeMessage.text}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default Inbox;
