import { mockFetch, apiFetch } from "./client";
import { USE_BACKEND } from "./config";
import type { EmailThread } from "../modules/email/types";

// 🔥 GET
export async function getEmails(): Promise<EmailThread[]> {
  if (USE_BACKEND) {
    const data = await apiFetch<any[]>("/emails");

    // 🔥 transform backend → frontend format
    return data.map((e) => ({
      id: e.id,
      subject: e.subject,
      from: e.fromEmail,
      status: e.status,
      extractedTask: e.extractedTask,
      suggestedReply: e.suggestedReply,
      messages: e.messages.map((m: any) => ({
        id: m.id,
        content: m.content,
        direction: m.direction,
        timestamp: m.timestamp * 1000,
      })),
    }));
  }

  // fallback mock (optional)
  return mockFetch([]);
}

// 🔥 REPLY
export async function sendReply(
  id: number,
  message: string
): Promise<EmailThread> {
  const res = await apiFetch<any>(`/emails/${id}/reply`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });

  return {
    id: res.id,
    subject: res.subject,
    from: res.fromEmail, // 🔥 map name
    status: res.status,
    extractedTask: res.extractedTask,
    suggestedReply: res.suggestedReply,
    messages: res.messages.map((m: any) => ({
      id: m.id,
      content: m.content,
      direction: m.direction,
      timestamp: m.timestamp * 1000,
    })),
  };
}

// 🔥 MARK READ
export async function markAsRead(id: number): Promise<void> {
  if (USE_BACKEND) {
    await apiFetch(`/emails/${id}/read`, {
      method: "POST",
    });
    return;
  }
}

// 🔥 SUGGEST TASK
export async function suggestTask(thread: EmailThread): Promise<string> {
  const res = await apiFetch<{ suggestion: string }>("/emails/suggest-task", {
    method: "POST",
    body: JSON.stringify({
      id: thread.id,
      subject: thread.subject,
      fromEmail: thread.from,
      status: thread.status,
      messages: thread.messages, // 🔥 FIX: send full objects
      extractedTask: thread.extractedTask ?? null,
      suggestedReply: thread.suggestedReply ?? null,
    }),
  });

  return res.suggestion;
}
