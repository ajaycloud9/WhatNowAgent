import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import IdeaTable from "./IdeaTable";

export default function ProjectCard({ project }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIdeas() {
      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .eq("project_id", project.id)
        .order("idea_id", { ascending: true });
      if (!error && data) setIdeas(data);
      setLoading(false);
    }
    fetchIdeas();
  }, [project.id]);

  const total = ideas.length;
  const completed = ideas.filter((i) => i.status.includes("✅")).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold">{project.name}</h2>
      <p className="text-gray-600 mb-2">{project.description}</p>
      <p className="text-sm mb-4">
        <strong>Status:</strong> {project.status} •{" "}
        <strong>Days Left:</strong> {project.days_left || "—"}
      </p>

      <div className="h-3 bg-gray-200 rounded-full mb-4">
        <div
          className="h-3 bg-green-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mb-3">Progress: {progress}%</p>

      {loading ? (
        <p>Loading ideas...</p>
      ) : (
        <IdeaTable ideas={ideas} />
      )}
    </div>
  );
}
