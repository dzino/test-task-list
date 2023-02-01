const bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");
const error = require("./error"),
  usersModel = require("../models/users"),
  validator = require("./validator"),
  filterRow = require("./validator").filterRow;

function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "24h" });
}

function login(req, res, mysql) {
  try {
    let { name, pass } = req.body;
    name = filterRow(name);
    pass = filterRow(pass);

    const checkName = validator.isString(name),
      checkPass = validator.isString(pass, 2);
    if (!checkName || !checkPass) return error.e400(res);
    usersModel.get(mysql).then((users) => {
      const user = users.find((user) => user.name === name);
      !user && error.e400(res);
      const validPass = bcrypt.compareSync(pass, user.pass);
      !validPass && error.e400(res);
      const token = generateAccessToken(user.id);
      res.cookie("user", token);
      res.status(200).send("");
    });
  } catch (e) {
    error.e400(res, e);
  }
}

async function checkUser(req, mysql) {
  const token = req.cookies,
    id = jwt.verify(token.user, process.env.JWT_KEY).id,
    users = await usersModel.get(mysql);
  return !!users.find((user) => user.id === id && user.role === "admin");
}

function logout(req, res) {
  try {
    res.clearCookie("user");
    res.status(200).send("");
  } catch (e) {
    error.e400(res, e);
  }
}

module.exports = { login, checkUser, logout };
