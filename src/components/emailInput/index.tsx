import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchEmail, useEmailState } from '../../store/email';
import { useEffect } from 'react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

const EmailInput = () => {
  const email = useAppSelector(useEmailState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Chama getEmailTemporario assim que o componente for montado
    dispatch(fetchEmail());
  }, [dispatch]);

  //   const variables = {
  //     id: 'U2Vzc2lvbjrPjdcfGvBJFrM_RxXg7flX',
  //   };

  //   // Defina a consulta GraphQL e as variáveis como um objeto JavaScript
  //   const graphqlQuery2 = `
  //    query ($id: ID!) {
  //        session(id:$id) {
  //        mails {
  //            rawSize
  //            fromAddr
  //            toAddr
  //            downloadUrl
  //            text
  //            headerSubject
  //        }
  //        }
  //    }
  //    `;

  //   useEffect(() => {

  //     // Busca email recebidos
  //     axios
  //       .post(`${corsAnywhereUrl}/${apiUrl}`, {
  //         query: graphqlQuery2,
  //         variables,
  //       })
  //       .then(response => {
  //         console.log(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Erro ao chamar a API GraphQL:', error);
  //       });
  //   }, []);

  const handleCopyClick = () => {
    const inputElement = document.getElementById('outlined-adornment-password') as HTMLInputElement;

    if (inputElement) {
      inputElement.select();

      // Copie o texto selecionado
      navigator.clipboard
        .writeText(inputElement.value)
        .then(() => {
          console.log('Texto copiado com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao copiar texto:', error);
        })
        .finally(() => {
          toast.success('Email copiado com sucesso!');
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
          value={email.email}
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
