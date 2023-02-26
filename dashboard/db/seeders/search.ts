import axios from "axios";

const search = async () => {
  await axios.post("http://localhost:3000/api/search/suggestTopic", {
    names: ["romanie de meyer", "clement muth", "leoni lala"],
    difficulty: "beginner"
  });
};

search();
