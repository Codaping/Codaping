import axios from "axios";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Flex } from "rebass";

import { storage } from "../../libraries/firebase";
import { SectionSubjects } from "./SectionSubjects";

export const Subject = () => {
  const listRef = ref(storage, "subjects");
  const [subjects, setSubjects] = useState<{ name: string; note: number; category: string }[]>([]);
  const [listItems, setListItems] = useState<
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
      setListItems(items);
    })();
    (async () => {
      const res = await axios.post("http://localhost:3000/api/subjects/getSubjects");
      setSubjects(res.data);
    })();
  }, []);

  return (
    <Flex width="100%" px={80} py={60} flexDirection="column" alignItems="center">
      <SectionSubjects
        listItems={listItems}
        subjects={subjects.filter((v) => {
          return v.category === "participant";
        })}
        titleSection="Participant"
      />
      <SectionSubjects
        listItems={listItems}
        subjects={subjects.filter((v) => {
          return v.category === "cobra";
        })}
        titleSection="Cobra"
      />
      <SectionSubjects
        listItems={listItems}
        subjects={subjects.filter((v) => {
          return v.category === "camp";
        })}
        titleSection="Camp"
      />
    </Flex>
  );
};

// faire 3 collection P C Camp
// check le hovering des Co
