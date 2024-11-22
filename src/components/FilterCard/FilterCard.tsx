import React, { useState } from "react";

type FilterCardProps = {
  filterCompleted: boolean;
  setFilterCompleted: (value: boolean) => void;
};

export const FilterCard: React.FC<FilterCardProps> = ({
  filterCompleted,
  setFilterCompleted,
}) => {
  const toggleFilter = () => {
    setFilterCompleted(!filterCompleted);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <button
          onClick={toggleFilter}
          className={`px-4 py-2 rounded ${
            !filterCompleted
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-900"
          } transition-colors duration-200`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
