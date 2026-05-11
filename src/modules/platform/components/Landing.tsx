import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../shared/theme";
import TopBar from "../../../shared/components/TopBar";

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
};

export default function Landing() {
  const navigate = useNavigate();

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
        📋 Task Manager
      </div>
        </div>
      </div>

      
    </div>
  );
}
