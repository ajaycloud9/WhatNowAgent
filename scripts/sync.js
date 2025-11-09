// sync.js
import fs from "fs";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { splitProjectBlocks, parseProjectHeader } from "./utils/splitMarkdown.js";
import { extractProjectMetadata, parseIdeasTable } from "./utils/parseIdeas.js";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function syncReadme() {
  console.log("🧠 Reading I-Can-Do-All-Things.md...");
  const readme = fs.readFileSync("I-Can-Do-All-Things.md", "utf-8");

  const projectBlocks = splitProjectBlocks(readme);
  console.log(`📁 Found ${projectBlocks.length} project sections.`);

  for (const { headerLine, blockText } of projectBlocks) {
    const header = parseProjectHeader(headerLine);
    if (!header) continue;

    const meta = extractProjectMetadata(blockText);
    const { name } = header;

    // Upsert project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .upsert(
        {
          name,
          description: meta.description,
          status: meta.status,
        },
        { onConflict: "name" }
      )
      .select()
      .single();

    if (projectError) {
      console.error(`❌ Error inserting project ${name}:`, projectError.message);
      continue;
    }

    console.log(`✅ Project synced: ${project.name}`);

    // Parse ideas
    const ideas = parseIdeasTable(blockText);

    for (const idea of ideas) {
      const { error: ideaError } = await supabase
        .from("ideas")
        .upsert({ ...idea, project_id: project.id }, { onConflict: "project_id,idea_id" });

      if (ideaError) {
        console.error(`   ❌ Idea ${idea.idea_id} failed:`, ideaError.message);
      }
    }

    console.log(`   ↳ Synced ${ideas.length} ideas under ${name}`);
  }

  console.log("🎉 Sync complete — database updated!");
}

syncReadme().catch((err) => console.error("Fatal:", err.message));
