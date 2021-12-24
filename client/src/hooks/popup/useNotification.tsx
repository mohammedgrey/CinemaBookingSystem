import { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";

const useNotification = (): any => {
  return useContext(NotificationContext);
};

export default useNotification;
