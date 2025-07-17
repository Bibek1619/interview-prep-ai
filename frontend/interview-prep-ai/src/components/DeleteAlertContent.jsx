import React from 'react';

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5">
      {content && (
        <p className="text-center text-[14px] font-medium text-gray-700 mb-4">
          {content}
        </p>
      )}
      <p className="flex justify-center">
        <button
          className=" bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
          onClick={onDelete}
          type="button"
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default DeleteAlertContent;
