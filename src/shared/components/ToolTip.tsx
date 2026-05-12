import { css } from "@emotion/css";
import { theme } from "../theme";

type Position = "top" | "bottom" | "left" | "right";

const styles = {
  wrapper: css({
    position: "relative",
    display: "inline-flex", // 👈 better alignment for icons
    alignItems: "center",

    "&:hover .tooltip": {
      opacity: 0.7,
    },
  }),

  tooltip: css({
    position: "absolute",
    background: theme.colors.textPrimary,
    color: "#fff",
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 4,
    whiteSpace: "normal",
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity 0.15s ease",
    zIndex: 10,
    minWidth: "240",
  }),
};

const positions: Record<Position, string> = {
  top: css({
    bottom: "calc(100% + 6px)",
    left: "50%",
    transform: "translateX(-50%)",
  }),

  bottom: css({
    top: "calc(100% + 6px)",
    left: "50%",
    transform: "translateX(-50%)",
  }),

  left: css({
    right: "calc(100% + 6px)",
    top: "50%",
    transform: "translateY(-50%)",
  }),

  right: css({
    left: "calc(100% + 6px)",
    top: "50%",
    transform: "translateY(-50%)",
  }),
};

export default function Tooltip({
  text,
  position = "top",
  children,
}: {
  text: React.ReactNode | string;
  position?: Position;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.tooltip} ${positions[position]} tooltip`}>
        {text}
      </div>
      {children}
    </div>
  );
}
