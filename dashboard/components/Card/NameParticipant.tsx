import { Flex, Text } from "rebass";

export const NameParticipant = () => {
  return (
    <Flex width={250} height={350} bg="var(--beige)" ml={-200} mt={50} p={20} flexDirection="column">
      <Text as="p" fontSize={18} pb={30} color="var(--blue)">
        Participant who has already do this subject
      </Text>
      <Text as="p" fontSize={20} color="var(--blueGrey)" sx={{ textTransform: "capitalize" }}>
        - romanie de meyer
      </Text>
    </Flex>
  );
};
