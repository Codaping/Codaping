import { addParticipant } from "../libraries/queries/addParticipant";

export const listAddParser = async (textDoc: string[]) => {
  let occurence = -1;
  let subjectName = "";
  let occurenceParticipants = -1;
  let firstName = "";
  let lastName = "";

  const participantsName = textDoc?.map((line, i) => {
    if (occurence === -1) {
      if (line?.toLowerCase().includes("subject")) occurence = i;
      else throw "Bad format, Don't find the Subject section";
    }
    if (i === occurence + 1) {
      if (line?.toLowerCase().includes("name")) subjectName = line.toLowerCase().replace("name: ", "");
      else throw "Bad format, the line after the declaration of subject section, not contain name";
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
      } else throw "Bad format, the lines after the declaration of subject section, not contain first and last name";
    }
  });
  const uniqueParticipantsName = participantsName?.filter((name) => name !== undefined) as { name: string }[];

  await addParticipant(uniqueParticipantsName, subjectName);
};
