import type { Dispatch, SetStateAction } from "react";
import { Flex, Text } from "rebass";

import { Card } from "../../components/Card";
import { FormSection } from "../../components/Card/Forms";
import type { Subject } from "../../types/subject";
import { TopicOfTheDay } from "../home/TopicOfTheDay";
import { RightButtons } from "../search/Buttons/RightButtons";
import { DragAndDropSection } from "./DragAndDropSection";
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
  wichButtonRight?: "button1" | "button2";
  setWichButtonRight?: Dispatch<SetStateAction<"button1" | "button2">>;
  wichButtonTop?: "button1" | "button2";
  setWichButtonTop?: Dispatch<SetStateAction<"button1" | "button2">>;
}

export const PrincipalCard = ({ ...props }: PrincipalCardProps) => {
  return (
    <Flex height="calc(100vh - 80px)" justifyContent="center" alignItems="center">
      <Flex
        width={[
          `calc(300px + ${props.displayRight ? "42px" : "0px"})`,
          `calc(350px + ${props.displayRight ? "42px" : "0px"})`,
          `calc(450px + ${props.displayRight ? "42px" : "0px"})`
        ]}
        height="fit-content"
        sx={{
          position: "relative"
        }}
      >
        <Flex flexDirection="column" alignItems="center">
          {props.displayTop ? (
            <TopButtons wichButton={props?.wichButtonTop} setWichButton={props?.setWichButtonTop} />
          ) : null}
          <Card widthCard={[300, 350, 450]} heightCard={[307, 357, 437]} bg="var(--blueBeige)">
            <Text as="p" color="var(--lightBeige)" fontSize={[24, 26, 32]} fontWeight={300} marginTop={[0, 10]}>
              {props.title}
            </Text>
            {props?.wichButtonTop == "button1" && props.displayTop === true ? (
              <DragAndDropSection
                description={props.description}
                url={props.url}
                setUrl={props.setUrl}
                handleParse={props.handleParse}
              />
            ) : props?.wichButtonTop == "button2" && props.displayTop === true ? (
              <FormSection
                wichButtonRight={props?.wichButtonRight ?? "button1"}
                page={props.page ?? null}
                onSuggestedSubject={props.onSuggestedSubject}
              />
            ) : (
              <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
                <TopicOfTheDay />
              </Flex>
            )}
          </Card>
        </Flex>
        {props.displayRight === true ? (
          <RightButtons wichButton={props?.wichButtonRight} setWichButton={props?.setWichButtonRight} />
        ) : null}
      </Flex>
    </Flex>
  );
};
