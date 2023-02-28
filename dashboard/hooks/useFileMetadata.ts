import { getDownloadURL, listAll, ref } from "firebase/storage";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { storage } from "../libraries/firebase";
import type { FileMetadata } from "../types/file";

export const useFileMetadata = (
  path: string
): [FileMetadata[] | undefined, Dispatch<SetStateAction<FileMetadata[] | undefined>>] => {
  const listRef = ref(storage, path);
  const [fileMetadata, setFileMetadata] = useState<FileMetadata[]>();

  useEffect(() => {
    (async () => {
      const { prefixes: listFolders } = await listAll(listRef);
      const items = await Promise.all(
        listFolders.flatMap(async (subFolder) => {
          const { items: files } = await listAll(subFolder);
          const file = files[0];
          const url = await getDownloadURL(file);
          return { url: url, name: file.name, fullPath: file.fullPath, subFolderPath: subFolder.fullPath };
        })
      );
      setFileMetadata(items);
    })();
  }, []);
  return [fileMetadata, setFileMetadata];
};
