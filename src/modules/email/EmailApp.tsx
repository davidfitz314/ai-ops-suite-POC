import { useCallback, useEffect, useRef, useState } from "react";
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

  menuToggle: css({
    cursor: "pointer",
    fontSize: 18,
  }),
};

export default function EmailApp() {
  const [threads, setThreads] = useState<EmailThread[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedThread, setSelectedThread] = useState<EmailThread | null>(
    null
  );
  const [loadingThread, setLoadingThread] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  const { tasks } = useTasks();
  const loadSeqRef = useRef(0);

  const updateThread = useCallback((updated: EmailThread) => {
    setThreads((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setSelectedThread((prev) =>
      prev?.id === updated.id ? { ...updated } : prev
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    emailApi
      .getEmails()
      .then((data) => {
        if (!cancelled) setThreads(data);
      })
      .catch((err) => {
        if (!cancelled) console.error("Failed to load inbox", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelect = useCallback(async (id: number) => {
    const seq = ++loadSeqRef.current;
    setLoadingThread(true);
    setSelectedId(id);
    try {
      const thread = await emailApi.getEmailById(id);
      if (seq !== loadSeqRef.current) return;
      setSelectedThread(thread);
    } catch (err) {
      if (seq !== loadSeqRef.current) return;
      console.error("Failed to load email", err);
    } finally {
      if (seq === loadSeqRef.current) setLoadingThread(false);
    }
  }, []);

  const toggleTasks = useCallback(() => setShowTasks((p) => !p), []);
  const closeTasks = useCallback(() => setShowTasks(false), []);

  return (
    <div className={styles.container}>
      <TopBar
        title="Email"
        showBack
        rightAction={
          <div className={styles.menuToggle} onClick={toggleTasks}>
            ☰
          </div>
        }
      />

      <div className={styles.content}>
        <ErrorBoundary
          fallback={<div style={{ padding: 20 }}>Inbox Failed to load</div>}
        >
          <EmailInbox
            emails={threads}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<div style={{ padding: 20 }}>Detail Failed to load</div>}
        >
          <EmailDetail
            thread={selectedThread}
            onThreadUpdate={updateThread}
            loading={loadingThread}
          />
        </ErrorBoundary>

        <ErrorBoundary
          fallback={
            <div style={{ padding: 20 }}> Task List failed to load</div>
          }
        >
          <TaskPanel tasks={tasks} isOpen={showTasks} onClose={closeTasks} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
