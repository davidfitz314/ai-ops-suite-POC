import type { Task } from "../modules/tasks/types";
import { mockFetch } from "./client";

let tasks: Task[] = [];

let tasksFull: Task[] = [
  // 🔴 OPEN
  {
    id: 1,
    title: "Follow up on AC repair request",
    status: "open",
    createdAt: Date.now() - 1000000,
  },
  {
    id: 2,
    title: "Review billing discrepancy email",
    status: "open",
    createdAt: Date.now() - 2000000,
  },

  // 🟡 IN PROGRESS
  {
    id: 3,
    title: "Investigate HVAC system issue",
    status: "inProgress",
    createdAt: Date.now() - 3000000,
  },
  {
    id: 4,
    title: "Contact customer about duplicate charge",
    status: "inProgress",
    createdAt: Date.now() - 4000000,
  },

  // 🟢 DONE
  {
    id: 5,
    title: "Resolved login access issue",
    status: "done",
    createdAt: Date.now() - 5000000,
  },
  {
    id: 6,
    title: "Updated customer billing info",
    status: "done",
    createdAt: Date.now() - 6000000,
  },

  // ⚫ CLOSED
  {
    id: 7,
    title: "Closed ticket for resolved outage",
    status: "closed",
    createdAt: Date.now() - 7000000,
  },
];

export async function getTasks(): Promise<Task[]> {
  return mockFetch(tasks);
}

export async function createTask(task: Task): Promise<Task> {
  tasks.push(task);
  return mockFetch(task);
}

export async function updateTask(task: Task): Promise<Task> {
  tasks = tasks.map((t) => (t.id === task.id ? task : t));
  return mockFetch(task);
}

export async function deleteTask(id: number): Promise<void> {
  tasks = tasks.filter((t) => t.id !== id);
  return mockFetch(undefined);
}
