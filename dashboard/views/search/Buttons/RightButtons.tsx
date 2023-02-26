import type { Dispatch, SetStateAction } from "react";
import { Flex } from "rebass";

import { RightButton } from "../../../components/Buttons/RightButton";

interface RightButtonsProps {
  wichButton: string;
  setWichButton: Dispatch<SetStateAction<"button1" | "button2">>;
}

export const RightButtons = ({ ...props }: RightButtonsProps) => {
  return (
    <Flex
      width="fit-content"
      height="fit-content"
      sx={{ gap: 20, transform: "rotate(90deg)", position: "absolute", right: -170, top: 205 }}
    >
      <RightButton
        pressed={props.wichButton == "button1" ? true : false}
        onClick={() => {
          props.setWichButton("button1");
        }}
      >
        With Subject
      </RightButton>
      <RightButton
        pressed={props.wichButton == "button2" ? true : false}
        onClick={() => {
          props.setWichButton("button2");
        }}
      >
        Without Subject
      </RightButton>
    </Flex>
  );
};
