import React from "react";
import IR from "../assets/flags/iran.png";
import GB from "../assets/flags/england.png";
import Cookies from "js-cookie";
import { AiOutlineGlobal } from "react-icons/ai";
import { useStateContext } from "../contexts/StateProvider";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Tooltip } from "@mui/material";

const LngChanges = () => {
  const { colorTheme } = useStateContext();
  const { t } = useTranslation();
  const currentLng = Cookies.get("i18next");
  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
  };
  const lngList = [
    { lngCode: "en", country: GB, lng: t("english") },
    { lngCode: "pr", country: IR, lng: t("persian") },
  ];
  return (
    <Menu as="div" className="relative mx-3">
      <Tooltip title={t("lng_change")} arrow placement="top">
        <Menu.Button
          style={{
            color: `${colorTheme}`,
          }}
          className="text-4xl hover:scale-110 transition-transform"
        >
          <AiOutlineGlobal aria-hidden="true" />
        </Menu.Button>
      </Tooltip>
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
          } mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          {lngList.map((item) => (
            <Menu.Item key={item.lngCode}>
              <button
                onClick={() => changeLng(item.lngCode)}
                className={`font-Vazir font-medium hover:bg-gray-100 block py-2 text-sm w-full ${
                  currentLng === item.lngCode && "bg-gray-100"
                }`}
              >
                <div className="flex flex-row items-center">
                  <img src={item.country} alt="country flag" className="w-6 mx-3" />
                  {item.lng}
                </div>
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LngChanges;
