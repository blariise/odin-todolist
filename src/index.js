import "./styles.css";
import addIcon from "./add.svg";
import editIcon from "./dots-vertical.svg";
import TodoManager from "./todomanager.js";

/*
 * INIT PAGE
*/
const todoManager = new TodoManager();
(() => {
  renderAddIcons();
  todoManager.addProject("Default");
  renderProjects();
})();

function renderAddIcons() {
  const addIconDivs = document.querySelectorAll(".add-icon");
  addIconDivs.forEach((addIconDiv) => {
    addIconDiv.innerHTML = addIcon;
  });
}

function renderProjectIcons() {
  const editIconsDivs = document.querySelectorAll(".project-edit");
  editIconsDivs.forEach((editIconDiv) => {
    editIconDiv.innerHTML = editIcon;
  });
}

function renderProjects() {
  const projectsDiv = document.querySelector(".projects-container");
  const projects = todoManager.getProjects();

  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project");
  const projectNameDiv = document.createElement("div");
  projectNameDiv.classList.add("project-name");
  const projectEditDiv = document.createElement("div");
  projectEditDiv.classList.add("project-edit");

  let projectId = 0;
  projects.forEach((project) => {
    projectNameDiv.textContent = project.getTitle();
    projectDiv.dataset.id = projectId;
    ++projectId;

    projectDiv.appendChild(projectNameDiv);
    projectDiv.appendChild(projectEditDiv);
    projectsDiv.appendChild(projectDiv);
  });
  renderProjectIcons();
}
