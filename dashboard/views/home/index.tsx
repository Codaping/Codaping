import { Flex } from "rebass";

import { PrincipalCard } from "../common/PrincipalCard";
import { ScanMe } from "./ScanMe";

const Home = () => {
  return (
    <Flex
      flexDirection="column"
      mt={4}
      p={3}
      height="fit-content"
      sx={{
        gap: 30,
        "& > div:first-of-type": {
          justifyContent: "center",
          "& > div": {
            width: "609px",
            "& > div": {
              width: "100%"
            },
            "@media (max-width: 650px)": {
              width: "100%"
            }
          }
        },
        "& > div:last-of-type": { justifyContent: "center" },
        "& > div": { width: "100%", height: "fit-content" },
        "@media (min-width: 1215px)": {
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: "calc(100vh - 65px)",
          mt: 0
        }
      }}
    >
      <PrincipalCard
        title="Topic of the day"
        description="Drag & Drop your files here"
        displayTop={false}
        displayRight={false}
      />
      <ScanMe />
    </Flex>
  );
};

export default Home;
