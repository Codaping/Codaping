import { addParticipant } from "../../../libraries/queries/addParticipant";
import { findParticipants } from "../../../libraries/queries/findParticipants";
import { suggestTopic } from "../../../libraries/queries/suggestTopic";
import type { Subject } from "../../../types/subject";

export const handleSubmit = async (
  e: React.FormEvent<HTMLDivElement>,
  page: string | null,
  button?: string | undefined,
  onSuggestedSubject?: (suggestedSubject: Subject) => void
) => {
  e.preventDefault();

  let firstNames = {};
  let lastName = {};
  let subjectName = "";
  let difficulty = "";

  for (const [key, value] of Object.entries(e.target)) {
    if (value?.name?.includes("firstName"))
      firstNames = {
        ...firstNames,
        [value.name]: value.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replaceAll(" ", "-")
      };
    else if (value?.name?.includes("lastName"))
      lastName = {
        ...lastName,
        [value.name]: value.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replaceAll(" ", "-")
      };
    else if (value?.name?.includes("subject-name") && button == "button1") subjectName = value.value;
    else if (value?.name?.includes("difficulty") && button == "button2") difficulty = value.value.toLowerCase();
  }
  const firstNamesArray: string[] = Object.values(firstNames);
  const lastNameArray: string[] = Object.values(lastName);
  const combinedObject = firstNamesArray.map((first, index) => {
    return { name: first + " " + lastNameArray[index] };
  });
  const name = combinedObject.map((names) => names.name);
  if (page === "add") addParticipant(combinedObject, subjectName);
  else if (page === "search" && button === "button1") findParticipants(name, subjectName);
  else if (page === "search" && button === "button2") {
    onSuggestedSubject && onSuggestedSubject(await suggestTopic(name, difficulty));
  }
};
