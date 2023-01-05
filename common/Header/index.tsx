import { Rajdhani } from "@next/font/google";
import { Box, Flex, Text } from "rebass";
import { ContainedButton } from "../../components/Buttons/ContainedButton";
import { Nav } from "./Nav";

const Header = () => {
  return (
    <Flex
      height={80}
      width="100%"
      alignItems="center"
      sx={{ boxShadow: "2px 2px 8px var(--blueBeige)" }}
    >
      <Text as="p" fontSize={30} paddingX={50} color="var(--blue)" fontWeight={300}>
        Codaping
      </Text>
      <Nav />
      <Flex marginRight={50} sx={{ position: "absolute", right: 0 }}>
        <ContainedButton
          bg="inherit"
          text="Sign in"
          height={40}
          color="var(--blueGrey)"
          borderColor="var(--blueBeige)"
        ></ContainedButton>
      </Flex>
    </Flex>
  );
};

export default Header;
