import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Box } from "rebass";

import { SubjectCard } from "../../components/Card/SubjectCard";
import { AddSubject } from "../../components/Card/SubjectCard/AddSubject";
import { storage } from "../../libraries/firebase";

export const Subject = () => {
  const listRef = ref(storage, "subjects");
  const [listURL, setListURL] = useState<
    {
      [x: string]: string;
    }[]
  >();

  useEffect(() => {
    (async () => {
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          console.log("items", itemRef.name);
          const url = await getDownloadURL(itemRef);
          return { url: url, name: itemRef.name };
        })
      );
      setListURL(urls);
    })();
  }, []);

  console.log("list", listURL);
  return (
    <Box
      width="100%"
      padding={80}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 280px)",
        justifyContent: "center",
        gap: "30px"
      }}
    >
      {listURL?.map((url, i) => {
        return (
          <SubjectCard
            key={`pdf+${i}`}
            url={url}
            onClick={() => {
              null;
            }}
          />
        );
      })}
      <AddSubject />
    </Box>
  );
};
