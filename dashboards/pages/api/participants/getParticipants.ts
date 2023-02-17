import { collection, getDocs } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const getParticipants = async (_req: NextApiRequest, res: NextApiResponse) => {
  const resCollec = await getDocs(collection(db, "participants"));

  res.send(resCollec.docs);
};

export default getParticipants;
