function e400(res, e) {
  res.status(400).json({ message: e || "Error" });
}

module.exports = { e400 };
