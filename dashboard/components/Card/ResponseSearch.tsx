import type { FC } from "react";
import { Box, Flex, Text } from "rebass";

import type { Subject } from "../../types/subject";

interface ResponseSearchProps {
  responses: Subject | string[] | string;
  wichButtonRight: boolean;
  onClose: () => void;
}

export const ResponseSearch: FC<ResponseSearchProps> = ({ responses, wichButtonRight, onClose }) => {
  return (
    <Flex justifyContent="center" mt={[5, 5, 5, 0]} sx={{ position: "absolute" }}>
      <Flex
        width={[300, 380]}
        height="fit-content"
        bg="var(--beige)"
        p={[10, 40]}
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{ transform: "rotate(5deg)", border: "solid 1px var(--blue)" }}
      >
        <Box
          href="#"
          color="var(--blue)"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: "5px",
            fontSize: 30,
            fontWeight: 700,
            transition: "200ms",
            ":hover": { color: "var(--blueGrey)", cursor: "pointer" }
          }}
        >
          &times;
        </Box>
        <Flex
          width={10}
          height={10}
          bg="var(--blueGrey)"
          sx={{ borderRadius: "50%", left: 10, top: 10, position: "absolute" }}
        ></Flex>
        <Text as="p" fontSize={24} pb={30} color="var(--blue)">
          {wichButtonRight === true ? "Find participants" : "Suggested project"}
        </Text>
        {typeof responses == "string" ? (
          <Text>{responses}</Text>
        ) : wichButtonRight === true ? (
          (responses as string[]).map((subject, i) => {
            return (
              <Text as="p" key={i} fontSize={20} color="var(--blueGrey)" sx={{ textTransform: "capitalize" }}>
                {subject}
              </Text>
            );
          })
        ) : (
          <Text as="p" fontSize={20} color="var(--blueGrey)" sx={{ textTransform: "capitalize" }}>
            {(responses as Subject).name}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
