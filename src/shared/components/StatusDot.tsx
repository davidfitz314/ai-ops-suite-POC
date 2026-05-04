import { css } from "@emotion/css";
import { theme } from "../theme";

type Status = "open" | "in_progress" | "done";

const base = css({
  width: 10,
  height: 10,
  borderRadius: "50%",
});

const colors = {
  open: css({ background: theme.colors.danger }),
  in_progress: css({ background: theme.colors.warning }),
  done: css({ background: theme.colors.success }),
};

export default function StatusDot({ status }: { status: Status }) {
  return <div className={`${base} ${colors[status]}`} />;
}