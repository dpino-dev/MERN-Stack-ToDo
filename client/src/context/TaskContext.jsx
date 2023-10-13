import { createContext, useContext, useState } from "react";
import {
  deleteTaskRequest,
  getTaskRequest,
  createTaskRequest,
  getOneTaskRequest,
  updateTaskRequest,
  toogleTaskDoneRequest,
} from "../api/tasks.api";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used with a TaskContextProvider");
  }

  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    try {
      const resp = await getTaskRequest();
      setTasks(resp.data);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteTask = async (id) => {
    try {
      const resp = await deleteTaskRequest(id);
      setTasks(tasks.filter((task) => task.id !== id));
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      //setTasks(...tasks, response.data) una forma de reflejar la adicion de una nueva tarea el la vista principal
    } catch (error) {
      console.log(error);
    }
  };

  const getOneTask = async (id) => {
    try {
      const resp = await getOneTaskRequest(id);
      return resp.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, newTask) => {
    try {
      const resp = await updateTaskRequest(id, newTask);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find((task) => task.id === id);
      const resp = await toogleTaskDoneRequest(id, taskFound.done == 0?true:false);
      setTasks(tasks.map((task) => ((task.id === id)? {...task, done:!task.done} : task )))
      // tasks.map((task) => ((task.id === id)? (task.done = (task.done == 0) ? 1 : 0) : task ))
      // setTasks([...tasks])
      return resp.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        getOneTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
