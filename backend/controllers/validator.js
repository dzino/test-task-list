function filterRow(row) {
  return row.replace(/[\[\]\{\}<>]/gim, "");
}

function isString(row, length) {
  const checkString = typeof row === "string",
    checkLength = row.length >= length;
  if (length) return checkString && checkLength;
  return checkString;
}

function isEmail(row) {
  return row.search(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i) !== -1;
}

function isNumber(row) {
  return typeof row === "number";
}

module.exports = { filterRow, isString, isEmail, isNumber };
