import "./styles.css";
import addIcon from "./add.svg";

/*
 * INIT PAGE
*/
(() => {
  renderIcons();
})();

function renderIcons() {
  const addIconDivs = document.querySelectorAll(".add-icon");
  addIconDivs.forEach((addIconDiv) => {
    addIconDiv.innerHTML = addIcon;
  });
}

function renderProjects() {
  const projectsDiv = document.querySelector(".projects-container");

}
