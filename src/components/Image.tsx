import { useState } from "react";

type ImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export default function Image({ src, alt, height}: ImageProps) {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      <img
        src={src}
        loading="lazy"
        style={{
          transition: "opacity 0.25s ease-in-out",
          height: height,
          width: "100%"
        }}
        alt={alt}
        onError={() => {
          setIsError(true);
        }}
      />
    </>
  );
}
