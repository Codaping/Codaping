import { Label, Select } from "@rebass/forms";
import { Box } from "rebass";

export const Difficulty = () => {
  return (
    <Box>
      <Label htmlFor="difficulty" fontWeight={400} fontSize={[16, 20]} pb={2} color="var(--lightBeige)">
        Difficulty of the Subject
      </Label>
      <Select id="difficulty" name="difficulty" bg="var(--beige)" height={40} sx={{ border: "none" }} required>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </Select>
    </Box>
  );
};
