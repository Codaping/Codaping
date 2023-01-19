import { type ButtonProps, Button } from "rebass";

import { rajdhani } from "../../pages/_app";

export const MyButton = ({ ...props }: ButtonProps & { variant: "outlined" | "contained" }) => {
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
        ...(props.variant == "contained"
          ? { ":hover": { transform: "scale(1.05)", transitionDuration: "100ms" }, ...props.sx }
          : // @ts-ignore
            { ":hover": { bg: props.sx?.borderColor, transitionDuration: "200ms" }, ...props.sx })
      }}
    >
      {props.children}
    </Button>
  );
};
