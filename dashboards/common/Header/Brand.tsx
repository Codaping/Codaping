import Link from "next/link";
import { Text } from "rebass";

export const Brand = () => {
  return (
    <ul>
      <li>
        <Link href="/">
          <Text as="p" fontSize={30} paddingX={50} color="var(--blue)" fontWeight={300} sx={{ cursor: "pointer" }}>
            Codaping
          </Text>
        </Link>
      </li>
    </ul>
  );
};
