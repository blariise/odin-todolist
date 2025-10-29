import { format } from "date-fns";

export default class Task {
  _title;
  _description;
  _dueDate;
  _priority;
  _isCompleted;

  constructor(title) {
    this._title = title;
    this._isCompleted = false;
    this._priority = 0;
  }

  /*
   * SETTERS
  */

  setTitle(title) { this._title = title; }

  setDescription(description) { this._description = description; }

  setDueDate(dueDate) { this._dueDate = dueDate; }

  setPriority(priority) { this._priority = priority; }

  setCompletion(completion) { this._isCompleted = completion; }

  /*
   * GETTERS
  */

  getTitle() { return this._title; }

  getDescription() { return this._description; }

  getDueDate() { return this._dueDate; }

  getPriority() { return this._priority; }

  getStatus() { return this._isCompleted; }

  toggleStatus() {
    this._isCompleted = this._isCompleted === false ? true : false;
  }

  togglePriority() {
    this._priority += 1;
    if (this._priority > 2) {
      this._priority = 0;
    }
  }
}

