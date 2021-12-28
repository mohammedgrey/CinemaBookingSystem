import React from 'react';
import { getAllMovies } from '../requests/movies';
import { useQuery } from 'react-query';
import Loader from '../wrappers/Loader';
import { Grid } from '@mui/material';
import movie from '../interfaces/movie';
import MovieCard from '../components/specific/MovieCard';
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, isLoading } = useQuery('movies', getAllMovies);
  return (
    <Loader isLoading={isLoading}>
      <Grid justifyContent="center" container sx={{ justifyContent: 'center' }}>
        {data?.data?.movies?.map((movie: movie) => {
          return (
            <Grid item key={movie._id} xs={6} sm={4} md={3} lg={2}>
              <MovieCard movie={movie} />
            </Grid>
          );
        })}
      </Grid>
    </Loader>
  );
};
export default Home;
