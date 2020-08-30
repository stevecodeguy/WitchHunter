const sqlGetCharacterAbilities = (characterId) => `SELECT * FROM character_abilities WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterArmor = (characterId) => `SELECT * FROM character_armor WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterGear = (characterId) => `SELECT * FROM character_gear WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterInfo = (userId, id) => `SELECT * FROM character_info WHERE fk_user = ${userId} AND id = ${id};`;

const sqlGetCharacterRites = (characterId) => `SELECT * FROM character_rites WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterSkills = (characterId) => `SELECT * FROM character_skills WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterTalents = (characterId) => `SELECT * FROM character_talents WHERE fk_character_info_id = ${characterId};`;

const sqlGetCharacterWeapons = (characterId) => `SELECT * FROM character_weapons WHERE fk_character_info_id = ${characterId};`;

const sqlGetInfoAbilityCosts = () => `SELECT * FROM witchhunter.generating_abilities;`;

const sqlListCharacters = (userId) => `SELECT id, name, description FROM character_info WHERE fk_user = ${userId};`;

exports.sqlGetCharacterAbilities = sqlGetCharacterAbilities;
exports.sqlGetCharacterArmor = sqlGetCharacterArmor;
exports.sqlGetCharacterGear = sqlGetCharacterGear;
exports.sqlGetCharacterInfo = sqlGetCharacterInfo;
exports.sqlGetCharacterRites = sqlGetCharacterRites;
exports.sqlGetCharacterSkills = sqlGetCharacterSkills;
exports.sqlGetCharacterTalents = sqlGetCharacterTalents;
exports.sqlGetCharacterWeapons = sqlGetCharacterWeapons;
exports.sqlGetInfoAbilityCosts = sqlGetInfoAbilityCosts;
exports.sqlListCharacters = sqlListCharacters;