const express = require("express");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});