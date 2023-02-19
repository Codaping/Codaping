import DownloadIcon from "@mui/icons-material/Download";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex, Text } from "rebass";

import { storage } from "../../../libraries/firebase";

export const TopicOfTheDay = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [url, setUrl] = useState<string | null>("");
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  useEffect(() => {
    setUrl(localStorage.getItem("url"));
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const downloadPdf = async () => {
    const path = localStorage.getItem("fullPath");
    const fileRef = ref(storage, path!);
    const urlt = await getDownloadURL(fileRef);
    const response = await fetch(urlt);
    const blob = await response.blob();
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileRef.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      {url ? (
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
              <DownloadIcon
                onClick={downloadPdf}
                sx={{ color: "var(--blueGrey)", fontSize: 50, ":hover": { cursor: "pointer" } }}
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

// survole je veux voir les notes/possibilité/changer supprimer cocher pour la voir sur la HP le "bg" c'est 1page pdf
