export type Task = {
  id: number;
  title: string;
  status: "open" | "closed" | "inProgress" | "done";
  createdAt: number;
};
