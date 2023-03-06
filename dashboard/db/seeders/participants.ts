import axios from "axios";

const setParticipants = async () => {
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "romanie de meyer",
    project: "christmas-camp"
  });
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "romanie de meyer",
    project: "2048"
  });
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "clement muth",
    project: "christmas-camp"
  });
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "leoni lala",
    project: "test6"
  });
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "leoni lala",
    project: "christmas-camp"
  });
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "leoni lala",
    project: "test5"
  });
};

setParticipants();
