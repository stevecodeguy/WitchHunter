const sqlSaveCharacterInfo = (userId, body) => `INSERT INTO character_info (
  fk_user, 
  \`name\`, 
  culture, 
  ethnicity, 
  religion, 
  nationality, 
  \`description\`, 
  height, 
  weight, 
  sex, 
  eyes, 
  hair, 
  catalyst, 
  \`order\`, 
  background, 
  social_standing, 
  sin_vice, 
  virture, 
  hero_points, 
  true_faith, 
  damnation
) VALUES (
  ${userId}, 
  '${body.characterName}', 
  '${body.culture}', 
  '${body.ethnicity}', 
  '${body.religion.religion}', 
  '${body.nationality}', 
  '${body.description}', 
  '${body.height}', 
  '${body.weight}', 
  '${body.sex.sex}', 
  '${body.eyes}', 
  '${body.hair}', 
  '${body.catalyst}', 
  '${body.order.order}', 
  '${body.background.background}', 
  '${body.background.social_standing}', 
  '${body.sinVice.sin_vice}', 
  '${body.virtue.virtue}', 
  ${body.heroPoints}, 
  ${body.trueFaith}, 
  ${body.damnation}
);`;

const sqlSaveCharacterAbilities = (characterId, body) => `INSERT INTO character_abilities (
  fk_character_info_id, 
  physical_strength, 
  physical_agility, 
  physical_toughness, 
  mental_education, 
  mental_reason, 
  mental_will, 
  spiritual_courage, 
  spiritual_intuition, 
  spiritual_personality
) VALUES (
  ${characterId}, 
  ${body.strength}, 
  ${body.agility}, 
  ${body.toughness}, 
  ${body.education}, 
  ${body.reason}, 
  ${body.will}, 
  ${body.courage}, 
  ${body.intuition}, 
  ${body.personality}
);`;

exports.sqlSaveCharacterInfo = sqlSaveCharacterInfo;
exports.sqlSaveCharacterAbilities = sqlSaveCharacterAbilities;