import "./styles.css";
import addIcon from "./add.svg";
import editIcon from "./dots-vertical.svg";
import deleteIcon from "./delete.svg";
import TodoManager from "./todomanager.js";

import { isDate, formatISO, format } from "date-fns";

/*
 * INIT PAGE
*/

let todoManager;
let activeProjectId = 0;

if (localStorage.getItem("localTodoManager")) {
  todoManager = new TodoManager();
  populate();
} else {
  todoManager = new TodoManager();
  todoManager.addProject("Default");
  updateLocalStorage();
}

(() => {
  renderAddIcons();
  renderProjects();
  if (todoManager.getProjects().length != 0) {
    renderProjectInfo(activeProjectId);
    renderTasks(activeProjectId);
  }

  addProjectHandler();
  addTaskHandler();
  projectListHandler();
  taskListHandler();
  taskInfoHandler();
})();


/*
 * RENDER ICONS
*/

function renderAddIcons() {
  const addIconDivs = document.querySelectorAll(".add-icon");
  addIconDivs.forEach((addIconDiv) => {
    addIconDiv.innerHTML = addIcon;
});
}

function renderProjectIcons() {
  const deleteIconsDivs = document.querySelectorAll(".project-remove");
  deleteIconsDivs.forEach((deleteIconDiv) => {
    deleteIconDiv.innerHTML = deleteIcon;
  });
}

function renderDeleteIcons() {
  const deleteIconsDivs = document.querySelectorAll(".task-remove");
  deleteIconsDivs.forEach((deleteIconDiv) => {
    deleteIconDiv.innerHTML = deleteIcon;
  });
}

/*
 * CREATE DOM
*/

function createProjectDOM(project) {
  const projectDiv = document.createElement("div");
  const projectNameDiv = document.createElement("div");
  const projectRemoveDiv = document.createElement("div");

  projectDiv.classList.add("project");
  projectNameDiv.classList.add("project-name");
  projectRemoveDiv.classList.add("project-remove");

  projectNameDiv.textContent = project.getTitle();

  projectDiv.appendChild(projectNameDiv);
  projectDiv.appendChild(projectRemoveDiv);
  return projectDiv;
}

function createAddTaskDOM() {
  const addTaskDiv = document.createElement("div");
  const addIconDiv = document.createElement("div");
  const taskAddInputDiv = document.createElement("div");

  addTaskDiv.classList.add("add-task");
  addIconDiv.classList.add("add-icon");
  taskAddInputDiv.classList.add("task-add-input");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "task-title");
  input.setAttribute("minlength", "0");
  input.setAttribute("maxlength", "20");
  input.setAttribute("placeholder", "Add Task");
  taskAddInputDiv.appendChild(input);

  addTaskDiv.appendChild(addIconDiv);
  addTaskDiv.appendChild(taskAddInputDiv);
  return addTaskDiv;
}

