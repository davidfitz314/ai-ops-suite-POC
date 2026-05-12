import { useState, useEffect } from "react";
import { css } from "@emotion/css";
import type { Task } from "../types";
import { useTasks } from "../../../shared/context/TaskContext";
import { theme } from "../../../shared/theme";
import Button from "../../../shared/components/Button";
import StatusDot from "../../../shared/components/StatusDot";
import Input from "../../../shared/components/Input";
import SaveIcon from "../../../shared/icons/SaveIcon";

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

  // 🔥 NEW
  titleRow: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
  }),

  saveIcon: css({
    position: "absolute",
    right: 8,
    cursor: "pointer",
    fontSize: 14,
    color: theme.colors.textSecondary,

    "&:hover": {
      color: theme.colors.textPrimary,
    },
  }),
};

// TODO: Add global "live save" UX pattern
export default function TaskDetail({ task }: { task?: Task }) {
  const { updateTask, deleteTask } = useTasks();

  const [title, setTitle] = useState("");
  const [dirty, setDirty] = useState(false); // 🔥 NEW

  useEffect(() => {
    setTitle(task?.title || "");
    setDirty(false); // reset when switching tasks
  }, [task]);

  if (!task) return <div>Select a task</div>;

  const setStatus = (status: Task["status"]) => {
    updateTask({
      ...task,
      status,
    });
  };

  // 🔥 NEW save handler
  const handleSaveTitle = () => {
    if (!dirty) return;

    updateTask({
      ...task,
      title,
    });

    setDirty(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Task</div>

      {/* 🔥 UPDATED INPUT ROW */}
      <div className={styles.titleRow}>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setDirty(true); // mark as changed
          }}
        />

        {dirty && (
          <div className={styles.saveIcon} onClick={handleSaveTitle}>
            <SaveIcon />
          </div>
        )}
      </div>

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
