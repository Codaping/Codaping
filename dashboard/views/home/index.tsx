import { useEffect } from "react";
import { Flex } from "rebass";

import { PrincipalCard } from "../common/PrincipalCard";
import { ScanMe } from "./ScanMe";

const Home = () => {
  useEffect(() => {
    localStorage.getItem("url");
  }, []);

  return (
    <Flex>
      <PrincipalCard
        title="Topic of the day"
        description="Drap & Drop your files here"
        displayTop={false}
        displayRight={false}
      />
      <ScanMe />
    </Flex>
  );
};

export default Home;
