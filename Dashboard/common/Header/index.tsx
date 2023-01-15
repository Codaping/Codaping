import { Rajdhani } from "@next/font/google";
import Link from "next/link";
import { Box, Flex, Text } from "rebass";
import { OutlainedButton } from "../../components/Buttons/OutlainedButton";
import { Brand } from "./Brand";
import { Nav } from "./Nav";

const Header = () => {
  return (
    <Flex
      height={80}
      width="100%"
      alignItems="center"
      sx={{
        boxShadow: "2px 2px 8px var(--blueBeige)",
        "& > ul > li > a": {
          textDecoration: "none",
        },
      }}
    >
      <Brand />
      <Nav />
      <Flex marginRight={50} sx={{ position: "absolute", right: 0 }}>
        <OutlainedButton
          bg="inherit"
          text="Sign in"
          height={40}
          colorString="var(--blueGrey)"
          borderColor="var(--blueBeige)"
        ></OutlainedButton>
      </Flex>
    </Flex>
  );
};

export default Header;
