import axios from "axios";

import type { Subject } from "../../../types/subject";

const suggest = async (name: string[], difficulty: string) => {
  const res = (
    await axios.post("http://localhost:3000/api/search/suggestTopic", {
      difficulty: difficulty,
      names: name
    })
  ).data as Subject;

  return res;
};

export const addParticipant = async (obj: { name: string }[], subject: string) => {
  await Promise.all(
    Object.entries(obj).map(async ([_, value]) => {
      await axios.post("http://localhost:3000/api/participants/addParticipant", {
        name: value.name,
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

export const handleSubmit = async (
  e: React.FormEvent<HTMLDivElement>,
  button: string,
  page: string | null,
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
  else if (page === "search" && button === "button1") find(name, subjectName);
  else if (page === "search" && button === "button2") {
    onSuggestedSubject && onSuggestedSubject(await suggest(name, difficulty));
  }
};

// du coup je vais noter tout ce qu'il reste comme ca on oublie rien

// 2) faire le responsive // Forms

// 4) sur la page de perso possibilité d'avoir les templates DL

// 6) ajouter des desctiptions pour les parties add/search
// faire le menu
// faire les loader
// faire l'algo pour search
// je crois que c'est tout
// C'est pas mal

// Je fais quoi ? Tu afis l'ocr ?
// oui je peux tu as un exemple ? pcq j'ai jamais fais
// https://github.com/Clement-Muth/gala-subscription/blob/master/apps/web/views/formulaire/StudentCard.tsx
// ouki, bah tu peux faire ce que tu veux d'autre, je dirais en premier le 5) pcq c'est important. d'accord, parfait
