import { useQuery } from "react-query";

const useQueryWithAFunctionParameter = (
  key: string,
  func: (param: any) => Promise<any>,
  param: any
) => {
  const allReturned = useQuery([key, param], ({ queryKey }) =>
    func(queryKey[1])
  );
  return allReturned;
};
export default useQueryWithAFunctionParameter;
