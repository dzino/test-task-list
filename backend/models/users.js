function get(mysql) {
  return new Promise((resolve, reject) => {
    mysql.query("SELECT * FROM `users`", (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

module.exports = { get };
