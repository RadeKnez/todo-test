import { Task } from "../models";

const STORAGE_KEY = "taskStorage";

export const getStoredTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);

  return !!storedTasks ? JSON.parse(storedTasks).tasks : [];
};

export const storeTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks }));
};
