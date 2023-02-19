import { Flex } from "rebass";

import { NameParticipant } from "../../components/Card/NameParticipant";
import { PrincipalCard } from "../../components/Card/PrincipalCard";

export const Search = () => {
  return (
    <Flex alignItems="center">
      <PrincipalCard title="Do a search" description="Drap & Drop a file here" display={true} />
      <NameParticipant />
    </Flex>
  );
};
