import { css } from "@emotion/css";
import type { Task } from "../types";
import { theme } from "../../../shared/theme";

const styles = {
  container: css({
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  }),

  task: css({
    padding: 12,
    borderRadius: 8,
    border: `1px solid ${theme.colors.border}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.colors.surface,
  }),

  title: css({
    fontSize: 14,
  }),

  actions: css({
    display: "flex",
    gap: 8,
  }),

  button: css({
    cursor: "pointer",
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 6,
    "&:hover": {
      background: theme.colors.surfaceSubtle,
    },
  }),
};

export default function TaskList({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const cycleStatus = (task: Task) => {
    const next = {
      open: "in_progress",
      in_progress: "done",
      done: "closed",
      closed: "open",
    } as const;

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: next[t.status] } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className={styles.container}>
      {tasks.map((t) => (
        <div key={t.id} className={styles.task}>
          <div className={styles.title}>
            {t.title} ({t.status})
          </div>

          <div className={styles.actions}>
            <div className={styles.button} onClick={() => cycleStatus(t)}>
              Cycle
            </div>

            <div className={styles.button} onClick={() => deleteTask(t.id)}>
              Delete
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
