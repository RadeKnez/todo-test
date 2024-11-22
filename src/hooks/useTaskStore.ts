import dayjs from "dayjs";
import { create } from "zustand";
import { Task } from "../models";
import { getStoredTasks, storeTasks } from "../utils";

type TaskStore = {
  tasks: Task[];
  create: (title: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  rename: (id: string, name: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: getStoredTasks(),
  create: (title) => {
    const newTask = {
      id: crypto.randomUUID(),
      createdAt: dayjs().toISOString(),
      completed: false,
      title: title === "" ? "Untitled task" : title,
    };

    set((state) => {
      storeTasks([...state.tasks, newTask]);
      return { tasks: [...state.tasks, newTask] };
    });
  },
  remove: (id: string) =>
    set((state) => {
      storeTasks(state.tasks.filter((task) => task.id !== id));
      return { tasks: state.tasks.filter((task) => task.id !== id) };
    }),
  toggle: (id: string) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      storeTasks(updatedTasks);
      return {
        tasks: updatedTasks,
      };
    }),
  rename: (id: string, title: string) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, title } : task
      );
      storeTasks(updatedTasks);
      return {
        tasks: updatedTasks,
      };
    }),
}));
