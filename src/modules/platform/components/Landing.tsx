import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../shared/theme";
import TopBar from "../../../shared/components/TopBar";
import { useTasks } from "../../../shared/context/TaskContext";
import StatusDot from "../../../shared/components/StatusDot";

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: theme.colors.background,
  }),

  topBar: css({
    padding: "16px 20px",
    borderBottom: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    fontWeight: 600,
    fontSize: 18,
  }),

  content: css({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  }),

  header: css({
    fontSize: 32,
    fontWeight: 700,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  }),

  sub: css({
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 40,
  }),

  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    width: "100%",
    maxWidth: 600,
  }),

  card: css({
    padding: 20,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 10,
    background: theme.colors.surface,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    transition: "all 0.2s ease",

    "&:hover": {
      background: theme.colors.surfaceSubtle,
      transform: "translateY(-2px)",
    },
  }),

  icon: css({
    fontSize: 24,
  }),

  title: css({
    fontWeight: 600,
    color: theme.colors.textPrimary,
  }),

  desc: css({
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: "center",
  }),

  taskStats: css({
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  }),

  statRow: css({
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: theme.colors.textSecondary,
  }),

  upToDate: css({
    color: theme.colors.success,
  }),
};

export default function Landing() {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const counts = {
    open: tasks.filter((t) => t.status === "open").length,
    inProgress: tasks.filter((t) => t.status === "inProgress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className={styles.container}>
      {/* Top bar */}
      <TopBar title="Kawika Tools" />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>AI Ops Suite</div>
        <div className={styles.sub}>
          Modular tools to automate business workflows
        </div>

        <div className={styles.grid}>
          <div className={styles.card} onClick={() => navigate("/email")}>
            <div className={styles.icon}>📧</div>
            <div className={styles.title}>Email Secretary</div>
            <div className={styles.desc}>
              Auto-read, reply, and create tasks from emails
            </div>
          </div>

          <div className={styles.card} onClick={() => navigate("/tasks")}>
            <div>🧾 Task Manager</div>

            <div className={styles.taskStats}>
              {counts.open > 0 && (
                <div className={styles.statRow}>
                  <StatusDot status="open" />
                  Open ({counts.open})
                </div>
              )}
              {counts.inProgress > 0 && (
                <div className={styles.statRow}>
                  <StatusDot status="inProgress" />
                  In Progress ({counts.inProgress})
                </div>
              )}
              {counts.done > 0 && (
                <div className={styles.statRow}>
                  <StatusDot status="done" />
                  Done ({counts.done})
                </div>
              )}
              {counts.done === 0 &&
                counts.inProgress === 0 &&
                counts.open === 0 && (
                  <div className={styles.statRow}>
                    <p className={styles.upToDate}>☑</p>
                    Up to Date
                  </div>
                )}
            </div>
          </div>

          <div className={styles.card} onClick={() => navigate("/settings")}>
            ⚙️ Settings
          </div>
        </div>
      </div>
    </div>
  );
}
