// import { useState } from "react";
// import { Inbox, TicketDetail, type Ticket } from "./modules/intake";
// import { mockTickets } from "./modules/intake/data/mockTickets";
// import { Landing } from "./modules/platform";

// export default function App() {
//   const [selected, setSelected] = useState<Ticket | undefined>(mockTickets[0]);

//   return (
//     // <div style={{ display: "flex", height: "100vh" }}>
//     //   <Inbox
//     //     tickets={mockTickets}
//     //     selectedId={selected?.id}
//     //     onSelect={setSelected}
//     //   />
//     //   <TicketDetail ticket={selected} />
//     // </div>
//     <Landing />
//   );
// }
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailApp from "./modules/email";
import { Landing } from "./modules/platform";
import TasksApp from "./modules/tasks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/email" element={<EmailApp />} />
        <Route path="/tasks" element={<TasksApp />} />
      </Routes>
    </BrowserRouter>
  );
}
