import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import { Checkbox, Label } from "@rebass/forms";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex, Text } from "rebass";
interface SubjectCardProps {
  onClick: () => void;
  url: {
    [x: string]: string;
  };
}

export const SubjectCard = ({ ...props }: SubjectCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [rating, setRating] = useState(0);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleRatingChange = (event: any) => {
    setRating(parseInt(event.target.value));
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <Flex
      height={400}
      width={280}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        boxShadow: "2px 2px 8px var(--blueBeige)",
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
          filter: "blur(0px)",
          "& > div > div > canvas": { height: "400px !important", width: "280px !important" }
        }}
      >
        <Document file={props.url.url}>
          <Page noData="No page specified." renderTextLayer={false} renderAnnotationLayer={false} pageNumber={1} />
        </Document>
      </Box>
      {isHovering && (
        <Flex
          width="inherit"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)"
          }}
        >
          <Flex width="100%" flexDirection="column" p={20}>
            <Flex justifyContent="space-between" width="100%" alignItems="center">
              <Label>
                <Checkbox size={30} color="var(--blue)" />
              </Label>
              <DeleteOutlineIcon
                sx={{ cursor: "pointer", fontSize: 30, color: "var(--blue)" }}
                onClick={() => console.log("Delete image")}
              />
            </Flex>
            <Flex alignItems="center" justifyContent="center" height="100%" flexDirection="column">
              <Text as="p" py={10} fontSize={28}>
                {props.url.name}
              </Text>
              <Text as="p" py={10} fontSize={20}>
                Please note
              </Text>
              <Flex>
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    sx={{ cursor: "pointer", color: index < rating ? "gold" : "grey", fontSize: 40 }}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

// survole je veux voir les notes/possibilité/changer supprimer cocher pour la voir sur la HP le "bg" c'est 1page pdf
