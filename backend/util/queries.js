const sqlCheckPassword = (username) => `SELECT id, username, password, id FROM users WHERE username = '${username}';`;

const sqlCreateToken = (id, token) => `INSERT INTO tokens (fk_user, token) VALUES (${id}, '${token}');`;

const sqlCreateUser = (username, hash, email) => `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}');`;

exports.sqlCheckPassword = sqlCheckPassword;
exports.sqlCreateToken = sqlCreateToken;
exports.sqlCreateUser = sqlCreateUser;