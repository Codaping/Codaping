import { Rancho } from "@next/font/google";
import { useEffect, useState } from "react";
import { Flex, Image, Text } from "rebass";

import { Card } from "../components/Card";
import { PrincipalCard } from "../components/Card/PrincipalCard";

const rancho = Rancho({ weight: "400", style: "normal", subsets: ["latin"] });

const Home = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <Flex>
      <PrincipalCard title="Topic of the day" description="Drap & Drop your files here" />
      <Flex height={height - 80} alignItems="center" marginX={200}>
        <Card widthCard={609} heightCard={437} bg="var(--beige)">
          <Flex width="100%" justifyContent="center" sx={{ position: "relative" }}>
            <Flex
              width={10}
              height={10}
              bg="var(--blueGrey)"
              sx={{ borderRadius: "50%", left: 0, position: "absolute" }}
            ></Flex>
            <Text as="p" color="var(--blue)" fontSize={40} fontWeight={300} className={rancho.className} marginTop={10}>
              Scan Me
            </Text>
            <Flex
              width={10}
              height={10}
              bg="var(--blueGrey)"
              sx={{ borderRadius: "50%", right: 0, position: "absolute" }}
            ></Flex>
          </Flex>
          <Flex marginTop={40} sx={{ gap: 100 }}>
            <Flex flexDirection="column" alignItems="center">
              <Image width={220} height={220} src="/DiscordQR.webp"></Image>
              <Text as="p" className={rancho.className} fontSize={40} color="var(--blue)" marginTop={20}>
                Discord
              </Text>
            </Flex>
            <Flex flexDirection="column" alignItems="center">
              <Image width={220} height={220} src="/WifiQR.webp"></Image>
              <Text as="p" className={rancho.className} fontSize={40} color="var(--blue)" marginTop={20}>
                Wifi
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default Home;
