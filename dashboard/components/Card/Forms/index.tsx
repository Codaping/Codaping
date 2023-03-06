import { useState } from "react";
import { Box, Flex } from "rebass";

import type { Subject } from "../../../types/subject";
import { MyButton } from "../../Buttons";
import { handleSubmit } from "./constant";
import { Difficulty } from "./Difficulty";
import { ParticipantName } from "./ParticipantsName";
import { SubjectName } from "./SubjectName";

interface FormSectionProps {
  wichButtonRight: string;
  page: string | null;
  onSuggestedSubject?: (suggestedSubject: Subject) => void;
}

export const FormSection = ({ ...props }: FormSectionProps) => {
  const [number, setNumber] = useState(2);

  return (
    <Box
      as="form"
      width="100%"
      p={20}
      onSubmit={(e) => {
        handleSubmit(e, props.wichButtonRight, props.page, props.onSuggestedSubject);
      }}
    >
      {props.wichButtonRight === "button1" ? <SubjectName /> : <Difficulty />}
      <ParticipantName repetition={number} />
      <MyButton
        type="button"
        variant="outlined"
        bg="inherit"
        color="var(--blueGrey)"
        fontWeight={500}
        onClick={() => {
          setNumber(number + 1);
        }}
        sx={{ borderColor: "var(--blueBeige)" }}
      >
        + Add Another
      </MyButton>
      <Flex justifyContent="center">
        {props.page === "search" ? (
          <MyButton
            type="submit"
            name="search"
            variant="contained"
            bg="var(--beige)"
            color="var(--blue)"
            fontWeight={600}
            width={130}
            sx={{ borderColor: "var(--beige)" }}
          >
            Search
          </MyButton>
        ) : props.page === "add" ? (
          <MyButton
            type="submit"
            name="add"
            variant="contained"
            bg="var(--beige)"
            color="var(--blue)"
            fontWeight={600}
            width={130}
            sx={{ borderColor: "var(--beige)" }}
          >
            Add
          </MyButton>
        ) : null}
      </Flex>
    </Box>
  );
};
