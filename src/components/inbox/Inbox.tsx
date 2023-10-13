import { Box, Grid, Typography, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { searchInbox, useEmailState } from '../../store/email';
import { useEffect, useState } from 'react';

type InboxProps = {
  mails: Array<{
    toAddr: string;
    text: string;
    rawSize: number;
    headerSubject: string;
    fromAddr: string;
    downloadUrl: string;
  }>;
};

const Inbox = () => {
  const email = useAppSelector(useEmailState);
  const dispatch = useAppDispatch();
  const [inbox, setInbox] = useState<InboxProps>({
    mails: [
      {
        toAddr: 'yckuxdhdd@zeroe.ml',
        text: ' chama BB \r\n',
        rawSize: 6836,
        headerSubject:
          'nois aqui denovoaaaaaaaaaaaaaaaaaaa asd awe a     asdasd            gadsadasdaaaaaaaaa asssssssss',
        fromAddr: 'gabrielcoelhoneves@hotmail.com',
        downloadUrl:
          'https://dropmail.me/download/mail/gql:anonym-MY_TOKEN:850ba62f-b30c-406b-8e0b-6b7fb18e0021/202310138dsky7efzen3m3dqhj39kpgqh9dv05yx',
      },
      {
        toAddr: 'yckuxdhdd@zeroe.ml',
        text: 'aopppaa\r\n',
        rawSize: 6820,
        headerSubject: 'fala comigo',
        fromAddr: 'gabrielcoelhoneves@hotmail.com',
        downloadUrl:
          'https://dropmail.me/download/mail/gql:anonym-MY_TOKEN:850ba62f-b30c-406b-8e0b-6b7fb18e0021/20231013pnp3a90ztpy2paf6m7ga2m4888vhbr88',
      },
      {
        toAddr: 'yckuxdhdd@zeroe.ml',
        text: 'testando\r\n',
        rawSize: 6810,
        headerSubject: 'teste',
        fromAddr: 'gabrielcoelhoneves@hotmail.com',
        downloadUrl:
          'https://dropmail.me/download/mail/gql:anonym-MY_TOKEN:850ba62f-b30c-406b-8e0b-6b7fb18e0021/20231013pz19ex3w26w5tg5vn4e678ymgkgra9xq',
      },
    ],
  });
  const [activeMessage, setActiveMessage] = useState<any>(null);

  // useEffect(() => {
  //   // Busca emails recebidos
  //   dispatch(searchInbox(email.id))
  //     .then(res => {
  //       if (res.payload) {
  //         setInbox({ mails: res.payload.data.session.mails });
  //         console.log(res.payload.data.session.mails);
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, [dispatch, email.id, setInbox]);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid item fontSize={20} fontWeight={'bold'} xs={3} sx={{ border: '1px solid #ccc' }}>
        Inbox
      </Grid>
      <Grid item xs={9} sx={{ border: '1px solid #ccc', backgroundColor: '#e7e7e7' }}></Grid>
      <Grid item xs={3} sx={{ border: '1px solid #ccc' }}>
        {inbox &&
          inbox.mails.map((item: any, i) => (
            <>
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
                    fontWeight: 'bold',
                  }}
                >
                  {item.fromAddr}
                </Typography>
                <Typography
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}
                >
                  {item.text}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
            </>
          ))}
      </Grid>
      <Grid item xs={9} sx={{ border: '1px solid #ccc', backgroundColor: '#e7e7e7' }}>
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
  );
};
export default Inbox;
