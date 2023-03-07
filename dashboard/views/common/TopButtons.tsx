import type { Dispatch, SetStateAction } from "react";
import { Flex } from "rebass";

import { SectionButton } from "../../components/Buttons/SectionButton";

interface TopButtonsProps {
  wichButton?: string;
  setWichButton?: Dispatch<SetStateAction<"button1" | "button2">>;
}

export const TopButtons = ({ ...props }: TopButtonsProps) => {
  return (
    <Flex sx={{ gap: 50, "@media (max-width: 840px)": { gap: 40 }, "@media (max-width: 640px)": { gap: 20 } }}>
      <SectionButton
        pressed={props.wichButton == "button1" ? true : false}
        onClick={() => {
          props.setWichButton && props.setWichButton("button1");
        }}
      >
        Upload your file
      </SectionButton>
      <SectionButton
        pressed={props.wichButton == "button2" ? true : false}
        onClick={() => {
          props.setWichButton && props.setWichButton("button2");
        }}
      >
        Fill in the forms
      </SectionButton>
    </Flex>
  );
};
