import { Button } from "rebass";
import { rajdhani } from "../../../pages/_app";

export interface ButtonProps {
  text: string;
  height: number;
  colorString: string;
  borderColor: string;
  bg: string;
}

export const ContainedButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      color={props.colorString}
      width="fit-content"
      height={props.height}
      bg={props.bg}
      alignItems="center"
      display="flex"
      className={rajdhani.className}
      sx={{
        border: "2px solid",
        borderRadius: 0,
        borderColor: props.borderColor,
        justifyContent: "center",
        cursor: "pointer",
        ":hover": { transform: "scale(1.05)", transitionDuration: "100ms" },
      }}
    >
      {props.text}
    </Button>
  );
};
