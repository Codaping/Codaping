import { listAll, ref } from "firebase/storage";
import React from "react";
import { Document, Page } from "react-pdf";
import { Box, Flex } from "rebass";

import { storage } from "../../../libraries/firebase";

interface SubjectCardProps {
  onClick: () => void;
}

export const SubjectCard = ({ ...props }: SubjectCardProps) => {
  const listRef = ref(storage, "subjects");

  listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log("items", itemRef);
      });
    })
    .catch((error) => {
      // Uh-oooooooooooooh, an error occurred!
    });

  // getDownloadURL(ref(storage, "subjects/*"))
  //   .then((url) => {
  //     // `url` is the download URL for 'images/stars.jpg'

  //     // This can be downloaded directly:
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = "blob";
  //     xhr.onload = (event) => {
  //       const blob = xhr.response;
  //     };
  //     xhr.open("GET", url);
  //     xhr.send();

  //     // Or inserted into an <img> element
  //     const img = document.getElementById("myimg");
  //     img.setAttribute("src", url);
  //   })
  //   .catch((error) => {
  //     // Handle any errors
  //   });

  return (
    <Flex
      height={400}
      width={280}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      onClick={props.onClick}
      // onMouseEnter={() => {
      //   // handle mouse enter event
      // }}
      // onMouseLeave={() => {
      //   // handle mouse leave event
      // }}
      sx={{
        boxShadow: "2px 2px 8px var(--blueBeige)",
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
          filter: "blur(0px)",
          "& > div > div > canvas": { height: "400px !important", width: "280px !important" }
        }}
      >
        {/* <Document file={props.pdfFile}>
          <Page noData="No page specified." renderTextLayer={false} renderAnnotationLayer={false} pageNumber={1} />
        </Document> */}
      </Box>
    </Flex>
  );
};

// survole je veux voir les notes/possibilité/changer supprimer cocher pour la voir sur la HP le "bg" c'est 1page pdf
