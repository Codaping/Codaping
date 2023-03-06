import { collection as collectionF, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const getTopicOfTheDay = async (req: NextApiRequest, res: NextApiResponse) => {
  const collections = ["subjectsParticipant", "subjectsCamp"];
  let docRef = null;

  await Promise.all(
    collections.map(async (collection) => {
      const docs = (await getDocs(query(collectionF(db, collection), where("isTopicOfTheDay", "==", true)))).docs;

      if (!docs.length) return;
      docRef = docs[0].ref;
    })
  );
  res.send(docRef ? (await getDoc(docRef)).data() : null);
};

export default getTopicOfTheDay;
