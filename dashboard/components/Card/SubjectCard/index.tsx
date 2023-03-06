import axios from "axios";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex } from "rebass";

import type { FileMetadata } from "../../../types/file";
import type { Subject } from "../../../types/subject";
import { IsHovering } from "./IsHovering";

interface SubjectCardProps {
  data: FileMetadata;
  titleSection: string;
  onCheck: () => void;
  checked: boolean;
  updateSubject: React.Dispatch<React.SetStateAction<Subject[]>>;
  updatefileMetadata: React.Dispatch<React.SetStateAction<FileMetadata[] | undefined>>;
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
        name: props.data.name.replace(".pdf", ""),
        category: props.titleSection
      });
      setNoteSubject(res.data.note);
      setDifficultySubject(res.data.difficulty);
    })();
  }, [infoChange]);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <Flex
      height={"100%"}
      width={"100%"}
      maxWidth="350px"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        boxShadow: props.checked ? "2px 2px 8px var(--blue)" : "2px 2px 8px var(--blueBeige)",
        position: "relative",
        ":hover": { transform: "scale(1.02)", transitionDuration: "100ms", cursor: "pointer" }
      }}
    >
      <Box
        height={"100%"}
        width={"100%"}
        sx={{
          position: "absolute",
          zIndex: -1,
          left: 0,
          "& > div > div > canvas": { height: "400px !important", width: "100% !important" }
        }}
      >
        <Document file={props.data.url}>
          <Page noData="No page specified." renderTextLayer={false} renderAnnotationLayer={false} pageNumber={1} />
        </Document>
      </Box>
      {isHovering && (
        <IsHovering
          data={props.data}
          titleSection={props.titleSection}
          noteSubject={noteSubject}
          setInfoChange={setInfoChange}
          infoChange={infoChange}
          difficultySubject={difficultySubject}
          onCheck={props.onCheck}
          checked={props.checked}
          updateSubject={props.updateSubject}
          updatefileMetadata={props.updatefileMetadata}
        />
      )}
    </Flex>
  );
};
