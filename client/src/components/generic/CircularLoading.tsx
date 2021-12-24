import { Box, CircularProgress } from '@mui/material';
import React from 'react';
interface CircularLoadingProps {
  align?: 'center' | 'end' | 'start';
}

const CircularLoading: React.FC<CircularLoadingProps> = ({ align }) => {
  const positionMap = {
    center: 'center',
    end: 'flex-end',
    start: 'flex-start',
  };
  return (
    <Box display="flex" justifyContent={positionMap[align ?? 'center']}>
      <CircularProgress />
    </Box>
  );
};
export default CircularLoading;
