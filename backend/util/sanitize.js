const sanitize = (sqlString) => {
  return sqlString.toString().replace(/[&<>"';*/]/g, '');
}

module.exports = sanitize;