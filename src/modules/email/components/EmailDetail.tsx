import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/css";
import type { EmailThread } from "../types";
import Button from "../../../shared/components/Button";
import { theme } from "../../../shared/theme";
import { formatTimeAgo } from "../../../shared/utils/time";
import TextArea from "../../../shared/components/TextArea";

const styles = {
  container: css({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: theme.colors.background,
  }),

  header: css({
    padding: 20,
    borderBottom: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
  }),

  subject: css({
    margin: 0,
  }),

  from: css({
    color: theme.colors.textSecondary,
    marginTop: 4,
  }),

  messages: css({
    flex: 1,
    overflowY: "auto",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  }),

  message: css({
    padding: 10,
    borderRadius: 8,
    maxWidth: "60%",
    border: `1px solid ${theme.colors.border}`,
  }),

  inbound: css({
    alignSelf: "flex-start",
    background: theme.colors.messageInbound,
  }),

  outbound: css({
    alignSelf: "flex-end",
    background: theme.colors.messageOutbound,
  }),

  timestamp: css({
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 4,
  }),

  section: css({
    padding: 20,
    borderTop: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
  }),

  textarea: css({
    width: "100%",
    minHeight: 80,
    marginTop: 8,
  }),

  actions: css({
    marginTop: 10,
    display: "flex",
    gap: 10,
  }),
};

export default function EmailDetail({
  thread,
  onSendReply,
}: {
  thread?: EmailThread;
  onSendReply: (reply: string) => void;
}) {
  const [reply, setReply] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // keep reply in sync when switching emails
  useEffect(() => {
    setReply(thread?.suggestedReply || "");
  }, [thread]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [thread?.messages]);

  if (!thread) return <div>Select email</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.subject}>{thread.subject}</h2>
        <div className={styles.from}>{thread.from}</div>
      </div>

      <div className={styles.messages}>
        {thread.messages.map((m) => (
          <div
            key={m.id}
            className={`${styles.message} ${
              m.direction === "inbound" ? styles.inbound : styles.outbound
            }`}
          >
            {m.content}
            <div className={styles.timestamp}>{formatTimeAgo(m.timestamp)}</div>
          </div>
        ))}

        {/* scroll target */}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.section}>
        <strong>Suggested Reply</strong>

        <TextArea
  value={reply}
  onChange={(e) => setReply(e.target.value)}
  placeholder="Write your reply..."
/>

        {thread.extractedTask && (
          <div style={{ marginTop: 10 }}>
            <strong>Suggested Task:</strong>
            <div>{thread.extractedTask}</div>
          </div>
        )}

        <div className={styles.actions}>
          <Button
            onClick={() => {
              onSendReply(reply);
              setReply(""); // clear after send
            }}
          >
            Send Reply
          </Button>

          <Button variant="secondary">Create Task</Button>
        </div>
      </div>
    </div>
  );
}
