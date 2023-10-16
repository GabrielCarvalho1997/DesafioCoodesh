import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEmailState } from '../../store/email';
import { searchInbox } from '../../store/inbox';

function AutoRefresh() {
  const [progress, setProgress] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const email = useAppSelector(useEmailState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 0 ? prevProgress - 100 / 15 : 0));
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1);
    }, 1000);

    // Quando o tempo restante chegar a 0, redefine o progresso e o tempo restante
    if (timeRemaining === 0) {
      clearInterval(timer);
      setProgress(100);
      setTimeRemaining(15);

      // Busca emails recebidos
      dispatch(searchInbox(email.id));
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2, gap: 1 }}>
      <Typography fontSize={12}>Autorefresh in</Typography>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
        }}
      >
        <CircularProgress variant="determinate" value={progress} size={30} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${timeRemaining}s`}
          </Typography>
        </Box>
      </Box>
      <Button size="small" onClick={() => dispatch(searchInbox(email.id))}>
        <RefreshIcon />
        Refresh
      </Button>
    </Box>
  );
}

export default AutoRefresh;
