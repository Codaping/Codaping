import { type ButtonProps, Button } from "rebass";

import { rajdhani } from "../../../pages/_app";

export const ContainedButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      width="fit-content"
      alignItems="center"
      display="flex"
      className={rajdhani.className}
      {...props}
      sx={{
        border: "2px solid",
        borderRadius: 0,
        justifyContent: "center",
        cursor: "pointer",
        ":hover": { transform: "scale(1.05)", transitionDuration: "100ms" },
        ...props.sx
      }}
    >
      {props.children}
    </Button>
  );
};
