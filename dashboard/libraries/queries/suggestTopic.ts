import type { AxiosError } from "axios";
import axios from "axios";

import type { Subject } from "../../types/subject";

export const suggestTopic = async (name: string[], difficulty: string) => {
  try {
    const res = (
      await axios.post("/api/search/suggestTopic", {
        difficulty: difficulty,
        names: name
      })
    ).data as Subject | string;

    return res;
  } catch (e) {
    throw (e as AxiosError).response?.data;
  }
};
