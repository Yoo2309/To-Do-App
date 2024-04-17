import { useEffect, useRef, useState } from "react";
import "../TodoByTemplate/to-do.css";
import { useDispatch, useSelector } from "react-redux";
import black_stick from "../../assets/black-tick.svg";
import delete_icon from "../../assets/delete.svg";
import edit_icon from "../../assets/edit.svg";
import green_stick from "../../assets/green-tick.svg";
import { FilterOption, EditState } from "../../types/Type";
import {
  add_tasks,
  edit_tasks,
  delete_tasks,
  change_state_tasks,
  filter_tasks,
} from "../../redux/slices";
import { RootState } from "../../redux/store";
const TodoReduxToolkit = () => {
  const dispatch = useDispatch();
  const current_tasks = useSelector(
    (state: RootState) => state.persistedReducer.current_tasks
  );
  const filter_opt = useSelector(
    (state: RootState) => state.persistedReducer.filter_opt
  );

  const [edited_task, setEditTask] = useState<EditState>({
    id: "",
    edit_value: "",
  });

  const input_task = useRef<HTMLInputElement | null>(null);

  const handleAddTask = () => {
    if (input_task.current && input_task.current.value.trim() !== "") {
      dispatch(
        add_tasks({
          id: Date.now().toString(),
          content: input_task.current.value.trim(),
          state: false,
        })
      );
      input_task.current.value = "";
    }
  };

  const handleDeleteTask = (id: string) => {
    dispatch(delete_tasks(id));
  };

  const handleEditTask = (id: string) => {
    dispatch(edit_tasks({ id: id, content: edited_task.edit_value }));
    setEditTask({
      id: "",
      edit_value: "",
    });
  };

  const handleChangestate = (id: string) => {
    dispatch(change_state_tasks(id));
  };

  useEffect(() => {
    //focus on edited element
    if (edited_task.id !== "") {
      const element = document.getElementById(`${edited_task.id}`);
      if (element) {
        element.focus();
      }
    }
  }, [edited_task]);

  return (
    <div className="app-container">
      <div className="todo-container">
        <div className="todo-form-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="What need to be done?"
              ref={input_task}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTask();
                }
              }}
            />
          </form>
        </div>
        <div className="todo-list-container">
          {current_tasks?.map((task) => {
            return (
              <div key={task.id} className={`todo-list-wrapper`}>
                <div className={`todo-item-container `}>
                  <div className="todo-item-toggle">
                    <img
                      src={task.state ? green_stick : black_stick}
                      onClick={() => {
                        handleChangestate(task.id);
                      }}
                      alt="tick"
                    />
                  </div>
                  <input
                    className={`todo-item-content ${
                      task.state ? "completed" : ""
                    }`}
                    disabled={task.id !== edited_task.id}
                    onChange={(e) => {
                      setEditTask({
                        ...edited_task,
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
                      task.id === edited_task.id
                        ? edited_task.edit_value
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
                          setEditTask({ ...edited_task, id: task.id });
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
            {`${current_tasks?.length} items left`}
          </div>
          <div className="todo-menus">
            <span
              className={`todo-menu-item ${
                filter_opt === FilterOption.All ? "active" : ""
              }`}
              onClick={() => {
                dispatch(filter_tasks(FilterOption.All));
              }}
            >
              All
            </span>
            <span
              className={`todo-menu-item ${
                filter_opt === FilterOption.Active ? "active" : ""
              }`}
              onClick={() => {
                dispatch(filter_tasks(FilterOption.Active));
              }}
            >
              Active
            </span>
            <span
              className={`todo-menu-item ${
                filter_opt === FilterOption.Completed ? "active" : ""
              }`}
              onClick={() => {
                dispatch(filter_tasks(FilterOption.Completed));
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
export default TodoReduxToolkit;
