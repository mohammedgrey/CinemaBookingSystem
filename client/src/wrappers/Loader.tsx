import React from 'react';
import CircularLoading from '../components/generic/CircularLoading';
interface LoaderProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ children, isLoading }) => {
  if (isLoading) return <CircularLoading />;
  //if not loading
  return <React.Fragment>{children}</React.Fragment>;
};
export default Loader;
