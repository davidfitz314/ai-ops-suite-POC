import { css } from "@emotion/css";
import { theme } from "../theme";

const styles = {
  base: css({
    width: "100%",
    height: 32,
    padding: "0 10px",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
    border: `1px solid ${theme.colors.border}`,
    transition: "all 0.15s ease",
    color: theme.colors.textPrimary,

    "::placeholder": {
      color: theme.colors.textMuted,
    },
  }),

  // 👇 for inline edit (EmailSettings)
  inline: css({
    background: "transparent",
    border: "1px solid transparent",

    ":hover": {
      background: theme.colors.surfaceSubtle,
    },

    ":focus": {
      borderColor: theme.colors.primary,
      background: theme.colors.surface,
    },
  }),

  // 👇 for main inputs (TaskDetail)
  default: css({
    background: theme.colors.surface,

    ":focus": {
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 2px ${theme.colors.primary}20`,
    },
  }),
};

export default function Input({
  variant = "default",
  ...props
}: {
  variant?: "default" | "inline";
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${styles.base} ${styles[variant]}`} {...props} />;
}
