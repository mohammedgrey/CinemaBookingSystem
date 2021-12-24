import { useContext } from 'react';
import { GenericModalContext } from '../../contexts/GenericModalContext';

const useGenericModal = (): any => {
  return useContext(GenericModalContext);
};

export default useGenericModal;
