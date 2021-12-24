import { Button, CircularProgress } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { ReactNode } from 'react';
import React from 'react';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    icon: {
      marginInlineEnd: theme.spacing(2),
    },
  })
);
interface SubmitButtonProps {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'text' | 'contained' | 'outlined' | undefined;
  [key: string]: any;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, loading, variant, disabled, ...rest }) => {
  const classes = useStyles();
  return (
    <Button
      variant={variant || 'contained'}
      color="primary"
      {...rest}
      type="submit"
      disabled={loading || disabled}
      startIcon={loading ? <CircularProgress className={classes.icon} size={15} /> : null}
    >
      {children}
    </Button>
  );
};
export default SubmitButton;
