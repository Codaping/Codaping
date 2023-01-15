import { ReactNode } from "react";
import { Flex } from "rebass";

interface CardProps {
  widthCard: number;
  heightCard: number;
  bg: string;
  children?: ReactNode;
}

export const Card = ({ ...props }: CardProps) => {
  return (
    <Flex
      width={props.widthCard}
      height={props.heightCard}
      backgroundColor={props.bg}
      padding={20}
      flexDirection="column"
      alignItems="center"
      sx={{border: "1px solid var(--blue)"}}
    >
      {props.children}
    </Flex>
  );
};
