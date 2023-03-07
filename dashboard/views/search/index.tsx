import { useEffect, useState } from "react";
import type { TextItem } from "react-pdf";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Flex } from "rebass";

import { ExplicationCard } from "../../components/Card/ExplicationCard";
import { ResponseSearch } from "../../components/Card/ResponseSearch";
import type { Subject } from "../../types/subject";
import { downloadTemplate } from "../../utils/downloadTemplate";
import { listFindParticipantsParser } from "../../utils/listFindParticipantsParser";
import { listSuggestTopicParser } from "../../utils/listSuggestTopicParser";
import { PrincipalCard } from "../common/PrincipalCard";

export const Search = () => {
  const [wichButtonTop, setWichButtonTop] = useState<"button1" | "button2">("button1");
  const [wichButtonRight, setWichButtonRight] = useState<"button1" | "button2">("button1");
  const [suggestedSubject, setSuggestedSubject] = useState<Subject | null>(null);
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

      wichButtonRight === "button1" ? listFindParticipantsParser(formatedTexts) : listSuggestTopicParser(formatedTexts);
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
        page="search"
        title="Do a search"
        description="Drag & Drop a file here"
        displayTop={true}
        displayRight={true}
        onSuggestedSubject={(suggestedSubject) => setSuggestedSubject(suggestedSubject)}
        url={url}
        setUrl={setUrl}
        handleParse={(arr) => {
          wichButtonRight === "button1" ? listFindParticipantsParser(arr) : listSuggestTopicParser(arr);
        }}
        wichButtonRight={wichButtonRight}
        setWichButtonRight={setWichButtonRight}
        wichButtonTop={wichButtonTop}
        setWichButtonTop={setWichButtonTop}
      />
      <ExplicationCard
        title={wichButtonTop === "button1" ? "Search with pdf or image" : "Search with form"}
        section={wichButtonRight === "button1" ? "With subject" : "Without subject"}
        explanation={
          wichButtonRight === "button1"
            ? "Find out if any of the participants have already done the chosen topic"
            : "Proposal for a topic in relation to a list of participants"
        }
        obligation={
          wichButtonRight === "button1"
            ? "Download the <findParticipants> template to do the search"
            : "Download the <suggestTopic> template to do the search"
        }
        largeExplanation={
          wichButtonRight === "button1"
            ? "The participant search is used to find out if one or more of the participants you put in the list has already done the selected topic. <br /> <br /> You must download the template and follow the order set in it for adding information. The topic section has only one topic name! <br /> <br /> In the participants section, you can put as many names of participants as you want but put them in the right categories. First name and Last name. <br /> <br /> If you don't follow these instructions it won't work."
            : "The topic proposal will be based on the chosen difficulty and the list of participants you provide to propose a topic that the participants have never done. <br /> <br /> You must download the template and follow the order set in it for adding information. The difficulty section is for you to choose the level of topic you want! <br /> <br /> In the participants section, you can put as many names of participants as you want but put them in the right categories. First name and Last name. <br /> <br /> If you don't follow these instructions it won't work."
        }
        onClick={() => {
          wichButtonRight === "button1"
            ? downloadTemplate("templates/subjectName.pdf", "findParticipants")
            : downloadTemplate("templates/difficulty.pdf", "suggestTopic");
        }}
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
      {suggestedSubject && <ResponseSearch suggestedSubject={suggestedSubject} />}
    </Flex>
  );
};
