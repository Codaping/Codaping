import "moment/locale/fr";

import type { QueryDocumentSnapshot } from "firebase/firestore/lite";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";

moment.locale("fr");

import { db } from "../../../../libraries/firebase";
import type { Participant } from "../../../../types/participant";
import type { Subject } from "../../../../types/subject";
import { suggestionWithNoChoiceDate } from "./suggestionWithNoChoiceDate";

function findOldestSuggestion(array: Subject[]) {
  let oldestSuggestionIndex = -1;
  let oldestSuggestionDate = moment();
  let oldestRealizationDate = moment();

  for (let i = 0; i < array.length; i++) {
    const suggestionDate = moment(array[i].suggestionDate, "DD MM YYYY");
    const realizationDate = moment(array[i].choiceDate, "DD MM YYYY");

    if (
      suggestionDate.unix() <= oldestSuggestionDate.unix() &&
      realizationDate.unix() <= oldestRealizationDate.unix()
    ) {
      oldestSuggestionIndex = i;
      oldestSuggestionDate = suggestionDate;
      oldestRealizationDate = realizationDate;
    }
  }

  return oldestSuggestionIndex;
}

const formatDoc = <T = any>(docs: QueryDocumentSnapshot[]): T[] => {
  return docs.map((doc) => doc.data() as T);
};

const suggestTopic = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const participants = formatDoc<Participant>(
      (await getDocs(query(collection(db, "participants"), where("name", "in", req.body.names)))).docs
    );

    participants.map((doc) => console.log(doc.projects));
    const notDoneProjects = formatDoc<Subject>(
      (
        await getDocs(
          query(
            collection(db, "subjectsParticipant"),
            where("name", "not-in", participants.map((doc) => doc.projects).flat()),
            where("difficulty", "==", req.body.difficulty)
          )
        )
      ).docs
    ).filter((subject) => subject.note >= 3);

    /* Get only subject never choosen */
    const filteredNoChoiceDate = notDoneProjects.filter((subjectNotDo) => {
      if (!subjectNotDo!.choiceDate) return subjectNotDo;
    });

    if (filteredNoChoiceDate.length) res.send(await suggestionWithNoChoiceDate(filteredNoChoiceDate));
    else {
      const oldestSuggestionIndex = findOldestSuggestion(notDoneProjects);

      res.send(notDoneProjects[oldestSuggestionIndex]);
      // const filteredNoSuggestDate = notDoneProjects.filter((subjectNotDo) => {
      //   if (!subjectNotDo.suggestionDate) return subjectNotDo;
      // });
      // if (!filteredNoSuggestDate.length) {
      //   const filteredSuggestDate = notDoneProjects.sort((a, b) => {
      //     return Date.parse(a.suggestionDate) > Date.parse(b.suggestionDate) ? 1 : -1;
      //   });
      // }
    }

    // trier par la date la plus vieille de choix et par la difficulté après proposer et checker la date de proposition, ajouter une date de proposition pour pas proposer la même chose chaque fois
  } catch (e) {
    console.error(e);

    res.status(403).send("Unauthorized request");
  }
};

export default suggestTopic;

// J'ai ces deux tableaux : "const olderChoiceDateProject = [
//   {
//     id: 1,
//     choiceDate: moment("28 09 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 03 2023", "DD MM YYYY")
//   },
//   {
//     id: 2,
//     choiceDate: moment("28 07 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 10 2023", "DD MM YYYY")
//   },
//   {
//     id: 3,
//     choiceDate: moment("28 06 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 04 2023", "DD MM YYYY")
//   },
//   {
//     id: 4,
//     choiceDate: moment("28 02 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 01 2022", "DD MM YYYY")
//   },
//   {
//     id: 5,
//     choiceDate: moment("28 01 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 02 2023", "DD MM YYYY")
//   }
// ];

// const olderSuggestDateProject = [
//   {
//     id: 2,
//     choiceDate: moment("28 07 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 10 2023", "DD MM YYYY")
//   },
//   {
//     id: 3,
//     choiceDate: moment("28 06 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 04 2023", "DD MM YYYY")
//   },
//   {
//     id: 1,
//     choiceDate: moment("28 09 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 03 2023", "DD MM YYYY")
//   },
//   {
//     id: 5,
//     choiceDate: moment("28 01 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 02 2023", "DD MM YYYY")
//   },
//   {
//     id: 4,
//     choiceDate: moment("28 02 2023", "DD MM YYYY"),
//     suggestionDate: moment("12 01 2022", "DD MM YYYY")
//   }
// ];
// "

// J'aimerair recuperer la ligne des deux tableaux avec la choiceDate et la suggestionDate les plus anciennes mais avec le même id. Aussi j'aimerai que la choiceDate du resultat soit plus ancienne que la suggestionDate
