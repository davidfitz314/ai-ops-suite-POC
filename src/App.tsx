import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailApp from "./modules/email";
import { Landing } from "./modules/platform";
import TasksApp from "./modules/tasks";
import { TaskProvider } from "./shared/context/TaskContext";

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/email" element={<EmailApp />} />
          <Route path="/tasks" element={<TasksApp />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}
