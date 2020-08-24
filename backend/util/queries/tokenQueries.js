const sqlDeleteTokenById = (id) => `DELETE FROM tokens WHERE id = ${id};`;

const sqlDeleteTokenByToken = (token) => `DELETE FROM tokens WHERE token = '${token}';`;

const sqlDeleteAllTokens = (userId) => `DELETE FROM tokens WHERE fk_user = ${userId};`;

const sqlGetToken = (id, token) => `SELECT id FROM tokens WHERE fk_user = ${id} AND token = '${token}';`;

const sqlSetToken = (id, type, uuid, token) => `INSERT INTO tokens (fk_user, type, uuid, token) VALUES (${id}, '${type}', '${uuid}', '${token}');`;

exports.sqlDeleteAllTokens = sqlDeleteAllTokens;
exports.sqlDeleteTokenById = sqlDeleteTokenById;
exports.sqlDeleteTokenByToken = sqlDeleteTokenByToken;
exports.sqlGetToken = sqlGetToken;
exports.sqlSetToken = sqlSetToken;