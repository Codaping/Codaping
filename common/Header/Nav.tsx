import Link from "next/link";
import { Flex } from "rebass";

export const Nav = () => {
  return (
    <nav>
      <Flex
        paddingLeft={20}
        sx={{
          "& > ul > li > a": {
            textDecoration: "none",
            color: "var(--blue)",
            fontSize: 20,
          },
          "& > ul": {
            listStyle: "none",
            paddingLeft: 0,
            display: "flex",
            gap: 50,
          },
        }}
      >
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="search/">Search</Link>
          </li>
          <li>
            <Link href="/subject">Subject</Link>
          </li>
        </ul>
      </Flex>
    </nav>
  );
};
