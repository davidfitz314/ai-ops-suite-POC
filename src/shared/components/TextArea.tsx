import { css } from "@emotion/css";
import { theme } from "../theme";

const styles = {
  base: css({
    width: "100%",
    minHeight: 90,
    padding: "8px 10px",
    borderRadius: 6,
    border: `1px solid transparent`,
    background: theme.colors.background, // 👈 matches Input
    color: theme.colors.textPrimary,
    fontSize: 14,
    resize: "vertical",
    outline: "none",
    transition: "all 0.15s ease",

    "::placeholder": {
      color: theme.colors.textMuted,
    },

    ":hover": {
      background: theme.colors.surfaceSubtle,
    },

    ":focus": {
      borderColor: theme.colors.primary,
      background: theme.colors.surface,
      boxShadow: `0 0 0 2px ${theme.colors.primary}20`,
    },
  }),
};

export default function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return <textarea className={styles.base} {...props} />;
}
