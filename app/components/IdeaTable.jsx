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
              <td className="px-3 py-2">{idea.idea}</td>
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
