import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';

const EmailInput = () => {
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
