import { Flex, Text } from "rebass";

import { Card } from "../../../components/Card";
import { CardPdf } from "./CardPdf";

export const TopicOfTheDay = () => {
  return (
    <Flex height="calc(100vh - 80px)" justifyContent="center" alignItems="center">
      <Flex
        width={[`300px`, `350px`, `450px`]}
        height="fit-content"
        sx={{
          position: "relative"
        }}
      >
        <Flex flexDirection="column" alignItems="center">
          <Card widthCard={[300, 350, 450]} heightCard={[307, 357, 437]} bg="var(--blueBeige)">
            <Text as="p" color="var(--lightBeige)" fontSize={[24, 26, 32]} fontWeight={300} marginTop={[0, 10]}>
              Topic of the day
            </Text>
            <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
              <CardPdf />
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};
