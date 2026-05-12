import type { Task } from "../modules/tasks/types";
import { mockFetch, apiFetch } from "./client";
import { USE_BACKEND } from "./config";

let tasks: Task[] = [
  {
    id: 1,
    title: "Mock Task",
    status: "open",
    createdAt: Date.now(),
  },
];

// 🔥 GET
export async function getTasks(): Promise<Task[]> {
  if (USE_BACKEND) {
    return apiFetch("/tasks");
  }

  return mockFetch(tasks);
}

// 🔥 CREATE
export async function createTask(task: Partial<Task>): Promise<Task> {
  if (USE_BACKEND) {
    return apiFetch("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
  }

  const newTask: Task = {
    id: Date.now(),
    title: task.title || "",
    status: task.status || "open",
    createdAt: Date.now(),
  };

  tasks.push(newTask);
  return mockFetch(newTask);
}

// 🔥 UPDATE
export async function updateTask(
  id: number,
  updates: Partial<Task>
): Promise<Task> {
  if (USE_BACKEND) {
    return apiFetch(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }

  tasks = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));

  return mockFetch(tasks.find((t) => t.id === id)!);
}

// 🔥 DELETE
export async function deleteTask(id: number): Promise<void> {
  if (USE_BACKEND) {
    await apiFetch(`/tasks/${id}`, {
      method: "DELETE",
    });
    return;
  }

  tasks = tasks.filter((t) => t.id !== id);
  return mockFetch(undefined);
}
