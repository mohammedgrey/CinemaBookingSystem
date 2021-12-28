import { AccessTime, EventSeat } from '@mui/icons-material';
import { Avatar, Button, CardMedia, Chip, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQueryWithAFunctionParameter from '../../hooks/logic/useQueryWithAFunctionParameter';
import useGenericModal from '../../hooks/popup/useGenericModal';
import useUser from '../../hooks/system/useUser';
import movie from '../../interfaces/movie';
import { getMovieReservations } from '../../requests/movies';
import useCommonStyles from '../../styles/mui/common';
import { formatDate, formatImageSrc, formatTime } from '../../utils/formatHandler';
import Loader from '../../wrappers/Loader';
import CreditCard from './CreditCard';
interface MovieDetailsProps {
  movie: movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const {
    data: reservationData,
    isLoading: isLoadingReservation,
    refetch: refetchMovieReservations,
  } = useQueryWithAFunctionParameter(`movie-reservations-${movie._id}`, getMovieReservations, movie._id);
  const [reservedSeats, setReservedSeats] = useState<Array<number>>([]);
  const history = useHistory();
  const { isLoggedIn, user } = useUser();
  const { openGenericModal, closeGenericModal } = useGenericModal();
  const commonClasses = useCommonStyles();

  return (
    <Grid container columnSpacing={2} sx={{ paddingBlockEnd: '16px' }}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardMedia sx={{ width: '100%', aspectRatio: '3/4' }} component="img" src={formatImageSrc(movie.image)} />
        <Typography
          sx={{ backgroundColor: '#2e2e2e' }}
          color="white"
          align="center"
          variant="h4"
          p={2}
          fontWeight={700}
        >
          {movie.title}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={9}>
        <Stack mx={2} mt={2} spacing={2}>
          <Typography fontWeight={700}>
            Screening Date <Chip size="small" component="span" label={formatDate(movie.date)} />
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
          <Typography variant="h5" fontWeight={700} align="center">
            {movie.room.name}
          </Typography>
          <Loader isLoading={isLoadingReservation}>
            <Grid container justifyContent="space-between">
              <Grid item xs={12} md={6}>
                <Typography align="center" fontWeight={700} color="GrayText">
                  <span style={{ color: '#d32f2f' }}>{reservationData?.data?.reservations?.length ?? 0}</span> /
                  {movie?.room?.seatsNumber ?? 0} Reserved seats
                </Typography>
                {new Array(movie?.room?.seatsNumber ? movie?.room?.seatsNumber / 5 : 0)
                  .fill(0)
                  .map((_: number, index: number) => {
                    return (
                      <Box display="flex" justifyContent="center" key={index}>
                        {new Array(5).fill(0).map((_: number, indexInner: number) => {
                          const currentSeatNumber = indexInner + index * 5 + 1;
                          const isSeatReserved = reservationData?.data?.reservations?.includes(currentSeatNumber);
                          const wantToReserve = reservedSeats.includes(currentSeatNumber);
                          return (
                            <Tooltip
                              title={isSeatReserved ? 'Seat Reserved' : wantToReserve ? 'Unselect Seat' : 'Select Seat'}
                              key={currentSeatNumber}
                            >
                              <EventSeat
                                onClick={
                                  isSeatReserved
                                    ? undefined
                                    : () => {
                                        if (!isLoggedIn) {
                                          openGenericModal(
                                            <div style={{ padding: '16px' }}>
                                              <Typography mb={2} fontWeight={700}>
                                                You have to be signed in to reserve seats. Would you like to go to the
                                                sign in page?
                                              </Typography>
                                              <div className={commonClasses.flexEnd}>
                                                <div className={commonClasses.marginInlineEnd}>
                                                  <Button
                                                    sx={{ borderRadius: '20px' }}
                                                    variant="contained"
                                                    color="inherit"
                                                    onClick={() => closeGenericModal()}
                                                  >
                                                    Not Now
                                                  </Button>
                                                </div>
                                                <Button
                                                  sx={{ borderRadius: '20px' }}
                                                  variant="contained"
                                                  onClick={() => {
                                                    history.push('/login');
                                                    closeGenericModal();
                                                  }}
                                                >
                                                  Sign in Now
                                                </Button>
                                              </div>
                                            </div>
                                          );
                                          return;
                                        }
                                        const indexOfSeat = reservedSeats.findIndex((el) => el === currentSeatNumber);
                                        if (indexOfSeat === -1) {
                                          //not selected, add it
                                          setReservedSeats((prev) => [...prev, currentSeatNumber]);
                                        } //Selected, remove it
                                        else {
                                          setReservedSeats((prev) => prev.filter((el) => el !== currentSeatNumber));
                                        }
                                      }
                                }
                                sx={{
                                  cursor: isSeatReserved ? 'not-allowed' : 'pointer',
                                  marginInline: '5px',
                                  fontSize: '50px',
                                }}
                                color={isSeatReserved ? 'error' : wantToReserve ? 'disabled' : 'success'}
                              />
                            </Tooltip>
                          );
                        })}
                      </Box>
                    );
                  })}
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="space-between" flexDirection="column" alignItems="center">
                  <Avatar> {`${reservedSeats.length}`}</Avatar>
                  <Typography mt={1} mb={4}>
                    Selected Seats
                  </Typography>
                  <Button
                    sx={{ borderRadius: '20px' }}
                    onClick={() => {
                      openGenericModal(
                        <CreditCard
                          refetchMovieReservations={refetchMovieReservations}
                          movie={movie._id as string}
                          user={user._id}
                          reservedSeats={reservedSeats}
                          setReservedSeats={setReservedSeats}
                        />
                      );
                    }}
                    disabled={!reservedSeats.length}
                    variant="contained"
                  >
                    Reserve
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Loader>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default MovieDetails;
