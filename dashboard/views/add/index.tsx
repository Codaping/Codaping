import { useEffect, useState } from "react";
import type { TextItem } from "react-pdf";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex } from "rebass";

import { ExplicationCard } from "../../components/Card/ExplicationCard";
import { downloadTemplate } from "../../utils/downloadTemplate";
import { listAddParser } from "../../utils/listAddParser";
import { PrincipalCard } from "../common/PrincipalCard";

export const AddParticipants = () => {
  const [wichButtonTop, setWichButtonTop] = useState<"button1" | "button2">("button1");
  const [url, setUrl] = useState<string | ArrayBuffer>("");
  const [textsDoc, setTextsDoc] = useState<TextItem[]>();
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  useEffect(() => {
    try {
      if (!textsDoc?.length) return;
      const formatedTexts = textsDoc
        ?.map((text) => {
          if (text.str.length) return text.str;
        })
        .filter((text) => text !== undefined) as string[];

      listAddParser(formatedTexts);
    } catch (error) {
      console.log(error);
    }
  }, [textsDoc]);

  return (
    <Flex
      alignItems="center"
      py={[5, 5, 5, 0]}
      flexDirection={["column", "column", "column", "row"]}
      sx={{ "& > div": { flex: 1 } }}
    >
      <PrincipalCard
        page="add"
        title="Add Participants"
        description="Drag & Drop a file here"
        displayTop={true}
        displayRight={false}
        url={url}
        setUrl={setUrl}
        handleParse={(arr) => listAddParser(arr)}
        wichButtonTop={wichButtonTop}
        setWichButtonTop={setWichButtonTop}
      />
      <ExplicationCard
        title={wichButtonTop === "button1" ? "Add with pdf or image" : "Add with form"}
        explanation="Add participants relate to the topic they have made"
        obligation="Download the <addParticipants> template to perform the addition"
        largeExplanation="You can add the participants related to the topic they made. <br /> <br /> You must download the template and follow the order set in it for adding information. The topic section has only one topic name! <br /> <br /> In the participants section, you can put as many names of participants as you want but put them in the right categories. First name and Last name. <br /> <br /> If you don't follow these instructions it won't work."
        onClick={() => downloadTemplate("templates/subjectName.pdf", "addParticipants")}
        button={wichButtonTop === "button1" ? true : false}
      />
      {url && (
        <Box
          height={300}
          width={210}
          display="none"
          sx={{
            position: "absolute",
            left: 0,
            filter: "blur(0px)",
            "& > div > div > canvas": { height: "300px !important", width: "210px !important" }
          }}
        >
          <Document file={url}>
            <Page
              noData="No page specified."
              renderTextLayer
              renderMode="none"
              pageNumber={1}
              onGetTextSuccess={(page) => {
                setTextsDoc(page.items);
              }}
            />
          </Document>
        </Box>
      )}
    </Flex>
  );
};
