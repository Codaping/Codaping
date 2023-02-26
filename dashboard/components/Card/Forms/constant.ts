import axios from "axios";

const suggest = async (name: string[], difficulty: string) => {
  await axios.post("http://localhost:3000/api/search/suggestTopic", {
    difficulty: difficulty,
    names: name
  });
};

const add = async (obj: { name: string }[], subject: string) => {
  await Promise.all(
    Object.entries(obj).map(async ([_, value]) => {
      await axios.post("http://localhost:3000/api/participants/addParticipant", {
        name: value.name.toLowerCase(),
        project: subject
      });
    })
  );
};

const find = async (name: string[], subject: string) => {
  await axios.post("http://localhost:3000/api/search/findParticipants", {
    participants: name,
    subject: subject
  });
};

export const handleSubmit = async (e: React.FormEvent<HTMLDivElement>, button: string, page: string | null) => {
  e.preventDefault();

  let firstNames = {};
  let lastName = {};
  let subjectName = "";
  let difficulty = "";

  for (const [key, value] of Object.entries(e.target)) {
    if (value?.name?.includes("firstName")) firstNames = { ...firstNames, [value.name]: value.value };
    else if (value?.name?.includes("lastName")) lastName = { ...lastName, [value.name]: value.value };
    else if (value?.name?.includes("subject-name") && button == "button1") subjectName = value.value;
    else if (value?.name?.includes("difficulty") && button == "button2") difficulty = value.value;
  }
  const firstNamesArray: string[] = Object.values(firstNames);
  const lastNameArray: string[] = Object.values(lastName);
  const combinedObject = firstNamesArray.map((first, index) => {
    return { name: first + " " + lastNameArray[index] };
  });
  const name = combinedObject.map((names) => names.name);
  if (page === "add") add(combinedObject, subjectName);
  else if (page === "search" && button === "button1") find(name, subjectName);
  else if (page === "search" && button === "button2") suggest(name, difficulty);
};
