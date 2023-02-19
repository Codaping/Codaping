import { doc, updateDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const subjectRef = doc(db, "subjects", req.body.name);
  await updateDoc(subjectRef, {
    note: req.body.note
  });
  res.end();
};

export default addNote;
