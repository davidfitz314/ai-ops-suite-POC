import { css } from "@emotion/css";
import { theme } from "../theme";

type Status = "unread" | "read" | "replied";

const styles = {
  base: css({
    width: 10,
    height: 10,
    borderRadius: "50%",
  }),
};

const colors = {
  unread: css({ background: theme.colors.danger }),
  read: css({ background: theme.colors.warning }),
  replied: css({ background: theme.colors.success }),
};

export default function StatusDot({ status }: { status: Status }) {
  return <div className={`${styles.base} ${colors[status]}`} />;
}
