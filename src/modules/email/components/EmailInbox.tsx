import { css } from "@emotion/css";
import { theme } from "../../../shared/theme";
import type { EmailThread } from "../types";

const styles = {
  container: css({
    width: 260,
    borderRight: `1px solid ${theme.colors.border}`,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  }),

  item: css({
    padding: "12px 14px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    borderBottom: `1px solid ${theme.colors.border}`,
    transition: "background 0.15s ease",

    "&:hover": {
      background: theme.colors.surfaceSubtle,
    },
  }),

  selected: css({
    background: theme.colors.surface,
  }),

  subjectRow: css({
    display: "flex",
    alignItems: "center",
    gap: 6,
  }),

  subject: css({
    fontSize: 14,
    fontWeight: 500,
    color: theme.colors.textPrimary,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),

  preview: css({
    fontSize: 12,
    color: theme.colors.textSecondary,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),

  statusDot: css({
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  }),

  empty: css({
    padding: 16,
    fontSize: 13,
    color: theme.colors.textSecondary,
  }),
};

const statusColors = {
  unread: "#ef4444", // red
  read: "#f59e0b", // yellow
  replied: "#22c55e", // green
};

export default function EmailInbox({
  emails,
  selectedId,
  onSelect,
}: {
  emails: EmailThread[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  if (!emails.length) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No emails</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {emails.map((email) => {
        const isSelected = email.id === selectedId;
        const firstMessage = email.messages[0];

        return (
          <div
            key={email.id}
            onClick={() => onSelect(email.id)}
            className={`${styles.item} ${isSelected ? styles.selected : ""}`}
          >
            {/* Subject + Status */}
            <div className={styles.subjectRow}>
              <div
                className={styles.statusDot}
                style={{
                  background: statusColors[email.status],
                }}
              />

              <div className={styles.subject}>{email.subject}</div>
            </div>

            {/* Preview */}
            <div className={styles.preview}>{firstMessage?.content || ""}</div>
          </div>
        );
      })}
    </div>
  );
}
