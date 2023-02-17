import { Rancho } from "@next/font/google";
import { Flex, Text } from "rebass";

import { Card } from "../../../components/Card";
import { QrCode } from "./QrCode";

const rancho = Rancho({ weight: "400", style: "normal", subsets: ["latin"] });

export const ScanMe = () => {
  return (
    <Flex height="calc(100vh - 80px)" alignItems="center" marginX={200}>
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
          <QrCode srcImg="/DiscordQR.webp" font={rancho.className}>
            Discord
          </QrCode>
          <QrCode srcImg="/WifiQR.webp" font={rancho.className}>
            Wifi
          </QrCode>
        </Flex>
      </Card>
    </Flex>
  );
};
