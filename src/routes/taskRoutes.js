const express = require("express");
const taskService = require("../services/taskService");

const router = express.Router();

router.get("/tasks", async (req, res) => {
  const tasks = await taskService.getTasks();
  res.json(tasks);
});

router.get("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  const task = await taskService.getTask(id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.json(task);
});

router.post("/tasks", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required"
    });
  }

  const task = await taskService.createTask(title);

  res.status(201).json(task);
});

router.put("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required"
    });
  }

  const task = await taskService.updateTask(id, title, done);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.json(task);
});

router.delete("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await taskService.deleteTask(id);

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