import { collection, getDocs } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../libraries/firebase";

const getSubjectsParticipant = async (_: NextApiRequest, res: NextApiResponse) => {
  const resCollec = await getDocs(collection(db, "participant"));
  res.send(
    resCollec.docs.map((doc) => {
      return doc.data();
    })
  );
};

export default getSubjectsParticipant;
