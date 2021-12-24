import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const useUser = (): any => {
  return useContext(UserContext);
};
export default useUser;
