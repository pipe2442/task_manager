import React, { useEffect } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useMutation } from "@tanstack/react-query";
import useTaskForm from ".";
import type { Task } from "../../types";

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
}));

type HookSnapshot = {
  isSubmitting: boolean;
  submitError: string | null;
  hasOnSubmit: boolean;
};

type ConsumerProps = {
  onSnapshot: (snapshot: HookSnapshot) => void;
};

const HookConsumer: React.FC<ConsumerProps> = ({ onSnapshot }) => {
  const { isSubmitting, submitError, onSubmit } = useTaskForm();

  useEffect(() => {
    onSnapshot({
      isSubmitting,
      submitError,
      hasOnSubmit: typeof onSubmit === "function",
    });
  }, [isSubmitting, submitError, onSnapshot, onSubmit]);

  return null;
};

describe("useTaskForm", () => {
  it("returns basic state and handlers", () => {
    const mutateAsync = vi.fn().mockResolvedValue({} as Task);

    vi.mocked(useMutation).mockReturnValue({
      isPending: false,
      mutateAsync,
    } as unknown as ReturnType<typeof useMutation>);

    const onSnapshot = vi.fn();
    render(<HookConsumer onSnapshot={onSnapshot} />);

    expect(onSnapshot).toHaveBeenCalledWith({
      isSubmitting: false,
      submitError: null,
      hasOnSubmit: true,
    });
  });
});
