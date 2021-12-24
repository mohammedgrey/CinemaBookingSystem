import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import CustomCardMedia from './CustomCardMedia';
const useStyles = makeStyles((_: any) =>
  createStyles({
    imageOnZoom: {
      width: '100%',
      height: '100%',
      transform: 'scale(1)',
      transition: 'transform 1.5s linear',
    },
    imageOnZoomContainer: {
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        '& $imageOnZoom': {
          transform: 'scale(1.3)',
        },
      },
    },
    overContent: {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%,0%)',
      insetBlockEnd: '20px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

interface PictureZoomOnHoverProps {
  image: string;
  children?: React.ReactNode;
  occupyFullSpace?: boolean;
}

const PictureZoomOnHover: React.FC<PictureZoomOnHoverProps> = ({ image, children, occupyFullSpace }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.imageOnZoomContainer}
      style={{
        width: occupyFullSpace ? '100%' : '300px',
        height: occupyFullSpace ? '100%' : '300px',
      }}
    >
      <CustomCardMedia className={classes.imageOnZoom} src={image} component="img" alt="not found" />
      <div className={classes.overContent}>{children || null}</div>
    </div>
  );
};
export default PictureZoomOnHover;
