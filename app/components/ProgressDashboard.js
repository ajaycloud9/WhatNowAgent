"use client";

export default function ProgressDashboard({ projects }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  const totalProjects = projects.length;
  const totalIdeas = projects.reduce((sum, p) => sum + (p.ideas?.length || 0), 0);
  
  const completedIdeas = projects.reduce((sum, p) => {
    return sum + (p.ideas?.filter(i => i.status?.includes('✅')).length || 0);
  }, 0);
  
  const inProgressIdeas = projects.reduce((sum, p) => {
    return sum + (p.ideas?.filter(i => i.status?.includes('🔄')).length || 0);
  }, 0);
  
  const testingIdeas = projects.reduce((sum, p) => {
    return sum + (p.ideas?.filter(i => i.status?.includes('🧪')).length || 0);
  }, 0);
  
  const notStartedIdeas = projects.reduce((sum, p) => {
    return sum + (p.ideas?.filter(i => i.status?.includes('⬜')).length || 0);
  }, 0);

  const overallProgress = totalIdeas > 0 ? Math.round((completedIdeas / totalIdeas) * 100) : 0;

  return (
    <div className="mb-8">
      {/* Report Card Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl shadow-xl p-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">📊 Progress Report Card</h2>
        <div className="inline-block bg-white/20 rounded-full px-6 py-2">
          <span className="text-5xl font-black text-white">{overallProgress}%</span>
          <span className="text-sm text-white/80 ml-2">Overall</span>
        </div>
      </div>

      {/* Summary Stats Table */}
      <div className="bg-white rounded-b-xl shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Metric</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Count</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Percentage</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Total Projects Row */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <span className="font-medium text-gray-900">Total Projects</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-2xl font-bold text-gray-900">{totalProjects}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-lg font-semibold text-blue-600">100%</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </td>
            </tr>

            {/* Total Ideas Row */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span className="font-medium text-gray-900">Total Ideas</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-2xl font-bold text-gray-900">{totalIdeas}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-lg font-semibold text-purple-600">100%</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </td>
            </tr>

            {/* Completed Row */}
            <tr className="hover:bg-green-50 transition-colors bg-green-50/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <span className="font-medium text-gray-900">Completed</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-2xl font-bold text-green-600">{completedIdeas}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-lg font-semibold text-green-600">
                  {totalIdeas > 0 ? Math.round((completedIdeas / totalIdeas) * 100) : 0}%
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${totalIdeas > 0 ? (completedIdeas / totalIdeas) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>

            {/* In Progress Row */}
            <tr className="hover:bg-blue-50 transition-colors bg-blue-50/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  <span className="font-medium text-gray-900">In Progress</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-2xl font-bold text-blue-600">{inProgressIdeas}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-lg font-semibold text-blue-600">
                  {totalIdeas > 0 ? Math.round((inProgressIdeas / totalIdeas) * 100) : 0}%
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${totalIdeas > 0 ? (inProgressIdeas / totalIdeas) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>

            {/* Testing Row */}
            <tr className="hover:bg-purple-50 transition-colors bg-purple-50/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧪</span>
                  <span className="font-medium text-gray-900">Testing</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-2xl font-bold text-purple-600">{testingIdeas}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-lg font-semibold text-purple-600">
                  {totalIdeas > 0 ? Math.round((testingIdeas / totalIdeas) * 100) : 0}%
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-purple-500 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${totalIdeas > 0 ? (testingIdeas / totalIdeas) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>

            {/* Pending Row */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⬜</span>
                  <span className="font-medium text-gray-900">Pending</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-2xl font-bold text-gray-600">{notStartedIdeas}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-lg font-semibold text-gray-600">
                  {totalIdeas > 0 ? Math.round((notStartedIdeas / totalIdeas) * 100) : 0}%
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gray-400 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${totalIdeas > 0 ? (notStartedIdeas / totalIdeas) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Project Breakdown Table */}
        <div className="border-t-4 border-gray-300 mt-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-800">📋 Project Breakdown</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Project Name</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Total</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Done</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Active</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Testing</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Pending</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => {
                const ideas = project.ideas || [];
                const total = ideas.length;
                const completed = ideas.filter(i => i.status?.includes('✅')).length;
                const inProgress = ideas.filter(i => i.status?.includes('🔄')).length;
                const testing = ideas.filter(i => i.status?.includes('🧪')).length;
                const pending = ideas.filter(i => i.status?.includes('⬜')).length;
                const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

                return (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{project.name}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-gray-700">{total}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                        {completed}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                        {inProgress}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-sm">
                        {testing}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold text-sm">
                        {pending}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${progress}%`,
                              backgroundColor: progress >= 75 ? '#10b981' : progress >= 50 ? '#eab308' : progress >= 25 ? '#f59e0b' : '#ef4444'
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700 w-12">{progress}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
