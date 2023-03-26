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

    const notDoneProjects = formatDoc<Subject>(
      participants.length
        ? (
            await getDocs(
              query(
                collection(db, "subjectsParticipant"),
                where("name", "not-in", participants.map((doc) => doc.projects).flat()),
                where("difficulty", "==", req.body.difficulty)
              )
            )
          ).docs
        : (await getDocs(query(collection(db, "subjectsParticipant"), where("difficulty", "==", req.body.difficulty))))
            .docs
    ).filter((subject) => subject.note >= 3);

    const filteredNoChoiceDate = notDoneProjects.filter((subjectNotDo) => {
      if (!subjectNotDo!.choiceDate) return subjectNotDo;
    });

    if (filteredNoChoiceDate.length) {
      const result = await suggestionWithNoChoiceDate(filteredNoChoiceDate);
      if (result) res.send(result);
      else res.status(400).send("All subjects have already done by one of the participants of the list");
    } else {
      const oldestSuggestionIndex = findOldestSuggestion(notDoneProjects);

      const result = notDoneProjects[oldestSuggestionIndex];

      res.send(result ?? "All subjects have already done by one of the participants of the list");
    }
  } catch (e) {
    console.error(e);

    res.status(403).send("An error occured, please try later");
  }
};

export default suggestTopic;
