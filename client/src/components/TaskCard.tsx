import React from "react";

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const badgeClass = task.completed
    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
    : "bg-amber-100 text-amber-700 border-amber-200";

  const badgeText = task.completed ? "Done" : "Pending";

  return (
    <li
      className="bg-white/95 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-150"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">{task.title}</h2>
        <span className={`text-xs px-2.5 py-1 rounded-full border ${badgeClass}`}>{badgeText}</span>
      </div>
      <p className="mt-2 text-sm text-gray-700">{task.description}</p>
    </li>
  );
};

export default TaskCard;
