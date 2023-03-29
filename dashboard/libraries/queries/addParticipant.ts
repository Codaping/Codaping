import type { AxiosError } from "axios";
import axios from "axios";

export const addParticipant = async (obj: { name: string }[], subject: string) => {
  try {
    await Promise.all(
      Object.entries(obj).map(async ([_, value]) => {
        await axios.post("/api/participants/addParticipant", {
          name: value.name,
          project: subject
        });
      })
    );
  } catch (e) {
    throw (e as AxiosError).response?.data;
  }
};
