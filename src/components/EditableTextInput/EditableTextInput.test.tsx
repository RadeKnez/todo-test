import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EditableTextInput } from "./EditableTextInput";

describe("EditableTextInput", () => {
  const mockSetIsEditing = jest.fn();
  const mockOnSave = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the button when not in editing mode", () => {
    render(
      <EditableTextInput
        isEditing={false}
        setIsEditing={mockSetIsEditing}
        text="Test text"
      />
    );

    expect(screen.getByText(/Test text/)).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  test("switches to input when button is clicked", () => {
    render(
      <EditableTextInput
        isEditing={false}
        setIsEditing={mockSetIsEditing}
        text="Test text"
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetIsEditing).toHaveBeenCalledWith(true);
  });

  test("renders the input when in editing mode", () => {
    render(
      <EditableTextInput
        isEditing={true}
        setIsEditing={mockSetIsEditing}
        text="Test text"
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Test text");
  });

  test("updates input value on change", () => {
    render(
      <EditableTextInput
        isEditing={true}
        setIsEditing={mockSetIsEditing}
        text="Test text"
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Updated text" } });

    expect(input).toHaveValue("Updated text");
  });

  test("saves input value and exits editing mode on Enter key press", () => {
    render(
      <EditableTextInput
        isEditing={true}
        setIsEditing={mockSetIsEditing}
        text="Test text"
        onSave={mockOnSave}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New text" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
    expect(mockOnSave).toHaveBeenCalledWith("New text");
  });

  test("does not call onSave if not provided", () => {
    render(
      <EditableTextInput
        isEditing={true}
        setIsEditing={mockSetIsEditing}
        text="Test text"
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
    expect(mockOnSave).not.toHaveBeenCalled();
  });
});
