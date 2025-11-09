// Runs any .sql file from /sql
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function: create a stored procedure once to execute SQL
const CREATE_FUNCTION_SQL = `
create or replace function public.exec_sql(query text)
returns void as $$
begin
  execute query;
end;
$$ language plpgsql security definer;
grant execute on function public.exec_sql(text) to anon, authenticated, service_role;
`;

async function ensureExecFunction() {
  console.log("⚙️  Ensuring exec_sql() function exists...");
  const { error } = await supabase.rpc("exec_sql", { query: "select 1;" });
  if (!error) {
    console.log("✅ exec_sql() function already exists");
    return true; // already exists and callable
  }
  
  console.log("� Creating exec_sql() helper function...");
  const res = await fetch(
    `${supabaseUrl}/rest/v1/rpc`,
    {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        "Prefer": "params=single-object",
      },
      body: JSON.stringify({ query: CREATE_FUNCTION_SQL }),
    }
  );
  
  if (res.ok) {
    console.log("✅ Helper function created successfully");
  } else {
    console.log("⚠️  Helper function creation response:", res.status);
    console.log("   You may need to create it manually in Supabase SQL Editor");
  }
}

async function createTable(sqlFilePath) {
  try {
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log(`� Reading SQL from ${sqlFilePath}...`);
    
    // Ensure the exec_sql function exists
    await ensureExecFunction();
    
    console.log(`🚀 Executing SQL from ${sqlFilePath}...`);
    const { error } = await supabase.rpc("exec_sql", { query: sqlContent });
    
    if (error) {
      console.error("❌ SQL Execution error:", error.message);
      console.log("\n💡 TIP: If exec_sql doesn't exist, run this in Supabase SQL Editor:");
      console.log(CREATE_FUNCTION_SQL);
    } else {
      console.log("✅ SQL executed successfully!");
      
      // Verify tables exist
      console.log('\n🔍 Verifying tables...');
      const { error: projectError } = await supabase.from('projects').select('*').limit(1);
      const { error: ideaError } = await supabase.from('ideas').select('*').limit(1);
      
      if (!projectError) console.log('✅ projects table: EXISTS');
      if (!ideaError) console.log('✅ ideas table: EXISTS');
      
      if (!projectError && !ideaError) {
        console.log('\n🎉 All tables are set up correctly!');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run with: node createTable.js path/to/file.sql
const sqlFile = process.argv[2] || path.join(__dirname, '../sql/create_whatnow_tables.sql');
createTable(sqlFile);
