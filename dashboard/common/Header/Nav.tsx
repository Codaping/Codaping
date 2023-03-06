import Link from "next/link";
import { Box, Flex } from "rebass";

export const Nav = () => {
  return (
    <Box
      as="nav"
      display="none"
      sx={{
        "@media (min-width: 700px)": {
          display: "flex"
        }
      }}
    >
      <Flex
        width="400px"
        paddingLeft={20}
        sx={{
          "& > ul > li > a": {
            display: "block",
            transition: ".2s",
            textDecoration: "none",
            color: "var(--blue)",
            fontSize: 20
          },
          "& > ul > li > a:hover": {
            transform: "scale(1.1)"
          },
          "& > ul > li > a:active": {
            color: "var(--blueBeige)"
          },
          "& > ul": {
            listStyle: "none",
            paddingLeft: 0,
            display: "flex",
            width: "100%",
            mr: "30px",
            justifyContent: "space-between"
          }
        }}
      >
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
          <li>
            <Link href="/add">Add</Link>
          </li>
          <li>
            <Link href="/subjects">Subjects</Link>
          </li>
        </ul>
      </Flex>
    </Box>
  );
};
