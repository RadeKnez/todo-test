import dayjs from "dayjs";
import { create } from "zustand";
import { Task } from "../models";

type TaskStore = {
  tasks: Task[];
  create: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    {
      id: crypto.randomUUID(),
      createdAt: dayjs().toISOString(),
      completed: false,
      title: "Task 1",
      description: "Test description",
    },
    {
      id: crypto.randomUUID(),
      createdAt: dayjs().toISOString(),
      completed: true,
      title: "Task 2",
    },
    {
      id: crypto.randomUUID(),
      createdAt: dayjs().toISOString(),
      completed: false,
      title: "Task 3",
    },
  ],
  create: () => {
    const newTask = {
      id: crypto.randomUUID(),
      createdAt: dayjs().toISOString(),
      completed: false,
    };

    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
}));
