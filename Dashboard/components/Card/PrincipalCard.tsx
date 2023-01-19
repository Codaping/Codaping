import { useEffect, useState } from "react";
import { Flex, Text } from "rebass";

import { Card } from ".";
import { DragAndDropSection } from "./DragAndDropSection";

interface PrincipalCardProps {
  title: string;
  description: string;
}

export const PrincipalCard = ({ ...props }: PrincipalCardProps) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <Flex height={height - 80} width="fit-content" alignItems="center" marginX={200}>
      <Card widthCard={450} heightCard={437} bg="var(--blueBeige)">
        <Text as="p" color="var(--lightBeige)" fontSize={32} fontWeight={300} marginTop={10}>
          {props.title}
        </Text>
        <DragAndDropSection description={props.description} />
      </Card>
    </Flex>
  );
};
