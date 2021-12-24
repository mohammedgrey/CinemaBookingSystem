import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } =
    typeof window !== "undefined" ? window : { innerWidth: 0, innerHeight: 0 };
  return {
    width,
    height,
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (typeof window !== "undefined")
      window.addEventListener("resize", handleResize);
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
