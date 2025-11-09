# 🎯 WhatNow Agent

**AI-driven task manager** that syncs your ideas from Markdown to Supabase and displays them in a beautiful Next.js dashboard.

## ✨ Features

- 📝 **Markdown-Based**: Your `I-Can-Do-All-Things.md` is the single source of truth
- 🔄 **Auto-Sync**: Scripts parse and sync projects/ideas to Supabase
- 🌐 **Live Dashboard**: Real-time Next.js UI with nested project-idea display
- 🎨 **Tailwind CSS v4**: Modern styling with PostCSS integration
- 🗄️ **Supabase Backend**: PostgreSQL database with real-time capabilities

## 🚀 Quick Start

### Prerequisites

- Node.js v20.9.0 or higher
- npm v10 or higher
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ajaycloud9/WhatNowAgent.git
   cd WhatNowAgent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Setup database**
   ```bash
   npm run create-table
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
WhatNowAgent/
│
├── .env.local                      # 🔐 Environment variables (Supabase keys, etc.)
├── package.json                    # 📦 NPM dependencies and scripts
├── I-Can-Do-All-Things.md          # 🧠 Your master ideas & progress tracker (source of truth)
│
├── sql/                            # 🧱 Database schema & migrations
│   ├── create_whatnow_tables.sql   #   -> Creates 'projects' and 'ideas'
│   └── seed_dummy_data.sql         #   -> Optional initial data for testing
│
├── scripts/                        # ⚙️ Local automation & sync scripts
│   ├── sync.js                     #   -> Parses README.md and syncs to Supabase
│   ├── createTable.js              #   -> Runs any .sql file from /sql
│   ├── insertDummyData.js          #   -> Simple test data insertion
│   └── utils/                      #   -> Parsing helpers (splitMarkdown.js, parseIdeas.js)
│
├── app/                            # 🌐 Frontend (Next.js) – the live dashboard UI
│   ├── layout.js                   #   -> Root layout component
│   ├── page.js                     #   -> Main dashboard page
│   ├── lib/                        #   -> Shared clients (Supabase, API)
│   │   └── supabaseClient.js
│   ├── components/                 #   -> React UI components
│   │   ├── IdeaTable.js            #   -> Light mode table
│   │   ├── IdeaTableDark.js        #   -> Dark mode table
│   │   └── ProjectCard.jsx         #   -> Project display card
│   ├── pages/                      #   -> Alternative page implementations
│   │   ├── _app.js                 #   -> App wrapper
│   │   └── index.js                #   -> Alternative dashboard
│   └── styles/                     #   -> Tailwind/global CSS
│       └── globals.css
│
├── tests/                          # 🧪 Unit & integration tests (future)
│   └── parser.test.js
│
├── .github/                        # 🤖 GitHub CI/CD workflows
│   └── workflows/
│       └── sync.yml                #   -> Runs sync.js when README changes
│
├── vercel.json                     # 🌍 Vercel deployment config
├── tailwind.config.js              # 🎨 Tailwind CSS configuration
├── postcss.config.js               # 📝 PostCSS configuration
└── LICENSE                         # 📄 Open-source license (MIT)
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run sync` - Sync markdown to Supabase
- `npm run create-table` - Create database tables
- `npm run insert-data` - Insert dummy data
- `npm run check-env` - Verify environment variables

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Runtime**: Node.js v20
- **Package Manager**: npm v10

## 🗄️ Database Schema

### `projects` table
- `id` - Serial primary key
- `name` - Unique project name
- `description` - Project description
- `sprint` - Sprint information
- `days_left` - Days remaining
- `status` - Current status
- `created_at` - Timestamp

### `ideas` table
- `id` - Serial primary key
- `project_id` - Foreign key to projects
- `idea_id` - Idea number within project
- `idea` - Idea description
- `status` - Current status
- `tags` - Array of tags
- `emotion` - Emotion indicator
- `difficulty` - Difficulty level
- `last_update` - Last update date

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 📝 License

MIT © Ajay Singh

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
