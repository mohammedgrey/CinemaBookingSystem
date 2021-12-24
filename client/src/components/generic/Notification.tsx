import { useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import icons from '../../config/icons';

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '20px 30px ',
    zIndex: 5000,
    borderRadius: '20px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
  icon: {
    paddingInlineEnd: theme.spacing(2),
  },
  successIcon: {
    color: theme.palette.success.light,
  },
  errorIcon: {
    color: theme.palette.error.light,
  },
  warningIcon: {
    color: theme.palette.warning.light,
  },
}));

interface NotificationProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  open: boolean;
}

const Notification: React.FC<NotificationProps> = ({ type, message, open }) => {
  const classes = useStyles();
  const theme: any = useTheme();
  if (!open) return null;

  const iconsForType = {
    success: <icons.success fontSize="large" className={classes.icon} />,
    error: <icons.error fontSize="large" className={classes.icon} />,
    warning: <icons.warning fontSize="large" className={classes.icon} />,
  };

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor:
          type === 'error'
            ? theme.palette.error.main
            : type === 'warning'
            ? theme.palette.warning.main
            : theme.palette.success.main,
      }}
    >
      {iconsForType[type]}
      {message}
    </div>
  );
};
export default Notification;
