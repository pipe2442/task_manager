import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskForm from ".";

vi.mock("../../hooks/useTaskForm", () => ({
  default: () => ({
    register: () => ({
      name: "field",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    }),
    handleSubmit: (fn: any) => fn,
    errors: {},
    isSubmitting: false,
    submitError: "",
    onSubmit: vi.fn(),
  }),
}));

describe("TaskForm", () => {
  it("renders the form", () => {
    render(<TaskForm onCreate={vi.fn()} />);

    expect(screen.getByText("Create a task")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});
