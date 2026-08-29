const repository = require("../repositories/taskRepository");

function getTasks() {
  return repository.getAll();
}

function getTask(id) {
  return repository.getById(id);
}

function createTask(title) {
  return repository.create(title);
}

function updateTask(id, title, done) {
  return repository.update(id, title, done);
}

function deleteTask(id) {
  return repository.remove(id);
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};