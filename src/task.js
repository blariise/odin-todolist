export default class Task {
  _title;
  _description;
  _dueDate;
  _priority;
  _notes;

  constructor(title) { this._title = title; }

  /*
   * SETTERS
  */

  set title(title) { this._title = title; }

  set description(description) { this._description = description; }

  set dueDate(dueDate) { this._dueDate = dueDate; }

  set priority(priority) { this._priority = priority; }

  set notes(notes) { this._notes = notes; }

  /*
   * GETTERS
  */

  get title() { return this._title; }

  get description() { return this._description; }

  get dueDate() { return this._dueDate; }

  get priority() { return this._priority; }

  get notes() { return this._notes; }
}

