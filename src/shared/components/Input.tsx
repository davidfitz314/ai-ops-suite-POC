import { css } from "@emotion/css";
import { theme } from "../theme";

const styles = {
  base: css({
    width: "100%",
    height: 36,
    padding: "0 10px",
    borderRadius: 6,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    color: theme.colors.textPrimary,
    fontSize: 14,
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

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input className={styles.base} {...props} />;
}