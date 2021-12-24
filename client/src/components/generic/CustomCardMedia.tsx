import { CardMedia } from '@mui/material';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import React from 'react';

interface CustomCardMediaProps {
  src: string;
  component?: 'video' | 'audio' | 'picture' | 'iframe' | 'img';
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

const CustomCardMedia: React.FC<CustomCardMediaProps> = ({ src, component, className, style, ...rest }) => {
  const stillMounted = useRef(true);
  useEffect(() => {
    return () => {
      stillMounted.current = false;
    };
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  function onLoad() {
    if (stillMounted.current) setIsLoading(false);
  }

  const defaultImageSource = `images/default.jpg`;

  //for cached images that don't trigger the onLoad event
  const imageRef = useRef<any>(null);
  useEffect(() => {
    if (imageRef?.current?.complete && stillMounted.current) setIsLoading(false);
  }, []);

  return (
    <>
      <CardMedia
        {...rest}
        component={component ?? 'img'}
        src={defaultImageSource}
        style={{ ...(style ?? {}), display: isLoading ? 'inline' : 'none' }}
        className={className}
      />
      <CardMedia
        {...rest}
        component={component ?? 'img'}
        src={src}
        style={{ ...(style ?? {}), display: isLoading ? 'none' : 'inline' }}
        onLoad={onLoad}
        ref={imageRef}
        className={className}
        onError={(event: any) => {
          event.target.src = defaultImageSource;
          event.onerror = null;
        }}
      />
    </>
  );
};

export default CustomCardMedia;
