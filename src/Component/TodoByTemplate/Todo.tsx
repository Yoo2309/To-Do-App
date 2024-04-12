import { useEffect, useRef, useState } from "react";
import "./to-do.css";
import black_stick from "../../assets/black-tick.svg";
import delete_icon from "../../assets/delete.svg";
import edit_icon from "../../assets/edit.svg";
import green_stick from "../../assets/green-tick.svg";

type Task = {
  content: string;
  state: boolean;
};

const Todo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<number>(0);
  const [edit_task, setEditTask] = useState<number>(-1);
  const [edit_value, setEditValue] = useState<string>("");
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
  const handleEditTask = (index: number) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task, i) => {
        if (i === index) {
          return { ...task, content: edit_value };
        }
        return task;
      });
    });
    setEditValue("");
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
    if (edit_task >= 0) {
      const element = document.getElementById(`edit_${edit_task}`);
      if (element) {
        element.focus();
      }
    }
  }, [edit_task]);

  useEffect(() => {
    const storage = localStorage.getItem("tasks");
    if (storage) {
      setTasks(JSON.parse(storage));
    }
  }, []);

  return (
    <div className="app-container">
      <div className="todo-container">
        <div className="todo-form-container">
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="What need to be done?"
              ref={input_task}
            />
          </form>
        </div>
        <div className="todo-list-container">
          {tasks ? (
            tasks.map((task, index) => {
              return (
                <div className="todo-list-wrapper">
                  <div
                    className={`todo-item-container ${
                      (filter === 1 && task.state === false) ||
                      (filter === -1 && task.state === true)
                        ? "todo-hidden-item"
                        : ""
                    }`}
                  >
                    <div className="todo-item-toggle">
                      <img
                        src={task.state ? green_stick : black_stick}
                        onClick={() => {
                          handleChangestate(index);
                        }}
                        alt="tick"
                      />
                    </div>
                    <div
                      className={`todo-item-content ${
                        task.state ? "completed" : ""
                      }`}
                    >
                      {task.content}
                    </div>
                    <div className="todo-item-options">
                      <div className="icon-btn">
                        <img
                          src={edit_icon}
                          alt="edit"
                          onClick={() => {
                            setEditTask(index);
                          }}
                        />
                      </div>
                      <div className="icon-btn">
                        <img
                          src={delete_icon}
                          alt="close"
                          onClick={() => {
                            handleDeleteTask(index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      edit_task === index ? "" : "todo-hidden-item"
                    }`}
                    style={{paddingTop: 10}}
                  >
                    <input
                      onChange={(e) => {
                        setEditValue(e.currentTarget.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditTask(index);
                        }
                      }}
                      onBlur={() => {
                        setEditTask(-1);
                      }}
                      value={edit_value}
                      id={`edit_${index}`}
                    ></input>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="todo-footer-container">
          <div className="todo-count">3 items left</div>
          <div className="todo-menus">
            <span
              className={`todo-menu-item ${filter === 0 ? "active" : ""}`}
              onClick={() => {
                setFilter(0);
              }}
            >
              All
            </span>
            <span
              className={`todo-menu-item ${filter === -1 ? "active" : ""}`}
              onClick={() => {
                setFilter(-1);
              }}
            >
              Active
            </span>
            <span
              className={`todo-menu-item ${filter === 1 ? "active" : ""}`}
              onClick={() => {
                setFilter(1);
              }}
            >
              Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Todo;
