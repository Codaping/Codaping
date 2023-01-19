import { doc, setDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addParticipant = async (req: NextApiRequest, res: NextApiResponse) => {
  await setDoc(
    doc(db, "participants", req.body.name),
    {
      name: req.body.name,
      projects: [req.body.project]
    },
    { merge: true }
  );
  res.end();
};

export default addParticipant;
