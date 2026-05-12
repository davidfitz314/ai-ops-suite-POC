import { apiFetch } from "./client";

export type AppSettings = {
  id: number;
  name: string;
  email: string;
  signature: string;
};

// 🔥 GET
export async function getSettings(): Promise<AppSettings> {
  return apiFetch("/settings/");
}

// 🔥 PATCH
export async function updateSettings(
  data: Partial<AppSettings>
): Promise<AppSettings> {
  return apiFetch("/settings/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
