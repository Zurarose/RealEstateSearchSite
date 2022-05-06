import React, { createContext, useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/lab/Alert';
import { Snackbar, SnackbarContent } from '@mui/material';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
  snackType?: 'snack' | '';
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
    snackType: '',
  });
  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      {alert.snackType === 'snack' ? (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={alert.show}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <SnackbarContent
            sx={{ display: 'flex', justifyContent: 'center' }}
            message={alert.message}
          />
        </Snackbar>
      ) : (
        <Snackbar
          open={alert.show}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
            {alert.message}
          </MuiAlert>
        </Snackbar>
      )}
    </UIContext.Provider>
  );
};
