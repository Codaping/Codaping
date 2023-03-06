import { doc, setDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addSubject = async (req: NextApiRequest, res: NextApiResponse) => {
  const collection =
    req.body.category === "participant"
      ? "subjectsParticipant"
      : req.body.category === "camp"
      ? "subjectsCamp"
      : "subjectsCobra";
  await setDoc(doc(db, collection, req.body.name), {
    name: req.body.name,
    category: req.body.category,
    note: req.body.note,
    difficulty: req.body.difficulty
  });
  res.end();
};

export default addSubject;
