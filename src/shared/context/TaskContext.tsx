import { createContext, useContext, useState } from "react";
import type { Task } from "../../modules/tasks/types";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}