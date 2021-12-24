//Reference article for this custom hook
//https://blog.webdevsimplified.com/2019-11/how-to-write-custom-hooks/

import { useEffect, useState } from "react";
export default function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
