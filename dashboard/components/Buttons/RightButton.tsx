import type { ReactNode } from "react";
import type { ButtonProps } from "rebass";
import { Button } from "rebass";

import { rajdhani } from "../../pages/_app";

interface RightButtonProps {
  children: ReactNode;
  pressed: boolean;
  onClick: () => void;
}

export const RightButton = ({ pressed, ...props }: ButtonProps & RightButtonProps) => {
  return (
    <Button
      width={[120, 140]}
      height={40}
      bg="var(--blueBeige)"
      fontSize={["14px", "16px"]}
      color={pressed ? "var(--blue)" : "var(--lightBeige)"}
      className={rajdhani.className}
      p={["4px 8px", "8px 16px"]}
      {...props}
      sx={{
        borderRadius: 0,
        ...(pressed
          ? { borderColor: "black", border: "1px solid", borderBottomStyle: "none", transform: "scale(1.05)" }
          : { borderColor: "var(--blueBeige)", ":hover": { color: "var(--blue)" } })
      }}
    >
      {props.children}
    </Button>
  );
};
