// Simple test data insertion
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertDummyData() {
  try {
    console.log('📝 Inserting dummy data...');
    
    // Insert sample projects
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .insert([
        { name: 'Sample Project 1', description: 'This is a test project', status: 'active' },
        { name: 'Sample Project 2', description: 'Another test project', status: 'planning' }
      ])
      .select();
    
    if (projectError) {
      console.error('❌ Error inserting projects:', projectError.message);
      return;
    }
    
    console.log(`✅ Inserted ${projects.length} projects`);
    
    // Insert sample ideas
    if (projects && projects.length > 0) {
      const { data: ideas, error: ideaError } = await supabase
        .from('ideas')
        .insert([
          { project_id: projects[0].id, idea: 'First idea', status: 'open', difficulty: 'medium' },
          { project_id: projects[0].id, idea: 'Second idea', status: 'in-progress', difficulty: 'hard' },
          { project_id: projects[1].id, idea: 'Third idea', status: 'open', difficulty: 'easy' }
        ])
        .select();
      
      if (ideaError) {
        console.error('❌ Error inserting ideas:', ideaError.message);
        return;
      }
      
      console.log(`✅ Inserted ${ideas.length} ideas`);
    }
    
    console.log('✅ Dummy data inserted successfully!');
  } catch (error) {
    console.error('❌ Error inserting dummy data:', error);
  }
}

insertDummyData();
