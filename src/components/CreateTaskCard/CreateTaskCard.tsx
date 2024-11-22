import React, { useState } from "react";
import { useTaskStore } from "../../hooks/useTaskStore";

export const CreateTaskCard = () => {
  const [title, setTitle] = useState<string>("");

  const { create } = useTaskStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title !== "") {
      create(title);
      setTitle("");
    }
  };
  const handleClick = () => {
    if (title !== "") {
      create(title);
      setTitle("");
    }
  };

  return (
    <label className="flex shadow-md cursor-pointer justify-between items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50">
      <label className="relative w-full block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <input
          type="text"
          className="peer h-10 border-none pl-2 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
          value={title}
          placeholder=""
          maxLength={30}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          Today im going to...
        </span>
      </label>

      <button className="h-10" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </label>
  );
};
