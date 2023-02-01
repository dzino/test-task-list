const error = require("./error"),
  tasksModel = require("../models/tasks"),
  checkUser = require("./users").checkUser,
  validator = require("./validator"),
  filterRow = require("./validator").filterRow;

function create(req, res, mysql) {
  try {
    let { name, email, description } = req.body;
    name = filterRow(name);
    email = filterRow(email);
    description = filterRow(description);

    const checkName = validator.isString(name),
      checkEmail = validator.isEmail(email),
      checkDescription = validator.isString(description);
    if (!checkName || !checkEmail || !checkDescription) return error.e400(res);
    tasksModel
      .create(mysql, name, email, description)
      .then((result) => res.status(200).json(result));
  } catch (e) {
    error.e400(res);
  }
}

async function editDesc(req, res, mysql) {
  try {
    const checkAdmin = await checkUser(req, mysql);
    if (!checkAdmin) return error.e400(res);

    let { id, description } = req.body;
    description = filterRow(description);

    const checkID = validator.isNumber(id),
      checkDescription = validator.isString(description);
    if (!checkID || !checkDescription) return error.e400(res);

    const result = await tasksModel.editDesc(mysql, id, description);
    res.status(200).json(result);
  } catch (e) {
    error.e400(res);
  }
}

async function editDone(req, res, mysql) {
  try {
    const checkAdmin = await checkUser(req, mysql);
    if (!checkAdmin) return error.e400(res);

    let { id, done } = req.body;

    const checkID = validator.isNumber(id);
    if (!checkID) return error.e400(res);

    const result = await tasksModel.editDone(mysql, id, done);
    res.status(200).json(result);
  } catch (e) {
    error.e400(res);
  }
}

function list(req, res, mysql) {
  try {
    let { page, sort, asc } = req.query;
    sort = filterRow(sort);

    const checkPage = validator.isNumber(+page);
    if (!checkPage) return error.e400(res);

    tasksModel.get(mysql, page, sort, asc).then((data) => {
      res.status(200).json({
        count: Math.ceil(data[0].value[0].count / 3),
        tasksData: data[1].value,
      });
    });
  } catch (e) {
    error.e400(res);
  }
}

module.exports = { create, editDesc, editDone, list };
