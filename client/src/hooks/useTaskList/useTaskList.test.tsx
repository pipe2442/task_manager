import React, { useEffect } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useTaskList from ".";
import type { Task } from "../../types";
import type { UseQueryResult } from "@tanstack/react-query";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
  useQueryClient: vi.fn(),
}));

type HookSnapshot = {
  tasksLength: number;
  isLoading: boolean;
  errorMessage: string | null;
  handleCreate: (task: Task) => void;
};

type ConsumerProps = {
  onSnapshot: (snapshot: HookSnapshot) => void;
};

const HookConsumer: React.FC<ConsumerProps> = ({ onSnapshot }) => {
  const { tasks, isLoading, errorMessage, handleCreate } = useTaskList();

  useEffect(() => {
    onSnapshot({
      tasksLength: tasks.length,
      isLoading,
      errorMessage,
      handleCreate,
    });
  }, [tasks, isLoading, errorMessage, handleCreate, onSnapshot]);

  return null;
};

describe("useTaskList", () => {
  it("returns tasks and loading state", () => {
    const setQueryData = vi.fn();

    vi.mocked(useQueryClient).mockReturnValue({
      setQueryData,
    } as unknown as ReturnType<typeof useQueryClient>);

    vi.mocked(useQuery).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Task[], Error>);

    const onSnapshot = vi.fn();
    render(<HookConsumer onSnapshot={onSnapshot} />);

    const lastSnapshot = onSnapshot.mock.calls[onSnapshot.mock.calls.length - 1][0] as HookSnapshot;
    expect(lastSnapshot.tasksLength).toBe(0);
    expect(lastSnapshot.isLoading).toBe(false);
    expect(lastSnapshot.errorMessage).toBe(null);

    lastSnapshot.handleCreate({
      id: 1,
      title: "Sample",
      description: "Test",
      completed: false,
    });

    expect(setQueryData).toHaveBeenCalled();
  });
});
