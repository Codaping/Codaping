import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Input, Label } from "@rebass/forms";
import { useRef } from "react";
import { Flex, Text } from "rebass";

interface DragAndDropSection {
  description?: string;
}

export const DragAndDropSection = ({ ...props }) => {
  const myRef = useRef<HTMLInputElement>();
  return (
    <Flex
      height={250}
      width={340}
      bg="#928490"
      marginTop={30}
      padding={20}
      sx={{ border: "dashed 1px ", borderColor: "var(--blue)", position: "relative" }}
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
      <Label htmlFor="browse-file" display="flex" justifyContent="center">
        <Text
          color="var(--blue)"
          height={40}
          width={100}
          bg="var(--beige)"
          alignItems="center"
          justifyContent="center"
          display="flex"
          sx={{ borderColor: "var(--beige)", ":hover": { transform: "scale(1.05)", transitionDuration: "100ms" } }}
        >
          Browse file
        </Text>
      </Label>
      <Input
        id="browse-file"
        name="browse-file"
        type="file"
        height={250}
        width={340}
        sx={{ position: "absolute", top: 0, opacity: 0 }}
        ref={myRef}
      />
    </Flex>
  );
};
