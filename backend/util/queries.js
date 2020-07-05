const sqlCheckPassword = (username) => `SELECT id, username, password, id FROM users WHERE username = '${username}';`;

const sqlCreateUser = (username, hash, email) => `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}');`;

const sqlGetToken = (id, token) => `SELECT id FROM tokens WHERE fk_user = ${id} AND token = '${token}';`;

const sqlSetToken = (id, token) => `INSERT INTO tokens (fk_user, token) VALUES (${id}, '${token}');`;

exports.sqlCheckPassword = sqlCheckPassword;
exports.sqlCreateUser = sqlCreateUser;
exports.sqlGetToken = sqlGetToken;
exports.sqlSetToken = sqlSetToken;