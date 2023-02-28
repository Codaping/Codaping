import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import { Checkbox, Label } from "@rebass/forms";
import axios from "axios";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Flex, Text } from "rebass";

import { storage } from "../../../libraries/firebase";
import type { FileMetadata } from "../../../types/file";
import { RadioDifficulty } from "./RadioDifficulty";

interface IsHoveringProps {
  data: FileMetadata;
  titleSection: string;
  noteSubject: number;
  setInfoChange: React.Dispatch<React.SetStateAction<boolean>>;
  infoChange: boolean;
  difficultySubject: string;
}

export const IsHovering = ({ ...props }: IsHoveringProps) => {
  const [changeChecked, setChangeChecked] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleDeleteFile = async (path: string) => {
    const refFile = ref(storage, path);
    await deleteObject(refFile);
  };
  const handleDeleteFolder = async (subFolderPath: string) => {
    const router = useRouter();
    const desertRef = ref(storage, subFolderPath);
    const files = await listAll(desertRef);
    files.items.forEach(async (item) => {
      await handleDeleteFile(item.fullPath);
    });
    files.prefixes.forEach(async (prefixe) => {
      await handleDeleteFolder(prefixe.fullPath);
    });
    await axios.delete("http://localhost:3000/api/subjects/deleteSubject", {
      data: {
        name: props.data.name,
        category: props.titleSection
      }
    });
    router.reload();
  };

  const handleSetNoteChange = async (newNote: number) => {
    console.log(props.data?.name, props.titleSection);
    await axios.post("http://localhost:3000/api/subjects/addNote", {
      name: props.data?.name,
      category: props.titleSection,
      note: newNote
    });
    props.setInfoChange(!props.infoChange);
  };

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("checked", e.currentTarget.checked === true ? "true" : "false");
    setChangeChecked(!changeChecked);
    if (e.currentTarget.checked === true) {
      localStorage.setItem("url", props.data.url);
      localStorage.setItem("fullPath", props.data.fullPath);
    } else if (e.currentTarget.checked === false) {
      localStorage.removeItem("url");
      localStorage.removeItem("fullPath");
    }
  };

  const downloadPdf = async () => {
    const fileRef = ref(storage, props.data.fullPath);
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
    if (props.titleSection !== "cobra") {
      localStorage.getItem("checked") === "true" && localStorage.getItem("url") === props.data.url
        ? setChecked(true)
        : setChecked(false);
    }
  }, [changeChecked]);

  return (
    <Flex
      key={`${props.data.name}+hover`}
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
        <Flex
          justifyContent={props.titleSection !== "cobra" ? "space-between" : "flex-end"}
          width="100%"
          alignItems="center"
        >
          {props.titleSection !== "cobra" ? (
            <Label key={`${props.data.name}+label`}>
              <Checkbox size={30} checked={checked} color="var(--blue)" onChange={handleChangeChecked} />
            </Label>
          ) : null}
          <DeleteOutlineIcon
            sx={{ cursor: "pointer", fontSize: 30, color: "var(--blue)" }}
            onClick={() => handleDeleteFolder(props.data.subFolderPath)}
          />
        </Flex>
        <Flex alignItems="center" justifyContent="center" height="100%" flexDirection="column">
          <Text as="p" py={10} fontSize={28} fontWeight={500} color="var(--blue)">
            {props.data.name}
          </Text>
          <Flex pb={10}>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={`${index}+star`}
                sx={{
                  cursor: "pointer",
                  color: index < props.noteSubject ? "#ffe140" : "var(--blueBeige)",
                  fontSize: 40
                }}
                onClick={() => handleSetNoteChange(index + 1)}
              />
            ))}
          </Flex>
          {props.titleSection !== "cobra" ? (
            <RadioDifficulty
              difficultySubject={props.difficultySubject}
              infoChange={props.infoChange}
              data={props.data}
              titleSection={props.titleSection}
              setInfoChange={props.setInfoChange}
            />
          ) : null}
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
