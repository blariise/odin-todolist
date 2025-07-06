import Task from "./task.js";

export default class Project {
  _title;
  _taskList = [];

  constructor(title) { this._title = title; }

  setTitle(title) { this._title = title; }

  getTitle() { return this._title; }
  getTasks() { return this._taskList; }

  addTask(taskTitle) { this._taskList.push( new Task(taskTitle) ); }
  removeTask(taskId) { this._taskList.splice(taskId, 1); }
}