function createTaskDOM(task, taskIndex) {
  const taskDiv = document.createElement("div");
  const taskStatusInputDiv = document.createElement("div");
  const taskTitleDiv = document.createElement("div");
  const taskRemoveDiv = document.createElement("div");

  taskDiv.classList.add("task");
  taskStatusInputDiv.classList.add("task-status");
  const statusClassName = task.getStatus() ? "completed" : "not-completed";
  taskDiv.classList.add(statusClassName);
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

function createTaskInfoDOM() {
  const taskStatusDataDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const statusDiv = document.createElement("div");
  const dueDateDiv = document.createElement("div");
  const priorityDiv = document.createElement("div");
  const descriptionDiv = document.createElement("div");

  titleDiv.classList.add("task-info-title");
  taskStatusDataDiv.classList.add("task-info-status-data");
  descriptionDiv.classList.add("task-info-description");

  statusDiv.classList.add("task-info-completion-status");
  priorityDiv.classList.add("task-info-priority");
  dueDateDiv.classList.add("task-info-date");

  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("id", "task-date");
  dueDateDiv.appendChild(dateInput);

  const descriptionInput = document.createElement("textarea");
  descriptionInput.setAttribute("id", "description-input");
  descriptionDiv.appendChild(descriptionInput);

  taskStatusDataDiv.appendChild(statusDiv);
  taskStatusDataDiv.appendChild(priorityDiv);
  taskStatusDataDiv.appendChild(dueDateDiv);
  return [ titleDiv, taskStatusDataDiv, descriptionDiv ];
}

/*
 * CLEAR DOM
*/

function clearProjects() {
  const projectsDiv = document.querySelector(".projects-container");
  while (projectsDiv.firstChild) {
    projectsDiv.removeChild(projectsDiv.firstChild);
  }
}

function clearProjectInfoDOM() {
  const tasksDiv = document.querySelector(".tasks");
  while (tasksDiv.firstChild) {
    tasksDiv.removeChild(tasksDiv.firstChild);
  }
}

function clearTasks() {
  const taskContainerDiv = document.querySelector(".tasks-container");
  if (taskContainerDiv !== null) {
    taskContainerDiv.remove();
  }
}

function clearTaskInfo() {
  const taskInfoDiv = document.querySelector(".task-info");
  while (taskInfoDiv.firstChild) {
    taskInfoDiv.removeChild(taskInfoDiv.firstChild);
  }
}

/*
 * RENDER
*/

function renderProjects() {
  clearProjects();
  const projectsDiv = document.querySelector(".projects-container");
  const projects = todoManager.getProjects();

  let projectId = 0;
  projects.forEach((project) => {
    const projectDiv = createProjectDOM(project);
    projectDiv.dataset.id = projectId;
    ++projectId;

    projectsDiv.appendChild(projectDiv);
  });
  renderProjectIcons();
}

function renderProjectTitleInTasks(projectId) {
  const projectTitleDiv = document.querySelector(".project-title");
  projectTitleDiv.textContent = todoManager.getProject(projectId).getTitle();
}

function renderTasks(projectId) {
  clearTasks();
  const tasksDiv = document.querySelector(".tasks");
  const tasksContainerDiv = document.createElement("div");
  tasksContainerDiv.classList.add("tasks-container");

  const project = todoManager.getProject(projectId);

  let taskIndex = 0;
  project.getTasks().forEach((task) => {
    const taskDiv = createTaskDOM(task, taskIndex);
    tasksContainerDiv.appendChild(taskDiv);
    ++taskIndex;
  });
  tasksDiv.appendChild(tasksContainerDiv);
  renderDeleteIcons();
}

function renderTaskInfo(taskId, project) {
  clearTaskInfo();
  const container = document.querySelector(".task-info");
  container.dataset.id = taskId;
  const [taskTitleDiv, taskStatusDiv, taskDescriptionDiv] = createTaskInfoDOM();
  container.appendChild(taskTitleDiv);
  container.appendChild(taskStatusDiv);
  container.appendChild(taskDescriptionDiv);

  const task = project.getTask(taskId);
  renderTaskTitleInTaskInfo(task, project);

  renderTaskInfoStatusContent(task);
  renderTaskInfoPriorityContent(task);
  renderTaskInfoDateContent(task);
  renderTaskInfoDescription(task);
}

function renderTaskInfoStatusContent(task) {
  const statusText = task.getStatus() ? "completed" : "not-completed";
  const statusDiv = document.querySelector(".task-info-completion-status");
  statusDiv.textContent = statusText;
  setElementColor(statusDiv, `--status-${statusText}`);
}

function renderTaskInfoPriorityContent(task) {
  let priorityText = "";
  switch (task.getPriority()) {
    case 0:
      priorityText = "low";
      break;
    case 1:
      priorityText = "medium";
      break;
    case 2:
      priorityText = "high";
      break;
    default:
      priorityText = "default";
      break;
  }
  const priorityDiv = document.querySelector(".task-info-priority");
  priorityDiv.textContent = priorityText;
  setElementColor(priorityDiv, `--priority-${priorityText}`);
}

function renderTaskInfoDateContent(task) {
  taskDateHandler();
  const dateDiv = document.querySelector("#task-date");
  const date = task.getDueDate();
  if (date !== undefined) {
    const dateFormatted = format(date, "yyyy-MM-dd");
    dateDiv.value = dateFormatted;
  }
}

function renderTaskInfoDescription(task) {
  taskDescriptionHandler();
  const description = task.getDescription();
  const descriptionDiv = document.querySelector("#description-input");
  if (description !== undefined) {
    descriptionDiv.value = description;
  }
}

function renderProjectInfo() {
  const pl = document.querySelector(".tasks");
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("project-title");
  const xd = createAddTaskDOM();
  pl.appendChild(titleDiv);
  pl.appendChild(xd);

  renderProjectTitleInTasks(activeProjectId);
  renderAddIcons();
}

function renderTaskTitleInTaskInfo(task, project) {
  const taskTitleDiv = document.querySelector(".task-info-title");
  taskTitleDiv.textContent = task.getTitle();
}

/*
 * EVENT HANDLERS
*/

function addProjectHandler() {
  const addProjectDiv = document.querySelector(".add-input");
  addProjectDiv.addEventListener("keydown", (event) => {
    const projectTitle = document.querySelector("#project-name");
    if (event.key === "Enter" && projectTitle.value !== "") {
      todoManager.addProject(projectTitle.value);
      updateLocalStorage();
      projectTitle.value = "";
      renderProjects();
    }
  });
}

function addTaskHandler() {
  const addTaskDiv = document.querySelector(".task-add-input");
  if (addTaskDiv !== null) {
    addTaskDiv.addEventListener("keydown", (event) => {
      const taskTitle = document.querySelector("#task-title");
      if (event.key === "Enter" && taskTitle.value !== "") {
        const project = todoManager.getProject(activeProjectId);
        project.addTask(taskTitle.value);
        updateLocalStorage();
        taskTitle.value = "";
        clearTasks();
        renderTasks(activeProjectId);
      }
    });
  }
}

function projectListHandler() {
  const projectsDiv = document.querySelector(".projects-container");
  projectsDiv.addEventListener("click", (event) => {
    const element = event.target;
    let shouldRenderProjectInfo = false;
    let projectId = -1;
    switch (element.classList.item(0)) {
      case "project":
        shouldRenderProjectInfo = true;
        projectId = element.dataset.id;
        break;
      case "project-name":
        shouldRenderProjectInfo = true;
        projectId = element.parentElement.dataset.id;
        break;
    }
    if (shouldRenderProjectInfo && (document.querySelector(".project-title") == null)) {
      renderProjectInfo();
      addTaskHandler();
    }

    if (projectId !== -1 && projectId !== activeProjectId) {
      activeProjectId = projectId;
      clearTaskInfo();
      renderProjectTitleInTasks(activeProjectId);
      renderTasks(projectId);
    }

    let removed = false;
    switch (element.tagName) {
      case "svg":
        removed = true;
        projectId = element.parentElement.parentElement.dataset.id;
        break;
      case "path":
        removed = true;
        projectId = element.parentElement.parentElement.parentElement.dataset.id;
        break;
    }

    if ((projectId == activeProjectId) && removed) {
      activeProjectId = -1;
      clearTasks();
      todoManager.removeProject(projectId);
      updateLocalStorage();
      clearProjectInfoDOM();
      renderProjects();
      clearTaskInfo();
    } else if (removed) {
      todoManager.removeProject(projectId);
      updateLocalStorage();
      renderProjects();
    }
    activeProjectId = projectId;
  });
}

function taskListHandler() {
  const tasksDiv = document.querySelector(".tasks");

  tasksDiv.addEventListener("click", (event) => {
    const element = event.target;

    let isTaskSelected = false;
    let shouldRenderTasks = false;
    let taskId = -1;

    switch (element.classList.item(0)) {
      case "task":
        isTaskSelected = true;
        taskId = element.dataset.id;
        break;
      case "task-title":
      case "task-status":
      case "task-remove":
        isTaskSelected = true;
        taskId = element.parentElement.dataset.id;
        break;
      case "task-input-status":
        taskId = element.id;
        setTaskStatus(element.id);
        updateLocalStorage();
        shouldRenderTasks = true;
        break;
      default:
        break;
    }

    let shouldDeleteTask = false;
    switch (element.tagName) {
      case "svg":
        shouldDeleteTask = true;
        shouldRenderTasks = true;
        taskId = element.parentNode.parentElement.dataset.id;
        break;
      case "path":
        shouldDeleteTask = true;
        shouldRenderTasks = true;
        taskId = element.parentNode.parentNode.parentElement.dataset.id;
        break;
      default:
        break;
    }

    const taskInfoDiv = document.querySelector(".task-info");
    const isTaskInfoRendered = (taskInfoDiv.dataset.id === taskId) && taskInfoDiv.hasChildNodes();

    if (isTaskSelected || isTaskInfoRendered) {
      const project = todoManager.getProject(activeProjectId);
      renderTaskInfo(taskId, project);
    }

    if (shouldRenderTasks) {
      if (shouldDeleteTask) {
        const project = todoManager.getProject(activeProjectId);
        project.removeTask(taskId);
        updateLocalStorage();
        if (isTaskInfoRendered || project.getTasks().length === 0) {
          clearTaskInfo();
        }
      }
      renderTasks(activeProjectId);
    }
  });
}

function taskInfoHandler() {
  const taskInfoDiv = document.querySelector(".task-info");
  taskInfoDiv.addEventListener("click", (event) => {
    const element = event.target;
    const taskId = taskInfoDiv.dataset.id;
    const project = todoManager.getProject(activeProjectId);
    let shouldRenderTaskInfo = false;
    switch (element.classList.item(0)) {
      case "task-info-completion-status":
        shouldRenderTaskInfo = true;
        setTaskStatus(taskId);
        renderTasks(activeProjectId);
        break;
      case "task-info-priority":
        shouldRenderTaskInfo = true;
        const task = project.getTask(taskId);
        task.togglePriority();
        break;
      case "task-info-date":
        shouldRenderTaskInfo = true;
        break;
      default:
        break;
    }

    if (shouldRenderTaskInfo) {
      renderTaskInfo(taskId, project);
    }
  });
}

function taskDateHandler() {
  const taskId = document.querySelector(".task-info").dataset.id;
  const task = todoManager.getProject(activeProjectId).getTask(taskId);
  const dateDiv = document.querySelector("#task-date");
  dateDiv.addEventListener("change", (event) => {
    console.log(dateDiv.valueAsNumber);
    const date = new Date(dateDiv.valueAsNumber);
    task.setDueDate(date);
    updateLocalStorage();
  });
}

function taskDescriptionHandler() {
  const taskId = document.querySelector(".task-info").dataset.id;
  const task = todoManager.getProject(activeProjectId).getTask(taskId);
  const description = document.querySelector("#description-input");
  description.addEventListener("change", (event) => {
    task.setDescription(description.value);
    updateLocalStorage();
  });
}

/*
 * HELPERS
*/

function setTaskStatus(taskId) {
  const project = todoManager.getProject(activeProjectId);
  const task = project.getTask(taskId);
  task.toggleStatus();
}

function hideIfActiveRemoved() {
  activeProjectId = -1;
  const tasksDiv = document.querySelector(".tasks");
  tasksDiv.classList.add("hidden");
}

function setElementColor(element, color) {
  const rootStyle = getComputedStyle(document.documentElement);
  const textColor = rootStyle.getPropertyValue(color).trim();
  element.style.color = textColor;
}

function updateLocalStorage() {
  localStorage.setItem("localTodoManager", JSON.stringify(todoManager));
}

function populate() {
  const lTodoM = JSON.parse(localStorage.getItem("localTodoManager"));
  if (lTodoM) {
    let projectId = 0;
    let taskId = 0;
    lTodoM._projects.forEach((project) => {
      todoManager.addProject(project._title);
      project._tasks.forEach((task) => {
        todoManager.getProject(projectId).addTask(task._title);
        const tempTask = todoManager.getProject(projectId).getTask(taskId);
        tempTask.setDescription(task._description);
        tempTask.setDueDate(task._dueDate);
        tempTask.setCompletion(task._isCompleted);
        tempTask.setPriority(task._priority);
        taskId++;
      });
      projectId++;
    });
  }
}
