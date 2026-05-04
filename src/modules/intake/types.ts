export type Message = {
    id: number;
    direction: "inbound" | "outbound";
    content: string;
    timestamp: number;
  };
  
  export type Ticket = {
    id: number;
    subject: string;
    email: string;
    status: "open" | "in_progress" | "done";
    messages: Message[];
    updatedAt: number;
  };