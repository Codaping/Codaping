import { doc, getDoc } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const getSubject = async (req: NextApiRequest, res: NextApiResponse) => {
  const resCollec = await getDoc(doc(db, req.body.category, req.body.name));

  if (resCollec.exists()) res.send(resCollec.data());
};

export default getSubject;
