// Character Info Queries
const sqlGetInfoReligions = () => 'SELECT * FROM religions;';
const sqlGetInfoOrders = () => 'SELECT * FROM orders;';
const sqlGetInfoSinsVices = () => 'SELECT * FROM sins_vices;';
const sqlGetInfoVirtues = () => 'SELECT * FROM virtues;';
const sqlGetInfoBackgrounds = () => 'SELECT * FROM backgrounds;';
const sqlGetInfoAbilityCosts = () => 'SELECT * FROM generating_abilities;';
const sqlGetInfoSex = () => 'SELECT * FROM sex;';

// Character Iitem Queries
const sqlGetItemsMoney = () => 'SELECT * FROM money;';
const sqlGetItemsArmor = () => 'SELECT * FROM armor;';
const sqlGetItemsGear = () => 'SELECT * FROM gear;';
const sqlGetItemsKits = () => 'SELECT * FROM kit_totals;';
const sqlGetItemsKitItems = () => `SELECT kits.id, kits.fk_item_id, kits.kit, kits.item, kits.quantity, kits.category, 
COALESCE(armor.cost_pounds, gear.cost_pounds, weapons.cost_pounds) AS cost_pounds, 
COALESCE(armor.cost_crowns, gear.cost_crowns, weapons.cost_crowns) AS cost_crowns, 
COALESCE(armor.cost_shilling, gear.cost_shilling, weapons.cost_shilling) AS cost_shilling, 
COALESCE(armor.cost_farthing, gear.cost_farthing, weapons.cost_farthing) AS cost_farthing, 
COALESCE(armor.cost_penny, gear.cost_penny, weapons.cost_penny) AS cost_penny,
COALESCE(armor.weight_lb, gear.weight_lb, weapons.weight_lb) AS weight_lb
FROM kits 
LEFT JOIN armor ON fk_item_id = armor.id
LEFT JOIN weapons ON fk_item_id = weapons.id
LEFT JOIN gear ON fk_item_id = gear.id;`;
const sqlGetItemsShots = () => 'SELECT * FROM powder_shots;';
const sqlGetItemsVehicles = () => 'SELECT * FROM vehicles;';
const sqlGetItemsWeapons = () => 'SELECT * FROM weapons;';

exports.sqlGetInfoReligions = sqlGetInfoReligions;
exports.sqlGetInfoOrders = sqlGetInfoOrders;
exports.sqlGetInfoSinsVices = sqlGetInfoSinsVices;
exports.sqlGetInfoVirtues = sqlGetInfoVirtues;
exports.sqlGetInfoBackgrounds = sqlGetInfoBackgrounds;
exports.sqlGetInfoAbilityCosts = sqlGetInfoAbilityCosts;
exports.sqlGetInfoSex = sqlGetInfoSex; 
exports.sqlGetItemsMoney = sqlGetItemsMoney; 
exports.sqlGetItemsArmor = sqlGetItemsArmor; 
exports.sqlGetItemsGear = sqlGetItemsGear; 
exports.sqlGetItemsKits = sqlGetItemsKits; 
exports.sqlGetItemsKitItems = sqlGetItemsKitItems; 
exports.sqlGetItemsShots = sqlGetItemsShots; 
exports.sqlGetItemsVehicles = sqlGetItemsVehicles;
exports.sqlGetItemsWeapons = sqlGetItemsWeapons; 