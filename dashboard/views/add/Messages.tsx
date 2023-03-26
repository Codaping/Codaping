import { Box, Flex, Text } from "rebass";

interface MessagesProps {
  messages: string;
  onClose: () => void;
}

export const Messages = ({ ...props }: MessagesProps) => {
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
          onClick={props.onClose}
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
        <Text as="p"> {props.messages} </Text>
        <Text as="p"> test </Text>
      </Flex>
    </Flex>
  );
};
