import { useState } from "react";
import { Flex, Text } from "rebass";

import { SectionButton } from "../Buttons/SectionButton";
import { Card } from ".";
import { DragAndDropSection } from "./DragAndDropSection";

interface PrincipalCardProps {
  title: string;
  description: string;
}

export const PrincipalCard = ({ ...props }: PrincipalCardProps) => {
  const [wichButton, setWichButton] = useState<"button1" | "button2">("button1");

  return (
    <Flex
      height="calc(100vh - 80px)"
      width="fit-content"
      justifyContent="center"
      alignItems="center"
      marginX={200}
      flexDirection="column"
    >
      <Flex sx={{ gap: 50 }}>
        <SectionButton
          pressed={wichButton == "button1" ? true : false}
          onClick={() => {
            setWichButton("button1");
          }}
        >
          Upload your file
        </SectionButton>
        <SectionButton
          pressed={wichButton == "button2" ? true : false}
          onClick={() => {
            setWichButton("button2");
          }}
        >
          Fill in the forms
        </SectionButton>
      </Flex>
      <Card widthCard={450} heightCard={437} bg="var(--blueBeige)">
        <Text as="p" color="var(--lightBeige)" fontSize={32} fontWeight={300} marginTop={10}>
          {props.title}
        </Text>
        <DragAndDropSection description={props.description} />
      </Card>
    </Flex>
  );
};
