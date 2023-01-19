import { signIn, signOut, useSession } from "next-auth/react";
import { Flex } from "rebass";

import { OutlainedButton } from "../../components/Buttons/OutlainedButton";
import { Brand } from "./Brand";
import { Nav } from "./Nav";

const Header = () => {
  const { data } = useSession();

  return (
    <Flex
      height={80}
      width="100%"
      alignItems="center"
      sx={{
        boxShadow: "2px 2px 8px var(--blueBeige)",
        "& > ul > li > a": {
          textDecoration: "none"
        }
      }}
    >
      <Brand />
      <Nav />
      <Flex marginRight={50} sx={{ position: "absolute", right: 0 }}>
        <OutlainedButton
          bg="inherit"
          height={40}
          color="var(--blueGrey)"
          sx={{ borderColor: "var(--blueBeige)" }}
          onClick={() => (data ? signOut() : signIn())}
        >
          {data ? "Sign out" : "Sign in"}
        </OutlainedButton>
      </Flex>
    </Flex>
  );
};

export default Header;
