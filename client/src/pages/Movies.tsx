import React from 'react';
import { deleteMovie, getAllMovies } from '../requests/movies';
import { useQuery } from 'react-query';
import Loader from '../wrappers/Loader';
import { Box, Grid, CardMedia, Card, Typography, Chip, Stack, Button } from '@mui/material';
import movie from '../interfaces/movie';

import { formatDate, formatImageSrc, formatTime } from '../utils/formatHandler';
import { AccessTime, Add, Delete, Edit } from '@mui/icons-material';
import ButtonWithConfirmBox from '../components/generic/ButtonWithConfirmBox';
import useGenericModal from '../hooks/popup/useGenericModal';
import MovieAddEdit from '../components/specific/MovieAddEdit';
import { useHistory } from 'react-router-dom';
import PictureZoomOnHover from '../components/generic/PictureZoomOnHover';
interface MoviesProps {}

const Movies: React.FC<MoviesProps> = () => {
  const { data, isLoading, refetch: refetchMovies } = useQuery('movies', getAllMovies);
  const { openGenericModal } = useGenericModal();
  const history = useHistory();
  return (
    <Loader isLoading={isLoading}>
      <Box p={2} pb={0}>
        <Card sx={{ padding: '16px', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
          <Typography fontWeight={700} variant="h5">
            Movies
          </Typography>
          <Button
            onClick={() => openGenericModal(<MovieAddEdit refetchMovies={refetchMovies} />)}
            sx={{ borderRadius: '20px' }}
            variant="contained"
            startIcon={<Add />}
          >
            Add Movie
          </Button>
        </Card>
      </Box>
      <Box sx={{ padding: '8px 16px' }}>
        {data?.data?.movies?.map((movie: movie) => {
          return (
            <Card sx={{ marginBlock: '16px' }} key={movie._id}>
              <Box display="flex">
                <Box
                  onClick={() => history.push(`/movie/${movie._id}`)}
                  sx={{ width: '150px', aspectRatio: '4/5', marginInlineEnd: '16px', cursor: 'pointer' }}
                >
                  <PictureZoomOnHover occupyFullSpace image={formatImageSrc(movie.image)} />
                </Box>
                <Box flexWrap="wrap" sx={{ width: '100%' }} display="flex" justifyContent="space-between">
                  <Stack spacing={2} sx={{ paddingBlock: '16px', flexGrow: 1 }}>
                    <Typography fontWeight={700}>
                      Screening Date <Chip size="small" component="span" label={formatDate(movie.date)} />
                    </Typography>
                    <Typography fontWeight={700}>
                      Screening Room <Chip size="small" component="span" label={movie.room.name} />
                    </Typography>
                    <Typography fontWeight={700}>
                      Begins at{' '}
                      <Chip
                        size="small"
                        component="span"
                        icon={<AccessTime />}
                        color="info"
                        label={formatTime(movie.startTime)}
                      />
                    </Typography>
                    <Typography fontWeight={700}>
                      {' '}
                      Ends at{' '}
                      <Chip
                        size="small"
                        component="span"
                        icon={<AccessTime />}
                        color="warning"
                        label={formatTime(movie.endTime)}
                      />
                    </Typography>
                  </Stack>
                  <Box sx={{ paddingBlock: '16px', alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                    <Typography mr={1} variant="h6" pb={2} fontWeight={700}>
                      {movie.title}
                    </Typography>
                    <Box>
                      <ButtonWithConfirmBox
                        size="small"
                        sx={{ borderRadius: '20px' }}
                        variant="contained"
                        confirmMessage="Are you sure you want to delete this movie?"
                        onClick={async () => {
                          try {
                            const res = await deleteMovie(movie._id as string);
                            refetchMovies();
                          } catch (err: any) {
                            console.log(err);
                          }
                        }}
                        startIcon={<Delete />}
                      >
                        Delete
                      </ButtonWithConfirmBox>

                      <Button
                        size="small"
                        sx={{ borderRadius: '20px', margin: '5px' }}
                        startIcon={<Edit />}
                        variant="outlined"
                        onClick={() => {
                          openGenericModal(<MovieAddEdit refetchMovies={refetchMovies} movie={movie} />);
                        }}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Loader>
  );
};
export default Movies;
