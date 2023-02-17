import axios from "axios";

const setSubject = async () => {
  await axios.post("http://localhost:3000/api/subjects/addSubject", {
    name: "test1"
  });
  await axios.post("http://localhost:3000/api/subjects/addSubject", {
    name: "test2"
  });
  await axios.post("http://localhost:3000/api/subjects/addSubject", {
    name: "test3"
  });
  await axios.post("http://localhost:3000/api/subjects/addSubject", {
    name: "test4"
  });
};

const getSubject = async () => {
  const res = await axios.post("http://localhost:3000/api/subjects/getSubject");
  console.log(res.data);
};

setSubject();
getSubject();
