import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/tasks");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  const handleCreate = (task: Task) => setTasks((prev) => [task, ...prev]);

  if (loading)
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-sm text-gray-600">Loading tasks...</div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-sm text-red-600">Error: {error}</div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">Super Task Manager</h1>
      <TaskForm onCreate={handleCreate} />
      {tasks.length === 0 ? (
        <div className="text-sm text-gray-600">No tasks available.</div>
      ) : (
        <ul className="grid grid-cols-1 gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
