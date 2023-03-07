import Loader from "@mui/material/CircularProgress";
import { useState } from "react";
import { Box, Flex } from "rebass";

import type { Subject } from "../../../types/subject";
import { MyButton } from "../../Buttons";
import { handleSubmit } from "./constant";
import { Difficulty } from "./Difficulty";
import { ParticipantName } from "./ParticipantsName";
import { SubjectName } from "./SubjectName";

interface FormSectionProps {
  wichButtonRight?: string;
  page: string | null;
  onSuggestedSubject?: (suggestedSubject: Subject) => void;
}

export const FormSection = ({ ...props }: FormSectionProps) => {
  const [number, setNumber] = useState(2);
  const [loading, setLoading] = useState(false);

  return (
    <Box
      as="form"
      width="100%"
      p={[0, 10, 20]}
      sx={{
        animation: "fadeIn .5s",
        "@keyframes fadeIn": {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      }}
      onSubmit={async (e) => {
        setLoading(true);
        await handleSubmit(e, props.page, props?.wichButtonRight, props.onSuggestedSubject);
        setLoading(false);
      }}
    >
      {props.wichButtonRight === "button1" ? <SubjectName /> : <Difficulty />}
      <ParticipantName repetition={number} />
      <Flex flexDirection={["row", "row", "column"]} justifyContent="center" sx={{ gap: 10 }}>
        <MyButton
          type="button"
          variant="outlined"
          bg="inherit"
          color="var(--blueGrey)"
          height={[40, 40, 50]}
          fontSize={["12px", "12px", "16px"]}
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
              fontSize={["12px", "12px", "16px"]}
              height={[40, 40, 50]}
              fontWeight={600}
              width={130}
              sx={{ borderColor: "var(--beige)" }}
              disabled={loading}
            >
              {loading ? <Loader size={20} sx={{ color: "black" }} /> : "Search"}
            </MyButton>
          ) : props.page === "add" ? (
            <MyButton
              type="submit"
              name="add"
              variant="contained"
              fontSize={["12px", "12px", "16px"]}
              height={[40, 40, 50]}
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
      </Flex>
    </Box>
  );
};
