import { useEffect } from 'react';
import useNotification from '../popup/useNotification';

const useConnectivityDetection = () => {
  const { notify } = useNotification();

  useEffect(() => {
    const becameOffline = () => {
      notify('Check your internet connection!', 'error');
    };
    const backOnline = () => {
      notify('Yaay! you are back online.', 'success');
    };
    window.addEventListener('online', backOnline);
    window.addEventListener('offline', becameOffline);
    return () => {
      window.removeEventListener('online', backOnline);
      window.removeEventListener('offline', becameOffline);
    };
  }, [notify]);
};

export default useConnectivityDetection;
