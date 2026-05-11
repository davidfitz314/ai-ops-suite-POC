import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import TopBar from "../../shared/components/TopBar";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";
import { useTasks } from "../../shared/context/TaskContext";
import { theme } from "../../shared/theme";
import type { Task } from "./types";
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: theme.colors.background,
  }),

  content: css({
    display: "flex",
    flex: 1,
  }),

  sidebar: css({
    width: 300,
    borderRight: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
  }),
};

export default function TasksApp() {
  const location = useLocation();
  const navigate = useNavigate();
  // TODO: clear prefill after use (prevent reuse on refresh/navigation)
  const prefill = location.state?.prefill;
  const { tasks, addTask } = useTasks();
  const [selectedId, setSelectedId] = useState<number | undefined>(
    tasks[0]?.id
  );

  const selected = tasks.find((t) => t.id === selectedId);

  useEffect(() => {
    if (prefill) {
      // remove state so it doesn't persist
      navigate(location.pathname, { replace: true });
    }
  }, [prefill, navigate, location.pathname]);

  // TODO: Add automatic scrolling to newly created task in task list
  const handleCreateTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      status: "open",
      createdAt: Date.now(),
    };

    addTask(newTask);

    // ✅ auto-select new task
    setSelectedId(newTask.id);
  };

  return (
    <div className={styles.container}>
      <TopBar title="Tasks" showBack />

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <TaskList
            selectedId={selectedId}
            onSelect={setSelectedId}
            onCreateTask={handleCreateTask}
            prefill={prefill}
          />
        </div>

        <TaskDetail task={selected} />
      </div>
    </div>
  );
}
