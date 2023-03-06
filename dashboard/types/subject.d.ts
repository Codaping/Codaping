import type { Moment } from "moment";

export type Difficulty = "advanced" | "intermediate" | "beginner";
export type Category = "participant" | "cobra" | "camp";

export type Subject = {
  name: string;
  difficulty: Difficulty;
  note: number;
  category: Category;
  choiceDate?: Moment | undefined;
  suggestionDate?: Moment | undefined;
  isTopicOfTheDay: boolean;
};
