import { useEffect } from "react";
import { Flex } from "rebass";

import { PrincipalCard } from "../../components/Card/PrincipalCard";
import { ScanMe } from "./ScanMe";

const Home = () => {
  useEffect(() => {
    localStorage.getItem("url");
  }, []);

  return (
    <Flex>
      <PrincipalCard title="Topic of the day" description="Drap & Drop your files here" display={false} />
      <ScanMe />
    </Flex>
  );
};

export default Home;
