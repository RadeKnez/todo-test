import dayjs from "dayjs";
import { create } from "zustand";
import { Task } from "../models";

type TaskStore = {
  tasks: Task[];
  create: (title: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
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
  create: (title) => {
    const newTask = {
      id: crypto.randomUUID(),
      createdAt: dayjs().toISOString(),
      completed: false,
      title: title,
    };

    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  remove: (id: string) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  toggle: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
}));
