import { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div>
      {preview ? (
        <img src={preview} width="200px" height="200px" alt="preview" />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default PreviewImage;
