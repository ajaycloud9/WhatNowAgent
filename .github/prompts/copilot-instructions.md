# 🧠 **WhatNow Agent — `.copilot-instructions.md`**

```markdown
# 🤖 GitHub Copilot Instructions — WhatNow Agent

## 🎯 Project Overview
WhatNow Agent is an **AI-driven task manager** that transforms simple Markdown notes into structured, intelligent insights.  
It parses the user’s `I-Can-Do-All-Things.md` and `WhatNow.Agent.md` files to extract:
- Projects, ideas, emotions, and difficulty levels  
- Progress and completion rates  

The backend is powered by **Supabase (PostgreSQL)**,  
the frontend by **Next.js (Vercel)**,  
and automation scripts are built in **Node.js (ES modules)**.  

The long-term goal is to integrate **LangGraph** for reasoning and **AI scheduling assistance**.

---

## 🧱 Repository Structure (High-Level)

```

whatnow-agent/
├── .env.local                 # Supabase URL & Anon key
├── README.md                  # Source of truth for user tasks
├── sql/                       # Database schema & migrations
│   └── create_whatnow_tables.sql
├── scripts/                   # Automation scripts (Node)
│   ├── sync.js                # Parse README → Supabase
│   ├── createTable.js         # Run .sql migrations
│   ├── insertDummyData.js     # Testing utilities
│   └── utils/                 # Parsing helpers
├── app/                       # Frontend (Next.js)
│   ├── lib/                   # Supabase client, hooks
│   ├── components/            # Reusable UI
│   └── pages/                 # Routes (Next.js Pages Router)
├── .github/workflows/         # GitHub Actions for auto-sync
│   └── sync.yml
└── vercel.json                # Vercel deployment config

```

---

## 🧩 Tech Stack Guidelines

| Layer | Tech | Purpose |
|-------|------|----------|
| **Database** | Supabase (PostgreSQL) | Stores projects & ideas |
| **Backend** | Node.js (ESM) | Local sync, automation scripts |
| **Frontend** | Next.js + Tailwind CSS | Dashboard & visualization |
| **AI/Automation (future)** | LangGraph + OpenAI API | Intelligent task selection |
| **Hosting** | Vercel (frontend), Raspberry Pi (local backend) | Deployment |
| **CI/CD** | GitHub Actions | Auto-sync README → Supabase |

---

## ⚙️ Development Conventions

- **ES Modules only** (`"type": "module"` in `package.json`)
- **Environment variables** loaded via `dotenv`  
  (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- **Supabase** used through the official `@supabase/supabase-js` client
- **Markdown parser** should handle:
  - Project headers in the form `### Project n: Name`
  - Description, Sprint, Days Left, Status (bold labels)
  - Idea tables with columns: `Idea ID | Idea | Status | Tags | Emotion | Difficulty | Last Update`
- **Status emojis → canonical values:**
  - ✅ → Completed
  - 🔄 → In Progress
  - 🧪 → Testing
  - ⬜ → Todo
- **Difficulty scale:** `🟩🟨🟧🟥`
- **Emotions:** Keep emojis as raw data (e.g., 😄, 🤓, 🔥)

---

## 🧠 AI Coding Behavior Expectations

### When Editing Code
- Preserve **project structure** and **file modularity** — don’t mix parsing, database, and UI logic in one file.
- Keep **idempotency** in database operations — use `upsert()` for sync scripts.
- Use **async/await** consistently with clear error handling (`try/catch` or error logs).
- Favor **pure functions** for parsing helpers (stateless).
- Always **log meaningful steps** (✅ Synced project, ❌ Failed idea, etc.) for debugging clarity.
- Assume the user may run scripts on a Raspberry Pi → **keep dependencies lightweight**.

### When Writing New Features
- Place all new automation scripts under `/scripts`.
- Place all parsing helpers under `/scripts/utils`.
- When extending the schema, **add a new `.sql` file** in `/sql/migrations` and execute via `createTable.js`.
- For frontend work:
  - Use **functional React components** with hooks.
  - Fetch data using the **Supabase client from `/app/lib/supabaseClient.js`**.
  - Style using **Tailwind classes** (no inline CSS).
  - Group logic into composable UI components (`ProjectCard`, `IdeaTable`, etc.).

---

## 🧩 Example Context for Copilot Prompts

When editing `/scripts/sync.js`:
> “You are updating the Markdown parser that reads the user’s README.  
> Extract all projects and their idea tables, normalize emojis,  
> and push structured data into Supabase tables (`projects`, `ideas`).”

When editing `/app/pages/index.js`:
> “You are building a dashboard that displays Supabase data  
> with filters for project status, emotion, and difficulty.”

When editing `/sql/create_whatnow_tables.sql`:
> “You are defining database schemas for projects and ideas  
> used by WhatNow Agent’s Markdown sync system.”

---

## 🔐 Coding Standards

- **Linting/Formatting:** Use Prettier defaults; keep code readable.
- **Commits:** Follow conventional style (`feat:`, `fix:`, `refactor:`).
- **Error handling:** Fail gracefully with console output, not hard crashes.
- **Testing:** Write small test cases under `/tests` for parsers and DB syncs.

---

## 🚀 Deployment Expectations

- **Local:** `npm run sync` to update Supabase manually.  
- **CI:** GitHub Actions triggers `sync.js` on README changes.
- **Frontend:** Vercel auto-deploys on main branch pushes.
- **Future:** Add LangGraph pipeline (`agents/whatnowAgent.graph.ts`) for reasoning.

---

## 💡 Project Philosophy
Keep WhatNow Agent **simple, human, and explainable**.  
Markdown stays the interface; AI is the assistant.  
No hidden automation — every transformation should be observable, logged, and reversible.

```