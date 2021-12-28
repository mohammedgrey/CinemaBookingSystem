import {
  AccountCircle,
  Add,
  AdminPanelSettings,
  Delete,
  Edit,
  Email,
  ManageAccounts,
  Person,
} from '@mui/icons-material';
import { Avatar, Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import ButtonWithConfirmBox from '../components/generic/ButtonWithConfirmBox';
import RoomAddEdit from '../components/specific/RoomAddEdit';
import roles from '../config/roles';
import useGenericModal from '../hooks/popup/useGenericModal';
import room from '../interfaces/room';
import { deleteRoom, getAllRooms } from '../requests/rooms';
import Loader from '../wrappers/Loader';

interface RoomsProps {}

const Rooms: React.FC<RoomsProps> = () => {
  const { data, isLoading, refetch: refetchRooms } = useQuery('rooms', getAllRooms);
  const { openGenericModal } = useGenericModal();

  const rolesIcons: any = {
    [roles.ADMIN]: <AdminPanelSettings />,
    [roles.MANAGER]: <ManageAccounts />,
    [roles.CUSTOMER]: <Person />,
  };
  return (
    <Loader isLoading={isLoading}>
      <Box p={2} pb={0}>
        <Card sx={{ padding: '16px', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
          <Typography fontWeight={700} variant="h5">
            Rooms
          </Typography>
          <Button
            onClick={() => openGenericModal(<RoomAddEdit refetchRooms={refetchRooms} />, 500)}
            sx={{ borderRadius: '20px' }}
            variant="contained"
            startIcon={<Add />}
          >
            Add Room
          </Button>
        </Card>
      </Box>
      <Box sx={{ padding: '0px 16px' }}>
        {data?.data?.rooms?.map((room: room) => {
          return (
            <Card sx={{ marginBlock: '16px' }} key={room._id}>
              <Box
                flexWrap="wrap"
                sx={{ width: '100%', padding: '16px' }}
                display="flex"
                justifyContent="space-between"
              >
                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {room.name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ marginInlineEnd: '16px' }}>{room.seatsNumber}</Avatar>
                    <Typography color="GrayText">Seats</Typography>
                  </Box>
                </Stack>

                <Box>
                  <ButtonWithConfirmBox
                    size="small"
                    sx={{ borderRadius: '20px' }}
                    variant="contained"
                    confirmMessage="Are you sure you want to delete this room?"
                    onClick={async () => {
                      try {
                        const _ = await deleteRoom(room._id as string);
                        refetchRooms();
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
                      openGenericModal(<RoomAddEdit refetchRooms={refetchRooms} room={room} />, 500);
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Loader>
  );
};
export default Rooms;
