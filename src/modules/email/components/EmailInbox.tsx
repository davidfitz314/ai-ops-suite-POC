import { css } from "@emotion/css";
import type { EmailThread } from "../types";
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
    fontWeight: 600,
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

export default function EmailInbox({
  emails,
  selectedId,
  onSelect,
}: {
  emails: EmailThread[];
  selectedId?: number;
  onSelect: (e: EmailThread) => void;
}) {
  return (
    <div className={styles.container}>
      {emails.map((e) => (
        <div
          key={e.id}
          onClick={() => onSelect(e)}
          className={`${styles.card} ${
            selectedId === e.id ? styles.selected : ""
          }`}
        >
          <div className={styles.row}>
            <div className={styles.subject}>{e.subject}</div>

            <div className={styles.rightCol}>
              <StatusDot status={e.status} />
              <div className={styles.time}>{formatTimeAgo(e.updatedAt)}</div>
            </div>
          </div>

          <div className={styles.email}>{e.from}</div>
        </div>
      ))}
    </div>
  );
}
