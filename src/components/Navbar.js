import React from "react";
import Toggle from "./ThemeToggle";
import LngChanges from "./LngChanges";
import ColorChanges from "./ColorChanges";

const Navbar = () => {
  return (
    <div className=" bg-gray-300 dark:bg-slate-700 h-auto p-2 flex flex-row justify-start items-center">
      <LngChanges />
      <ColorChanges/>
      <Toggle />
    </div>
  );
};

export default Navbar;
