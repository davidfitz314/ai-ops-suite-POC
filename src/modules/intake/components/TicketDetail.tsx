import { css } from "@emotion/css";
import type { Ticket } from "../types";
import Button from "../../../shared/components/Button";
import StatusDot from "../../../shared/components/StatusDot";
import { theme } from "../../../shared/theme";
import { formatTimeAgo } from "../../../shared/utils/time";

const styles = {
  container: css({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: theme.colors.background,
    height: "100%", // important for layout
  }),

  empty: css({
    padding: 20,
    color: theme.colors.textSecondary,
  }),

  // 🔹 NEW: header wrapper (sticky + separation)
  headerWrapper: css({
    padding: "16px 20px",
    borderBottom: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    position: "sticky",
    top: 0,
    zIndex: 1,
  }),

  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),

  title: css({
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: theme.colors.textPrimary,
  }),

  email: css({
    color: theme.colors.textSecondary,
    marginTop: 4,
    fontSize: 13,
  }),

  // 🔹 NEW: scrollable messages area
  messages: css({
    flex: 1,
    overflowY: "auto",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  }),

  message: css({
    padding: 10,
    borderRadius: 8,
    maxWidth: "60%",
    border: `1px solid ${theme.colors.border}`,
  }),

  inbound: css({
    alignSelf: "flex-start",
    background: theme.colors.messageInbound,
  }),

  outbound: css({
    alignSelf: "flex-end",
    background: theme.colors.messageOutbound,
  }),

  direction: css({
    display: "block",
    marginBottom: 4,
    fontSize: 12,
    color: theme.colors.textMuted,
  }),

  // 🔹 NEW: actions separated from messages
  actions: css({
    padding: 20,
    borderTop: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    display: "flex",
    gap: 10,
  }),

  timestamp: css({
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 4,
  }),
};

export default function TicketDetail({ ticket }: { ticket?: Ticket }) {
  if (!ticket) {
    return <div className={styles.empty}>Select a ticket</div>;
  }

  return (
    <div className={styles.container}>
      {/* 🔹 Header */}
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>{ticket.subject}</h2>
          <StatusDot status={ticket.status} />
        </div>

        <p className={styles.email}>{ticket.email}</p>
      </div>

      {/* 🔹 Messages */}
      <div className={styles.messages}>
        {ticket.messages.map((m) => (
            console.log(m.timestamp),
          <div
            key={m.id}
            className={`${styles.message} ${
              m.direction === "inbound"
                ? styles.inbound
                : styles.outbound
            }`}
          >
            <strong className={styles.direction}>
            {m.direction}
            </strong>
            {m.content}
            <div className={styles.timestamp}>
            {formatTimeAgo(m.timestamp)}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Actions */}
      <div className={styles.actions}>
        <Button>Mark Done</Button>
        <Button variant="secondary">Reply</Button>
      </div>
    </div>
  );
}