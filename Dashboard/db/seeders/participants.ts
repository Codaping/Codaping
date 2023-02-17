import axios from "axios";

const setParticipants = async () => {
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "romanie de meyer",
    project: "test1"
  });
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "romanie de meyer",
    project: "test2"
  });
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "clement muth",
    project: "test1"
  });
  await axios.post("http://localhost:3000/api/participants/addParticipant", {
    name: "leoni lala",
    project: "test3"
  });
};

setParticipants();
