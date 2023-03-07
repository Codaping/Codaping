import axios from "axios";

export const addParticipant = async (obj: { name: string }[], subject: string) => {
  await Promise.all(
    Object.entries(obj).map(async ([_, value]) => {
      await axios.post("http://localhost:3000/api/participants/addParticipant", {
        name: value.name,
        project: subject
      });
    })
  );
};
