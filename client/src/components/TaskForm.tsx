import React, { useState } from "react";
import { useForm } from "react-hook-form";

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
};

type Props = {
  onCreate?: (task: Task) => void;
};

type FormValues = {
  title: string;
  description: string;
};

const TaskForm: React.FC<Props> = ({ onCreate }) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (data: FormValues) => {
    const title = data.title.trim();
    const description = data.description.trim();
    if (!title || !description) return;

    setSubmitError(null);
    try {
      const payload = { task: { title, description } };
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.errors?.join?.(", ") || `HTTP ${res.status}`);
      }
      const created: Task = await res.json();
      reset();
      onCreate?.(created);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to create task");
    }
  };

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
