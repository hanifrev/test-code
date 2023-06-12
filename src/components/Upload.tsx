import React from "react";

interface UploadProps {
  onImageUpload: (imageData: string) => void;
}

const Upload: React.FC<UploadProps> = ({ onImageUpload }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onImageUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
    </div>
  );
};

export default Upload;
