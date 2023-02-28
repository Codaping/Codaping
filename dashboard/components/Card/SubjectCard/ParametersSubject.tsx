import { Input, Label, Radio } from "@rebass/forms";
import axios from "axios";
import { ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { type FormEvent, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex, Text } from "rebass";

import { storage } from "../../../libraries/firebase";
import { MyButton } from "../../Buttons";

interface ParametersSubjectProps {
  pdfFile: File | undefined;
  setPdfFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

type FormValues = {
  subject: HTMLInputElement;
  category: HTMLInputElement;
  files: HTMLInputElement;
};

export const ParametersSubject = ({ ...props }: ParametersSubjectProps) => {
  const router = useRouter();
  const myRef = useRef<HTMLInputElement>();

  const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    try {
      const formattedName = (event.target as unknown as FormValues).subject.value
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
        .replaceAll(" ", "-");
      const category = (event.target as unknown as FormValues).category.value;
      await axios.post("http://localhost:3000/api/subjects/addSubject", {
        name: formattedName,
        category: category,
        note: 0,
        difficulty: ""
      });
      if (props.pdfFile) {
        const storageRef = ref(storage, `subjects/${category}/${formattedName}/${formattedName}`);
        await uploadBytes(storageRef, props.pdfFile);
        props.setPdfFile(undefined);
      }
      const folder: FileList | null = (event.target as unknown as FormValues).files.files;
      if (folder) {
        await Promise.all(
          Array.from(folder).map(async (file) => {
            const storageRef = ref(storage, `subjects/${category}/${formattedName}/${file.webkitRelativePath}`);
            await uploadBytes(storageRef, file);
          })
        );
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <Flex
      as="form"
      id="subjectForm"
      height={400}
      width={280}
      onSubmit={handleSubmit}
      sx={{
        boxShadow: "2px 2px 8px var(--blueBeige)",
        position: "relative"
      }}
    >
      <Box
        height={400}
        width={280}
        sx={{
          position: "absolute",
          zIndex: -1,
          left: 0,
          filter: "blur(0px)",
          "& > div > div > canvas": { height: "400px !important", width: "280px !important" }
        }}
      >
        <Document file={props.pdfFile}>
          <Page noData="No page specified." renderTextLayer={false} renderAnnotationLayer={false} pageNumber={1} />
        </Document>
      </Box>
      <Flex justifyContent="end" flexDirection="column" width="100%">
        <Box height="fit-content" width="100%" p={30} sx={{ backdropFilter: "blur(10px)" }}>
          <Label htmlFor="subject" color="var(--blue)" fontSize={18} fontWeight={500}>
            Subject Name
          </Label>
          <Input
            type="text"
            placeholder="Christmas Camp"
            id="subject"
            name="subject"
            color="var(--blue)"
            mt={10}
            required
          />
          <Box pt={10} width="100%" sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: 10 }}>
            <Label color="var(--blue)" fontWeight={500} alignItems="center">
              <Radio name="category" id="category" value="participant" color="var(--blueBeige)" />
              Participant
            </Label>
            <Label color="var(--blue)" fontWeight={500} alignItems="center">
              <Radio name="category" id="category" value="cobra" color="var(--blueBeige)" />
              Cobra
            </Label>
            <Label color="var(--blue)" fontWeight={500} alignItems="center">
              <Radio name="category" id="category" value="camp" color="var(--blueBeige)" />
              Camp
            </Label>
          </Box>
          <Flex mt={10} width="100%" height="fit-content" alignItems="center" sx={{ position: "relative" }}>
            <Flex
              alignItems="center"
              justifyContent="center"
              height="fit-content"
              width="fit-content"
              sx={{ gap: 10, "& > input": { opacity: 0, position: "absolute" } }}
            >
              <Text height={36} textAlign="center" fontSize={30} color="var(--blue)">
                +
              </Text>
              <Text as="p" height={20}>
                add ressources
              </Text>
              {/* @ts-ignore */}
              <input id="files" name="files" type="file" webkitdirectory="true" multiple height={30} width={40} />
            </Flex>
          </Flex>
          <MyButton
            type="submit"
            variant="contained"
            height={30}
            width={90}
            bg="var(--blue)"
            color="var(--lightBeige)"
            fontWeight={500}
            mt={20}
            sx={{ borderColor: "var(--blue)" }}
          >
            Submit
          </MyButton>
        </Box>
      </Flex>
    </Flex>
  );
};
