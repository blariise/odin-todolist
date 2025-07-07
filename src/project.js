import Task from "./task.js";

export default class Project {
  _title;
  _tasks = [];

  constructor(title) { this._title = title; }

  setTitle(title) { this._title = title; }

  getTitle() { return this._title; }
  getTasks() { return this._tasks; }
  getTask(taskId) { return this._tasks[taskId]; }

  addTask(taskTitle) { this._tasks.push( new Task(taskTitle) ); }
  removeTask(taskId) { this._tasks.splice(taskId, 1); }
}

