import { useEffect, useRef, useState, useId } from "react";
import "./to-do.css";
import black_stick from "../../assets/black-tick.svg";
import delete_icon from "../../assets/delete.svg";
import edit_icon from "../../assets/edit.svg";
import green_stick from "../../assets/green-tick.svg";

type Task = {
  id: string;
  content: string;
  state: boolean;
};
type EditState = {
  id: string;
  edit_value: string;
};

const Todo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [current_tasks, setCurentTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<number>(0);
  const [edit_task, setEditTask] = useState<EditState>({
    id: "",
    edit_value: "",
  });
  const input_task = useRef<HTMLInputElement | null>(null);

  const handleAddTask = () => {
    if (input_task.current && input_task.current.value.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Math.random().toString(36),
          content: input_task.current.value,
          state: false,
        },
      ]);
      input_task.current.value = "";
    }
    if (input_task.current) {
      input_task.current.focus();
    }
  };

  const handleDeleteTask = (id: string) => {
    if (tasks.length === 1) {
      localStorage.removeItem("tasks");
    }
    setTasks(tasks.filter((task_item, index_item) => task_item.id !== id));
  };

  const handleEditTask = (id: string) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task, i) => {
        if (task.id === id) {
          return { ...task, content: edit_task.edit_value };
        }
        return task;
      });
    });
    //reset edit state
    setEditTask({
      id: "",
      edit_value: "",
    });
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
    //store
    if (tasks?.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    //update current tasks on display after filtering
    if (filter === -1) {
      setCurentTasks(
        tasks.filter((task) => {
          return !task.state;
        })
      );
    } else if (filter === 1) {
      setCurentTasks(
        tasks.filter((task) => {
          return task.state;
        })
      );
    } else {
      setCurentTasks(tasks);
    }
  }, [tasks, filter]);

  useEffect(() => {
    //get data from local storage
    const storage = localStorage.getItem("tasks");
    if (storage?.length) {
      setTasks(JSON.parse(storage));
    }
    //focus input
    if (input_task.current) {
      input_task.current.focus();
    }
  }, []);

  useEffect(() => {
    //focus on edited element
    if (edit_task.id !== "") {
      const element = document.getElementById(`${edit_task.id}`);
      if (element) {
        element.focus();
      }
    }
  }, [edit_task]);

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
          {current_tasks &&
            current_tasks.map((task, index) => {
              return (
                <div key={index} className={`todo-list-wrapper`}>
                  <div className={`todo-item-container `}>
                    <div className="todo-item-toggle">
                      <img
                        src={task.state ? green_stick : black_stick}
                        onClick={() => {
                          handleChangestate(index);
                        }}
                        alt="tick"
                      />
                    </div>
                    <input
                      className={`todo-item-content ${
                        task.state ? "completed" : ""
                      }`}
                      disabled={task.id !== edit_task.id}
                      onChange={(e) => {
                        setEditTask({
                          ...edit_task,
                          edit_value: e.currentTarget.value,
                        });
                      }}
                      onBlur={() => {
                        setEditTask({
                          id: "",
                          edit_value: "",
                        });
                      }}
                      value={
                        task.id === edit_task.id
                          ? edit_task.edit_value
                          : task.content
                      }
                      id={`${task.id}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditTask(task.id);
                        }
                      }}
                    ></input>
                    <div className="todo-item-options">
                      <div className="icon-btn">
                        <img
                          src={edit_icon}
                          alt="edit"
                          onClick={(e) => {
                            setEditTask({ ...edit_task, id: task.id });
                          }}
                        />
                      </div>
                      <div className="icon-btn">
                        <img
                          src={delete_icon}
                          alt="close"
                          onClick={() => {
                            handleDeleteTask(task.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="todo-footer-container">
          <div className="todo-count">
            {`${current_tasks.length} items left`}
          </div>
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
