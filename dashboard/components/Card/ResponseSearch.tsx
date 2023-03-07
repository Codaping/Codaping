import type { FC } from "react";
import { Flex, Text } from "rebass";

import type { Subject } from "../../types/subject";

interface ResponseSearchProps {
  suggestedSubject: Subject;
}

export const ResponseSearch: FC<ResponseSearchProps> = ({ suggestedSubject }) => {
  return (
    <Flex justifyContent="center" mt={[5, 5, 5, 0]}>
      <Flex
        width={380}
        height="fit-content"
        bg="var(--beige)"
        p={40}
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{ transform: "rotate(5deg)" }}
      >
        <Flex
          width={10}
          height={10}
          bg="var(--blueGrey)"
          sx={{ borderRadius: "50%", left: 10, top: 10, position: "absolute" }}
        ></Flex>
        <Text as="p" fontSize={24} pb={30} color="var(--blue)">
          Suggested project
        </Text>
        <Text as="p" fontSize={20} color="var(--blueGrey)" sx={{ textTransform: "capitalize" }}>
          {suggestedSubject.name}
        </Text>
      </Flex>
    </Flex>
  );
};
