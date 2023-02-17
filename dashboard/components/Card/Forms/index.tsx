import axios from "axios";
import { useState } from "react";
import { Box, Flex } from "rebass";

import { MyButton } from "../../Buttons";
import { ParticipantName } from "./ParticipantsName";
import { SubjectName } from "./SubjectName";

const ProcessObject = async (obj: { name: string }[], subject: string) => {
  console.log(obj);
  await Promise.all(
    Object.entries(obj).map(async ([_, value]) => {
      await axios.post("http://localhost:3000/api/participants/addParticipant", {
        name: value.name.toLowerCase(),
        project: subject
      });
    })
  );
};

const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
  e.preventDefault();

  let firstNames = {};
  let lastName = {};
  let subjectName = "";
  for (const [key, value] of Object.entries(e.target)) {
    if (value?.name?.includes("firstName")) firstNames = { ...firstNames, [value.name]: value.value };
    else if (value?.name?.includes("lastName")) lastName = { ...lastName, [value.name]: value.value };
    else if (value?.name?.includes("subject-name")) subjectName = value.value;
  }
  const firstNamesArray: string[] = Object.values(firstNames);
  const lastNameArray: string[] = Object.values(lastName);
  const combinedObject = firstNamesArray.map((first, index) => {
    return { name: first + " " + lastNameArray[index] };
  });
  ProcessObject(combinedObject, subjectName);
};

export const FormSection = () => {
  const [number, setNumber] = useState(2);

  return (
    <Box as="form" width="100%" p={2} onSubmit={handleSubmit}>
      <SubjectName />
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
        <MyButton
          type="submit"
          variant="contained"
          bg="var(--beige)"
          color="var(--blue)"
          fontWeight={600}
          sx={{ borderColor: "var(--beige)" }}
        >
          Submit
        </MyButton>
      </Flex>
    </Box>
  );
};
