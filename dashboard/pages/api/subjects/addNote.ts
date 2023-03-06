import { doc, updateDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const collection =
    req.body.category === "participant"
      ? "subjectsParticipant"
      : req.body.category === "camp"
      ? "subjectsCamp"
      : "subjectsCobra";
  const subjectRef = doc(db, collection, req.body.name);
  await updateDoc(subjectRef, {
    note: req.body.note
  });
  res.end();
};

export default addNote;
