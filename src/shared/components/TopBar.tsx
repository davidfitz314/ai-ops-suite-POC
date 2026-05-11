import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";
import Tooltip from "./ToolTip";

const styles = {
  container: css({
    padding: "16px 20px",
    borderBottom: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),

  left: css({
    display: "flex",
    alignItems: "center",
    gap: 12,
  }),

  title: css({
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.textPrimary,
  }),

  backButton: css({
    cursor: "pointer",
    fontSize: 14,
    color: theme.colors.textPrimary,
    padding: "6px 10px",
    borderRadius: 6,
    "&:hover": {
      background: theme.colors.surfaceSubtle,
    },
  }),
};

export default function TopBar({
  title,
  showBack = false,
  rightAction,
}: {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {showBack && (
          <Tooltip text="Previous" position="bottom">
            <div className={styles.backButton} onClick={() => navigate(-1)}>
              ←
            </div>
          </Tooltip>
        )}

        <div className={styles.title}>{title}</div>
      </div>

      <div>{rightAction}</div>
    </div>
  );
}
