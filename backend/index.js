require("dotenv").config();
const express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser");
const router = require("./router");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static(path.join(__dirname, "..", "/frontend/build")));
app.use(express.json());
app.use(cookieParser(process.env.SESSION));
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", router);
app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
