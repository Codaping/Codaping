import React from "react";
import { Box, Text } from "rebass";

import { SubjectCard } from "../../components/Card/SubjectCard";
import { AddSubject } from "../../components/Card/SubjectCard/AddSubject";

interface SectionSubjectsProps {
  listItems:
    | {
        [x: string]: string;
      }[]
    | undefined;
  subjects: {
    name: string;
    note: number;
    category: string;
  }[];
  titleSection: string;
}

export const SectionSubjects = ({ ...props }: SectionSubjectsProps) => {
  return props.subjects.length ? (
    <Box width="fit-content">
      <Text as="p" fontSize={28} color="var(--blueGrey)" my={10}>
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
        {props.titleSection === "Participant" ? <AddSubject /> : null}
        {props.listItems?.map((items, i) => {
          return (
            <>
              {props.subjects.some(({ name }) => {
                return items.name === name;
              }) && <SubjectCard key={`pdf${props.titleSection}+${i}`} items={items} />}
            </>
          );
        })}
      </Box>
    </Box>
  ) : null;
};
