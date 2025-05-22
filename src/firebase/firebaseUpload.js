import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

/**
 * Uploads a file to Firebase Storage and returns the public URL.
 * @param {File} imageUpload - The image file selected from input.
 * @returns {Promise<string>} - A promise that resolves to the file's download URL.
 */
export const uploadFileToFirebase = (imageUpload) => {
  if (!imageUpload) {
    return Promise.reject("No file selected");
  }

  const extension = imageUpload.name.split('.').pop();
  const fileName = `uploads/${Date.now()}-${uuidv4()}.${extension}`;
  const imageRef = ref(storage, fileName);

  return uploadBytes(imageRef, imageUpload)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .catch((error) => {
      console.error("Upload failed:", error);
      throw error;
    });
};
