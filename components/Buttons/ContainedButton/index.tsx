import { Button } from "rebass";

interface ButtonProps {
  text: string;
  height: number;
  color: string;
  borderColor: string;
  bg: string;
}

export const ContainedButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      variant="outline"
      color={props.color}
      width="fit-content"
      height={props.height}
      bg={props.bg}
      alignItems="center"
      display="flex"
      sx={{ border: "2px solid", borderRadius: 0, borderColor: props.borderColor, justifyContent: "center" }}
    >
      {props.text}
    </Button>
  );
};
