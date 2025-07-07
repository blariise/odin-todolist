export default class Task {
  _title;
  _description;
  _dueDate;
  _priority;
  _notes;
  _isCompleted;

  constructor(title) {
    this._title = title;
    this._isCompleted = false;
  }

  /*
   * SETTERS
  */

  setTitle(title) { this._title = title; }

  setDescription(description) { this._description = description; }

  setDueDate(dueDate) { this._dueDate = dueDate; }

  setPriority(priority) { this._priority = priority; }

  setNotes(notes) { this._notes = notes; }

  /*
   * GETTERS
  */

  getTitle() { return this._title; }

  getDescription() { return this._description; }

  getDueDate() { return this._dueDate; }

  getPriority() { return this._priority; }

  getNotes() { return this._notes; }

  getStatus() { return this._isCompleted; }

  toggleStatus() {
    this._isCompleted = this._isCompleted === false ? true : false;
  }
}

