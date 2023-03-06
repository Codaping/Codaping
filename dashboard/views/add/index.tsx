import { Flex } from "rebass";

import { PrincipalCard } from "../common/PrincipalCard";

export const AddParticipants = () => {
  return (
    <Flex alignItems="center">
      <PrincipalCard
        page="add"
        title="Add Participants"
        description="Drap & Drop a file here"
        displayTop={true}
        displayRight={false}
      />
    </Flex>
  );
};
