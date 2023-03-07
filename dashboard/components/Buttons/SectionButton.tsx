import type { ReactNode } from "react";

import { MyButton } from ".";

interface SectionButtonProps {
  children: ReactNode;
  pressed: boolean;
  onClick: () => void;
}

export const SectionButton = ({ pressed, ...props }: SectionButtonProps) => {
  return (
    <MyButton
      variant="contained"
      width={[130, 130, 170]}
      height={[40, 40, 50]}
      fontSize={["14px", "14px", "16px"]}
      bg="var(--blueBeige)"
      color={pressed ? "var(--blue)" : "var(--lightBeige)"}
      {...props}
      sx={{
        ...(pressed
          ? { transform: "scale(1.04)", borderColor: "black", border: "1px solid", borderBottomStyle: "none" }
          : { borderColor: "var(--blueBeige)", ":hover": { color: "var(--blue)" } })
      }}
    >
      {props.children}
    </MyButton>
  );
};
