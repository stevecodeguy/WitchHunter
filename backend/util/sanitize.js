const express = require('express');
const app = express();

const sanitize = (sqlString) => {
return sqlString.toString().replace(/[&<>"';*/]/g, '');
}

module.exports = sanitize;