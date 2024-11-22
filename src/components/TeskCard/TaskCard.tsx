import React, { useState } from "react";
import { Task } from "../../models";
import { useTaskStore } from "../../hooks/useTaskStore";
import { EditableTextInput } from "../EditableTextInput/EditableTextInput";

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toggle, remove, rename } = useTaskStore();

  return (
    <label className="flex shadow-md cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50">
      <div className="flex items-center">
        &#8203;
        <input
          type="checkbox"
          className="size-4 rounded border-gray-300"
          checked={task.completed}
          onChange={() => toggle(task.id)}
        />
      </div>
      <div>
        <EditableTextInput
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSave={(value) => rename(task.id, value)}
          text={task.title || ""}
        />
      </div>
      <button
        className="ml-auto"
        aria-label="Delete"
        onClick={() => remove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke="red"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14"
          />
        </svg>
      </button>
    </label>
  );
};
