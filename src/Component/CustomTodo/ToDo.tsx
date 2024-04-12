import { useEffect, useRef, useState } from "react";
import css from "./to-do.module.scss";

type Task = {
  content: string;
  state: boolean;
};

const ToDoCustom = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const input_task = useRef<HTMLInputElement | null>(null);

  const handleAddTask = () => {
    if (input_task.current && input_task.current.value.trim() !== "") {
      setTasks([...tasks, { content: input_task.current.value, state: false }]);
      input_task.current.value = "";
    }
  };
  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((task_item, index_item) => index_item !== index));
  };
  const handleChangestate = (index: number) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task, i) => {
        if (i === index) {
          return { ...task, state: !task.state };
        }
        return task;
      });
    });
  };

  useEffect(() => {
    console.log(tasks);
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const storage = localStorage.getItem("tasks");
    if (storage) {
      setTasks(JSON.parse(storage));
    }
  }, []);

  return (
    <div className={css["todo-container"]}>
      <h1>TO DO APP</h1>
      <div className={css["todo-wrapper"]}>
        <div className={css["todo-header"]}>
          <input
            ref={input_task}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          ></input>
          <button
            onClick={() => {
              handleAddTask();
            }}
          >
            Create
          </button>
        </div>
        <div className={css["todo-body"]}>
          {tasks ? (
            tasks.map((task, index) => {
              return (
                <div className={css["todo-item"]} key={index}>
                  <div style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      checked={task.state}
                      onChange={() => {
                        handleChangestate(index);
                      }}
                    ></input>
                    <div>{task.content ?? ""}</div>
                  </div>
                  <img
                    width="36"
                    height="36"
                    src="https://img.icons8.com/pulsar-gradient/48/delete-forever.png"
                    alt="delete-forever"
                    onClick={() => {
                      handleDeleteTask(index);
                    }}
                  ></img>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoCustom;
