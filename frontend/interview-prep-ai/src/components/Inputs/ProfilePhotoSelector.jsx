import React, { useRef, useState } from 'react';
import { LuUpload, LuUser, LuX } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreview?.(preview);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview?.(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Avatar Preview / Placeholder */}
      <div className="relative group w-24 h-24">
        {image ? (
          <div className="relative w-full h-full">
            <img
              src={preview || previewUrl}
              alt="profile"
              className="w-full h-full object-cover rounded-full border border-gray-900 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-300"
            />

            {/* Remove Icon */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-white border border-gray-300 text-red-500 rounded-full p-1 hover:bg-red-100"
            >
              <LuX size={16} />
            </button>
          </div>
        ) : (
          <div
            onClick={onChooseFile}
            className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 text-gray-400 text-4xl cursor-pointer transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-300"
          >
            <LuUser />
          </div>
        )}
      </div>

      {/* Upload / Change Button */}
<button
  type="button"
  onClick={onChooseFile}
  className="btn-small flex items-center gap-2 bg-orange-300 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-md shadow-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-300"
>
  <LuUpload size={18} />
  {image ? 'Change Photo' : 'Upload Photo'}
</button>


    </div>
  );
};

export default ProfilePhotoSelector;
