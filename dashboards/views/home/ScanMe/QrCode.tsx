import type { FC, ReactNode } from "react";
import { Flex, Image, Text } from "rebass";

interface QrCodeProps {
  srcImg: string;
  font: string;
  children: ReactNode;
}

export const QrCode: FC<QrCodeProps> = ({ ...props }) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Image width={220} height={220} src={props.srcImg}></Image>
      <Text as="p" className={props.font} fontSize={40} color="var(--blue)" marginTop={20}>
        {props.children}
      </Text>
    </Flex>
  );
};
