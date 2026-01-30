import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types";

const fetchTasks = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data: Task[] = await res.json();
  return data;
};

const useTaskList = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const errorMessage = useMemo(() => {
    if (!query.error) return null;
    return query.error instanceof Error ? query.error.message : "Failed to fetch tasks";
  }, [query.error]);

  const handleCreate = (task: Task) => {
    queryClient.setQueryData<Task[]>(["tasks"], (prev) => (prev ? [task, ...prev] : [task]));
  };

  return {
    tasks: query.data ?? [],
    isLoading: query.isLoading,
    errorMessage,
    handleCreate,
  };
};

export default useTaskList;
