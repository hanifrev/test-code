import React from "react";

interface ImageViewerProps {
  imageSrc: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageSrc }) => {
  return (
    <div>
      <img style={{ display: "none" }} src={imageSrc} alt="Uploaded Image" />
    </div>
  );
};

export default ImageViewer;
