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
  status: "new" | "processed" | "archived";
  messages: EmailMessage[];
  updatedAt: number;

  // core features
  suggestedReply?: string;
  extractedTask?: string;
};
