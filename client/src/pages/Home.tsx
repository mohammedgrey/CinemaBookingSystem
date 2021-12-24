import React from 'react';
import { getAllMovies } from '../requests/movies';
import { useQuery } from 'react-query';
import Loader from '../wrappers/Loader';
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, isLoading } = useQuery('movies', getAllMovies);
  return <Loader isLoading={isLoading}>{JSON.stringify(data)}</Loader>;
};
export default Home;
