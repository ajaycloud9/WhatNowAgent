-- Optional initial data for testing

-- Insert sample projects
INSERT INTO projects (name, description, status) VALUES
  ('Sample Project 1', 'This is a test project', 'active'),
  ('Sample Project 2', 'Another test project', 'planning');

-- Insert sample ideas
INSERT INTO ideas (project_id, title, description, priority, status) VALUES
  (1, 'First idea', 'This is the first idea', 'high', 'open'),
  (1, 'Second idea', 'This is the second idea', 'medium', 'in-progress'),
  (2, 'Third idea', 'This is the third idea', 'low', 'open');
