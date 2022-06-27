import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStateContext } from "../contexts/StateProvider";
import { BsPlusLg } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Tooltip } from "@mui/material";


const TodoInput = () => {
  const {
    value,
    setValue,
    colorTheme,
    setTodos,
    setFilteredTodos,
    randomColor,
    todos,
    setRandomColor,
  } = useStateContext();
  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue({ title: "", description: "" });
    toast.success(t("Todo_added"), {
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
  const addTodo = (v) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      title: v.title,
      description: v.description,
      isCompleted: false,
      createdDate: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
      editedDate: "",
      color: randomColor,
    };
    setTodos([...todos, newTodo]);
    setFilteredTodos([...todos, newTodo]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setRandomColor(randomColor);
  }, [todos]);

  const { t } = useTranslation();
  return (
    <div className=" h-auto w-full mt-5">
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center"
      >
        <input
          style={{
            caretColor: `${colorTheme}`,
            borderColor: `${colorTheme}`,
          }}
          className={` font-Vazir font-medium my-4 w-2/3 sm:w-96 py-1 px-3 rounded-md outline-none text-gray-500 border dark:bg-slate-700 dark:text-slate-200 focus:border-2 bg-gray-50 focus:bg-white`}
          type="text"
          value={value.title}
          name="title"
          onChange={changeHandler}
          placeholder={t("input_title")}
          required
        />
        <textarea
          style={{
            caretColor: `${colorTheme}`,
            borderColor: `${colorTheme}`,
          }}
          className={`font-Vazir font-medium resize-none my-4  w-2/3 sm:w-96 py-1 px-3 text-gray-500 border focus:border-2 dark:bg-slate-700 dark:text-slate-200 rounded-md outline-none bg-gray-50 focus:bg-white`}
          type="text"
          value={value.description}
          name="description"
          onChange={changeHandler}
          placeholder={t("input_description")}
          required
        />
        <Tooltip title={t('add_todo')} arrow placement="top" >
        <button
          item={{
            placement: "top",
            text: "Top",
          }}
          type="submit"
          style={{
            color: `${colorTheme}`,
            borderColor: `${colorTheme}`,
          }}
          className={`text-2xl hover:scale-110 transition-transform w-10 h-10 rounded-full border-2 flex flex-row justify-center items-center mb-4`}
        >
          <BsPlusLg />
        </button>
        </Tooltip>
      </form>
      <ToastContainer />
    </div>
  );
};

export default TodoInput;
