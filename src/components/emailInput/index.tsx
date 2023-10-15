import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchEmail, useEmailState } from '../../store/email';
import { useEffect, useState } from 'react';
import AutoRefresh from '../autoRefresh';
import { inboxActions, inboxSlice } from '../../store/inbox';

const EmailInput = () => {
  const email = useAppSelector(useEmailState);
  const dispatch = useAppDispatch();
  const [showButton, setShowButton] = useState(!localStorage.getItem('persist:email'));
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const lastFetchTime = localStorage.getItem('persist:email');
    const currentTime = new Date().getTime();

    if (!lastFetchTime || currentTime - Number(lastFetchTime) > 10 * 60 * 1000) {
      setShowButton(true);
    }
  }, []);

  const generateEmail = () => {
    setLoading(true);
    dispatch(fetchEmail()).finally(() => {
      setLoading(false);
    });

    // Defina um timeout de 10 minutos para limpar o localStorage
    setTimeout(() => {
      localStorage.removeItem('persist:email');
      dispatch(inboxActions.setInbox(inboxSlice.getInitialState()));
      setShowButton(true);
      toast.warning('Email expirado! Clique no botão para gerar um novo.');
    }, 10 * 60 * 1000);

    setShowButton(false);
  };

  const handleCopyClick = () => {
    const inputElement = document.getElementById('outlined-adornment-password') as HTMLInputElement;

    if (inputElement) {
      inputElement.select();

      // Copie o texto selecionado
      navigator.clipboard
        .writeText(inputElement.value)
        .then(() => {
          toast.success('Email copiado com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao copiar texto:', error);
        });

      inputElement.blur();
    }
  };

  return (
    <>
      {loading && (
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {showButton ? (
          <Button variant="contained" onClick={generateEmail}>
            Gerar Email
          </Button>
        ) : (
          <>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" shrink sx={{ fontWeight: 'bold' }}>
                Seu endereço de email temporário
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                sx={{ mt: 1 }}
                size="medium"
                value={email.addresses[0].address}
                fullWidth
                readOnly
                endAdornment={
                  <InputAdornment position="end">
                    <Button onClick={handleCopyClick}>
                      <ContentCopyIcon />
                      Copiar
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
            {/* Atualização automática dos emails recebidos */}
            <AutoRefresh />
          </>
        )}
      </Box>
    </>
  );
};

export default EmailInput;
