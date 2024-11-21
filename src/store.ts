import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { create } from "zustand";

type Task = {
  id: string;
  title?: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};

type TaskStore = {
  tasks: Task[];
  create: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  create: () => {
    const newTask = {
      id: randomUUID(),
      createdAt: dayjs().toISOString(),
      completed: false,
    };

    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
}));
