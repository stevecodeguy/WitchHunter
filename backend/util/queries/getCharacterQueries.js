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

const sqlGetAbilities = () => `SELECT id, ability, category FROM abilities;`;

const sqlGetAbilitiesCategory = () => `SELECT DISTINCT category FROM abilities;`;

const sqlGetSkillsCategory = () => `SELECT DISTINCT category FROM skills;`;

const sqlGetSkills = () => `SELECT id, category, skill, ability FROM skills;`;

const sqlGetInitialSkills = (backgroundId) => `SELECT id, skill, score, sub_skill, \`option\` FROM background_skills WHERE fk_background_id = ${backgroundId};`;

const sqlGetBackgroundRequirements = (backgroundId) => `SELECT id, ability, score FROM background_requirements WHERE fk_background_id = ${backgroundId};`

const sqlGetBackgroundCategories = (backgroundId) => `SELECT id, category, elective_skills FROM background_categories WHERE fk_background_id = ${backgroundId};`;

const sqlGetTalents = () => `SELECT id, talent, benefit, category FROM talents`;

const sqlGetTalentRequirements = () => `SELECT talent_requirement.id, talent_requirement.fk_talent_id, talent_requirement.requirement, talent_requirement.sub_skill, talent_requirement.requirement_type, talent_requirement.score, talent_requirement.\`option\` FROM talent_requirement;`;

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
exports.sqlGetAbilities = sqlGetAbilities;
exports.sqlGetAbilitiesCategory = sqlGetAbilitiesCategory;
exports.sqlGetSkillsCategory = sqlGetSkillsCategory;
exports.sqlGetSkills = sqlGetSkills;
exports.sqlGetInitialSkills = sqlGetInitialSkills;
exports.sqlGetBackgroundRequirements = sqlGetBackgroundRequirements;
exports.sqlGetBackgroundCategories = sqlGetBackgroundCategories;
exports.sqlGetTalents = sqlGetTalents; 
exports.sqlGetTalentRequirements = sqlGetTalentRequirements; 