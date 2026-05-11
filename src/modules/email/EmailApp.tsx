import { useState } from "react";
import { css } from "@emotion/css";
import EmailInbox from "./components/EmailInbox";
import EmailDetail from "./components/EmailDetail";
import { mockEmails } from "./data/mockEmails";
import type { EmailThread } from "./types";
import { theme } from "../../shared/theme";
import TopBar from "../../shared/components/TopBar";

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

  return (
    <div className={styles.container}>
      <TopBar title="Email Secretary" showBack />

      <div className={styles.content}>
        <EmailInbox
          emails={emails}
          selectedId={selectedId}
          onSelect={(e) => {
            setSelectedId(e.id);
          
            // mark as read
            setEmails((prev) =>
              prev.map((email) =>
                email.id === e.id && email.status === "unread"
                  ? { ...email, status: "read" }
                  : email
              )
            );
          }}
        />
        <EmailDetail thread={selected} onSendReply={handleSendReply} />
      </div>
    </div>
  );
}
