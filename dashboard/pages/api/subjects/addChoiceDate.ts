import { doc, updateDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addChoiceDate = async (req: NextApiRequest, res: NextApiResponse) => {
  const subjectRef = doc(db, "subjectsParticipant", req.body.name);
  await updateDoc(subjectRef, {
    choiceDate: req.body.choiceDate
  });
  res.end();
};

export default addChoiceDate;
