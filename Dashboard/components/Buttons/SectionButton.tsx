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
      width={170}
      height={50}
      bg="var(--blueBeige)"
      color={pressed ? "var(--blue)" : "var(--lightBeige)"}
      {...props} // T'as oublié de passer le reste des propriétés
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
