const sqlSaveCharacterInfo = (userId, body) => `INSERT INTO character_info (fk_user, \`name\`, culture, ethnicity, religion, nationality, \`description\`, height, weight, eyes, hair, catalyst, \`order\`, background, social_standing, sin_vice, virture, hero_points, true_faith, damnation) VALUES ('${userId}', '${body.characterName}', '${body.culture}', '${body.ethnicity}', '${body.religion.religion}', '${body.nationality}', '${body.description}', '${body.height}', '${body.weight}', '${body.eyes}', '${body.hair}', '${body.catalyst}', '${body.order.order}', '${body.background.background}', '${body.social_standing}', '${body.sinVice.sin_vice}', '${body.virtue.virtue}', ${body.heroPoints}, ${body.trueFaith}, ${body.damnation});`;
//STILL NEED TO WORK ON THIS AND ADD INTO BACKEND

exports.sqlSaveCharacterInfo = sqlSaveCharacterInfo;