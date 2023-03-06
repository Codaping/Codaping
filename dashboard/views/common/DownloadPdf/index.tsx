import DownloadIcon from "@mui/icons-material/Download";
import type { ListResult } from "firebase/storage";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import JSZip from "jszip";
import type { FC } from "react";

import { storage } from "../../../libraries/firebase";

const copyArray = async (directory: ListResult, zip: JSZip) => {
  const copy: any[] = [];

  await Promise.all(
    directory.items.map(async (item) => {
      const downloadedUrl = await getDownloadURL(item);

      const response = await fetch(downloadedUrl);
      const blob = await response.blob();

      zip.file(item.name, blob);
      copy.push(downloadedUrl);
    })
  );
  await Promise.all(
    directory.prefixes.map(async (prefix) => {
      const element = await listAll(prefix);

      copy.push(await copyArray(element, zip.folder(prefix.name)!));
    })
  );

  return copy;
};

async function downloadFolderAsZip(path: string, name: string): Promise<void> {
  const rootDirectoryRef = ref(storage, path);
  const rootDirectoryContent = await listAll(rootDirectoryRef);
  const zip = new JSZip();

  await copyArray(rootDirectoryContent, zip.folder(name)!);

  const zipData = await zip.generateAsync({ type: "blob" });
  const downloadLink = document.createElement("a");
  downloadLink.download = name;
  downloadLink.href = URL.createObjectURL(zipData);
  downloadLink.click();
}

export const DownloadPdf: FC<{ path: string; name: string }> = ({ path, name }) => {
  return (
    <DownloadIcon
      onClick={() => downloadFolderAsZip(path, name)}
      sx={{ color: "var(--blueGrey)", fontSize: 50, ":hover": { cursor: "pointer" } }}
    />
  );
};
