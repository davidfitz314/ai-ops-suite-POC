import { css } from "@emotion/css";
import type { Task } from "../../tasks/types";
import { theme } from "../../../shared/theme";

const styles = {
  container: css({
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: 300,
    background: theme.colors.surface,
    borderLeft: `1px solid ${theme.colors.border}`,
    padding: "16px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 12,

    boxShadow: "-4px 0 12px rgba(0,0,0,0.08)",

    transform: "translateX(100%)",
    transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
    zIndex: 20,
  }),

  open: css({
    transform: "translateX(0)",
  }),

  hidden: css({
    transform: "translateX(100%)",
  }),

  backdrop: css({
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.15)",
    zIndex: 10,
  }),

  header: css({
    fontWeight: 600,
    marginBottom: 6,
  }),

  headerRow: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),

  closeButton: css({
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: 6,
    fontSize: 14,
    color: theme.colors.textSecondary,

    "&:hover": {
      background: theme.colors.surfaceSubtle,
      color: theme.colors.textPrimary,
    },
  }),

  task: css({
    padding: 10,
    borderRadius: 8,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.background,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),

  title: css({
    fontSize: 13,
    color: theme.colors.textPrimary,
  }),

  status: css({
    fontSize: 11,
    color: theme.colors.textSecondary,
  }),

  statusBase: css({
    fontSize: 11,
    fontWeight: 500,
  }),

  statusColors: {
    open: css({ color: theme.colors.danger }),
    inProgress: css({ color: theme.colors.warning }),
    done: css({ color: theme.colors.success }),
    closed: css({ color: theme.colors.textMuted }),
  },
};

export default function TaskPanel({
  tasks,
  isOpen,
  onClose,
}: {
  tasks: Task[];
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}

      <div className={`${styles.container} ${isOpen ? styles.open : ""}`}>
        <div className={styles.headerRow}>
          <div className={styles.header}>Tasks</div>

          <div className={styles.closeButton} onClick={onClose}>
            ✕
          </div>
        </div>

        {tasks.length === 0 && (
          <div className={styles.status}>No tasks yet</div>
        )}

        {tasks.map((t) => (
          <div key={t.id} className={styles.task}>
            <div className={styles.title}>{t.title}</div>
            <div
              className={`${styles.statusBase} ${
                styles.statusColors[t.status]
              }`}
            >
              {t.status}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
