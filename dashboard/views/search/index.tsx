import { useState } from "react";
import { Flex } from "rebass";

import { ResponseSearch } from "../../components/Card/ResponseSearch";
import type { Subject } from "../../types/subject";
import { PrincipalCard } from "../common/PrincipalCard";

export const Search = () => {
  const [suggestedSubject, setSuggestedSubject] = useState<Subject | null>(null);
  const [url, setUrl] = useState<string | ArrayBuffer>("");

  return (
    <Flex
      alignItems="center"
      py={[6, 6, 6, 0]}
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
        handleParse={(_arr) => null}
      />
      {suggestedSubject && <ResponseSearch suggestedSubject={suggestedSubject} />}
    </Flex>
  );
};
