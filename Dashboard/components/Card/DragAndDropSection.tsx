import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Flex, Text } from "rebass";

import { ContainedButton } from "../Buttons/ContainedButton";

interface DragAndDropSection {
  description: string;
}

export const DragAndDropSection = ({ ...props }) => {
  return (
    <Flex
      height={250}
      width={340}
      bg="#928490"
      marginTop={30}
      padding={20}
      sx={{ border: "dashed 1px ", borderColor: "var(--blue)" }}
      flexDirection="column"
      alignItems="center"
    >
      <FolderOpenIcon sx={{ color: "var(--beige)", fontSize: 90 }} />
      <Text as="p" color="var(--lightBeige)">
        {props.description}
      </Text>
      <Text as="p" color="var(--beige)" paddingY={10}>
        OR
      </Text>
      <ContainedButton color="var(--blue)" height={40} bg="var(--beige)" sx={{ borderColor: "var(--beige)" }}>
        Browse file
      </ContainedButton>
    </Flex>
  );
};
