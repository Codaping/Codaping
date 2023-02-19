import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import { Checkbox, Label } from "@rebass/forms";
import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Flex, Text } from "rebass";

import { storage } from "../../../libraries/firebase";

interface IsHoveringProps {
  items: {
    [x: string]: string;
  };
  noteSubject: number;
  setNoteChange: React.Dispatch<React.SetStateAction<boolean>>;
  noteChange: boolean;
}

export const IsHovering = ({ ...props }: IsHoveringProps) => {
  const [changeChecked, setChangeChecked] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleDeleteFile = async (fullPath: string) => {
    const desertRef = ref(storage, fullPath);
    await deleteObject(desertRef);
  };

  const handleSetNoteChange = async (newNote: number) => {
    await axios.post("http://localhost:3000/api/subjects/addNote", {
      name: props.items?.name,
      note: newNote
    });
    props.setNoteChange(!props.noteChange);
  };

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("checked", e.currentTarget.checked === true ? "true" : "false");
    setChangeChecked(!changeChecked);
    if (e.currentTarget.checked === true) {
      localStorage.setItem("url", props.items.url);
      localStorage.setItem("fullPath", props.items.fullPath);
    } else if (e.currentTarget.checked === false) {
      localStorage.removeItem("url");
      localStorage.removeItem("fullPath");
    }
  };

  useEffect(() => {
    localStorage.getItem("checked") === "true" && localStorage.getItem("url") === props.items.url
      ? setChecked(true)
      : setChecked(false);
  }, [changeChecked]);

  return (
    <Flex
      width="inherit"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)"
      }}
    >
      <Flex width="100%" flexDirection="column" p={20}>
        <Flex justifyContent="space-between" width="100%" alignItems="center">
          <Label>
            <Checkbox size={30} checked={checked} color="var(--blue)" onChange={handleChangeChecked} />
          </Label>
          <DeleteOutlineIcon
            sx={{ cursor: "pointer", fontSize: 30, color: "var(--blue)" }}
            onClick={() => handleDeleteFile(props.items.fullPath)}
          />
        </Flex>
        <Flex alignItems="center" justifyContent="center" height="100%" flexDirection="column">
          <Text as="p" py={10} fontSize={28}>
            {props.items.name}
          </Text>
          <Text as="p" py={10} fontSize={20}>
            Please note
          </Text>
          <Flex>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                sx={{
                  cursor: "pointer",
                  color: index < props.noteSubject ? "#ffe140" : "var(--blueBeige)",
                  fontSize: 40
                }}
                onClick={() => handleSetNoteChange(index + 1)}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
