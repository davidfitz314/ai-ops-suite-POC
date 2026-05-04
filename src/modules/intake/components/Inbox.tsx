import { css } from "@emotion/css";
import type { Ticket } from "../types";
import StatusDot from "../../../shared/components/StatusDot";
import { theme } from "../../../shared/theme";
import { formatTimeAgo } from "../../../shared/utils/time";

const styles = {
  container: css({
    width: 300,
    borderRight: `1px solid ${theme.colors.border}`,
    padding: 10,
    background: theme.colors.surface,
  }),

  card: css({
    padding: 12,
    borderRadius: 8,
    border: `1px solid ${theme.colors.border}`,
    marginBottom: 10,
    cursor: "pointer",
    background: theme.colors.surface,
    transition: "background 0.2s",
    "&:hover": {
      background: theme.colors.surfaceSubtle,
    },
  }),

  selected: css({
    background: theme.colors.accentSoft,
  }),

  row: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  }),

  rightCol: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
  }),

  subject: css({
    fontSize: 14,
    fontWeight: 600,
    color: theme.colors.textPrimary,
  }),

  email: css({
    fontSize: 12,
    color: theme.colors.textSecondary,
  }),

  time: css({
    fontSize: 11,
    color: theme.colors.textMuted,
  }),
};

export default function Inbox({
  tickets,
  selectedId,
  onSelect,
}: {
  tickets: Ticket[];
  selectedId?: number;
  onSelect: (t: Ticket) => void;
}) {
  return (
    <div className={styles.container}>
      {tickets.map((t) => (
        <div
          key={t.id}
          onClick={() => onSelect(t)}
          className={`${styles.card} ${
            selectedId === t.id ? styles.selected : ""
          }`}
        >
          <div className={styles.row}>
            <div className={styles.subject}>{t.subject}</div>

            <div className={styles.rightCol}>
              <StatusDot status={t.status} />
              <div className={styles.time}>{formatTimeAgo(t.updatedAt)}</div>
            </div>
          </div>

          <div className={styles.email}>{t.email}</div>
        </div>
      ))}
    </div>
  );
}
