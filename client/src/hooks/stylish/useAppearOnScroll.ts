import { useEffect, useMemo, useRef, useState } from "react";

const useAppearOnScroll = (overrideOptions?: any) => {
  const options = useMemo(() => {
    return (
      overrideOptions || {
        rootMargin: "0px 0px -20px 0px",
        root: null,
        threshold: 1,
      }
    );
  }, [overrideOptions]);

  const appearOnScrollRef: any = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = appearOnScrollRef.current;
    const observer = new IntersectionObserver((enteries, observer) => {
      enteries.forEach((entery) => {
        if (entery.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      });
    }, options);

    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options, appearOnScrollRef]);

  return {
    appearOnScrollRef,
    visible,
  };
};
export default useAppearOnScroll;
