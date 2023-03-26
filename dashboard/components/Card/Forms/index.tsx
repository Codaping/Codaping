import Loader from "@mui/material/CircularProgress";
import { useState } from "react";
import { Box, Flex, Text } from "rebass";

import type { Subject } from "../../../types/subject";
import { MyButton } from "../../Buttons";
import { handleSubmit } from "./constant";
import { Difficulty } from "./Difficulty";
import { ParticipantName } from "./ParticipantsName";
import { SubjectName } from "./SubjectName";

interface FormSectionProps {
  wichButtonRight?: string;
  page: string | null;
  onValidate: () => void;
  onSuggestedSubject?: (suggestedSubject: Subject | string[] | string) => void;
}

export const FormSection = ({ ...props }: FormSectionProps) => {
  const [number, setNumber] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

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
        try {
          setLoading(true);
          await handleSubmit(e, props.page, props?.wichButtonRight, props.onSuggestedSubject);
          props.onValidate();
          setLoading(false);
        } catch (e) {
          setError(e as string);
          setLoading(false);
        }
      }}
    >
      {props.wichButtonRight === "button1" ? <SubjectName /> : <Difficulty />}
      <ParticipantName repetition={number} onChange={() => setError(undefined)} />
      {error && (
        <Text
          as="p"
          color="darkRed"
          fontWeight={600}
          dangerouslySetInnerHTML={{
            __html: error
          }}
        />
      )}
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
          sx={{ borderColor: "var(--blueBeige)", textDecoration: "underline" }}
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
              fontSize={["12px", "12px", "18px"]}
              height={[40, 40, 45]}
              fontWeight={700}
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
              fontSize={["12px", "12px", "18px"]}
              height={[40, 40, 45]}
              bg="var(--beige)"
              color="var(--blue)"
              fontWeight={700}
              width={130}
              sx={{ borderColor: "var(--beige)" }}
              disabled={loading}
            >
              {loading ? <Loader size={20} sx={{ color: "black" }} /> : "Add"}
            </MyButton>
          ) : null}
        </Flex>
      </Flex>
    </Box>
  );
};
