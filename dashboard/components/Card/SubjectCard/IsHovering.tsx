import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import { Checkbox, Label } from "@rebass/forms";
import axios from "axios";
import { deleteObject, listAll, ref } from "firebase/storage";
import { useRouter } from "next/router";
import React from "react";
import { Flex, Text } from "rebass";

import { storage } from "../../../libraries/firebase";
import type { FileMetadata } from "../../../types/file";
import type { Subject } from "../../../types/subject";
import { DownloadPdf } from "../../../views/common/DownloadPdf";
import { RadioDifficulty } from "./RadioDifficulty";

interface IsHoveringProps {
  data: FileMetadata;
  titleSection: string;
  noteSubject: number;
  setInfoChange: React.Dispatch<React.SetStateAction<boolean>>;
  infoChange: boolean;
  difficultySubject: string;
  onCheck: () => void;
  checked: boolean;
  updateSubject: (category: any, v: (s: Subject[]) => Subject[]) => void;
  updatefileMetadata: (category: any, v: (s: FileMetadata[] | undefined) => FileMetadata[]) => void;
}

export const IsHovering = ({ updateSubject, updatefileMetadata, ...props }: IsHoveringProps) => {
  const router = useRouter();

  const handleDeleteFile = async (path: string) => {
    const refFile = ref(storage, path);
    await deleteObject(refFile);
  };
  const handleDeleteFolder = async (subFolderPath: string) => {
    const desertRef = ref(storage, subFolderPath);
    const files = await listAll(desertRef);
    await Promise.all(
      files.items.map(async (item) => {
        await handleDeleteFile(item.fullPath);
      })
    );
    await Promise.all(
      files.prefixes.map(async (prefixe) => {
        await handleDeleteFolder(prefixe.fullPath);
      })
    );
    await axios.delete("http://localhost:3000/api/subjects/deleteSubject", {
      data: {
        name: props.data.name.replace(".pdf", ""),
        category: props.titleSection
      }
    });
    updateSubject(props.titleSection, (subjects) =>
      subjects.filter((sub) => sub.name !== props.data.name.replace(".pdf", ""))
    );
    updatefileMetadata(props.titleSection, (fileMetadata) =>
      fileMetadata!.filter((file) => file.name !== props.data.name)
    );
  };

  const handleSetNoteChange = async (newNote: number) => {
    await axios.post("http://localhost:3000/api/subjects/addNote", {
      name: props.data?.name.replace(".pdf", ""),
      category: props.titleSection,
      note: newNote
    });
    props.setInfoChange(!props.infoChange);
  };

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
              <Checkbox size={30} checked={props.checked} color="var(--blue)" onChange={props.onCheck} />
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
          <DownloadPdf name={props.data.name.replace(".pdf", "")} path={props.data.subFolderPath} />
        </Flex>
      </Flex>
    </Flex>
  );
};
