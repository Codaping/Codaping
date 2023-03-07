import type { ReactNode } from "react";
import type { FlexProps } from "rebass";
import { Flex } from "rebass";

interface CardProps extends FlexProps {
  widthCard: any;
  heightCard: any;
  bg: string;
  children?: ReactNode;
}

export const Card = ({ widthCard, heightCard, bg, ...props }: CardProps) => {
  return (
    <Flex
      width={widthCard}
      height={heightCard}
      backgroundColor={bg}
      padding={20}
      pt={[10, 10, 20]}
      flexDirection="column"
      alignItems="center"
      {...props}
      sx={{ border: "1px solid var(--blue)", ...props.sx }}
    >
      {props.children}
    </Flex>
  );
};
