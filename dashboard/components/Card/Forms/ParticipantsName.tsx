import { Input, Label } from "@rebass/forms";
import type { FC } from "react";
import { Box, Flex } from "rebass";

interface ParticipantNameProps {
  repetition: number;
}

export const ParticipantName: FC<ParticipantNameProps> = ({ ...props }) => {
  return (
    <Box pb={[2, 3, 2]} sx={{ overflow: "hidden" }}>
      <Flex sx={{ gap: 2 }}>
        <Label htmlFor="first-name" fontWeight={400} fontSize={[16, 20]} py={2} width={1 / 2} color="var(--lightBeige)">
          First Name
        </Label>
        <Label htmlFor="last-name" fontWeight={400} fontSize={[16, 20]} py={2} width={1 / 2} color="var(--lightBeige)">
          Last Name
        </Label>
      </Flex>
      <Box height={[100, 92]} sx={{ overflow: "scroll" }}>
        {[...Array(props.repetition)].map((_, i) => (
          <Flex key={`name ${i}`} sx={{ gap: 2 }}>
            <Input
              id={`firstName${i}`}
              name={`firstName${i}`}
              placeholder="Jane"
              type="text"
              bg="var(--beige)"
              fontSize={["12px", "16px"]}
              height={40}
              width={1 / 2}
              mb={2}
              autoComplete="off"
              data-lpignore="true"
              data-form-type="other"
              sx={{ border: "none", outline: "none" }}
            />
            <Input
              id={`lastName${i}`}
              name={`lastName${i}`}
              placeholder="Doe"
              type="text"
              bg="var(--beige)"
              fontSize={["12px", "16px"]}
              height={40}
              width={1 / 2}
              mb={2}
              autoComplete="off"
              data-lpignore="true"
              data-form-type="other"
              sx={{ border: "none" }}
            />
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
