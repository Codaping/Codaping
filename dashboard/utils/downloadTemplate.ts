import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "../libraries/firebase";

export const downloadTemplate = async (path: string, nameTemplate: string) => {
  const fileRef = ref(storage, path);
  const urlt = await getDownloadURL(fileRef);
  const response = await fetch(urlt);
  const blob = await response.blob();
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = nameTemplate;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
