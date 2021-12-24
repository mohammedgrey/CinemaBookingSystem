import { Button, IconButton, Typography } from '@mui/material';
import { ReactNode } from 'react';
import useCommonStyles from '../../styles/mui/common';
import React from 'react';
import useGenericModal from '../../hooks/popup/useGenericModal';

interface ButtonWithConfirmBoxProps {
  onClick: any;
  children: ReactNode;
  confirmMessage: string;
  isIconButton?: boolean;
  [key: string]: any;
}

const ButtonWithConfirmBox: React.FC<ButtonWithConfirmBoxProps> = ({
  onClick,
  children,
  confirmMessage,
  isIconButton,
  ...rest
}) => {
  const { openGenericModal, closeGenericModal } = useGenericModal();
  const commonClasses = useCommonStyles();
  const handleClick = () => {
    openGenericModal(
      <div style={{ padding: '16px' }}>
        <Typography paddingBottom={2}>{confirmMessage}</Typography>
        <div className={commonClasses.flexEnd}>
          <div className={commonClasses.marginInlineEnd}>
            <Button variant="contained" color="inherit" onClick={() => closeGenericModal()}>
              Cancel
            </Button>
          </div>
          <Button
            variant="contained"
            onClick={() => {
              onClick();
              closeGenericModal();
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    );
  };

  if (isIconButton)
    return (
      <IconButton {...rest} onClick={handleClick}>
        {children}
      </IconButton>
    );
  return (
    <Button {...rest} onClick={handleClick}>
      {children}
    </Button>
  );
};
export default ButtonWithConfirmBox;
