import React, { useEffect, useState } from "react";

type EditableTextInputProps = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  text: string;
  onSave?: (value: string) => void;
};

export const EditableTextInput = ({
  isEditing,
  setIsEditing,
  text,
  onSave,
}: EditableTextInputProps) => {
  const [inputValue, setInputValue] = useState(text);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);

      if (onSave) onSave(inputValue);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " || event.code === "Space") {
      event.preventDefault();
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {isEditing ? (
        <input
          type="text"
          className=" rounded-lg border-none pl-2 bg-transparent placeholder-transparent focus:ring-0"
          value={inputValue}
          maxLength={30}
          onChange={handleChange}
          onFocus={(event) => event.target.select()}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onClick={(e) => {
            e.stopPropagation();
          }}
          autoComplete="off"
          autoFocus
        />
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          <strong className="font-medium text-gray-900"> {inputValue} </strong>
        </button>
      )}
    </div>
  );
};
