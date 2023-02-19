import { doc, setDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addSuject = async (req: NextApiRequest, res: NextApiResponse) => {
  await setDoc(doc(db, "subjects", req.body.name), {
    name: req.body.name,
    note: 0
  });
  res.end();
};

export default addSuject;
