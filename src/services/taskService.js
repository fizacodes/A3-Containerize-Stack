const repository = require("../repositories/postgresTaskRepository");

async function getTasks() {
  return await repository.getAll();
}

async function getTask(id) {
  return await repository.getById(id);
}

async function createTask(title) {
  return await repository.create(title);
}

async function updateTask(id, title, done) {
  return await repository.update(id, title, done);
}

async function deleteTask(id) {
  return await repository.remove(id);
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};