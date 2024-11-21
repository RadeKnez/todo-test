import React from "react";
import { Task } from "../models";

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  return (
    <label
      htmlFor="Option1"
      className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
    >
      <div className="flex items-center">
        &#8203;
        <input
          type="checkbox"
          className="size-4 rounded border-gray-300"
          checked={task.completed}
          id="Option1"
        />
      </div>

      <div>
        <strong className="font-medium text-gray-900"> {task.title} </strong>

        <p className="mt-1 text-pretty text-sm text-gray-700">
          {task.description}
        </p>
      </div>
    </label>
  );
};
