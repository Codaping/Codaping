import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import { Checkbox, Label } from "@rebass/forms";
import axios from "axios";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Flex, Text } from "rebass";

import { storage } from "../../../libraries/firebase";
import { RadioDifficulty } from "./RadioDifficulty";

interface IsHoveringProps {
  items: {
    [x: string]: string;
  };
  noteSubject: number;
  setInfoChange: React.Dispatch<React.SetStateAction<boolean>>;
  infoChange: boolean;
  difficultySubject: string;
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
    props.setInfoChange(!props.infoChange);
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

  const downloadPdf = async () => {
    const fileRef = ref(storage, props.items.fullPath);
    const urlt = await getDownloadURL(fileRef);
    const response = await fetch(urlt);
    const blob = await response.blob();
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileRef.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <Text as="p" py={10} fontSize={28} fontWeight={500} color="var(--blue)">
            {props.items.name}
          </Text>
          <Flex pb={10}>
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
          <RadioDifficulty
            difficultySubject={props.difficultySubject}
            infoChange={props.infoChange}
            items={props.items}
            setInfoChange={props.setInfoChange}
          />
        </Flex>
        <Flex justifyContent="center">
          <DownloadIcon
            onClick={downloadPdf}
            sx={{ color: "var(--blueGrey)", fontSize: 30, ":hover": { cursor: "pointer" } }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
