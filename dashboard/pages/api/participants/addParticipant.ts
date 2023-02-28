import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addParticipant = async (req: NextApiRequest, res: NextApiResponse) => {
  const docRef = await doc(db, "participant", req.body.name);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      projects: arrayUnion(req.body.project)
    });
  } else {
    await setDoc(doc(db, "participant", req.body.name), {
      name: req.body.name,
      projects: [req.body.project]
    });
  }
  res.end();
};

export default addParticipant;
