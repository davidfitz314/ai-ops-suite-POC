import { useState } from "react";
import { css } from "@emotion/css";
import EmailInbox from "./components/EmailInbox";
import EmailDetail from "./components/EmailDetail";
import { mockEmails } from "./data/mockEmails";
import type { EmailThread } from "./types";
import { theme } from "../../shared/theme";
import TopBar from "../../shared/components/TopBar";
import TaskPanel from "./components/TaskPanel";
import { useTasks } from "../../shared/context/TaskContext";
import { useNavigate } from "react-router-dom";

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

  menuButton: css({
    cursor: "pointer",
    fontSize: 18,
    padding: "6px 10px",
    borderRadius: 6,
    color: theme.colors.textPrimary,

    "&:hover": {
      background: theme.colors.surfaceSubtle,
    },
  }),

  badge: css({
    marginLeft: 6,
    fontSize: 11,
    padding: "2px 6px",
    borderRadius: 10,
    background: theme.colors.primary,
    color: "#fff",
  }),
};

export default function EmailApp() {
  const navigate = useNavigate();
  const { tasks } = useTasks();
  const [showTasks, setShowTasks] = useState(false);

  const [emails, setEmails] = useState<EmailThread[]>(mockEmails);
  const [selectedId, setSelectedId] = useState<number | undefined>(
    mockEmails[0]?.id
  );

  const selected = emails.find((e) => e.id === selectedId);

  const handleSendReply = (reply: string) => {
    if (!selectedId) return;

    setEmails((prev) =>
      prev.map((email) => {
        if (email.id !== selectedId) return email;

        return {
          ...email,
          status: "replied",
          updatedAt: Date.now(),
          messages: [
            ...email.messages,
            {
              id: Date.now(),
              direction: "outbound",
              content: reply,
              timestamp: Date.now(),
            },
          ],
        };
      })
    );
  };

  const handleCreateTask = () => {
    const fallback = selected?.subject || "Follow-up task";

    const taskText = selected?.extractedTask || fallback;

    navigate("/tasks", {
      state: {
        prefill: taskText,
      },
    });
  };

  return (
    <div className={styles.container}>
      <TopBar
        title="Email Secretary"
        showBack
        rightAction={
          <div
            className={styles.menuButton}
            onClick={() => setShowTasks((prev) => !prev)}
          >
            ☰
            {tasks.length > 0 && (
              <span className={styles.badge}>{tasks.length}</span>
            )}
          </div>
        }
      />

      <div className={styles.content}>
        <EmailInbox
          emails={emails}
          selectedId={selectedId}
          onSelect={(e) => {
            setSelectedId(e.id);

            setEmails((prev) =>
              prev.map((email) =>
                email.id === e.id && email.status === "unread"
                  ? { ...email, status: "read" }
                  : email
              )
            );
          }}
        />

        <EmailDetail
          thread={selected}
          onSendReply={handleSendReply}
          onCreateTask={handleCreateTask}
        />

        <TaskPanel
          tasks={tasks}
          isOpen={showTasks}
          onClose={() => setShowTasks(false)}
        />
      </div>
    </div>
  );
}
