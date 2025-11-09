import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import IdeaTable from "../components/IdeaTable";
import ProgressDashboard from "../components/ProgressDashboard";

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

        return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        🌟 What Now Agent Dashboard 🌟
      </h1>
      
      <ProgressDashboard projects={projects} />
      
      <div className="space-y-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg p-6 bg-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-1">
              <strong>Status:</strong> {project.status}
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">Ideas</h3>
            <IdeaTable ideas={project.ideas} />
          </div>
        ))}
      </div>
    </div>
  );
    </div>
  );
}
