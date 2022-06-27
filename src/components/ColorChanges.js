import React from "react";
import { IoColorPaletteSharp } from "react-icons/io5";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useStateContext } from "../contexts/StateProvider";
import Cookies from "js-cookie";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

const ColorChanges = () => {
  const { colorTheme, setColorTheme } = useStateContext();
  const currentLng = Cookies.get("i18next");
  const currentColor = JSON.parse(localStorage.getItem("colorTheme"));
  const { t } = useTranslation();
  const changeColor = (color) => {
    localStorage.setItem("colorTheme", JSON.stringify(color));
    setColorTheme(color);
  };

  const colorList = [
    { colorCode: "#f97316" },
    { colorCode: "#0ea5e9" },
    { colorCode: "#d946ef" },
    { colorCode: "#22c55e" },
    { colorCode: "#6377ad" },
  ];

  return (
    <Menu as="div" className="relative mx-3">
      <div>
        <Tooltip title={t("color_change")} arrow placement="top">
          <Menu.Button
            style={{
              color: `${colorTheme}`,
            }}
            className="text-4xl hover:scale-110 transition-transform"
          >
            <IoColorPaletteSharp aria-hidden="true" />
          </Menu.Button>
        </Tooltip>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`origin-top-left absolute ${
            currentLng === "en" ? "left-0" : "right-0"
          } p-2 my-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="flex flex-row justify-between items-center">
            {colorList.map((item) => (
              <Menu.Item key={item.colorCode}>
                <button
                  className={`${
                    currentColor === item.colorCode && " scale-125"
                  } w-7 h-7 rounded-full mx-2`}
                  onClick={() => changeColor(item.colorCode)}
                  style={{ backgroundColor: `${item.colorCode}` }}
                ></button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ColorChanges;
