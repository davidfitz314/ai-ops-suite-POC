import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/css";
import type { EmailMessage, EmailThread } from "../types";
import Button from "../../../shared/components/Button";
import { theme } from "../../../shared/theme";
import { formatTimeAgo } from "../../../shared/utils/time";
import TextArea from "../../../shared/components/TextArea";
import * as emailApi from "../../../api/email";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../../shared/context/SettingsContext";
import Tooltip from "../../../shared/components/ToolTip";

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
    color: theme.colors.textPrimary,
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

  layoutRow: css({
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  }),

  leftColumn: css({
    flex: 1,
    display: "flex",
    flexDirection: "column",
  }),

  signatureCard: css({
    width: 220,
    background: theme.colors.surfaceSubtle, // light grey
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 8,
    padding: 12,
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 1.4,
  }),

  signatureTitle: css({
    fontWeight: 600,
    marginBottom: 6,
    fontSize: 12,
    color: theme.colors.textPrimary,
  }),
};

export default function EmailDetail({
  thread,
  onThreadUpdate,
  loading,
}: {
  thread?: EmailThread;
  onThreadUpdate: (t: EmailThread) => void;
  loading?: boolean;
}) {
  const [reply, setReply] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { settings } = useSettings();

  // keep reply in sync when switching emails
  useEffect(() => {
    setReply(thread?.suggestedReply || "");
  }, [thread]);

  // auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [thread?.messages]);

  if (loading) {
    return <div className={styles.container}>⏳ Loading email...</div>;
  }

  if (!thread) return <div>Select email</div>;

  // 🔥 API: send reply
  const handleSendReply = async () => {
    if (!reply.trim()) return;

    try {
      const footer = settings
        ? ["--", settings.signature, settings.name, settings.email]
            .filter(Boolean)
            .join("\n")
        : "";

      const fullReply = footer ? `${reply}\n\n${footer}` : reply;

      const newMessage: EmailMessage = {
        id: Date.now(), // temp id
        content: fullReply,
        direction: "outbound",
        timestamp: Date.now(),
      };

      // 🔥 update UI immediately
      onThreadUpdate({
        ...thread,
        status: "replied",
        messages: [...thread.messages, newMessage],
      });

      // 🔥 still call backend (but don't rely on it for UI)
      await emailApi.sendReply(thread.id, fullReply);

      setReply("");
      setReply("");
    } catch (err) {
      console.error("Failed to send reply", err);
    }
  };

  // 🔥 API: suggest task + navigate
  const handleCreateTask = async () => {
    try {
      const suggested = await emailApi.suggestTask(thread);

      navigate("/tasks", {
        state: { prefill: suggested },
      });
    } catch (err) {
      console.error("Failed to suggest task", err);
    }
    console.log("create task clicked");
  };

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
          <Button onClick={handleSendReply}>Send Reply</Button>

          <Button variant="secondary" onClick={handleCreateTask}>
            Create Task
          </Button>

          {/* 🔥 SIGNATURE TOOLTIP */}
          {settings && (
            <Tooltip
              position="top"
              text={
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <div style={{ fontWeight: 600 }}>Signature</div>
                  <div>--</div>
                  {settings.name && <div>{settings.name}</div>}
                  {settings.signature && <div>{settings.signature}</div>}
                  {settings.email && <div>{settings.email}</div>}
                </div>
              }
            >
              <div style={{ cursor: "pointer", opacity: 0.6 }}>ⓘ</div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}
