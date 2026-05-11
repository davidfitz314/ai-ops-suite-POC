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

  // core features
  suggestedReply?: string;
  extractedTask?: string;
};

export type Email = {
  id: number;
  subject: string;
  body: string;
  extractedTask?: string;
};
