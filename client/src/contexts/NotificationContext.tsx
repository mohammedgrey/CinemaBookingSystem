import { createContext, useState } from 'react';

const NotificationContext: any = createContext(null);

const NotificationProvider = ({ children }: any) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [notificationType, setNotificationType] = useState<'error' | 'success' | 'warning'>('success');

  const notificationDuration = 3000;
  const notify = (message: string, type?: 'error' | 'success' | 'warning') => {
    setNotificationType(type ?? 'success');
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage('');
    }, notificationDuration);
  };
  const notifyAdded = () => {
    notify('Added successfully');
  };
  const notifyRemoved = () => {
    notify('Deleted successfully');
  };
  const notifyUpdated = () => {
    notify('Updated successfully');
  };
  const notifyAddFailed = () => {
    notify('Failed to add!', 'error');
  };
  const notifyRemoveFailed = () => {
    notify('Failed to delete!', 'error');
  };
  const notifyUpdateFailed = () => {
    notify('Failed to update!', 'error');
  };
  const notifyError = () => {
    notify('Oops! Something went wrong ', 'error');
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        notificationMessage,
        notificationType,
        notify,
        notifyAdded,
        notifyRemoved,
        notifyUpdated,
        notifyAddFailed,
        notifyRemoveFailed,
        notifyUpdateFailed,
        notifyError,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
