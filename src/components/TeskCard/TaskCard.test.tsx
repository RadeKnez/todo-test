import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaskCard } from "./TaskCard";
import { useTaskStore } from "../../hooks/useTaskStore";

jest.mock("../../hooks/useTaskStore", () => ({
  useTaskStore: jest.fn(),
}));

jest.mock("../EditableTextInput/EditableTextInput", () => ({
  EditableTextInput: ({ isEditing, setIsEditing, onSave, text }: any) => (
    <div data-testid="editable-text-input">
      {isEditing ? (
        <input
          data-testid="edit-input"
          value={text}
          onChange={(e) => onSave(e.target.value)}
        />
      ) : (
        <span data-testid="task-title">{text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>Toggle Edit</button>
    </div>
  ),
}));

describe("TaskCard Component", () => {
  const mockToggle = jest.fn();
  const mockRemove = jest.fn();
  const mockRename = jest.fn();

  const task = {
    id: "1",
    title: "Test Task",
    completed: false,
    createdAt: "2024-11-21T00:00:00Z",
  };

  beforeEach(() => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      toggle: mockToggle,
      remove: mockRemove,
      rename: mockRename,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the task title", () => {
    render(<TaskCard task={task} />);

    expect(screen.getByTestId("task-title")).toHaveTextContent("Test Task");
  });

  test("renders the checkbox with the correct initial state", () => {
    render(<TaskCard task={task} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("calls toggle function when checkbox is clicked", () => {
    render(<TaskCard task={task} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(task.id);
  });

  test("toggles edit mode when edit button is clicked", () => {
    render(<TaskCard task={task} />);

    const toggleEditButton = screen.getByText("Toggle Edit");
    fireEvent.click(toggleEditButton);

    expect(screen.getByTestId("edit-input")).toBeInTheDocument();
  });

  test("calls rename function when a new title is saved", () => {
    render(<TaskCard task={task} />);

    const toggleEditButton = screen.getByText("Toggle Edit");
    fireEvent.click(toggleEditButton);

    const editInput = screen.getByTestId("edit-input");
    fireEvent.change(editInput, { target: { value: "Updated Task" } });

    expect(mockRename).toHaveBeenCalledWith(task.id, "Updated Task");
  });

  test("calls remove function when delete button is clicked", () => {
    render(<TaskCard task={task} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockRemove).toHaveBeenCalledWith(task.id);
  });

  test("renders with completed task when checkbox is checked", () => {
    const completedTask = { ...task, completed: true };
    render(<TaskCard task={completedTask} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
});
