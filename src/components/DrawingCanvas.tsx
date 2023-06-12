import React, { useEffect, useRef, useState } from "react";

interface DrawingCanvasProps {
  imageSrc: string;
  onCanvasUpdate: (canvasDataUrl: string) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  imageSrc,
  onCanvasUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = imageSrc;
  }, [imageSrc]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    saveCanvas();
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasDataUrl = canvas.toDataURL();
    onCanvasUpdate(canvasDataUrl);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      width="900"
      height="900"
    ></canvas>
  );
};

export default DrawingCanvas;
