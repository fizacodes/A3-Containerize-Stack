const express = require("express");
const taskService = require("../services/taskService");

const router = express.Router();

router.get("/tasks", (req, res) => {
  res.json(taskService.getTasks());
});

router.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = taskService.getTask(id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.json(task);
});

router.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required"
    });
  }

  const task = taskService.createTask(title);

  res.status(201).json(task);
});

router.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required"
    });
  }

  const task = taskService.updateTask(id, title, done);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.json(task);
});

router.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleted = taskService.deleteTask(id);

  if (!deleted) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.json({
    message: "Task deleted successfully"
  });
});

module.exports = router;