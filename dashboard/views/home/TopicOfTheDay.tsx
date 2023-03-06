import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex, Text } from "rebass";

import { storage } from "../../libraries/firebase";
import type { Subject } from "../../types/subject";
import { DownloadPdf } from "../common/DownloadPdf";

export const TopicOfTheDay = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [url, setUrl] = useState<string | null>("");
  const [topicOfTheDay, setTopicOfTheDay] = useState<Subject | null>(null);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  useEffect(() => {
    (async () => {
      const topic: Subject = (await axios.post("http://localhost:3000/api/subjects/getTopicOfTheDay")).data;

      if (!topic) return;
      const listRef = ref(storage, `subjects/${topic.category}/${topic.name}/${topic.name}.pdf`);
      const url = await getDownloadURL(listRef);

      setUrl(url);
      setTopicOfTheDay(topic);
    })();
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Flex
      height={300}
      width={210}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        boxShadow: "2px 2px 8px var(--blue)",
        position: "relative",
        ":hover": { cursor: "pointer" }
      }}
    >
      {url && topicOfTheDay ? (
        <>
          <Box
            height={300}
            width={210}
            sx={{
              position: "absolute",
              left: 0,
              filter: "blur(0px)",
              "& > div > div > canvas": { height: "300px !important", width: "210px !important" }
            }}
          >
            <Document file={url}>
              <Page noData="No page specified." renderTextLayer={false} renderAnnotationLayer={false} pageNumber={1} />
            </Document>
          </Box>
          {isHovering && (
            <Flex
              width="inherit"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.8)"
              }}
            >
              <DownloadPdf
                name={topicOfTheDay.name}
                path={`subjects/${topicOfTheDay.category}/${topicOfTheDay.name}`}
              />
            </Flex>
          )}
        </>
      ) : (
        <Text as="p" color="var(--blueGrey)" fontSize={24}>
          No Subject
        </Text>
      )}
    </Flex>
  );
};
