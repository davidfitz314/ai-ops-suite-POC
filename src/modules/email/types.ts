export type EmailStatus = "unread" | "read" | "replied";

export type EmailMessage = {
  id: number;
  direction: "inbound" | "outbound";
  content: string;
  timestamp: number;
};

export type EmailThread = {
  id: number;
  subject: string;
  from: string;
  status: EmailStatus;
  messages: EmailMessage[];
  updatedAt: number;

  // core features
  suggestedReply?: string;
  extractedTask?: string;
};
