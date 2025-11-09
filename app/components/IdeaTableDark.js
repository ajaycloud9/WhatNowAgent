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
        className="text-blue-400 hover:text-blue-300 underline"
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

export default function IdeaTableDark({ ideas }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-white/5">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Idea
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Emotion
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Difficulty
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Last Update
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {ideas.map((idea) => (
            <tr key={idea.id} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-400">
                #{idea.idea_id}
              </td>
              <td className="px-6 py-4 text-sm text-white font-medium">
                {renderIdeaWithLinks(idea.idea)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  idea.status === 'done' ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50' :
                  idea.status === 'in-progress' ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50' :
                  'bg-slate-500/30 text-slate-200 border border-slate-400/50'
                }`}>
                  {idea.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="text-2xl">{idea.emotion}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  idea.difficulty === 'hard' ? 'bg-red-500/30 text-red-200 border border-red-400/50' :
                  idea.difficulty === 'medium' ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50' :
                  'bg-green-500/30 text-green-200 border border-green-400/50'
                }`}>
                  {idea.difficulty}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                {idea.last_update}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
