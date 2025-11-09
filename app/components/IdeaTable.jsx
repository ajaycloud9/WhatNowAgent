// Helper function to render markdown links as HTML
function renderIdeaWithLinks(text) {
  if (!text) return null;
  
  // Match markdown links: [text](url)
  const parts = [];
  let lastIndex = 0;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Add the link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {match[1]}
      </a>
    );
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
}

export default function IdeaTable({ ideas }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 mt-4 text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Idea</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Emotion</th>
            <th className="px-3 py-2 text-left">Difficulty</th>
            <th className="px-3 py-2 text-left">Last Update</th>
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea) => (
            <tr
              key={idea.id}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-3 py-2 font-mono text-gray-600">{idea.idea_id}</td>
              <td className="px-3 py-2">{renderIdeaWithLinks(idea.idea)}</td>
              <td className="px-3 py-2">{idea.status}</td>
              <td className="px-3 py-2">{idea.emotion}</td>
              <td className="px-3 py-2">{idea.difficulty}</td>
              <td className="px-3 py-2 text-gray-500">{idea.last_update}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
