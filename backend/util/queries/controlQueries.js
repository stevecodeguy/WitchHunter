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
const sqlGetItemsKitItems = () => 'SELECT * FROM kits;';
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