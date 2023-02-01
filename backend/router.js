const Router = require("express"),
  path = require("path");
const mysql = require("./connect-db"),
  tasks = require("./controllers/tasks"),
  users = require("./controllers/users");

mysql.connect();
const router = new Router();

router.get("/", (res) => res.sendFile(path.join("index.html")));

router.post("/tasks", (req, res) => tasks.create(req, res, mysql));
router.put("/tasks-description", (req, res) => tasks.editDesc(req, res, mysql));
router.put("/tasks-done", (req, res) => tasks.editDone(req, res, mysql));
router.get("/tasks", (req, res) => tasks.list(req, res, mysql));

router.post("/login", (req, res) => users.login(req, res, mysql));
router.post("/logout", (req, res) => users.logout(req, res));

module.exports = router;
