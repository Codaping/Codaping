import InfoIcon from "@mui/icons-material/Info";
import { Popover } from "@mui/material";
import type { MouseEvent } from "react";
import { useState } from "react";
import { Box, Flex, Text } from "rebass";

interface ExplicationCardProps {
  title: string;
  section?: string;
  explanation: string;
  largeExplanation: string;
  obligation: string;
  onClick: () => void;
  button: boolean;
}

export const ExplicationCard = ({ ...props }: ExplicationCardProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Flex justifyContent="center" mt={[5, 5, 5, 0]}>
      <Flex
        width={["80%", 380]}
        height="fit-content"
        bg="var(--beige)"
        p={[10, 40]}
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{ border: "solid 1px var(--blue)", transform: "rotate(-5deg)", position: "relative" }}
      >
        <Flex
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <InfoIcon sx={{ color: "var(--blueGrey)", fontSize: "20px" }} />
        </Flex>
        <Popover
          id="mouse-over-popover"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
          sx={{
            pointerEvents: "none"
          }}
        >
          <Text as="p" p={10} width={400} dangerouslySetInnerHTML={{ __html: props.largeExplanation }} />
        </Popover>
        <Text as="p" fontSize={24} color="var(--blue)" mt={[20, 0]}>
          {props.title}
        </Text>
        <Text as="p" fontSize={20} pb={20} color="var(--blueBeige)">
          {props.section}
        </Text>
        <Text as="p" fontSize={18} color="var(--blueGrey)">
          {props.explanation}
        </Text>
        {props.button === true ? (
          <Box
            bg="var(--blueBeige)"
            p={1}
            mt={20}
            onClick={props.onClick}
            sx={{ border: "solid 1px var(--blue)", ":hover": { cursor: "pointer", filter: "brightness(0.8)" } }}
          >
            <Text as="p" fontSize={18} color="var(--lightBeige)">
              {props.obligation}
            </Text>
          </Box>
        ) : null}
      </Flex>
    </Flex>
  );
};
