//@ts-nocheck
import { Add, Edit } from '@mui/icons-material';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useGenericModal from '../../hooks/popup/useGenericModal';
import room from '../../interfaces/room';
import { postRoom, updateRoom } from '../../requests/rooms';
import SubmitButton from '../generic/SubmitButton';

interface RoomAddEditProps {
  room?: room;
  refetchRooms: any;
}

const RoomAddEdit: React.FC<RoomAddEditProps> = ({ room, refetchRooms }) => {
  //data
  const [roomData, setRoomData] = React.useState<room>(
    room
      ? { name: room.name, seatsNumber: room.seatsNumber }
      : {
          name: '',
          seatsNumber: 20,
        }
  );

  //States
  const [roomEditAddFailedText, setRoomEditAddFailedText] = React.useState<string>('');

  //Form
  const handleFormChange = (e: any) => setRoomData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const [isSubmittingForm, setIsSubmittingForm] = React.useState<boolean>(false);

  const { closeGenericModal } = useGenericModal();

  return (
    <Box sx={{ padding: '16px' }}>
      <form
        onSubmit={async (e: any) => {
          e.preventDefault();

          try {
            if (room) {
              setIsSubmittingForm(true);
              const _ = await updateRoom({ data: roomData, id: room._id });
            } else {
              setIsSubmittingForm(true);

              const _ = await postRoom(roomData);
            }
            refetchRooms();
            closeGenericModal();
          } catch (err: any) {
            setRoomEditAddFailedText(err?.response?.data?.message ?? `${room ? 'Adding' : 'Updating'} Room Failed!`);
          } finally {
            setIsSubmittingForm(false);
          }
        }}
      >
        <Stack spacing={2}>
          {/* Room Title */}
          <TextField
            variant="standard"
            label="Room Name"
            value={roomData.title}
            required
            onChange={handleFormChange}
            name="name"
          />
          <FormControl fullWidth>
            <InputLabel>Number of seats</InputLabel>
            <Select
              label="Number of seats"
              name="seatsNumber"
              required
              sx={{ marginBlockEnd: '16px', textTransform: 'capitalize' }}
              variant="standard"
              value={roomData.seatsNumber}
              onChange={handleFormChange}
            >
              {[20, 30, 40, 50, 60, 70, 80, 90, 100].map((room: any) => {
                return (
                  <MenuItem key={room} value={room}>
                    {room}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>

        {Boolean(roomEditAddFailedText) && (
          <Typography color="error" align="center" p={2} pb={0}>
            {roomEditAddFailedText}
          </Typography>
        )}
        <SubmitButton
          sx={{ borderRadius: '20px', marginBlock: '16px' }}
          fullWidth
          endIcon={room ? <Edit /> : <Add />}
          loading={isSubmittingForm}
        >
          {room ? 'Edit Room' : 'Add Room'}
        </SubmitButton>
      </form>
    </Box>
  );
};
export default RoomAddEdit;
