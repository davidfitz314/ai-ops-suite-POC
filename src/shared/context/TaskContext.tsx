import { createContext, useContext, useState, useEffect } from "react";
import type { Task } from "../../modules/tasks/types";
import * as taskApi from "../../api/tasks";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskApi.getTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  const addTask = async (task: Task) => {
    const created = await taskApi.createTask(task);
    setTasks((prev) => [...prev, created]);
  };

  const updateTask = async (task: Task) => {
    await taskApi.updateTask(task);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  const deleteTask = async (id: number) => {
    await taskApi.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}
