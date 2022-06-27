import Cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Filter from "./components/Filter";
import EditTodo from "./components/EditTodo";
import Navbar from "./components/Navbar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";


const languages = [
  { code: "en", name: "english" },
  { code: "pr", name: "persian", dir: "rtl" },
];

function App() {

  const currentLanguageCode = Cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);

  return (
    <div className="bg-white dark:bg-slate-900 transition-all mx-auto text-center min-h-screen">
      <Navbar />
      <TodoInput />
      <Filter />
      <TodoList />
      <EditTodo />
    </div>
  );
}

export default App;
