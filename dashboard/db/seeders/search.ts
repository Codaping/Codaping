import axios from "axios";

const search = async () => {
  await axios.post("http://localhost:3000/api/search/findParticipants");
};

search();
