import { doc, setDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addSuject = async (req: NextApiRequest, res: NextApiResponse) => {
  await setDoc(doc(db, req.body.category, req.body.name), {
    name: req.body.name,
    category: req.body.category,
    note: req.body.note,
    difficulty: req.body.difficulty
  });
  res.end();
};

export default addSuject;
