import axios from "axios";

const setSubject = async () => {
  await Promise.all(
    [...Array(25)].map(
      async (_, i) =>
        await axios.post("http://localhost:3000/api/subjects/addSubject", {
          name: "test" + i,
          difficulty: "beginner",
          category: "participant",
          note: 3
        })
    )
  );

  // await axios.post("http://localhost:3000/api/subjects/addSubject", {
  //   name: "test0",
  //   difficulty: "beginner", //OK
  //   category: "participant",
  //   note: 3,
  //   suggestionDate: "02/20/2023"
  // });
  // await axios.post("http://localhost:3000/api/subjects/addSubject", {
  //   name: "test1",
  //   difficulty: "beginner",
  //   category: "participant",
  //   note: 4
  // });
  // await axios.post("http://localhost:3000/api/subjects/addSubject", {
  //   name: "test2",
  //   difficulty: "intermediate",
  //   category: "camp",
  //   note: 4
  // });
  // await axios.post("http://localhost:3000/api/subjects/addSubject", {
  //   name: "test3",
  //   difficulty: "beginner",
  //   category: "participant",
  //   note: 1
  // });
  // await axios.post("http://localhost:3000/api/subjects/addSubject", {
  //   name: "test4",
  //   difficulty: "beginner", //OK
  //   category: "participant",
  //   note: 5
  // });
  // await axios.post("http://localhost:3000/api/subjects/addSubject", {
  //   name: "test5",
  //   difficulty: "advanced",
  //   category: "participant",
  //   note: 3
  // });
  // await axios.post("http://localhost:3000/api/subjects/addSubject", {
  //   name: "test6",
  //   difficulty: "beginner",
  //   category: "participant",
  //   note: 2
  // });
  // await axios.post("http://localhost:3000/api/subjects/addSubject", {
  //   name: "test7",
  //   difficulty: "intermediate",
  //   category: "participant",
  //   note: 3
  // });
};

setSubject();
