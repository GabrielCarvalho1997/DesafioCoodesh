import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchEmail, useEmailState } from '../../store/email';
import { useEffect } from 'react';

const EmailInput = () => {
  const email = useAppSelector(useEmailState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Verifique se a última busca foi feita há mais de 10 minutos
    const lastFetchTime = localStorage.getItem('lastFetchTime');
    const currentTime = new Date().getTime();

    if (!lastFetchTime || currentTime - Number(lastFetchTime) > 10 * 60 * 1000) {
      // Se passaram mais de 10 minutos ou se nenhum lastFetchTime estiver definido, chame fetchEmail
      dispatch(fetchEmail());
      // Atualize o lastFetchTime no localStorage
      localStorage.setItem('lastFetchTime', String(currentTime));
    }
    // Defina um intervalo para verificar e chamar fetchEmail a cada 10 minutos
    const fetchEmailInterval = setInterval(() => {
      dispatch(fetchEmail());
      // Atualize o lastFetchTime no localStorage
      localStorage.setItem('lastFetchTime', String(new Date().getTime()));
    }, 10 * 60 * 1000); // 10 minutos

    // Limpe o intervalo quando o componente for desmontado
    return () => {
      clearInterval(fetchEmailInterval);
    };
  }, [dispatch]);

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: 2,
      }}
    >
      <FormControl variant="outlined" sx={{ width: '50%' }}>
        <InputLabel htmlFor="outlined-adornment-password" shrink sx={{ fontWeight: 'bold' }}>
          Your temporary email address
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          sx={{ mt: 1 }}
          size="small"
          value={email.addresses[0].address}
          fullWidth
          readOnly
          endAdornment={
            <InputAdornment position="end">
              <Button onClick={handleCopyClick}>
                <ContentCopyIcon />
                Copy
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default EmailInput;
