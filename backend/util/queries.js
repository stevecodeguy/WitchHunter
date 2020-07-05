// User queries

const sqlCheckPassword = (username) => `SELECT id, username, password, id FROM users WHERE username = '${username}';`;

const sqlCreateUser = (username, hash, email) => `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}');`;

exports.sqlCheckPassword = sqlCheckPassword;
exports.sqlCreateUser = sqlCreateUser;

// Token queries

const sqlDeleteTokenById = (id) => `DELETE FROM tokens WHERE id = ${id};`;

const sqlDeleteTokenByToken = (token) => `DELETE FROM tokens WHERE token = '${token}';`;

const sqlDeleteAllTokens = (userId) => `DELETE FROM tokens WHERE fk_user = ${userId};`;

const sqlGetToken = (id, token) => `SELECT id FROM tokens WHERE fk_user = ${id} AND token = '${token}';`;

const sqlSetToken = (id, token) => `INSERT INTO tokens (fk_user, token) VALUES (${id}, '${token}');`;

exports.sqlDeleteAllTokens = sqlDeleteAllTokens;
exports.sqlDeleteTokenById = sqlDeleteTokenById;
exports.sqlDeleteTokenByToken = sqlDeleteTokenByToken;
exports.sqlGetToken = sqlGetToken;
exports.sqlSetToken = sqlSetToken;