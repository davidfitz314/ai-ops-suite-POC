import { css } from "@emotion/css";
import { useTasks } from "../../../shared/context/TaskContext";
import { theme } from "../../../shared/theme";
import StatusDot from "../../../shared/components/StatusDot";
import { useEffect, useState } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

const styles = {
  container: css({
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  }),

  task: css({
    padding: 10,
    borderRadius: 8,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    cursor: "pointer",
    transition: "background 0.15s ease",

    "&:hover": {
      background: theme.colors.surfaceSubtle,
    },
  }),

  selected: css({
    background: theme.colors.accentSoft,
  }),

  title: css({
    fontSize: 13,
    color: theme.colors.textPrimary,
  }),

  status: css({
    fontSize: 11,
    color: theme.colors.textSecondary,
  }),

  section: css({
    display: "flex",
    flexDirection: "column",
    gap: 6,
  }),

  sectionTitle: css({
    fontSize: 12,
    fontWeight: 600,
    color: theme.colors.textSecondary,
    marginTop: 10,
  }),

  createRow: css({
    display: "flex",
    gap: 8,
    marginBottom: 10,
  }),
};

const labels = {
  open: "Open",
  inProgress: "In Progress",
  done: "Done",
  closed: "Closed",
};

export default function TaskList({
  selectedId,
  onSelect,
  onCreateTask,
  prefill,
}: {
  selectedId?: number;
  onSelect: (id: number) => void;
  onCreateTask: (title: string) => void;
  prefill?: string;
}) {
  const { tasks } = useTasks();

  const [newTitle, setNewTitle] = useState("");
  useEffect(() => {
    if (prefill) {
      setNewTitle(prefill);
    }
  }, [prefill]);
  const handleCreate = () => {
    if (!newTitle.trim()) return;

    onCreateTask(newTitle.trim());
    setNewTitle("");
  };

  const grouped = {
    open: tasks.filter((t) => t.status === "open"),
    inProgress: tasks.filter((t) => t.status === "inProgress"),
    done: tasks.filter((t) => t.status === "done"),
    closed: tasks.filter((t) => t.status === "closed"),
  };

  return (
    <div className={styles.container}>
      <div className={styles.createRow}>
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate();
            }
          }}
          placeholder="Create new task..."
        />

        <Button onClick={handleCreate}>Add</Button>
      </div>

      {Object.entries(grouped).map(([key, list]) => {
        if (list.length === 0) return null;

        return (
          <div key={key} className={styles.section}>
            <div className={styles.sectionTitle}>
              {labels[key as keyof typeof labels]}
            </div>

            {list.map((t) => (
              <div
                key={t.id}
                onClick={() => onSelect(t.id)}
                className={`${styles.task} ${
                  selectedId === t.id ? styles.selected : ""
                }`}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <StatusDot status={t.status} />
                  <div className={styles.title}>{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
