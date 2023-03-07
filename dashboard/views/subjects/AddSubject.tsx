import { Input } from "@rebass/forms";
import React, { useState } from "react";
import { Flex, Text } from "rebass";

import type { FileMetadata } from "../../types/file";
import type { Subject } from "../../types/subject";
import { ParametersSubject } from "./ParametersSubject";

interface AddSubjectProps {
  updateSubject: (category: any, v: (s: Subject[]) => Subject[]) => void;
  updatefileMetadata: (category: any, v: (s: FileMetadata[] | undefined) => FileMetadata[]) => void;
  onClick?: () => void;
}

export const AddSubject = ({ updateSubject, updatefileMetadata, onClick, ...props }: AddSubjectProps) => {
  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPdfFile(event.target.files?.[0]);
  };

  return !pdfFile ? (
    <Flex
      height={400}
      width="100%"
      maxWidth="350px"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      onClick={onClick}
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
        sx={{ position: "absolute", top: 0, opacity: 0, cursor: "pointer" }}
      />
    </Flex>
  ) : (
    <>
      <ParametersSubject
        pdfFile={pdfFile}
        setPdfFile={setPdfFile}
        updateSubject={updateSubject}
        updatefileMetadata={updatefileMetadata}
      />
    </>
  );
};
