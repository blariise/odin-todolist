import "./styles.css";
import addIcon from "./add.svg";
import editIcon from "./dots-vertical.svg";
import TodoManager from "./todomanager.js";

/*
 * INIT PAGE
*/
const todoManager = new TodoManager();
let activeProjectId = 0;
(() => {
  renderAddIcons();
  todoManager.addProject("Default");
  renderProjects();
  renderTasks(activeProjectId);

  addAddProjectEvent();
  setProjectClickEvent();
  addAddTaskEvent();
  addTaskStatusEvent();
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

function addAddProjectEvent() {
  const addProjectDiv = document.querySelector(".add-input");
  addProjectDiv.addEventListener("keydown", (event) => {
    const projectTitle = document.querySelector("#project-name");
    if (event.key === "Enter" && projectTitle.value !== "") {
      todoManager.addProject(projectTitle.value);
      projectTitle.value = "";
      renderProjects();
    }
  });
}

function addAddTaskEvent() {
  const addTaskDiv = document.querySelector(".task-add-input");
  addTaskDiv.addEventListener("keydown", (event) => {
    const taskTitle = document.querySelector("#task-title");
    if (event.key === "Enter" && taskTitle.value !== "") {
      const project = todoManager.getProject(activeProjectId);
      project.addTask(taskTitle.value);
      taskTitle.value = "";
      clearTasks();
      renderTasks(activeProjectId);
    }
  });
}

function setProjectClickEvent() {
  const projectsDiv = document.querySelector(".projects-container");
  projectsDiv.addEventListener("click", (event) => {
    const elementType = event.target;
    const projectId = elementType.dataset.id;
    if (elementType.classList.item(0) === "project") {
      activeProjectId = projectId;
      renderTasks(projectId);
    } else if (elementType.tagName === "svg") {
      console.log("edit");
    }
  });
}

function addTaskStatusEvent() {
  const tasksDiv = document.querySelector(".tasks");
  tasksDiv.addEventListener("click", (event) => {
    const element = event.target;
    if (element.classList.item(0) === "task-title") {
      console.log("TASK");
    } else if (element.classList.item(0) === "task-input-status") {
      setTaskStatus(element);
      renderTasks(activeProjectId);
    }
  });
}

function setTaskStatus(taskInputNode) {
  const project = todoManager.getProject(activeProjectId);
  const task = project.getTask(taskInputNode.id);
  task.toggleStatus();
}

function renderProjectTitleInTasks(project) {
  const projectTitleDiv = document.querySelector(".project-title");
  projectTitleDiv.textContent = project.getTitle();
}

function renderTasks(projectId) {
  clearTasks();
  const tasksDiv = document.querySelector(".tasks");
  const tasksContainerDiv = document.createElement("div");
  tasksContainerDiv.classList.add("tasks-container");

  const project = todoManager.getProject(projectId);
  renderProjectTitleInTasks(project);

  let taskIndex = 0;
  project.getTasks().forEach((task) => {
    const taskDiv = createTaskDOM(task, taskIndex);
    tasksContainerDiv.appendChild(taskDiv);
    ++taskIndex;
  });
  tasksDiv.appendChild(tasksContainerDiv);
}

function clearTasks() {
  const taskContainerDiv = document.querySelector(".tasks-container");
  if (taskContainerDiv !== null) {
    taskContainerDiv.remove();
  }
}

function createTaskDOM(task, taskIndex) {
  const taskDiv = document.createElement("div");
  const taskStatusInputDiv = document.createElement("div");
  const taskTitleDiv = document.createElement("div");
  const taskRemoveDiv = document.createElement("div");

  taskDiv.classList.add("task");
  taskStatusInputDiv.classList.add("task-status");
  const statusClassName = task.getStatus() ? "completed" : "not-completed";
  taskStatusInputDiv.classList.add(statusClassName);
  taskTitleDiv.classList.add("task-title");
  taskRemoveDiv.classList.add("task-remove");

  const taskStatus = document.createElement("input");
  taskStatus.classList.add("task-input-status");
  taskStatus.setAttribute("type", "checkbox");
  taskStatus.checked = task.getStatus();
  taskStatus.setAttribute("id", `${taskIndex}`);
  taskStatusInputDiv.appendChild(taskStatus);

  const taskTitle = task.getTitle();
  taskTitleDiv.textContent = taskTitle;

  taskDiv.appendChild(taskStatusInputDiv);
  taskDiv.appendChild(taskTitleDiv);
  taskDiv.appendChild(taskRemoveDiv);
  taskDiv.dataset.id = taskIndex;
  return taskDiv;
}

function hideIfActiveRemoved() {
  activeProjectId = -1;
  const tasksDiv = document.querySelector(".tasks");
  tasksDiv.classList.add("hidden");
}
