import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useTask } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";

function TaskForm() {
  const { createTask, getOneTask, updateTask } = useTask();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadOneTask = async () => {
      if (params.id) {
        const searchtask = await getOneTask(params.id);
        setTask({
          title: searchtask.title,
          description: searchtask.description,
        });
      }
    };
    loadOneTask();
  }, []);

  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          actions.resetForm();
          if (params.id) {
            await updateTask(params.id, values);
            navigate("/");
          } else {
            await createTask(values);
            navigate("/");
          }

          setTask({
            title: "",
            description: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md mx-auto mt-10"
          >
            <h1 className="text-xl font-bold text-center uppercase">
              {params.id ? "Edit Task" : "Create Task"}
            </h1>
            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              onChange={handleChange}
              value={values.title}
              className="px-2 py-1 rounded-sm w-full"
            ></input>

            <label className="block">Decription</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              onChange={handleChange}
              value={values.description}
              className="px-2 py-1 rounded-sm w-full"
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
