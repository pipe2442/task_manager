import React from "react";
import useTaskForm from "../../hooks/useTaskForm";
import type { TaskFormProps } from "../../types";

const TaskForm: React.FC<TaskFormProps> = ({ onCreate }) => {
  const { register, handleSubmit, errors, isSubmitting, submitError, onSubmit } = useTaskForm({
    onCreate,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto mb-6">
      <div className="bg-white/95 border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Create a task</h2>
            <p className="text-sm text-gray-600">Add a title and a short description.</p>
          </div>
          <button
            type="submit"
            className="shrink-0 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Task"}
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-800">Title</label>
            <input
              {...register("title", {
                required: "Title is required.",
                minLength: { value: 2, message: "Title is too short." },
              })}
              placeholder="e.g. Pay rent"
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={isSubmitting}
            />
            {errors.title && (
              <div className="mt-1 text-sm text-red-600">{errors.title.message}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required.",
                minLength: { value: 3, message: "Description is too short." },
              })}
              placeholder="What needs to be done?"
              rows={3}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={isSubmitting}
            />
            {errors.description && (
              <div className="mt-1 text-sm text-red-600">{errors.description.message}</div>
            )}
          </div>

          {submitError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {submitError}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
