import React, { useState, useRef, useEffect } from "react";

interface Shape {
  id: string;
  type: "square" | "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ShapeEditorProps {
  imageWidth: number;
  imageHeight: number;
}

const ShapeEditor: React.FC<ShapeEditorProps> = ({
  imageWidth,
  imageHeight,
}) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image
    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Draw the shapes
      shapes.forEach((shape) => {
        const { x, y, width, height } = shape;
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(x, y, width, height);

        if (shape.id === selectedShapeId) {
          context.lineWidth = 2;
          context.strokeStyle = "red";
          context.strokeRect(x, y, width, height);
        }
      });
    };
    image.src = canvas.toDataURL();
  }, [shapes, selectedShapeId]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const clickedShape = shapes.find((shape) => {
      return (
        offsetX >= shape.x &&
        offsetX <= shape.x + shape.width &&
        offsetY >= shape.y &&
        offsetY <= shape.y + shape.height
      );
    });

    setSelectedShapeId(clickedShape ? clickedShape.id : null);
  };

  const handleAddSquare = () => {
    const newSquare: Shape = {
      id: `square-${Date.now()}`,
      type: "square",
      x: Math.floor(Math.random() * (imageWidth - 100)),
      y: Math.floor(Math.random() * (imageHeight - 100)),
      width: 100,
      height: 100,
    };

    setShapes((prevShapes) => [...prevShapes, newSquare]);
  };

  const handleAddRectangle = () => {
    const newRectangle: Shape = {
      id: `rectangle-${Date.now()}`,
      type: "rectangle",
      x: Math.floor(Math.random() * (imageWidth - 150)),
      y: Math.floor(Math.random() * (imageHeight - 100)),
      width: 150,
      height: 100,
    };

    setShapes((prevShapes) => [...prevShapes, newRectangle]);
  };

  const handleRemoveShape = () => {
    if (selectedShapeId) {
      setShapes((prevShapes) =>
        prevShapes.filter((shape) => shape.id !== selectedShapeId)
      );
      setSelectedShapeId(null);
    }
  };

  const handleMoveShape = (event: React.KeyboardEvent) => {
    if (selectedShapeId) {
      const shapeIndex = shapes.findIndex(
        (shape) => shape.id === selectedShapeId
      );
      if (shapeIndex !== -1) {
        const shape = shapes[shapeIndex];
        let x = shape.x;
        let y = shape.y;

        switch (event.key) {
          case "ArrowUp":
            y -= 10;
            break;
          case "ArrowDown":
            y += 10;
            break;
          case "ArrowLeft":
            x -= 10;
            break;
          case "ArrowRight":
            x += 10;
            break;
          default:
            return;
        }

        const updatedShape = { ...shape, x, y };
        setShapes((prevShapes) => {
          const updatedShapes = [...prevShapes];
          updatedShapes.splice(shapeIndex, 1, updatedShape);
          return updatedShapes;
        });
      }
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={imageWidth}
        height={imageHeight}
        onClick={handleCanvasClick}
        tabIndex={0}
        onKeyDown={handleMoveShape}
        style={{ border: "1px solid black" }}
      ></canvas>
      <div>
        <button onClick={handleAddSquare}>Add Square</button>
        <button onClick={handleAddRectangle}>Add Rectangle</button>
        <button onClick={handleRemoveShape} disabled={!selectedShapeId}>
          Remove Shape
        </button>
      </div>
    </div>
  );
};

export default ShapeEditor;
