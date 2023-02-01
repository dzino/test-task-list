function get(mysql, page, sort, asc) {
  const sortDB =
    ["name", "email", "description", "done"].find((i) => i === sort) || "name";
  const count = new Promise((resolve, reject) => {
    mysql.query(`SELECT COUNT(*) AS count FROM tasks`, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
  const tasks = new Promise((resolve, reject) => {
    mysql.query(
      `
      SELECT *
      FROM tasks
      ORDER BY ${sortDB} ${+asc == 1 ? "ASC" : "DESC"}
      LIMIT 3
      OFFSET ${page * 3}
      `,
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
  return Promise.allSettled([count, tasks]);
}

function create(mysql, name, email, description) {
  return new Promise((resolve, reject) => {
    mysql.query(
      `INSERT INTO tasks (id, name, email, description, done) VALUES (NULL, '${name}', '${email}', '${description}', '0')`,
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
}

function editDesc(mysql, id, description) {
  return new Promise((resolve, reject) => {
    mysql.query(
      `UPDATE tasks SET description = '${description}', edit_desc = '1' WHERE tasks.id = ${id}`,
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
}

function editDone(mysql, id, done) {
  return new Promise((resolve, reject) => {
    mysql.query(
      `UPDATE tasks SET done = '${done === 1 ? 1 : 0}' WHERE tasks.id = ${id}`,
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
}

module.exports = { get, create, editDesc, editDone };
