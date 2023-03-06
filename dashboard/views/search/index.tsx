import { useEffect, useState } from "react";
import { Flex } from "rebass";

import { ResponseSearch } from "../../components/Card/ResponseSearch";
import type { Subject } from "../../types/subject";
import { PrincipalCard } from "../common/PrincipalCard";

export const Search = () => {
  const [suggestedSubject, setSuggestedSubject] = useState<Subject | null>(null);

  useEffect(() => {
    console.log(suggestedSubject);
  }, [suggestedSubject]);

  return (
    <Flex alignItems="center">
      <PrincipalCard
        page="search"
        title="Do a search"
        description="Drap & Drop a file here"
        displayTop={true}
        displayRight={true}
        onSuggestedSubject={(suggestedSubject) => setSuggestedSubject(suggestedSubject)}
      />
      {suggestedSubject && <ResponseSearch suggestedSubject={suggestedSubject} />}
    </Flex>
  );
};
