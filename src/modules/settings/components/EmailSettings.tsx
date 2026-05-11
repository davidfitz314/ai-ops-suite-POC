import { useState } from "react";
import { css } from "@emotion/css";
import { theme } from "../../../shared/theme";
import Input from "../../../shared/components/Input";
import TextArea from "../../../shared/components/TextArea";
import Button from "../../../shared/components/Button";

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    gap: 20,
    maxWidth: 640,
  }),

  card: css({
    background: "#ffffff", // 👈 force light surface
    color: "#111111", // 👈 force correct text color
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 10,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  }),

  sectionTitle: css({
    fontSize: 14,
    fontWeight: 600,
  }),

  field: css({
    display: "flex",
    flexDirection: "column",
    gap: 6,
  }),

  label: css({
    fontSize: 12,
    color: theme.colors.textSecondary,
  }),

  row: css({
    display: "flex",
    alignItems: "center",
    gap: 8,
  }),

  value: css({
    flex: 1,
    fontSize: 14,
    color: theme.colors.textMuted,
  }),

  input: css({
    background: "transparent",
    flex: 1,
    color: "#444",
  }),

  editIcon: css({
    cursor: "pointer",
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.textPrimary,
    opacity: 0.6,
    borderRadius: 6,

    "&:hover": {
      opacity: 1,
      background: theme.colors.surfaceSubtle,
    },
  }),

  footer: css({
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  }),
};

export default function EmailSettings() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@email.com");
  const [signature, setSignature] = useState("Best regards,");

  const [editing, setEditing] = useState({
    name: false,
    email: false,
    signature: false,
  });

  const isEditing = editing.name || editing.email || editing.signature;

  const toggleEdit = (key: keyof typeof editing) => {
    setEditing((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    // TODO: persist settings (localStorage or backend)

    setEditing({
      name: false,
      email: false,
      signature: false,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.sectionTitle}>Email Settings</div>

        {/* Name */}
        <div className={styles.field}>
          <div className={styles.label}>Name</div>

          <div className={styles.row}>
            {editing.name ? (
              <Input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <div className={styles.value}>{name}</div>
            )}

            <div className={styles.editIcon} onClick={() => toggleEdit("name")}>
              ✎
            </div>
          </div>
        </div>

        {/* Email */}
        <div className={styles.field}>
          <div className={styles.label}>Email</div>

          <div className={styles.row}>
            {editing.email ? (
              <Input
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div className={styles.value}>{email}</div>
            )}

            <div
              className={styles.editIcon}
              onClick={() => toggleEdit("email")}
            >
              ✎
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className={styles.field}>
          <div className={styles.label}>Signature</div>

          {editing.signature ? (
            <TextArea
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          ) : (
            <div className={styles.row}>
              <div className={styles.value}>{signature}</div>

              <div
                className={styles.editIcon}
                onClick={() => toggleEdit("signature")}
              >
                ✎
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className={styles.footer}>
          <Button
            variant="text"
            onClick={() => {
              // reset editing + revert values if needed
              setEditing({
                name: false,
                email: false,
                signature: false,
              });

              // TODO: optionally reset values to last saved state
            }}
          >
            Cancel
          </Button>

          <Button onClick={handleSave}>Save</Button>
        </div>
      )}
    </div>
  );
}
