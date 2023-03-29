import axios from "axios";
import { randomInt } from "crypto";
import moment from "moment";

const addDate = async () => {
  await Promise.all(
    [...Array(25)].map(
      async (_, i) =>
        await axios.post("/api/subjects/addSuggestionDate", {
          name: "test" + i,
          suggestionDate: moment(moment.now())
            .add(-i - randomInt(30), "days")
            .format("DD MM YYYY")
        })
    )
  );
  await Promise.all(
    [...Array(25)].map(
      async (_, i) =>
        await axios.post("/api/subjects/addChoiceDate", {
          name: "test" + i,
          choiceDate:
            i == 20
              ? moment("01 11 2022", "DD MM YYYY").format("DD MM YYYY")
              : moment(moment.now()).add(-i, "days").format("DD MM YYYY")
        })
    )
  );
  // await axios.post("/api/subjects/addSuggestionDate", {
  //   name: "test0",
  //   suggestionDate: "2023-03-03T21:50:13.252Z"
  // });
  // await axios.post("/api/subjects/addSuggestionDate", {
  //   name: "test4",
  //   suggestionDate: "2023-01-03T22:39:54.058Z"
  // });
  // await axios.post("/api/subjects/addSuggestionDate", {
  //   name: "jack-la-trouille-j1",
  //   suggestionDate: "2023-01-01T22:39:54.058Z"
  // });

  // await axios.post("/api/subjects/addChoiceDate", {
  //   name: "test0",
  //   choiceDate: "2023-03-03T21:50:13.252Z"
  // });
  // await axios.post("/api/subjects/addChoiceDate", {
  //   name: "test4",
  //   choiceDate: "2023-01-03T22:39:54.058Z"
  // });
  // await axios.post("/api/subjects/addChoiceDate", {
  //   name: "jack-la-trouille-j1",
  //   choiceDate: "2023-01-01T22:39:54.058Z"
  // });

  //   await axios.post("/api/subjects/addChoiceDate", {
  //     choiceDate: "02/20/2023"
  //   });
  //   await axios.post("/api/subjects/addChoiceDate", {
  //     choiceDate: "02/20/2023"
  //   });
};

addDate();
