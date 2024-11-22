import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CreateTaskCard } from "./CreateTaskCard";
import { useTaskStore } from "../../hooks/useTaskStore";

jest.mock("../../hooks/useTaskStore", () => ({
  useTaskStore: jest.fn(),
}));

describe("CreateTaskCard Component", () => {
  const mockCreate = jest.fn();

  beforeEach(() => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      create: mockCreate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the input field and placeholder", () => {
    render(<CreateTaskCard />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const placeholder = screen.getByText("Today im going to...");
    expect(placeholder).toBeInTheDocument();
  });

  test("updates the input value when typing", () => {
    render(<CreateTaskCard />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(input).toHaveValue("New Task");
  });

  test("calls create function with input value when Enter key is pressed", () => {
    render(<CreateTaskCard />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockCreate).toHaveBeenCalledWith("New Task");
    expect(input).toHaveValue(""); // Input should be cleared after creating
  });

  test("does not call create if Enter key is pressed with an empty input", () => {
    render(<CreateTaskCard />);

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockCreate).not.toHaveBeenCalled();
  });

  test("calls create function with input value when the create button is clicked", () => {
    render(<CreateTaskCard />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Task" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockCreate).toHaveBeenCalledWith("New Task");
    expect(input).toHaveValue(""); // Input should be cleared after creating
  });

  test("does not call create when the create button is clicked with an empty input", () => {
    render(<CreateTaskCard />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockCreate).not.toHaveBeenCalled();
  });
});
