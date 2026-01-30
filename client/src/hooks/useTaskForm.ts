import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { CreateTaskInput, Task, TaskFormValues, UseTaskFormOptions } from "../types";

const createTask = async (input: CreateTaskInput) => {
  const payload = {
    task: { title: input.title, description: input.description },
  };
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
  return created;
};

const useTaskForm = ({ onCreate }: UseTaskFormOptions = {}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    defaultValues: { title: "", description: "" },
    mode: "onSubmit",
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (created) => {
      reset();
      onCreate?.(created);
    },
    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "Failed to create task";
      setSubmitError(message);
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    const title = data.title.trim();
    const description = data.description.trim();
    if (!title || !description) return;

    setSubmitError(null);
    try {
      await mutation.mutateAsync({ title, description });
    } catch {
      console.error("Unexpected error during task creation");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: isSubmitting || mutation.isPending,
    submitError,
    onSubmit,
  };
};

export default useTaskForm;
