import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import IdeaTable from "../components/IdeaTable";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch all projects and their ideas
      const { data: projectsData, error } = await supabase
        .from("projects")
        .select(`
          id,
          name,
          description,
          sprint,
          days_left,
          status,
          ideas (
            id,
            idea_id,
            idea,
            status,
            emotion,
            difficulty,
            last_update
          )
        `)
        .order("id");

      if (!error) setProjects(projectsData);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center py-10">Loading data...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🎯 WhatNow Dashboard</h1>

      <div className="max-w-5xl mx-auto space-y-10">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-1">{p.name}</h2>
            <p className="text-gray-600 mb-2">{p.description}</p>

            <div className="text-sm mb-4">
              <strong>Status:</strong> {p.status} &nbsp;•&nbsp;
              <strong>Days Left:</strong> {p.days_left ?? "—"} &nbsp;•&nbsp;
              <strong>Sprint:</strong> {p.sprint ?? "—"}
            </div>

            {p.ideas && p.ideas.length > 0 ? (
              <IdeaTable ideas={p.ideas} />
            ) : (
              <p className="text-gray-500 text-sm italic">No ideas added yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
