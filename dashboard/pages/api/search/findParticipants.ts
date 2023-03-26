import { collection, getDocs } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const findParticipants = async (req: NextApiRequest, res: NextApiResponse) => {
  const resCollec = await getDocs(collection(db, "participants"));
  let tab: any[] = [];
  tab = resCollec.docs.map((doc) => {
    return doc.data();
  });
  const resp: any[] = [];
  req.body.participants.forEach((v: string) => {
    tab.forEach((v2) => {
      if (v2.name === v) {
        v2.projects.forEach((t: string) => {
          if (t === req.body.subject) resp.push(v2.name);
        });
      }
    });
  });
  res.send(resp.length ? resp : "No participants have done this projet");
};

export default findParticipants;
