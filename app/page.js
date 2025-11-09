'use client'

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import IdeaTable from "./components/IdeaTable";
import ProgressDashboard from "./components/ProgressDashboard";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch all projects with their nested ideas
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🎯 WhatNow Dashboard</h1>

      <div className="max-w-6xl mx-auto space-y-10 px-4">
        {projects.length === 0 ? (
          <p className="text-center text-gray-500">
            No projects found. Run the sync script to import data.
          </p>
        ) : (
          <>
            {/* Progress Dashboard */}
            <ProgressDashboard projects={projects} />

            {/* Projects List */}
            <div className="space-y-10">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
                >
                  {/* Project Header */}
                  <h2 className="text-2xl font-semibold mb-1">{project.name}</h2>
                  <p className="text-gray-600 mb-2">{project.description}</p>

                  {/* Project Metadata */}
                  <div className="text-sm mb-4">
                    <strong>Status:</strong> 
                    <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {project.status ?? "—"}
                    </span>
                  </div>

                  {/* Ideas Table */}
                  {project.ideas && project.ideas.length > 0 ? (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-3">Ideas</h3>
                      <IdeaTable ideas={project.ideas} />
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic mt-4">
                      No ideas added yet.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
