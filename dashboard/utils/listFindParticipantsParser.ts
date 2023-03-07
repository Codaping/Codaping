import { findParticipants } from "../libraries/queries/findParticipants";
import { listParticipantParser } from "./listParticipantParser";

export const listFindParticipantsParser = (textDoc: string[]) => {
  let occurence = -1;
  let subjectName = "";

  const participantsName = textDoc?.map((line, i) => {
    if (occurence === -1) {
      if (line?.toLowerCase().includes("subject")) occurence = i;
      else throw "Bad format, Don't find the Subject section";
    }
    if (i === occurence + 1) {
      if (line?.toLowerCase().includes("name")) subjectName = line.toLowerCase().replace("name: ", "");
      else throw "Bad format, the line after the declaration of subject section, not contain name";
    }
    return listParticipantParser(occurence, i, line);
  });
  const uniqueParticipantsName = participantsName?.filter((name) => name !== undefined) as { name: string }[];
  const names = uniqueParticipantsName.map((names) => names.name);
  findParticipants(names, subjectName);
};
