import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { theme } from "../../shared/theme";
import TopBar from "../../shared/components/TopBar";
import EmailInbox from "./components/EmailInbox";
import EmailDetail from "./components/EmailDetail";
import * as emailApi from "../../api/email";
import type { EmailThread } from "./types";
import ErrorBoundary from "../../shared/components/ErrorBoundary";
import TaskPanel from "./components/TaskPanel";
import { useTasks } from "../../shared/context/TaskContext";

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
  const [showTasks, setShowTasks] = useState<boolean>(false);

  const { tasks } = useTasks();

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
      <TopBar
        title="Email"
        showBack
        rightAction={
          <div
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={() => setShowTasks((p) => !p)}
          >
            ☰
          </div>
        }
      />

      <div className={styles.content}>
        <ErrorBoundary
          fallback={<div style={{ padding: 20 }}>Inbox crashed</div>}
        >
          <EmailInbox
            emails={threads}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<div style={{ padding: 20 }}>Detail crashed</div>}
        >
          <EmailDetail thread={selected} onThreadUpdate={updateThread} />
        </ErrorBoundary>

        <ErrorBoundary
          fallback={
            <div style={{ padding: 20 }}> Task List failed to load</div>
          }
        >
          <TaskPanel
            tasks={tasks} // from context or state
            isOpen={showTasks}
            onClose={() => setShowTasks(false)}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}
