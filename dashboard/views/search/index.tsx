import { Flex } from "rebass";

import { PrincipalCard } from "../common/PrincipalCard";

export const Search = () => {
  return (
    <Flex alignItems="center">
      <PrincipalCard
        page="search"
        title="Do a search"
        description="Drap & Drop a file here"
        displayTop={true}
        displayRight={true}
      />
      {/* <NameParticipant /> */}
    </Flex>
  );
};
