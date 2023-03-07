import axios from "axios";

export const findParticipants = async (name: string[], subject: string) => {
  await axios.post("http://localhost:3000/api/search/findParticipants", {
    participants: name,
    subject: subject
  });
};
