import { suggestTopic } from "../libraries/queries/suggestTopic";

export const listSuggestTopicParser = async (textDoc: string[]) => {
  let occurence = -1;
  let difficulty = "";
  let occurenceParticipants = -1;
  let firstName = "";
  let lastName = "";

  console.log(textDoc);
  const participantsName = textDoc?.map((line, i) => {
    if (occurence === -1) {
      if (line?.toLowerCase().includes("difficulty")) occurence = i;
      else throw "Bad format, Don't find the Difficulty section";
    }
    if (i === occurence + 1) {
      if (line?.toLowerCase().includes("difficulty")) difficulty = line.toLowerCase().replace("difficulty: ", "");
      else throw "Bad format, the line after the declaration of difficulty section, not contain difficulty value";
    }
    if (i === occurence + 2) {
      if (line?.toLowerCase().includes("participants")) occurenceParticipants = i;
      else throw "Bad format, Don't find the Participants section";
    }
    if (occurenceParticipants != -1 && i >= occurenceParticipants + 1) {
      if (line?.toLowerCase().includes("firstname")) {
        firstName = line
          .toLowerCase()
          .replaceAll("firstname: ", "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replaceAll(" ", "-");
      } else if (line?.toLowerCase().includes("lastname")) {
        lastName = line
          .toLowerCase()
          .replaceAll("lastname: ", "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replaceAll(" ", "-");
        return { name: firstName + " " + lastName };
      } else
        throw "Bad format, the lines after the declaration of participants section, not contain first or last name";
    }
  });
  const uniqueParticipantsName = participantsName?.filter((name) => name !== undefined) as { name: string }[];
  const names = uniqueParticipantsName.map((names) => names.name);
  return await suggestTopic(names, difficulty);
};
