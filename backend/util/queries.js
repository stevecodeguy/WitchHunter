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

// Character Reading queries

const sqlGetCharacterAbilities = (characterId) => `SELECT * FROM character_abilities WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterArmor = (characterId) => `SELECT * FROM character_armor WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterGear = (characterId) => `SELECT * FROM character_gear WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterInfo = (userId, id) => `SELECT * FROM character_info WHERE fk_user = ${userId} AND id = ${id};`;

const sqlGetCharacterRites = (characterId) => `SELECT * FROM character_rites WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterSkills = (characterId) => `SELECT * FROM character_skills WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterTalents = (characterId) => `SELECT * FROM character_talents WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterWeapons = (characterId) => `SELECT * FROM character_weapons WHERE fk_character_info_id = ${characterId};`;

const sqlListCharacters = (userId) => `SELECT id, name, description FROM character_info WHERE fk_user = ${userId};`;

exports.sqlGetCharacterAbilities = sqlGetCharacterAbilities;
exports.sqlGetCharacterArmor = sqlGetCharacterArmor;
exports.sqlGetCharacterGear = sqlGetCharacterGear;
exports.sqlGetCharacterInfo = sqlGetCharacterInfo;
exports.sqlGetCharacterRites = sqlGetCharacterRites;
exports.sqlGetCharacterSkills = sqlGetCharacterSkills;
exports.sqlGetCharacterTalents = sqlGetCharacterTalents;
exports.sqlGetCharacterWeapons = sqlGetCharacterWeapons;
exports.sqlListCharacters = sqlListCharacters;

// Control queries

const sqlGetInfoReligions = () => 'SELECT * FROM religions;';
const sqlGetInfoOrders = () => 'SELECT * FROM orders;';
const sqlGetInfoSinsVices = () => 'SELECT * FROM sins_vices;';
const sqlGetInfoVirtues = () => 'SELECT * FROM virtues;';
const sqlGetInfoBackgrounds = () => 'SELECT * FROM backgrounds;';

exports.sqlGetInfoReligions = sqlGetInfoReligions;
exports.sqlGetInfoOrders = sqlGetInfoOrders;
exports.sqlGetInfoSinsVices = sqlGetInfoSinsVices;
exports.sqlGetInfoVirtues = sqlGetInfoVirtues;
exports.sqlGetInfoBackgrounds = sqlGetInfoBackgrounds;