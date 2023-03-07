import axios from "axios";

import type { Subject } from "../../types/subject";

export const suggestTopic = async (name: string[], difficulty: string) => {
  const res = (
    await axios.post("http://localhost:3000/api/search/suggestTopic", {
      difficulty: difficulty,
      names: name
    })
  ).data as Subject;

  return res;
};
