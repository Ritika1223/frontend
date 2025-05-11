import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

export const uploadFileToFirebase = (imageUpload) => {
  if (!imageUpload) return Promise.reject("No file selected");

  const imageRef = ref(storage, `ant/${imageUpload.name + v4()}`);

  return uploadBytes(imageRef, imageUpload).then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  });
};