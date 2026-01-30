import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TaskCard from ".";
import type { Task } from "../../types";

describe("TaskCard", () => {
  it("renders title, description, and Pending status", () => {
    const task: Task = {
      id: 1,
      title: "Pay rent",
      description: "Before the 5th",
      completed: false,
    };

    render(<TaskCard task={task} />);

    expect(screen.getByText("Pay rent")).toBeInTheDocument();
    expect(screen.getByText("Before the 5th")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("shows Done status when completed is true", () => {
    const task: Task = {
      id: 2,
      title: "Send report",
      description: "Q1",
      completed: true,
    };

    render(<TaskCard task={task} />);

    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});
