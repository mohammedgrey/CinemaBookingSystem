import { AccessTime } from '@mui/icons-material';
import { Card, CardMedia, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router-dom';
import movie from '../../interfaces/movie';
import { formatDate, formatImageSrc, formatTime } from '../../utils/formatHandler';
import PictureZoomOnHover from '../generic/PictureZoomOnHover';
interface MovieCardProps {
  movie: movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const history = useHistory();
  const theme: any = useTheme();
  return (
    <Card
      onClick={() => {
        history.push('/movie/' + movie._id);
      }}
      sx={{
        '&:hover': { boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' },
        margin: '8px',
        maxWidth: '250px',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ width: '100%', aspectRatio: '3/4' }}>
        <PictureZoomOnHover occupyFullSpace image={formatImageSrc(movie.image)} />
      </Box>
      <Box p={1}>
        <Typography
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          variant="h6"
          pb={1}
          fontWeight={700}
        >
          {movie.title}
        </Typography>
        <Typography mb={1} variant="body2" color="GrayText">
          {formatDate(movie.date)}
        </Typography>

        <Typography sx={{ verticalAlign: 'middle' }} variant="body2" fontWeight={900}>
          <AccessTime color="disabled" sx={{ fontSize: '22px', verticalAlign: 'middle', marginRight: '8px' }} />
          {formatTime(movie.startTime)}
          <span style={{ marginInline: '8px', color: 'grey', fontWeight: 500 }}>To</span>
          {formatTime(movie.endTime)}
        </Typography>
      </Box>
    </Card>
  );
};
export default MovieCard;
