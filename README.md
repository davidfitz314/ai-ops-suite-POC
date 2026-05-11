# AI Ops Suite

Simple AI-powered workflow tool for automating business intake, responses, and task tracking.

## Tech

- React + TypeScript (Vite)
- Mock backend (initial)


Perfect—this is exactly the kind of checkpoint that prevents future confusion 👍
I’ll give you a **clean snapshot of your current system + architecture + decisions**, so when you come back, you don’t have to re-figure anything.

---

# 🧠 🔖 PROJECT SNAPSHOT (Current State)

## 🎯 Product Direction

```text
Kawika Tools
→ Modular AI Ops Suite

Current tools:
- Email Assistant
- Task Manager
- Settings
```

Core philosophy:

```text
Fast UX
Reactive state (no save unless necessary)
Human-in-the-loop for AI actions
```

---

# 🧱 📁 CURRENT FILE STRUCTURE

```text
src/
  modules/
    platform/
      components/
        Landing.tsx

    email/
      components/
        EmailInbox.tsx
        EmailDetail.tsx
      EmailApp.tsx

    tasks/
      components/
        TaskList.tsx
        TaskDetail.tsx
      TasksApp.tsx
      types.ts

    settings/
      components/
        EmailSettings.tsx
      SettingsApp.tsx
      index.ts

  shared/
    components/
      Button.tsx
      Input.tsx
      TextArea.tsx
      StatusDot.tsx
      TopBar.tsx
      Tooltip.tsx

    context/
      TaskContext.tsx

    theme/
      theme.ts

    utils/
      time.ts
```

---

# 🧠 🧩 ARCHITECTURE DECISIONS

## 1. State Management

```text
TaskContext (global)
→ used by:
   - Email (create task)
   - Tasks (view/edit)
```

Pattern:

```text
Single source of truth ✔️
No prop drilling ✔️
```

---

## 2. Task System

### Status model

```ts
type TaskStatus = "open" | "inProgress" | "done" | "closed";
```

### Behavior

```text
No cycling ❌
Explicit actions ✔️

open → start / cancel
inProgress → complete / cancel
done → close
```

---

## 3. UX Philosophy

### Tasks

```text
Immediate updates (no save)
```

### Settings

```text
Controlled editing (Save + Cancel)
```

👉 intentional inconsistency = correct design

---

## 4. Email → Task Flow (IMPORTANT)

```text
Email
↓
Create Task click
↓
Navigate → /tasks
↓
Prefill input
↓
User confirms
```

Key concept:

```text
AI suggests → human confirms
```

---

## 5. Input System

```text
Input:
  default → visible input (TaskDetail)
  inline  → blended edit (Settings)

TextArea:
  for multi-line only
```

---

## 6. Theming Insight (important lesson learned)

```text
Inline edit inputs → transparent
Primary inputs → surface

Settings panel overrides theme → light surface
```

---

# 🧠 🔄 CURRENT FEATURE SET

## ✅ Email Module

* inbox + detail
* message threads
* create task button
* fallback if no extractedTask

---

## ✅ Task Module

* grouped by status
* create task input
* auto-select new task
* detail panel
* status icons
* inline editing

---

## ✅ Settings Module

* display-first UI
* edit toggle per field
* Save / Cancel
* structured layout

---

## ✅ Platform Landing

* tool navigation
* task counts (open / inProgress / done)

---

# 🧠 ⚠️ KNOWN TODOs

### 🔴 High Priority

```text
- Persist tasks (localStorage or backend)
- Persist settings
```

---

### 🟡 Medium

```text
- Save indicator (live updates)
- Cancel should restore original values
- Scroll-to-selected task
```

---

### 🟢 Future

```text
- Multi-task AI suggestions
- Email reply generation
- Task descriptions (not just title)
- Drag & drop task states
```

---

# 🧠 🔌 NEXT PHASE (YOU ALREADY PLANNED CORRECTLY)

## 🎯 Goal

Replace:

```text
Mock data ❌
```

With:

```text
API-driven system ✔️
```

---

## 🧱 Phase 1: Mock API Layer (Frontend)

Create:

```text
src/api/
  tasks.ts
  email.ts
```

Example:

```ts
export async function getTasks() {
  return new Promise((res) =>
    setTimeout(() => res(mockTasks), 300)
  );
}
```

---

## 🧱 Phase 2: Local Backend (PyCharm)

You’re thinking:

```text
Python server (FastAPI likely)
```

Perfect choice 👍

---

### Suggested stack

```text
FastAPI
Uvicorn
Pydantic
```

---

### Initial endpoints

```text
GET    /tasks
POST   /tasks
PATCH  /tasks/:id

GET    /emails
POST   /emails/reply

POST   /ai/suggest-task
```

---

## 🧠 Phase 3: AI Integration (future)

```text
Email content
↓
AI extracts tasks
↓
Returns suggestions
↓
User confirms
```

---

# 🧠 🔥 IMPORTANT INSIGHT (SAVE THIS)

You are building:

```text
NOT a CRUD app
BUT a workflow system
```

Core loop:

```text
Input (Email)
↓
Interpret (AI)
↓
Confirm (User)
↓
Act (Tasks)
↓
Track (UI)
```

---

# 🧭 WHERE YOU LEFT OFF

You are at:

```text
UI + Architecture = solid ✔️
```

Next session:

```text
API layer + backend simulation
```

---

# 👍 Final Summary

You now have:

* ✔ modular architecture
* ✔ shared state system
* ✔ clean UX patterns
* ✔ scalable design decisions

---

# 🧭 When you come back, start with:

```text
"let’s build mock API layer"
```

or

```text
"let’s spin up FastAPI backend"
```

---

