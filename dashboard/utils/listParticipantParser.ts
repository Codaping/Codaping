export const listParticipantParser = (occurence: number, i: number, line: string) => {
  let occurenceParticpants = -1;
  let firstName = "";
  let lastName = "";

  if (i === occurence + 2) {
    if (line?.toLowerCase().includes("participants")) occurenceParticpants = i;
    else throw "Bad format, Don't find the Participants section";
  }
  if (occurenceParticpants != -1 && i >= occurenceParticpants + 1) {
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
};
