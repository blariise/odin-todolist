import Project from "./project.js";

export default class TodoManager {
  _projects = [];

  constructor() {}

  addProject(projectTitle) {
    this._projects.push(new Project(projectTitle));
  }
}
