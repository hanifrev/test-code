import React, { useState } from "react";
import Upload from "./components/Upload";
import ImageViewer from "./components/ImageViewer";
import DrawingCanvas from "./components/DrawingCanvas";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [canvasImage, setCanvasImage] = useState<string>("");

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData);
    setCanvasImage(imageData);
  };

  const handleCanvasUpdate = (canvasDataUrl: string) => {
    setCanvasImage(canvasDataUrl);
  };

  return (
    <div>
      {/* <h1>Image Upload and Drawing</h1> */}
      <Upload onImageUpload={handleImageUpload} />
      {uploadedImage && <ImageViewer imageSrc={uploadedImage} />}
      {canvasImage && (
        <DrawingCanvas
          imageSrc={canvasImage}
          onCanvasUpdate={handleCanvasUpdate}
        />
      )}
    </div>
  );
};

export default App;
