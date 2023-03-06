import { doc, getDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const getSubject = async (req: NextApiRequest, res: NextApiResponse) => {
  const collection =
    req.body.category === "participant"
      ? "subjectsParticipant"
      : req.body.category === "camp"
      ? "subjectsCamp"
      : "subjectsCobra";
  const resCollec = await getDoc(doc(db, collection, req.body.name));

  if (resCollec.exists()) res.send(resCollec.data());
  res.end();
};

export default getSubject;
