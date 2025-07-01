import Task from "./task.js";

export default class Project {
  _title;
  _taskList = [];

  constructor(title) { this._title = title; }

  setTitle(title) { this._title = title; }

  getTitle() { return this._title; }
  getTaskList() { return this._taskList; }

  addTask(task) { this._taskList.push(task); }
  removeTask(taskId) { this._taskList.splice(taskId, 1); }
}

