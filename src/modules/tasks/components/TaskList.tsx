import { css } from "@emotion/css";
import { useTasks } from "../../../shared/context/TaskContext";
import { theme } from "../../../shared/theme";
import StatusDot from "../../../shared/components/StatusDot";

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
};

export default function TaskList({
  selectedId,
  onSelect,
}: {
  selectedId?: number;
  onSelect: (id: number) => void;
}) {
  const { tasks } = useTasks();

  return (
    <div className={styles.container}>
      {tasks.length === 0 && <div>No tasks yet</div>}

      {tasks.map((t) => (
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

          <div className={styles.status}>{t.status}</div>
        </div>
      ))}
    </div>
  );
}
