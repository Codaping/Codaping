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
      const items = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { url: url, name: itemRef.name, fullPath: itemRef.fullPath };
        })
      );
      setListURL(items);
    })();
  }, []);

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
      {listURL?.map((items, i) => {
        return <SubjectCard key={`pdf+${i}`} items={items} />;
      })}
      <AddSubject />
    </Box>
  );
};
