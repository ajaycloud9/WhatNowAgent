// parseIdeas.js
export function extractProjectMetadata(blockText) {
  return {
    description: blockText.match(/\*\*Description:\*\*\s*(.+)/)?.[1]?.trim() || null,
    status: blockText.match(/\*\*Status:\*\*\s*(.+)/)?.[1]?.trim() || null,
  };
}

export function parseIdeasTable(blockText) {
  const ideaRegex =
    /\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/g;

  const rows = [];
  let match;
  while ((match = ideaRegex.exec(blockText)) !== null) {
    const [, idea_id, idea, status, tags, emotion, difficulty, last_update] = match;
    rows.push({
      idea_id: parseInt(idea_id),
      idea: idea.replace(/~~/g, "").trim(),
      status: status.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      emotion: emotion.trim(),
      difficulty: difficulty.trim(),
      last_update: last_update.trim(),
    });
  }
  return rows;
}
