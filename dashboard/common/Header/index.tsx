import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { signIn, signOut, useSession } from "next-auth/react";
import { Flex, Text } from "rebass";

import { MyButton } from "../../components/Buttons";
import { Brand } from "./Brand";
import { Nav } from "./Nav";

const Header = () => {
  const { data } = useSession();

  return (
    <Flex
      as="header"
      height={80}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      px={[30, 30, 50]}
      sx={{
        boxShadow: "2px 2px 8px var(--blueBeige)",
        "& > div > ul > li > a": {
          textDecoration: "none"
        }
      }}
    >
      <Flex alignItems="center" sx={{ "& > ul > li": { listStyle: "none" } }}>
        <MenuRoundedIcon
          sx={{ mr: 2, fill: "var(--blueBeige)", cursor: "pointer", "@media (min-width: 740px)": { display: "none" } }}
        />
        <Brand />
        <Nav />
      </Flex>
      <Flex alignItems="center" flex="0 0 auto">
        <Text mr={4}>{data?.user?.name}</Text>
        <MyButton
          variant="outlined"
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
