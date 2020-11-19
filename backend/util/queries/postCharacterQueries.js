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
  physical_strength_min, 
  physical_agility, 
  physical_agility_min, 
  physical_toughness, 
  physical_toughness_min, 
  mental_education, 
  mental_education_min, 
  mental_reason, 
  mental_reason_min, 
  mental_will, 
  mental_will_min, 
  spiritual_courage, 
  spiritual_courage_min, 
  spiritual_intuition, 
  spiritual_intuition_min, 
  spiritual_personality,
  spiritual_personality_min
) VALUES (
  ${characterId}, 
  ${body.strength.score}, 
  ${body.strength.minimum}, 
  ${body.agility.score}, 
  ${body.agility.minimum}, 
  ${body.toughness.score}, 
  ${body.toughness.minimum}, 
  ${body.education.score}, 
  ${body.education.minimum}, 
  ${body.reason.score}, 
  ${body.reason.minimum}, 
  ${body.will.score}, 
  ${body.will.minimum}, 
  ${body.courage.score}, 
  ${body.courage.minimum}, 
  ${body.intuition.score}, 
  ${body.intuition.minimum}, 
  ${body.personality.score},
  ${body.personality.minimum}
);`;

const sqlSaveCharacterSkills = (characterId, body) => {
  let sqlBuild = `INSERT INTO character_skills (
    fk_character_info_id, 
    fk_skill_id, 
    \`rank\`
    ) VALUES `;
  for (const key in body) {
    if (body[key].score > 0) {
      sqlBuild += `( ${characterId}, ${body[key].id}, ${body[key].score} ),\n`;
    }
  }
  sqlBuild = sqlBuild.substring(0, sqlBuild.length - 2) + ';';

  return sqlBuild;
};

const sqlSaveCharacterTalents = (characterId, body) => {
  let sqlBuild = `INSERT INTO character_talents (
    fk_character_info_id, 
    fk_talent_id
  ) VALUES `;
  body.forEach(talent => {
    sqlBuild += `(${characterId}, ${talent.id} ),\n`;
  });
  sqlBuild = sqlBuild.substring(0, sqlBuild.length - 2) + ';';

  return sqlBuild;
};

const sqlSaveCharacterInventory = (characterId, body) => {
  let sqlBuild = `INSERT INTO character_gear (
    fk_character_info_id, 
    fk_gear_id,
    category,
    quantity
  ) VALUES `;
  Object.keys(body).forEach(key => {
    sqlBuild += `(${characterId}, ${body[key].id}, '${body[key].category}', ${body[key].quantity} ),\n`;
  });
  sqlBuild = sqlBuild.substring(0, sqlBuild.length - 2) + ';';

  return sqlBuild;
};

const sqlSaveCharacterMoney = (characterId, body) => {
  let sqlBuild = `INSERT INTO character_money (
    fk_character_info_id, 
    pounds,
    crowns,
    shillings,
    pennies,
    farthings,
    single_total
  ) VALUES (
    ${characterId},`;
  Object.keys(body).forEach(key => {
    if (key !== 'singleTotal') sqlBuild += `${body[key].amount},`;
    if (key === 'singleTotal') sqlBuild += `${body[key]}),\n`;
  });
  sqlBuild = sqlBuild.substring(0, sqlBuild.length - 2) + ';';

  return sqlBuild;
};

exports.sqlSaveCharacterInfo = sqlSaveCharacterInfo;
exports.sqlSaveCharacterAbilities = sqlSaveCharacterAbilities;
exports.sqlSaveCharacterSkills = sqlSaveCharacterSkills;
exports.sqlSaveCharacterTalents = sqlSaveCharacterTalents;
exports.sqlSaveCharacterInventory = sqlSaveCharacterInventory;
exports.sqlSaveCharacterMoney = sqlSaveCharacterMoney;