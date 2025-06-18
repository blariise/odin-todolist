export default class Task {
  constructor(title) { this.title = title; }

  /*
   * SETTERS
  */

  set description(description) { this.description = description; }

  set dueDate(dueDate) { this.dueDate = dueDate; }

  set priority(priority) { this.priority = priority; }

  set notes(notes) { this.notes = notes; }

  /*
   * GETTERS
  */

  get title() { return this.title; }

  get description() { return this.description; }

  get dueDate() { return this.dueDate; }

  get priority() { return this.priority; }

  get notes() { return this.notes; }
}

