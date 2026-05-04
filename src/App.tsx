import { useState } from "react";
import { Inbox, TicketDetail, type Ticket } from "./modules/intake";
import { mockTickets } from "./modules/intake/data/mockTickets";

export default function App() {
  const [selected, setSelected] = useState<Ticket | undefined>(
    mockTickets[0]
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Inbox
        tickets={mockTickets}
        selectedId={selected?.id}
        onSelect={setSelected}
      />
      <TicketDetail ticket={selected} />
    </div>
  );
}