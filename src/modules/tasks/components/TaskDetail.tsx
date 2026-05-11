import { useState, useEffect } from "react";
import { css } from "@emotion/css";
import type { Task } from "../types";
import { useTasks } from "../../../shared/context/TaskContext";
import { theme } from "../../../shared/theme";
import TextArea from "../../../shared/components/TextArea";
import Button from "../../../shared/components/Button";
import StatusDot from "../../../shared/components/StatusDot";

const styles = {
  container: css({
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  }),

  title: css({
    fontSize: 16,
    fontWeight: 600,
  }),

  status: css({
    fontSize: 13,
    color: theme.colors.textSecondary,
  }),

  actions: css({
    display: "flex",
    gap: 10,
  }),
};

// TODO: Add global "live save" UX pattern:
// - show "Saving..." when updating
// - show "Saved" confirmation
// - debounce rapid updates (typing)
// - handle error states when backend is introduced
export default function TaskDetail({ task }: { task?: Task }) {
  const { updateTask, deleteTask } = useTasks();
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(task?.title || "");
  }, [task]);

  if (!task) return <div>Select a task</div>;

  const setStatus = (status: Task["status"]) => {
    // TODO: Add visual feedback for status update (e.g. spinner or flash)
    // Also consider optimistic UI vs confirmed update if backend is added later

    updateTask({
      ...task,
      status,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Task</div>

      <TextArea
        value={title}
        onChange={(e) => {
          const newTitle = e.target.value;
          setTitle(newTitle);
          // TODO: Add visual indicator for "saving..." or "live update in progress"
          // e.g. debounce updates or show temporary "Saving..." state

          updateTask({
            ...task,
            title: newTitle,
          });
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <StatusDot status={task.status} />
        <div className={styles.status}>{task.status}</div>
      </div>

      <div className={styles.actions}>
        {task.status === "open" && (
          <>
            <Button onClick={() => setStatus("inProgress")}>Start</Button>

            <Button variant="secondary" onClick={() => setStatus("closed")}>
              Cancel
            </Button>
          </>
        )}

        {task.status === "inProgress" && (
          <>
            <Button onClick={() => setStatus("done")}>Complete</Button>

            <Button variant="secondary" onClick={() => setStatus("closed")}>
              Cancel
            </Button>
          </>
        )}

        {task.status === "done" && (
          <Button onClick={() => setStatus("closed")}>Close</Button>
        )}

        <Button variant="secondary" onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
