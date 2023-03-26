import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const addParticipant = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.project === null) res.status(400).send("The name of the subject is empty");
  if (req.body.name === null) res.status(400).send("The participants name is empty");

  const docRef = doc(db, "participants", req.body.name);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      projects: arrayUnion(req.body.project)
    });
  } else {
    await setDoc(doc(db, "participants", req.body.name), {
      name: req.body.name,
      projects: [req.body.project]
    });
  }
  res.end();
};

export default addParticipant;
