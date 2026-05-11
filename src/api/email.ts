import { mockFetch } from "./client";
import type { EmailThread } from "../modules/email/types";

let threads: EmailThread[] = [
  {
    id: 1,
    subject: "AC is broken",
    from: "customer@email.com",
    status: "unread",
    extractedTask: "Investigate AC issue",
    suggestedReply: "We're looking into your AC issue.",
    messages: [
      {
        id: 1,
        content: "My AC stopped working last night",
        direction: "inbound",
        timestamp: Date.now() - 100000,
      },
    ],
  },
  {
    id: 2,
    subject: "Billing issue",
    from: "billing@email.com",
    status: "read",
    messages: [
      {
        id: 1,
        content: "I was charged twice this month.",
        direction: "inbound",
        timestamp: Date.now() - 500000,
      },
    ],
  },
  {
    id: 3,
    subject: "Follow up",
    from: "user@email.com",
    status: "replied",
    messages: [
      {
        id: 1,
        content: "Thanks, everything is working now!",
        direction: "inbound",
        timestamp: Date.now() - 800000,
      },
    ],
  },
];

export async function getEmails(): Promise<EmailThread[]> {
  return mockFetch(threads);
}

export async function sendReply(id: number, message: string) {
  const thread = threads.find((t) => t.id === id);
  if (!thread) return null;

  const newMessage = {
    id: Date.now(),
    content: message,
    direction: "outbound" as const,
    timestamp: Date.now(),
  };

  thread.messages.push(newMessage);
  thread.status = "replied";

  return mockFetch({
    thread,
    message: newMessage,
  });
}

export async function markAsRead(id: number) {
  const thread = threads.find((t) => t.id === id);
  if (!thread) return;

  if (thread.status === "unread") {
    thread.status = "read";
  }

  return mockFetch({ success: true });
}

export async function suggestTask(thread: EmailThread): Promise<string> {
  return mockFetch(thread.extractedTask || `Follow up: ${thread.subject}`);
}
