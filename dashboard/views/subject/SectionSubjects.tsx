import React from "react";
import { Box, Text } from "rebass";

import { SubjectCard } from "../../components/Card/SubjectCard";
import { AddSubject } from "../../components/Card/SubjectCard/AddSubject";
import type { FileMetadata } from "../../types/file";

interface SectionSubjectsProps {
  fileMetadata: FileMetadata[] | undefined;
  subjects: {
    name: string;
    note: number;
    category: string;
  }[];
  titleSection: string;
}

export const SectionSubjects = ({ ...props }: SectionSubjectsProps) => {
  return props.subjects.length || props.titleSection === "participant" ? (
    <Box width="fit-content">
      <Text as="p" fontSize={28} color="var(--blueGrey)" my={10} sx={{ textTransform: "capitalize" }}>
        {props.titleSection}
      </Text>
      <Box
        key={`pdf${props.titleSection}`}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 280px)",
          gridAutoRows: 400,
          justifyContent: "center",
          gap: "30px"
        }}
      >
        {props.titleSection === "participant" ? <AddSubject /> : null}
        {props.fileMetadata?.map((data, i) => {
          return (
            <Box key={`pdf${props.titleSection}+${i}`}>
              {props.subjects.some(({ name }) => {
                return data.name === name;
              }) && <SubjectCard data={data} titleSection={props.titleSection} />}
            </Box>
          );
        })}
      </Box>
    </Box>
  ) : null;
};
