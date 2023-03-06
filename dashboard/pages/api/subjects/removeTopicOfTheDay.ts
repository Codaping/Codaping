import { collection as collectionF, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const removeTopicOfTheDay = async (_req: NextApiRequest, res: NextApiResponse) => {
  const collections = ["subjectsParticipant", "subjectsCamp"];
  let docRef = null;

  await Promise.all(
    collections.map(async (collection) => {
      const docs = (await getDocs(query(collectionF(db, collection), where("isTopicOfTheDay", "==", true)))).docs;

      if (!docs.length) return;
      await updateDoc(docs[0].ref, {
        isTopicOfTheDay: false
      });
      docRef = docs[0].ref;
    })
  );
  res.send(docRef ? (await getDoc(docRef)).data() : null);
};

export default removeTopicOfTheDay;
