import axios from "axios";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex } from "rebass";

import { IsHovering } from "./IsHovering";

interface SubjectCardProps {
  items: {
    [x: string]: string;
  };
}

export const SubjectCard = ({ ...props }: SubjectCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [infoChange, setInfoChange] = useState(false);
  const [noteSubject, setNoteSubject] = useState(0);
  const [difficultySubject, setDifficultySubject] = useState("");

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    (async () => {
      const res = await axios.post("http://localhost:3000/api/subjects/getSubject", {
        name: props.items.name
      });
      setNoteSubject(res.data.note);
      setDifficultySubject(res.data.difficulty);
    })();
  }, [infoChange]);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <Flex
      height={400}
      width={280}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        boxShadow:
          localStorage.getItem("url") === props.items.url ? "2px 2px 8px var(--blue)" : "2px 2px 8px var(--blueBeige)",
        position: "relative",
        ":hover": { transform: "scale(1.02)", transitionDuration: "100ms", cursor: "pointer" }
      }}
    >
      <Box
        height={400}
        width={280}
        sx={{
          position: "absolute",
          zIndex: -1,
          left: 0,
          "& > div > div > canvas": { height: "400px !important", width: "280px !important" }
        }}
      >
        <Document file={props.items.url}>
          <Page noData="No page specified." renderTextLayer={false} renderAnnotationLayer={false} pageNumber={1} />
        </Document>
      </Box>
      {isHovering && (
        <IsHovering
          items={props.items}
          noteSubject={noteSubject}
          setInfoChange={setInfoChange}
          infoChange={infoChange}
          difficultySubject={difficultySubject}
        />
      )}
    </Flex>
  );
};
