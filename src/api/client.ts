import { API_BASE, USE_BACKEND } from "./config";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function mockFetch<T>(data: T, ms = 300): Promise<T> {
  await delay(ms);
  return JSON.parse(JSON.stringify(data));
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  if (!USE_BACKEND) {
    throw new Error("apiFetch called while USE_BACKEND=false");
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
