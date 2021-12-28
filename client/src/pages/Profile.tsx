import { AccessTime, Close, Done } from '@mui/icons-material';
import { Box, Card, Typography, Avatar, Chip, Button, Hidden } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import ButtonWithConfirmBox from '../components/generic/ButtonWithConfirmBox';
import useNotification from '../hooks/popup/useNotification';
import useUser from '../hooks/system/useUser';
import { deleteReservation, getMyReservations } from '../requests/reservations';
import { formatDate, formatImageSrc, formatTime } from '../utils/formatHandler';
import Loader from '../wrappers/Loader';
interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  console.log('profile');
  const { data, isLoading, refetch: refetchReservations } = useQuery('reservations-me', getMyReservations);
  const { notify } = useNotification();
  const { logoutUser } = useUser();
  return (
    <React.Fragment>
      <Hidden smUp>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={() => logoutUser()}>Sign out</Button>
        </Box>
      </Hidden>
      <Loader isLoading={isLoading}>
        <React.Fragment>
          <Typography p={2} pb={0} variant="h6" fontWeight={700}>
            {data?.results ?? 0} {data?.results > 1 ? 'Reservations' : 'Reservation'}
          </Typography>
          {data?.data?.reservations?.map((reservation: any, index: number) => {
            return (
              <Box sx={{ margin: '16px' }} key={index}>
                <Card sx={{ padding: '8px' }}>
                  <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    <Box mb={2}>
                      <Typography mb={1} fontWeight={700}>
                        Reservation No.{' '}
                        <Chip size="small" component="span" color="success" icon={<Done />} label={reservation?._id} />
                      </Typography>
                      <Typography fontWeight={700}>
                        Number of seats:{' '}
                        <Chip component="span" color="warning" label={`${reservation?.reservedSeats.length}`} />
                      </Typography>
                    </Box>
                    <div>
                      <ButtonWithConfirmBox
                        sx={{ marginBottom: '16px', borderRadius: '20px' }}
                        confirmMessage={'Are you sure you want to cancel this reservation?'}
                        variant="outlined"
                        startIcon={<Close />}
                        onClick={async () => {
                          try {
                            const _ = await deleteReservation(reservation?._id);
                            refetchReservations();
                          } catch (err: any) {
                            notify(err?.response?.data?.message ?? 'Oops! Something went wrong.', 'error');
                          }
                        }}
                      >
                        Cancel reservation
                      </ButtonWithConfirmBox>
                    </div>
                  </Box>
                  <Box display="flex">
                    <Avatar
                      sx={{ width: '70px', height: '70px', marginInlineEnd: '16px' }}
                      src={formatImageSrc(reservation?.movie?.image)}
                    />
                    <div>
                      <Typography fontWeight={700}> {reservation?.movie?.title ?? ''}</Typography>
                      <Typography mb={1} variant="body2" color="GrayText">
                        {formatDate(reservation?.movie?.date ?? '')}
                      </Typography>
                      <Typography sx={{ verticalAlign: 'middle' }} variant="body2" fontWeight={900}>
                        <AccessTime
                          color="disabled"
                          sx={{ fontSize: '22px', verticalAlign: 'middle', marginRight: '8px' }}
                        />
                        {formatTime(reservation?.movie?.startTime ?? '')}
                        <span style={{ marginInline: '8px', color: 'grey', fontWeight: 500 }}>To</span>
                        {formatTime(reservation?.movie?.endTime ?? '')}
                      </Typography>
                    </div>
                  </Box>
                </Card>
              </Box>
            );
          })}
        </React.Fragment>
      </Loader>
    </React.Fragment>
  );
};
export default Profile;
