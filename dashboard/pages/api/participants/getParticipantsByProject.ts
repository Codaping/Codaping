import { collection, getDocs, query, where } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const getParticipantsByProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const resCollec = await getDocs(query(collection(db, "participants"), where("projects", "in", [req.body.name])));

  res.send(resCollec.docs);
};

export default getParticipantsByProject;
