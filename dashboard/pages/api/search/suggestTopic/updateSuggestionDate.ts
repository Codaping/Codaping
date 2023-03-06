import { randomInt } from "crypto";
import { doc, updateDoc } from "firebase/firestore/lite";
import moment from "moment";

import { db } from "../../../../libraries/firebase";

export const updateSuggestionDate = async (list: any[], random = true) => {
  const randomSubjectOccurence = list.length > 0 ? randomInt(list.length) : 0;

  const subjectRef = doc(db, "subjectsParticipant", list[random ? randomSubjectOccurence : 0].name);

  await updateDoc(subjectRef, {
    suggestionDate: moment().format("DD MM YYYY")
  });

  return list[randomSubjectOccurence];
};
