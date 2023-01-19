import { signIn, signOut, useSession } from "next-auth/react";
import { Flex, Text } from "rebass";

import { MyButton } from "../../components/Buttons";
import { Brand } from "./Brand";
import { Nav } from "./Nav";

const Header = () => {
  const { data } = useSession();

  return (
    <Flex
      height={80}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      px={50}
      sx={{
        boxShadow: "2px 2px 8px var(--blueBeige)",
        "& > div > ul > li > a": {
          textDecoration: "none"
        }
      }}
    >
      <Flex alignItems="center" sx={{ "& > ul > li": { listStyle: "none" } }}>
        <Brand />
        <Nav />
      </Flex>
      <Flex alignItems="center">
        <Text mr={4}>{data?.user?.name}</Text>
        <MyButton
          bg="inherit"
          height={40}
          color="var(--blueGrey)"
          sx={{ borderColor: "var(--blueBeige)" }}
          onClick={() => (data ? signOut() : signIn())}
        >
          {data ? "Sign out" : "Sign in"}
        </MyButton>
      </Flex>
    </Flex>
  );
};

export default Header;
