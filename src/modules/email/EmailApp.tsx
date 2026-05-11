import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { theme } from "../../shared/theme";
import TopBar from "../../shared/components/TopBar";
import EmailInbox from "./components/EmailInbox";
import EmailDetail from "./components/EmailDetail";
import * as emailApi from "../../api/email";
import type { EmailThread } from "./types";

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: theme.colors.background,
  }),

  content: css({
    display: "flex",
    flex: 1,
    overflow: "hidden",
  }),
};

export default function EmailApp() {
  const [threads, setThreads] = useState<EmailThread[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const updateThread = (updated: EmailThread) => {
    setThreads((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  // 🔥 Load threads from API
  useEffect(() => {
    emailApi.getEmails().then((data) => {
      setThreads(data);

      if (data.length > 0) {
        setSelectedId(data[0].id);
      }
    });
  }, []);

  // 🔥 Handle selecting an email
  const handleSelect = async (id: number) => {
    setSelectedId(id);

    // mark as read in API
    await emailApi.markAsRead(id);

    // update local state
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id && t.status === "unread" ? { ...t, status: "read" } : t
      )
    );
  };

  // 🔥 Find selected thread
  const selected = threads.find((t) => t.id === selectedId) || undefined;

  return (
    <div className={styles.container}>
      <TopBar title="Email" showBack />

      <div className={styles.content}>
        <EmailInbox
          emails={threads}
          selectedId={selectedId}
          onSelect={handleSelect}
        />

        <EmailDetail thread={selected} onThreadUpdate={updateThread} />
      </div>
    </div>
  );
}
