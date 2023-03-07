import Close from "@mui/icons-material/Close";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Router } from "next/router";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Flex } from "rebass";

export interface MenuProps {
  onClose: () => void;
}

export const MenuNoSrr = ({ onClose }: MenuProps) => {
  useEffect(() => {
    Router.events.on("routeChangeStart", onClose);

    return () => Router.events.off("routeChangeStart", onClose);
  }, []);

  return createPortal(
    <>
      <Flex
        as="section"
        minHeight={300}
        width="100%"
        bg="var(--lightBeige)"
        justifyContent="center"
        alignItems="center"
        sx={{ boxShadow: "2px 2px 8px var(--blueBeige)", position: "absolute", top: 0, left: 0, rigth: 0, zIndex: 100 }}
      >
        <Close onClick={onClose} sx={{ position: "absolute", right: "20px", top: "20px" }} />
        <Flex as="nav">
          <Flex
            as="ul"
            flexDirection="column"
            sx={{
              gap: "30px",
              "& > li": {
                "@keyframes showUp": {
                  from: { opacity: 0, transform: "translateY(15px)" },
                  top: { opacity: 1, transform: "translateY(0)" }
                },
                justifyContent: "center",
                "& > a": {
                  transition: ".2s",
                  textDecoration: "none",
                  color: "var(--blue)",
                  fontSize: 22,
                  "&:hover": {
                    transform: "scale(1.1)"
                  },
                  "&:active": {
                    color: "var(--blueBeige)"
                  }
                }
              }
            }}
          >
            <Flex as="li" sx={{ animation: "showUp .5s both", animationDelay: "0" }}>
              <Link href="/">Home</Link>
            </Flex>
            <Flex as="li" sx={{ animation: "showUp .5s both", animationDelay: ".1s" }}>
              <Link href="/search">Search</Link>
            </Flex>
            <Flex as="li" sx={{ animation: "showUp .5s both", animationDelay: ".2s" }}>
              <Link href="/add">Add</Link>
            </Flex>
            <Flex as="li" sx={{ animation: "showUp .5s both", animationDelay: ".3s" }}>
              <Link href="/subjects">Subjects</Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bg="rgba(0, 0, 0, .6)"
        width="100%"
        height="calc(100vh - 300px)"
        onClick={onClose}
        sx={{ position: "absolute", top: "300px", left: 0, rigth: 0, zIndex: 100 }}
      />
    </>,
    document.body
  );
};

export const Menu = dynamic(() => Promise.resolve(MenuNoSrr), {
  ssr: false
});
