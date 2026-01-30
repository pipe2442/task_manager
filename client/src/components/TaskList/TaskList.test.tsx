import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskList from ".";

vi.mock("../../hooks/useTaskList", () => ({
  default: () => ({
    tasks: [],
    isLoading: false,
    errorMessage: "",
    handleCreate: vi.fn(),
  }),
}));

vi.mock("../TaskForm", () => ({
  default: () => <div>TaskForm</div>,
}));

vi.mock("../TaskCard", () => ({
  default: () => <div>TaskCard</div>,
}));

describe("TaskList", () => {
  it("shows empty list", () => {
    render(<TaskList />);
    expect(screen.getByText("No tasks available.")).toBeInTheDocument();
  });
});
