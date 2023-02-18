import { Input, Label } from "@rebass/forms";
import axios from "axios";
import { ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { type FormEvent } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex } from "rebass";

import { storage } from "../../../libraries/firebase";
import { MyButton } from "../../Buttons";

interface NameSubjectProps {
  pdfFile: File | undefined;
  setPdfFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

type FormValues = {
  subject: HTMLInputElement;
};

export const NameSubject = ({ ...props }: NameSubjectProps) => {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/subjects/addSubject", {
        name: (event.target as unknown as FormValues).subject.value
      });
      if (props.pdfFile) {
        const formattedName = (event.target as unknown as FormValues).subject.value
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim()
          .replaceAll(" ", "-");
        const storageRef = ref(storage, `subjects/${(event.target as unknown as FormValues).subject.value}`);
        await uploadBytes(storageRef, props.pdfFile);
        props.setPdfFile(undefined);
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
          <MyButton
            type="submit"
            variant="contained"
            height={35}
            width={100}
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
