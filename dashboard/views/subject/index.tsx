import axios from "axios";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { SubjectCard } from "../../components/Card/SubjectCard";
import { AddSubject } from "../../components/Card/SubjectCard/AddSubject";
import { storage } from "../../libraries/firebase";

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
      <Box width="fit-content">
        <Text as="p" fontSize={28} color="var(--blueGrey)" my={10}>
          Participant
        </Text>
        <Box
          key={`pdfParticipants`}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 280px)",
            gridAutoRows: 400,
            justifyContent: "center",
            gap: "30px"
          }}
        >
          <AddSubject />
          {listItems?.map((itemsP, i) => {
            const participants = subjects.filter((v) => {
              return v.category === "participant";
            });
            return (
              <>
                {participants.map((participant, subIndex) => {
                  if (itemsP.name === participant.name)
                    return <SubjectCard key={`pdfParticipant+${subIndex}`} items={itemsP} />;
                })}
              </>
            );
          })}
        </Box>
      </Box>
      <Box width="fit-content" mt={30}>
        <Text as="p" fontSize={28} color="var(--blueGrey)" my={10}>
          Cobra
        </Text>
        <Box
          key={`pdfCobras`}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 280px)",
            justifyContent: "center",
            gap: "30px"
          }}
        >
          {listItems?.map((itemsC, i) => {
            const cobras = subjects.filter((v) => {
              return v.category === "cobra";
            });
            return (
              <>
                {cobras.map((cobra, subIndex) => {
                  if (itemsC.name === cobra.name) return <SubjectCard key={`pdfCobra+${subIndex}`} items={itemsC} />;
                })}
              </>
            );
          })}
        </Box>
      </Box>
    </Flex>
  );
};
