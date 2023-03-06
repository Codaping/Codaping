import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Box, Text } from "rebass";

import { SubjectCard } from "../../components/Card/SubjectCard";
import type { FileMetadata } from "../../types/file";
import type { Subject } from "../../types/subject";
import { AddSubject } from "./AddSubject";

interface SectionSubjectsProps {
  fileMetadata: FileMetadata[] | undefined;
  subjects: Subject[];
  titleSection: string;
  updateSubject: React.Dispatch<React.SetStateAction<Subject[]>>;
}

export const SectionSubjects = ({ ...props }: SectionSubjectsProps) => {
  const [checked, setChecked] = useState<string | undefined>(undefined);
  const onCheck = async (subject: Subject) => {
    if (props.titleSection !== "cobra") {
      if (!subject.isTopicOfTheDay) {
        const { data: removedTopicSubject } = await axios.post(
          "http://localhost:3000/api/subjects/removeTopicOfTheDay"
        );
        props.updateSubject((subjects) => [
          ...subjects.filter((sub) => sub.name !== removedTopicSubject.name),
          removedTopicSubject
        ]);
      }
      await axios.post("http://localhost:3000/api/subjects/updateSubject", {
        name: subject.name,
        category: subject.category,
        data: !subject.isTopicOfTheDay
          ? {
              isTopicOfTheDay: !subject.isTopicOfTheDay,
              choiceDate: moment(moment.now()).format("DD MM YYYY")
            }
          : {
              isTopicOfTheDay: !subject.isTopicOfTheDay
            }
      });
      const { data: updatedSubject } = await axios.post("http://localhost:3000/api/subjects/getSubject", {
        name: subject.name,
        category: subject.category
      });

      props.updateSubject((subjects) => [
        ...subjects.filter((sub) => sub.name !== updatedSubject.name),
        updatedSubject
      ]);
    }
  };

  useEffect(() => {
    if (!props.subjects.some((sub) => sub.isTopicOfTheDay === true)) return setChecked(undefined);
    props.subjects.map((sub, i) => {
      if (sub.isTopicOfTheDay === true) {
        setChecked(sub.name);
      }
    });
  }, [props.subjects]);

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
              {props.subjects.some((subject) => {
                return data.name.replace(".pdf", "") === subject.name;
              }) && (
                <SubjectCard
                  data={data}
                  titleSection={props.titleSection}
                  checked={checked === data.name.replace(".pdf", "")}
                  onCheck={() =>
                    onCheck(props.subjects.find((subject) => data.name.replace(".pdf", "") === subject.name)!)
                  }
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  ) : null;
};
