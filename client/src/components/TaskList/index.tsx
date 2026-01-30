import React from "react";
import TaskCard from "../TaskCard";
import TaskForm from "../TaskForm";
import useTaskList from "../../hooks/useTaskList";

const TaskList: React.FC = () => {
  const { tasks, isLoading, errorMessage, handleCreate } = useTaskList();

  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-sm text-gray-600">Loading tasks...</div>
      </div>
    );

  if (errorMessage)
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-sm text-red-600">Error: {errorMessage}</div>
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
