import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
   const MAX_FILE_SIZE_MB = 5;

  if (imageFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error("Image must be less than 5MB"); // ✅ error can be caught and shown
  }
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
export default uploadImage;
