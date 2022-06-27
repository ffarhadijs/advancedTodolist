import React, { createContext, useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const StateContext = createContext();

const StateProvider = (props) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [value, setValue] = useState({ title: "", description: "" });
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState({
    id: null,
    title: "",
    description: "",
  });
  const [filter, setFilter] = useState({
    search: "",
    sort: "",
  });
  const [filteredTodos, setFilteredTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [randomColor, setRandomColor] = useState("#ffffff");
  const [colorTheme, setColorTheme] = useState(() => {
    const currentColor = localStorage.getItem("colorTheme");
    if (currentColor) {
      return `${JSON.parse(currentColor)}`;
    } else {
      return "red";
    }
  });

  return (
    <StateContext.Provider
      value={{
        value,
        setValue,
        todos,
        setTodos,
        open,
        setOpen,
        editValue,
        filteredTodos,
        setRandomColor,
        filter,
        setColorTheme,
        randomColor,
        setFilteredTodos,
        colorTheme,
        setEditValue,
        setFilter,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateProvider;

export const useStateContext = () => useContext(StateContext);
