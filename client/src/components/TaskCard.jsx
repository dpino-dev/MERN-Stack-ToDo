import React from "react";
import { useTask } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTask();
  const navigate = useNavigate();
  //const { loadTasks } = useTask(); Una solucin para eliminar una tarea de la vista sin tener que refrescar la pagina

  // const handleOnclick = async (id) => {
  //   try {
  //     const resp = await deleteTaskRequest(id);
  //     loadTasks(); Una solucin para eliminar una tarea de la vista sin tener que refrescar la pagina

  //     console.log(resp);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const toogleTask = async (id) => {
    try {
      await toggleTaskDone(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-700 text-white rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>
        <span>{task.done == 1 ? "✔️" : "❌"}</span>
      </header>
      <p className="text-xs">{task.description}</p>
      <span>{task.createdAt}</span>
      <br />
      <div className="flex gap-x-2">
        <button className="bg-slate-300 px-2 py-1 text-black" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
        <button className="bg-slate-300 px-2 py-1 text-black" onClick={() => deleteTask(task.id)}>Delete</button>
        <button className="bg-slate-300 px-2 py-1 text-black" onClick={() => toogleTask(task.id)}>Toggle Task</button>
      </div>
    </div>
  );
}

export default TaskCard;
