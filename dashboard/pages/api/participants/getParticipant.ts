import { doc, getDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const getParticipant = async (req: NextApiRequest, res: NextApiResponse) => {
  const resCollec = await getDoc(doc(db, "participant", req.body.name));
  res.send(resCollec.data());
};

export default getParticipant;
