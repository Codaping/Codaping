import { collection, getDocs } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../libraries/firebase";

const suggestTopic = async (req: NextApiRequest, res: NextApiResponse) => {
  const subjectsCollec = await getDocs(collection(db, "subjects"));
  const partiCollec = await getDocs(collection(db, "participant"));

  const subjects = partiCollec.docs.flatMap((namedb) => {
    const matchedNames = req.body.names.filter((name: string) => namedb.data().name === name);
    return matchedNames.flatMap(() => namedb.data().projects);
  });
  const uniqueSubjects = [...new Set(subjects)];
  console.log(uniqueSubjects);
  const subjectsNoDo = subjectsCollec.docs.flatMap((subjectdb) => {
    if (!uniqueSubjects.includes(subjectdb.data().name) && subjectdb.data().note >= 3) return subjectdb.data().name;
  });
  const filteredSubjectsNoDo = subjectsNoDo.filter((subject) => subject !== undefined);
  console.log(filteredSubjectsNoDo);
};

export default suggestTopic;
