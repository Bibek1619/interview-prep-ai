import React, { useRef, useState } from 'react';
import { LuUpload, LuUser } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // 🔧 FIX: `files[0]` not `files(0)`

    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);

    if (setPreview) {
      setPreview(null);
    }

    setPreviewUrl(null); // Clear internal preview too
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="flex flex-col items-center">
          <LuUser className="text-5xl text-gray-400 mb-2" />

          <button
            type="button"
            className="btn-small text-sm text-white bg-amber-500 px-4 py-2 rounded"
            onClick={onChooseFile}
          >
            <LuUpload className="inline-block mr-2" />
            Upload Photo
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={preview || previewUrl}
            alt="profile"
            className="w-24 h-24 object-cover rounded-full mb-2 border border-gray-300"
          />

          <button
            type="button"
            className="text-red-500 underline text-sm"
            onClick={handleRemoveImage}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
