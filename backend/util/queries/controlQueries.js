const sqlGetInfoReligions = () => 'SELECT * FROM religions;';
const sqlGetInfoOrders = () => 'SELECT * FROM orders;';
const sqlGetInfoSinsVices = () => 'SELECT * FROM sins_vices;';
const sqlGetInfoVirtues = () => 'SELECT * FROM virtues;';
const sqlGetInfoBackgrounds = () => 'SELECT * FROM backgrounds;';
const sqlGetInfoAbilityCosts = () => 'SELECT * FROM generating_abilities;';
const sqlGetSex = () => 'SELECT * FROM sex;';

exports.sqlGetInfoReligions = sqlGetInfoReligions;
exports.sqlGetInfoOrders = sqlGetInfoOrders;
exports.sqlGetInfoSinsVices = sqlGetInfoSinsVices;
exports.sqlGetInfoVirtues = sqlGetInfoVirtues;
exports.sqlGetInfoBackgrounds = sqlGetInfoBackgrounds;
exports.sqlGetInfoAbilityCosts = sqlGetInfoAbilityCosts; 
exports.sqlGetSex = sqlGetSex; 