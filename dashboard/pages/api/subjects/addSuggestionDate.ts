import { doc, updateDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addSuggestionDate = async (req: NextApiRequest, res: NextApiResponse) => {
  const subjectRef = doc(db, "subjectsParticipant", req.body.name);
  await updateDoc(subjectRef, {
    suggestionDate: req.body.suggestionDate
  });
  res.end();
};

export default addSuggestionDate;
