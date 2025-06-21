import "./styles.css";

import Task from "./task.js";
import TodoList from "./todolist.js";

import addIcon from "./add.svg";

/*
 * INIT PAGE
*/
(() => {
  const defaultList = new TodoList("default");

  initIcons();
})();

function initIcons() {
  const addIconDivs = document.querySelectorAll(".add-icon");
  addIconDivs.forEach((addIconDiv) => {
    addIconDiv.innerHTML = addIcon;
  });
}
