import React from "react";
import { useTranslation } from "react-i18next";
import { useStateContext } from "../contexts/StateProvider";
import { FiTrash2 } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Tooltip } from "@mui/material";

const TodoList = () => {
  const {
    todos,
    setTodos,
    colorTheme,
    setFilteredTodos,
    setOpen,
    filteredTodos,
    setEditValue,
  } = useStateContext();

  const { t } = useTranslation();

  const removeHandler = (todo) => {
    const removedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(removedTodos);
    setFilteredTodos(removedTodos);
    toast.error(t("Todo_removed"), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: true,
      rtl: true,
    });
  };

  const completeHandler = (t) => {
    const selectedTodo = todos.findIndex((todo) => todo.id === t.id);
    const todo = { ...todos[selectedTodo] };
    todo.isCompleted = !todo.isCompleted;
    const updatedTodos = [...todos];
    updatedTodos[selectedTodo] = todo;
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  const editHandler = (todo) => {
    setOpen(true);
    setEditValue({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      editedDate: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
    });
  };

  const clearAll = () => {
    setFilteredTodos([]);
    setTodos([]);
  };

  const allTodos = filteredTodos.filter(
    (todo) => todo.isCompleted === true || todo.isCompleted === false
  );

  const completedTodos = filteredTodos.filter(
    (todo) => todo.isCompleted === true
  );

  const uncompletedTodos = filteredTodos.filter(
    (todo) => todo.isCompleted === false
  );

  const list = [
    { todos: uncompletedTodos, translate: "uncompleted", id: 33 },
    { todos: completedTodos, translate: "completed", id: 22 },
    { todos: allTodos, translate: "all", id: 11 },
  ];

  const btns = [
    { handler: removeHandler, icon: FiTrash2, tooltip: "delete", id: 1 },
    { handler: completeHandler, icon: IoMdDoneAll, tooltip: "complete", id: 2 },
    { handler: editHandler, icon: FaPencilAlt, tooltip: "edit", id: 3 },
  ];

  return (
    <div className=" flex flex-col justify-center items-center mt-5">
      {list.map((item) => (
        <div key={item.id}>
          <div className=" w-2/3 sm:w-96 h-auto">
            <div className="flex flex-row justify-between border-b-2 dark:border-slate-200 p-2">
              <span
                style={{ color: `${colorTheme}` }}
                className={`text-xl font-Vazir font-semibold`}
              >
                {t(item.translate)}
              </span>
              <span
                style={{ backgroundColor: `${colorTheme}` }}
                className={` rounded-full w-7 h-auto text-white `}
              >
                {item.todos.length}
              </span>
            </div>

            {item.todos.map((todo, index) => (
              <div
                key={index}
                className=" transition-shadow w-80 sm:w-96 h-auto border rounded-md dark:bg-slate-700 dark:text-slate-200 dark:border-slate-400 bg-white p-3 my-4 hover:shadow-lg hover:shadow-gray-300"
              >
                <div className="flex flex-row justify-start items-center border-b dark:border-b-slate-400">
                  <div
                    className=" w-2 h-6 "
                    style={{ backgroundColor: `#${todo.color}` }}
                  ></div>
                  <p className="text-start px-3 font-Vazir font-medium">
                    {todo.title}
                  </p>
                </div>
                <p className=" h-auto font-Vazir font-medium text-start p-3 border-b dark:border-b-slate-400">
                  {todo.description}
                </p>
                <div className="m-1 text-xs text-gray-400">
                  <div className="p-1 text-start">
                    <span className="font-medium font-Vazir">
                      {t("created_on")}:{" "}
                    </span>
                    <span>{todo.createdDate}</span>
                  </div>
                  {todo.editedDate && (
                    <div className="p-1 text-start">
                      <span className=" font-Vazir font-medium">
                        {t("Edited_On")}:{" "}
                      </span>
                      <span>{todo.editedDate}</span>
                    </div>
                  )}
                </div>
                <div className=" w-40 flex flex-row justify-between items-center mx-auto text-lg mt-3">
                  {btns.map((btn) => (
                    <Tooltip
                      title={t(`${btn.tooltip}`)}
                      arrow
                      placement="top"
                      key={btn.id}
                    >
                      <button
                        onClick={() => btn.handler(todo)}
                        style={{
                          color: `${colorTheme}`,
                          borderColor: `${colorTheme}`,
                        }}
                        className={`hover:scale-110 transition-transform w-8 h-8 rounded-full border flex flex-row justify-center items-center`}
                      >
                        <btn.icon />
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={() => clearAll()}
        style={{ color: `${colorTheme}`, borderColor: `${colorTheme}` }}
        className={` font-Vazir font-medium hover:scale-110 transition-transform w-20 h-auto rounded-full border flex flex-row justify-center items-center mx-auto my-3`}
      >
        {t("clear_all")}
      </button>
    </div>
  );
};

export default TodoList;
