import { Box, Flex, Text } from "rebass";
import { Rancho } from "@next/font/google";
import { useEffect, useState } from "react";

const rancho = Rancho({ weight: "400", style: "normal" });

const Home = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <Flex
      sx={{ gap: 150 }}
      height={height - 80}
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        width={450}
        height={437}
        backgroundColor="var(--blueBeige)"
        padding={30}
        flexDirection="column"
        alignItems="center"
      >
        <Text as="p" color="var(--lightBeige)" fontSize={32} fontWeight={300}>
          Topic of the day
        </Text>
        <Flex
          height={250}
          width={340}
          bg="#928490"
          marginTop={30}
          sx={{ border: "dashed 1px ", borderColor: "var(--blue)" }}
        ></Flex>
      </Flex>
      <Flex
        width={609}
        height={437}
        backgroundColor="var(--beige)"
        justifyContent="center"
        padding={20}
      >
        <Text
          color="var(--blue)"
          fontSize={40}
          fontWeight={300}
          fontFamily={rancho.className}
        >
          Scan Me
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
