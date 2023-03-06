import { Label, Radio } from "@rebass/forms";
import axios from "axios";
import React from "react";
import { Flex, Text } from "rebass";

import type { FileMetadata } from "../../../types/file";

interface RadioDifficultyProps {
  data: FileMetadata;
  setInfoChange: React.Dispatch<React.SetStateAction<boolean>>;
  infoChange: boolean;
  titleSection: string;
  difficultySubject: string;
}

export const RadioDifficulty = ({ ...props }: RadioDifficultyProps) => {
  const handleSetDifficulty = async (e: any) => {
    await axios.post("http://localhost:3000/api/subjects/addDifficulty", {
      name: props.data?.name.replace(".pdf", ""),
      category: props.titleSection,
      difficulty: e.currentTarget.value
    });
    props.setInfoChange(!props.infoChange);
  };

  return (
    <Flex key={`${props.data.name}+flex`} py={10} flexDirection="column" justifyContent="center" alignItems="center">
      <Text as="p" pb={10} fontSize={20} fontWeight={500} color="var(--blue)">
        Difficulty
      </Text>
      <Label color="var(--blueGrey)" fontWeight={500}>
        <Radio
          name="category"
          id="category"
          value="beginner"
          color="var(--blueBeige)"
          fontWeight={600}
          onChange={handleSetDifficulty}
          checked={props.difficultySubject === "beginner" ? true : false}
        />
        Beginner
      </Label>
      <Label color="var(--blueGrey)" fontWeight={500}>
        <Radio
          name="category"
          id="category"
          value="intermediate"
          color="var(--blueBeige)"
          fontWeight={600}
          onChange={handleSetDifficulty}
          checked={props.difficultySubject === "intermediate" ? true : false}
        />
        Intermediate
      </Label>
      <Label color="var(--blueGrey)" fontWeight={500}>
        <Radio
          name="category"
          id="category"
          value="advanced"
          color="var(--blueBeige)"
          fontWeight={600}
          onChange={handleSetDifficulty}
          checked={props.difficultySubject === "advanced" ? true : false}
        />
        Advanced
      </Label>
    </Flex>
  );
};
