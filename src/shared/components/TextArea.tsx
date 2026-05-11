import { css } from "@emotion/css";
import { theme } from "../theme";

const styles = {
  base: css({
    width: "100%",
    minHeight: 90,
    padding: "10px 12px",
    borderRadius: 8,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    color: theme.colors.textPrimary,
    fontSize: 14,
    resize: "vertical",
    outline: "none",
    transition: "all 0.15s ease",

    "::placeholder": {
      color: theme.colors.textMuted,
    },

    ":focus": {
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 2px ${theme.colors.primary}20`,
    },
  }),
};

export default function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return <textarea className={styles.base} {...props} />;
}
