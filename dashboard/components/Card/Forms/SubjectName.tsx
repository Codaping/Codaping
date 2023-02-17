import { Label, Select } from "@rebass/forms";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box } from "rebass";

export const SubjectName = () => {
  const [subjects, setSubjects] = useState<{ name: string }[]>([]);
  useEffect(() => {
    (async () => {
      const res = await axios.post("http://localhost:3000/api/subjects/getSubject");
      setSubjects(res.data);
    })();
  }, []);

  return (
    <Box>
      <Label htmlFor="subject-name" fontWeight={400} fontSize={20} pb={2} color="var(--lightBeige)">
        Subject Name
      </Label>
      <Select id="subject-name" name="subject-name" bg="var(--beige)" height={40} sx={{ border: "none" }}>
        {subjects.map((subject, i) => (
          <option key={i}>{subject ? subject.name : "no subject in the database"}</option>
        ))}
      </Select>
    </Box>
  );
};