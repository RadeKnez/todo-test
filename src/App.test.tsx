import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { useTaskStore } from "./hooks/useTaskStore";

jest.mock("./hooks/useTaskStore", () => {
  const actual = jest.requireActual("zustand");
  return {
    ...actual,
    useTaskStore: jest.fn(),
  };
});

jest.mock("./components", () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
  TaskCard: ({ task }: { task: { id: string; title: string } }) => (
    <div data-testid="task-card">{task.title}</div>
  ),
}));

jest.mock("./components/CreateTaskCard/CreateTaskCard", () => ({
  CreateTaskCard: () => <div data-testid="create-task-card">Create Task</div>,
}));

describe("App Component", () => {
  const mockTasks = [
    {
      id: "1",
      title: "Task 1",
      completed: false,
      createdAt: "2024-11-21T00:00:00Z",
    },
    {
      id: "2",
      title: "Task 2",
      completed: true,
      createdAt: "2024-11-20T00:00:00Z",
    },
  ];

  const mockUseTaskStore = (overrides = {}) => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: [],
      create: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn(),
      rename: jest.fn(),
      ...overrides,
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the layout and container components", () => {
    mockUseTaskStore();
    render(<App />);

    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });

  test("renders the CreateTaskCard component", () => {
    mockUseTaskStore();
    render(<App />);

    expect(screen.getByTestId("create-task-card")).toBeInTheDocument();
  });

  test("renders task cards based on the tasks from the store", () => {
    mockUseTaskStore({ tasks: mockTasks });
    render(<App />);

    const taskCards = screen.getAllByTestId("task-card");
    expect(taskCards).toHaveLength(mockTasks.length);
    expect(taskCards[0]).toHaveTextContent("Task 1");
    expect(taskCards[1]).toHaveTextContent("Task 2");
  });

  test("does not render task cards when there are no tasks", () => {
    mockUseTaskStore({ tasks: [] });
    render(<App />);

    expect(screen.queryByTestId("task-card")).not.toBeInTheDocument();
  });
});
