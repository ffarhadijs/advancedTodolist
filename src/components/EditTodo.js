import React, { Fragment, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useStateContext } from "../contexts/StateProvider";
import { Dialog, Transition } from "@headlessui/react";

const EditTodo = () => {
  const {
    open,
    setOpen,
    editValue,
    colorTheme,
    setEditValue,
    setFilteredTodos,
    setTodos,
    todos
  } = useStateContext();

  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();
    const selectedTodo = todos.findIndex((t) => t.id === editValue.id);
    const todo = { ...todos[selectedTodo] };
    todo.title = editValue.title;
    todo.description = editValue.description;
    todo.editedDate = editValue.editedDate;
    const updatedTodos = [...todos];
    updatedTodos[selectedTodo] = todo;
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    setOpen(false);
    setEditValue({ id: null, title: "", description: "" });
  };

  const cancelButtonRef = useRef(null);
  const { t } = useTranslation();

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-700 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="  dark:backdrop-blur-sm flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className=" dark:bg-slate-900 relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 max-w-lg w-full">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="font-Vazir dark:text-slate-200 text-lg font-medium text-gray-900 p-4"
                    >
                      {t("edit")}
                    </Dialog.Title>
                    <form
                      className="flex flex-col justify-center items-center"
                      onSubmit={editSubmitHandler}
                    >
                      <input
                        className="font-Vazir font-medium text-gray-500 border dark:bg-slate-700 dark:text-slate-200 focus:border-2 bg-gray-50 focus:bg-white p-2 rounded-md outline-none w-3/4 m-2"
                        type="text"
                        name="title"
                        value={editValue.title}
                        onChange={editChangeHandler}
                        placeholder={t("input_edit_title")}
                        style={{ borderColor: `${colorTheme}`,caretColor: `${colorTheme}` }}
                      />
                      <textarea
                        className="font-Vazir font-medium text-gray-500 border dark:bg-slate-700 dark:text-slate-200 focus:border-2 bg-gray-50 focus:bg-white p-2 rounded-md outline-none w-3/4 m-2 resize-none"
                        type="text"
                        name="description"
                        value={editValue.description}
                        onChange={editChangeHandler}
                        placeholder={t("input_edit_description")}
                        style={{ borderColor: `${colorTheme}`, caretColor: `${colorTheme}`}}
                      />
                      <div className=" p-4 w-full flex flex-row justify-center items-center">
                        <button
                          style={{ borderColor: `${colorTheme}` }}
                          type="submit"
                          className="font-Vazir font-medium dark:text-slate-200 hover:scale-110 transition-transform w-20 h-auto rounded-full border m-1"
                          onClick={() => setOpen(false)}
                        >
                          {t("edit")}
                        </button>
                        <button
                          style={{ borderColor: `${colorTheme}` }}
                          type="button"
                          className="font-Vazir font-medium dark:text-slate-200 hover:scale-110 transition-transform w-20 h-auto rounded-full border m-1"
                          onClick={() => setOpen(false)}
                        >
                          {t("cancel")}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default EditTodo;
