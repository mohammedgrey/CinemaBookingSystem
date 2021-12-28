import React from 'react';
import { useHistory } from 'react-router-dom';
import MovieDetails from '../components/specific/MovieDetails';
import useQueryWithAFunctionParameter from '../hooks/logic/useQueryWithAFunctionParameter';
import { getMovie } from '../requests/movies';
import Loader from '../wrappers/Loader';
interface MovieProps {}

const Movie: React.FC<MovieProps> = () => {
  const history = useHistory();
  const movieId = history.location.pathname.split('/')[2];
  const { data: movieData, isLoading: isLoadingMovie } = useQueryWithAFunctionParameter(
    `movie-${movieId}`,
    getMovie,
    movieId
  );

  return (
    <React.Fragment>
      <Loader isLoading={isLoadingMovie}>
        <MovieDetails movie={movieData?.data?.movie}></MovieDetails>
      </Loader>
    </React.Fragment>
  );
};
export default Movie;
