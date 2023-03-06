import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Flex, Text } from "rebass";

import { Card } from "../../components/Card";
import { DragAndDropSection } from "../../components/Card/DragAndDropSection";
import { FormSection } from "../../components/Card/Forms";
import type { Subject } from "../../types/subject";
import { TopicOfTheDay } from "../home/TopicOfTheDay";
import { RightButtons } from "../search/Buttons/RightButtons";
import { TopButtons } from "./TopButtons";

interface PrincipalCardProps {
  title: string;
  page?: string;
  description: string;
  displayTop: boolean;
  displayRight: boolean;
  onSuggestedSubject?: (suggestedSubject: Subject) => void;
  url?: string | ArrayBuffer;
  setUrl?: Dispatch<SetStateAction<string | ArrayBuffer>>;
  handleParse?: (arr: string[]) => void;
}

export const PrincipalCard = ({ ...props }: PrincipalCardProps) => {
  const [wichButtonTop, setWichButtonTop] = useState<"button1" | "button2">("button1");
  const [wichButtonRight, setWichButtonRight] = useState<"button1" | "button2">("button1");

  return (
    <Flex height="calc(100vh - 80px)" alignItems="center" width="50%" justifyContent="center">
      <Flex
        width="fit-content"
        height="fit-content"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        id="test"
        sx={{
          position: "relative"
        }}
      >
        {props.displayTop ? <TopButtons wichButton={wichButtonTop} setWichButton={setWichButtonTop} /> : null}
        <Card widthCard={450} heightCard={437} bg="var(--blueBeige)">
          <Text as="p" color="var(--lightBeige)" fontSize={32} fontWeight={300} marginTop={10}>
            {props.title}
          </Text>
          {wichButtonTop == "button1" && props.displayTop === true ? (
            <DragAndDropSection
              description={props.description}
              url={props.url}
              setUrl={props.setUrl}
              handleParse={props.handleParse}
            />
          ) : wichButtonTop == "button2" && props.displayTop === true ? (
            <FormSection
              wichButtonRight={wichButtonRight}
              page={props.page ?? null}
              onSuggestedSubject={props.onSuggestedSubject}
            />
          ) : (
            <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
              <TopicOfTheDay />
            </Flex>
          )}
        </Card>
        {wichButtonTop == "button2" && props.displayRight === true ? (
          <RightButtons wichButton={wichButtonRight} setWichButton={setWichButtonRight} />
        ) : null}
      </Flex>
    </Flex>
  );
};
