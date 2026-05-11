import { css } from "@emotion/css";
import TopBar from "../../shared/components/TopBar";
import { theme } from "../../shared/theme";
import EmailSettings from "./components/EmailSettings";

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: theme.colors.background,
  }),

  content: css({
    padding: 20,
  }),
};

export default function SettingsApp() {
  return (
    <div className={styles.container}>
      <TopBar title="Settings" showBack />
      <div className={styles.content}>
        <EmailSettings />
      </div>
    </div>
  );
}
