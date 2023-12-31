import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useTask } from "../context/TaskContext";

function TasksPage() {
  const { tasks, loadTasks } = useTask();

  useEffect(() => {
    loadTasks();
  }, []);

  function renderTaskMain() {
    if (tasks.length == 0) {
      return <h1>No Task yet</h1>;
    }

    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  }

  return (
    <>
      <h1 className="text-5xl text-white font-bold text-center">Tasks</h1>
      <div className="grid grid-cols-3 gap-2">{renderTaskMain()}</div>
    </>
  );
}

export default TasksPage;
