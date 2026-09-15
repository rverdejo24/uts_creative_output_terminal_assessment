export type ReflectionEntry = {
  id: string;
  prompt: string;
  text: string;
  energy: "low" | "steady" | "good";
  createdAt: string; // ISO date
};

export type ColumnId = "someday" | "this-month" | "this-week" | "done";

export type GoalCard = {
  id: string;
  title: string;
  note?: string;
  column: ColumnId;
  createdAt: string;
};
