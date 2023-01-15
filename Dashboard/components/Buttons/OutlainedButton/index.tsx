import { Button } from "rebass";
import { rajdhani } from "../../../pages/_app";
import { ButtonProps } from "../ContainedButton";

export const OutlainedButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      variant="outline"
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
        ":hover" : {bg: props.borderColor, transitionDuration: "200ms"}
      }}
    >
      {props.text}
    </Button>
  );
};
