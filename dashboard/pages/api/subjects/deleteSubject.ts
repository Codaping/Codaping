import { deleteDoc, doc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const deleteSubject = async (req: NextApiRequest, res: NextApiResponse) => {
  await deleteDoc(doc(db, req.body.category, req.body.name));
  res.end();
};

export default deleteSubject;
