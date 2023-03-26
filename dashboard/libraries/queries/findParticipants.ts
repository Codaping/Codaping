import type { AxiosError } from "axios";
import axios from "axios";

export const findParticipants = async (name: string[], subject: string) => {
  try {
    const res = (
      await axios.post("http://localhost:3000/api/search/findParticipants", {
        participants: name,
        subject: subject
      })
    ).data as string[];
    return res;
  } catch (e) {
    throw (e as AxiosError).response?.data;
  }
};
