import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ToastProps {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  open: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, severity, open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={3000}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;