import type { FC } from "react";
import { Flex, Text } from "rebass";

import type { Subject } from "../../types/subject";

interface ResponseSearchProps {
  suggestedSubject: Subject;
}

export const ResponseSearch: FC<ResponseSearchProps> = ({ suggestedSubject }) => {
  return (
    <Flex
      width={380}
      height={400}
      bg="var(--beige)"
      ml={-100}
      mt={50}
      p={40}
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      sx={{ transform: "rotate(5deg)" }}
    >
      <Text as="p" fontSize={24} pb={30} color="var(--blue)">
        Participant who has already do this subject
      </Text>
      <Text as="p" fontSize={20} color="var(--blueGrey)" sx={{ textTransform: "capitalize" }}>
        {suggestedSubject.name}
      </Text>
    </Flex>
  );
};
