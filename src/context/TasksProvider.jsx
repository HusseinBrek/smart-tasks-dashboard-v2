import { useEffect, useState } from "react";
import { TasksContext } from "./TasksContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as apiDeleteTask,
} from "../api/tasksService";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTasks();
        setTasks(data.reverse());
      } catch (err) {
        console.error("Fetch Tasks Error:", err);
        setError(
          "Failed to fetch tasks from the server. Please check the API connection."
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const addNewTask = async (taskData) => {
    try {
      const data = await createTask(taskData);
      setTasks((prev) => [data, ...prev]);
      return true;
    } catch (err) {
      console.error("Create Task Error:", err);
      setError("Failed to add new task.");
      return false;
    }
  };

  const editTask = async (taskId, updatedData) => {
    try {
      const data = await updateTask(taskId, updatedData);
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? data : task))
      );
      return true;
    } catch (err) {
      console.error("Update Task Error:", err);
      setError("Failed to update task.");
      return false;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await apiDeleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      return true;
    } catch (err) {
      console.error("Delete Task Error:", err);
      setError("Failed to delete task.");
      return false;
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    return await editTask(taskId, { completed: !currentStatus });
  };
  const contextValue = {
    tasks,
    addNewTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    isLoading,
    error,
  };
  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};
