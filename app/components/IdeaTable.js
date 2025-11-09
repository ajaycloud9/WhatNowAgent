export default function IdeaTable({ ideas }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Idea
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Emotion
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Difficulty
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Last Update
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ideas.map((idea) => (
            <tr key={idea.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {idea.idea_id}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {idea.idea}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  idea.status === 'done' ? 'bg-green-100 text-green-800' :
                  idea.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {idea.status}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {idea.emotion}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  idea.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                  idea.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {idea.difficulty}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {idea.last_update}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
