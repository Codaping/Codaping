import { useEffect, useState } from "react";
import type { TextItem } from "react-pdf";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex } from "rebass";

import { listParticipantParser } from "../../utils/listParticipantParser";
import { PrincipalCard } from "../common/PrincipalCard";

export const AddParticipants = () => {
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

      listParticipantParser(formatedTexts);
    } catch (error) {
      console.log(error);
    }
  }, [textsDoc]);

  return (
    <Flex alignItems="center">
      <PrincipalCard
        page="add"
        title="Add Participants"
        description="Drag & Drop a file here"
        displayTop={true}
        displayRight={false}
        url={url}
        setUrl={setUrl}
        handleParse={(arr) => listParticipantParser(arr)}
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
