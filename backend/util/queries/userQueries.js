const sqlCheckPassword = (username) => `SELECT id, BIN_TO_UUID(uuid) as uuid, username, password, id FROM users WHERE username = '${username}';`;

const sqlCreateUser = (username, hash, email) => `INSERT INTO users (uuid, username, password, email) VALUES (UUID_TO_BIN(UUID()), '${username}', '${hash}', '${email}');`;

exports.sqlCheckPassword = sqlCheckPassword;
exports.sqlCreateUser = sqlCreateUser;