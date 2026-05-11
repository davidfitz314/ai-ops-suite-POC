import { css } from "@emotion/css";
import { theme } from "../theme";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

const styles = {
  base: css({
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
  }),

  primary: css({
    background: theme.colors.primary,
    color: "white",
    border: "none",
    "&:hover": {
      background: theme.colors.primaryHover,
    },
  }),

  secondary: css({
    background: theme.colors.surface,
    border: `1px solid  ${theme.colors.border}`,
    color: theme.colors.textPrimary,
    "&:hover": {
      background: theme.colors.surfaceSubtle,
    },
  }),

  text: css({
    background: "transparent",
    color: theme.colors.textSecondary,
    padding: "6px 8px",

    "&:hover": {
      background: "transparent",
      color: theme.colors.textPrimary,
    },
  }),
};

export default function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${styles.base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
