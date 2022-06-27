import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import { useStateContext } from "../contexts/StateProvider";

const Filter = () => {
  const { searchValue, colorTheme,filter ,setFilter,todos,setFilteredTodos} =
    useStateContext();
  const { t } = useTranslation();

  const searchChangeHandler = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const sortChangeHandler = (e) => {
    setFilter({ ...filter, sort: e.target.value });
  };

  useEffect(() => {
    const excludeKeys = [
      "id",
      "isCompleted",
      "createdDate",
      "editedDate",
      "color",
    ];
    const searchedTodo = todos.filter((todo) =>
      Object.keys(todo).some((key) =>
        excludeKeys.includes(key)
          ? false
          : todo[key]
              .toString()
              .toLowerCase()
              .includes(filter.search.toLowerCase())
      )
    );

    if (filter.sort === "ascDate") {
      searchedTodo.sort((a, b) => {
        if (a.createdDate < b.createdDate) return -1;
        if (a.createdDate > b.createdDate) return 1;
        return 0;
      });
    }
    if (filter.sort === "descDate") {
      searchedTodo.sort((a, b) => {
        if (a.createdDate > b.createdDate) return -1;
        if (a.createdDate < b.createdDate) return 1;
        return 0;
      });
    }

    if (filter.sort === "ascTitle") {
      searchedTodo.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    }
    if (filter.sort === "descTitle") {
      searchedTodo.sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });
    }

    setFilteredTodos(searchedTodo);
  }, [filter,todos]);


  return (
    <div className="">
      <input
        style={{
          caretColor: `${colorTheme}`,
          borderColor: `${colorTheme}`,
        }}
        onChange={searchChangeHandler}
        value={searchValue}
        type="text"
        placeholder={t("input_search")}
        className={` font-Vazir font-medium sm:m-2 mx-auto sm:inline-block block w-2/3 sm:w-60 py-1 px-3 text-gray-500 border focus:border-2 dark:bg-slate-700 dark:text-slate-200 rounded-md outline-none bg-gray-50 focus:bg-white`}
      />

      <select
        style={{
          borderColor: `${colorTheme}`,
        }}
        onChange={sortChangeHandler}
        className={`font-Vazir font-medium m-3 w-26 py-1 px-2 border focus:border-2 dark:bg-slate-700 dark:text-slate-200 rounded-md outline-none bg-gray-50 focus:bg-white`}
      >
        <option>{t("sort")}</option>
        <option value="ascTitle" disabled>
          {t("title")}
        </option>
        <option value="ascTitle">{t("ascending")}</option>
        <option value="descTitle">{t("descending")}</option>
        <option value="descTitle" disabled>
          {t("date")}
        </option>
        <option value="ascDate">{t("ascending")}</option>
        <option value="descDate">{t("descending")}</option>
      </select>
    </div>
  );
};

export default Filter;
