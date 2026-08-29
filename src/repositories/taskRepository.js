let tasks = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Build a CRUD API", done: false },
  { id: 3, title: "Test API with curl", done: true }
];

let nextId = 4;

function getAll() {
  return tasks;
}

function getById(id) {
  return tasks.find(task => task.id === id);
}

function create(title) {
  const task = {
    id: nextId++,
    title,
    done: false
  };

  tasks.push(task);
  return task;
}

function update(id, title, done) {
  const task = getById(id);

  if (!task) {
    return null;
  }

  task.title = title;
  task.done = done;

  return task;
}

function remove(id) {
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};