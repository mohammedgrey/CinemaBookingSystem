import Modal from '@mui/material/Modal';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React, { ReactNode } from 'react';
import useGenericModal from '../../hooks/popup/useGenericModal';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      maxWidth: '95%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      maxHeight: '90%',
      overflow: 'auto',
    },
  })
);

interface GenericModalProps {
  open: boolean;
  body: ReactNode;
}
const GenericModal: React.FC<GenericModalProps> = ({ open, body }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const { closeGenericModal } = useGenericModal();

  return (
    <div>
      <Modal
        open={open || false}
        onClose={(_: any, reason: string) => {
          if (reason === 'backdropClick') closeGenericModal();
          if (reason === 'escapeKeyDown') closeGenericModal();
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          {body}
        </div>
      </Modal>
    </div>
  );
};

export default GenericModal;
