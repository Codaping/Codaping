import { type ButtonProps, Button } from "rebass";

import { rajdhani } from "../../../pages/_app";

export const OutlainedButton = ({ ...props }: ButtonProps & { sx: { borderColor: string } }) => {
  return (
    <Button
      variant="outline"
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
        // @ts-ignore
        ":hover": { bg: props.sx?.borderColor, transitionDuration: "200ms" },
        ...props.sx
      }}
    >
      {props.children}
    </Button>
  );
};
