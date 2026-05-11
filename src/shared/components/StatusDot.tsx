import { css } from "@emotion/css";
import { theme } from "../theme";

type Status =
  | "unread"
  | "read"
  | "replied"
  | "open"
  | "inProgress"
  | "done"
  | "closed";

const styles = {
  base: css({
    width: 10,
    height: 10,
    borderRadius: "50%",
    flexShrink: 0,
  }),
};

const colors: Record<Status, string> = {
  // email
  unread: theme.colors.danger,
  read: theme.colors.warning,
  replied: theme.colors.success,

  // tasks
  open: theme.colors.danger,
  inProgress: theme.colors.warning,
  done: theme.colors.success,
  closed: theme.colors.textMuted,
};

export default function StatusDot({ status }: { status: Status }) {
  return <div className={styles.base} style={{ background: colors[status] }} />;
}
