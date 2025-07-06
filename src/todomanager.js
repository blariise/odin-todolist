import Project from "./project.js";

export default class TodoManager {
  _projects = [];

  constructor() {}

  addProject(projectTitle) { this._projects.push(new Project(projectTitle)); }

  removeProject(projectId) { this._projects.splice(projectId, 1); }

  getProjects() { return this._projects; }
  getProject(projectId) { return this._projects[projectId]; }
}
