import { useRef, useState } from "react";

type ImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  fallbackSrc?: string;
};

export default function Image({ src, alt, style, fallbackSrc, height, ...props }: ImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      {!isLoaded && <div>loading</div>}
      <img
        {...props}
        ref={imgRef}
        src={src}
        loading="lazy"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
          height: isLoaded ? height : 0,
          width: "100%"
        }}
        alt={alt}
        onError={(e) => {
          if (fallbackSrc) {
            if (e.currentTarget.src === fallbackSrc) {
              setIsError(true);
              return;
            }
            imgRef.current?.setAttribute("src", fallbackSrc);
            return;
          }
          setIsError(true);
        }}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
}
