import type { Ticket } from "../types";

// helper for readable timestamps (minutes ago)
const now = Date.now();
const minutes = (m: number) => now - m * 60 * 1000;

export const mockTickets: Ticket[] = [
  // 🔴 OPEN (2)
  {
    id: 1,
    subject: "AC very loud",
    email: "mike@email.com",
    status: "open",
    updatedAt: minutes(5),
    messages: [
      {
        id: 1,
        direction: "inbound",
        content: "My AC is making a loud rattling noise.",
        timestamp: minutes(5),
      },
    ],
  },
  {
    id: 2,
    subject: "Water leak in kitchen",
    email: "sarah@email.com",
    status: "open",
    updatedAt: minutes(12),
    messages: [
      {
        id: 1,
        direction: "inbound",
        content: "There’s water leaking under my sink.",
        timestamp: minutes(12),
      },
    ],
  },

  // 🟡 IN PROGRESS (2)
  {
    id: 3,
    subject: "AC not working",
    email: "john@email.com",
    status: "in_progress",
    updatedAt: minutes(25),
    messages: [
      {
        id: 1,
        direction: "inbound",
        content: "My AC stopped last night.",
        timestamp: minutes(40),
      },
      {
        id: 2,
        direction: "outbound",
        content: "We’ve logged your issue and scheduled a technician.",
        timestamp: minutes(25),
      },
    ],
  },
  {
    id: 4,
    subject: "Internet unstable",
    email: "lisa@email.com",
    status: "in_progress",
    updatedAt: minutes(15),
    messages: [
      {
        id: 1,
        direction: "inbound",
        content: "My internet keeps dropping every few minutes.",
        timestamp: minutes(30),
      },
      {
        id: 2,
        direction: "outbound",
        content: "We’re currently investigating your connection.",
        timestamp: minutes(20),
      },
      {
        id: 3,
        direction: "inbound",
        content: "Thanks, it’s been happening all day.",
        timestamp: minutes(15),
      },
    ],
  },

  // 🟢 DONE (2)
  {
    id: 5,
    subject: "Heater fixed",
    email: "alex@email.com",
    status: "done",
    updatedAt: minutes(4310),
    messages: [
      {
        id: 1,
        direction: "inbound",
        content: "My heater wasn’t turning on.",
        timestamp: minutes(4310),
      },
      {
        id: 2,
        direction: "outbound",
        content: "A technician has resolved the issue.",
        timestamp: minutes(4300),
      },
      {
        id: 3,
        direction: "inbound",
        content: "Working now, thanks!",
        timestamp: minutes(4230),
      },
    ],
  },
  {
    id: 6,
    subject: "Billing question resolved",
    email: "emma@email.com",
    status: "done",
    updatedAt: minutes(120),
    messages: [
      {
        id: 1,
        direction: "inbound",
        content: "I was charged twice this month.",
        timestamp: minutes(150),
      },
      {
        id: 2,
        direction: "outbound",
        content: "We’ve corrected the billing error and issued a refund.",
        timestamp: minutes(130),
      },
      {
        id: 3,
        direction: "inbound",
        content: "Got it, thank you!",
        timestamp: minutes(120),
      },
    ],
  },
];
