import { suggestTopic } from "../libraries/queries/suggestTopic";
import { listParticipantParser } from "./listParticipantParser";

export const listSuggestTopicParser = (textDoc: string[]) => {
  let occurence = -1;
  let difficulty = "";

  const participantsName = textDoc?.map((line, i) => {
    if (occurence === -1) {
      if (line?.toLowerCase().includes("difficulty")) occurence = i;
      else throw "Bad format, Don't find the Difficulty section";
    }
    if (i === occurence + 1) {
      if (line?.toLowerCase().includes("difficulty")) difficulty = line.toLowerCase().replace("difficulty: ", "");
      else throw "Bad format, the line after the declaration of difficulty section, not contain difficulty value";
    }
    return listParticipantParser(occurence, i, line);
  });
  const uniqueParticipantsName = participantsName?.filter((name) => name !== undefined) as { name: string }[];
  const names = uniqueParticipantsName.map((names) => names.name);
  suggestTopic(names, difficulty);
};
