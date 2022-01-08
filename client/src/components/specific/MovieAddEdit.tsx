//@ts-nocheck
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import movie from '../../interfaces/movie';
import { getAllRooms } from '../../requests/rooms';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ImageUpload from '../generic/ImageUpload';
import { formatImageSrc } from '../../utils/formatHandler';
import SubmitButton from '../generic/SubmitButton';
import { Add, Edit } from '@mui/icons-material';
import { postMovie, updateMovie } from '../../requests/movies';
import useGenericModal from '../../hooks/popup/useGenericModal';
import moment from 'moment';

interface MovieAddEditProps {
  movie?: movie;
  refetchMovies: any;
}

const MovieAddEdit: React.FC<MovieAddEditProps> = ({ movie, refetchMovies }) => {
  //data
  const [movieData, setMovieData] = React.useState<movie>(
    movie
      ? { ...movie, room: movie.room._id }
      : { title: '', date: '', startTime: '', endTime: '', room: '', image: '' }
  );
  const { data: rooms, isLoading: isLoadingRooms } = useQuery('rooms', getAllRooms);

  //States
  const [movieEditAddFailedText, setMovieEditAddFailedText] = React.useState<string>('');

  //Form
  const handleFormChange = (e: any) => setMovieData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleTimeDateChange = (e: any, name: string) => setMovieData((prev) => ({ ...prev, [name]: e }));

  const [isSubmittingForm, setIsSubmittingForm] = React.useState<boolean>(false);
  //For image upload

  const initialImageState = {
    mainState: 'initial', // initial, search, gallery, uploaded
    imageUploaded: 0,
    selectedFile: null,
    searchURL: '',
  };
  const [imageState, setImageState] = React.useState(initialImageState);
  React.useEffect(() => {
    if (movie) {
      setImageState((i) => {
        return {
          ...i,
          mainState: 'uploaded',
          imageUploaded: true,
          selectedFile: formatImageSrc(movie.image),
          fileReader: undefined,
        };
      });
    }
  }, [movie]);
  //End of for image upload

  const { closeGenericModal } = useGenericModal();

  return (
    <Box sx={{ padding: '16px' }}>
      <form
        onSubmit={async (e: any) => {
          e.preventDefault();
          if (!movieData.date) {
            setMovieEditAddFailedText('Please set a date for the movie screening');
            return;
          }

          const endMomentTime = moment(movieData.endTime);
          const startMomentTime = moment(movieData.startTime);
          const startTimeIsPM = startMomentTime.hours() >= 12;
          const endTimeIsAM = endMomentTime.hours() < 12;

          if (!endMomentTime.isAfter(startMomentTime)) {
            if (Math.abs(startMomentTime.hours() - endMomentTime.hour()) >= 12 && !(startTimeIsPM && endTimeIsAM)) {
              setMovieEditAddFailedText('Movie event is too long!');
              return;
            } else if (!(startTimeIsPM && endTimeIsAM)) {
              setMovieEditAddFailedText('End time must be after the start time');
              return;
            }
          }

          if (!movieData.image) {
            setMovieEditAddFailedText('Please select a movie poster');
            return;
          }

          let fd = new FormData();
          for (const property in movieData) {
            fd.append(property, movieData[property]);
          }
          try {
            if (movie) {
              const _ = await updateMovie({ data: fd, id: movie._id });
            } else {
              const _ = await postMovie(fd);
            }
            refetchMovies();
            closeGenericModal();
          } catch (err: any) {
            setMovieEditAddFailedText(err?.response?.data?.message ?? `${movie ? 'Adding' : 'Updating'} Movie Failed!`);
          }
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={2}>
            {/* Movie Title */}
            <TextField
              variant="standard"
              label="Movie Title"
              value={movieData.title}
              required
              onChange={handleFormChange}
              name="title"
            />
            {/* Date */}
            <MobileDatePicker
              minDate={new Date()}
              label="Movie Screening Date"
              inputFormat="MM/dd/yyyy"
              value={new Date(movieData.date)}
              onChange={(e: any) => handleTimeDateChange(e, 'date')}
              renderInput={(params) => <TextField required variant="standard" {...params} />}
            />
            <Box display="flex">
              {/* from  */}
              <TimePicker
                label="Start Time"
                value={new Date(movieData.startTime)}
                onChange={(e: any) => handleTimeDateChange(e, 'startTime')}
                renderInput={(params) => <TextField required variant="standard" {...params} />}
              />
              <Box sx={{ width: '20px' }}></Box>
              {/* to */}
              <TimePicker
                label="End Time"
                value={new Date(movieData.endTime)}
                onChange={(e: any) => handleTimeDateChange(e, 'endTime')}
                renderInput={(params) => <TextField required variant="standard" {...params} />}
              />
            </Box>

            {!isLoadingRooms && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Room</InputLabel>
                <Select
                  label="Select Room"
                  name="room"
                  required
                  sx={{ marginBlockEnd: '16px', textTransform: 'capitalize' }}
                  variant="standard"
                  value={typeof movieData.room === 'string' ? movieData.room : movieData.room._id}
                  onChange={handleFormChange}
                >
                  {rooms?.data?.rooms?.map((room: any) => {
                    return (
                      <MenuItem sx={{ textTransform: 'capitalize' }} key={room._id} value={room._id}>
                        {room.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
            <ImageUpload
              Name="Movie Poster"
              imageState={imageState}
              setImageState={setImageState}
              getTheImage={(image: any) => {
                setMovieData({
                  ...movieData,
                  image: image,
                });
              }}
            />
          </Stack>
        </LocalizationProvider>
        {Boolean(movieEditAddFailedText) && (
          <Typography color="error" align="center" p={2} pb={0}>
            {movieEditAddFailedText}
          </Typography>
        )}
        <SubmitButton
          sx={{ borderRadius: '20px', marginBlock: '16px' }}
          fullWidth
          endIcon={movie ? <Edit /> : <Add />}
          loading={isSubmittingForm}
        >
          {movie ? 'Edit Movie' : 'Add Movie'}
        </SubmitButton>
      </form>
    </Box>
  );
};
export default MovieAddEdit;
