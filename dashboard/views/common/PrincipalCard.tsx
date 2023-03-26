import type { Dispatch, SetStateAction } from "react";
import { Flex, Text } from "rebass";

import { Card } from "../../components/Card";
import { FormSection } from "../../components/Card/Forms";
import type { Subject } from "../../types/subject";
import { RightButtons } from "../search/Buttons/RightButtons";
import { DragAndDropSection } from "./DragAndDropSection";
import { TopButtons } from "./TopButtons";

interface PrincipalCardProps {
  title: string;
  page?: string;
  description: string;
  displayRight: boolean;
  onValidate: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setError: Dispatch<SetStateAction<string | undefined>>;
  error: string | undefined;
  onSuggestedSubject?: (suggestedSubject: Subject | string[] | string) => void;
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
          <TopButtons wichButton={props?.wichButtonTop} setWichButton={props?.setWichButtonTop} />
          <Card widthCard={[300, 350, 450]} heightCard={[307, 357, 437]} bg="var(--blueBeige)">
            <Text as="p" color="var(--lightBeige)" fontSize={[24, 26, 32]} fontWeight={300} marginTop={[0, 10]}>
              {props.title}
            </Text>
            {props?.wichButtonTop === "button1" ? (
              <DragAndDropSection
                description={props.description}
                url={props.url}
                setUrl={props.setUrl}
                handleParse={props.handleParse}
                onValidate={props.onValidate}
                setLoading={props.setLoading}
                loading={props.loading}
                setError={props.setError}
                error={props.error}
              />
            ) : props?.wichButtonTop === "button2" ? (
              <FormSection
                wichButtonRight={props?.wichButtonRight ?? "button1"}
                page={props.page ?? null}
                onSuggestedSubject={props.onSuggestedSubject}
                onValidate={props.onValidate}
              />
            ) : null}
          </Card>
        </Flex>
        {props.displayRight === true ? (
          <RightButtons wichButton={props?.wichButtonRight} setWichButton={props?.setWichButtonRight} />
        ) : null}
      </Flex>
    </Flex>
  );
};
