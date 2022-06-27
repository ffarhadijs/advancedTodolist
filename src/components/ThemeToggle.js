import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../contexts/ThemeContext";
import { Tooltip } from "@mui/material";

const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
      <Tooltip title={t("theme_change")} arrow placement="top">
    <div className="transition duration-500 ease-in-out rounded-full p-2">
        {theme === "dark" ? (
          <FaSun
            onClick={() => setTheme("light")}
            className="text-gray-900 dark:text-gray-100 text-2xl cursor-pointer"
          />
          ) : (
            <FaMoon
            onClick={() => setTheme("dark")}
            className="text-gray-900 dark:text-gray-100 text-2xl cursor-pointer"
            />
            )}
    </div>
            </Tooltip>
  );
};

export default Toggle;
