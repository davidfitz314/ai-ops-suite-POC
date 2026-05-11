import { useState } from "react";
import { css } from "@emotion/css";
import TopBar from "../../shared/components/TopBar";
import TaskList from "./components/TaskList";
import type { Task } from "./types";
import { theme } from "../../shared/theme";

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: theme.colors.background,
  }),
};

export default function TasksApp({
  initialTasks = [],
}: {
  initialTasks?: Task[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <div className={styles.container}>
      <TopBar title="Tasks" showBack />

      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
