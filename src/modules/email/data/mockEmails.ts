import type { EmailThread } from "../types";

const now = Date.now();
const minutes = (m: number) => now - m * 60 * 1000;

export const mockEmails: EmailThread[] = [
  {
    id: 1,
    subject: "AC not working",
    from: "john@email.com",
    status: "new",
    updatedAt: minutes(5),
    messages: [
      {
        id: 1,
        direction: "inbound",
        content: "My AC stopped last night.",
        timestamp: minutes(5),
      },
    ],
    suggestedReply:
      "Thanks for reaching out. We've received your request and will follow up shortly.",
    extractedTask: "Schedule AC repair technician",
  },
  {
    id: 2,
    subject: "Billing issue",
    from: "emma@email.com",
    status: "processed",
    updatedAt: minutes(30),
    messages: [
      {
        id: 1,
        direction: "inbound",
        content: "I think I was charged twice.",
        timestamp: minutes(30),
      },
      {
        id: 2,
        direction: "outbound",
        content: "We’re reviewing your billing and will update you soon.",
        timestamp: minutes(20),
      },
    ],
    suggestedReply:
      "Thanks for flagging this. We’re reviewing your account and will correct any issues.",
  },
];
