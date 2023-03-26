import { addParticipant } from "../../../libraries/queries/addParticipant";
import { findParticipants } from "../../../libraries/queries/findParticipants";
import { suggestTopic } from "../../../libraries/queries/suggestTopic";
import type { Subject } from "../../../types/subject";

export const handleSubmit = async (
  e: React.FormEvent<HTMLDivElement>,
  page: string | null,
  button?: string | undefined,
  onSuggestedSubject?: (suggestedSubject: Subject | string[] | string) => void
) => {
  e.preventDefault();

  let firstNames = {};
  let lastName = {};
  let subjectName = "";
  let difficulty = "";

  for (const [key, value] of Object.entries(e.target)) {
    if (value?.name?.includes("firstName")) {
      if (!value.value) throw "A First name is empty";
      firstNames = {
        ...firstNames,
        [value.name]: value.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replaceAll(" ", "-")
      };
    } else if (value?.name?.includes("lastName")) {
      if (!value.value) throw "A Last name is empty";
      lastName = {
        ...lastName,
        [value.name]: value.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replaceAll(" ", "-")
      };
    } else if (value?.name?.includes("subject-name") && button == "button1") {
      if (!value.value)
        throw "<a href='/subjects' style='color: darkred; font-weight: 600; text-decoration: none;'>Add a subject</a>";

      subjectName = value.value;
    } else if (value?.name?.includes("difficulty") && button == "button2") difficulty = value.value.toLowerCase();
  }

  const firstNamesArray: string[] = Object.values(firstNames);
  const lastNameArray: string[] = Object.values(lastName);

  let combinedObject = null;

  combinedObject = firstNamesArray.map((first, index) => {
    if (first.length && lastNameArray[index].length) {
      return { name: first + " " + lastNameArray[index] };
    }
    throw "vide";
  });

  const name = combinedObject?.map((names) => names?.name);

  if (name && combinedObject) {
    if (page === "add") await addParticipant(combinedObject, subjectName);
    else if (page === "search" && button === "button1")
      onSuggestedSubject && onSuggestedSubject(await findParticipants(name, subjectName));
    else if (page === "search" && button === "button2") {
      onSuggestedSubject && onSuggestedSubject(await suggestTopic(name, difficulty));
    }
  }
};
