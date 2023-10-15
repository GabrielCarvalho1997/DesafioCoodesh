import { useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../store';
import { useInboxState } from '../../store/inbox';

const ButtonNotification = () => {
  const inbox = useAppSelector(useInboxState);
  const previousMails = useRef(inbox.mails);
  const isTabFocused = useRef(true);

  const handleNotifications = () => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        toast.success('Notificações ativadas.');
      } else {
        toast.error('Notificações desativadas. Você pode ativá-las nas configurações do seu navegador.');
      }
    });
  };

  useEffect(() => {
    window.addEventListener('visibilitychange', () => {
      isTabFocused.current = document.visibilityState === 'visible';
    });

    // Comparar o array de mails atual com o anterior
    if (inbox.mails.length > 0 && JSON.stringify(inbox.mails) !== JSON.stringify(previousMails.current)) {
      // Verificar se a guia está atualmente focada
      if (!isTabFocused.current) {
        const notification = new Notification('Novo email recebido', {
          body: 'Verifique o inbox para visualizar a mensagem.',
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      } else {
        // Guia está focada, disparar notificação no navegador
        toast.info('Você tem um novo email na caixa de entrada.', {
          autoClose: 5000,
        });
      }

      previousMails.current = inbox.mails;
    }
  }, [inbox.mails]);

  return (
    <Button variant="outlined" color="primary" sx={{ mb: 5 }} onClick={handleNotifications}>
      Receber notificações
    </Button>
  );
};

export default ButtonNotification;
