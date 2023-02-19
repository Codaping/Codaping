import { Input } from "@rebass/forms";
import React, { useRef, useState } from "react";
import { Flex, Text } from "rebass";

import { ParametersSubject } from "./ParametersSubject";

export const AddSubject = ({ ...props }) => {
  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined);
  const myRef = useRef<HTMLInputElement>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPdfFile(event.target.files?.[0]);
  };

  return !pdfFile ? (
    <Flex
      height={400}
      width={280}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      onClick={props.onClick}
      sx={{
        boxShadow: "2px 2px 8px var(--blueBeige)",
        position: "relative",
        ":hover": { transform: "scale(1.02)", transitionDuration: "100ms", cursor: "pointer" }
      }}
    >
      <Text fontSize={200} fontWeight={300} color="var(--blueBeige)">
        +
      </Text>
      <Input
        id="browse-file"
        name="browse-file"
        type="file"
        height={400}
        width={280}
        onChange={handleFileUpload}
        sx={{ position: "absolute", top: 0, opacity: 0 }}
        ref={myRef}
      />
    </Flex>
  ) : (
    <>
      <ParametersSubject pdfFile={pdfFile} setPdfFile={setPdfFile} />
    </>
  );
};

//
